import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "/privacy", title: "Privacy Policy", heading: "Privacy Policy" },
  { path: "/terms", title: "Terms of Service", heading: "Terms of Service" },
  { path: "/cookies", title: "Cookie Policy", heading: "Cookie Policy" },
  { path: "/accessibility", title: "Accessibility Statement", heading: "Accessibility Statement" },
];

test.describe("Legal pages", () => {
  for (const { path, title, heading } of PAGES) {
    test(`${path} loads for real with a 200 status, correct title, H1, and breadcrumbs`, async ({
      page,
    }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByText("Page Not Found")).toHaveCount(0);
      await expect(page).toHaveTitle(`${title} | INAYAZ Group`);
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
      await expect(page.locator("[data-breadcrumbs]")).toBeVisible();
    });
  }

  test("cookie policy states no consent banner is needed and links to privacy and terms", async ({
    page,
  }) => {
    await page.goto("/cookies");
    const main = page.locator("#main-content");
    await expect(page.getByText(/no cookie-consent banner/i)).toBeVisible();
    await expect(main.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
    await expect(main.getByRole("link", { name: "Terms of Service" })).toHaveAttribute(
      "href",
      "/terms",
    );
  });

  test("privacy policy names the real data flow (Sanity + Resend), not generic boilerplate", async ({
    page,
  }) => {
    await page.goto("/privacy");
    const body = await page.locator("body").innerText();
    expect(body).toContain("Sanity");
    expect(body).toContain("Resend");
  });

  test("accessibility statement links to a real contact email for reporting issues", async ({
    page,
  }) => {
    await page.goto("/accessibility");
    await expect(
      page.getByRole("link", { name: "info@inayazgroup.com" }).first(),
    ).toHaveAttribute("href", "mailto:info@inayazgroup.com");
  });

  test("footer links to all four legal pages", async ({ page }) => {
    await page.goto("/");
    const legalNav = page.getByRole("navigation", { name: "Legal" });

    const footerLinks = [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ];
    for (const { label, href } of footerLinks) {
      await expect(legalNav.getByRole("link", { name: label, exact: true })).toHaveAttribute(
        "href",
        href,
      );
    }
  });
});
