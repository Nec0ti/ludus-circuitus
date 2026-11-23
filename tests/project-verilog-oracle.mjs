import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { generateProjectVerilog } from "../assets/js/project.mjs";

const invert = {
  id: "child", name: "invert.bp", bp: {
    version: 1, name: "invert",
    nodes: [
      { id: "x", type: "input", name: "x", x: 0, y: 0 },
      { id: "not", type: "not", name: "", x: 100, y: 0 },
      { id: "tap", type: "signal", name: "negated", x: 150, y: 0 },
      { id: "y", type: "output", name: "y", x: 200, y: 0 }
    ],
    wires: [
      { from: { node: "x", port: "out" }, to: { node: "not", port: "in" } },
      { from: { node: "not", port: "out" }, to: { node: "tap", port: "in" } },
      { from: { node: "tap", port: "out" }, to: { node: "y", port: "in" } }
    ]
  }
};
const parent = {
  id: "parent", name: "project_top.bp", bp: {
    version: 1, name: "project_top",
    nodes: [
      { id: "a", type: "input", name: "a", x: 0, y: 0 },
      { id: "u", type: "module", module: "invert", name: "u1", x: 100, y: 0 },
      { id: "u2", type: "module", module: "invert", name: "u2", x: 100, y: 100 },
      { id: "y", type: "output", name: "y", x: 200, y: 0 }
    ],
    wires: [
      { from: { node: "a", port: "out" }, to: { node: "u", port: "x" } },
      { from: { node: "a", port: "out" }, to: { node: "u2", port: "x" } },
      { from: { node: "u", port: "y" }, to: { node: "y", port: "in" } }
    ]
  }
};
const project = [parent, invert];
const projectBench = [
  "module project_tb;",
  "reg a; wire y;",
  "project_top dut(.a(a), .y(y));",
  "initial begin",
  "  a=0; #1; $display(\"P=%b\", y);",
  "  a=1; #1; $display(\"P=%b\", y);",
  "  a=1'bx; #1; $display(\"P=%b\", y);",
  "  $finish;",
  "end",
  "endmodule"
].join("\n");

const latch = {
  id: "latch", name: "latch.bp", bp: {
    version: 1, name: "latch",
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
const seqParent = {
  id: "seq-parent", name: "seq_project_top.bp", bp: {
    version: 1, name: "seq_project_top",
    nodes: [
      { id: "d", type: "input", name: "d", x: 0, y: 0 },
      { id: "u", type: "module", module: "latch", name: "u1", x: 100, y: 0 },
      { id: "q", type: "output", name: "q", x: 200, y: 0 }
    ],
    wires: [
      { from: { node: "d", port: "out" }, to: { node: "u", port: "d" } },
      { from: { node: "u", port: "q" }, to: { node: "q", port: "in" } }
    ]
  }
};
const sequentialBench = [
  "module seq_project_tb;",
  "reg d=0, clk=0, reset=0; wire q;",
  "seq_project_top dut(.d(d), .q(q), .clk(clk), .reset(reset));",
  "initial begin",
  "  reset=1; #1; $display(\"Q=%b\", q);",
  "  reset=0; d=1; clk=1; #1; $display(\"Q=%b\", q);",
  "  clk=0; d=0; #1; $display(\"Q=%b\", q);",
  "  $finish;",
  "end",
  "endmodule"
].join("\n");

const dir = await mkdtemp(join(tmpdir(), "ludus-project-iverilog-"));
try {
  await writeFile(join(dir, "dut.v"), generateProjectVerilog(project, "project_top") + "\n" + generateProjectVerilog([seqParent, latch], "seq_project_top"));
  await writeFile(join(dir, "tb.v"), projectBench + "\n" + sequentialBench);
  for (const [top, expected, prefix] of [
    ["project_tb", ["1", "0", "x"], "P"],
    ["seq_project_tb", ["0", "1", "1"], "Q"]
  ]) {
    const output = join(dir, top + ".out");
    const compile = spawnSync("iverilog", ["-g2012", "-s", top, "-o", output, join(dir, "dut.v"), join(dir, "tb.v")], { encoding: "utf8" });
    assert.equal(compile.status, 0, compile.stderr || top + " derlenemedi");
    const run = spawnSync("vvp", [output], { encoding: "utf8" });
    assert.equal(run.status, 0, run.stderr || top + " çalıştırılamadı");
    const actual = [...run.stdout.matchAll(new RegExp("^" + prefix + "=([01x])$", "gmi"))].map((match) => match[1].toLowerCase());
    assert.deepEqual(actual, expected, top + " Verilog/simülatör vektörleri uyuşmuyor");
  }
  console.log("Icarus Verilog: hiyerarşik .bp kombinasyonel ve clock/register projeleri eşleşti.");
} finally {
  await rm(dir, { recursive: true, force: true });
}
