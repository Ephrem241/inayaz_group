import { test, expect } from "@playwright/test";
import { DIVISIONS } from "../src/constants/divisions";
import { EXECUTION_SCOPE_STAGES } from "../src/constants/project-execution-scope";

const constructionDivision = DIVISIONS.find((d) => d.id === "construction-real-estate")!;

test.describe("Project detail page", () => {
  test("valid slug loads for real with a 200 status and correct dynamic title", async ({
    page,
  }) => {
    const response = await page.goto("/projects/ameliyaz");
    expect(response?.status()).toBe(200);
    await expect(page.getByText("Page Not Found")).toHaveCount(0);
    await expect(page).toHaveTitle("Ameliyaz | INAYAZ Group");
  });

  test("invalid slug returns a real 404 with the same UI as the static-route 404", async ({
    page,
  }) => {
    const response = await page.goto("/projects/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Page Not Found")).toBeVisible();
  });

  test("dl fields render conditionally based on real data", async ({ page }) => {
    await page.goto("/projects/ameliyaz");
    const ameliyazSection = page.locator("[data-project-detail-section]");
    await expect(ameliyazSection.getByText("Sarbet, Addis Ababa")).toBeVisible();
    await expect(ameliyazSection.getByText("KH Consulting")).toBeVisible();

    await page.goto("/projects/tes-realty");
    const tesRealtySection = page.locator("[data-project-detail-section]");
    await expect(tesRealtySection.getByText("Location:")).toHaveCount(0);

    await page.goto("/projects/gold-souq");
    const goldSouqSection = page.locator("[data-project-detail-section]");
    await expect(goldSouqSection.getByText("Consultant:")).toHaveCount(0);
  });

  test("status, completion year, built area, and units always render as pending, never fabricated", async ({
    page,
  }) => {
    for (const slug of ["ameliyaz", "tes-realty"]) {
      await page.goto(`/projects/${slug}`);
      const section = page.locator("[data-project-detail-section]");
      await expect(section.locator('[data-pending-field="status"]')).toHaveText(
        "Pending confirmation",
      );
      await expect(section.locator('[data-pending-field="completion-year"]')).toHaveText(
        "Pending confirmation",
      );
      await expect(section.locator('[data-pending-field="built-area"]')).toHaveText(
        "Pending confirmation",
      );
      await expect(section.locator('[data-pending-field="units"]')).toHaveText(
        "Pending confirmation",
      );
    }
  });

  test("Akoya sister-company note is present only when Akoya is the client", async ({
    page,
  }) => {
    await page.goto("/projects/ameliyaz");
    await expect(page.locator("[data-sister-company-note]")).toBeVisible();

    await page.goto("/projects/tes-realty");
    await expect(page.locator("[data-sister-company-note]")).toHaveCount(0);
  });

  test("all four execution scope stages render in order on every project page", async ({
    page,
  }) => {
    for (const slug of ["ameliyaz", "gold-souq"]) {
      await page.goto(`/projects/${slug}`);
      for (const stage of EXECUTION_SCOPE_STAGES) {
        const stageEl = page.locator(`[data-scope-stage="${stage.id}"]`);
        await stageEl.scrollIntoViewIfNeeded();
        await expect(stageEl.getByRole("heading", { name: stage.name, exact: true })).toBeVisible();
      }
    }
  });

  test("services delivered list matches the Construction and Real Estate division exactly", async ({
    page,
  }) => {
    await page.goto("/projects/ameliyaz");
    const section = page.locator("[data-project-services-section]");
    await section.scrollIntoViewIfNeeded();

    for (const item of constructionDivision.items) {
      await expect(section.getByText(item, { exact: true })).toBeVisible();
    }
  });

  test("gallery renders exactly the project's one real image", async ({ page }) => {
    await page.goto("/projects/ameliyaz");
    const gallery = page.locator("[data-project-gallery]");
    await gallery.scrollIntoViewIfNeeded();

    const image = gallery.locator("img");
    await expect(image).toHaveCount(1);
    // Content is served from Sanity's image CDN now, not a local filename —
    // alt text is the content-identity check that survives the swap.
    await expect(image).toHaveAttribute(
      "alt",
      "Silhouette of a tower crane and an in-progress high-rise structure at sunset",
    );
  });

  test("no Challenges or Solutions section exists anywhere on the page", async ({ page }) => {
    await page.goto("/projects/ameliyaz");
    await expect(page.getByText("Challenges", { exact: true })).toHaveCount(0);
    await expect(page.getByText("Solutions", { exact: true })).toHaveCount(0);
  });

  test("related projects render exactly three cards excluding the current project", async ({
    page,
  }) => {
    await page.goto("/projects/ameliyaz");
    const related = page.locator("[data-related-projects]");
    await related.scrollIntoViewIfNeeded();

    await expect(related.locator("[data-project]")).toHaveCount(3);
    await expect(related.locator('[data-project="ameliyaz"]')).toHaveCount(0);

    // Zero-same-propertyType-peer edge cases still return a full set of 3.
    await page.goto("/projects/gold-souq");
    await expect(page.locator('[data-related-projects] [data-project]')).toHaveCount(3);
  });

  test("closing CTA links to Contact", async ({ page }) => {
    await page.goto("/projects/ameliyaz");
    const section = page.locator("[data-project-cta-section]");
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByRole("link", { name: "Contact Us" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
