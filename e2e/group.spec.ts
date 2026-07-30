import { test, expect } from "@playwright/test";
import { NETWORK_ENTITIES } from "../src/constants/networks";
import { DIVISIONS } from "../src/constants/divisions";

test.describe("Our Group page", () => {
  test("loads for real with a 200 status and correct title", async ({ page }) => {
    const response = await page.goto("/group");
    expect(response?.status()).toBe(200);
    await expect(page.getByText("Page Not Found")).toHaveCount(0);
    await expect(page).toHaveTitle("Our Group | INAYAZ Group");
  });

  test("intro renders an H1", async ({ page }) => {
    await page.goto("/group");
    const section = page.locator("[data-group-intro-section]");
    await expect(section.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("all network entities render, Akoya's facts and external link are correct", async ({
    page,
  }) => {
    await page.goto("/group");

    for (const entity of NETWORK_ENTITIES) {
      const panel = page.locator(`[data-network="${entity.id}"]`);
      await panel.scrollIntoViewIfNeeded();
      await expect(panel.getByText(entity.name, { exact: true })).toBeVisible();

      if (entity.facts) {
        for (const fact of entity.facts) {
          await expect(panel.getByText(fact, { exact: true })).toBeVisible();
        }
      }
    }

    const akoyaLink = page
      .locator('[data-network="akoya-properties"]')
      .getByRole("link", { name: /Visit akoyarealproperty\.com/ });
    await expect(akoyaLink).toHaveAttribute("href", "https://akoyarealproperty.com/");
    await expect(akoyaLink).toHaveAttribute("target", "_blank");
    const rel = await akoyaLink.getAttribute("rel");
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
  });

  test("exactly four network entities render and none carry a fabricated logo graphic", async ({
    page,
  }) => {
    await page.goto("/group");

    await expect(page.locator("[data-network]")).toHaveCount(4);
    for (const entity of NETWORK_ENTITIES.filter((e) => e.type === "sub-brand")) {
      const panel = page.locator(`[data-network="${entity.id}"]`);
      await expect(panel.locator("img, svg")).toHaveCount(0);
    }
  });

  test("all six divisions render with their services/products list", async ({ page }) => {
    await page.goto("/group");

    for (const division of DIVISIONS) {
      const panel = page.locator(`[data-division="${division.id}"]`);
      await panel.scrollIntoViewIfNeeded();
      await expect(panel.getByRole("heading", { name: division.name, exact: true })).toBeVisible();
      await expect(panel.getByText(division.listLabel, { exact: true })).toBeVisible();
    }
  });

  test("only Construction and Real Estate shows related projects", async ({ page }) => {
    await page.goto("/group");

    const constructionRelated = page.locator(
      '[data-division="construction-real-estate"] [data-related-projects]',
    );
    await constructionRelated.scrollIntoViewIfNeeded();
    await expect(constructionRelated).toBeVisible();
    await expect(constructionRelated.getByText("Ameliyaz", { exact: true })).toBeVisible();
    await expect(constructionRelated.getByText("Gold Souq", { exact: true })).toBeVisible();
    await expect(constructionRelated.getByText("Akoya Ozone", { exact: true })).toBeVisible();

    const exportRelated = page.locator('[data-division="export-trade"] [data-related-projects]');
    await expect(exportRelated).toHaveCount(0);
  });

  test("every division has an intent-based CTA linking to Contact with its interest param", async ({
    page,
  }) => {
    // Phase E replaced the generic "Discuss a Project" text (same for every
    // division) with intent-based copy per division, each pre-selecting its
    // own service interest via a query param.
    await page.goto("/group");

    const divisionIds = [
      "construction-real-estate",
      "export-trade",
      "import",
      "manufacturing",
      "tour-operation-travel",
      "machinery-equipment-rental",
    ];
    for (const id of divisionIds) {
      const link = page.locator(`[data-division="${id}"] a[href^="/contact?interest="]`);
      await expect(link).toHaveAttribute("href", `/contact?interest=${id}`);
    }
  });

  test("closing CTA links to Contact", async ({ page }) => {
    await page.goto("/group");
    const section = page.locator("[data-group-cta-section]");
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByRole("link", { name: "Discuss a Project" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
