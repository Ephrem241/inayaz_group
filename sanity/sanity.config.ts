import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./lib/env";
import { schemaTypes } from "./schemas";
import { structure } from "./lib/structure";

export default defineConfig({
  name: "default",
  title: "INAYAZ Group",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],

  schema: {
    types: schemaTypes,
  },

  document: {
    // siteSettings is a singleton (sanity/schemas/documents/siteSettings.ts,
    // always addressed by the fixed "siteSettings" _id) — an editor
    // duplicating or deleting it would leave the site with zero or two
    // settings documents, and sanity/lib/queries.ts's getSiteSettings()
    // only ever reads the first match it finds.
    actions: (input, context) =>
      context.schemaType === "siteSettings"
        ? input.filter(({ action }) => action !== "duplicate" && action !== "delete")
        : input,
  },
});
