import { test, expect } from "@playwright/test";
import { SERVICES } from "../src/constants/services";

async function waitForImageLoad(locator: import("@playwright/test").Locator) {
  await locator.evaluate((el: HTMLImageElement) =>
    el.complete
      ? Promise.resolve()
      : new Promise((resolve) => el.addEventListener("load", resolve, { once: true })),
  );
}

test.describe("Services page", () => {
  test("loads for real with a 200 status and correct title", async ({ page }) => {
    const response = await page.goto("/services");
    expect(response?.status()).toBe(200);
    await expect(page.getByText("Page Not Found")).toHaveCount(0);
    await expect(page).toHaveTitle("Services | INAYAZ Group");
  });

  test("intro renders an H1", async ({ page }) => {
    await page.goto("/services");
    const section = page.locator("[data-services-intro-section]");
    await expect(section.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("all ten service names render as switcher buttons", async ({ page }) => {
    await page.goto("/services");
    const heading = page.getByRole("heading", { name: "Full-Service, Ground to Handover." });
    await heading.scrollIntoViewIfNeeded();

    for (const service of SERVICES) {
      await expect(page.getByRole("button", { name: service.name })).toBeVisible();
    }
  });

  test("first service is active by default", async ({ page }) => {
    await page.goto("/services");
    const first = SERVICES[0];

    const heading = page.getByRole("heading", { name: "Full-Service, Ground to Handover." });
    await heading.scrollIntoViewIfNeeded();

    const firstButton = page.getByRole("button", { name: first.name });
    await expect(firstButton).toHaveAttribute("aria-current", "true");
    await expect(page.getByText(first.description)).toBeVisible();
  });

  test("clicking a different service updates description, active state, and shows a different image", async ({
    page,
  }) => {
    await page.goto("/services");
    const target = SERVICES[1];
    const first = SERVICES[0];

    const heading = page.getByRole("heading", { name: "Full-Service, Ground to Handover." });
    await heading.scrollIntoViewIfNeeded();

    const initialSrc = await page.locator("[data-switcher-image] img").getAttribute("src");

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

    const switchedSrc = await page.locator("[data-switcher-image] img").getAttribute("src");
    expect(switchedSrc).not.toBe(initialSrc);
  });

  test("service image loads before and after switching", async ({ page }) => {
    await page.goto("/services");

    const heading = page.getByRole("heading", { name: "Full-Service, Ground to Handover." });
    await heading.scrollIntoViewIfNeeded();

    const image = page.locator("[data-switcher-image] img");
    await expect(image).toBeVisible();
    await waitForImageLoad(image);
    expect(await image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);

    await page.getByRole("button", { name: SERVICES[3].name }).click();

    const switchedImage = page.locator("[data-switcher-image] img");
    await expect(switchedImage).toBeVisible();
    await waitForImageLoad(switchedImage);
    expect(await switchedImage.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(
      0,
    );
  });

  test("Engineering Consultancy copy doesn't claim in-house or independent consultancy", async ({
    page,
  }) => {
    await page.goto("/services");
    const heading = page.getByRole("heading", { name: "Full-Service, Ground to Handover." });
    await heading.scrollIntoViewIfNeeded();

    await page.getByRole("button", { name: "Engineering Consultancy" }).click();

    await expect(
      page.getByText(/in-house engineer|independent consultanc(y|ies)|our own engineers/i),
    ).toHaveCount(0);
  });

  test("closing CTA links to Contact", async ({ page }) => {
    await page.goto("/services");
    const section = page.locator("[data-services-cta-section]");
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByRole("link", { name: "Contact Us" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
