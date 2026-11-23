export const X = "X";

export function halfAdderBlueprint() {
  return {
    version: 1,
    name: "yarim_toplayici",
    nodes: [
      { id: "a", type: "input", name: "a", x: 48, y: 80 },
      { id: "b", type: "input", name: "b", x: 48, y: 220 },
      { id: "sum", type: "xor", name: "", x: 260, y: 80 },
      { id: "carry", type: "and", name: "", x: 260, y: 220 },
      { id: "out_sum", type: "output", name: "toplam", x: 500, y: 80 },
      { id: "out_carry", type: "output", name: "tasima", x: 500, y: 220 }
    ],
    wires: [
      { from: { node: "a", port: "out" }, to: { node: "sum", port: "a" } },
      { from: { node: "b", port: "out" }, to: { node: "sum", port: "b" } },
      { from: { node: "a", port: "out" }, to: { node: "carry", port: "a" } },
      { from: { node: "b", port: "out" }, to: { node: "carry", port: "b" } },
      { from: { node: "sum", port: "out" }, to: { node: "out_sum", port: "in" } },
      { from: { node: "carry", port: "out" }, to: { node: "out_carry", port: "in" } }
    ]
  };
}

const inputPorts = (node) => ({ and: ["a", "b"], or: ["a", "b"], xor: ["a", "b"], not: ["in"], register: ["d"], output: ["in"] }[node.type] || []);
const outputPorts = (node) => node.type === "input" || ["and", "or", "xor", "not", "register"].includes(node.type) ? ["out"] : [];
const validTypes = new Set(["input", "output", "and", "or", "xor", "not", "register"]);
const validName = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

export function validateBlueprint(bp) {
  if (!bp || bp.version !== 1 || typeof bp.name !== "string" || !Array.isArray(bp.nodes) || !Array.isArray(bp.wires)) throw new Error("Blueprint biçimi veya sürümü geçersiz.");
  const ids = new Set();
  const nodes = new Map();
  const names = new Set();
  for (const node of bp.nodes) {
    if (!node || !validTypes.has(node.type) || typeof node.id !== "string" || !node.id || ids.has(node.id)) throw new Error("Blok türü veya kimliği geçersiz.");
    ids.add(node.id);
    nodes.set(node.id, node);
    if (["input", "output"].includes(node.type)) {
      if (!validName.test(node.name || "") || names.has(node.name)) throw new Error("Giriş ve çıkış adları geçerli ve benzersiz olmalı.");
      names.add(node.name);
    }
  }
  const destinations = new Set();
  for (const wire of bp.wires) {
    const from = nodes.get(wire?.from?.node);
    const to = nodes.get(wire?.to?.node);
    if (!from || !to || !outputPorts(from).includes(wire.from.port) || !inputPorts(to).includes(wire.to.port)) throw new Error("Bağlantı geçersiz bir blok girişine veya çıkışına ulaşıyor.");
    const key = `${to.id}:${wire.to.port}`;
    if (destinations.has(key)) throw new Error("Bir blok girişine birden fazla sinyal bağlanamaz.");
    destinations.add(key);
  }
  for (const node of bp.nodes) for (const port of inputPorts(node)) if (!destinations.has(`${node.id}:${port}`)) throw new Error("Her blok girişi bir sinyale bağlı olmalı.");
  if (!bp.nodes.some((node) => node.type === "output")) throw new Error("Blueprint en az bir çıkış içermeli.");
  topologicalOrder(bp);
  return true;
}

function topologicalOrder(bp) {
  const nodes = new Map(bp.nodes.map((node) => [node.id, node]));
  const combinational = bp.nodes.filter((node) => !["input", "register"].includes(node.type));
  const indegree = new Map(combinational.map((node) => [node.id, 0]));
  const outgoing = new Map(combinational.map((node) => [node.id, []]));
  for (const wire of bp.wires) {
    const source = nodes.get(wire.from.node);
    const target = nodes.get(wire.to.node);
    if (indegree.has(target.id) && !["input", "register"].includes(source.type)) {
      indegree.set(target.id, indegree.get(target.id) + 1);
      outgoing.get(source.id).push(target.id);
    }
  }
  const queue = combinational.filter((node) => indegree.get(node.id) === 0).map((node) => node.id);
  const order = [];
  for (let i = 0; i < queue.length; i++) {
    const id = queue[i];
    order.push(id);
    for (const next of outgoing.get(id)) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  }
  if (order.length !== combinational.length) throw new Error("Kombinasyonel döngü var; sinyal kendi sonucuna geri bağlanamaz.");
  return order;
}

function logic(type, a, b) {
  if (type === "and") return a === 0 || b === 0 ? 0 : a === 1 && b === 1 ? 1 : X;
  if (type === "or") return a === 1 || b === 1 ? 1 : a === 0 && b === 0 ? 0 : X;
  if (type === "xor") return a === X || b === X ? X : a ^ b;
  if (type === "not") return a === X ? X : 1 - a;
}

function readInputs(bp, node, values) {
  const result = {};
  for (const wire of bp.wires) if (wire.to.node === node.id) result[wire.to.port] = values.get(wire.from.node);
  return result;
}

export function createState(bp) {
  validateBlueprint(bp);
  return Object.fromEntries(bp.nodes.filter((node) => node.type === "register").map((node) => [node.id, X]));
}

export function evaluate(bp, inputs = {}, registers = createState(bp)) {
  validateBlueprint(bp);
  for (const value of [...Object.values(inputs), ...Object.values(registers)]) if (![0, 1, X].includes(value)) throw new Error("Sinyal değeri 0, 1 veya X olmalı.");
  const values = new Map();
  for (const node of bp.nodes) {
    if (node.type === "input") values.set(node.id, Object.hasOwn(inputs, node.name) ? inputs[node.name] : 0);
    if (node.type === "register") values.set(node.id, registers[node.id] ?? X);
  }
  for (const id of topologicalOrder(bp)) {
    const node = bp.nodes.find((item) => item.id === id);
    const args = readInputs(bp, node, values);
    if (node.type === "output") values.set(node.id, args.in);
    else values.set(node.id, logic(node.type, args.a ?? args.in, args.b));
  }
  const outputs = Object.fromEntries(bp.nodes.filter((node) => node.type === "output").map((node) => [node.name, values.get(node.id)]));
  return { values: Object.fromEntries(values), outputs };
}

export function tick(bp, inputs, registers = createState(bp)) {
  const before = evaluate(bp, inputs, registers);
  const next = { ...registers };
  for (const node of bp.nodes) if (node.type === "register") next[node.id] = before.values[bp.wires.find((wire) => wire.to.node === node.id && wire.to.port === "d").from.node];
  return next;
}

export function reset(bp) {
  validateBlueprint(bp);
  return Object.fromEntries(bp.nodes.filter((node) => node.type === "register").map((node) => [node.id, 0]));
}

function hdlName(value) {
  const name = String(value).replace(/[^a-zA-Z0-9_]/g, "_");
  return /^[a-zA-Z_]/.test(name) ? name : `n_${name}`;
}

export function generateVerilog(bp) {
  validateBlueprint(bp);
  const nodes = bp.nodes;
  const inputs = nodes.filter((node) => node.type === "input");
  const outputs = nodes.filter((node) => node.type === "output");
  const regs = nodes.filter((node) => node.type === "register");
  const names = [...inputs, ...outputs].map((node) => hdlName(node.name));
  if (new Set(names).size !== names.length) throw new Error("Verilog adları dönüştürüldüğünde çakışıyor.");
  const vars = new Map(nodes.map((node, index) => [node.id, node.type === "input" ? hdlName(node.name) : node.type === "output" ? hdlName(node.name) : `n_${index}`]));
  const wireByPort = new Map(bp.wires.map((wire) => [`${wire.to.node}:${wire.to.port}`, vars.get(wire.from.node)]));
  const ports = [...inputs.map((node) => node.name), ...outputs.map((node) => node.name), ...(regs.length ? ["clk", "reset"] : [])].map(hdlName);
  const lines = [`module ${hdlName(bp.name)} (${ports.join(", ")});`];
  for (const node of inputs) lines.push(`  input wire ${hdlName(node.name)};`);
  for (const node of outputs) lines.push(`  output wire ${hdlName(node.name)};`);
  if (regs.length) lines.push("  input wire clk;", "  input wire reset;");
  for (const node of nodes.filter((item) => ["and", "or", "xor", "not"].includes(item.type))) lines.push(`  wire ${vars.get(node.id)};`);
  for (const node of regs) lines.push(`  reg ${vars.get(node.id)};`);
  for (const node of nodes) {
    const variable = vars.get(node.id);
    if (["and", "or", "xor"].includes(node.type)) lines.push(`  assign ${variable} = ${wireByPort.get(`${node.id}:a`)} ${node.type === "and" ? "&" : node.type === "or" ? "|" : "^"} ${wireByPort.get(`${node.id}:b`)};`);
    if (node.type === "not") lines.push(`  assign ${variable} = ~${wireByPort.get(`${node.id}:in`)};`);
    if (node.type === "output") lines.push(`  assign ${variable} = ${wireByPort.get(`${node.id}:in`)};`);
    if (node.type === "register") lines.push(`  always @(posedge clk) if (reset) ${variable} <= 1'b0; else ${variable} <= ${wireByPort.get(`${node.id}:d`)};`);
  }
  lines.push("endmodule");
  return lines.join("\n");
}
