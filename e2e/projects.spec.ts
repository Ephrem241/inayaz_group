import { test, expect } from "@playwright/test";
import { PROJECTS } from "../src/constants/projects";

test.describe("Projects listing page", () => {
  test("loads for real with a 200 status and correct title", async ({ page }) => {
    const response = await page.goto("/projects");
    expect(response?.status()).toBe(200);
    await expect(page.getByText("Page Not Found")).toHaveCount(0);
    await expect(page).toHaveTitle("Projects | INAYAZ Group");
  });

  test("intro renders an H1", async ({ page }) => {
    await page.goto("/projects");
    const section = page.locator("[data-projects-intro-section]");
    await expect(section.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("all seven projects render by default, featured first", async ({ page }) => {
    await page.goto("/projects");

    await expect(page.locator("[data-project]")).toHaveCount(7);

    const slugsInOrder = await page.locator("[data-project]").evaluateAll((elements) =>
      elements.map((el) => el.getAttribute("data-project")),
    );
    expect(slugsInOrder.slice(0, 3).sort()).toEqual(
      ["ameliyaz", "gold-souq", "akoya-ozone"].sort(),
    );
  });

  test("Property Type filter narrows to Residential projects only", async ({ page }) => {
    await page.goto("/projects");

    await page.getByLabel("Property Type").selectOption("Residential");

    await expect(page.locator("[data-project]")).toHaveCount(5);
    await expect(page.locator('[data-project="ameliyaz"]')).toHaveCount(0);
    await expect(page.locator('[data-project="gold-souq"]')).toHaveCount(0);
  });

  test("Location filter narrows to a single matching project", async ({ page }) => {
    await page.goto("/projects");

    await page.getByLabel("Location").selectOption("Sarbet, Addis Ababa");

    await expect(page.locator("[data-project]")).toHaveCount(1);
    await expect(page.locator('[data-project="ameliyaz"]')).toBeVisible();
  });

  test("combined filters with zero matches show the empty state, which Clear Filters resets", async ({
    page,
  }) => {
    await page.goto("/projects");

    await page.getByLabel("Location").selectOption("Sarbet, Addis Ababa");
    await page.getByLabel("Property Type").selectOption("Residential");

    await expect(page.locator("[data-projects-empty-state]")).toBeVisible();
    await expect(page.locator("[data-project]")).toHaveCount(0);

    await page.getByRole("button", { name: "Clear Filters" }).click();

    await expect(page.locator("[data-projects-empty-state]")).toHaveCount(0);
    await expect(page.locator("[data-project]")).toHaveCount(7);
  });

  test("A-Z sort orders projects alphabetically", async ({ page }) => {
    await page.goto("/projects");

    await page.getByLabel("Sort By").selectOption("az");

    const firstSlug = await page.locator("[data-project]").first().getAttribute("data-project");
    expect(firstSlug).toBe("akoya-ozone");
  });

  test("cards show location when present, status pending note always, and correct CTA links", async ({
    page,
  }) => {
    await page.goto("/projects");

    const ameliyaz = page.locator('[data-project="ameliyaz"]');
    await expect(ameliyaz.getByText("Sarbet, Addis Ababa", { exact: true })).toBeVisible();

    const twinz = page.locator('[data-project="twinz"]');
    await expect(twinz.getByText("Sarbet, Addis Ababa")).toHaveCount(0);
    await expect(twinz.getByText("4 Kilo district, Addis Ababa")).toHaveCount(0);

    await expect(page.locator("[data-pending-note]")).toHaveCount(7);

    for (const project of PROJECTS) {
      const card = page.locator(`[data-project="${project.slug}"]`);
      await expect(card.getByRole("link", { name: `View ${project.name} project` })).toHaveAttribute(
        "href",
        `/projects/${project.slug}`,
      );
    }
  });

  test("no Status or Year filter/sort controls exist", async ({ page }) => {
    await page.goto("/projects");

    await expect(page.getByLabel("Status")).toHaveCount(0);
    await expect(page.getByLabel("Year")).toHaveCount(0);

    const sortOptions = await page.getByLabel("Sort By").locator("option").allTextContents();
    expect(sortOptions).toEqual(["Featured", "A–Z"]);
  });
});
