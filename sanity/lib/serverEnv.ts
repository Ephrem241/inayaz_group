import "server-only";

// Secrets only — deliberately kept out of sanity/lib/env.ts, which
// sanity.config.ts (bundled into the client-side embedded Studio) also
// imports. The `server-only` import makes any accidental client-component
// import of this file a build error rather than a silent risk, on top of
// Next.js's own behavior of never inlining non-NEXT_PUBLIC_ vars into
// client bundles — belt and suspenders for anything touching credentials.
export const readToken = process.env.SANITY_API_READ_TOKEN;
export const writeToken = process.env.SANITY_API_WRITE_TOKEN;

// Checked against the Sanity webhook's signature in /api/revalidate — not
// one of CLAUDE.md's originally listed env vars, added because Step 24
// explicitly asks for a webhook-driven revalidation route, and an
// unverified webhook would let anyone invalidate the site's cache.
// Configure the same value in Sanity's webhook settings.
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;
