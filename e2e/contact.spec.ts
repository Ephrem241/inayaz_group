import { test, expect } from "@playwright/test";

test.describe("Contact", () => {
  test("/contact loads for real with a 200 status and correct title", async ({ page }) => {
    const response = await page.goto("/contact");
    expect(response?.status()).toBe(200);
    await expect(page.getByText("Page Not Found")).toHaveCount(0);
    await expect(page).toHaveTitle("Contact | INAYAZ Group");
    await expect(page.locator("[data-contact-section]")).toBeVisible();
  });

  test("core fields render with correct types, required marks, and the submit button", async ({
    page,
  }) => {
    await page.goto("/contact");
    const section = page.locator("[data-contact-section]");
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByLabel("Full name")).toHaveAttribute("type", "text");
    await expect(section.getByLabel("Company name")).toHaveAttribute("type", "text");
    await expect(section.getByLabel("Email")).toHaveAttribute("type", "email");
    await expect(section.getByLabel("Phone")).toHaveAttribute("type", "tel");
    await expect(section.getByLabel("Phone")).toHaveAttribute("placeholder", "+251 9XX XXX XXX");
    await expect(section.getByLabel("Service interest")).toHaveJSProperty("tagName", "SELECT");
    await expect(section.getByLabel("Message")).toHaveJSProperty("tagName", "TEXTAREA");
    await expect(section.locator("#consent")).toHaveAttribute("type", "checkbox");
    await expect(section.getByRole("button", { name: "Send Message" })).toBeVisible();

    // Required-field indicators (visible asterisk + accessible text) on the
    // three genuinely required fields plus consent.
    const fullNameLabel = section.locator('label[for="fullName"]');
    await expect(fullNameLabel).toContainText("*");
    await expect(fullNameLabel.getByText("(required)")).toHaveCount(1);
  });

  test("no service-specific fields render until a service interest is selected", async ({
    page,
  }) => {
    await page.goto("/contact");
    const section = page.locator("[data-contact-section]");
    await section.scrollIntoViewIfNeeded();

    await expect(section.locator('[data-field-group="construction"]')).toHaveCount(0);
    await expect(section.locator('[data-field-group="real-estate"]')).toHaveCount(0);
    await expect(section.locator('[data-field-group="rental"]')).toHaveCount(0);
  });

  test("selecting Construction and Real Estate reveals project type, location, budget, and start date", async ({
    page,
  }) => {
    await page.goto("/contact");
    const section = page.locator("[data-contact-section]");
    await section.scrollIntoViewIfNeeded();

    await section.getByLabel("Service interest").selectOption("construction-real-estate");
    const group = section.locator('[data-field-group="construction"]');
    await expect(group.getByLabel("Project type")).toHaveJSProperty("tagName", "SELECT");
    await expect(group.getByLabel("Project location")).toHaveAttribute("type", "text");
    await expect(group.getByLabel("Estimated budget")).toHaveAttribute("type", "text");
    await expect(group.getByLabel("Target start date")).toHaveAttribute("type", "date");
  });

  test("selecting Real Estate reveals development, unit type, visit date, and contact method", async ({
    page,
  }) => {
    await page.goto("/contact");
    const section = page.locator("[data-contact-section]");
    await section.scrollIntoViewIfNeeded();

    await section.getByLabel("Service interest").selectOption("real-estate");
    const group = section.locator('[data-field-group="real-estate"]');
    await expect(group.getByLabel("Development")).toHaveAttribute("type", "text");
    await expect(group.getByLabel("Preferred unit type")).toHaveAttribute("type", "text");
    await expect(group.getByLabel("Preferred visit date")).toHaveAttribute("type", "date");
    await expect(group.getByLabel("Preferred contact method")).toHaveJSProperty("tagName", "SELECT");
  });

  test("selecting Machinery and Equipment Rental reveals equipment, period, location, and date", async ({
    page,
  }) => {
    await page.goto("/contact");
    const section = page.locator("[data-contact-section]");
    await section.scrollIntoViewIfNeeded();

    await section.getByLabel("Service interest").selectOption("machinery-equipment-rental");
    const group = section.locator('[data-field-group="rental"]');
    await expect(group.getByLabel("Equipment type")).toHaveAttribute("type", "text");
    await expect(group.getByLabel("Rental period")).toHaveAttribute("type", "text");
    await expect(group.getByLabel("Location")).toHaveAttribute("type", "text");
    await expect(group.getByLabel("Required date")).toHaveAttribute("type", "date");
  });

  test("visiting /contact?interest=real-estate&development=ameliyaz pre-fills the real-estate group", async ({
    page,
  }) => {
    await page.goto("/contact?interest=real-estate&development=ameliyaz");
    const section = page.locator("[data-contact-section]");
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByLabel("Service interest")).toHaveValue("real-estate");
    await expect(section.locator('[data-field-group="real-estate"]')).toBeVisible();
    await expect(section.getByLabel("Development")).toHaveValue("ameliyaz");
  });

  test("submitting with required fields empty shows inline errors and an accessible validation summary", async ({
    page,
  }) => {
    await page.goto("/contact");
    const section = page.locator("[data-contact-section]");
    await section.scrollIntoViewIfNeeded();

    await section.getByRole("button", { name: "Send Message" }).click();

    // Inline, field-scoped errors.
    await expect(section.locator("#fullName-error")).toHaveText("Enter your full name");
    await expect(section.locator("#email-error")).toHaveText("Enter a valid email address");
    await expect(section.locator("#message-error")).toHaveText(
      "Tell us a bit more (at least 10 characters)",
    );
    await expect(section.locator("#consent-error")).toHaveText(
      "Consent is required to submit this form",
    );

    // Accessible summary — a focusable alert region linking to each field.
    const summary = section.locator("[data-validation-summary]");
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(summary.getByRole("link", { name: "Enter your full name" })).toHaveAttribute(
      "href",
      "#fullName",
    );

    await expect(section.locator("[data-contact-form-success]")).toHaveCount(0);
  });

  test("consent left unchecked blocks submission even with other required fields valid", async ({
    page,
  }) => {
    await page.goto("/contact");
    const section = page.locator("[data-contact-section]");
    await section.scrollIntoViewIfNeeded();

    await section.getByLabel("Full name").fill("Test User");
    await section.getByLabel("Email").fill("test.user@example.com");
    await section.getByLabel("Message").fill("This is a test inquiry message.");
    await section.getByRole("button", { name: "Send Message" }).click();

    await expect(section.locator("#consent-error")).toHaveText(
      "Consent is required to submit this form",
    );
    await expect(section.locator("[data-contact-form-success]")).toHaveCount(0);
  });

  test("a valid submission replaces the form with a success panel", async ({ page }) => {
    await page.goto("/contact");
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
    await page.goto("/contact");
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
