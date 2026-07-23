import type { SlugIsUniqueValidator } from "sanity";

// Standard Sanity slug-uniqueness check: excludes the current document's own
// draft/published pair from the collision query. Shared across every schema
// with a `slug` field (project, division, service, article).
export const isUniqueSlug: SlugIsUniqueValidator = async (slug, context) => {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: "2026-01-01" });
  const id = document?._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };
  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;
  return client.fetch(query, params);
};
