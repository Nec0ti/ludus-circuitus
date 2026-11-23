import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.context().route("**/*", (route) => {
    const url = new URL(route.request().url());
    url.pathname = url.pathname.replace(/^\/ludus-circuitus(?=\/|$)/, "") || "/";
    route.continue({ url: url.toString() });
  });
});

test("landing circuit updates both parallel outputs and stays within the viewport", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "ludus");
  await expect(page.locator(".signal-status")).toHaveText("A=0 · B=0 · Taşıma=0 · Toplam=0");
  await expect(page.locator("[data-pair-progress]")).toHaveText("1/4");
  await expect(page.locator("[data-wire].is-transitioning")).toHaveCount(0);

  const a = page.getByRole("button", { name: "A girişini değiştir" });
  const b = page.getByRole("button", { name: "B girişini değiştir" });
  const carry = page.locator('[data-output-value="carry"]');
  const sum = page.locator('[data-output-value="sum"]');
  await a.click();
  await expect(page.locator("[data-pair-progress]")).toHaveText("2/4");
  await expect(page.locator('[data-wire="a-and"]')).toHaveClass(/is-transitioning/);
  await expect(sum).toHaveText("1");
  await expect(carry).toHaveText("0");
  await b.click();
  await expect(page.locator("[data-pair-progress]")).toHaveText("3/4");
  await expect(sum).toHaveText("0");
  await expect(carry).toHaveText("1");
  await a.click();
  await expect(page.locator("[data-pair-progress]")).toHaveText("4/4");
  await expect(sum).toHaveText("1");
  await expect(carry).toHaveText("0");
  await expect(page.locator("[data-wire].is-high")).toHaveCount(3);

  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `page overflows at ${width}px`).toBe(true);
  }
});

test("landing sections display reading estimates and the workshop keeps its separate theme", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".reading-time")).toHaveCount(5);
  expect(await page.locator("html").evaluate((node) => getComputedStyle(node).getPropertyValue("--color-base-100").trim())).toBe("#1b232b");
  await page.goto("/playground/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "ludus-cad");
});
