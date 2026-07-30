import { test, expect } from "@playwright/test";
import { METRICS, YEARS_OF_EXPERIENCE } from "../src/constants/metrics";

test.describe("Metrics", () => {
  test("draft metrics never render publicly", async ({ page }) => {
    await page.goto("/");

    const draftLabels = METRICS.filter((metric) => metric.status !== "published").map(
      (metric) => metric.label,
    );
    for (const label of draftLabels) {
      await expect(page.getByText(label, { exact: true })).toHaveCount(0);
    }
  });

  test("no placeholder or pending-confirmation text appears anywhere on the homepage", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByText("Pending confirmation")).toHaveCount(0);
    await expect(page.getByText("—", { exact: true })).toHaveCount(0);
  });

  test("with fewer than three published metrics, a confirmed-facts strip renders instead of a sparse grid", async ({
    page,
  }) => {
    await page.goto("/");
    const publishedCount = METRICS.filter((metric) => metric.status === "published").length;
    expect(publishedCount).toBeLessThan(3);

    const facts = page.locator("[data-confirmed-facts]");
    await expect(facts.getByText(`${YEARS_OF_EXPERIENCE} Years of Experience`)).toBeVisible();
    await expect(facts.getByText("Category 1 General Contractor", { exact: true })).toBeVisible();
    await expect(facts.getByText("Addis Ababa Headquarters")).toBeVisible();
    await expect(page.locator("[data-metric]")).toHaveCount(0);
  });
});
