import { test, expect } from "@playwright/test";
import { MISSION_STATEMENT, VISION_STATEMENT, CORE_VALUES } from "../src/constants/mission-vision-values";

test.describe("Mission, Vision, and Values", () => {
  test("mission and vision statements render verbatim", async ({ page }) => {
    // Lives only on /about since Phase C's homepage restructure — the
    // homepage no longer duplicates this section (it was rendered in full,
    // verbatim, on /about already).
    await page.goto("/about");

    const mission = page.getByText(MISSION_STATEMENT, { exact: true });
    await mission.scrollIntoViewIfNeeded();
    await expect(mission).toBeVisible();

    const vision = page.getByText(VISION_STATEMENT, { exact: true });
    await expect(vision).toBeVisible();
  });

  test("all five core value names render", async ({ page }) => {
    // Lives only on /about since Phase C's homepage restructure — the
    // homepage no longer duplicates this section (it was rendered in full,
    // verbatim, on /about already).
    await page.goto("/about");

    for (const value of CORE_VALUES) {
      const heading = page.getByRole("heading", { name: value.name, exact: true });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    }
  });
});
