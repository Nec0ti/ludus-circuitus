import { test, expect } from "@playwright/test";
import { quizForms } from "../../assets/js/quiz-data.mjs";

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    url.pathname = url.pathname.replace(/^\/ludus-circuitus(?=\/|$)/, "") || "/";
    route.continue({ url: url.toString() });
  });
});

test("quiz reports the correct score without sending answer data", async ({ page }) => {
  const requests = [];
  page.on("request", (request) => requests.push({ method: request.method(), url: request.url() }));
  await page.goto("/quiz/");
  await expect(page.getByRole("heading", { name: "Mantık yollarını tahmin et." })).toBeVisible();
  await expect(page.locator("#quiz-questions fieldset")).toHaveCount(8);
  for (const question of quizForms.A) await page.locator(`#quiz-questions input[name="${question.id}"][value="${question.answer}"]`).check();
  await page.getByRole("button", { name: "Yanıtlarımı değerlendir" }).click();
  await expect(page.locator("#quiz-results .quiz-score")).toHaveText("8/8 doğru · 100/100");
  await expect(page.locator("#quiz-results .quiz-breakdown li").nth(0)).toContainText("4/4");
  await expect(page.locator("#quiz-results .quiz-breakdown li").nth(1)).toContainText("2/2");
  await expect(page.locator("#quiz-results .quiz-breakdown li").nth(2)).toContainText("2/2");
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
  await page.getByRole("button", { name: "Bu formu yeniden çöz" }).click();
  await expect(page.locator("#quiz-results")).toBeHidden();
  await page.getByRole("button", { name: "Form B" }).click();
  await expect(page.locator("#quiz-questions input:checked")).toHaveCount(0);
  await expect(page.locator("#quiz-questions fieldset")).toHaveCount(8);
  expect(requests.filter((request) => request.method !== "GET")).toEqual([]);
  expect(requests.every((request) => new URL(request.url).origin === new URL(page.url()).origin)).toBe(true);
});

test("requires a response to every question before scoring", async ({ page }) => {
  await page.goto("/quiz/");
  await page.locator("#quiz-questions fieldset").first().locator("input").first().check();
  await page.getByRole("button", { name: "Yanıtlarımı değerlendir" }).click();
  await expect(page.getByRole("status")).toContainText("tüm soruları yanıtla");
  await expect(page.locator("#quiz-results")).toBeHidden();
});

test("quiz keeps question cards inside narrow viewports", async ({ page }) => {
  await page.goto("/quiz/");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `horizontal overflow at ${width}px`).toBe(true);
  }
});
