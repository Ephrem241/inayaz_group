import { beforeEach, describe, expect, it, vi } from "vitest";

const { headers } = vi.hoisted(() => ({ headers: vi.fn() }));
vi.mock("next/headers", () => ({ headers }));

const { create } = vi.hoisted(() => ({ create: vi.fn() }));
vi.mock("../../../sanity/lib/client", () => ({ serverClient: { create } }));

const { sendContactEmails } = vi.hoisted(() => ({ sendContactEmails: vi.fn() }));
vi.mock("./email", () => ({ sendContactEmails }));

const { submitContactForm } = await import("./contact");

function headersFor(ip: string) {
  return { get: (name: string) => (name === "x-forwarded-for" ? ip : null) };
}

function validFormData(overrides: Record<string, string> = {}) {
  const data = new FormData();
  const fields = {
    fullName: "Jane Doe",
    companyName: "",
    email: "jane@example.com",
    phone: "",
    serviceInterest: "",
    projectType: "",
    estimatedBudget: "",
    projectLocation: "",
    message: "We would like to discuss a residential development project.",
    consent: "on",
    honeypot: "",
    ...overrides,
  };
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

let ipCounter = 0;
function freshIp() {
  ipCounter += 1;
  return `203.0.113.${ipCounter}`;
}

beforeEach(() => {
  create.mockReset().mockResolvedValue({ _id: "contactSubmission-test" });
  sendContactEmails.mockReset().mockResolvedValue(undefined);
  headers.mockReset();
});

describe("submitContactForm", () => {
  it("rejects invalid input without touching Sanity or email", async () => {
    headers.mockResolvedValue(headersFor(freshIp()));
    const result = await submitContactForm(
      { status: "idle" },
      validFormData({ email: "not-an-email" }),
    );

    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.fieldErrors?.email).toBeTruthy();
    }
    expect(create).not.toHaveBeenCalled();
    expect(sendContactEmails).not.toHaveBeenCalled();
  });

  it("silently accepts a honeypot-filled submission without writing to Sanity", async () => {
    headers.mockResolvedValue(headersFor(freshIp()));
    const result = await submitContactForm(
      { status: "idle" },
      validFormData({ honeypot: "I am a bot" }),
    );

    expect(result.status).toBe("success");
    expect(create).not.toHaveBeenCalled();
    expect(sendContactEmails).not.toHaveBeenCalled();
  });

  it("persists a valid submission to Sanity and sends notification emails", async () => {
    headers.mockResolvedValue(headersFor(freshIp()));
    const result = await submitContactForm({ status: "idle" }, validFormData());

    expect(result.status).toBe("success");
    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        _type: "contactSubmission",
        fullName: "Jane Doe",
        email: "jane@example.com",
        status: "New",
      }),
    );
    expect(sendContactEmails).toHaveBeenCalledTimes(1);
  });

  it("returns a generic error and never leaks the raw Sanity error when the write fails", async () => {
    headers.mockResolvedValue(headersFor(freshIp()));
    create.mockRejectedValue(new Error("Sanity API secret-leaking failure detail"));

    const result = await submitContactForm({ status: "idle" }, validFormData());

    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.message).not.toContain("secret-leaking");
    }
    expect(sendContactEmails).not.toHaveBeenCalled();
  });

  it("allows exactly 5 submissions from the same IP within the window, then blocks the 6th", async () => {
    const ip = freshIp();
    headers.mockResolvedValue(headersFor(ip));

    const results = [];
    for (let i = 0; i < 6; i += 1) {
      results.push(await submitContactForm({ status: "idle" }, validFormData()));
    }

    expect(results.slice(0, 5).every((r) => r.status === "success")).toBe(true);
    expect(results[5].status).toBe("error");
    if (results[5].status === "error") {
      expect(results[5].message).toBe("Too many submissions. Please try again later.");
    }
    expect(create).toHaveBeenCalledTimes(5);
  });

  it("tracks rate limits per IP independently", async () => {
    const ipA = freshIp();
    const ipB = freshIp();

    headers.mockResolvedValue(headersFor(ipA));
    for (let i = 0; i < 5; i += 1) {
      await submitContactForm({ status: "idle" }, validFormData());
    }

    headers.mockResolvedValue(headersFor(ipB));
    const result = await submitContactForm({ status: "idle" }, validFormData());

    expect(result.status).toBe("success");
  });
});
