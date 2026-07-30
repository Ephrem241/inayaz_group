import { test, expect } from "@playwright/test";

// Lives on /about (not the homepage) since Phase C's homepage restructure.
// Only GC-1 is seeded as "published" — CBE and COOP are seeded "draft" and
// must never appear publicly until real evidence is uploaded and published
// in Sanity (explicit decision: hide entirely, not a pending caveat).
test.describe("Recognition and Trust (About page)", () => {
  test("only the published item (GC-1) renders, with its verbatim description", async ({
    page,
  }) => {
    await page.goto("/about");

    await expect(page.locator("[data-recognition]")).toHaveCount(1);
    const panel = page.locator("[data-recognition]").first();
    await panel.scrollIntoViewIfNeeded();
    await expect(panel.getByText("Category 1 General Contractor (GC-1)", { exact: true })).toBeVisible();
    await expect(
      panel.getByText(
        "As a Category 1 General Contractor, INAYAZ brings proven technical knowledge, professional leadership, and construction capability to every project.",
        { exact: true },
      ),
    ).toBeVisible();
  });

  test("unverified institutions (CBE, COOP) never appear anywhere on the page", async ({
    page,
  }) => {
    await page.goto("/about");
    const bodyText = await page.locator("body").innerText();

    expect(bodyText).not.toContain("Commercial Bank of Ethiopia");
    expect(bodyText).not.toContain("COOP");
  });

  test("the credentials section itself carries no pending-confirmation caveat", async ({
    page,
  }) => {
    // Scoped to the recognition panel specifically — Leadership has its own,
    // unrelated honest pending note elsewhere on this page, which is out of
    // scope for this section.
    await page.goto("/about");
    const panel = page.locator("[data-recognition]").first();
    await panel.scrollIntoViewIfNeeded();
    const panelText = await panel.innerText();

    expect(panelText).not.toMatch(/pending confirmation/i);
  });

  test("with fewer than two published items, the section uses a neutral heading", async ({
    page,
  }) => {
    await page.goto("/about");

    await expect(
      page.getByRole("heading", { name: "Credentials and Institutional Relationships" }),
    ).toBeVisible();
  });

  test("no certificate download link or unapproved logo graphic is published", async ({
    page,
  }) => {
    await page.goto("/about");

    await expect(
      page.locator("[data-recognition] a, [data-recognition] img, [data-recognition] svg"),
    ).toHaveCount(0);
    await expect(page.locator('a[href*=".pdf"]')).toHaveCount(0);
  });
});
