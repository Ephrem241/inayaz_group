import { defineField, defineType } from "sanity";
import { isUniqueSlug } from "../../lib/isUniqueSlug";

// Field-by-field notes on where this diverges from CLAUDE.md Step 23's
// literal recommendation, and why — every addition mirrors something the
// frontend already ships (see src/constants/projects.ts):
//   - propertyType: added in Phase 4 Step 18 (Projects Listing) — the real,
//     editorially-derived filter field; CLAUDE.md's recommendation doesn't
//     name it, but the shipped site depends on it.
//   - services: kept optional. Today's frontend derives "Services Delivered"
//     from the construction-real-estate division's items rather than storing
//     it per project; this field exists so an editor can override that
//     default later without a schema migration.
//   - No `published` boolean — Sanity's built-in draft/publish workflow
//     covers this per the schema rules.
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96, isUnique: isUniqueSlug },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      type: "string",
    }),
    defineField({
      name: "contractor",
      type: "string",
      initialValue: "INAYAZ Construction and Material Import Export",
    }),
    defineField({
      name: "consultant",
      type: "string",
      description: "Leave empty if not yet confirmed for this project.",
    }),
    defineField({
      name: "structureType",
      title: "Structure",
      type: "string",
      description: 'e.g. "2B+G+M+30+T (33 levels)".',
    }),
    defineField({
      name: "category",
      type: "string",
      description: "GC licensing classification, e.g. \"Category 1 General Contractor, GC-1\".",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "propertyType",
      type: "string",
      options: {
        list: ["Residential", "Commercial", "Mixed-Use"],
        layout: "radio",
      },
    }),
    defineField({
      name: "location",
      type: "string",
      description: "Leave empty if not yet confirmed.",
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: ["Completed", "Ongoing", "Upcoming"],
        layout: "radio",
      },
      description: "Leave unset until a status is client-confirmed — do not guess.",
    }),
    defineField({
      name: "startYear",
      type: "number",
    }),
    defineField({
      name: "completionYear",
      type: "number",
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "services",
      title: "Services delivered (override)",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Optional. If empty, the site falls back to the Construction and Real Estate division's service list.",
    }),
    defineField({
      name: "builtArea",
      type: "string",
      description: 'Leave empty until confirmed, e.g. "12,400 m²".',
    }),
    defineField({
      name: "units",
      type: "number",
      description: "Leave empty until confirmed.",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "orderRank",
      type: "number",
      description: "Manual sort key — lower numbers sort first. Optional.",
    }),
    // --- Real Estate detail fields (Phase D, production fix pass) ---
    // All optional and hidden cleanly on the frontend when unset — no field
    // here is ever fabricated a default value. These power /real-estate,
    // the buyer-facing presentation of the same project documents used by
    // /projects (the contractor/GC-1-facing presentation).
    defineField({
      name: "unitTypes",
      title: "Unit types",
      type: "array",
      of: [{ type: "string" }],
      description: 'e.g. "Studio", "1 Bedroom", "3 Bedroom Penthouse". Leave empty until confirmed.',
    }),
    defineField({
      name: "amenities",
      type: "array",
      of: [{ type: "string" }],
      description: "Leave empty until confirmed.",
    }),
    defineField({
      name: "pricingNote",
      type: "string",
      description: 'e.g. "Starting from $120,000". Leave empty to show "Contact for pricing".',
    }),
    defineField({
      name: "paymentPlanNote",
      type: "text",
      rows: 3,
      description: "Leave empty if no payment plan is being offered.",
    }),
    defineField({
      name: "brochure",
      title: "Brochure (PDF)",
      type: "file",
      description: "Leave empty until a downloadable brochure exists for this development.",
    }),
    defineField({
      name: "salesContact",
      type: "string",
      description: "Optional dedicated sales phone/email for this development. Falls back to the general contact info if empty.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client",
      media: "heroImage",
    },
  },
});
