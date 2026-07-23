import { test, expect } from "@playwright/test";
import { SUSTAINABILITY_TOPICS } from "../src/constants/sustainability";

test.describe("Sustainability", () => {
  test("/sustainability loads for real with a 200 status and correct title", async ({ page }) => {
    const response = await page.goto("/sustainability");
    expect(response?.status()).toBe(200);
    await expect(page.getByText("Page Not Found")).toHaveCount(0);
    await expect(page).toHaveTitle("Sustainability | INAYAZ Group");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("eyebrow and heading render", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("[data-sustainability-section]");
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByText("Sustainability", { exact: true })).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Built to Last, Built Responsibly", level: 2 }),
    ).toBeVisible();
  });

  test("all seven topic names and verbatim descriptions render", async ({ page }) => {
    await page.goto("/");

    for (const topic of SUSTAINABILITY_TOPICS) {
      const panel = page.locator(`[data-sustainability-topic="${topic.id}"]`);
      await panel.scrollIntoViewIfNeeded();
      await expect(panel.getByRole("heading", { name: topic.name, exact: true })).toBeVisible();
      await expect(panel.getByText(topic.description, { exact: true })).toBeVisible();
    }
  });

  test("exactly seven topics render", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-sustainability-topic]")).toHaveCount(7);
  });

  test("both editorial images load successfully", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("[data-sustainability-section]");
    await section.scrollIntoViewIfNeeded();

    const images = section.locator("img");
    const count = await images.count();
    expect(count).toBe(2);

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((el: HTMLImageElement) =>
        el.complete
          ? Promise.resolve()
          : new Promise((resolve) => el.addEventListener("load", resolve, { once: true })),
      );
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });
});
