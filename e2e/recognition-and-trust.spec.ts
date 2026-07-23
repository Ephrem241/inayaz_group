import { test, expect } from "@playwright/test";
import { RECOGNITIONS } from "../src/constants/recognition";

test.describe("Recognition and Trust", () => {
  test("all three recognition names and verbatim descriptions render", async ({ page }) => {
    await page.goto("/");

    for (const item of RECOGNITIONS) {
      const panel = page.locator(`[data-recognition="${item.id}"]`);
      await panel.scrollIntoViewIfNeeded();
      await expect(panel.getByText(item.name, { exact: true })).toBeVisible();
      await expect(panel.getByText(item.description, { exact: true })).toBeVisible();
    }
  });

  test("CBE and COOP show an honest pending note; GC-1 does not", async ({ page }) => {
    await page.goto("/");

    for (const id of ["cbe", "coop"]) {
      const panel = page.locator(`[data-recognition="${id}"]`);
      await panel.scrollIntoViewIfNeeded();
      await expect(panel.locator("[data-pending-note]")).toBeVisible();
    }

    await expect(page.locator('[data-recognition="gc1"] [data-pending-note]')).toHaveCount(0);
  });

  test("exactly three recognitions render, exactly two carry a pending note", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("[data-recognition]")).toHaveCount(3);
    await expect(page.locator("[data-pending-note]")).toHaveCount(2);
  });

  test("no certificate download link or image/logo graphic is published for any item", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.locator("[data-recognition] a, [data-recognition] img, [data-recognition] svg"),
    ).toHaveCount(0);
    await expect(page.locator('a[href*=".pdf"]')).toHaveCount(0);
  });

  test("no date text is published for CBE or COOP (dates are unconfirmed)", async ({ page }) => {
    await page.goto("/");

    for (const id of ["cbe", "coop"]) {
      const text = await page.locator(`[data-recognition="${id}"]`).innerText();
      expect(text).not.toMatch(/\b(19|20)\d{2}\b/);
    }
  });
});
