import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    url.pathname = url.pathname.replace(/^\/ludus-circuitus(?=\/|$)/, "") || "/";
    route.continue({ url: url.toString() });
  });
});

test("landing, docs and workbench geometry stays aligned at desktop size", async ({ page }) => {
  await page.goto("/");
  const hero = await Promise.all([page.locator(".hero-copy").boundingBox(), page.locator(".signal-board").boundingBox()]);
  expect(Math.abs((hero[0].y + hero[0].height / 2) - (hero[1].y + hero[1].height / 2))).toBeLessThanOrEqual(2);
  const titleLines = await page.locator("#hero-title").evaluate((element) => Math.round(element.getBoundingClientRect().height / parseFloat(getComputedStyle(element).lineHeight)));
  expect(titleLines).toBeLessThanOrEqual(3);

  await page.goto("/docs/bloklar/");
  const docs = await Promise.all([page.locator(".docs-nav").boundingBox(), page.locator(".docs-article").boundingBox()]);
  expect(Math.abs(docs[0].y - docs[1].y)).toBeLessThanOrEqual(2);

  await page.goto("/playground/");
  const panels = await Promise.all([".cad-tools", ".cad-editor", ".cad-inspector"].map((selector) => page.locator(selector).boundingBox()));
  expect(Math.max(...panels.map((box) => box.y)) - Math.min(...panels.map((box) => box.y))).toBeLessThanOrEqual(2);
  expect(Math.max(...panels.map((box) => box.y + box.height)) - Math.min(...panels.map((box) => box.y + box.height))).toBeLessThanOrEqual(2);
});

test("docs open only the current chapter and keep mobile content near the first screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/docs/bloklar/");
  await expect(page.locator(".docs-nav details[open]")).toHaveCount(1);
  const heading = await page.locator(".docs-article h1").boundingBox();
  expect(heading.y).toBeLessThan(680);
  await expect(page.getByRole("link", { name: /Blok kataloğu/ })).toHaveAttribute("aria-current", "page");
});
