import { test, expect } from "@playwright/test";
import { DIVISIONS } from "../src/constants/divisions";

async function waitForImageLoad(locator: import("@playwright/test").Locator) {
  await locator.evaluate((el: HTMLImageElement) =>
    el.complete
      ? Promise.resolve()
      : new Promise((resolve) => el.addEventListener("load", resolve, { once: true })),
  );
}

test.describe("Business Divisions", () => {
  test("renders heading and all six division buttons", async ({ page }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", { name: "Integrated Expertise. Uncompromised Scale." });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();

    for (const division of DIVISIONS) {
      await expect(page.getByRole("button", { name: division.name })).toBeVisible();
    }
  });

  test("first division is active by default", async ({ page }) => {
    await page.goto("/");
    const first = DIVISIONS[0];

    const heading = page.getByRole("heading", { name: "Integrated Expertise. Uncompromised Scale." });
    await heading.scrollIntoViewIfNeeded();

    const firstButton = page.getByRole("button", { name: first.name });
    await expect(firstButton).toHaveAttribute("aria-current", "true");
    await expect(page.getByText(first.description)).toBeVisible();
    await expect(page.getByText(first.items[0])).toBeVisible();
  });

  test("clicking a different division updates description, items, and active state", async ({ page }) => {
    await page.goto("/");
    const target = DIVISIONS[1];
    const first = DIVISIONS[0];

    const heading = page.getByRole("heading", { name: "Integrated Expertise. Uncompromised Scale." });
    await heading.scrollIntoViewIfNeeded();

    await page.getByRole("button", { name: target.name }).click();

    await expect(page.getByRole("button", { name: target.name })).toHaveAttribute(
      "aria-current",
      "true",
    );
    await expect(page.getByRole("button", { name: first.name })).not.toHaveAttribute(
      "aria-current",
      "true",
    );
    await expect(page.getByText(target.description)).toBeVisible();
    await expect(page.getByText(target.items[0])).toBeVisible();
  });

  test("keyboard-only activation updates the active division", async ({ page }) => {
    await page.goto("/");
    const target = DIVISIONS[2];

    const heading = page.getByRole("heading", { name: "Integrated Expertise. Uncompromised Scale." });
    await heading.scrollIntoViewIfNeeded();

    await page.getByRole("button", { name: target.name }).focus();
    await page.keyboard.press("Enter");

    await expect(page.getByRole("button", { name: target.name })).toHaveAttribute(
      "aria-current",
      "true",
    );
    await expect(page.getByText(target.description)).toBeVisible();
  });

  test("division image loads before and after switching", async ({ page }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", { name: "Integrated Expertise. Uncompromised Scale." });
    await heading.scrollIntoViewIfNeeded();

    const image = page.locator("[data-switcher-image] img");
    await expect(image).toBeVisible();
    await waitForImageLoad(image);
    expect(await image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);

    await page.getByRole("button", { name: DIVISIONS[3].name }).click();

    const switchedImage = page.locator("[data-switcher-image] img");
    await expect(switchedImage).toBeVisible();
    await waitForImageLoad(switchedImage);
    expect(await switchedImage.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  });
});
