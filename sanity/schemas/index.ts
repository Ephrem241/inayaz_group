import type { SchemaTypeDefinition } from "sanity";
import { imageWithAlt } from "./objects/imageWithAlt";
import { project } from "./documents/project";
import { division } from "./documents/division";
import { service } from "./documents/service";
import { article } from "./documents/article";
import { siteSettings } from "./documents/siteSettings";
import { contactSubmission } from "./documents/contactSubmission";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  imageWithAlt,
  // Documents
  project,
  division,
  service,
  article,
  siteSettings,
  contactSubmission,
];
