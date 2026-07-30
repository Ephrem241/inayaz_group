import { test, expect } from "@playwright/test";
import { SITE_URL } from "../src/constants/site";

// SITE_URL previously defaulted to a stray dev value (http://localhost:3333)
// that didn't even match the app's real local port, and nothing caught it
// leaking into metadata/sitemap/robots/JSON-LD output. These guards fail the
// build if that class of bug reappears, on any of the site's URL-emitting
// surfaces.
const FORBIDDEN_PATTERNS = [/localhost/i, /127\.0\.0\.1/];

function assertNoForbiddenUrls(body: string, context: string) {
  for (const pattern of FORBIDDEN_PATTERNS) {
    expect(body, `${context} must not contain ${pattern}`).not.toMatch(pattern);
  }
}

test.describe("SEO URL guards", () => {
  test("SITE_URL itself resolves to a real, non-localhost origin", () => {
    expect(SITE_URL).not.toMatch(/localhost|127\.0\.0\.1/);
    expect(SITE_URL).toMatch(/^https:\/\//);
    expect(SITE_URL.endsWith("/")).toBe(false);
  });

  test("homepage HTML contains no localhost/127.0.0.1 references", async ({ page }) => {
    await page.goto("/");
    assertNoForbiddenUrls(await page.content(), "homepage HTML");
  });

  test("homepage canonical, Open Graph, and JSON-LD URLs use the real site origin", async ({
    page,
  }) => {
    await page.goto("/");

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical?.replace(/\/$/, "")).toBe(SITE_URL);

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(ogUrl?.replace(/\/$/, "")).toBe(SITE_URL);

    const orgJsonLd = await page.locator('script[data-json-ld="organization"]').textContent();
    expect(orgJsonLd).toBeTruthy();
    expect(JSON.parse(orgJsonLd ?? "{}").url).toBe(SITE_URL);
  });

  test("project detail page URLs use the real site origin", async ({ page }) => {
    await page.goto("/projects/ameliyaz");
    assertNoForbiddenUrls(await page.content(), "project detail HTML");

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBe(`${SITE_URL}/projects/ameliyaz`);

    const projectJsonLd = await page.locator('script[data-json-ld="project"]').textContent();
    expect(projectJsonLd).toBeTruthy();
    expect(JSON.parse(projectJsonLd ?? "{}").url).toBe(`${SITE_URL}/projects/ameliyaz`);

    const breadcrumbJsonLd = await page.locator('script[data-json-ld="breadcrumbs"]').textContent();
    expect(breadcrumbJsonLd).toBeTruthy();
    for (const item of JSON.parse(breadcrumbJsonLd ?? "{}").itemListElement) {
      if (item.item) expect(item.item).toMatch(new RegExp(`^${SITE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
    }
  });

  test("sitemap.xml uses the real site origin for every entry", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBe(true);
    const body = await response.text();
    assertNoForbiddenUrls(body, "sitemap.xml");
    expect(body).toContain(`${SITE_URL}/`);
  });

  test("robots.txt points at the real site origin's sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBe(true);
    const body = await response.text();
    assertNoForbiddenUrls(body, "robots.txt");
    expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });
});
