import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
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
  await page.locator("#import-file").setInputFiles({ name: "bozuk.bp", mimeType: "application/json", buffer: Buffer.from("{bad json") });
  await expect(page.locator("#sim-status")).toContainText("Dosya açılamadı");
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

test("shows concise block help and links to the matching docs section in a new tab", async ({ page }) => {
  await page.goto("/playground/");
  const help = page.getByRole("link", { name: "AND bloğu yardımı, yeni sekmede" });
  await expect(help).toHaveAttribute("target", "_blank");
  await expect(help).toHaveAttribute("href", /docs\/bloklar\/#mantik-kapilari/);
  await help.hover();
  await expect(help.getByRole("tooltip")).toBeVisible();
  await expect(help.getByRole("tooltip")).toHaveText("Yalnızca iki girişi de 1 olduğunda 1 üretir.");
});

