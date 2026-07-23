import { test, expect } from "@playwright/test";
import { NAV_ITEMS, PRIMARY_CTA } from "../src/constants/navigation";

test.describe("Mobile navigation", () => {
  test("hamburger opens a full-screen dialog with all nav items", async ({ page }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", { name: "Open menu" });
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
    await expect(dialog).toBeVisible();

    for (const item of NAV_ITEMS) {
      await expect(dialog.getByRole("link", { name: item.label, exact: true })).toBeVisible();
    }
    await expect(dialog.getByRole("link", { name: PRIMARY_CTA.label })).toBeVisible();
  });

  test("Escape closes the dialog and returns focus to the trigger", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open menu" });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("Tab cycling never focuses interactive content behind the dialog", async ({ page }) => {
    // Native <dialog> makes the rest of the document inert rather than
    // implementing an explicit cycle: tabbing past the last focusable element
    // rests one step on the (non-interactive) <body> before wrapping back to
    // the dialog's first element on the next Tab. That's correct, spec-compliant
    // behavior — the real guarantee we care about is that focus never lands on
    // an *interactive* element outside the dialog (i.e. content behind the modal).
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();

    const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
    await expect(dialog).toBeVisible();

    const focusableCount = await dialog.locator("a, button").count();

    for (let i = 0; i < focusableCount + 4; i++) {
      await page.keyboard.press("Tab");
      const focusedInteractiveElementOutsideDialog = await page.evaluate(() => {
        const dialogEl = document.querySelector('dialog[aria-label="Mobile navigation"]');
        const active = document.activeElement;
        if (!active || dialogEl?.contains(active)) return false;
        return active.matches("a, button, input, select, textarea, [tabindex]");
      });
      expect(focusedInteractiveElementOutsideDialog).toBe(false);
    }
  });

  test("clicking a nav link closes the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();

    const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
    await dialog.getByRole("link", { name: "About", exact: true }).click();

    await expect(dialog).toBeHidden();
  });
});
