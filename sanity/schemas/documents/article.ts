import { defineField, defineType } from "sanity";
import { isUniqueSlug } from "../../lib/isUniqueSlug";

// `author` and `featured` aren't in CLAUDE.md's literal recommendation
// ("title, slug, excerpt, content, coverImage, category, publishedAt") but
// both are real, already-shipped fields (src/constants/articles.ts) — every
// article shows a byline, and `featured` drives the listing page's large
// panel treatment for the current single seed article. `category` stays a
// plain optional string, not a reference to a separate taxonomy document —
// CLAUDE.md's own "potential future topics" are informational labels, not a
// confirmed category system with detail pages of their own (Step 21).
export const article = defineType({
  name: "article",
  title: "Article",
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
      name: "excerpt",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "content",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      type: "imageWithAlt",
      description: "Optional — omit until real photography is confirmed for this article.",
    }),
    defineField({
      name: "category",
      type: "string",
      description: "Optional. Leave unset unless a real category applies — do not invent one.",
    }),
    defineField({
      name: "author",
      type: "string",
      initialValue: "INAYAZ",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
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
      publishedAt: "publishedAt",
      media: "coverImage",
    },
    prepare({ title, publishedAt, media }) {
      return {
        title,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : "No publish date set",
        media,
      };
    },
  },
});
