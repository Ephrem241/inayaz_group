import "server-only";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL || process.env.CONTACT_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Resend's shared sandbox sender — every account can send from it without
// domain verification. Swap for a verified inayazgroup.com address once
// Resend + DNS are configured (Phase 8, RESEND_API_KEY still pending from
// INAYAZ — see .env.local).
const FROM_ADDRESS = "INAYAZ Group <onboarding@resend.dev>";

export type ContactEmailPayload = {
  fullName: string;
  companyName?: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  projectType?: string;
  estimatedBudget?: string;
  projectLocation?: string;
  message: string;
};

function buildNotificationText(payload: ContactEmailPayload): string {
  return [
    `New contact form submission from ${payload.fullName}`,
    payload.companyName ? `Company: ${payload.companyName}` : null,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    payload.serviceInterest ? `Service interest: ${payload.serviceInterest}` : null,
    payload.projectType ? `Project type: ${payload.projectType}` : null,
    payload.estimatedBudget ? `Estimated budget: ${payload.estimatedBudget}` : null,
    payload.projectLocation ? `Project location: ${payload.projectLocation}` : null,
    "",
    "Message:",
    payload.message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

function buildConfirmationText(payload: ContactEmailPayload): string {
  return [
    `Hi ${payload.fullName},`,
    "",
    "Thank you for reaching out to INAYAZ Group. We've received your message and a member of our team will be in touch shortly.",
    "",
    "— INAYAZ Group",
  ].join("\n");
}

// Best-effort: a submission is already durably saved as a contactSubmission
// document in Sanity before this runs (src/lib/services/contact.ts), so an
// email failure here is a courtesy-notification miss, not a lost lead. Never
// throws — callers should not let this block the success response.
export async function sendContactEmails(payload: ContactEmailPayload): Promise<void> {
  if (!resend) {
    console.warn("[contact] RESEND_API_KEY not set — skipping email notifications.");
    return;
  }

  try {
    if (adminEmail) {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: adminEmail,
        replyTo: payload.email,
        subject: `New inquiry from ${payload.fullName}`,
        text: buildNotificationText(payload),
      });
    }

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: payload.email,
      subject: "We've received your message — INAYAZ Group",
      text: buildConfirmationText(payload),
    });
  } catch (error) {
    console.error("[contact] failed to send notification emails:", error);
  }
}
