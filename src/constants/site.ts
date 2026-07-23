export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.inayazgroup.com";

// The site's only current hero/social image — no dedicated branded 1200×630
// share image exists yet (Step 29b lists a real logo/OG asset as still
// needed from INAYAZ). Reused as the Open Graph/Twitter fallback wherever a
// page has no image of its own, consistent with this project's
// placeholder-image policy (public/images/PLACEHOLDERS.md).
export const DEFAULT_OG_IMAGE = "/images/hero/placeholder-hero-background.jpg";
