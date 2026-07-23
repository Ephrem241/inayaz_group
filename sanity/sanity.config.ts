import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./lib/env";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "INAYAZ Group",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],

  schema: {
    types: schemaTypes,
  },
});
