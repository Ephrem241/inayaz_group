import { test, expect, type Page } from "@playwright/test";

const PAGES = [
  "/",
  "/about",
  "/group",
  "/projects",
  "/projects/ameliyaz",
  "/real-estate",
  "/real-estate/ameliyaz",
  "/services",
  "/sustainability",
  "/news",
  "/news/building-ethiopias-future-through-responsible-construction",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/accessibility",
];

// Vercel Analytics' script is served via a rewrite that only exists on
// Vercel's actual edge infrastructure (/_vercel/insights/script.js) — it
// always 404s under a local `next build && next start`, exactly what
// Playwright's webServer runs, regardless of application code, and resolves
// correctly once genuinely deployed to Vercel. Not a real defect.
//
// Tracked at the network-response level (reliable, real URLs) rather than
// via console message text — Chrome logs a *generic*, URL-less "Failed to
// load resource: ... 404" console message for any failed resource load
// alongside a second, resource-specific message, so text-matching the
// console API alone can't reliably attribute a generic message to this one
// known cause. Network-level tracking sidesteps that ambiguity entirely.
function isKnownEnvironmentArtifact(url: string): boolean {
  return url.includes("_vercel/insights/script.js");
}

function collectUnexpectedFailures(page: Page): { networkErrors: string[]; jsErrors: string[] } {
  const networkErrors: string[] = [];
  const jsErrors: string[] = [];

  page.on("response", (response) => {
    if (response.status() >= 400 && !isKnownEnvironmentArtifact(response.url())) {
      networkErrors.push(`${response.status()} ${response.url()}`);
    }
  });
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    // Covers both console messages Chrome emits for the one known failed
    // request (see comment above) — anything else is a real JS/runtime error.
    if (message.text().includes("Failed to load resource") || message.text().includes("_vercel/insights")) {
      return;
    }
    jsErrors.push(message.text());
  });
  page.on("pageerror", (error) => jsErrors.push(error.message));

  return { networkErrors, jsErrors };
}

test.describe("No console errors on any public page", () => {
  for (const path of PAGES) {
    test(`${path} produces zero unexpected network failures or JS errors`, async ({ page }) => {
      const { networkErrors, jsErrors } = collectUnexpectedFailures(page);
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      expect(networkErrors, `unexpected failed requests on ${path}`).toEqual([]);
      expect(jsErrors, `JS/console errors on ${path}`).toEqual([]);
    });
  }
});
