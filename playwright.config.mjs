import { defineConfig } from "@playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT || 4173);

export default defineConfig({
  testDir: "./tests/e2e",
  use: { baseURL: `http://127.0.0.1:${port}`, browserName: "chromium", launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }, viewport: { width: 1440, height: 900 } },
  webServer: { command: `python3 -m http.server ${port} --bind 127.0.0.1 --directory _site`, url: `http://127.0.0.1:${port}/`, reuseExistingServer: !process.env.CI }
});
