import { defineField, defineType } from "sanity";

// Institutional recognition (bank relationships, industry classifications)
// uses the same draft -> verified -> published workflow as homepageMetrics:
// only "published" items render publicly, and even then a logo only shows
// once logoApproved is explicitly checked. This exists because the site
// must never state that an institution formally recognizes or endorses
// INAYAZ without verified evidence and permission to publish the claim —
// evidenceFile is Studio-only reference material for the editor deciding
// whether to publish, and is deliberately never selected by any public GROQ
// query (see sanity/lib/queries.ts's getRecognitions), so it has no public
// URL surfaced anywhere on the site regardless of this item's status.
export const recognition = defineType({
  name: "recognition",
  title: "Recognition",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "eyebrow",
      type: "string",
      description: 'Short label above the name, e.g. "A Proven Partner" or "Industry Classification".',
    }),
    defineField({ name: "description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["draft", "verified", "published"], layout: "radio" },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
      description: "Only \"published\" items appear on the live site.",
    }),
    defineField({
      name: "evidenceFile",
      title: "Evidence (certificate scan, etc.)",
      type: "file",
      description:
        "Private reference for the editorial team only — never exposed on the public site, regardless of status.",
    }),
    defineField({
      name: "logoApproved",
      type: "boolean",
      initialValue: false,
      description: "Must be explicitly checked before any logo image is shown publicly.",
    }),
    defineField({
      name: "logo",
      type: "imageWithAlt",
      description: "Only rendered on the site if logoApproved is also checked.",
    }),
    defineField({ name: "evidenceReviewedAt", type: "datetime" }),
    defineField({ name: "orderRank", type: "number", description: "Manual display order, ascending." }),
  ],
  preview: {
    select: { title: "name", status: "status" },
    prepare({ title, status }) {
      return { title, subtitle: status };
    },
  },
});
