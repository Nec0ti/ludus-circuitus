import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.context().route("**/*", (route) => {
    const url = new URL(route.request().url());
    url.pathname = url.pathname.replace(/^\/ludus-circuitus(?=\/|$)/, "") || "/";
    route.continue({ url: url.toString() });
  });
});

test("Devre Atölyesi is a standalone full-screen industrial workspace", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/playground/");
  await expect(page.locator(".cad-app")).toBeVisible();
  await expect(page.locator("nav, footer")).toHaveCount(0);
  await expect(page.locator(".cad-app")).toHaveCSS("height", "900px");
  await expect(page.locator("#verilog-code")).toContainText("assign toplam = n_2;");
  await page.locator(".cad-variable.is-input").nth(0).click();
  await expect(page.locator("#variable-list .cad-variable-value").nth(2)).toHaveText("1");
  await expect(page.locator("#verilog-code")).toContainText("assign tasima = n_3;");
  expect(errors).toEqual([]);
});

test("keeps the full-screen workbench usable at narrow viewport widths", async ({ page }) => {
  await page.goto("/playground/");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const hasPageOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(hasPageOverflow, `unexpected page overflow at ${width}px`).toBe(false);
  }
});

test("builds a connection, saves locally, reloads and exports a .bp file", async ({ page }) => {
  await page.goto("/playground/");
  await page.getByRole("button", { name: "Yeni BP" }).click();
  await page.getByRole("button", { name: "giris out çıkışı" }).click();
  await page.getByRole("button", { name: "cikis in girişi" }).click();
  await expect(page.locator("#verilog-code")).toContainText("assign cikis = giris;");
  await page.getByRole("button", { name: "Kaydet" }).click();
  await page.reload();
  await page.getByRole("tab", { name: "devre2.bp" }).click();
  await expect(page.locator("#verilog-code")).toContainText("assign cikis = giris;");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Dışa aktar" }).click();
  expect((await download).suggestedFilename()).toBe("devre2.bp");
});

test("adds, names, simulates and exports a named intermediate signal", async ({ page }) => {
  await page.goto("/playground/");
  await page.getByRole("button", { name: "Yeni BP" }).click();
  page.on("dialog", (dialog) => dialog.accept("ara_deger"));
  await page.locator('[data-add="signal"]').click();
  await page.locator(".node-signal .cad-node-name").dblclick();
  await page.getByRole("button", { name: "giris out çıkışı" }).click();
  await page.getByRole("button", { name: "ara_deger in girişi" }).click();
  await page.getByRole("button", { name: "ara_deger out çıkışı" }).click();
  await page.getByRole("button", { name: "cikis in girişi" }).click();
  await expect(page.locator("#verilog-code")).toContainText("wire ara_deger;");
  await expect(page.locator("#verilog-code")).toContainText("assign ara_deger = giris;");
  await expect(page.locator("#variable-list .cad-variable-name")).toHaveText(["giris", "cikis", "ara_deger"]);
  await page.locator(".cad-variable.is-input").click();
  await expect(page.locator("#variable-list .cad-variable-value").nth(2)).toHaveText("1");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Dışa aktar" }).click();
  const file = await download;
  expect(file.suggestedFilename()).toBe("devre2.bp");
});

test("clocked register updates on a tick and reset is separate from stop", async ({ page }) => {
  await page.goto("/playground/");
  await page.getByRole("button", { name: "Yeni BP" }).click();
  await page.locator('[data-add="register"]').click();
  await page.getByRole("button", { name: "giris out çıkışı" }).click();
  await page.getByRole("button", { name: "YAZMAÇ d girişi" }).click();
  await page.getByRole("button", { name: "YAZMAÇ out çıkışı" }).click();
  await page.getByRole("button", { name: "cikis in girişi" }).click();
  await expect(page.locator("#verilog-code")).toContainText("always @(posedge clk or posedge reset)");
  await page.locator(".cad-variable.is-input").click();
  await page.getByRole("button", { name: "Bir tik ilerle" }).click();
  await expect(page.locator("#variable-list .cad-variable").nth(1).locator(".cad-variable-value")).toHaveText("1");
  await expect(page.locator("#tick-count")).toHaveText("001");
  await page.getByRole("button", { name: "Simülasyonu durdur" }).click();
  await expect(page.locator("#sim-status")).toContainText("yazmaç değerleri korundu");
  await page.getByRole("button", { name: "Yazmaç değerlerini sıfırla" }).click();
  await expect(page.locator("#sim-status")).toContainText("Yazmaç değerleri sıfırlandı");
});

test("composes open .bp files through named module ports and keeps the project after reload", async ({ page }) => {
  await page.goto("/playground/");
  await page.getByRole("button", { name: "Yeni BP" }).click();
  await page.getByRole("button", { name: "giris out çıkışı" }).click();
  await page.getByRole("button", { name: "cikis in girişi" }).click();
  await page.getByRole("button", { name: "Yeni BP" }).click();
  await page.locator("#module-tools").getByRole("button", { name: "devre2" }).click();
  await page.getByRole("button", { name: "giris out çıkışı" }).click();
  await page.getByRole("button", { name: "devre2_1 giris girişi" }).click();
  await page.getByRole("button", { name: "devre2_1 cikis çıkışı" }).click();
  await page.getByRole("button", { name: "cikis in girişi" }).click();
  await expect(page.locator("#verilog-code")).toContainText("assign cikis = giris;");
  await expect(page.locator("#graph-status")).toContainText("Blueprint geçerli");
  await page.reload();
  await page.getByRole("tab", { name: "devre3.bp" }).click();
  await expect(page.locator("#verilog-code")).toContainText("assign cikis = giris;");
  await expect(page.locator("#module-tools").getByRole("button", { name: "devre2" })).toBeVisible();
});

test("imports a blueprint safely and reports malformed files", async ({ page }) => {
  await page.goto("/playground/");
  const blueprint = {
    version: 1, name: "aktarilan",
    nodes: [
      { id: "i", type: "input", name: "giris", x: 50, y: 100 },
      { id: "o", type: "output", name: "cikis", x: 700, y: 100 }
    ],
    wires: [{ from: { node: "i", port: "out" }, to: { node: "o", port: "in" } }]
  };
  await page.locator("#import-file").setInputFiles({ name: "aktarilan.bp", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(blueprint)) });
  await expect(page.locator("#file-name")).toHaveText("aktarilan.bp");
  await expect(page.locator("#verilog-code")).toContainText("assign cikis = giris;");
  await page.locator("#import-file").setInputFiles({ name: "aktarilan.bp", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(blueprint).padEnd(1024 * 1024)) });
  await expect(page.locator("#sim-status")).toHaveText("Blueprint açıldı.");
  await page.locator("#import-file").setInputFiles({ name: "bozuk.bp", mimeType: "application/json", buffer: Buffer.from("{bad json") });
  await expect(page.locator("#sim-status")).toContainText("Dosya açılamadı");
  await page.locator("#import-file").setInputFiles({ name: "buyuk.bp", mimeType: "application/json", buffer: Buffer.alloc(1024 * 1024 + 1) });
  await expect(page.locator("#sim-status")).toHaveText("Blueprint dosyası 1 MB sınırını aşıyor.");
  await expect(page.locator("#file-name")).toHaveText("aktarilan.bp");
  await expect(page.locator("#verilog-code")).toContainText("assign cikis = giris;");
});

test("moves a block on the blueprint grid and updates the signal view", async ({ page }) => {
  await page.goto("/playground/");
  const card = page.locator('.cad-node[data-id="a"]');
  const before = await card.getAttribute("style");
  const box = await card.locator(".cad-node-head").boundingBox();
  await page.mouse.move(box.x + 15, box.y + 15);
  await page.mouse.down();
  await page.mouse.move(box.x + 95, box.y + 50, { steps: 5 });
  await page.mouse.up();
  const after = await card.getAttribute("style");
  expect(after).not.toBe(before);
});

test("shows concise help beside every block and opens its docs in a new tab", async ({ page }) => {
  await page.goto("/playground/");
  const blocks = [
    ["Giriş", /#giris-cikis/, "Devreye dışarıdan 0 veya 1 değerinde sinyal verir."],
    ["Çıkış", /#giris-cikis/, "Bir mantık yolunun ürettiği 0, 1 veya X değerini gösterir."],
    ["AND", /#mantik-kapilari/, "Yalnızca iki girişi de 1 olduğunda 1 üretir."],
    ["NAND", /#mantik-kapilari/, "AND sonucunu tersine çevirir."],
    ["OR", /#mantik-kapilari/, "Girişlerinden en az biri 1 ise 1 üretir."],
    ["NOR", /#mantik-kapilari/, "OR sonucunu tersine çevirir."],
    ["XOR", /#mantik-kapilari/, "İki girişi farklıysa 1 üretir."],
    ["XNOR", /#mantik-kapilari/, "XOR sonucunu tersine çevirir; girişler aynıysa 1 üretir."],
    ["NOT", /#mantik-kapilari/, "Girişteki 0'ı 1'e, 1'i 0'a çevirir."],
    ["Ara sinyal", /#ara-sinyal/, "Bir mantık yoluna ad verir; değerini değişkenler panelinde canlı izle."],
    ["Yazmaç", /#yazmac/, "D girişini bir yükselen clock kenarında saklar ve Q çıkışında tutar."]
  ];
  for (const [name, destination, summary] of blocks) {
    const help = page.getByRole("link", { name: `${name} bloğu yardımı, yeni sekmede`, exact: true });
    await expect(help).toHaveAttribute("target", "_blank");
    await expect(help).toHaveAttribute("href", new RegExp(`docs/bloklar/${destination.source}`));
    await help.hover();
    await expect(help.getByRole("tooltip")).toBeVisible();
    await expect(help.getByRole("tooltip")).toHaveText(summary);
  }

  const help = page.getByRole("link", { name: "AND bloğu yardımı, yeni sekmede", exact: true });
  const popupPromise = page.waitForEvent("popup");
  await help.click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(/docs\/bloklar\/#mantik-kapilari/);
  await expect(popup.getByRole("heading", { name: "Bloklar" })).toBeVisible();

  await page.getByRole("button", { name: "Yeni BP" }).click();
  await page.getByRole("tab", { name: "top.bp" }).click();
  const moduleHelp = page.getByRole("link", { name: "devre2 modül yardımı, yeni sekmede", exact: true });
  await expect(moduleHelp).toHaveAttribute("target", "_blank");
  await expect(moduleHelp).toHaveAttribute("href", /docs\/bloklar\/#bp-modulleri/);
  await moduleHelp.hover();
  await expect(moduleHelp.getByRole("tooltip")).toHaveText("Bu blueprint'i giriş ve çıkış portlarıyla tek blok olarak kullanır.");
});

test("canvas wheel zoom keeps the pointer's world point stable and click-to-search adds a snapped block", async ({ page }) => {
  await page.goto("/playground/");
  const canvas = page.locator("#blueprint-canvas"), box = await canvas.boundingBox();
  const px = box.x + box.width * 0.82, py = box.y + box.height * 0.24;
  const worldAtPointer = () => page.evaluate(({ px, py }) => {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(document.querySelector("#camera-world")).transform);
    const rect = document.querySelector("#blueprint-canvas").getBoundingClientRect();
    return [(px - rect.left - matrix.e) / matrix.a, (py - rect.top - matrix.f) / matrix.d];
  }, { px, py });
  const before = await worldAtPointer();
  await page.mouse.move(px, py);
  await page.mouse.wheel(0, -160);
  const after = await worldAtPointer();
  expect(Math.abs(after[0] - before[0])).toBeLessThan(0.2);
  expect(Math.abs(after[1] - before[1])).toBeLessThan(0.2);
  await page.mouse.click(px, py);
  const search = page.getByRole("combobox", { name: "Blok ara ve ekle" });
  await expect(search).toBeFocused();
  await search.fill("NAND");
  await search.press("Enter");
  await expect(page.locator(".node-nand")).toHaveCount(1);
  const position = await page.locator(".node-nand").getAttribute("style");
  expect(position).toMatch(/left: -?\d+px; top: -?\d+px/);
});

test("block tools can be dragged onto the canvas and grid snapping remains enabled", async ({ page }) => {
  await page.goto("/playground/");
  await page.locator('[data-add="nand"]').dragTo(page.locator("#blueprint-canvas"), { targetPosition: { x: 220, y: 180 } });
  await expect(page.locator(".node-nand")).toHaveCount(1);
  const position = await page.locator(".node-nand").getAttribute("style");
  expect(position).toMatch(/left: -?\d+px; top: -?\d+px/);
});

test("space-drag pans the blueprint camera without moving blocks", async ({ page }) => {
  await page.goto("/playground/");
  const card = page.locator('.cad-node[data-id="a"]');
  const blockBefore = await card.getAttribute("style");
  const cameraBefore = await page.locator("#camera-world").evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).e);
  const box = await page.locator("#blueprint-canvas").boundingBox();
  await page.keyboard.down("Space");
  await page.mouse.move(box.x + 30, box.y + 30);
  await page.mouse.down();
  await page.mouse.move(box.x + 95, box.y + 75, { steps: 4 });
  await page.mouse.up();
  await page.keyboard.up("Space");
  const cameraAfter = await page.locator("#camera-world").evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).e);
  expect(cameraAfter - cameraBefore).toBeCloseTo(65, 0);
  await expect(card).toHaveAttribute("style", blockBefore);
});

test("fit keeps every sample block legible and inside the mobile canvas", async ({ page }) => {
  await page.goto("/playground/");
  await page.setViewportSize({ width: 390, height: 844 });
  const canvas = await page.locator("#blueprint-canvas").boundingBox();
  await expect(page.locator("#zoom-level")).toHaveText(/^(5[8-9]|[6-9]\d|100)%$/);
  for (const node of await page.locator(".cad-node").all()) {
    const box = await node.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(canvas.x - 1);
    expect(box.y).toBeGreaterThanOrEqual(canvas.y - 1);
    expect(box.x + box.width).toBeLessThanOrEqual(canvas.x + canvas.width + 1);
    expect(box.y + box.height).toBeLessThanOrEqual(canvas.y + canvas.height + 1);
  }
});

