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

  test("featured project cards (MotionCard + Image3D) are visible without JavaScript", async ({
    page,
  }) => {
    await page.goto("/");

    const card = page.locator("[data-motion-card]").first();
    await expect(card).toBeVisible();

    const image = page.locator("[data-image-3d]").first();
    await expect(image).toBeVisible();
    await expect(image).toHaveCSS("opacity", "1");
  });

  test("the project gallery (Image3D) is visible without JavaScript", async ({ page }) => {
    await page.goto("/projects/ameliyaz");

    const gallery = page.locator("[data-project-gallery] [data-image-3d]");
    await expect(gallery.first()).toBeVisible();
    await expect(gallery.first()).toHaveCSS("opacity", "1");
  });

  test("the sustainability section's parallax image is visible without JavaScript", async ({
    page,
  }) => {
    await page.goto("/");

    const reveal = page.locator("[data-reveal-image]").first();
    await expect(reveal).toBeVisible();
    await expect(reveal).toHaveCSS("opacity", "1");

    const parallax = reveal.locator("[data-parallax-image]");
    await expect(parallax).toBeVisible();
  });

  test("published metrics show their final number (not a stuck 0) without JavaScript", async ({
    page,
  }) => {
    await page.goto("/");

    // Mirrors the reduced-motion suite's same conditional: the metrics grid
    // only renders once 3+ metrics are published in Sanity (today there's
    // just one, so the homepage shows the static facts strip instead). This
    // closes the real gap the old GSAP-only AnimatedMetric had — it
    // server-rendered "0" and only ever corrected it in a useEffect, so a
    // no-JS visitor saw a permanently stuck zero. AnimatedCounter now
    // server-renders the final value directly.
    const metricValue = page.locator("[data-metric-value]").first();
    if (await metricValue.count()) {
      const text = await metricValue.textContent();
      expect(text).not.toBe("0");
      await expect(metricValue).toBeVisible();
    } else {
      await expect(page.locator("[data-confirmed-facts]")).toBeVisible();
    }
  });
});
