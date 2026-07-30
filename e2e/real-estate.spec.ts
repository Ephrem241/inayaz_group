import { test, expect } from "@playwright/test";
import { PROJECTS } from "../src/constants/projects";

test.describe("Real Estate listing page", () => {
  test("loads for real with a 200 status and correct title", async ({ page }) => {
    const response = await page.goto("/real-estate");
    expect(response?.status()).toBe(200);
    await expect(page.getByText("Page Not Found")).toHaveCount(0);
    await expect(page).toHaveTitle("Real Estate Developments in Ethiopia | INAYAZ Group");
  });

  test("intro renders an H1 with breadcrumbs", async ({ page }) => {
    await page.goto("/real-estate");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("[data-breadcrumbs]")).toBeVisible();
  });

  test("all seven developments render by default", async ({ page }) => {
    await page.goto("/real-estate");
    await expect(page.locator("[data-real-estate-card]")).toHaveCount(7);
  });

  test("Property Type filter narrows to Residential developments only", async ({ page }) => {
    await page.goto("/real-estate");
    await page.getByLabel("Property Type").selectOption("Residential");

    const residentialCount = PROJECTS.filter((p) => p.propertyType === "Residential").length;
    await expect(page.locator("[data-real-estate-card]")).toHaveCount(residentialCount);
  });

  test("Location filter narrows to a single matching development", async ({ page }) => {
    await page.goto("/real-estate");
    await page.getByLabel("Location").selectOption("Sarbet, Addis Ababa");

    await expect(page.locator("[data-real-estate-card]")).toHaveCount(1);
    await expect(page.locator('[data-real-estate-card="ameliyaz"]')).toBeVisible();
  });

  test("no Status filter renders while no development has a confirmed status", async ({
    page,
  }) => {
    // Derived dynamically from real data (unlike Property Type) — with zero
    // confirmed statuses today, the control has nothing honest to offer and
    // is omitted entirely rather than showing options that always return
    // empty results.
    await page.goto("/real-estate");
    await expect(page.getByLabel("Status")).toHaveCount(0);
  });

  test("combined filters with zero matches show the empty state, which Clear Filters resets", async ({
    page,
  }) => {
    await page.goto("/real-estate");
    await page.getByLabel("Property Type").selectOption("Commercial");
    await page.getByLabel("Location").selectOption("Sarbet, Addis Ababa");

    await expect(page.locator("[data-real-estate-empty-state]")).toBeVisible();
    await page.getByRole("button", { name: "Clear Filters" }).click();
    await expect(page.locator("[data-real-estate-card]")).toHaveCount(7);
  });

  test("cards link to the matching development's detail page", async ({ page }) => {
    await page.goto("/real-estate");
    const card = page.locator('[data-real-estate-card="ameliyaz"]');
    await expect(card.getByRole("link", { name: "Explore Ameliyaz" })).toHaveAttribute(
      "href",
      "/real-estate/ameliyaz",
    );
  });

  test("closing CTA links to Contact with a real-estate interest param", async ({ page }) => {
    await page.goto("/real-estate");
    const section = page.locator("[data-real-estate-cta-section]");
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByRole("link", { name: "Request Property Details" })).toHaveAttribute(
      "href",
      "/contact?interest=real-estate",
    );
  });
});

test.describe("Real Estate detail page", () => {
  test("valid slug loads for real with a 200 status and correct dynamic title", async ({
    page,
  }) => {
    const response = await page.goto("/real-estate/ameliyaz");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Ameliyaz | Real Estate | INAYAZ Group");
  });

  test("invalid slug returns a real 404, not a soft 404", async ({ page }) => {
    const response = await page.goto("/real-estate/not-a-real-development");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Page Not Found")).toBeVisible();
  });

  test("hero renders name, property type, and description; omits unconfirmed fields", async ({
    page,
  }) => {
    await page.goto("/real-estate/ameliyaz");
    const section = page.locator("[data-real-estate-detail-section]");

    await expect(section.getByRole("heading", { name: "Ameliyaz", level: 1 })).toBeVisible();
    await expect(section.getByText("Mixed-Use", { exact: true })).toBeVisible();
    await expect(section.locator('[data-field="status"]')).toHaveCount(0);
    await expect(section.locator('[data-field="completion-year"]')).toHaveCount(0);
  });

  test("pricing always shows something — a real note or the honest fallback", async ({
    page,
  }) => {
    await page.goto("/real-estate/ameliyaz");
    const details = page.locator("[data-real-estate-details-section]");
    await details.scrollIntoViewIfNeeded();
    await expect(details.getByText("Contact for pricing")).toBeVisible();
  });

  test("unconfirmed unit types, amenities, and brochure are omitted, never fabricated", async ({
    page,
  }) => {
    await page.goto("/real-estate/ameliyaz");
    const details = page.locator("[data-real-estate-details-section]");
    await details.scrollIntoViewIfNeeded();

    await expect(details.getByText("Unit Types")).toHaveCount(0);
    await expect(details.getByText("Amenities")).toHaveCount(0);
    await expect(details.getByRole("link", { name: "Download Brochure" })).toHaveCount(0);
  });

  test("related developments render exactly three cards excluding the current one", async ({
    page,
  }) => {
    await page.goto("/real-estate/ameliyaz");
    const related = page.locator("[data-related-developments]");
    await related.scrollIntoViewIfNeeded();

    await expect(related.locator("[data-real-estate-card]")).toHaveCount(3);
    await expect(related.locator('[data-real-estate-card="ameliyaz"]')).toHaveCount(0);
  });

  test("closing CTA links to Contact with real-estate interest and development params", async ({
    page,
  }) => {
    await page.goto("/real-estate/ameliyaz");
    const section = page.locator("[data-real-estate-detail-cta-section]");
    await section.scrollIntoViewIfNeeded();

    await expect(
      section.getByRole("link", { name: "Schedule a Property Visit" }),
    ).toHaveAttribute("href", "/contact?interest=real-estate&development=ameliyaz");
  });

  test("valid JSON-LD structured data points at the /real-estate URL, not /projects", async ({
    page,
  }) => {
    await page.goto("/real-estate/ameliyaz");
    const jsonLd = await page.locator('script[data-json-ld="project"]').textContent();
    expect(jsonLd).toBeTruthy();
    const parsed = JSON.parse(jsonLd ?? "{}");
    expect(parsed.url).toContain("/real-estate/ameliyaz");
  });
});
