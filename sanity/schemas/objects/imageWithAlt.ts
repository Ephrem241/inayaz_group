import { defineField, defineType } from "sanity";

// Reused everywhere an image is needed (project hero/gallery, division,
// service, article cover, siteSettings). Alt text is required on every
// instance per CLAUDE.md's schema rule ("Require alt text on all images").
// Hotspot is enabled now so crop/focal-point data exists once real photos
// are uploaded, ahead of Step 28's image-pipeline wiring.
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe what's actually in the image — required for accessibility and SEO.",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
