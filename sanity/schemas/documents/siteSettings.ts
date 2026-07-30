import { defineArrayMember, defineField, defineType } from "sanity";

// Singleton — exactly one document should ever exist. Enforcing that in the
// Studio UI (hiding "create new", locking deletion) is a desk-structure
// concern, deliberately deferred to Phase 5 Step 26; this file only defines
// the fields.
//
// homepageMetrics uses a draft -> verified -> published editorial workflow:
// only "published" metrics ever render publicly (Metrics.tsx filters on
// this), so moving a metric through draft/verified is purely an internal
// review step with zero public visibility until an editor explicitly marks
// it published — no metric is ever shown as a placeholder/dash to visitors.
// socialLinks starts empty by design — Footer.tsx currently has no
// confirmed social links to show.
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
              name: "status",
              type: "string",
              options: { list: ["draft", "verified", "published"], layout: "radio" },
              initialValue: "draft",
              validation: (Rule) => Rule.required(),
              description: "Only \"published\" metrics ever appear on the live site.",
            }),
            defineField({
              name: "value",
              type: "number",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { status?: string } | undefined;
                  if (parent?.status === "published" && (value === undefined || value === null)) {
                    return "Value is required once this metric is marked published.";
                  }
                  return true;
                }),
            }),
            defineField({ name: "suffix", type: "string", description: 'e.g. "+".' }),
          ],
          preview: {
            select: { title: "label", value: "value", status: "status" },
            prepare({ title, value, status }) {
              return { title, subtitle: status === "published" ? String(value ?? "") : status };
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
