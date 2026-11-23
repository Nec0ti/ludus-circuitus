import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { evaluate, generateVerilog, X } from "../assets/js/engine.mjs";

const widths = [1, 2, 7, 31, 32];
const types = ["and", "nand", "or", "nor", "xor", "xnor", "not", "mux"];
const nextRandom = (() => {
  let state = 0x5eedc0de;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return state >>> 0;
  };
})();
const randomBits = (width) => Array.from({ length: width }, () => nextRandom() % 10 === 0 ? "X" : String(nextRandom() & 1)).join("");
const vector = (width, a, b, sel) => ({ a, b, sel });
const vectorsFor = (width) => {
  const zero = "0".repeat(width), ones = "1".repeat(width);
  const alternating = Array.from({ length: width }, (_, index) => String(index & 1)).join("");
  const pattern = [
    vector(width, zero, zero, 0), vector(width, ones, ones, 1),
    vector(width, zero, ones, X), vector(width, ones, zero, X),
    vector(width, `1${"0".repeat(width - 1)}`, `0${"1".repeat(width - 1)}`, 0),
    vector(width, `${"0".repeat(width - 1)}1`, `${"1".repeat(width - 1)}0`, 1),
    vector(width, zero, `1${"0".repeat(width - 1)}`, X),
    vector(width, alternating, alternating.split("").map((bit) => bit === "0" ? "1" : "0").join(""), X),
    vector(width, `X${"0".repeat(width - 1)}`, `${"1".repeat(width - 1)}X`, X)
  ];
  for (let index = 0; index < 39; index++) pattern.push(vector(width, randomBits(width), randomBits(width), [0, 1, X][nextRandom() % 3]));
  return pattern;
};

const circuits = new Map(widths.map((width) => {
  const nodes = [
    { id: "a", type: "input", name: "a", ...(width === 1 ? {} : { width }), x: 0, y: 0 },
    { id: "b", type: "input", name: "b", ...(width === 1 ? {} : { width }), x: 0, y: 60 },
    { id: "sel", type: "input", name: "sel", x: 0, y: 120 }
  ];
  const wires = [];
  for (const [index, type] of types.entries()) {
    nodes.push({ id: type, type, ...(width === 1 ? {} : { width }), x: 100, y: index * 60 });
    nodes.push({ id: `out_${type}`, type: "output", name: `y_${type}`, ...(width === 1 ? {} : { width }), x: 200, y: index * 60 });
    const ports = type === "not" ? ["in"] : type === "mux" ? ["sel", "a", "b"] : ["a", "b"];
    for (const port of ports) wires.push({ from: { node: port === "in" || port === "a" ? "a" : port === "b" ? "b" : "sel", port: "out" }, to: { node: type, port } });
    wires.push({ from: { node: type, port: "out" }, to: { node: `out_${type}`, port: "in" } });
  }
  return [width, { version: 1, name: `oracle_w${width}`, nodes, wires }];
}));
const vectors = new Map(widths.map((width) => [width, vectorsFor(width)]));

function verilogLiteral(bits, width) {
  const normalized = (bits === X ? "x" : String(bits)).toLowerCase();
  return width === 1 ? `1'b${normalized}` : `${width}'b${normalized}`;
}

const registerBlueprint = {
  version: 1, name: "wide_register_oracle",
  nodes: widths.flatMap((width, index) => [
    { id: `d${width}`, type: "input", name: `d${width}`, ...(width === 1 ? {} : { width }), x: 0, y: index * 80 },
    { id: `r${width}`, type: "register", ...(width === 1 ? {} : { width }), x: 100, y: index * 80 },
    { id: `q${width}`, type: "output", name: `q${width}`, ...(width === 1 ? {} : { width }), x: 200, y: index * 80 }
  ]),
  wires: widths.flatMap((width) => [
    { from: { node: `d${width}`, port: "out" }, to: { node: `r${width}`, port: "d" } },
    { from: { node: `r${width}`, port: "out" }, to: { node: `q${width}`, port: "in" } }
  ])
};

const dir = await mkdtemp(join(tmpdir(), "ludus-vector-oracle-"));
try {
  const moduleSources = [...circuits.values(), registerBlueprint].map(generateVerilog);
  const bench = ["module vector_oracle_tb;", ...widths.flatMap((width) => {
    const range = width === 1 ? "" : `[${width - 1}:0] `;
    const circuitOutputs = types.map((type) => `y_${type}`);
    return [
      `reg ${range}a${width}, b${width}; reg sel${width};`,
      `wire ${range}${circuitOutputs.map((name) => `${name}${width}`).join(", ")};`,
      `oracle_w${width} dut${width}(.a(a${width}), .b(b${width}), .sel(sel${width}), ${circuitOutputs.map((name) => `.${name}(${name}${width})`).join(", ")});`
    ];
  }),
  "initial begin", ...Array.from({ length: 48 }, (_, vectorIndex) => {
    const assignments = widths.flatMap((width) => {
      const input = vectors.get(width)[vectorIndex];
      return [`a${width}=${verilogLiteral(input.a, width)};`, `b${width}=${verilogLiteral(input.b, width)};`, `sel${width}=${input.sel === X ? "1'bx" : `1'b${input.sel}`};`];
    }).join(" ");
    const outputs = widths.flatMap((width) => types.map((type) => `y_${type}${width}`));
    return `  ${assignments} #1; $display("R${vectorIndex}=${outputs.map(() => "%b").join("|")}", ${outputs.join(",")});`;
  }), "  $finish;", "end", "endmodule"].join("\n");
  await writeFile(join(dir, "dut.v"), moduleSources.join("\n\n"));
  await writeFile(join(dir, "tb.v"), bench);
  const compile = spawnSync("iverilog", ["-g2012", "-s", "vector_oracle_tb", "-o", join(dir, "sim.out"), join(dir, "dut.v"), join(dir, "tb.v")], { encoding: "utf8", timeout: 15000 });
  assert.equal(compile.status, 0, compile.stderr || "vektör oracle derlenemedi");
  const run = spawnSync("vvp", [join(dir, "sim.out")], { encoding: "utf8", timeout: 15000 });
  assert.equal(run.status, 0, run.stderr || "vektör oracle çalıştırılamadı");
  const actualRows = [...run.stdout.matchAll(/^R(\d+)=(.*)$/gm)].map((match) => [Number(match[1]), match[2].toLowerCase().split("|")]);
  assert.equal(actualRows.length, 48, "Icarus 48 input vektörünün tamamını çalıştırmalı");
  for (const [index, actual] of actualRows) {
    const expected = widths.flatMap((width) => {
      const input = vectors.get(width)[index];
      const values = width === 1
        ? { a: input.a === "X" ? X : Number(input.a), b: input.b === "X" ? X : Number(input.b), sel: input.sel }
        : input;
      let result;
      try { result = evaluate(circuits.get(width), values).outputs; }
      catch (error) { throw new Error(`width ${width}, row ${index}, values ${JSON.stringify(values)}`, { cause: error }); }
      return types.map((type) => {
        const value = result[`y_${type}`];
        return value === X ? "x" : String(value).toLowerCase();
      });
    });
    assert.deepEqual(actual, expected, `widths 1,2,7,31,32; gate vectors at row ${index}`);
  }

  const regBench = [
    "module register_oracle_tb;",
    "reg clk=0, reset=0;",
    ...widths.map((width) => `reg ${width === 1 ? "" : `[${width - 1}:0] `}d${width}=0; wire ${width === 1 ? "" : `[${width - 1}:0] `}q${width};`),
    `wide_register_oracle dut(.${widths.map((width) => `d${width}(d${width}), .q${width}(q${width})`).join(", .")}, .clk(clk), .reset(reset));`,
    "initial begin",
    `  #1; $display("I=${widths.map(() => "%b").join("|")}", ${widths.map((width) => `q${width}`).join(",")});`,
    "  reset=1; #1; $display(\"Z=%b\", {" + widths.map((width) => `q${width}`).join(",") + "}); reset=0;",
    ...widths.map((width) => `  d${width}=${verilogLiteral("1".repeat(width), width)};`),
    `  #1; $display("H=${widths.map(() => "%b").join("|")}", ${widths.map((width) => `q${width}`).join(",")}); clk=1; #1; $display("T=${widths.map(() => "%b").join("|")}", ${widths.map((width) => `q${width}`).join(",")}); clk=0;`,
    ...widths.map((width) => `  d${width}=0;`),
    `  #1; $display("K=${widths.map(() => "%b").join("|")}", ${widths.map((width) => `q${width}`).join(",")}); reset=1; #1; $display("A=${widths.map(() => "%b").join("|")}", ${widths.map((width) => `q${width}`).join(",")}); $finish;`,
    "end", "endmodule"
  ].join("\n");
  await writeFile(join(dir, "reg_tb.v"), regBench);
  const regCompile = spawnSync("iverilog", ["-g2012", "-s", "register_oracle_tb", "-o", join(dir, "reg.out"), join(dir, "dut.v"), join(dir, "reg_tb.v")], { encoding: "utf8", timeout: 15000 });
  assert.equal(regCompile.status, 0, regCompile.stderr || "çok bitli yazmaç oracle derlenemedi");
  const regRun = spawnSync("vvp", [join(dir, "reg.out")], { encoding: "utf8", timeout: 15000 });
  assert.equal(regRun.status, 0, regRun.stderr || "çok bitli yazmaç oracle çalıştırılamadı");
  const rows = Object.fromEntries([...regRun.stdout.matchAll(/^([IZHTKA])=(.*)$/gm)].map((match) => [match[1], match[2].toLowerCase()]));
  assert.deepEqual(rows, {
    I: widths.map((width) => "x".repeat(width)).join("|"),
    Z: "0".repeat(widths.reduce((sum, width) => sum + width, 0)),
    H: widths.map((width) => "0".repeat(width)).join("|"),
    T: widths.map((width) => "1".repeat(width)).join("|"),
    K: widths.map((width) => "1".repeat(width)).join("|"),
    A: widths.map((width) => "0".repeat(width)).join("|")
  });
  console.log(`Icarus Verilog: 1/2/7/31/32-bit kapı oracle'ı (${48 * widths.length * types.length} sonuç), X-select MUX ve eşzamanlı yazmaç/reset eşleşti.`);
} finally {
  await rm(dir, { recursive: true, force: true });
}
