import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    url.pathname = url.pathname.replace(/^\/ludus-circuitus(?=\/|$)/, "") || "/";
    route.continue({ url: url.toString() });
  });
});

test("docs use collapsible topic groups and show approximate reading time", async ({ page }) => {
  await page.goto("/docs/baslangic/");
  await expect(page.locator(".docs-nav details")).toHaveCount(3);
  await expect(page.getByRole("link", { name: /Başlangıç/ }).first()).toHaveAttribute("aria-current", "page");
  await expect(page.locator(".docs-reading-time")).toContainText("Yaklaşık 4 dakika");
  await expect(page.locator(".docs-article h2 .docs-section-time")).toHaveCount(4);
  const developerGroup = page.locator(".docs-nav details").nth(2);
  await expect(developerGroup).not.toHaveAttribute("open", "");
  await developerGroup.locator("summary").click();
  await expect(developerGroup).toHaveAttribute("open", "");
  await expect(developerGroup.getByRole("link", { name: /Yerel kullanım/ })).toBeVisible();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflowing, `docs page overflow at ${width}px`).toBe(false);
  }
});

test("every docs navigation and in-page topic link resolves to a published section", async ({ page }) => {
  const routes = ["/docs/", "/docs/baslangic/", "/docs/kullanim/", "/docs/bloklar/", "/docs/yerel-kurulum/"];
  const links = new Set();
  for (const route of routes) {
    await page.goto(route);
    const hrefs = await page.locator(".docs-nav a[href], .docs-page-toc a[href]").evaluateAll((items) => items.map((item) => item.href));
    hrefs.forEach((href) => links.add(href));
  }
  expect(links.size).toBeGreaterThan(0);
  for (const href of links) {
    const target = new URL(href);
    await page.goto(`${target.pathname}${target.hash}`);
    if (target.hash) {
      const found = await page.evaluate((hash) => Boolean(document.getElementById(decodeURIComponent(hash.slice(1)))), target.hash);
      expect(found, `missing section target: ${target.pathname}${target.hash}`).toBe(true);
    } else {
      await expect(page.locator(".docs-article h1")).toBeVisible();
    }
  }
});

test("local setup guide lists test tools and builds the static site before E2E", async ({ page }) => {
  await page.goto("/docs/yerel-kurulum/");
  const article = page.locator(".docs-article");
  await expect(page.locator(".docs-reading-time")).toHaveText("Yaklaşık 6 dakika");
  await expect(article).toContainText("Node.js 22");
  await expect(article).toContainText("Python 3");
  await expect(article).toContainText("Icarus Verilog");
  await expect(article).toContainText("E2E testleri Jekyll'i kendi başına çalıştırmaz");
  await expect(article).toContainText("bundle exec jekyll build");
  await expect(article).toContainText("npx playwright install --with-deps chromium");
});

test("block catalog documents exact ports and distinguishes named wires from register state", async ({ page }) => {
  await page.goto("/docs/bloklar/");
  await expect(page.locator(".docs-reading-time")).toHaveText("Yaklaşık 7 dakika");
  const table = page.getByRole("table", { name: "Blueprint bloklarının giriş ve çıkış portları" });
  await expect(table.locator("tbody tr")).toHaveCount(7);
  await expect(table).toContainText("a");
  await expect(table).toContainText("b");
  await expect(table).toContainText("Belgede tanımlı girişler");
  const portsExplanation = page.locator("#portlar").locator("xpath=following-sibling::p[2]");
  await expect(portsExplanation).toContainText("Ara Sinyal yalnızca isim verilmiş bir");
  await expect(portsExplanation).toContainText("aktif-yüksek asenkron reset");
  await expect(page.locator(".docs-callout")).toContainText("fiziksel kapı gecikmesini");
  await expect(page.locator(".docs-callout")).toContainText("Ekrandaki 0/1 değerleri onluk gösterimdir");
  await expect(page.locator(".docs-callout")).toContainText("ikilik 0/1 ile aynıdır");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflowing, `block catalog overflow at ${width}px`).toBe(false);
  }
});
