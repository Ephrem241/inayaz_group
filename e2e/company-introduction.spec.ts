import { test, expect } from "@playwright/test";

test.describe("Company Introduction", () => {
  test("renders title, body copy, quote, timeline, and CTA", async ({ page }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", { name: "Built on Purpose. Driven by Integrity." });
    await heading.scrollIntoViewIfNeeded();

    await expect(heading).toBeVisible();
    await expect(
      page.getByText(/Since 2015, INAYAZ has grown into a diversified/),
    ).toBeVisible();
    await expect(page.getByText(/From complex high-rise developments/)).toBeVisible();
    await expect(
      page.getByText(/INAYAZ represents care, precision, and responsibility/),
    ).toBeVisible();
    await expect(page.getByText(/2015 — Founded/)).toBeVisible();
    await expect(page.getByRole("link", { name: "About INAYAZ" })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  test("editorial image loads successfully", async ({ page }) => {
    await page.goto("/");

    const wrapper = page.locator("[data-company-introduction-section] [data-mask-reveal]");
    await wrapper.scrollIntoViewIfNeeded();

    const img = wrapper.locator("img");
    await expect(img).toBeVisible();
    await img.evaluate((el: HTMLImageElement) =>
      el.complete
        ? Promise.resolve()
        : new Promise((resolve) => el.addEventListener("load", resolve, { once: true })),
    );
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });
});
