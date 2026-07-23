import { test, expect } from "@playwright/test";
import { PROCESS_STAGES } from "../src/constants/construction-process";

test.describe("Construction Process", () => {
  test("all six stage names and descriptions render in the desktop tree", async ({ page }) => {
    await page.goto("/");
    const desktop = page.locator("[data-construction-process-desktop]");
    await desktop.scrollIntoViewIfNeeded();

    for (const stage of PROCESS_STAGES) {
      await expect(desktop.getByText(stage.name, { exact: true })).toBeVisible();
      await expect(desktop.getByText(stage.description)).toBeVisible();
    }
  });

  test("active stage advances while scrolling through the pinned section and reverses on scroll-up", async ({
    page,
  }) => {
    await page.goto("/");
    const pinned = page.locator("[data-construction-process-desktop] [data-active-stage]");
    await pinned.scrollIntoViewIfNeeded();
    await expect(pinned).toHaveAttribute("data-active-stage", "0");

    const viewport = page.viewportSize();
    const height = viewport?.height ?? 720;
    await page.mouse.move((viewport?.width ?? 1280) / 2, height / 2);

    for (let i = 1; i < PROCESS_STAGES.length; i++) {
      await page.mouse.wheel(0, height);
      await expect(pinned).toHaveAttribute("data-active-stage", String(i));
    }

    for (let i = PROCESS_STAGES.length - 2; i >= 0; i--) {
      await page.mouse.wheel(0, -height);
      await expect(pinned).toHaveAttribute("data-active-stage", String(i));
    }
  });

  test("progress line marks exactly one active segment matching the active stage", async ({ page }) => {
    await page.goto("/");
    const pinned = page.locator("[data-construction-process-desktop] [data-active-stage]");
    await pinned.scrollIntoViewIfNeeded();

    const segments = page.locator("[data-construction-process-desktop] [data-progress-segment]");
    await expect(segments).toHaveCount(PROCESS_STAGES.length);

    const viewport = page.viewportSize();
    const height = viewport?.height ?? 720;
    await page.mouse.move((viewport?.width ?? 1280) / 2, height / 2);
    await page.mouse.wheel(0, height * 2);
    await expect(pinned).toHaveAttribute("data-active-stage", "2");

    const current = page.locator(
      '[data-construction-process-desktop] [data-progress-segment][aria-current="step"]',
    );
    await expect(current).toHaveCount(1);
    await expect(current).toHaveAttribute("aria-label", PROCESS_STAGES[2].name);
  });

  test.describe("mobile viewport", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("renders a vertical timeline instead of the pinned mechanism", async ({ page }) => {
      await page.goto("/");
      const desktop = page.locator("[data-construction-process-desktop]");
      const mobile = page.locator("[data-construction-process-mobile]");
      await mobile.scrollIntoViewIfNeeded();

      await expect(desktop).toBeHidden();
      await expect(mobile).toBeVisible();

      for (const stage of PROCESS_STAGES) {
        await expect(mobile.getByText(stage.name, { exact: true })).toBeVisible();
      }

      // The desktop tree's ScrollTrigger.matchMedia("(min-width: 1024px)")
      // never matches at this viewport width, so no pin/scrub is ever
      // created and the (hidden) desktop wrapper's active-stage attribute
      // never advances past its static initial value.
      await expect(desktop.locator("[data-active-stage]")).toHaveAttribute(
        "data-active-stage",
        "0",
      );
    });
  });
});
