import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    colorScheme: "light",
    javaScriptEnabled: true,
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 1200,
      threshold: 0.25,
      animations: "disabled",
    },
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
