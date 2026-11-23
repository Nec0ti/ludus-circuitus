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
      const type = ["and", "nand", "or", "nor", "xor", "xnor", "not"][random(7)];
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
  const vectorCircuit = { version: 1, name: "vector_circuit", nodes: [
    { id: "sel", type: "input", name: "sel", x: 0, y: 0 },
    { id: "a", type: "input", name: "a", width: 4, x: 0, y: 80 },
    { id: "b", type: "input", name: "b", width: 4, x: 0, y: 160 },
    { id: "constant", type: "constant", value: "10X1", width: 4, x: 100, y: 0 },
    { id: "gate", type: "and", width: 4, x: 180, y: 120 },
    { id: "mux", type: "mux", width: 4, x: 280, y: 0 },
    { id: "and_out", type: "output", name: "and_y", width: 4, x: 400, y: 100 },
    { id: "mux_out", type: "output", name: "mux_y", width: 4, x: 400, y: 0 }
  ], wires: [
    { from: { node: "a", port: "out" }, to: { node: "gate", port: "a" } },
    { from: { node: "b", port: "out" }, to: { node: "gate", port: "b" } },
    { from: { node: "gate", port: "out" }, to: { node: "and_out", port: "in" } },
    { from: { node: "sel", port: "out" }, to: { node: "mux", port: "sel" } },
    { from: { node: "constant", port: "out" }, to: { node: "mux", port: "a" } },
    { from: { node: "b", port: "out" }, to: { node: "mux", port: "b" } },
    { from: { node: "mux", port: "out" }, to: { node: "mux_out", port: "in" } }
  ] };
  const vectorBench = `module vector_tb;
reg sel; reg [3:0] a,b; wire [3:0] and_y,mux_y;
vector_circuit dut(.sel(sel), .a(a), .b(b), .and_y(and_y), .mux_y(mux_y));
task check(input reg s, input reg [3:0] ai, input reg [3:0] bi);
begin sel=s; a=ai; b=bi; #1; $display("V=%b_%b", and_y, mux_y); end
endtask
initial begin
  check(0,4'b0110,4'b1001);
  check(1,4'b0110,4'b1111);
  check(1'bx,4'b0110,4'b1111);
  $finish;
end
endmodule
`;
  await writeFile(join(dir, "dut.v"), `${dut}\n${generateVerilog(sequence)}\n${circuits.map(generateVerilog).join("\n")}\n${generateVerilog(vectorCircuit)}`);
  await writeFile(join(dir, "tb.v"), `${bench}\n${seqBench}\n${randomBench}\n${vectorBench}`);
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
  const vectorCompile = spawnSync("iverilog", ["-g2012", "-s", "vector_tb", "-o", join(dir, "vector.out"), join(dir, "dut.v"), join(dir, "tb.v")], { encoding: "utf8" });
  assert.equal(vectorCompile.status, 0, vectorCompile.stderr || "vektör Verilog derlenemedi");
  const vectorRun = spawnSync("vvp", [join(dir, "vector.out")], { encoding: "utf8" });
  assert.equal(vectorRun.status, 0, vectorRun.stderr || "vektör Verilog çalıştırılamadı");
  const vectorInputs = [
    { sel: 0, a: "0110", b: "1001" },
    { sel: 1, a: "0110", b: "1111" },
    { sel: X, a: "0110", b: "1111" }
  ];
  const vectorExpected = vectorInputs.map((input) => {
    const result = evaluate(vectorCircuit, input).outputs;
    return `${result.and_y.toLowerCase()}_${result.mux_y.toLowerCase()}`;
  });
  const vectorActual = [...vectorRun.stdout.matchAll(/^V=(\S+)$/gmi)].map((match) => match[1].toLowerCase());
  assert.deepEqual(vectorActual, vectorExpected, "4-bit bitwise gates, constant and X-select mux");
  console.log("Icarus Verilog: scalar/vektör mantık, constant, mux, register ve 12 seeded 40-gate devrenin oracle'ları eşleşti.");
} finally {
  await rm(dir, { recursive: true, force: true });
}
