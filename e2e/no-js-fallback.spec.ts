import { test, expect } from "@playwright/test";

// Empirically verifies the actual fix, not just its mechanism: with
// JavaScript genuinely disabled, GSAP never runs, so every element gated by
// a static opacity-0/clip-path/scale initial state must still be visible via
// the ".no-js" CSS fallback (globals.css) — proving the content isn't
// permanently hidden when hydration never happens.
test.describe("No-JS fallback", () => {
  test.use({ javaScriptEnabled: false });

  test("homepage hero content is visible without JavaScript", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("INAYAZ Group", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore Our Projects" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Discover INAYAZ" })).toBeVisible();
  });

  test("scroll-revealed section headings are visible without JavaScript", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Built on Purpose. Driven by Integrity." }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Built for Confidence" })).toBeVisible();
  });

  test("featured project showcase images are visible without JavaScript", async ({ page }) => {
    await page.goto("/");

    const reveal = page.locator("[data-project-reveal]").first();
    await expect(reveal).toHaveCSS("clip-path", "none");
  });

  test("editorial mask-reveal images are visible without JavaScript", async ({ page }) => {
    await page.goto("/");

    const reveal = page.locator("[data-mask-reveal]").first();
    await expect(reveal).toHaveCSS("clip-path", "none");
  });

  test("the construction process falls back to the always-visible stacked timeline", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator("[data-construction-process-desktop]")).toBeHidden();
    const mobile = page.locator("[data-construction-process-mobile]");
    await expect(mobile).toBeVisible();
    await expect(mobile.getByText("Vision", { exact: true })).toBeVisible();
  });
});
