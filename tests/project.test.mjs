import test from "node:test";
import assert from "node:assert/strict";
import { createProjectState, evaluateProject, generateProjectVerilog, resetProject, tickProject, validateProject } from "../assets/js/project.mjs";
import { X } from "../assets/js/engine.mjs";

const adder = {
  id: "adder-file", name: "adder.bp",
  bp: {
    version: 1, name: "adder",
    nodes: [
      { id: "a", type: "input", name: "a", x: 0, y: 0 },
      { id: "b", type: "input", name: "b", x: 0, y: 100 },
      { id: "sum", type: "xor", name: "", x: 100, y: 0 },
      { id: "carry", type: "and", name: "", x: 100, y: 100 },
      { id: "sum_label", type: "signal", name: "xor_tap", x: 150, y: 0 },
      { id: "s", type: "output", name: "sum", x: 200, y: 0 },
      { id: "c", type: "output", name: "carry", x: 200, y: 100 }
    ],
    wires: [
      { from: { node: "a", port: "out" }, to: { node: "sum", port: "a" } },
      { from: { node: "b", port: "out" }, to: { node: "sum", port: "b" } },
      { from: { node: "a", port: "out" }, to: { node: "carry", port: "a" } },
      { from: { node: "b", port: "out" }, to: { node: "carry", port: "b" } },
      { from: { node: "sum", port: "out" }, to: { node: "sum_label", port: "in" } },
      { from: { node: "sum_label", port: "out" }, to: { node: "s", port: "in" } },
      { from: { node: "carry", port: "out" }, to: { node: "c", port: "in" } }
    ]
  }
};

function topWithModule() {
  return {
    id: "top-file", name: "top.bp",
    bp: {
      version: 1, name: "top",
      nodes: [
        { id: "x", type: "input", name: "x", x: 0, y: 0 },
        { id: "y", type: "input", name: "y", x: 0, y: 100 },
        { id: "instance", type: "module", module: "adder", name: "half", x: 200, y: 0 },
        { id: "sum", type: "output", name: "sum_out", x: 400, y: 0 },
        { id: "carry", type: "output", name: "carry_out", x: 400, y: 100 }
      ],
      wires: [
        { from: { node: "x", port: "out" }, to: { node: "instance", port: "a" } },
        { from: { node: "y", port: "out" }, to: { node: "instance", port: "b" } },
        { from: { node: "instance", port: "sum" }, to: { node: "sum", port: "in" } },
        { from: { node: "instance", port: "carry" }, to: { node: "carry", port: "in" } }
      ]
    }
  };
}

test("composes a named .bp module and matches all half-adder vectors", () => {
  const top = topWithModule();
  top.bp.nodes.push({ id: "instance2", type: "module", module: "adder", name: "half2", x: 200, y: 180 });
  top.bp.wires.push(
    { from: { node: "x", port: "out" }, to: { node: "instance2", port: "a" } },
    { from: { node: "y", port: "out" }, to: { node: "instance2", port: "b" } }
  );
  const docs = [top, adder];
  validateProject(docs);
  for (const [x, y, sum, carry] of [[0, 0, 0, 0], [0, 1, 1, 0], [1, 0, 1, 0], [1, 1, 0, 1]]) {
    assert.deepEqual(evaluateProject(docs, "top", { x, y }).outputs, { sum_out: sum, carry_out: carry });
  }
  const verilog = generateProjectVerilog(docs, "top");
  assert.match(verilog, /module top/);
  assert.match(verilog, /assign n_\d+ = x \^ y;/);
  assert.match(verilog, /assign sum_out = __ludus_instance_0_xor_tap;/);
  assert.match(verilog, /wire __ludus_instance_0_xor_tap;/);
  assert.match(verilog, /wire __ludus_instance_1_xor_tap;/);
});

test("new gate types validate inside reusable .bp modules", () => {
  const gateDoc = structuredClone(adder), top = topWithModule();
  gateDoc.bp.nodes.find((node) => node.id === "carry").type = "nand";
  const docs = [top, gateDoc];
  validateProject(docs);
  assert.deepEqual(evaluateProject(docs, "top", { x: 1, y: 1 }).outputs, { sum_out: 0, carry_out: 0 });
  assert.match(generateProjectVerilog(docs, "top"), /assign n_\d+ = ~\(x & y\);/);
});

test("clocked registers inside a nested .bp module share project tick and reset semantics", () => {
  const sequential = {
    id: "seq-file", name: "flipflop.bp",
    bp: {
      version: 1, name: "flipflop",
      nodes: [
        { id: "d", type: "input", name: "d", x: 0, y: 0 },
        { id: "r", type: "register", name: "", x: 100, y: 0 },
        { id: "q", type: "output", name: "q", x: 200, y: 0 }
      ],
      wires: [
        { from: { node: "d", port: "out" }, to: { node: "r", port: "d" } },
        { from: { node: "r", port: "out" }, to: { node: "q", port: "in" } }
      ]
    }
  };
  const top = {
    id: "seq-top-file", name: "seq-top.bp",
    bp: {
      version: 1, name: "seq_top",
      nodes: [
        { id: "d", type: "input", name: "d", x: 0, y: 0 },
        { id: "u", type: "module", module: "flipflop", name: "u1", x: 100, y: 0 },
        { id: "q", type: "output", name: "q", x: 200, y: 0 }
      ],
      wires: [
        { from: { node: "d", port: "out" }, to: { node: "u", port: "d" } },
        { from: { node: "u", port: "q" }, to: { node: "q", port: "in" } }
      ]
    }
  };
  const docs = [top, sequential], state = createProjectState(docs, "seq_top");
  assert.deepEqual(evaluateProject(docs, "seq_top", { d: 1 }, state).outputs, { q: X });
  const reset = resetProject(docs, "seq_top");
  const registerId = Object.keys(reset)[0];
  assert.equal(Object.keys(reset).length, 1);
  assert.deepEqual(reset, { [registerId]: 0 });
  assert.deepEqual(tickProject(docs, "seq_top", { d: 1 }, reset), { [registerId]: 1 });
  assert.deepEqual(evaluateProject(docs, "seq_top", { d: 0 }, { [registerId]: 1 }).outputs, { q: 1 });
  assert.match(generateProjectVerilog(docs, "seq_top"), /always @\(posedge clk or posedge reset\)/);
});

test("rejects unresolved, recursive and mismatched module dependencies", () => {
  const top = topWithModule();
  assert.throws(() => validateProject([top]), /geçerli bir blueprint modülünü/);
  const recursive = structuredClone(top);
  recursive.bp.name = "adder";
  recursive.bp.nodes.find((node) => node.type === "module").module = "adder";
  recursive.bp.wires.find((wire) => wire.to.node === "instance" && wire.to.port === "a").to.port = "x";
  recursive.bp.wires.find((wire) => wire.to.node === "instance" && wire.to.port === "b").to.port = "y";
  recursive.bp.wires.find((wire) => wire.from.node === "instance" && wire.from.port === "sum").from.port = "sum_out";
  recursive.bp.wires.find((wire) => wire.from.node === "instance" && wire.from.port === "carry").from.port = "carry_out";
  assert.throws(() => validateProject([recursive]), /döngüsel/);
  const mismatch = topWithModule();
  mismatch.bp.wires = mismatch.bp.wires.filter((wire) => wire.to.port !== "b");
  assert.throws(() => validateProject([mismatch, adder]), /bağlı olmalı/);
});

test("rejects exponential module expansion before flattening it", () => {
  const fanout = 498;
  const docs = [{ id: "leaf", name: "leaf.bp", bp: {
    version: 1, name: "leaf",
    nodes: [
      { id: "x", type: "input", name: "x", x: 0, y: 0 },
      { id: "n", type: "not", name: "", x: 100, y: 0 },
      { id: "y", type: "output", name: "y", x: 200, y: 0 }
    ],
    wires: [
      { from: { node: "x", port: "out" }, to: { node: "n", port: "in" } },
      { from: { node: "n", port: "out" }, to: { node: "y", port: "in" } }
    ]
  } }];
  for (let level = 5; level >= 0; level--) {
    const child = level === 5 ? "leaf" : `fanout_${level + 1}`;
    const nodes = [{ id: "x", type: "input", name: "x", x: 0, y: 0 }];
    const wires = [];
    for (let index = 0; index < fanout; index++) {
      const id = `u${index}`;
      nodes.push({ id, type: "module", module: child, name: id, x: 100, y: index });
      wires.push({ from: { node: "x", port: "out" }, to: { node: id, port: "x" } });
    }
    nodes.push({ id: "y", type: "output", name: "y", x: 200, y: 0 });
    wires.push({ from: { node: "x", port: "out" }, to: { node: "y", port: "in" } });
    docs.push({ id: `fanout-${level}`, name: `fanout_${level}.bp`, bp: { version: 1, name: `fanout_${level}`, nodes, wires } });
  }
  assert.equal(docs.at(-1).bp.nodes.length, 500);
  assert.throws(() => validateProject(docs), /Birleşmiş blueprint en fazla 500 blok/);
});

test("accepts the 500-block expanded boundary and rejects the next block", () => {
  const makeChain = (gateCount) => {
    const nodes = ["a", "b", "c", "d"].map((name, index) => ({ id: `i${index}`, type: "input", name, x: 0, y: index }));
    const wires = [];
    let source = "i0";
    for (let index = 0; index < gateCount; index++) {
      const id = `n${index}`;
      nodes.push({ id, type: "not", name: "", x: index, y: 0 });
      wires.push({ from: { node: source, port: "out" }, to: { node: id, port: "in" } });
      source = id;
    }
    nodes.push({ id: "out", type: "output", name: "y", x: gateCount + 1, y: 0 });
    wires.push({ from: { node: source, port: "out" }, to: { node: "out", port: "in" } });
    return [{ id: "top", name: "top.bp", bp: { version: 1, name: "top", nodes, wires } }];
  };
  assert.equal(makeChain(495)[0].bp.nodes.length, 500);
  assert.doesNotThrow(() => validateProject(makeChain(495)));
  assert.equal(makeChain(496)[0].bp.nodes.length, 501);
  assert.throws(() => validateProject(makeChain(496)), /Blueprint biçimi/);
});

test("preserves vector widths through nested .bp ports and rejects module width mismatches", () => {
  const invert4 = { id: "invert4-file", name: "invert4.bp", bp: { version: 1, name: "invert4", nodes: [
    { id: "x", type: "input", name: "x", width: 4, x: 0, y: 0 },
    { id: "not", type: "not", width: 4, x: 100, y: 0 },
    { id: "y", type: "output", name: "y", width: 4, x: 200, y: 0 }
  ], wires: [
    { from: { node: "x", port: "out" }, to: { node: "not", port: "in" } },
    { from: { node: "not", port: "out" }, to: { node: "y", port: "in" } }
  ] } };
  const top = { id: "vector-top-file", name: "vector_top.bp", bp: { version: 1, name: "vector_top", nodes: [
    { id: "source", type: "input", name: "source", width: 4, x: 0, y: 0 },
    { id: "u", type: "module", module: "invert4", name: "u1", x: 100, y: 0 },
    { id: "result", type: "output", name: "result", width: 4, x: 200, y: 0 }
  ], wires: [
    { from: { node: "source", port: "out" }, to: { node: "u", port: "x" } },
    { from: { node: "u", port: "y" }, to: { node: "result", port: "in" } }
  ] } };
  const docs = [top, invert4];
  assert.equal(evaluateProject(docs, "vector_top", { source: "10X1" }).outputs.result, "01X0");
  const verilog = generateProjectVerilog(docs, "vector_top");
  assert.match(verilog, /input wire \[3:0\] source;/);
  assert.match(verilog, /output wire \[3:0\] result;/);
  assert.match(verilog, /assign n_\d+ = ~source;/);
  const mismatch = structuredClone(docs);
  mismatch[0].bp.nodes.find((node) => node.id === "source").width = 3;
  assert.throws(() => validateProject(mismatch), /port genişlikleri eşleşmeli/);
});
