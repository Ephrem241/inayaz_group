import { test, expect } from "@playwright/test";
import { METRICS } from "../src/constants/metrics";

test.describe("Metrics", () => {
  test("all six metric labels render", async ({ page }) => {
    await page.goto("/");

    for (const metric of METRICS) {
      const slot = page.locator(`[data-metric="${metric.id}"]`);
      await slot.scrollIntoViewIfNeeded();
      await expect(slot.getByText(metric.label, { exact: true })).toBeVisible();
    }
  });

  test("confirmed metric counts up to its final value", async ({ page }) => {
    await page.goto("/");

    const slot = page.locator('[data-metric="years-of-experience"]');
    await slot.scrollIntoViewIfNeeded();

    const value = page.locator('[data-metric="years-of-experience"] [data-metric-value]');
    await expect(value).toHaveText("11");
  });

  test("pending metrics show an honest placeholder, not a fabricated number", async ({ page }) => {
    await page.goto("/");

    const pending = METRICS.filter((metric) => metric.status === "pending");
    for (const metric of pending) {
      const slot = page.locator(`[data-metric="${metric.id}"]`);
      await slot.scrollIntoViewIfNeeded();

      await expect(slot).toHaveAttribute("data-metric-status", "pending");
      await expect(slot.getByText("—", { exact: true })).toBeVisible();
      await expect(slot.getByText("Pending confirmation")).toBeVisible();
      await expect(slot.locator("[data-metric-value]")).toHaveCount(0);
    }
  });

  test("exactly one metric is confirmed and five are pending", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator('[data-metric-status="confirmed"]')).toHaveCount(1);
    await expect(page.locator('[data-metric-status="pending"]')).toHaveCount(5);
  });
});
