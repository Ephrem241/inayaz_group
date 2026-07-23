import { test, expect } from "@playwright/test";
import { ARTICLES, getArticleBySlug } from "../src/constants/articles";
import { SITE_URL } from "../src/constants/site";

const article = ARTICLES[0];

test.describe("Article detail page", () => {
  test("valid slug loads for real with a 200 status and correct dynamic title", async ({
    page,
  }) => {
    const response = await page.goto(`/news/${article.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByText("Page Not Found")).toHaveCount(0);
    await expect(page).toHaveTitle(`${article.title} | INAYAZ Group`);
  });

  test("invalid slug returns a real 404 with the same UI as the static-route 404", async ({
    page,
  }) => {
    const response = await page.goto("/news/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Page Not Found")).toBeVisible();
  });

  test("heading and full body paragraph render verbatim", async ({ page }) => {
    await page.goto(`/news/${article.slug}`);

    for (const block of article.body) {
      if (block.type === "heading") {
        await expect(page.getByRole("heading", { name: block.text })).toBeVisible();
      } else {
        await expect(page.getByText(block.text)).toBeVisible();
      }
    }
  });

  test("byline shows title-cased INAYAZ", async ({ page }) => {
    await page.goto(`/news/${article.slug}`);
    await expect(page.getByText("By INAYAZ", { exact: false })).toBeVisible();
  });

  test("share links point to the correct platforms with the encoded article URL", async ({
    page,
  }) => {
    await page.goto(`/news/${article.slug}`);
    const encodedUrl = encodeURIComponent(`${SITE_URL}/news/${article.slug}`);

    const linkedin = page.getByRole("link", { name: "Share on LinkedIn" });
    await expect(linkedin).toHaveAttribute(
      "href",
      new RegExp(`linkedin\\.com/sharing/share-offsite.*${encodedUrl}`),
    );
    await expect(linkedin).toHaveAttribute("target", "_blank");
    await expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");

    const facebook = page.getByRole("link", { name: "Share on Facebook" });
    await expect(facebook).toHaveAttribute(
      "href",
      new RegExp(`facebook\\.com/sharer/sharer\\.php.*${encodedUrl}`),
    );
    await expect(facebook).toHaveAttribute("target", "_blank");
    await expect(facebook).toHaveAttribute("rel", "noopener noreferrer");

    const telegram = page.getByRole("link", { name: "Share on Telegram" });
    await expect(telegram).toHaveAttribute(
      "href",
      new RegExp(`t\\.me/share/url.*${encodedUrl}`),
    );
    await expect(telegram).toHaveAttribute("target", "_blank");
    await expect(telegram).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("JSON-LD structured data is valid and honest", async ({ page }) => {
    await page.goto(`/news/${article.slug}`);

    const jsonLdText = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLdText).toBeTruthy();

    const jsonLd = JSON.parse(jsonLdText!);
    expect(jsonLd.headline).toBe(article.title);
    expect(jsonLd.datePublished).toBe(article.publishedAt);
    expect(jsonLd.author).toEqual({ "@type": "Organization", name: "INAYAZ Group" });
    expect(jsonLd).not.toHaveProperty("dateModified");
    expect(jsonLd).not.toHaveProperty("wordCount");
  });

  test("no Related Articles section exists", async ({ page }) => {
    await page.goto(`/news/${article.slug}`);
    await expect(page.getByText("Related Articles", { exact: false })).toHaveCount(0);
    await expect(page.locator("[data-related-articles]")).toHaveCount(0);
  });

  test("no filter controls exist on the page", async ({ page }) => {
    await page.goto(`/news/${article.slug}`);
    await expect(page.locator("select")).toHaveCount(0);
  });

  test("closing CTA links to Contact", async ({ page }) => {
    await page.goto(`/news/${article.slug}`);
    const section = page.locator("[data-news-cta-section]");
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByRole("link", { name: "Contact Us" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});

// Sanity check that the helper used by the route itself agrees with the
// fixture used throughout this file.
test("getArticleBySlug resolves the seed article", () => {
  expect(getArticleBySlug(article.slug)?.slug).toBe(article.slug);
});
