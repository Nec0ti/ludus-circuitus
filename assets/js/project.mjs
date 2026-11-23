import { createState, evaluate, generateVerilog, isValidSignalName, reset, tick, validateBlueprint } from "./engine.mjs";

const validName = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const key = (node, port) => node + ":" + port;
const inputsOf = (node, modules) => node.type === "module"
  ? (modules.get(node.module)?.nodes.filter((item) => item.type === "input").map((item) => item.name) || [])
  : ({ and: ["a", "b"], or: ["a", "b"], xor: ["a", "b"], not: ["in"], signal: ["in"], register: ["d"], output: ["in"] })[node.type] || [];
const outputsOf = (node, modules) => node.type === "module"
  ? (modules.get(node.module)?.nodes.filter((item) => item.type === "output").map((item) => item.name) || [])
  : node.type === "input" || ["and", "or", "xor", "not", "signal", "register"].includes(node.type) ? ["out"] : [];

function inspectBlueprint(bp, modules) {
  if (!bp || bp.version !== 1 || typeof bp.name !== "string" || !validName.test(bp.name) || !Array.isArray(bp.nodes) || !Array.isArray(bp.wires) || bp.nodes.length > 500 || bp.wires.length > 2000) throw new Error("Blueprint biçimi, adı, boyutu veya sürümü geçersiz.");
  const nodes = new Map(), names = new Set(), allowed = new Set(["input", "output", "and", "or", "xor", "not", "signal", "register", "module"]);
  for (const node of bp.nodes) {
    if (!node || typeof node.id !== "string" || !node.id || node.id.length > 100 || nodes.has(node.id) || !allowed.has(node.type)) throw new Error("Blok türü veya kimliği geçersiz.");
    if (node.type === "module" && (!modules.has(node.module) || !validName.test(node.name || "instance"))) throw new Error("Modül bloğu geçerli bir blueprint modülünü göstermeli.");
    if (["input", "output", "signal"].includes(node.type)) {
      if (!isValidSignalName(node.name) || node.name.length > 40 || names.has(node.name)) throw new Error("Giriş, çıkış ve ara sinyal adları geçerli ve benzersiz olmalı.");
      names.add(node.name);
    }
    nodes.set(node.id, node);
  }
  if (bp.nodes.some((node) => node.type === "register") && ["clk", "reset"].some((name) => names.has(name))) throw new Error("Sinyal adları clk/reset ile çakışamaz.");
  if (!bp.nodes.some((node) => node.type === "output")) throw new Error("Blueprint en az bir çıkış içermeli.");
  for (const node of bp.nodes.filter((item) => item.type === "module")) {
    const child = modules.get(node.module);
    if (child.nodes.filter((item) => item.type === "input").length > 8 || child.nodes.filter((item) => item.type === "output").length > 8) throw new Error("Bir BP modülü en fazla 8 giriş ve 8 çıkış portu kullanabilir.");
  }
  const destinations = new Set();
  for (const wire of bp.wires) {
    const from = nodes.get(wire?.from?.node), to = nodes.get(wire?.to?.node);
    if (!from || !to || !outputsOf(from, modules).includes(wire.from.port) || !inputsOf(to, modules).includes(wire.to.port)) throw new Error("Bağlantı geçersiz bir blok girişine veya çıkışına ulaşıyor.");
    const destination = key(to.id, wire.to.port);
    if (destinations.has(destination)) throw new Error("Bir blok girişine birden fazla sinyal bağlanamaz.");
    destinations.add(destination);
  }
  for (const node of bp.nodes) for (const port of inputsOf(node, modules)) if (!destinations.has(key(node.id, port))) throw new Error("Her blok girişi bir sinyale bağlı olmalı.");
}

function expand(top, modules) {
  const reserved = new Set([...modules.values()].flatMap((bp) => bp.nodes.map((node) => node.id)));
  const fresh = (prefix, counter) => {
    let id;
    do { id = "__ludus_" + prefix + "_" + counter(); } while (reserved.has(id));
    reserved.add(id);
    return id;
  };
  const result = { nodes: [], wires: [], aliases: new Map(), topOutputs: new Map(), nodeIndex: 0, instanceIndex: 0, fresh };
  const source = (node, port, refs, moduleIds, outputRefs) => {
    if (moduleIds.has(node)) return { node: moduleIds.get(node), port: port };
    if (outputRefs.has(node)) return outputRefs.get(node);
    const ref = refs.get(node);
    return ref ? { node: ref.node, port: ref.port } : undefined;
  };
  const visit = (bp, isTop, externalInputs, scope = "") => {
    const refs = new Map(), moduleIds = new Map(), outputRefs = new Map();
    for (const node of bp.nodes) {
      if (node.type === "input") {
        if (isTop) {
          refs.set(node.id, { node: node.id, port: "out" });
          result.nodes.push(node);
        } else refs.set(node.id, externalInputs[node.name]);
      } else if (node.type === "module") {
        moduleIds.set(node.id, result.fresh("instance", () => result.instanceIndex++));
      } else if (node.type !== "output" || isTop) {
        const id = isTop ? node.id : result.fresh("node", () => result.nodeIndex++);
        refs.set(node.id, { node: id, port: node.type === "output" ? "in" : "out" });
        result.nodes.push(isTop ? node : { ...node, id, ...(node.type === "signal" ? { name: `${scope}_${node.name}` } : {}) });
      }
    }
    for (const node of bp.nodes.filter((item) => item.type === "module")) {
      const child = modules.get(node.module);
      const childInputs = {};
      for (const input of child.nodes.filter((item) => item.type === "input")) {
        const wire = bp.wires.find((item) => item.to.node === node.id && item.to.port === input.name);
        childInputs[input.name] = source(wire.from.node, wire.from.port, refs, moduleIds, outputRefs);
      }
      const childOutputs = visit(child, false, childInputs, `${scope ? `${scope}_` : ""}${moduleIds.get(node.id)}`);
      for (const [name, ref] of Object.entries(childOutputs)) result.aliases.set(key(moduleIds.get(node.id), name), ref);
      if (isTop) result.topOutputs.set(node.id, childOutputs);
    }
    for (const node of bp.nodes.filter((item) => item.type === "output" && !isTop)) {
      const wire = bp.wires.find((item) => item.to.node === node.id && item.to.port === "in");
      outputRefs.set(node.id, source(wire.from.node, wire.from.port, refs, moduleIds, outputRefs));
    }
    for (const wire of bp.wires) {
      const target = bp.nodes.find((item) => item.id === wire.to.node);
      if (target.type === "module" || target.type === "output" && !isTop) continue;
      result.wires.push({
        from: source(wire.from.node, wire.from.port, refs, moduleIds, outputRefs),
        to: { node: refs.get(target.id).node, port: wire.to.port }
      });
    }
    return Object.fromEntries(bp.nodes.filter((node) => node.type === "output").map((node) => {
      const wire = bp.wires.find((item) => item.to.node === node.id && item.to.port === "in");
      return [node.name, source(wire.from.node, wire.from.port, refs, moduleIds, outputRefs)];
    }));
  };
  visit(top, true, {});
  const resolve = (ref, seen = new Set()) => {
    if (!ref) throw new Error("Modül çıkışı çözümlenemedi.");
    const aliasKey = key(ref.node, ref.port), alias = result.aliases.get(aliasKey);
    if (!alias) return { node: ref.node, port: "out" };
    if (seen.has(aliasKey)) throw new Error("Modül bağlantılarında döngü var.");
    seen.add(aliasKey);
    return resolve(alias, seen);
  };
  return {
    bp: {
      version: 1, name: top.name, nodes: result.nodes,
      wires: result.wires.map((wire) => ({ from: resolve(wire.from), to: wire.to }))
    },
    topModuleOutputs: Object.fromEntries([...result.topOutputs].map(([id, outputs]) => [id, Object.fromEntries(Object.entries(outputs).map(([name, ref]) => [name, resolve(ref).node]))]))
  };
}

export function validateProject(documents) {
  if (!Array.isArray(documents) || documents.length < 1 || documents.length > 8) throw new Error("Bir projede 1–8 blueprint bulunmalı.");
  const modules = new Map(), filenames = new Set();
  for (const doc of documents) {
    if (!doc || typeof doc.name !== "string" || !doc.name.endsWith(".bp") || filenames.has(doc.name)) throw new Error("Blueprint dosya adları .bp uzantılı ve benzersiz olmalı.");
    filenames.add(doc.name);
    if (!doc.bp || typeof doc.bp.name !== "string" || !Array.isArray(doc.bp.nodes) || !Array.isArray(doc.bp.wires) || modules.has(doc.bp.name)) throw new Error("Blueprint modül adları benzersiz olmalı.");
    modules.set(doc.bp.name, doc.bp);
  }
  const dependencies = new Map();
  for (const bp of modules.values()) {
    inspectBlueprint(bp, modules);
    dependencies.set(bp.name, bp.nodes.filter((node) => node.type === "module").map((node) => node.module));
  }
  const visiting = new Set(), visited = new Set();
  const visit = (name) => {
    if (visiting.has(name)) throw new Error("Blueprint modülleri birbirini döngüsel olarak çağıramaz.");
    if (visited.has(name)) return;
    visiting.add(name);
    for (const dependency of dependencies.get(name) || []) visit(dependency);
    visiting.delete(name);
    visited.add(name);
  };
  for (const name of modules.keys()) visit(name);
  for (const bp of modules.values()) validateBlueprint(expand(bp, modules).bp);
  return modules;
}

export function flattenProject(documents, topName) {
  const modules = validateProject(documents), top = modules.get(topName);
  if (!top) throw new Error("Üst blueprint bulunamadı.");
  return expand(top, modules);
}

export function createProjectState(documents, topName) {
  return createState(flattenProject(documents, topName).bp);
}

export function evaluateProject(documents, topName, inputs = {}, registers) {
  const { bp, topModuleOutputs } = flattenProject(documents, topName);
  const result = evaluate(bp, inputs, registers ?? createState(bp));
  const moduleOutputs = Object.fromEntries(Object.entries(topModuleOutputs).map(([id, outputs]) => [id, Object.fromEntries(Object.entries(outputs).map(([name, nodeId]) => [name, result.values[nodeId]]))]));
  const values = { ...result.values };
  for (const [id, outputs] of Object.entries(moduleOutputs)) {
    values[id] = Object.values(outputs)[0] ?? "X";
    for (const [name, value] of Object.entries(outputs)) values[id + ":" + name] = value;
  }
  return { ...result, values, moduleOutputs };
}

export function tickProject(documents, topName, inputs, registers) {
  return tick(flattenProject(documents, topName).bp, inputs, registers);
}

export function resetProject(documents, topName) {
  return reset(flattenProject(documents, topName).bp);
}

export function generateProjectVerilog(documents, topName) {
  return generateVerilog(flattenProject(documents, topName).bp);
}
