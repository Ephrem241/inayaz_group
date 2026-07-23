import { test, expect } from "@playwright/test";

test.describe("Reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("hero content is immediately visible with no GSAP reveal delay", async ({ page }) => {
    await page.goto("/");

    const hero = page.locator("section").first();
    const eyebrow = hero.getByText("INAYAZ Group", { exact: true });
    const headline = hero.getByRole("heading", { level: 1 });
    const subtext = hero.getByText(/A diversified Ethiopian business group/);
    const cta = hero.getByRole("link", { name: "Explore Our Projects" });

    await expect(eyebrow).toHaveCSS("opacity", "1");
    await expect(subtext).toHaveCSS("opacity", "1");
    await expect(cta).toHaveCSS("opacity", "1");

    const clipPath = await headline.evaluate((el) => getComputedStyle(el).clipPath);
    expect(clipPath).not.toContain("100%");
  });

  test("all scroll-revealed section headings and the editorial image are immediately visible with no scroll-reveal delay", async ({
    page,
  }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", { name: "Built on Purpose. Driven by Integrity." });
    await heading.scrollIntoViewIfNeeded();

    const motionSections = page.locator("[data-motion-section]");
    const count = await motionSections.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(motionSections.nth(i)).toHaveCSS("opacity", "1");
    }

    const imageWrappers = page.locator("[data-mask-reveal]");
    const wrapperCount = await imageWrappers.count();
    expect(wrapperCount).toBeGreaterThan(0);
    for (let i = 0; i < wrapperCount; i++) {
      const clipPath = await imageWrappers.nth(i).evaluate((el) => getComputedStyle(el).clipPath);
      expect(clipPath).not.toContain("100%");
    }
  });

  test("featured project panels are immediately visible with no reveal delay and no residual scroll-scrub scale", async ({
    page,
  }) => {
    await page.goto("/");

    const reveals = page.locator("[data-project-reveal]");
    const images = page.locator("[data-project-image-scale]");
    const count = await reveals.count();
    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      await reveals.nth(i).scrollIntoViewIfNeeded();

      const clipPath = await reveals.nth(i).evaluate((el) => getComputedStyle(el).clipPath);
      expect(clipPath).not.toContain("100%");

      const transform = await images.nth(i).evaluate((el) => getComputedStyle(el).transform);
      // Reduced motion sets scale to exactly 1 and never registers the scrub
      // ScrollTrigger, so the matrix's scale component must be 1 — not a
      // mid-scrub value like 1.08-1.18.
      expect(transform === "none" || transform.startsWith("matrix(1, 0, 0, 1")).toBe(true);
    }
  });

  test("construction process falls back to the stacked timeline instead of pinning, even at a desktop viewport", async ({
    page,
  }) => {
    await page.goto("/");

    const desktop = page.locator("[data-construction-process-desktop]");
    const mobile = page.locator("[data-construction-process-mobile]");
    await mobile.scrollIntoViewIfNeeded();

    // Desktop viewport (default Desktop Chromium project, >= 1024px), but
    // reduced motion forces the stacked/mobile-style tree instead of pinning.
    await expect(desktop).toBeHidden();
    await expect(mobile).toBeVisible();

    // No pin/scrub ScrollTrigger was ever created, so the (hidden) desktop
    // wrapper's active-stage attribute never advances past its static
    // initial value.
    await expect(desktop.locator("[data-active-stage]")).toHaveAttribute(
      "data-active-stage",
      "0",
    );
  });

  test("confirmed metric shows its final value immediately with no count-up", async ({ page }) => {
    await page.goto("/");

    const value = page.locator('[data-metric="years-of-experience"] [data-metric-value]');
    await value.scrollIntoViewIfNeeded();
    await expect(value).toHaveText("11");
  });
});
