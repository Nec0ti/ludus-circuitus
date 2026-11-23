(() => {
  const buttonA = document.querySelector("#toggle-a");
  const buttonB = document.querySelector("#toggle-b");
  if (!buttonA || !buttonB) return;

  const state = { a: 0, b: 0, timer: null, vector: 0 };
  const nodes = {
    a: ["#bp-a", "#var-a", "#mini-a"],
    b: ["#bp-b", "#var-b", "#mini-b"],
    sum: ["#bp-sum", "#var-sum", "#mini-sum"],
    carry: ["#bp-carry", "#var-carry", "#mini-carry"]
  };
  const byId = (selector) => document.querySelector(selector);
  const status = byId("#sim-status");
  const vectors = [[0, 0], [0, 1], [1, 0], [1, 1]];

  function render(message = "") {
    const sum = state.a ^ state.b;
    const carry = state.a & state.b;
    const values = { a: state.a, b: state.b, sum, carry };

    for (const [key, selectors] of Object.entries(nodes)) {
      for (const selector of selectors) {
        const element = byId(selector);
        if (element) element.textContent = String(values[key]);
      }
    }

    buttonA.setAttribute("aria-pressed", String(Boolean(state.a)));
    buttonB.setAttribute("aria-pressed", String(Boolean(state.b)));
    buttonA.classList.toggle("is-on", Boolean(state.a));
    buttonB.classList.toggle("is-on", Boolean(state.b));

    const wireState = {
      "a-xor": state.a,
      "b-xor": state.b,
      "a-and": state.a,
      "b-and": state.b,
      "xor-sum": sum,
      "and-carry": carry
    };
    document.querySelectorAll("[data-wire]").forEach((wire) => {
      wire.classList.toggle("is-high", Boolean(wireState[wire.dataset.wire]));
    });

    if (status) status.textContent = message || `A=${state.a}, B=${state.b} · Toplam=${sum}, Taşıma=${carry}`;
  }

  function stop() {
    if (state.timer !== null) window.clearInterval(state.timer);
    state.timer = null;
  }

  function step() {
    state.vector = (state.vector + 1) % vectors.length;
    [state.a, state.b] = vectors[state.vector];
    render(`Giriş birleşimi ${state.vector + 1}/4: A=${state.a}, B=${state.b}`);
  }

  function start() {
    status?.setAttribute("aria-live", "off");
    state.timer = window.setInterval(step, Number(byId("#step-speed")?.value || 900));
  }

  buttonA.addEventListener("click", () => {
    state.a ^= 1;
    state.vector = vectors.findIndex(([a, b]) => a === state.a && b === state.b);
    render();
  });
  buttonB.addEventListener("click", () => {
    state.b ^= 1;
    state.vector = vectors.findIndex(([a, b]) => a === state.a && b === state.b);
    render();
  });

  byId("#play-sim")?.addEventListener("click", () => {
    if (state.timer !== null) return;
    status?.setAttribute("aria-live", "off");
    step();
    start();
  });

  byId("#pause-sim")?.addEventListener("click", () => {
    stop();
    status?.setAttribute("aria-live", "polite");
    if (status) status.textContent = "Oynatma duraklatıldı; mevcut giriş ve çıkışlar korunuyor.";
  });

  byId("#reset-sim")?.addEventListener("click", () => {
    stop();
    status?.setAttribute("aria-live", "polite");
    state.vector = 0;
    [state.a, state.b] = vectors[0];
    render("Örnek başa alındı: A=0, B=0.");
  });

  byId("#step-speed")?.addEventListener("change", () => {
    if (state.timer !== null) {
      stop();
      start();
    }
  });

  render();
})();
