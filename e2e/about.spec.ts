import { test, expect } from "@playwright/test";

test.describe("About page", () => {
  test("loads for real with a 200 status and correct title", async ({ page }) => {
    const response = await page.goto("/about");
    expect(response?.status()).toBe(200);
    await expect(page.getByText("Page Not Found")).toHaveCount(0);
    await expect(page).toHaveTitle("About Us | INAYAZ Group");
  });

  test("intro renders headline, subheading, meaning of INAYAZ, and timeline", async ({
    page,
  }) => {
    await page.goto("/about");
    const section = page.locator("[data-about-intro-section]");

    await expect(
      section.getByRole("heading", { name: "Built on Purpose. Driven by Integrity.", level: 1 }),
    ).toBeVisible();
    await expect(
      section.getByText("Grounded in Humility, Committed to Excellence."),
    ).toBeVisible();
    await expect(
      section.getByText(/INAYAZ represents care, precision, and responsibility/),
    ).toBeVisible();
    await expect(section.getByText(/2015 — Founded/)).toBeVisible();
  });

  test("leadership section shows an honest pending note and no fabricated headshots", async ({
    page,
  }) => {
    await page.goto("/about");
    const section = page.locator("[data-leadership-section]");
    await section.scrollIntoViewIfNeeded();

    await expect(
      section.getByRole("heading", { name: "Guided by People, Not Just Process" }),
    ).toBeVisible();
    await expect(section.locator("[data-pending-note]")).toBeVisible();
    await expect(section.locator("img")).toHaveCount(0);
  });

  test("reused sections render on this page", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByText("Our Mission", { exact: true })).toBeVisible();
    await expect(page.getByText("Our Vision", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What Guides Us" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Built for Confidence" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Earned, Not Assumed" })).toBeVisible();
  });

  test("closing CTA links to Contact", async ({ page }) => {
    await page.goto("/about");
    const section = page.locator("[data-about-cta-section]");
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByRole("link", { name: "Contact Us" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
