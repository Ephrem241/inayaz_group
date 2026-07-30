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

  test("the logo marks itself as the active route on / (no explicit Home nav item)", async ({
    page,
  }) => {
    // NAV_ITEMS deliberately has no "Home" entry — the header logo already
    // links to "/" (Phase F), so it carries the active-state semantics
    // instead.
    await page.goto("/");
    const logo = page.getByRole("link", { name: "INAYAZ Group — Home" }).first();
    await expect(logo).toHaveAttribute("aria-current", "page");

    await page.goto("/about");
    await expect(logo).not.toHaveAttribute("aria-current", "page");
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
