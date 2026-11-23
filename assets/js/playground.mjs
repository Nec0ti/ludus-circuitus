import { createState, halfAdderBlueprint, isValidSignalName, X } from "./engine.mjs";
import { createProjectState, evaluateProject, flattenProject, generateProjectVerilog, resetProject, tickProject, validateProject } from "./project.mjs";

const $ = (selector) => document.querySelector(selector);
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const icons = { input: "IN", output: "OUT", and: "&", nand: "&○", or: "≥1", nor: "≥1○", xor: "=1", xnor: "=1○", not: "¬", signal: "SIG", register: "D" };
const labels = { input: "GİRİŞ", output: "ÇIKIŞ", and: "AND", nand: "NAND", or: "OR", nor: "NOR", xor: "XOR", xnor: "XNOR", not: "NOT", signal: "ARA SİNYAL", register: "YAZMAÇ" };
const storeKey = "ludus-circuitus-documents-v1";
const maxImportBytes = 1024 * 1024;

function basicBlueprint(name = "yeni_devre") {
  return {
    version: 1, name,
    nodes: [
      { id: crypto.randomUUID(), type: "input", name: "giris", x: 70, y: 200 },
      { id: crypto.randomUUID(), type: "output", name: "cikis", x: 690, y: 200 }
    ],
    wires: []
  };
}

let documents = [{ id: crypto.randomUUID(), name: "top.bp", bp: halfAdderBlueprint() }];
let activeId = documents[0].id;
let selectedId = null;
let pendingSource = null;
let camera = { x: 0, y: 0, zoom: 1 };
let cameraReady = false;
let cameraEngaged = false;
let state = { registers: projectState(documents[0]), inputs: {}, timer: null, tick: 0, vector: -1 };

function activeDocument() { return documents.find((doc) => doc.id === activeId); }
function projectState(doc) { try { return createProjectState(documents, doc.bp.name); } catch { return createState(doc.bp); } }
function moduleBlueprint(node) { return documents.find((doc) => doc.bp.name === node.module)?.bp; }
function inputNodes(bp) { return bp.nodes.filter((node) => node.type === "input"); }
function hasRegisters(bp) { try { return flattenProject(documents, bp.name).bp.nodes.some((node) => node.type === "register"); } catch { return bp.nodes.some((node) => node.type === "register"); } }
function currentInputs(bp) { return Object.fromEntries(inputNodes(bp).map((node) => [node.name, state.inputs[node.name] ?? 0])); }
function portInputs(node) { return node.type === "module" ? (moduleBlueprint(node)?.nodes.filter((item) => item.type === "input").map((item) => item.name) || []) : ({ and: ["a", "b"], nand: ["a", "b"], or: ["a", "b"], nor: ["a", "b"], xor: ["a", "b"], xnor: ["a", "b"], not: ["in"], signal: ["in"], register: ["d"], output: ["in"] })[node.type] || []; }
function portOutputs(node) { return node.type === "module" ? (moduleBlueprint(node)?.nodes.filter((item) => item.type === "output").map((item) => item.name) || []) : ["input", "and", "nand", "or", "nor", "xor", "xnor", "not", "signal", "register"].includes(node.type) ? ["out"] : []; }

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
    const button = el("button", `cad-document-tab${doc.id === activeId ? " is-active" : ""}`, doc.name);
    button.type = "button";
    button.role = "tab";
    button.setAttribute("aria-selected", String(doc.id === activeId));
    button.addEventListener("click", () => switchDocument(doc.id));
    button.addEventListener("dblclick", () => {
      const next = window.prompt("Blueprint dosya adı", doc.name);
      if (!next) return;
      const name = next.endsWith(".bp") ? next : `${next}.bp`;
      if (documents.some((item) => item.id !== doc.id && item.name === name)) return announce("Bu adla açık bir blueprint zaten var.");
      doc.name = name;
      render();
      persist();
    });
    tabs.append(button);
  }
  const add = el("button", "cad-add-tab", "+");
  add.type = "button";
  add.setAttribute("aria-label", "Yeni blueprint aç");
  add.addEventListener("click", newDocument);
  tabs.append(add);
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
  stopTimer();
  activeId = id;
  selectedId = null;
  pendingSource = null;
  state = { registers: projectState(activeDocument()), inputs: {}, timer: null, tick: 0, vector: -1 };
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
  $("#selection-info").textContent = selectedId ? `${labels[bp.nodes.find((node) => node.id === selectedId)?.type] || "BLOK"} seçili · Delete ile sil` : "Blok seçili değil";
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
  $("#step-sim").disabled = state.timer !== null;
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
  for (const node of bp.nodes) {
    const card = el("article", `cad-node node-${node.type}${selectedId === node.id ? " is-selected" : ""}`);
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
    const remove = el("button", "cad-node-remove", "×");
    remove.type = "button";
    remove.setAttribute("aria-label", `${node.name || labels[node.type]} bloğunu sil`);
    remove.addEventListener("click", (event) => { event.stopPropagation(); removeNode(node.id); });
    header.append(remove);
    card.append(header);
    const ports = el("div", "cad-node-ports");
    for (const port of portInputs(node)) ports.append(makePort(node, port, "input"));
    const value = values[node.id] ?? X;
    ports.append(el("span", `cad-node-value value-${String(value).toLowerCase()}`, String(value)));
    for (const port of portOutputs(node)) ports.append(makePort(node, port, "output"));
    card.append(ports);
    card.addEventListener("pointerdown", (event) => beginDrag(event, node));
    card.addEventListener("click", () => { selectedId = node.id; render(); });
    layer.append(card);
  }
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
  if (node.type === "module") {
    const all = direction === "input" ? portInputs(node) : portOutputs(node);
    const index = Math.max(0, all.indexOf(port));
    return { x: direction === "output" ? node.x + 150 : node.x, y: node.y + 50 + index * 16 };
  }
  if (direction === "output") return { x: node.x + 150, y: node.y + 44 };
  if (port === "a") return { x: node.x, y: node.y + 44 };
  if (port === "b") return { x: node.x, y: node.y + 68 };
  return { x: node.x, y: node.y + 44 };
}

function makePath(from, to, className, value) {
  const mid = Math.round(from.x + Math.max(38, (to.x - from.x) * 0.5));
  const radius = Math.min(12, Math.abs(mid - from.x) / 2, Math.abs(to.y - from.y) / 2);
  const dir = to.y >= from.y ? 1 : -1;
  const d = `M${from.x} ${from.y} H${mid - radius} Q${mid} ${from.y} ${mid} ${from.y + dir * radius} V${to.y - dir * radius} Q${mid} ${to.y} ${mid + radius} ${to.y} H${to.x}`;
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("class", `${className} signal-${String(value ?? X).toLowerCase()}`);
  return path;
}

function renderWires(bp, values) {
  const svg = $("#wire-layer");
  svg.replaceChildren();
  const nodes = new Map(bp.nodes.map((node) => [node.id, node]));
  for (const wire of bp.wires) {
    const source = nodes.get(wire.from.node);
    const target = nodes.get(wire.to.node);
    if (!source || !target) continue;
    svg.append(makePath(point(source, wire.from.port, "output"), point(target, wire.to.port, "input"), "cad-wire", values[`${source.id}:${wire.from.port}`] ?? values[source.id] ?? X));
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
      item.addEventListener("click", () => { state.inputs[node.name] = (state.inputs[node.name] ?? 0) ? 0 : 1; render(); });
    }
    item.append(el("span", "cad-variable-name", node.name || (node.type === "register" ? "Q" : "Sinyal")));
    item.append(el("span", `cad-variable-value value-${String(value).toLowerCase()}`, String(value)));
    item.append(el("small", "", node.type === "input" ? "Giriş · değiştir" : node.type === "register" ? "Yazmaç" : node.type === "signal" ? "Ara sinyal · çift tıkla: adlandır" : "Çıkış"));
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
    if (source && target) svg.append(makePath(point(source, wire.from.port, "output"), point(target, wire.to.port, "input"), "cad-mini-wire", values[`${source.id}:${wire.from.port}`] ?? values[source.id] ?? X));
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
    value.setAttribute("class", `cad-mini-value value-${String(values[node.id] ?? X).toLowerCase()}`); value.textContent = String(values[node.id] ?? X); group.append(value);
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
  const canvas = $("#blueprint-canvas");
  const rect = canvas.getBoundingClientRect();
  const startX = event.clientX, startY = event.clientY, x = node.x, y = node.y;
  event.currentTarget.setPointerCapture(event.pointerId);
  const card = event.currentTarget;
  const move = (e) => {
    node.x = Math.round((x + (e.clientX - startX) / camera.zoom) / 20) * 20;
    node.y = Math.round((y + (e.clientY - startY) / camera.zoom) / 20) * 20;
    card.style.left = `${node.x}px`;
    card.style.top = `${node.y}px`;
    updateCamera();
    const values = safeEvaluate(activeDocument()).values;
    renderWires(activeDocument().bp, values);
    renderSignalView(activeDocument().bp, values);
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
  const x = at ? at.x : type === "input" ? 60 : type === "output" ? 700 : 310 + (index % 2) * 190;
  const y = at ? at.y : 60 + Math.floor(index / 2) % 5 * 100;
  const defaultName = type === "input" ? `giris${count ? count + 1 : ""}` : type === "output" ? `cikis${count ? count + 1 : ""}` : `ara_sinyal_${count + 1}`;
  let name = ["input", "output", "signal"].includes(type) ? defaultName : "";
  if (type === "signal") while (bp.nodes.some((item) => item.name === name)) name += "_";
  const node = { id: crypto.randomUUID(), type, name, x, y };
  bp.nodes.push(node);
  selectedId = node.id;
  render();
  persist();
}

function addModule(moduleName, at = null) {
  const bp = activeDocument().bp;
  const index = bp.nodes.length;
  const count = bp.nodes.filter((node) => node.type === "module" && node.module === moduleName).length;
  const node = { id: crypto.randomUUID(), type: "module", module: moduleName, name: `${moduleName}_${count + 1}`, x: at?.x ?? 310 + (index % 2) * 190, y: at?.y ?? 60 + Math.floor(index / 2) % 5 * 100 };
  bp.nodes.push(node);
  selectedId = node.id;
  render();
  persist();
}

function removeNode(id) {
  const bp = activeDocument().bp;
  bp.nodes = bp.nodes.filter((node) => node.id !== id);
  bp.wires = bp.wires.filter((wire) => wire.from.node !== id && wire.to.node !== id);
  if (state.registers[id] !== undefined) delete state.registers[id];
  selectedId = null;
  render();
  persist();
}

function newDocument() {
  if (documents.length >= 8) return announce("Aynı anda en fazla 8 blueprint açık tutabilirsin.");
  stopTimer();
  const doc = { id: crypto.randomUUID(), name: `devre${documents.length + 1}.bp`, bp: basicBlueprint(`devre${documents.length + 1}`) };
  documents.push(doc);
  activeId = doc.id;
  state = { registers: projectState(doc), inputs: {}, timer: null, tick: 0, vector: -1 };
  render();
  persist();
}

function saveLocal() { persist(); announce("Blueprint bu cihazda kaydedildi."); }
function exportBlueprint() {
  const doc = activeDocument();
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
    doc.bp = bp;
    doc.name = file.name.endsWith(".bp") ? file.name : `${bp.name}.bp`;
    validateProject(documents);
    state = { registers: projectState(doc), inputs: {}, timer: null, tick: 0, vector: -1 };
    render(); persist(); announce("Blueprint açıldı.");
  } catch (error) { doc.bp = previous.bp; doc.name = previous.name; announce(`Dosya açılamadı: ${error.message}`); }
}

function announce(message) { $("#sim-status").textContent = message; }
function stopTimer() { if (state.timer !== null) window.clearInterval(state.timer); state.timer = null; }

function tickOnce() {
  const bp = activeDocument().bp;
  try {
    validateProject(documents);
    if (hasRegisters(bp)) {
      state.registers = tickProject(documents, bp.name, currentInputs(bp), state.registers);
      state.tick++;
      $("#clock-led").classList.add("is-on");
      window.setTimeout(() => $("#clock-led").classList.remove("is-on"), 140);
    } else {
      const inputs = inputNodes(bp);
      const count = 2 ** inputs.length;
      state.vector = (state.vector + 1) % count;
      inputs.forEach((node, index) => { state.inputs[node.name] = (state.vector >> index) & 1; });
      state.tick++;
    }
    render();
    announce(hasRegisters(bp) ? `Yükselen kenar ${state.tick}: yazmaç değerleri birlikte güncellendi.` : `Giriş birleşimi ${state.vector + 1}: bağımsız yollar birlikte değerlendiriliyor.`);
    return true;
  } catch (error) { announce(error.message); stopTimer(); return false; }
}

function play() {
  if (state.timer !== null) return;
  if (!tickOnce()) return;
  if (state.timer === null) state.timer = window.setInterval(tickOnce, Number($("#step-speed").value));
}

$("#play-sim").addEventListener("click", play);
$("#step-sim").addEventListener("click", tickOnce);
$("#pause-sim").addEventListener("click", () => { stopTimer(); announce("Simülasyon duraklatıldı; yazmaç değerleri korundu."); render(); });
$("#stop-sim").addEventListener("click", () => { stopTimer(); announce("Simülasyon durdu; yazmaç değerleri korundu."); render(); });
$("#reset-sim").addEventListener("click", () => { stopTimer(); try { state.registers = resetProject(documents, activeDocument().bp.name); } catch { state.registers = createState(activeDocument().bp); } state.tick = 0; render(); announce("Yazmaç değerleri sıfırlandı; girişler değişmedi."); });
$("#step-speed").addEventListener("change", () => { if (state.timer !== null) { stopTimer(); state.timer = window.setInterval(tickOnce, Number($("#step-speed").value)); } });
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
  if (event.key === "Delete" && selectedId) removeNode(selectedId);
  const shortcuts = { i: "input", o: "output", a: "and", r: "or", x: "xor", n: "not", q: "register" };
  if (shortcuts[event.key.toLowerCase()]) addNode(shortcuts[event.key.toLowerCase()]);
});

const canvas = $("#blueprint-canvas"), search = $("#node-search");
let spaceDown = false;
function openSearchAt(clientX, clientY) {
  const bounds = canvas.getBoundingClientRect();
  search.style.left = `${Math.max(8, Math.min(bounds.width - 250, clientX - bounds.left))}px`;
  search.style.top = `${Math.max(8, Math.min(bounds.height - 42, clientY - bounds.top))}px`;
  search.dataset.world = JSON.stringify(screenToWorld(clientX, clientY));
  search.hidden = false;
  search.setAttribute("aria-expanded", "true");
  search.value = "";
  search.focus();
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
  if (event.target.closest(".cad-node") || event.target === search) return;
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
      if (!moved) openSearchAt(next.clientX, next.clientY);
    };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up, { once: true });
    return;
  }
  if (event.button === 1 || (event.button === 0 && spaceDown)) {
    event.preventDefault();
    const start = { x: event.clientX, y: event.clientY, cameraX: camera.x, cameraY: camera.y };
    canvas.setPointerCapture(event.pointerId);
    const move = (next) => { camera.x = start.cameraX + next.clientX - start.x; camera.y = start.cameraY + next.clientY - start.y; cameraEngaged = true; updateCamera(); };
    const up = () => { canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerup", up); };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up, { once: true });
    return;
  }
  if (event.button !== 0) return;
  event.preventDefault();
  openSearchAt(event.clientX, event.clientY);
});
canvas.addEventListener("dragover", (event) => { if ([...event.dataTransfer.types].some((type) => type.startsWith("application/x-ludus-"))) event.preventDefault(); });
canvas.addEventListener("drop", (event) => {
  const type = event.dataTransfer.getData("application/x-ludus-block"), moduleName = event.dataTransfer.getData("application/x-ludus-module");
  if (!type && !moduleName) return;
  event.preventDefault();
  const position = screenToWorld(event.clientX, event.clientY);
  if (moduleName) addModule(moduleName, position); else addNode(type, position);
});
search.addEventListener("keydown", (event) => {
  if (event.key === "Escape") { search.hidden = true; search.setAttribute("aria-expanded", "false"); canvas.focus(); return; }
  if (event.key !== "Enter") return;
  event.preventDefault();
  const key = search.value.trim().toLocaleLowerCase("tr");
  if (!key) return announce("Eklemek istediğin bloğun adını yaz.");
  const entries = Object.entries(labels).map(([type, label]) => [type, `${type} ${label}`.toLocaleLowerCase("tr")]);
  const synonyms = { and: "ve", or: "veya", xor: "ayrık veya", not: "değil", register: "yazmaç" };
  const hit = entries.find(([type, text]) => text.includes(key) || synonyms[type]?.includes(key));
  const position = JSON.parse(search.dataset.world);
  search.hidden = true;
  search.setAttribute("aria-expanded", "false");
  if (hit) return addNode(hit[0], position);
  const module = documents.find((doc) => doc.id !== activeId && doc.bp.name.toLocaleLowerCase("tr").includes(key));
  if (module) return addModule(module.bp.name, position);
  announce("Bu adla eklenebilen bir blok bulunamadı.");
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
    activeId = documents[0].id;
    state.registers = projectState(activeDocument());
  }
} catch { announce("Yerel blueprint verisi okunamadı; kayıtlı içerik değiştirilmedi."); }
render();
