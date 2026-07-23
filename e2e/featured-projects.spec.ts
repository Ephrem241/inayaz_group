import { test, expect, type Locator } from "@playwright/test";
import { PROJECTS } from "../src/constants/projects";

async function waitForImageLoad(locator: Locator) {
  await locator.evaluate((el: HTMLImageElement) =>
    el.complete
      ? Promise.resolve()
      : new Promise((resolve) => el.addEventListener("load", resolve, { once: true })),
  );
}

const featured = PROJECTS.filter((p) => p.featured);
const secondary = PROJECTS.filter((p) => !p.featured);

test.describe("Featured Projects", () => {
  test("renders the portfolio heading", async ({ page }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", { name: "Proven Footprints. Future Landscapes." });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  for (const project of featured) {
    test(`featured panel renders correct metadata for ${project.name}`, async ({ page }) => {
      await page.goto("/");
      const panel = page.locator(`[data-project="${project.slug}"]`);
      await panel.scrollIntoViewIfNeeded();

      const metadata = panel.locator("dl");

      await expect(panel.getByRole("heading", { name: project.name })).toBeVisible();
      await expect(metadata.getByText(project.client)).toBeVisible();
      await expect(metadata.getByText(project.structure, { exact: true })).toBeVisible();

      if (project.location) {
        await expect(metadata.getByText(project.location)).toBeVisible();
      } else {
        await expect(metadata.getByText(/Location:/)).toHaveCount(0);
      }

      if (project.consultant) {
        await expect(metadata.getByText(project.consultant)).toBeVisible();
      } else {
        await expect(metadata.getByText(/Consultant:/)).toHaveCount(0);
      }

      const cta = panel.getByRole("link", { name: `View ${project.name} project` });
      await expect(cta).toHaveAttribute("href", `/projects/${project.slug}`);
    });
  }

  for (const project of secondary) {
    test(`secondary grid card renders for ${project.name}`, async ({ page }) => {
      await page.goto("/");
      const card = page.locator(`[data-project="${project.slug}"]`);
      await card.scrollIntoViewIfNeeded();

      await expect(card.getByRole("heading", { name: project.name })).toBeVisible();
      await expect(card.getByText(project.category)).toBeVisible();

      const cta = card.getByRole("link", { name: `View ${project.name} project` });
      await expect(cta).toHaveAttribute("href", `/projects/${project.slug}`);
    });
  }

  test("all 7 project images load successfully", async ({ page }) => {
    await page.goto("/");

    for (const project of PROJECTS) {
      const panel = page.locator(`[data-project="${project.slug}"]`);
      await panel.scrollIntoViewIfNeeded();

      const img = panel.locator("img");
      await expect(img).toBeVisible();
      await waitForImageLoad(img);
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });
});
