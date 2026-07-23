"use server";

import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/validations/contact";
import { serverClient } from "../../../sanity/lib/client";
import { sendContactEmails } from "./email";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

// In-memory, per-server-instance only: resets on restart and is not shared
// across multiple instances/regions. Acceptable stopgap for Phase 3 — there
// is no Redis/Upstash or other durable store anywhere in this project yet.
// Revisit if/when one is introduced.
const attempts = new Map<string, { count: number; resetAt: number }>();

export type ContactActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactFormSchema.safeParse({
    ...raw,
    consent: raw.consent === "on",
  });

  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;
    const fieldErrors: Record<string, string> = {};
    for (const [field, messages] of Object.entries(flattened)) {
      if (messages && messages[0]) fieldErrors[field] = messages[0];
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  if (parsed.data.honeypot) {
    console.warn("[contact] honeypot triggered — treating as spam");
    // Return the same generic success shape as a real submission so bots
    // can't distinguish a rejection from a success.
    return { status: "success" };
  }

  const requestHeaders = await headers();
  const key = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const bucket = attempts.get(key);

  if (bucket && bucket.resetAt > now) {
    if (bucket.count >= RATE_LIMIT_MAX) {
      return { status: "error", message: "Too many submissions. Please try again later." };
    }
    bucket.count += 1;
  } else {
    attempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  }

  const {
    fullName,
    companyName,
    email,
    phone,
    serviceInterest,
    projectType,
    estimatedBudget,
    projectLocation,
    message,
    consent,
  } = parsed.data;

  try {
    await serverClient.create({
      _type: "contactSubmission",
      fullName,
      companyName,
      email,
      phone,
      serviceInterest,
      projectType,
      estimatedBudget,
      projectLocation,
      message,
      consent,
      status: "New",
      submittedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[contact] failed to save submission:", error);
    return {
      status: "error",
      message: "Something went wrong submitting your message. Please try again or email us directly.",
    };
  }

  // Best-effort — a failure here never blocks the success response since the
  // submission is already durably saved in Sanity above.
  await sendContactEmails({
    fullName,
    companyName: companyName || undefined,
    email,
    phone: phone || undefined,
    serviceInterest: serviceInterest || undefined,
    projectType: projectType || undefined,
    estimatedBudget: estimatedBudget || undefined,
    projectLocation: projectLocation || undefined,
    message,
  });

  return { status: "success" };
}
