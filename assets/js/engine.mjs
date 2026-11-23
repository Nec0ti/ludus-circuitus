export const X = "X";

export function halfAdderBlueprint() {
  return {
    version: 1,
    name: "top",
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

const inputPorts = (node) => ({ and: ["a", "b"], nand: ["a", "b"], or: ["a", "b"], nor: ["a", "b"], xor: ["a", "b"], xnor: ["a", "b"], not: ["in"], signal: ["in"], register: ["d"], output: ["in"], mux: ["sel", "a", "b"] }[node.type] || []);
const outputPorts = (node) => node.type === "input" || ["constant", "and", "nand", "or", "nor", "xor", "xnor", "not", "signal", "register", "mux"].includes(node.type) ? ["out"] : [];
const validTypes = new Set(["input", "output", "constant", "and", "nand", "or", "nor", "xor", "xnor", "not", "signal", "register", "mux"]);
const validName = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const verilogWords = new Set("always and assign begin buf case casex casez cell cmos config deassign default defparam design disable edge else end endcase endfunction endgenerate endmodule endprimitive endspecify endtable endtask event for force forever fork function generate genvar highz0 highz1 if ifnone incdir include initial inout input integer join large liblist library localparam macromodule medium module nand negedge nmos nor not notif0 notif1 or output parameter pmos posedge primitive pull0 pull1 pulldown pullup pulmos rcmos real realtime reg release repeat rnmos rpmos rtran rtranif0 rtranif1 scalared signed small specify specparam strong0 strong1 supply0 supply1 table task time tran tranif0 tranif1 tri tri0 tri1 triand trior trireg unsigned use vectored wait wand weak0 weak1 while wire wor xnor xor".split(" "));
export const isValidSignalName = (name) => typeof name === "string" && validName.test(name) && !verilogWords.has(name);
export const nodeWidth = (node) => node?.width ?? 1;
const portWidth = (node, port) => node.type === "mux" && port === "sel" ? 1 : nodeWidth(node);
const isValidValue = (value, width) => width === 1
  ? value === 0 || value === 1 || value === X
  : typeof value === "string" && value.length === width && /^[01X]+$/.test(value);
const valueBits = (value, width) => {
  if (!isValidValue(value, width)) throw new Error(`Sinyal ${width} bit genişliğinde geçerli bir 0/1/X değeri olmalı.`);
  return width === 1 ? String(value) : value;
};
const fromBits = (bits) => bits.length === 1 ? bits === X ? X : Number(bits) : bits;
const zeroValue = (width) => width === 1 ? 0 : "0".repeat(width);
const unknownValue = (width) => width === 1 ? X : X.repeat(width);

export function validateBlueprint(bp) {
  if (!bp || bp.version !== 1 || typeof bp.name !== "string" || bp.name.length > 80 || !validName.test(bp.name) || verilogWords.has(bp.name) || !Array.isArray(bp.nodes) || !Array.isArray(bp.wires) || bp.nodes.length > 500 || bp.wires.length > 2000) throw new Error("Blueprint biçimi, adı, boyutu veya sürümü geçersiz.");
  const ids = new Set();
  const nodes = new Map();
  const names = new Set();
  for (const node of bp.nodes) {
    if (!node || !validTypes.has(node.type) || typeof node.id !== "string" || !node.id || node.id.length > 100 || ids.has(node.id)) throw new Error("Blok türü veya kimliği geçersiz.");
    if (!Number.isFinite(node.x) || !Number.isFinite(node.y) || Math.abs(node.x) > 1_000_000 || Math.abs(node.y) > 1_000_000) throw new Error("Blok koordinatları geçersiz veya çalışma alanı sınırını aşıyor.");
    const width = nodeWidth(node);
    if (!Number.isInteger(width) || width < 1 || width > 32) throw new Error("Blok genişliği 1–32 bit arasında tam sayı olmalı.");
    if (node.type === "constant" && !isValidValue(node.value, width)) throw new Error(`Sabit değer ${width} bit genişliğinde 0/1/X içermeli.`);
    ids.add(node.id);
    nodes.set(node.id, node);
    if (["input", "output", "signal"].includes(node.type)) {
      if (!isValidSignalName(node.name) || node.name.length > 40 || names.has(node.name)) throw new Error("Giriş, çıkış ve ara sinyal adları Verilog için geçerli ve benzersiz olmalı.");
      names.add(node.name);
    }
  }
  if (bp.nodes.some((node) => node.type === "register") && ["clk", "reset"].some((name) => names.has(name))) throw new Error("Sinyal adları clk/reset ile çakışamaz.");
  const destinations = new Set();
  for (const wire of bp.wires) {
    const from = nodes.get(wire?.from?.node);
    const to = nodes.get(wire?.to?.node);
    if (!from || !to || !outputPorts(from).includes(wire.from.port) || !inputPorts(to).includes(wire.to.port)) throw new Error("Bağlantı geçersiz bir blok girişine veya çıkışına ulaşıyor.");
    if (portWidth(from, wire.from.port) !== portWidth(to, wire.to.port)) throw new Error("Bağlantıdaki port genişlikleri eşleşmeli; genişlik dönüştürme otomatik yapılmaz.");
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

function logic(type, a, b, width) {
  const left = valueBits(a, width), right = b === undefined ? undefined : valueBits(b, width);
  const result = [...left].map((bit, index) => {
    const other = right?.[index];
    if (type === "not") return bit === X ? X : bit === "0" ? "1" : "0";
    if (type === "and" || type === "nand") {
      const value = bit === "0" || other === "0" ? "0" : bit === "1" && other === "1" ? "1" : X;
      return type === "nand" && value !== X ? value === "1" ? "0" : "1" : value;
    }
    if (type === "or" || type === "nor") {
      const value = bit === "1" || other === "1" ? "1" : bit === "0" && other === "0" ? "0" : X;
      return type === "nor" && value !== X ? value === "1" ? "0" : "1" : value;
    }
    const value = bit === X || other === X ? X : bit === other ? "0" : "1";
    return type === "xnor" && value !== X ? value === "1" ? "0" : "1" : value;
  }).join("");
  return fromBits(result);
}

function mux(select, a, b, width) {
  if (select === 0) return a;
  if (select === 1) return b;
  const left = valueBits(a, width), right = valueBits(b, width);
  return fromBits([...left].map((bit, index) => bit === right[index] ? bit : X).join(""));
}

export function createState(bp) {
  return Object.fromEntries((Array.isArray(bp?.nodes) ? bp.nodes : []).filter((node) => node?.type === "register" && typeof node.id === "string").map((node) => [node.id, unknownValue(nodeWidth(node))]));
}

export function evaluate(bp, inputs = {}, registers = createState(bp)) {
  validateBlueprint(bp);
  const inputWidths = new Map(bp.nodes.filter((node) => node.type === "input").map((node) => [node.name, nodeWidth(node)]));
  const registerWidths = new Map(bp.nodes.filter((node) => node.type === "register").map((node) => [node.id, nodeWidth(node)]));
  for (const [name, value] of Object.entries(inputs)) if (!isValidValue(value, inputWidths.get(name) ?? 1)) throw new Error("Giriş sinyali genişliğiyle uyumlu bir 0/1/X değeri olmalı.");
  for (const [id, value] of Object.entries(registers)) if (!isValidValue(value, registerWidths.get(id) ?? 1)) throw new Error("Yazmaç sinyali genişliğiyle uyumlu bir 0/1/X değeri olmalı.");
  const values = new Map();
  const nodes = new Map(bp.nodes.map((node) => [node.id, node]));
  const incoming = new Map();
  for (const wire of bp.wires) {
    if (!incoming.has(wire.to.node)) incoming.set(wire.to.node, {});
    incoming.get(wire.to.node)[wire.to.port] = wire.from.node;
  }
  for (const node of bp.nodes) {
    if (node.type === "input") values.set(node.id, Object.hasOwn(inputs, node.name) ? inputs[node.name] : zeroValue(nodeWidth(node)));
    if (node.type === "register") values.set(node.id, registers[node.id] ?? unknownValue(nodeWidth(node)));
    if (node.type === "constant") values.set(node.id, node.value);
  }
  for (const id of topologicalOrder(bp)) {
    const node = nodes.get(id);
    const sources = incoming.get(id) || {};
    const args = Object.fromEntries(Object.entries(sources).map(([port, source]) => [port, values.get(source)]));
    if (node.type === "constant") continue;
    if (node.type === "output" || node.type === "signal") values.set(node.id, args.in);
    else if (node.type === "mux") values.set(node.id, mux(args.sel, args.a, args.b, nodeWidth(node)));
    else values.set(node.id, logic(node.type, args.a ?? args.in, args.b, nodeWidth(node)));
  }
  const outputs = Object.fromEntries(bp.nodes.filter((node) => node.type === "output").map((node) => [node.name, values.get(node.id)]));
  return { values: Object.fromEntries(values), outputs };
}

export function tick(bp, inputs, registers = createState(bp)) {
  const before = evaluate(bp, inputs, registers);
  const next = { ...registers };
  const inputsByRegister = new Map(bp.wires.filter((wire) => wire.to.port === "d").map((wire) => [wire.to.node, wire.from.node]));
  for (const node of bp.nodes) if (node.type === "register") next[node.id] = before.values[inputsByRegister.get(node.id)];
  return next;
}

export function reset(bp) {
  return Object.fromEntries((Array.isArray(bp?.nodes) ? bp.nodes : []).filter((node) => node?.type === "register" && typeof node.id === "string").map((node) => [node.id, zeroValue(nodeWidth(node))]));
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
  const signals = nodes.filter((node) => node.type === "signal");
  const regs = nodes.filter((node) => node.type === "register");
  const widthRange = (node) => nodeWidth(node) === 1 ? "" : `[${nodeWidth(node) - 1}:0] `;
  const names = [...inputs, ...outputs, ...signals, ...(regs.length ? [{ name: "clk" }, { name: "reset" }] : [])].map((node) => hdlName(node.name));
  if (new Set(names).size !== names.length) throw new Error("Sinyal adı clk/reset ile çakışıyor veya Verilog adı yineleniyor.");
  const used = new Set(names);
  const vars = new Map();
  nodes.forEach((node, index) => {
    if (["input", "output", "signal"].includes(node.type)) vars.set(node.id, hdlName(node.name));
    else {
      let candidate = `n_${index}`;
      while (used.has(candidate)) candidate += "_";
      used.add(candidate);
      vars.set(node.id, candidate);
    }
  });
  const wireByPort = new Map(bp.wires.map((wire) => [`${wire.to.node}:${wire.to.port}`, vars.get(wire.from.node)]));
  const ports = [...inputs.map((node) => node.name), ...outputs.map((node) => node.name), ...(regs.length ? ["clk", "reset"] : [])].map(hdlName);
  const lines = [`module ${hdlName(bp.name)} (${ports.join(", ")});`];
  for (const node of inputs) lines.push(`  input wire ${widthRange(node)}${hdlName(node.name)};`);
  for (const node of outputs) lines.push(`  output wire ${widthRange(node)}${hdlName(node.name)};`);
  if (regs.length) lines.push("  input wire clk;", "  input wire reset;");
  for (const node of signals) lines.push(`  wire ${widthRange(node)}${vars.get(node.id)};`);
  for (const node of nodes.filter((item) => ["constant", "and", "nand", "or", "nor", "xor", "xnor", "not", "mux"].includes(item.type))) lines.push(`  wire ${widthRange(node)}${vars.get(node.id)};`);
  for (const node of regs) lines.push(`  reg ${widthRange(node)}${vars.get(node.id)};`);
  for (const node of nodes) {
    const variable = vars.get(node.id);
    if (["and", "nand", "or", "nor", "xor", "xnor"].includes(node.type)) {
      const left = wireByPort.get(`${node.id}:a`), right = wireByPort.get(`${node.id}:b`);
      const expression = ({ and: `${left} & ${right}`, nand: `~(${left} & ${right})`, or: `${left} | ${right}`, nor: `~(${left} | ${right})`, xor: `${left} ^ ${right}`, xnor: `${left} ~^ ${right}` })[node.type];
      lines.push(`  assign ${variable} = ${expression};`);
    }
    if (node.type === "not") lines.push(`  assign ${variable} = ~${wireByPort.get(`${node.id}:in`)};`);
    if (node.type === "constant") lines.push(`  assign ${variable} = ${nodeWidth(node)}'b${valueBits(node.value, nodeWidth(node)).toLowerCase()};`);
    if (node.type === "mux") lines.push(`  assign ${variable} = ${wireByPort.get(`${node.id}:sel`)} ? ${wireByPort.get(`${node.id}:b`)} : ${wireByPort.get(`${node.id}:a`)};`);
    if (node.type === "signal") lines.push(`  assign ${variable} = ${wireByPort.get(`${node.id}:in`)};`);
    if (node.type === "output") lines.push(`  assign ${variable} = ${wireByPort.get(`${node.id}:in`)};`);
    if (node.type === "register") lines.push(`  always @(posedge clk or posedge reset) if (reset) ${variable} <= ${nodeWidth(node)}'b${"0".repeat(nodeWidth(node))}; else ${variable} <= ${wireByPort.get(`${node.id}:d`)};`);
  }
  lines.push("endmodule");
  return lines.join("\n");
}
