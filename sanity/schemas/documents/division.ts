import { defineField, defineType } from "sanity";
import { isUniqueSlug } from "../../lib/isUniqueSlug";

// `listLabel` and `icon` aren't in CLAUDE.md's literal recommendation
// ("title, slug, description, image, services, featured") but both are real,
// already-shipped fields (src/constants/divisions.ts) — every division
// renders an icon, and listLabel varies what the item list is called
// ("Services" / "Products" / "Categories" / "Rental categories"). `items` is
// used instead of CLAUDE.md's `services` name for the same reason: calling
// an Export Trade list "services" would misdescribe it as products.
export const division = defineType({
  name: "division",
  title: "Division",
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
      name: "description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "listLabel",
      type: "string",
      description: 'What the items list below should be labeled, e.g. "Services" or "Products".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "icon",
      type: "string",
      description: "A lucide-react icon name, e.g. \"Building2\". Resolved to a component in the app.",
    }),
    defineField({
      name: "image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "listLabel",
      media: "image",
    },
  },
});
