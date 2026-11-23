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
