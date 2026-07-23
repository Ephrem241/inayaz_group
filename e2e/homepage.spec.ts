import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("hero renders headline, eyebrow, and CTAs", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("INAYAZ Group", { exact: true })).toBeVisible();
    const headline = page.getByRole("heading", { level: 1 });
    await expect(headline).toContainText("Engineering Landmarks.");
    await expect(headline).toContainText("Creating Lasting Value.");
    await expect(page.getByRole("link", { name: "Explore Our Projects" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Discover INAYAZ" })).toBeVisible();
  });

  test("all three hero layer images load successfully", async ({ page }) => {
    await page.goto("/");
    const heroImages = page.locator("section").first().locator("img");
    await expect(heroImages).toHaveCount(3);

    for (let i = 0; i < 3; i++) {
      const img = heroImages.nth(i);
      await expect(img).toBeVisible();
      await img.evaluate((el: HTMLImageElement) =>
        el.complete ? Promise.resolve() : new Promise((resolve) => el.addEventListener("load", resolve, { once: true })),
      );
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test("footer renders verified contact info", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");

    await expect(footer.getByText("ZULYEKA Building")).toBeVisible();
    await expect(footer.getByRole("link", { name: "info@inayazgroup.com" })).toHaveAttribute(
      "href",
      "mailto:info@inayazgroup.com",
    );
    await expect(footer.getByRole("link", { name: "+251 973 223 312" })).toHaveAttribute(
      "href",
      "tel:+251973223312",
    );
    await expect(footer.getByRole("link", { name: "+251 968 666 664" })).toHaveAttribute(
      "href",
      "tel:+251968666664",
    );
  });

  test("visiting a not-yet-built route returns a real 404, not a soft 404", async ({ page }) => {
    const response = await page.goto("/careers");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Page Not Found")).toBeVisible();
  });
});
