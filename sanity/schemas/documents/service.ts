import { defineField, defineType } from "sanity";
import { isUniqueSlug } from "../../lib/isUniqueSlug";

export const service = defineType({
  name: "service",
  title: "Service",
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
      type: "text",
      rows: 3,
      description: "One short sentence — rendered in the service switcher panel, not a full article.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      type: "string",
      description: "A lucide-react icon name, e.g. \"HardHat\". Resolved to a component in the app.",
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
      subtitle: "description",
      media: "image",
    },
  },
});
