import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Hotspot/crop are honored automatically by @sanity/image-url whenever the
// source image has them set (imageWithAlt enables hotspot in the schema).
// Callers chain .width()/.height()/.format() etc. as needed; this just wires
// up the project/dataset once instead of repeating it at every call site.
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
