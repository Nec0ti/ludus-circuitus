import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { evaluate, generateVerilog, halfAdderBlueprint, X } from "../assets/js/engine.mjs";

function seededCircuits() {
  let state = 0x6d2b79f5;
  const random = (limit) => {
    state = Math.imul(state ^ state >>> 15, 1 | state);
    state ^= state + Math.imul(state ^ state >>> 7, 61 | state);
    return ((state ^ state >>> 14) >>> 0) % limit;
  };
  return Array.from({ length: 12 }, (_, circuitIndex) => {
    const name = `random_${circuitIndex}`;
    const nodes = ["a", "b", "c", "d"].map((input, index) => ({ id: `i${index}`, type: "input", name: input, x: 0, y: index * 80 }));
    const wires = [];
    const sources = nodes.map((node) => node.id);
    for (let index = 0; index < 40; index++) {
      const type = ["and", "or", "xor", "not"][random(4)];
      const id = `g${index}`;
      nodes.push({ id, type, name: "", x: 100 + (index % 8) * 80, y: index * 20 });
      const first = sources[random(sources.length)];
      wires.push({ from: { node: first, port: "out" }, to: { node: id, port: type === "not" ? "in" : "a" } });
      if (type !== "not") wires.push({ from: { node: sources[random(sources.length)], port: "out" }, to: { node: id, port: "b" } });
      sources.push(id);
    }
    const output = { id: "y", type: "output", name: "y", x: 800, y: 0 };
    nodes.push(output);
    wires.push({ from: { node: sources[sources.length - 1 - random(8)], port: "out" }, to: { node: output.id, port: "in" } });
    return { version: 1, name, nodes, wires };
  });
}

const dir = await mkdtemp(join(tmpdir(), "ludus-iverilog-"));
try {
  const namedWire = halfAdderBlueprint();
  namedWire.nodes.push({ id: "sum_label", type: "signal", name: "sum_wire", x: 380, y: 80 });
  namedWire.wires = namedWire.wires.filter((wire) => !(wire.to.node === "out_sum" && wire.to.port === "in"));
  namedWire.wires.push(
    { from: { node: "sum", port: "out" }, to: { node: "sum_label", port: "in" } },
    { from: { node: "sum_label", port: "out" }, to: { node: "out_sum", port: "in" } }
  );
  const dut = generateVerilog(namedWire);
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
  const circuits = seededCircuits();
  const vectors = [...Array.from({ length: 16 }, (_, index) => [index >> 3 & 1, index >> 2 & 1, index >> 1 & 1, index & 1]), [X, 0, 0, 0], [X, 1, 0, 1], [0, X, 1, 0], [1, 1, X, 0], [0, 1, 1, X]];
  const inputs = ["a", "b", "c", "d"];
  const randomBench = [
    "module random_tb;",
    "reg a,b,c,d;",
    `wire [${circuits.length - 1}:0] y;`,
    ...circuits.map((bp, index) => `${bp.name} u${index}(.a(a), .b(b), .c(c), .d(d), .y(y[${index}]));`),
    "initial begin",
    ...vectors.map((vector, index) => `  {a,b,c,d}={${vector.map((value) => value === X ? "1'bx" : `1'b${value}`).join(",")}}; #1; $display(\"R${index}=%b\", y);`),
    "  $finish;",
    "end",
    "endmodule"
  ].join("\n");
  await writeFile(join(dir, "dut.v"), `${dut}\n${generateVerilog(sequence)}\n${circuits.map(generateVerilog).join("\n")}`);
  await writeFile(join(dir, "tb.v"), `${bench}\n${seqBench}\n${randomBench}`);
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
  const randomCompile = spawnSync("iverilog", ["-g2012", "-s", "random_tb", "-o", join(dir, "random.out"), join(dir, "dut.v"), join(dir, "tb.v")], { encoding: "utf8" });
  assert.equal(randomCompile.status, 0, randomCompile.stderr || "rastgele devreler derlenemedi");
  const randomRun = spawnSync("vvp", [join(dir, "random.out")], { encoding: "utf8" });
  assert.equal(randomRun.status, 0, randomRun.stderr || "rastgele devreler çalıştırılamadı");
  const actualRows = [...randomRun.stdout.matchAll(/^R\d+=(\S+)$/gmi)].map((match) => match[1].toLowerCase());
  const expectedRows = vectors.map((vector) => circuits.map((bp) => evaluate(bp, Object.fromEntries(inputs.map((name, index) => [name, vector[index]]))).outputs.y).reverse().map((value) => value === X ? "x" : value).join(""));
  assert.deepEqual(actualRows, expectedRows, "12 seeded 40-gate circuits, 16 binary vectors and 5 X vectors");
  console.log("Icarus Verilog: yarım toplayıcı/register oracle'ları ve 12 seeded 40-gate devrenin 252 vektörü benzetimle eşleşti.");
} finally {
  await rm(dir, { recursive: true, force: true });
}
