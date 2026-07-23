import { test, expect } from "@playwright/test";
import { NAV_ITEMS, PRIMARY_CTA } from "../src/constants/navigation";

test.describe("Desktop navigation", () => {
  test("renders all nav items and the primary CTA with correct hrefs", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });

    for (const item of NAV_ITEMS) {
      await expect(nav.getByRole("link", { name: item.label, exact: true })).toHaveAttribute(
        "href",
        item.href,
      );
    }

    await expect(page.getByRole("link", { name: PRIMARY_CTA.label }).first()).toHaveAttribute(
      "href",
      PRIMARY_CTA.href,
    );
  });

  test("marks the Home link as the active route on /", async ({ page }) => {
    await page.goto("/");
    const homeLink = page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Home", exact: true });
    await expect(homeLink).toHaveAttribute("aria-current", "page");
  });

  test("header background transitions from transparent to solid on scroll", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");

    const initialBg = await header.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(initialBg).toBe("rgba(0, 0, 0, 0)");

    await page.mouse.wheel(0, 400);

    await expect(async () => {
      const scrolledBg = await header.evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(scrolledBg).not.toBe("rgba(0, 0, 0, 0)");
    }).toPass();
  });
});
