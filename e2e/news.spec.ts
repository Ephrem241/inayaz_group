import { test, expect } from "@playwright/test";
import { ARTICLES, FUTURE_TOPICS } from "../src/constants/articles";

test.describe("News listing page", () => {
  test("loads for real with a 200 status and correct title", async ({ page }) => {
    const response = await page.goto("/news");
    expect(response?.status()).toBe(200);
    await expect(page.getByText("Page Not Found")).toHaveCount(0);
    await expect(page).toHaveTitle("News & Insights | INAYAZ Group");
  });

  test("the seed article renders inside the featured panel, not the secondary grid", async ({
    page,
  }) => {
    await page.goto("/news");
    const article = ARTICLES[0];

    const featuredPanel = page.locator(`[data-featured-article="${article.slug}"]`);
    await expect(featuredPanel.getByRole("heading", { name: article.title })).toBeVisible();
    await expect(featuredPanel.getByText(article.excerpt)).toBeVisible();
    await expect(featuredPanel.getByText(`By ${article.author}`)).toBeVisible();
  });

  test("the secondary grid does not render when there are no non-featured articles", async ({
    page,
  }) => {
    await page.goto("/news");
    // No wrapper is rendered at all when there's nothing to show inside it —
    // consistent with this project's "omit, don't render an empty container"
    // convention (e.g. ProjectRelated on Group's non-construction divisions).
    await expect(page.locator("[data-news-grid]")).toHaveCount(0);
  });

  test("all future topics render as a static, non-interactive list", async ({ page }) => {
    await page.goto("/news");
    const topicsList = page.locator("[data-future-topics]");
    await topicsList.scrollIntoViewIfNeeded();

    for (const topic of FUTURE_TOPICS) {
      await expect(page.locator(`[data-future-topic="${topic}"]`)).toBeVisible();
    }
    await expect(topicsList.locator("a, button")).toHaveCount(0);
  });

  test("no filter controls exist on the page", async ({ page }) => {
    await page.goto("/news");
    await expect(page.locator("select")).toHaveCount(0);
  });

  test("closing CTA links to Contact", async ({ page }) => {
    await page.goto("/news");
    const section = page.locator("[data-news-cta-section]");
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByRole("link", { name: "Contact Us" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
