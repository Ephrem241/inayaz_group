import { describe, expect, it } from "vitest";
import { contactFormSchema } from "./contact";

const validPayload = {
  fullName: "Jane Doe",
  companyName: "Doe Construction",
  email: "jane@example.com",
  phone: "+251 973 223 312",
  serviceInterest: "construction-real-estate",
  projectType: "residential",
  estimatedBudget: "5,000,000 ETB",
  projectLocation: "Addis Ababa",
  message: "We would like to discuss a residential development project.",
  consent: true,
  honeypot: "",
};

describe("contactFormSchema", () => {
  it("accepts a fully valid submission", () => {
    const result = contactFormSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("accepts a minimal submission with only required fields", () => {
    const result = contactFormSchema.safeParse({
      fullName: "Jane Doe",
      email: "jane@example.com",
      message: "A message that is long enough.",
      consent: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a full name shorter than 2 characters", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, fullName: "J" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email address", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a message shorter than 10 characters", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, message: "too short" });
    expect(result.success).toBe(false);
  });

  it("rejects a message longer than 2000 characters", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, message: "a".repeat(2001) });
    expect(result.success).toBe(false);
  });

  it("rejects consent set to false", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, consent: false });
    expect(result.success).toBe(false);
  });

  it("accepts an empty phone number", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, phone: "" });
    expect(result.success).toBe(true);
  });

  it("rejects a malformed phone number", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, phone: "call me maybe" });
    expect(result.success).toBe(false);
  });

  it("accepts a phone number with common separators", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, phone: "(251) 973-223-312" });
    expect(result.success).toBe(true);
  });

  it("rejects a serviceInterest value outside the known division ids", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, serviceInterest: "not-a-division" });
    expect(result.success).toBe(false);
  });

  it("accepts an empty-string serviceInterest (unselected)", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, serviceInterest: "" });
    expect(result.success).toBe(true);
  });

  it("rejects a projectType value outside the known project types", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, projectType: "spaceship" });
    expect(result.success).toBe(false);
  });

  it("accepts a non-empty honeypot value at the schema level — src/lib/services/contact.ts's own honeypot check is what must catch it, so it can respond with a disguised fake success instead of a distinctly different validation error", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, honeypot: "I am a bot" });
    expect(result.success).toBe(true);
  });

  it("rejects a company name longer than 160 characters", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, companyName: "a".repeat(161) });
    expect(result.success).toBe(false);
  });

  it("trims whitespace from fullName", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, fullName: "  Jane Doe  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe("Jane Doe");
    }
  });
});
