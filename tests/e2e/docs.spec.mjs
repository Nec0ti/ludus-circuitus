import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    url.pathname = url.pathname.replace(/^\/ludus-circuitus(?=\/|$)/, "") || "/";
    route.continue({ url: url.toString() });
  });
});

test("course introduction is brief and docs use collapsible topic groups", async ({ page }) => {
  await page.goto("/docs/baslangic/");
  await expect(page.locator(".docs-nav details")).toHaveCount(3);
  await expect(page.getByRole("link", { name: /Kurs planı/ })).toHaveAttribute("aria-current", "page");
  await expect(page.locator(".docs-reading-time")).toContainText("Yaklaşık 1 dakika");
  await expect(page.locator(".docs-article h2")).toHaveCount(2);
  await expect(page.getByRole("link", { name: /1. derse: Dijital sinyaller/ })).toBeVisible();
  const developerGroup = page.locator(".docs-nav details").nth(2);
  await expect(developerGroup).not.toHaveAttribute("open", "");
  await developerGroup.locator("summary").click();
  await expect(developerGroup).toHaveAttribute("open", "");
  await expect(developerGroup.getByRole("link", { name: /Yerel kurulum/ })).toBeVisible();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflowing, `docs page overflow at ${width}px`).toBe(false);
  }
});

test("docs landing page orders concepts, workshop practice and contributor setup", async ({ page }) => {
  await page.goto("/docs/");
  await expect(page.locator(".docs-reading-time")).toHaveText("Tüm rehber yaklaşık 50 dakika");
  await expect(page.locator(".docs-article")).toContainText("Tam işlemci veya assembly geliştirme ortamı kapsamda değildir.");
  const headings = await page.locator(".docs-article h2").allTextContents();
  expect(headings.map((heading) => heading.replace(/~\d+ dk/, "").trim())).toEqual([
    "Temeller", "Atölyede uygula", "Projeyi bilgisayarında çalıştır",
  ]);
  const lessons = ["/docs/dijital-sinyaller/", "/docs/mantik-kapilari/", "/docs/yarim-toplayici/", "/docs/paralel-yollar/", "/docs/saat-yazmac/", "/docs/bloktan-verilog/"];
  const lessonLinks = await page.locator(".docs-article h2").first().locator("xpath=following-sibling::div[1]").locator("a").evaluateAll((items) => items.map((item) => new URL(item.href).pathname));
  expect(lessonLinks).toEqual(["/ludus-circuitus/docs/baslangic/", ...lessons.map((lesson) => `/ludus-circuitus${lesson}`)]);
});

test("every docs navigation, course card and in-page topic link resolves", async ({ page }) => {
  const routes = ["/docs/", "/docs/baslangic/", "/docs/dijital-sinyaller/", "/docs/mantik-kapilari/", "/docs/yarim-toplayici/", "/docs/paralel-yollar/", "/docs/saat-yazmac/", "/docs/bloktan-verilog/", "/docs/kullanim/", "/docs/bloklar/", "/docs/yerel-kurulum/"];
  const links = new Set();
  for (const route of routes) {
    await page.goto(route);
    const hrefs = await page.locator(".docs-nav a[href], .docs-page-toc a[href], .docs-link-list a[href]").evaluateAll((items) => items.map((item) => item.href));
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

test("short lessons show their estimated reading times and active navigation link", async ({ page }) => {
  const lessons = [
    ["/docs/dijital-sinyaller/", "0 ve 1: dijital sinyaller", "Dijital sinyaller", 4],
    ["/docs/mantik-kapilari/", "Mantık kapıları ve doğruluk tabloları", "Mantık kapıları", 4],
    ["/docs/yarim-toplayici/", "İki kapı, bir yarım toplayıcı", "Yarım toplayıcı", 4],
    ["/docs/paralel-yollar/", "Paralel yollar nasıl çalışır?", "Paralel yollar", 3],
    ["/docs/saat-yazmac/", "Saat ve yazmaç", "Saat ve yazmaç", 4],
    ["/docs/bloktan-verilog/", "Bloktan Verilog'a", "Bloktan Verilog'a", 3],
  ];
  for (const [route, heading, navLabel, minutes] of lessons) {
    await page.goto(route);
    await expect(page.locator(".docs-article h1")).toHaveText(heading);
    await expect(page.locator(".docs-reading-time")).toHaveText(`Yaklaşık ${minutes} dakika`);
    await expect(page.locator(".docs-nav a[aria-current='page']")).toContainText(navLabel);
    await expect(page.locator(".docs-nav a[aria-current='page'] small")).toHaveText(`${minutes} dk`);
    await expect(page.locator(".docs-article h2 .docs-section-time")).toHaveCount(minutes);
  }
  await page.goto("/docs/");
  await expect(page.locator(".docs-reading-time")).toHaveText("Tüm rehber yaklaşık 50 dakika");
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
  await expect(article).toContainText("main dalı yalnızca çekme isteğiyle güncellenir");
  await expect(article).toContainText("yeşil build kontrolü gerekir");
});

test("module guide documents the expanded block safety limit", async ({ page }) => {
  await page.goto("/docs/kullanim/");
  await expect(page.locator(".docs-article")).toContainText("birleşmiş devrede ise en fazla 500 blok");
  await expect(page.locator(".docs-article")).toContainText("en fazla 1 MB boyutundaki bir dosyayı açar");
  await expect(page.locator(".docs-article")).toContainText("görselleştirmesini yönetir");
  await expect(page.locator(".docs-article")).toContainText("yeni bir clock kenarı üretmez");
  await expect(page.locator(".docs-article")).toContainText("Bir tik, bir yükselen clock kenarını temsil eder");
});

test("block catalog documents exact ports and distinguishes named wires from register state", async ({ page }) => {
  await page.goto("/docs/bloklar/");
  await expect(page.locator(".docs-reading-time")).toHaveText("Yaklaşık 11 dakika");
  const table = page.getByRole("table", { name: "Blueprint bloklarının giriş ve çıkış portları" });
  await expect(table.locator("tbody tr")).toHaveCount(8);
  await expect(table).toContainText("a");
  await expect(table).toContainText("b");
  await expect(table).toContainText("Belgede tanımlı girişler");
  const portsExplanation = page.locator("#portlar").locator("xpath=following-sibling::p[2]");
  await expect(portsExplanation).toContainText("Ara Sinyal yalnızca isim verilmiş bir");
  await expect(portsExplanation).toContainText("aktif-yüksek asenkron reset");
  await expect(page.locator(".docs-callout")).toContainText("fiziksel kapı gecikmesini");
  await expect(page.locator(".docs-callout")).toContainText("1–32 bit genişlik");
  await expect(page.locator(".docs-callout")).toContainText("genişlik dönüşümü otomatik yapılmaz");
  await expect(page.locator(".docs-article h2")).toHaveCount(6);
  await expect(page.locator(".docs-article h3")).toHaveCount(9);
  await expect(page.locator(".docs-article")).toContainText("1–32 bit genişlik");
  await expect(page.locator(".docs-article")).toContainText("genişlik dönüşümü otomatik yapılmaz");
  await expect(page.locator(".docs-article")).toContainText("bitler arasında taşıma oluşmaz");
  const complementary = page.locator("#tamamlayici-kapilar + p + .block-list + table");
  await expect(complementary).toHaveCount(1);
  await expect(complementary.locator("tbody tr")).toHaveCount(4);
  const gateRows = await complementary.locator("tbody tr").evaluateAll((rows) => rows.map((row) => [...row.cells].map((cell) => cell.textContent.trim())));
  expect(gateRows).toEqual([["0", "0", "1", "1", "1"], ["0", "1", "1", "0", "0"], ["1", "0", "1", "0", "0"], ["1", "1", "0", "0", "1"]]);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflowing, `block catalog overflow at ${width}px`).toBe(false);
  }
});

test("beginner lessons distinguish single-bit examples from supported vector signals", async ({ page }) => {
  await page.goto("/docs/dijital-sinyaller/");
  await expect(page.locator(".docs-article")).toContainText("Atölye daha geniş yolları da destekler");
  await expect(page.locator(".docs-callout")).toContainText("Önce tek bitli örneklerle başlayalım");
  await page.goto("/docs/mantik-kapilari/");
  await expect(page.locator(".docs-article")).toContainText("kapı aynı kuralı her bit konumuna ayrı uygular");
  await expect(page.locator(".docs-article")).toContainText("İsteğe bağlı, biraz ileri");
  await page.goto("/docs/saat-yazmac/");
  await expect(page.locator(".docs-article")).toContainText("aynı genişlikteki Q çıkışına alınır");
  await expect(page.locator("[data-docs-practice] legend")).toContainText("Reset uygulanıp bırakıldıktan sonra Q=0");
});

test("core lessons provide keyboard-friendly local self-checks with immediate feedback", async ({ page }) => {
  const checks = [
    ["/docs/dijital-sinyaller/", "signal-check", "released", "pressed"],
    ["/docs/mantik-kapilari/", "gate-check", "one", "zero"],
    ["/docs/yarim-toplayici/", "adder-check", "sum-one-carry-zero", "sum-zero-carry-one"],
    ["/docs/paralel-yollar/", "parallel-check", "in-order", "together"],
    ["/docs/saat-yazmac/", "register-check", "updates-now", "holds-zero"],
    ["/docs/bloktan-verilog/", "assign-check", "and-sum", "xor-sum"],
  ];
  const writes = [];
  page.on("request", (request) => {
    if (request.method() !== "GET") writes.push(`${request.method()} ${request.url()}`);
  });
  for (const [route, name, wrong, right] of checks) {
    await page.goto(route);
    const form = page.locator("[data-docs-practice]");
    const wrongOption = form.locator(`input[name="${name}"][value="${wrong}"]`);
    const checkButton = form.getByRole("button", { name: "Yanıtı denetle" });
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute("data-answer", right);
    await expect(form.locator("fieldset")).toHaveCount(1);
    await wrongOption.focus();
    await page.keyboard.press("Space");
    await expect(wrongOption).toBeChecked();
    await page.keyboard.press("Tab");
    await expect(checkButton).toBeFocused();
    await page.keyboard.press("Enter");
    const feedback = form.locator("[data-feedback]");
    await expect(feedback).toHaveAttribute("data-state", "retry");
    await expect(feedback).not.toBeEmpty();
    await form.locator(`input[name="${name}"][value="${right}"]`).check();
    await expect(feedback).toBeEmpty();
    await checkButton.click();
    await expect(feedback).toHaveAttribute("data-state", "correct");
    await expect(feedback).toContainText("Doğru");
    expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
    for (const width of [320, 390, 768]) {
      await page.setViewportSize({ width, height: 844 });
      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      expect(hasOverflow, `unexpected ${route} overflow at ${width}px`).toBe(false);
    }
  }
  expect(writes).toEqual([]);
});
