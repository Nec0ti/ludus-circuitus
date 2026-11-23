const inputs = { a: 0, b: 0 };
const outputs = { carry: (a, b) => a & b, sum: (a, b) => a ^ b };
const wireInputs = { "a-and": "a", "a-xor": "a", "b-and": "b", "b-xor": "b" };
const transitionTimers = new WeakMap();
const seenPairs = new Set(["00"]);

function updateCircuit(changedInput) {
  const pair = `${inputs.a}${inputs.b}`;
  seenPairs.add(pair);
  const values = Object.fromEntries(Object.entries(outputs).map(([name, calculate]) => [name, calculate(inputs.a, inputs.b)]));

  document.querySelectorAll("[data-input-value]").forEach((value) => { value.textContent = String(inputs[value.dataset.inputValue]); });
  document.querySelectorAll(".input-toggle").forEach((button) => {
    const isHigh = inputs[button.dataset.input] === 1;
    button.setAttribute("aria-pressed", String(isHigh));
    button.classList.toggle("is-high", isHigh);
  });
  document.querySelectorAll("[data-input-node]").forEach((node) => node.classList.toggle("is-high", inputs[node.dataset.inputNode] === 1));
  document.querySelectorAll("[data-pair-chip]").forEach((chip) => {
    chip.classList.toggle("is-seen", seenPairs.has(chip.dataset.pairChip));
    chip.classList.toggle("is-current", pair === chip.dataset.pairChip);
  });
  const progress = document.querySelector("[data-pair-progress]");
  progress.textContent = `${seenPairs.size}/4`;
  progress.setAttribute("aria-label", `${seenPairs.size}/4 giriş çifti görüldü`);
  document.querySelectorAll("[data-output-value]").forEach((value) => {
    const isHigh = values[value.dataset.outputValue] === 1;
    value.textContent = String(values[value.dataset.outputValue]);
    value.closest(".state-tag")?.classList.toggle("is-high", isHigh);
  });
  document.querySelectorAll("[data-wire]").forEach((wire) => {
    const name = wire.dataset.wire;
    const isOutput = Object.hasOwn(values, name);
    const isHigh = isOutput ? values[name] === 1 : inputs[wireInputs[name]] === 1;
    wire.classList.toggle("is-high", isHigh);
    wire.classList.toggle("is-low", !isHigh);
    const shouldAnimate = changedInput !== undefined && (isOutput || wireInputs[name] === changedInput);
    if (!shouldAnimate) return;
    clearTimeout(transitionTimers.get(wire));
    wire.classList.remove("is-transitioning");
    void wire.getBoundingClientRect();
    wire.classList.add("is-transitioning");
    transitionTimers.set(wire, setTimeout(() => wire.classList.remove("is-transitioning"), 850));
  });
  const status = document.querySelector(".signal-status");
  status.textContent = `A=${inputs.a} · B=${inputs.b} · Taşıma=${values.carry} · Toplam=${values.sum}`;
}

document.querySelectorAll(".input-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.input;
    inputs[name] = inputs[name] ? 0 : 1;
    updateCircuit(name);
  });
});

updateCircuit();
