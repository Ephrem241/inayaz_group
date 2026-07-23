import { defineArrayMember, defineField, defineType } from "sanity";

// Singleton — exactly one document should ever exist. Enforcing that in the
// Studio UI (hiding "create new", locking deletion) is a desk-structure
// concern, deliberately deferred to Phase 5 Step 26; this file only defines
// the fields.
//
// homepageMetrics mirrors src/constants/metrics.ts's confirmed/pending
// discriminated union exactly: a metric is either a real, confirmed number
// or explicitly marked unconfirmed — there is no third "guess" state.
// Unconfirmed metrics render as honest placeholders on the site, never a
// fabricated number (Phase 3 Step 10). socialLinks starts empty by design —
// Footer.tsx currently has no confirmed social links to show.
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "contactEmail",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "contactPhones",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({ name: "platform", type: "string" }),
            defineField({ name: "url", type: "url" }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
      description: "Empty by default — only add a link once it's confirmed live.",
    }),
    defineField({
      name: "homepageMetrics",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "metric",
          fields: [
            defineField({ name: "id", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "confirmed",
              type: "boolean",
              initialValue: false,
              description: "Off until a real, verified number exists for this metric.",
            }),
            defineField({
              name: "value",
              type: "number",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { confirmed?: boolean } | undefined;
                  if (parent?.confirmed && (value === undefined || value === null)) {
                    return "Value is required once this metric is marked confirmed.";
                  }
                  return true;
                }),
            }),
            defineField({ name: "suffix", type: "string", description: 'e.g. "+".' }),
          ],
          preview: {
            select: { title: "label", value: "value", confirmed: "confirmed" },
            prepare({ title, value, confirmed }) {
              return { title, subtitle: confirmed ? String(value ?? "") : "Pending confirmation" };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "footerTagline",
      type: "string",
    }),
    defineField({
      name: "footerDescription",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featuredProjects",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
      description: "Curated homepage feature order — independent of each project's own \"featured\" flag.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
