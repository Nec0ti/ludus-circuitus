import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { generateVerilog, halfAdderBlueprint } from "../assets/js/engine.mjs";

const dir = await mkdtemp(join(tmpdir(), "ludus-iverilog-"));
try {
  const dut = generateVerilog(halfAdderBlueprint());
  const sequence = {
    version: 1, name: "flipflop",
    nodes: [
      { id: "d", type: "input", name: "d", x: 0, y: 0 },
      { id: "r", type: "register", name: "", x: 1, y: 0 },
      { id: "q", type: "output", name: "q", x: 2, y: 0 }
    ],
    wires: [
      { from: { node: "d", port: "out" }, to: { node: "r", port: "d" } },
      { from: { node: "r", port: "out" }, to: { node: "q", port: "in" } }
    ]
  };
  const bench = `module tb;
reg a, b;
wire toplam, tasima;
top dut(.a(a), .b(b), .toplam(toplam), .tasima(tasima));
task check(input reg ai, input reg bi);
begin a=ai; b=bi; #1; $display("%b%b", toplam, tasima); end
endtask
initial begin
  check(0,0); check(0,1); check(1,0); check(1,1);
  check(1'bx,0); check(1'bx,1); check(0,1'bx); check(1,1'bx);
  $finish;
end
endmodule
`;
  const seqBench = `module seq_tb;
reg d=0, clk=0, reset=0; wire q;
flipflop dut(.d(d), .q(q), .clk(clk), .reset(reset));
initial begin
  reset=1; #1; $display("S=%b", q);
  reset=0; d=1; #1; $display("S=%b", q);
  clk=1; #1; $display("S=%b", q);
  clk=0; d=0; #1; $display("S=%b", q);
  reset=1; #1; $display("S=%b", q); $finish;
end
endmodule
`;
  await writeFile(join(dir, "dut.v"), `${dut}\n${generateVerilog(sequence)}`);
  await writeFile(join(dir, "tb.v"), `${bench}\n${seqBench}`);
  const compile = spawnSync("iverilog", ["-g2012", "-s", "tb", "-o", join(dir, "sim.out"), join(dir, "dut.v"), join(dir, "tb.v")], { encoding: "utf8" });
  assert.equal(compile.status, 0, compile.stderr || "iverilog derlemesi başarısız");
  const run = spawnSync("vvp", [join(dir, "sim.out")], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr || "vvp çalıştırması başarısız");
  const actual = run.stdout.match(/^[01x]{2}$/gmi) || [];
  assert.deepEqual(actual.map((line) => line.toLowerCase()), ["00", "10", "10", "01", "x0", "xx", "x0", "xx"]);
  const seqCompile = spawnSync("iverilog", ["-g2012", "-s", "seq_tb", "-o", join(dir, "seq.out"), join(dir, "dut.v"), join(dir, "tb.v")], { encoding: "utf8" });
  assert.equal(seqCompile.status, 0, seqCompile.stderr || "sıralı Verilog derlemesi başarısız");
  const seqRun = spawnSync("vvp", [join(dir, "seq.out")], { encoding: "utf8" });
  assert.equal(seqRun.status, 0, seqRun.stderr || "sıralı Verilog çalıştırması başarısız");
  assert.deepEqual([...seqRun.stdout.matchAll(/^S=([01x])$/gmi)].map((match) => match[1].toLowerCase()), ["0", "0", "1", "1", "0"]);
  console.log("Icarus Verilog: yarım toplayıcı 4 binary + 4 X vektöründe; register reset/tik izinde eşleşti.");
} finally {
  await rm(dir, { recursive: true, force: true });
}
