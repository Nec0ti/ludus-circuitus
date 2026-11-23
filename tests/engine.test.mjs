import test from "node:test";
import assert from "node:assert/strict";
import { createState, evaluate, generateVerilog, halfAdderBlueprint, reset, tick, validateBlueprint, X } from "../assets/js/engine.mjs";

const fixture = (type) => {
  const bp = halfAdderBlueprint();
  bp.nodes = bp.nodes.filter((node) => node.type === "input" || node.type === "output");
  bp.wires = [];
  bp.nodes.push({ id: "gate", type, name: "", x: 200, y: 80 });
  bp.wires.push(
    { from: { node: "a", port: "out" }, to: { node: "gate", port: type === "not" ? "in" : "a" } },
    ...(type === "not" ? [] : [{ from: { node: "b", port: "out" }, to: { node: "gate", port: "b" } }]),
    { from: { node: "gate", port: "out" }, to: { node: "out_sum", port: "in" } }
  );
  bp.nodes = bp.nodes.filter((node) => node.id !== "out_carry");
  return bp;
};

test("half adder matches all input vectors", () => {
  const bp = halfAdderBlueprint();
  for (const [a, b, sum, carry] of [[0, 0, 0, 0], [0, 1, 1, 0], [1, 0, 1, 0], [1, 1, 0, 1]]) {
    assert.deepEqual(evaluate(bp, { a, b }).outputs, { toplam: sum, tasima: carry });
  }
});

test("logic gates follow Verilog four-state truth tables", () => {
  const vectors = [0, 1, X];
  for (const a of vectors) for (const b of vectors) {
    assert.equal(evaluate(fixture("and"), { a, b }).outputs.toplam, a === 0 || b === 0 ? 0 : a === 1 && b === 1 ? 1 : X);
    assert.equal(evaluate(fixture("or"), { a, b }).outputs.toplam, a === 1 || b === 1 ? 1 : a === 0 && b === 0 ? 0 : X);
    assert.equal(evaluate(fixture("xor"), { a, b }).outputs.toplam, a === X || b === X ? X : a ^ b);
    assert.equal(evaluate(fixture("nand"), { a, b }).outputs.toplam, a === 0 || b === 0 ? 1 : a === 1 && b === 1 ? 0 : X);
    assert.equal(evaluate(fixture("nor"), { a, b }).outputs.toplam, a === 1 || b === 1 ? 0 : a === 0 && b === 0 ? 1 : X);
    assert.equal(evaluate(fixture("xnor"), { a, b }).outputs.toplam, a === X || b === X ? X : 1 - (a ^ b));
  }
  assert.deepEqual([0, 1, X].map((a) => evaluate(fixture("not"), { a }).outputs.toplam), [1, 0, X]);
});

test("complementary gate Verilog uses bitwise operators with matching polarity", () => {
  assert.match(generateVerilog(fixture("nand")), /assign n_\d+ = ~\(a & b\);/);
  assert.match(generateVerilog(fixture("nor")), /assign n_\d+ = ~\(a \| b\);/);
  assert.match(generateVerilog(fixture("xnor")), /assign n_\d+ = a ~\^ b;/);
});

test("rejects undriven inputs, duplicate drivers and combinational cycles", () => {
  const bp = halfAdderBlueprint();
  assert.throws(() => validateBlueprint({ ...bp, wires: bp.wires.slice(1) }), /girişi bir sinyale bağlı/);
  assert.throws(() => validateBlueprint({ ...bp, wires: [...bp.wires, bp.wires[0]] }), /birden fazla/);
  const cycle = halfAdderBlueprint();
  cycle.wires = cycle.wires.filter((wire) => !(wire.from.node === "a" && wire.to.node === "sum"));
  cycle.wires.push({ from: { node: "sum", port: "out" }, to: { node: "sum", port: "a" } });
  assert.throws(() => validateBlueprint(cycle), /döngü/);
});

test("rejects non-finite or unsafe blueprint coordinates before rendering", () => {
  const bp = halfAdderBlueprint();
  bp.nodes[0].x = Number.POSITIVE_INFINITY;
  assert.throws(() => validateBlueprint(bp), /koordinatları geçersiz/);
  bp.nodes[0].x = 1_000_001;
  assert.throws(() => validateBlueprint(bp), /çalışma alanı sınırını/);
});

test("registers start X, reset explicitly and update from one old-state snapshot", () => {
  const bp = {
    version: 1, name: "swap",
    nodes: [
      { id: "r1", type: "register", name: "", x: 0, y: 0 },
      { id: "r2", type: "register", name: "", x: 0, y: 1 },
      { id: "o1", type: "output", name: "q1", x: 1, y: 0 },
      { id: "o2", type: "output", name: "q2", x: 1, y: 1 }
    ],
    wires: [
      { from: { node: "r2", port: "out" }, to: { node: "r1", port: "d" } },
      { from: { node: "r1", port: "out" }, to: { node: "r2", port: "d" } },
      { from: { node: "r1", port: "out" }, to: { node: "o1", port: "in" } },
      { from: { node: "r2", port: "out" }, to: { node: "o2", port: "in" } }
    ]
  };
  assert.deepEqual(evaluate(bp).outputs, { q1: X, q2: X });
  assert.deepEqual(reset(bp), { r1: 0, r2: 0 });
  assert.deepEqual(tick(bp, {}, { r1: 1, r2: 0 }), { r1: 0, r2: 1 });
});

test("generated Verilog describes the same half adder", () => {
  const verilog = generateVerilog(halfAdderBlueprint());
  assert.match(verilog, /assign n_2 = a \^ b;/);
  assert.match(verilog, /assign toplam = n_2;/);
  assert.match(verilog, /assign tasima = n_3;/);
  assert.match(verilog, /endmodule/);
});

test("named intermediate signals preserve 0, 1 and X and generate a real Verilog wire", () => {
  const bp = fixture("not");
  bp.nodes.push({ id: "alias", type: "signal", name: "inverted", x: 400, y: 80 });
  bp.wires = bp.wires.filter((wire) => wire.from.node !== "gate");
  bp.wires.push(
    { from: { node: "gate", port: "out" }, to: { node: "alias", port: "in" } },
    { from: { node: "alias", port: "out" }, to: { node: "out_sum", port: "in" } }
  );
  assert.deepEqual([0, 1, X].map((a) => evaluate(bp, { a }).outputs.toplam), [1, 0, X]);
  assert.match(generateVerilog(bp), /wire inverted;\n(?:  wire n_\d+;\n)?[\s\S]*assign inverted = n_\d+;/);
  assert.throws(() => validateBlueprint({ ...bp, nodes: [...bp.nodes, { id: "dup", type: "signal", name: "a", x: 0, y: 0 }] }), /benzersiz/);
  assert.throws(() => validateBlueprint({ ...bp, nodes: [...bp.nodes, { id: "keyword", type: "signal", name: "wire", x: 0, y: 0 }] }), /Verilog için geçerli/);
  const cycle = halfAdderBlueprint();
  cycle.nodes.push({ id: "loop", type: "signal", name: "loop", x: 200, y: 160 });
  cycle.wires = cycle.wires.filter((wire) => !(wire.to.node === "sum" && wire.to.port === "a"));
  cycle.wires.push(
    { from: { node: "sum", port: "out" }, to: { node: "loop", port: "in" } },
    { from: { node: "loop", port: "out" }, to: { node: "sum", port: "a" } }
  );
  assert.throws(() => validateBlueprint(cycle), /döngü/);
});

test("sanitizes internal names and rejects keyword or clock-port collisions", () => {
  const bp = halfAdderBlueprint();
  bp.nodes[0].name = "n_2";
  assert.match(generateVerilog(bp), /wire n_2_;/);
  bp.nodes[0].name = "wire";
  assert.throws(() => generateVerilog(bp), /Verilog için geçerli/);
  bp.nodes[0].name = "clk";
  bp.nodes.push({ id: "reg", type: "register", name: "", x: 350, y: 300 });
  bp.wires.push({ from: { node: "sum", port: "out" }, to: { node: "reg", port: "d" } });
  assert.throws(() => generateVerilog(bp), /clk\/reset ile çakış/);
});

function vectorBlueprint(type, width = 4) {
  const bp = { version: 1, name: "vector_test", nodes: [
    { id: "a", type: "input", name: "a", width, x: 0, y: 0 },
    { id: "b", type: "input", name: "b", width, x: 0, y: 100 },
    { id: "gate", type, name: "", width, x: 100, y: 0 },
    { id: "out", type: "output", name: "y", width, x: 200, y: 0 }
  ], wires: [] };
  const ports = type === "mux" ? ["sel", "a", "b"] : type === "not" ? ["in"] : ["a", "b"];
  if (type === "mux") bp.nodes.push({ id: "sel", type: "input", name: "sel", x: 0, y: 200 });
  bp.wires.push(
    ...(type === "mux" ? [{ from: { node: "sel", port: "out" }, to: { node: "gate", port: "sel" } }] : []),
    ...ports.filter((port) => port !== "sel").map((port) => ({ from: { node: port === "in" ? "a" : port, port: "out" }, to: { node: "gate", port } })),
    { from: { node: "gate", port: "out" }, to: { node: "out", port: "in" } }
  );
  return bp;
}

test("legacy scalar signals stay compatible and vector gates preserve per-bit X semantics", () => {
  const a = "10X1", b = "011X";
  assert.deepEqual(["and", "nand", "or", "nor", "xor", "xnor"].map((type) => evaluate(vectorBlueprint(type), { a, b }).outputs.y), ["00XX", "11XX", "1111", "0000", "11XX", "00XX"]);
  const not = vectorBlueprint("not");
  assert.equal(evaluate(not, { a }).outputs.y, "01X0");
  assert.deepEqual(evaluate(halfAdderBlueprint(), { a: 1, b: 0 }).outputs, { toplam: 1, tasima: 0 });
});

test("validates vector widths, values, and equal-width connections without coercion", () => {
  const wide = { version: 1, name: "wide", nodes: [
    { id: "a", type: "input", name: "a", width: 32, x: 0, y: 0 },
    { id: "y", type: "output", name: "y", width: 32, x: 100, y: 0 }
  ], wires: [{ from: { node: "a", port: "out" }, to: { node: "y", port: "in" } }] };
  const allOnes = "1".repeat(32);
  assert.equal(evaluate(wide, { a: allOnes }).outputs.y, allOnes);
  for (const width of [0, 33, 1.5, "4"]) {
    const invalid = structuredClone(wide);
    invalid.nodes[0].width = width;
    assert.throws(() => validateBlueprint(invalid), /1–32 bit/);
  }
  assert.throws(() => evaluate(wide, { a: "1" }), /genişliğiyle uyumlu/);
  assert.throws(() => evaluate(wide, { a: "1".repeat(31) + "Z" }), /genişliğiyle uyumlu/);
  const mismatch = structuredClone(wide);
  mismatch.nodes[1].width = 31;
  assert.throws(() => validateBlueprint(mismatch), /port genişlikleri eşleşmeli/);
});

test("constants, vector mux and unknown-select bit merging follow Verilog semantics", () => {
  const bp = { version: 1, name: "mux_test", nodes: [
    { id: "sel", type: "input", name: "sel", x: 0, y: 0 },
    { id: "b", type: "input", name: "b", width: 4, x: 0, y: 100 },
    { id: "zero", type: "constant", value: "10X1", width: 4, x: 100, y: 0 },
    { id: "mux", type: "mux", width: 4, x: 200, y: 0 },
    { id: "out", type: "output", name: "y", width: 4, x: 300, y: 0 }
  ], wires: [
    { from: { node: "sel", port: "out" }, to: { node: "mux", port: "sel" } },
    { from: { node: "zero", port: "out" }, to: { node: "mux", port: "a" } },
    { from: { node: "b", port: "out" }, to: { node: "mux", port: "b" } },
    { from: { node: "mux", port: "out" }, to: { node: "out", port: "in" } }
  ] };
  assert.equal(evaluate(bp, { sel: 0, b: "1111" }).outputs.y, "10X1");
  assert.equal(evaluate(bp, { sel: 1, b: "1111" }).outputs.y, "1111");
  assert.equal(evaluate(bp, { sel: X, b: "1111" }).outputs.y, "1XX1");
  bp.nodes.find((node) => node.id === "b").width = 3;
  assert.throws(() => validateBlueprint(bp), /port genişlikleri eşleşmeli/);
  bp.nodes.find((node) => node.id === "b").width = 4;
  bp.nodes.find((node) => node.id === "zero").value = "10Z1";
  assert.throws(() => validateBlueprint(bp), /Sabit değer/);
});

test("vector register state starts unknown, resets to width-sized zero and ticks atomically", () => {
  const bp = { version: 1, name: "vector_register", nodes: [
    { id: "d", type: "input", name: "d", width: 8, x: 0, y: 0 },
    { id: "r", type: "register", width: 8, x: 100, y: 0 },
    { id: "q", type: "output", name: "q", width: 8, x: 200, y: 0 }
  ], wires: [
    { from: { node: "d", port: "out" }, to: { node: "r", port: "d" } },
    { from: { node: "r", port: "out" }, to: { node: "q", port: "in" } }
  ] };
  assert.equal(evaluate(bp).outputs.q, "XXXXXXXX");
  const zero = reset(bp);
  assert.deepEqual(zero, { r: "00000000" });
  const next = tick(bp, { d: "1010X100" }, zero);
  assert.deepEqual(next, { r: "1010X100" });
  assert.equal(evaluate(bp, {}, next).outputs.q, "1010X100");
  assert.match(generateVerilog(bp), /reg \[7:0\] n_1;/);
  assert.match(generateVerilog(bp), /n_1 <= 8'b00000000/);
});

test("vector Verilog keeps widths on ports and emits constant and ternary mux", () => {
  const bp = { version: 1, name: "vector_verilog", nodes: [
    { id: "sel", type: "input", name: "sel", x: 0, y: 0 },
    { id: "a", type: "input", name: "a", width: 4, x: 0, y: 100 },
    { id: "one", type: "constant", value: "10X1", width: 4, x: 100, y: 0 },
    { id: "mux", type: "mux", width: 4, x: 200, y: 0 },
    { id: "out", type: "output", name: "y", width: 4, x: 300, y: 0 }
  ], wires: [
    { from: { node: "sel", port: "out" }, to: { node: "mux", port: "sel" } },
    { from: { node: "one", port: "out" }, to: { node: "mux", port: "a" } },
    { from: { node: "a", port: "out" }, to: { node: "mux", port: "b" } },
    { from: { node: "mux", port: "out" }, to: { node: "out", port: "in" } }
  ] };
  const verilog = generateVerilog(bp);
  assert.match(verilog, /input wire \[3:0\] a;/);
  assert.match(verilog, /output wire \[3:0\] y;/);
  assert.match(verilog, /assign n_2 = 4'b10x1;/);
  assert.match(verilog, /assign n_3 = sel \? a : n_2;/);
});

