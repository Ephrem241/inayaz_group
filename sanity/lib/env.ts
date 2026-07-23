export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-01-01";

if (!projectId) {
  // Non-fatal: Studio itself will surface a clearer configuration error to
  // the editor. This just avoids a silent, harder-to-diagnose failure mode.
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — using the placeholder in .env.local. Replace it with the real project ID before Studio or content queries will work.",
  );
}
