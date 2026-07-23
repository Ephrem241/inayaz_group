import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Desktop Chromium",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: /mobile-navigation\.spec\.ts/,
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 7"] },
      testMatch: /mobile-navigation\.spec\.ts/,
    },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    // Bumped from 120s: the embedded Sanity Studio bundle (Phase 5, Step 22)
    // added several minutes to the production build itself, which this
    // webServer command runs before the app is reachable.
    timeout: 600_000,
  },
});
