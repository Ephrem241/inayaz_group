import { test, expect } from "@playwright/test";

test.describe("Contact", () => {
  test("/contact loads for real with a 200 status and correct title", async ({ page }) => {
    const response = await page.goto("/contact");
    expect(response?.status()).toBe(200);
    await expect(page.getByText("Page Not Found")).toHaveCount(0);
    await expect(page).toHaveTitle("Contact | INAYAZ Group");
    await expect(page.locator("[data-contact-section]")).toBeVisible();
  });

  test("all fields render with correct types and the submit button is present", async ({
    page,
  }) => {
    await page.goto("/");
    const section = page.locator("[data-contact-section]");
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByLabel("Full name")).toHaveAttribute("type", "text");
    await expect(section.getByLabel("Company name")).toHaveAttribute("type", "text");
    await expect(section.getByLabel("Email")).toHaveAttribute("type", "email");
    await expect(section.getByLabel("Phone")).toHaveAttribute("type", "tel");
    await expect(section.getByLabel("Service interest")).toHaveJSProperty("tagName", "SELECT");
    await expect(section.getByLabel("Project type")).toHaveJSProperty("tagName", "SELECT");
    await expect(section.getByLabel("Estimated budget")).toHaveAttribute("type", "text");
    await expect(section.getByLabel("Project location")).toHaveAttribute("type", "text");
    await expect(section.getByLabel("Message")).toHaveJSProperty("tagName", "TEXTAREA");
    await expect(section.locator("#consent")).toHaveAttribute("type", "checkbox");
    await expect(section.getByRole("button", { name: "Send Message" })).toBeVisible();
  });

  test("submitting with required fields empty shows inline errors and no success panel", async ({
    page,
  }) => {
    await page.goto("/");
    const section = page.locator("[data-contact-section]");
    await section.scrollIntoViewIfNeeded();

    await section.getByRole("button", { name: "Send Message" }).click();

    await expect(section.getByText("Enter your full name")).toBeVisible();
    await expect(section.getByText("Enter a valid email address")).toBeVisible();
    await expect(section.getByText("Tell us a bit more (at least 10 characters)")).toBeVisible();
    await expect(section.getByText("Consent is required to submit this form")).toBeVisible();
    await expect(section.locator("[data-contact-form-success]")).toHaveCount(0);
  });

  test("consent left unchecked blocks submission even with other required fields valid", async ({
    page,
  }) => {
    await page.goto("/");
    const section = page.locator("[data-contact-section]");
    await section.scrollIntoViewIfNeeded();

    await section.getByLabel("Full name").fill("Test User");
    await section.getByLabel("Email").fill("test.user@example.com");
    await section.getByLabel("Message").fill("This is a test inquiry message.");
    await section.getByRole("button", { name: "Send Message" }).click();

    await expect(section.getByText("Consent is required to submit this form")).toBeVisible();
    await expect(section.locator("[data-contact-form-success]")).toHaveCount(0);
  });

  test("a valid submission replaces the form with a success panel", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("[data-contact-section]");
    await section.scrollIntoViewIfNeeded();

    await section.getByLabel("Full name").fill("Test User");
    await section.getByLabel("Email").fill("test.user@example.com");
    await section.getByLabel("Message").fill("This is a test inquiry message.");
    await section.locator("#consent").check();
    await section.getByRole("button", { name: "Send Message" }).click();

    const success = section.locator("[data-contact-form-success]");
    await expect(success).toBeVisible();
    await expect(success.getByText("Thank you — your message has been submitted.")).toBeVisible();
    await expect(section.locator("[data-contact-form]")).toHaveCount(0);

    await success.getByRole("button", { name: "Send another message" }).click();
    await expect(section.locator("[data-contact-form]")).toBeVisible();
  });

  test("honeypot field is attached to the DOM but not visible to real users", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("[data-contact-section]");
    await section.scrollIntoViewIfNeeded();

    const honeypot = section.locator("#contact-honeypot");
    await expect(honeypot).toBeAttached();

    // Playwright's toBeVisible() only checks display/visibility/bounding-box
    // size, not screen position or opacity — this field is intentionally
    // rendered off-screen (not display:none, which naive bots often skip),
    // so assert its actual position and opacity directly instead.
    const box = await honeypot.boundingBox();
    expect(box?.x).toBeLessThan(0);

    const opacity = await honeypot.evaluate(
      (el) => getComputedStyle(el.closest("div")!).opacity,
    );
    expect(opacity).toBe("0");
  });
});
