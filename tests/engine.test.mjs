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
  }
  assert.deepEqual([0, 1, X].map((a) => evaluate(fixture("not"), { a }).outputs.toplam), [1, 0, X]);
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

