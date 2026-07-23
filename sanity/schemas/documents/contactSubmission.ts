import { defineField, defineType } from "sanity";

// Lead records created by the contact form's server action (src/lib/services
// contact.ts) once Phase 5 Step 25 wires the Sanity write. Every field
// except `status` is readOnly at the schema level — these are submitted
// facts, not editorial content; editors should only ever change status.
// `consent` mirrors the required checkbox in the real Zod schema
// (src/lib/validations/contact.ts) — kept for compliance/audit, recording
// that consent was actually given at submission time.
export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  fields: [
    defineField({ name: "fullName", type: "string", readOnly: true, validation: (Rule) => Rule.required() }),
    defineField({ name: "companyName", type: "string", readOnly: true }),
    defineField({ name: "email", type: "string", readOnly: true, validation: (Rule) => Rule.required().email() }),
    defineField({ name: "phone", type: "string", readOnly: true }),
    defineField({ name: "serviceInterest", type: "string", readOnly: true }),
    defineField({ name: "projectType", type: "string", readOnly: true }),
    defineField({ name: "estimatedBudget", type: "string", readOnly: true }),
    defineField({ name: "projectLocation", type: "string", readOnly: true }),
    defineField({ name: "message", type: "text", rows: 4, readOnly: true, validation: (Rule) => Rule.required() }),
    defineField({ name: "consent", type: "boolean", readOnly: true }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: ["New", "Contacted", "Qualified", "Closed", "Spam"],
      },
      initialValue: "New",
    }),
    defineField({
      name: "submittedAt",
      type: "datetime",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      email: "email",
      status: "status",
    },
    prepare({ title, email, status }) {
      return { title: title || email, subtitle: `${status ?? "New"} · ${email ?? ""}` };
    },
  },
});
