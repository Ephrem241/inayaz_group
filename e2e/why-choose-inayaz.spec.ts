import { test, expect } from "@playwright/test";
import { WHY_CHOOSE_STRENGTHS } from "../src/constants/why-choose";

test.describe("Why Choose INAYAZ", () => {
  test("eyebrow and heading render", async ({ page }) => {
    await page.goto("/");
    const eyebrow = page.getByText("Why Choose INAYAZ", { exact: true });
    await eyebrow.scrollIntoViewIfNeeded();
    await expect(eyebrow).toBeVisible();
    await expect(page.getByRole("heading", { name: "Built for Confidence" })).toBeVisible();
  });

  test("all six strength titles and verbatim body copy render", async ({ page }) => {
    await page.goto("/");

    for (const strength of WHY_CHOOSE_STRENGTHS) {
      const panel = page.locator(`[data-why-choose="${strength.id}"]`);
      await panel.scrollIntoViewIfNeeded();
      await expect(panel.getByRole("heading", { name: strength.title, exact: true })).toBeVisible();
      await expect(panel.getByText(strength.body, { exact: true })).toBeVisible();
    }
  });

  test("exactly three strengths are verified and three are suggested", () => {
    const verified = WHY_CHOOSE_STRENGTHS.filter((s) => s.provenance === "verified");
    const suggested = WHY_CHOOSE_STRENGTHS.filter((s) => s.provenance === "suggested");
    expect(verified).toHaveLength(3);
    expect(suggested).toHaveLength(3);
  });
});
