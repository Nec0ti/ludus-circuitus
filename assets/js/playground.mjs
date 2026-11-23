import { createState, halfAdderBlueprint, isValidSignalName, nodeWidth, X } from "./engine.mjs";
import { createProjectState, evaluateProject, flattenProject, generateProjectVerilog, resetProject, tickProject, validateProject } from "./project.mjs";

const $ = (selector) => document.querySelector(selector);
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const icons = { input: "IN", output: "OUT", constant: "#", and: "&", nand: "&○", or: "≥1", nor: "≥1○", xor: "=1", xnor: "=1○", not: "¬", mux: "MUX", signal: "SIG", register: "D" };
const labels = { input: "GİRİŞ", output: "ÇIKIŞ", constant: "SABİT", and: "AND", nand: "NAND", or: "OR", nor: "NOR", xor: "XOR", xnor: "XNOR", not: "NOT", mux: "SEÇİCİ", signal: "ARA SİNYAL", register: "YAZMAÇ" };
const storeKey = "ludus-circuitus-documents-v1";
const maxImportBytes = 1024 * 1024;
const snapToGrid = (value) => Math.round(value / 20) * 20;

function snapBlueprintPositions(bp) {
  if (Array.isArray(bp?.nodes)) for (const node of bp.nodes) {
    if (Number.isFinite(node?.x)) node.x = snapToGrid(node.x);
    if (Number.isFinite(node?.y)) node.y = snapToGrid(node.y);
  }
  return bp;
}

function basicBlueprint(name = "yeni_devre") {
  return {
    version: 1, name,
    nodes: [
      { id: crypto.randomUUID(), type: "input", name: "giris", x: 80, y: 200 },
      { id: crypto.randomUUID(), type: "output", name: "cikis", x: 700, y: 200 }
    ],
    wires: []
  };
}

let documents = [{ id: crypto.randomUUID(), name: "top.bp", bp: snapBlueprintPositions(halfAdderBlueprint()) }];
let activeId = documents[0].id;
let selectedIds = new Set();
let pendingSource = null;
let camera = { x: 0, y: 0, zoom: 1 };
let cameraReady = false;
let cameraEngaged = false;
let signalAnimation = "stopped";
const renderedNodes = new Map();
let pointCache = new Map();
let state = { registers: projectState(documents[0]), inputs: {}, tick: 0 };

function activeDocument() { return documents.find((doc) => doc.id === activeId); }
function projectState(doc) { try { return createProjectState(documents, doc.bp.name); } catch { return createState(doc.bp); } }
function moduleBlueprint(node) { return documents.find((doc) => doc.bp.name === node.module)?.bp; }
function inputNodes(bp) { return bp.nodes.filter((node) => node.type === "input"); }
function hasRegisters(bp) { try { return flattenProject(documents, bp.name).bp.nodes.some((node) => node.type === "register"); } catch { return bp.nodes.some((node) => node.type === "register"); } }
function currentInputs(bp) { return Object.fromEntries(inputNodes(bp).map((node) => [node.name, state.inputs[node.name] ?? (nodeWidth(node) === 1 ? 0 : "0".repeat(nodeWidth(node)))])); }
function portInputs(node) { return node.type === "module" ? (moduleBlueprint(node)?.nodes.filter((item) => item.type === "input").map((item) => item.name) || []) : ({ and: ["a", "b"], nand: ["a", "b"], or: ["a", "b"], nor: ["a", "b"], xor: ["a", "b"], xnor: ["a", "b"], not: ["in"], signal: ["in"], register: ["d"], output: ["in"], mux: ["sel", "a", "b"] })[node.type] || []; }
function portOutputs(node) { return node.type === "module" ? (moduleBlueprint(node)?.nodes.filter((item) => item.type === "output").map((item) => item.name) || []) : ["input", "constant", "and", "nand", "or", "nor", "xor", "xnor", "not", "signal", "register", "mux"].includes(node.type) ? ["out"] : []; }

function displayValue(value, width) {
  const bits = String(value ?? X);
  if (width === 1 || /[^01]/.test(bits)) return bits;
  return `${Number.parseInt(bits, 2)} · ${bits}`;
}

function signalClass(value) {
  const bits = String(value ?? X);
  return bits.includes("X") ? "x" : bits.includes("1") ? "1" : "0";
}

function safeEvaluate(doc) {
  try {
    validateProject(documents);
    return evaluateProject(documents, doc.bp.name, currentInputs(doc.bp), state.registers);
  } catch (error) {
    return { values: Object.fromEntries(doc.bp.nodes.map((node) => [node.id, node.type === "input" ? state.inputs[node.name] ?? 0 : X])), outputs: {}, error };
  }
}

function persist() {
  try {
    localStorage.setItem(storeKey, JSON.stringify(documents));
    $("#save-state").innerHTML = "<i></i> Bu cihazda saklandı";
  } catch {
    $("#save-state").textContent = "Yerel kayıt kullanılamıyor";
  }
}

function renderTabs() {
  const tabs = $("#document-tabs");
  tabs.replaceChildren();
  for (const doc of documents) {
    const wrap = el("div", `cad-tab-wrap${doc.id === activeId ? " is-active" : ""}`);
    const button = el("button", `cad-document-tab${doc.id === activeId ? " is-active" : ""}`, doc.name);
    button.type = "button";
    button.role = "tab";
    button.setAttribute("aria-selected", String(doc.id === activeId));
    button.addEventListener("click", () => switchDocument(doc.id));
    button.addEventListener("dblclick", () => renameDocument(doc));
    const close = el("button", "cad-tab-close", "×");
    close.type = "button";
    close.setAttribute("aria-label", `${doc.name} dosyasını kapat`);
    close.disabled = documents.length === 1;
    close.addEventListener("click", () => deleteDocument(doc));
    wrap.append(button, close);
    tabs.append(wrap);
  }
  const add = el("button", "cad-add-tab", "+");
  add.type = "button";
  add.setAttribute("aria-label", "Yeni blueprint aç");
  add.addEventListener("click", newDocument);
  tabs.append(add);
}

function renameDocument(doc) {
  const entered = window.prompt("Blueprint adı (uzantı olmadan)", doc.bp.name);
  if (!entered) return;
  const name = entered.trim().replace(/\.bp$/i, "");
  if (name.length > 80 || !isValidSignalName(name) || documents.some((item) => item.id !== doc.id && item.bp.name === name)) return announce("Ad 1–80 karakter olmalı, Verilog'da geçerli ve benzersiz olmalı.");
  const previous = doc.bp.name;
  doc.bp.name = name;
  doc.name = `${name}.bp`;
  for (const item of documents) for (const node of item.bp.nodes) if (node.type === "module" && node.module === previous) {
    node.module = name;
    node.name = node.name.replace(previous, name);
  }
  render(); persist(); announce(`${previous}.bp yeniden adlandırıldı.`);
}

function deleteDocument(doc) {
  if (documents.length === 1) return announce("Son blueprint dosyası kapatılamaz.");
  const users = documents.flatMap((item) => item.bp.nodes.filter((node) => node.type === "module" && node.module === doc.bp.name).map((node) => `${item.bp.name} içindeki ${node.name}`));
  if (!window.confirm(users.length ? `${doc.name} silinsin mi? Bağlı modül blokları da kaldırılır:\n${users.join("\n")}` : `${doc.name} silinsin mi?`)) return;
  for (const item of documents) {
    const removed = new Set(item.bp.nodes.filter((node) => node.type === "module" && node.module === doc.bp.name).map((node) => node.id));
    item.bp.nodes = item.bp.nodes.filter((node) => !removed.has(node.id));
    item.bp.wires = item.bp.wires.filter((wire) => !removed.has(wire.from.node) && !removed.has(wire.to.node));
  }
  documents = documents.filter((item) => item.id !== doc.id);
  if (activeId === doc.id) switchDocument(documents[0].id);
  else render();
  persist();
}

function renderModuleTools() {
  const shelf = $("#module-tools");
  if (!shelf) return;
  shelf.replaceChildren();
  for (const doc of documents.filter((item) => item.id !== activeId)) {
    const row = el("div", "cad-tool-row");
    const button = el("button", "cad-block-tool");
    button.type = "button";
    button.draggable = true;
    button.append(el("i", "cad-tool-symbol module-symbol", "BP"), el("span", "", doc.bp.name));
    button.addEventListener("click", () => addModule(doc.bp.name));
    button.addEventListener("dragstart", (event) => event.dataTransfer.setData("application/x-ludus-module", doc.bp.name));
    row.append(button);
    const help = el("a", "cad-help-icon");
    help.href = shelf.dataset.helpHref;
    help.target = "_blank";
    help.rel = "noopener";
    help.setAttribute("aria-label", `${doc.bp.name} modül yardımı, yeni sekmede`);
    const tooltip = el("span", "cad-tooltip", "Bu blueprint'i giriş ve çıkış portlarıyla tek blok olarak kullanır.");
    tooltip.setAttribute("role", "tooltip");
    help.append(el("span", "", "?"), tooltip);
    help.addEventListener("pointerenter", () => positionTooltip(help));
    help.addEventListener("focus", () => positionTooltip(help));
    row.append(help);
    shelf.append(row);
  }
  if (!shelf.children.length) shelf.append(el("small", "cad-module-empty", "Bir BP daha açınca burada modül olarak görünür."));
}

function positionTooltip(link) {
  const tooltip = link.querySelector(".cad-tooltip");
  const rect = link.getBoundingClientRect();
  tooltip.style.left = `${Math.max(8, Math.min(window.innerWidth - tooltip.offsetWidth - 8, rect.right + 8))}px`;
  tooltip.style.top = `${Math.max(8, Math.min(window.innerHeight - tooltip.offsetHeight - 8, rect.top))}px`;
}

function switchDocument(id) {
  stopSignalAnimation();
  activeId = id;
  selectedIds.clear();
  pendingSource = null;
  state = { registers: projectState(activeDocument()), inputs: {}, tick: 0 };
  render();
}

function render() {
  const doc = activeDocument();
  const bp = doc.bp;
  const result = safeEvaluate(doc);
  $("#file-name").textContent = doc.name;
  $("#hdl-file").textContent = doc.name.replace(/\.bp$/, ".v");
  $("#canvas-mode").textContent = hasRegisters(bp) ? "SIRALI DEVRE · YÜKSELEN KENAR" : "KOMBİNASYONEL DEVRE · PARALEL YOLLAR";
  $(".cad-clock").classList.toggle("is-hidden", !hasRegisters(bp));
  $("#graph-status").textContent = result.error ? result.error.message : "Tüm girişler bağlı · Blueprint geçerli";
  $("#selection-info").textContent = selectedIds.size ? `${selectedIds.size} blok seçili · Delete ile sil` : "Blok seçili değil";
  renderTabs();
  renderModuleTools();
  renderNodes(bp, result.values);
  renderWires(bp, result.values);
  renderVariables(bp, result);
  renderSignalView(bp, result.values);
  updateCamera();
  try { $("#verilog-code").textContent = generateProjectVerilog(documents, bp.name); }
  catch (error) { $("#verilog-code").textContent = `// ${error.message}\n// Tüm portları bağladıktan sonra Verilog oluşur.`; }
  $("#tick-count").textContent = String(state.tick).padStart(3, "0");
  $("#step-sim").disabled = !hasRegisters(bp);
  $("#signal-view").classList.toggle("is-playing", signalAnimation === "playing");
  $("#signal-view").classList.toggle("is-paused", signalAnimation === "paused");
  $("#play-sim").setAttribute("aria-pressed", String(signalAnimation === "playing"));
  $("#pause-sim").disabled = signalAnimation !== "playing";
  $("#stop-sim").disabled = signalAnimation === "stopped";
}

function fitCamera() {
  const canvas = $("#blueprint-canvas"), nodes = activeDocument().bp.nodes;
  const width = canvas.clientWidth, height = canvas.clientHeight;
  const minX = Math.min(...nodes.map((node) => node.x)), minY = Math.min(...nodes.map((node) => node.y));
  const maxX = Math.max(...nodes.map((node) => node.x + 150)), maxY = Math.max(...nodes.map((node) => node.y + (node.type === "module" ? Math.max(88, 36 + Math.max(portInputs(node).length, portOutputs(node).length) * 16) : 88)));
  camera.zoom = Math.max(0.58, Math.min(1.5, (width - 64) / (maxX - minX), (height - 64) / (maxY - minY)));
  camera.x = (width - (maxX - minX) * camera.zoom) / 2 - minX * camera.zoom;
  camera.y = (height - (maxY - minY) * camera.zoom) / 2 - minY * camera.zoom;
  cameraReady = true;
  cameraEngaged = false;
}

function updateCamera() {
  const canvas = $("#blueprint-canvas"), world = $("#camera-world");
  if (!cameraReady) fitCamera();
  world.style.setProperty("--camera-zoom", camera.zoom);
  world.style.transform = `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`;
  canvas.style.backgroundSize = `${20 * camera.zoom}px ${20 * camera.zoom}px, ${100 * camera.zoom}px ${100 * camera.zoom}px, ${100 * camera.zoom}px ${100 * camera.zoom}px`;
  canvas.style.backgroundPosition = `${camera.x}px ${camera.y}px, ${camera.x}px ${camera.y}px, ${camera.x}px ${camera.y}px`;
  $("#zoom-level").textContent = `${Math.round(camera.zoom * 100)}%`;
}

function screenToWorld(clientX, clientY) {
  const rect = $("#blueprint-canvas").getBoundingClientRect();
  return { x: Math.round(((clientX - rect.left - camera.x) / camera.zoom) / 20) * 20, y: Math.round(((clientY - rect.top - camera.y) / camera.zoom) / 20) * 20 };
}

function renderNodes(bp, values) {
  const layer = $("#node-layer");
  layer.replaceChildren();
  renderedNodes.clear();
  for (const node of bp.nodes) {
    const card = el("article", `cad-node node-${node.type}${selectedIds.has(node.id) ? " is-selected" : ""}`);
    card.style.left = `${node.x}px`;
    card.style.top = `${node.y}px`;
    if (node.type === "module") card.style.height = `${Math.max(88, 36 + Math.max(portInputs(node).length, portOutputs(node).length) * 16)}px`;
    card.dataset.id = node.id;
    const header = el("div", "cad-node-head");
    header.append(el("span", "cad-node-icon", node.type === "module" ? "BP" : icons[node.type]));
    const title = el("button", "cad-node-name", node.type === "module" ? node.module : node.name || labels[node.type]);
    title.type = "button";
    title.title = "Yeniden adlandırmak için çift tıkla";
    title.addEventListener("click", (event) => event.stopPropagation());
    title.addEventListener("dblclick", (event) => {
      event.stopPropagation();
      if (!["input", "output", "signal"].includes(node.type)) return;
      const next = window.prompt("Sinyal adı (İngilizce harf, rakam ve _)", node.name);
      if (next === null) return;
      const name = next.trim();
      if (!isValidSignalName(name) || name.length > 40 || bp.nodes.some((item) => item.id !== node.id && ["input", "output", "signal"].includes(item.type) && item.name === name) || bp.nodes.some((item) => item.type === "register") && ["clk", "reset"].includes(name)) return announce("Sinyal adı geçerli, benzersiz olmalı ve clk/reset ile çakışmamalı.");
      node.name = name;
      render(); persist();
    });
    header.append(title);
    if (node.type !== "module" && selectedIds.has(node.id)) {
      const width = el("select", "cad-node-width");
      width.setAttribute("aria-label", `${labels[node.type]} bit genişliği`);
      Array.from({ length: 32 }, (_, index) => index + 1).forEach((bits) => {
        const option = el("option", "", `${bits} bit`); option.value = String(bits); option.selected = bits === nodeWidth(node); width.append(option);
      });
      width.addEventListener("pointerdown", (event) => event.stopPropagation());
      width.addEventListener("click", (event) => event.stopPropagation());
      width.addEventListener("change", () => setNodeWidth(node, Number(width.value)));
      header.append(width);
    }
    const remove = el("button", "cad-node-remove", "×");
    remove.type = "button";
    remove.setAttribute("aria-label", `${node.name || labels[node.type]} bloğunu sil`);
    remove.addEventListener("click", (event) => { event.stopPropagation(); removeNode(node.id); });
    header.append(remove);
    card.append(header);
    const ports = el("div", "cad-node-ports");
    for (const port of portInputs(node)) ports.append(makePort(node, port, "input"));
    const value = values[node.id] ?? X;
    const valueBadge = el(node.type === "constant" ? "button" : "span", `cad-node-value value-${signalClass(value)}`, displayValue(value, nodeWidth(node)));
    if (node.type === "constant") {
      valueBadge.type = "button";
      valueBadge.setAttribute("aria-label", `Sabit değerini düzenle: ${displayValue(value, nodeWidth(node))}`);
      valueBadge.addEventListener("pointerdown", (event) => event.stopPropagation());
      valueBadge.addEventListener("click", (event) => { event.stopPropagation(); editConstant(node); });
    }
    ports.append(valueBadge);
    for (const port of portOutputs(node)) ports.append(makePort(node, port, "output"));
    card.append(ports);
    card.addEventListener("pointerdown", (event) => beginDrag(event, node));
    card.addEventListener("click", () => { selectedIds = new Set([node.id]); render(); });
    layer.append(card);
    renderedNodes.set(node.id, card);
  }
}

function setNodeWidth(node, width) {
  if (!Number.isInteger(width) || width < 1 || width > 32) return announce("Bit genişliği 1–32 arasında olmalı.");
  const oldWidth = nodeWidth(node), oldValue = node.type === "constant" ? String(node.value ?? 0) : null;
  node.width = width;
  if (node.type === "constant") node.value = width === 1 ? Number(oldValue.at(-1) === "1") : oldValue.padStart(width, "0").slice(-width);
  if (node.type === "input" && state.inputs[node.name] !== undefined && width !== oldWidth) {
    const oldBits = oldWidth === 1 ? String(state.inputs[node.name]) : String(state.inputs[node.name]);
    state.inputs[node.name] = width === 1 ? Number(oldBits.at(-1) === "1") : oldBits.replace(/[^01]/g, "0").padStart(width, "0").slice(-width);
  }
  if (node.type === "register") state.registers = projectState(activeDocument());
  render(); persist();
}

function decimalBits(value, width) {
  if (!/^\d+$/.test(value)) return null;
  const number = BigInt(value);
  if (number < 0n || number >= (1n << BigInt(width))) return null;
  const bits = number.toString(2).padStart(width, "0");
  return width === 1 ? Number(bits) : bits;
}

function editConstant(node) {
  const raw = window.prompt(`Sabit değeri (0–${(1n << BigInt(nodeWidth(node))) - 1n})`, String(BigInt(`0b${String(node.value).replaceAll("X", "0")}`)));
  if (raw === null) return;
  const value = decimalBits(raw.trim(), nodeWidth(node));
  if (value === null) return announce(`0 ile ${(1n << BigInt(nodeWidth(node))) - 1n} arasında bir tam sayı gir.`);
  node.value = nodeWidth(node) === 1 ? value : value.toString(2).padStart(nodeWidth(node), "0");
  render(); persist();
}

function makePort(node, port, direction) {
  const button = el("button", `cad-port port-${direction}`, direction === "output" && node.type !== "module" ? "" : port.toUpperCase());
  button.type = "button";
  button.dataset.node = node.id;
  button.dataset.port = port;
  button.dataset.direction = direction;
  button.setAttribute("aria-label", `${node.name || labels[node.type]} ${port} ${direction === "output" ? "çıkışı" : "girişi"}`);
  if (direction === "output" && pendingSource?.node === node.id) button.classList.add("is-pending");
  if (node.type === "module") {
    const all = direction === "input" ? portInputs(node) : portOutputs(node);
    const index = all.indexOf(port), top = 42 + index * 16;
    button.style.top = `${top}px`;
    button.style[direction === "input" ? "left" : "right"] = direction === "input" ? "-6px" : "4px";
  }
  button.addEventListener("pointerdown", (event) => event.stopPropagation());
  button.addEventListener("click", (event) => { event.stopPropagation(); connectPort(node.id, port, direction); });
  return button;
}

function point(node, port, direction) {
  const key = `${node.id}:${direction}:${port}`;
  if (pointCache.has(key)) return pointCache.get(key);
  const button = [...(renderedNodes.get(node.id)?.querySelectorAll(".cad-port") || [])].find((item) => item.dataset.port === port && item.dataset.direction === direction);
  if (!button) return { x: node.x + (direction === "output" ? 150 : 0), y: node.y + 44 };
  const rect = button.getBoundingClientRect(), canvas = $("#blueprint-canvas").getBoundingClientRect();
  const result = { x: (rect.left + rect.width / 2 - canvas.left - camera.x) / camera.zoom, y: (rect.top + rect.height / 2 - canvas.top - camera.y) / camera.zoom };
  pointCache.set(key, result);
  return result;
}

function miniPoint(node, port, direction) {
  if (node.type === "module") return point(node, port, direction);
  if (direction === "output") return { x: node.x + 150, y: node.y + 44 };
  if (node.type === "mux") return { x: node.x, y: node.y + ({ sel: 27, a: 44, b: 61 }[port] || 44) };
  if (port === "a") return { x: node.x, y: node.y + 27 };
  if (port === "b") return { x: node.x, y: node.y + 59 };
  return { x: node.x, y: node.y + 44 };
}

function makePath(from, to, className, value) {
  const mid = Math.round(from.x + Math.max(38, (to.x - from.x) * 0.5));
  const radius = Math.min(12, Math.abs(mid - from.x) / 2, Math.abs(to.y - from.y) / 2);
  const dir = to.y >= from.y ? 1 : -1;
  const d = `M${from.x} ${from.y} H${mid - radius} Q${mid} ${from.y} ${mid} ${from.y + dir * radius} V${to.y - dir * radius} Q${mid} ${to.y} ${mid + radius} ${to.y} H${to.x}`;
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("class", `${className} signal-${signalClass(value)}`);
  return path;
}

function renderWires(bp, values) {
  const svg = $("#wire-layer");
  pointCache = new Map();
  svg.replaceChildren();
  const nodes = new Map(bp.nodes.map((node) => [node.id, node]));
  for (const wire of bp.wires) {
    const source = nodes.get(wire.from.node);
    const target = nodes.get(wire.to.node);
    if (!source || !target) continue;
    const path = makePath(point(source, wire.from.port, "output"), point(target, wire.to.port, "input"), "cad-wire", values[`${source.id}:${wire.from.port}`] ?? values[source.id] ?? X);
    path.dataset.fromNode = source.id;
    path.dataset.fromPort = wire.from.port;
    path.dataset.toNode = target.id;
    path.dataset.toPort = wire.to.port;
    svg.append(path);
  }
  if (pendingSource) {
    const source = nodes.get(pendingSource.node);
    if (source) svg.append(makePath(point(source, "out", "output"), { x: source.x + 260, y: source.y + 44 }, "cad-wire wire-pending", X));
  }
}

function renderVariables(bp, result) {
  const list = $("#variable-list");
  list.replaceChildren();
  const vars = bp.nodes.filter((node) => ["input", "output", "signal", "register"].includes(node.type));
  $("#variable-count").textContent = `${vars.length} SİNYAL`;
  for (const node of vars) {
    const value = node.type === "input" ? state.inputs[node.name] ?? 0 : node.type === "output" ? result.outputs[node.name] ?? X : node.type === "signal" ? result.values[node.id] ?? X : state.registers[node.id] ?? X;
    const item = node.type === "input" ? el("button", "cad-variable is-input") : el("div", "cad-variable");
    item.dataset.node = node.id;
    if (node.type === "input") {
      item.type = "button";
      item.addEventListener("click", () => {
        const width = nodeWidth(node), current = state.inputs[node.name] ?? (width === 1 ? 0 : "0".repeat(width));
        if (width === 1) state.inputs[node.name] = current ? 0 : 1;
        else {
          const entered = window.prompt(`${node.name} için onluk değer (0–${(1n << BigInt(width)) - 1n})`, String(BigInt(`0b${current}`)));
          if (entered === null) return;
          const next = decimalBits(entered.trim(), width);
          if (next === null) return announce(`0 ile ${(1n << BigInt(width)) - 1n} arasında bir tam sayı gir.`);
          state.inputs[node.name] = next;
        }
        render();
      });
    }
    item.append(el("span", "cad-variable-name", node.name || (node.type === "register" ? "Q" : "Sinyal")));
    item.append(el("span", `cad-variable-value value-${signalClass(value)}`, displayValue(value, nodeWidth(node))));
    item.append(el("small", "", node.type === "input" ? `Giriş · ${nodeWidth(node)} bit · değiştir` : node.type === "register" ? `Yazmaç · ${nodeWidth(node)} bit` : node.type === "signal" ? `Ara sinyal · ${nodeWidth(node)} bit` : `Çıkış · ${nodeWidth(node)} bit`));
    list.append(item);
  }
}

function renderSignalView(bp, values) {
  const host = $("#signal-view");
  host.replaceChildren();
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 900 600");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Blueprint bağlantılarının mantıksal sinyal değerleri");
  const nodes = new Map(bp.nodes.map((node) => [node.id, node]));
  for (const wire of bp.wires) {
    const source = nodes.get(wire.from.node), target = nodes.get(wire.to.node);
    if (source && target) svg.append(makePath(miniPoint(source, wire.from.port, "output"), miniPoint(target, wire.to.port, "input"), "cad-mini-wire", values[`${source.id}:${wire.from.port}`] ?? values[source.id] ?? X));
  }
  for (const node of bp.nodes) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", `translate(${node.x} ${node.y})`);
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "150"); rect.setAttribute("height", "88"); rect.setAttribute("rx", "9");
    rect.setAttribute("class", `cad-mini-node mini-${node.type}`);
    group.append(rect);
    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.setAttribute("x", "75"); title.setAttribute("y", "35"); title.setAttribute("text-anchor", "middle");
    title.setAttribute("class", "cad-mini-title"); title.textContent = node.name || labels[node.type]; group.append(title);
    const value = document.createElementNS("http://www.w3.org/2000/svg", "text");
    value.setAttribute("x", "75"); value.setAttribute("y", "67"); value.setAttribute("text-anchor", "middle");
    value.setAttribute("class", `cad-mini-value value-${signalClass(values[node.id] ?? X)}`); value.textContent = displayValue(values[node.id] ?? X, nodeWidth(node)); group.append(value);
    svg.append(group);
  }
  host.append(svg);
}

function connectPort(nodeId, port, direction) {
  if (direction === "output") {
    pendingSource = { node: nodeId, port };
    $("#sim-status").textContent = "Şimdi bağlanacak bloğun giriş portunu seç.";
    render();
    return;
  }
  if (!pendingSource) return announce("Önce bir çıkış portu seç.");
  const bp = activeDocument().bp;
  bp.wires = bp.wires.filter((wire) => !(wire.to.node === nodeId && wire.to.port === port));
  bp.wires.push({ from: pendingSource, to: { node: nodeId, port } });
  pendingSource = null;
  render();
  persist();
}

function beginDrag(event, node) {
  if (event.button !== 0 || event.target.closest("button")) return;
  if (!selectedIds.has(node.id)) {
    selectedIds = new Set([node.id]);
    for (const [id, card] of renderedNodes) card.classList.toggle("is-selected", id === node.id);
  }
  const bp = activeDocument().bp;
  const moving = bp.nodes.filter((item) => selectedIds.has(item.id));
  const origins = new Map(moving.map((item) => [item.id, { x: item.x, y: item.y }]));
  const startX = event.clientX, startY = event.clientY;
  event.currentTarget.setPointerCapture(event.pointerId);
  const card = event.currentTarget;
  const move = (e) => {
    const dx = snapToGrid((e.clientX - startX) / camera.zoom), dy = snapToGrid((e.clientY - startY) / camera.zoom);
    for (const item of moving) {
      item.x = origins.get(item.id).x + dx;
      item.y = origins.get(item.id).y + dy;
      const element = renderedNodes.get(item.id);
      element.style.left = `${item.x}px`;
      element.style.top = `${item.y}px`;
    }
    updateCamera();
    const result = safeEvaluate(activeDocument());
    renderWires(bp, result.values);
    renderSignalView(bp, result.values);
  };
  const up = () => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerup", up); render(); persist(); };
  card.addEventListener("pointermove", move);
  card.addEventListener("pointerup", up, { once: true });
}

function addNode(type, at = null) {
  const bp = activeDocument().bp;
  const count = bp.nodes.filter((node) => node.type === type).length;
  if (type === "input" && count >= 12) return announce("Bir devrede en fazla 12 giriş ekleyebilirsin.");
  const index = bp.nodes.length;
  const x = at ? snapToGrid(at.x) : type === "input" ? 60 : type === "output" ? 700 : snapToGrid(310 + (index % 2) * 190);
  const y = at ? snapToGrid(at.y) : snapToGrid(60 + Math.floor(index / 2) % 5 * 100);
  const defaultName = type === "input" ? `giris${count ? count + 1 : ""}` : type === "output" ? `cikis${count ? count + 1 : ""}` : `ara_sinyal_${count + 1}`;
  let name = ["input", "output", "signal"].includes(type) ? defaultName : "";
  if (type === "signal") while (bp.nodes.some((item) => item.name === name)) name += "_";
  const node = { id: crypto.randomUUID(), type, name, x, y, ...(type === "constant" ? { value: 0 } : {}) };
  bp.nodes.push(node);
  selectedIds = new Set([node.id]);
  render();
  persist();
}

function addModule(moduleName, at = null) {
  const bp = activeDocument().bp;
  const index = bp.nodes.length;
  const count = bp.nodes.filter((node) => node.type === "module" && node.module === moduleName).length;
  const node = { id: crypto.randomUUID(), type: "module", module: moduleName, name: `${moduleName}_${count + 1}`, x: at ? snapToGrid(at.x) : snapToGrid(310 + (index % 2) * 190), y: at ? snapToGrid(at.y) : snapToGrid(60 + Math.floor(index / 2) % 5 * 100) };
  bp.nodes.push(node);
  selectedIds = new Set([node.id]);
  render();
  persist();
}

function removeNode(id) {
  removeNodes(new Set([id]));
}

function removeSelectedNodes() {
  if (selectedIds.size) removeNodes(new Set(selectedIds));
}

function removeNodes(ids) {
  const bp = activeDocument().bp;
  bp.nodes = bp.nodes.filter((node) => !ids.has(node.id));
  bp.wires = bp.wires.filter((wire) => !ids.has(wire.from.node) && !ids.has(wire.to.node));
  for (const id of ids) if (state.registers[id] !== undefined) delete state.registers[id];
  selectedIds = new Set();
  render();
  persist();
}

function newDocument() {
  if (documents.length >= 8) return announce("Aynı anda en fazla 8 blueprint açık tutabilirsin.");
  stopSignalAnimation();
  const doc = { id: crypto.randomUUID(), name: `devre${documents.length + 1}.bp`, bp: basicBlueprint(`devre${documents.length + 1}`) };
  documents.push(doc);
  activeId = doc.id;
  state = { registers: projectState(doc), inputs: {}, tick: 0 };
  render();
  persist();
}

function saveLocal() { persist(); announce("Blueprint bu cihazda kaydedildi."); }
function exportBlueprint() {
  const doc = activeDocument();
  snapBlueprintPositions(doc.bp);
  persist();
  const blob = new Blob([JSON.stringify(doc.bp, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob); link.download = doc.name;
  link.click(); URL.revokeObjectURL(link.href);
}

async function importBlueprint(file) {
  if (file.size > maxImportBytes) return announce("Blueprint dosyası 1 MB sınırını aşıyor.");
  const doc = activeDocument(), previous = { bp: doc.bp, name: doc.name };
  try {
    const bp = JSON.parse(await file.text());
      doc.bp = snapBlueprintPositions(bp);
    doc.name = file.name.endsWith(".bp") ? file.name : `${bp.name}.bp`;
    validateProject(documents);
    state = { registers: projectState(doc), inputs: {}, tick: 0 };
    stopSignalAnimation();
    render(); persist(); announce("Blueprint açıldı.");
  } catch (error) { doc.bp = previous.bp; doc.name = previous.name; announce(`Dosya açılamadı: ${error.message}`); }
}

function announce(message) { $("#sim-status").textContent = message; }
function stopSignalAnimation() { signalAnimation = "stopped"; }

function play() {
  signalAnimation = "playing";
  announce("Sağdaki devrede mantıksal sinyal yolları canlandırılıyor. Giriş ve yazmaç değerleri değişmez.");
  render();
}

function pauseSignalAnimation() {
  if (signalAnimation !== "playing") return;
  signalAnimation = "paused";
  announce("Sinyal görselleştirmesi duraklatıldı; devre değerleri değişmedi.");
  render();
}

function stopSignalAnimationAndAnnounce() {
  stopSignalAnimation();
  announce("Sinyal görselleştirmesi durduruldu ve başa alındı; devre değerleri değişmedi.");
  render();
}

function tickOnce() {
  const bp = activeDocument().bp;
  if (!hasRegisters(bp)) return announce("Bu devrede yazmaç olmadığı için clock tiki yok; girişleri değiştirerek sinyali izle.");
  try {
    validateProject(documents);
    state.registers = tickProject(documents, bp.name, currentInputs(bp), state.registers);
    state.tick++;
    $("#clock-led").classList.add("is-on");
    window.setTimeout(() => $("#clock-led").classList.remove("is-on"), 140);
    render();
    announce(`Yükselen kenar ${state.tick}: yazmaç değerleri birlikte güncellendi.`);
    return true;
  } catch (error) { announce(error.message); return false; }
}

$("#play-sim").addEventListener("click", play);
$("#step-sim").addEventListener("click", tickOnce);
$("#pause-sim").addEventListener("click", pauseSignalAnimation);
$("#stop-sim").addEventListener("click", stopSignalAnimationAndAnnounce);
$("#reset-sim").addEventListener("click", () => { try { state.registers = resetProject(documents, activeDocument().bp.name); } catch { state.registers = createState(activeDocument().bp); } state.tick = 0; render(); announce("Yazmaç değerleri sıfırlandı; girişler değişmedi."); });
$("#step-speed").addEventListener("change", () => { document.documentElement.style.setProperty("--cad-signal-duration", `${Number($("#step-speed").value) / 1000}s`); });
document.documentElement.style.setProperty("--cad-signal-duration", `${Number($("#step-speed").value) / 1000}s`);
document.querySelectorAll("[data-add]").forEach((button) => {
  button.draggable = true;
  button.addEventListener("click", () => addNode(button.dataset.add));
  button.addEventListener("dragstart", (event) => event.dataTransfer.setData("application/x-ludus-block", button.dataset.add));
});
document.querySelectorAll(".cad-help-icon").forEach((link) => {
  const position = () => {
    const tooltip = link.querySelector(".cad-tooltip");
    const rect = link.getBoundingClientRect();
    tooltip.style.left = `${Math.max(8, Math.min(window.innerWidth - tooltip.offsetWidth - 8, rect.right + 8))}px`;
    tooltip.style.top = `${Math.max(8, Math.min(window.innerHeight - tooltip.offsetHeight - 8, rect.top))}px`;
  };
  link.addEventListener("pointerenter", position);
  link.addEventListener("focus", position);
});
$("#new-bp").addEventListener("click", newDocument);
$("#save-bp").addEventListener("click", saveLocal);
$("#export-bp").addEventListener("click", exportBlueprint);
$("#import-bp").addEventListener("click", () => $("#import-file").click());
$("#import-file").addEventListener("change", (event) => { if (event.target.files[0]) importBlueprint(event.target.files[0]); event.target.value = ""; });
$("#copy-verilog").addEventListener("click", async () => { try { await navigator.clipboard.writeText($("#verilog-code").textContent); announce("Verilog kodu panoya kopyalandı."); } catch { announce("Tarayıcı panoya erişim izni vermedi."); } });
document.addEventListener("keydown", (event) => {
  if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName) || event.ctrlKey || event.metaKey) return;
  if (event.key === "Delete" && selectedIds.size) removeSelectedNodes();
  const shortcuts = { i: "input", o: "output", a: "and", r: "or", x: "xor", n: "not", q: "register" };
  if (shortcuts[event.key.toLowerCase()]) addNode(shortcuts[event.key.toLowerCase()]);
});

const canvas = $("#blueprint-canvas"), caller = $("#node-caller"), search = $("#node-search"), options = $("#node-options"), selectionBox = $("#selection-box");
$("#shelf-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget, expanded = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(expanded));
  button.closest(".cad-tools").classList.toggle("is-open", expanded);
  button.textContent = expanded ? "Blokları gizle −" : "Blokları göster ＋";
});
let spaceDown = false;
let callerEntries = [];
let callerIndex = 0;
function describeBlock(type) {
  return ({ input: "Seçilen bit genişliğinde onluk giriş değeri verir.", output: "Bir mantık yolunun sonucunu gösterir.", constant: "Sabit bir onluk değeri bit dizisine çevirir.", and: "Her bit konumunda iki giriş de 1 ise 1 üretir.", nand: "AND sonucundaki her biti tersine çevirir.", or: "Her bit konumunda en az bir giriş 1 ise 1 üretir.", nor: "OR sonucundaki her biti tersine çevirir.", xor: "Her bit konumunda girişler farklıysa 1 üretir.", xnor: "XOR sonucundaki her biti tersine çevirir.", not: "Girişin her bitini tersine çevirir.", mux: "Seçim girişi a veya b yolundan birini çıkışa bağlar.", signal: "Bir sinyale ad verir; değer saklamaz.", register: "Değeri clock tikinde saklar." })[type] || "";
}
function matchingBlocks(query = "") {
  const q = query.trim().toLocaleLowerCase("tr");
  const blocks = Object.entries(labels).map(([type, label]) => ({ type, label, description: describeBlock(type), search: `${type} ${label} ${describeBlock(type)}`.toLocaleLowerCase("tr") }));
  for (const doc of documents.filter((item) => item.id !== activeId)) blocks.push({ type: "module", moduleName: doc.bp.name, label: doc.bp.name, description: "Giriş ve çıkış portları olan başka bir blueprint.", search: `${doc.bp.name} ${doc.name} modül blueprint`.toLocaleLowerCase("tr") });
  const synonyms = { and: "ve", or: "veya", xor: "ayrık veya", not: "değil", register: "yazmaç", input: "giriş in", output: "çıkış out", module: "bp" };
  return blocks.filter((item) => !q || item.search.includes(q) || synonyms[item.type]?.includes(q));
}
function renderCallerOptions() {
  callerEntries = matchingBlocks(search.value);
  callerIndex = Math.min(callerIndex, Math.max(0, callerEntries.length - 1));
  options.replaceChildren();
  callerEntries.forEach((item, index) => {
    const row = el("li");
    row.setAttribute("role", "presentation");
    const option = el("button", "btn btn-ghost cad-node-option");
    option.type = "button";
    option.id = `node-option-${index}`;
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", String(index === callerIndex));
    option.append(el("strong", "", item.label), el("small", "", item.description));
    option.addEventListener("pointerenter", () => { callerIndex = index; syncCallerHighlight(); });
    option.addEventListener("click", () => addCallerEntry(item));
    row.append(option);
    options.append(row);
  });
  if (!callerEntries.length) options.append(el("li", "cad-node-empty", "Bu aramayla eşleşen blok yok."));
  syncCallerHighlight();
}
function syncCallerHighlight() {
  [...options.querySelectorAll('[role="option"]')].forEach((option, index) => {
    option.setAttribute("aria-selected", String(index === callerIndex));
  });
  search.setAttribute("aria-activedescendant", callerEntries.length ? `node-option-${callerIndex}` : "");
}
function closeNodeCaller(returnFocus = false) {
  caller.hidden = true;
  search.setAttribute("aria-expanded", "false");
  if (returnFocus) canvas.focus();
}
function addCallerEntry(item) {
  const position = JSON.parse(search.dataset.world || "null");
  closeNodeCaller();
  if (item.type === "module") addModule(item.moduleName, position);
  else addNode(item.type, position);
}
function openNodeCaller(clientX, clientY) {
  const bounds = canvas.getBoundingClientRect();
  search.dataset.world = JSON.stringify(screenToWorld(clientX, clientY));
  caller.hidden = false;
  search.setAttribute("aria-expanded", "true");
  search.value = "";
  callerIndex = 0;
  renderCallerOptions();
  caller.style.left = `${Math.max(8, Math.min(bounds.width - 300, clientX - bounds.left))}px`;
  caller.style.top = `${Math.max(8, Math.min(bounds.height - 360, clientY - bounds.top))}px`;
  search.focus();
  search.select();
}
function panByPointer(event) {
  event.preventDefault();
  const start = { x: event.clientX, y: event.clientY, cameraX: camera.x, cameraY: camera.y };
  canvas.setPointerCapture(event.pointerId);
  const move = (next) => {
    camera.x = start.cameraX + next.clientX - start.x;
    camera.y = start.cameraY + next.clientY - start.y;
    cameraEngaged = true;
    updateCamera();
  };
  const up = () => { canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerup", up); };
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up, { once: true });
}
function beginSelection(event) {
  event.preventDefault();
  const startX = event.clientX, startY = event.clientY, rect = canvas.getBoundingClientRect();
  const original = event.shiftKey ? new Set(selectedIds) : new Set();
  let moved = false;
  canvas.setPointerCapture(event.pointerId);
  const move = (next) => {
    const dx = next.clientX - startX, dy = next.clientY - startY;
    if (Math.hypot(dx, dy) > 4) moved = true;
    if (!moved) return;
    const left = Math.min(startX, next.clientX) - rect.left, top = Math.min(startY, next.clientY) - rect.top;
    selectionBox.hidden = false;
    selectionBox.style.left = `${left}px`; selectionBox.style.top = `${top}px`;
    selectionBox.style.width = `${Math.abs(dx)}px`; selectionBox.style.height = `${Math.abs(dy)}px`;
  };
  const up = (next) => {
    canvas.removeEventListener("pointermove", move);
    canvas.removeEventListener("pointerup", up);
    selectionBox.hidden = true;
    if (moved) {
      const box = { left: Math.min(startX, next.clientX), right: Math.max(startX, next.clientX), top: Math.min(startY, next.clientY), bottom: Math.max(startY, next.clientY) };
      selectedIds = new Set([...original, ...activeDocument().bp.nodes.filter((node) => {
        const nodeRect = renderedNodes.get(node.id).getBoundingClientRect();
        return nodeRect.right >= box.left && nodeRect.left <= box.right && nodeRect.bottom >= box.top && nodeRect.top <= box.bottom;
      }).map((node) => node.id)]);
    } else selectedIds = original;
    render();
  };
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up, { once: true });
}
document.addEventListener("keydown", (event) => { if (event.code === "Space" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) { spaceDown = true; event.preventDefault(); } });
document.addEventListener("keyup", (event) => { if (event.code === "Space") spaceDown = false; });
canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  const rect = canvas.getBoundingClientRect(), px = event.clientX - rect.left, py = event.clientY - rect.top;
  const next = Math.max(0.25, Math.min(2.5, camera.zoom * (event.deltaY < 0 ? 1.12 : 1 / 1.12)));
  const worldX = (px - camera.x) / camera.zoom, worldY = (py - camera.y) / camera.zoom;
  camera = { x: px - worldX * next, y: py - worldY * next, zoom: next };
  cameraReady = true;
  cameraEngaged = true;
  updateCamera();
}, { passive: false });
canvas.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".cad-node") || caller.contains(event.target)) return;
  if (event.pointerType === "touch" && event.button === 0) {
    event.preventDefault();
    const start = { x: event.clientX, y: event.clientY, cameraX: camera.x, cameraY: camera.y };
    let moved = false;
    canvas.setPointerCapture(event.pointerId);
    const move = (next) => {
      if (Math.hypot(next.clientX - start.x, next.clientY - start.y) > 5) moved = true;
      if (moved) { camera.x = start.cameraX + next.clientX - start.x; camera.y = start.cameraY + next.clientY - start.y; cameraEngaged = true; updateCamera(); }
    };
    const up = (next) => {
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      if (!moved) openNodeCaller(next.clientX, next.clientY);
    };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up, { once: true });
    return;
  }
  if (event.button === 1 || (event.button === 0 && spaceDown)) return panByPointer(event);
  if (event.button === 2) {
    event.preventDefault();
    const start = { x: event.clientX, y: event.clientY, cameraX: camera.x, cameraY: camera.y };
    let moved = false;
    canvas.setPointerCapture(event.pointerId);
    const move = (next) => {
      if (Math.hypot(next.clientX - start.x, next.clientY - start.y) > 5) moved = true;
      if (moved) { camera.x = start.cameraX + next.clientX - start.x; camera.y = start.cameraY + next.clientY - start.y; cameraEngaged = true; updateCamera(); }
    };
    const up = () => {
      canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerup", up);
      if (!moved) openNodeCaller(start.x, start.y);
    };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up, { once: true });
    return;
  }
  if (event.button === 0) return beginSelection(event);
});
canvas.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("pointerdown", (event) => { if (!caller.hidden && !caller.contains(event.target)) closeNodeCaller(); }, true);
caller.addEventListener("focusout", () => requestAnimationFrame(() => { if (!caller.contains(document.activeElement)) closeNodeCaller(); }));
canvas.addEventListener("dragover", (event) => { if ([...event.dataTransfer.types].some((type) => type.startsWith("application/x-ludus-"))) event.preventDefault(); });
canvas.addEventListener("drop", (event) => {
  const type = event.dataTransfer.getData("application/x-ludus-block"), moduleName = event.dataTransfer.getData("application/x-ludus-module");
  if (!type && !moduleName) return;
  event.preventDefault();
  const position = screenToWorld(event.clientX, event.clientY);
  if (moduleName) addModule(moduleName, position); else addNode(type, position);
});
search.addEventListener("input", () => { callerIndex = 0; renderCallerOptions(); });
search.addEventListener("keydown", (event) => {
  if (event.key === "Escape") { closeNodeCaller(true); return; }
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (callerEntries.length) callerIndex = (callerIndex + (event.key === "ArrowDown" ? 1 : -1) + callerEntries.length) % callerEntries.length;
    syncCallerHighlight();
  }
  if (event.key === "Enter") {
    event.preventDefault();
    if (callerEntries[callerIndex]) addCallerEntry(callerEntries[callerIndex]);
  }
});
function zoomAtCenter(factor) {
  const rect = canvas.getBoundingClientRect(), next = Math.max(0.25, Math.min(2.5, camera.zoom * factor));
  camera.x = rect.width / 2 - (rect.width / 2 - camera.x) * next / camera.zoom;
  camera.y = rect.height / 2 - (rect.height / 2 - camera.y) * next / camera.zoom;
  camera.zoom = next;
  cameraEngaged = true;
  updateCamera();
}
$("#zoom-in").addEventListener("click", () => zoomAtCenter(1.2));
$("#zoom-out").addEventListener("click", () => zoomAtCenter(1 / 1.2));
$("#zoom-fit").addEventListener("click", () => { fitCamera(); updateCamera(); });
window.addEventListener("resize", () => { if (!cameraReady || !cameraEngaged) fitCamera(); updateCamera(); });

try {
  const saved = JSON.parse(localStorage.getItem(storeKey) || "null");
  if (Array.isArray(saved) && saved.length && saved.length <= 8 && new Set(saved.map((doc) => doc.id)).size === saved.length && saved.every((doc) => typeof doc?.id === "string" && doc.bp && typeof doc.name === "string")) {
    documents = saved;
    documents.forEach((doc) => snapBlueprintPositions(doc.bp));
    activeId = documents[0].id;
    state.registers = projectState(activeDocument());
  }
} catch { announce("Yerel blueprint verisi okunamadı; kayıtlı içerik değiştirilmedi."); }
render();
