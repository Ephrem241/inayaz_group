# INAYAZ SEO Report

## The core issue and its actual root cause

The reported symptom was production metadata resolving to `http://localhost:3333`. Investigation found the site's URL architecture was already sound — a single `SITE_URL` constant (`src/constants/site.ts`) is consistently imported by every URL-emitting file (root layout metadata, `sitemap.ts`, `robots.ts`, `OrganizationJsonLd.tsx`, `Breadcrumbs.tsx`, `ArticleJsonLd.tsx`, `ShareLinks.tsx`) — there was no hardcoding drift between files. The actual bug was narrow: `.env.local` had `NEXT_PUBLIC_SITE_URL=http://localhost:3333`, a value that didn't even match the app's real local dev port (3000), and the code's own fallback pointed at `https://www.inayazgroup.com` rather than the interim Vercel URL. No existing test caught a `localhost` leak.

**Fix**: corrected `.env.local`, changed the code fallback to `https://inayaz-group.vercel.app` (with trailing-slash normalization), and added a permanent regression guard.

## Structured data (JSON-LD)

| Schema | Type | Where it renders | Status |
|---|---|---|---|
| Organization / LocalBusiness | `GeneralContractor` | Every marketing page (root layout) | Pre-existing, verified working |
| BreadcrumbList | `BreadcrumbList` | About, Group, Services, Projects (listing + detail), Real Estate (listing + detail), News (listing + detail), Sustainability | Extended in this pass — previously only on project/article detail pages |
| Article | `Article` | `/news/[slug]` | Pre-existing, verified working |
| Project (new) | `CreativeWork` | `/projects/[slug]` and `/real-estate/[slug]` (same underlying data, different URL via a `path` override) | Added in this pass — was a documented gap (CLAUDE.md's Phase 9 lists "Project schema where appropriate" as required, but nothing existed) |

`CreativeWork` was chosen deliberately over a more specific building/real-estate schema.org type — structural data (units, built area, completion year) isn't uniformly confirmed per project yet, and overclaiming a more specific type before that data exists would be its own accuracy problem.

## Metadata

- Title template (`%s | INAYAZ Group`) applied consistently via the root layout; every page sets its own unique title/description via `generateMetadata` or the static `metadata` export — spot-checked across all 37 built routes, no duplicates found.
- `metadataBase` correctly resolves relative canonical/OG paths against `SITE_URL`.
- Open Graph and Twitter card metadata present on every page; images fall back to `DEFAULT_OG_IMAGE` where a page has none of its own (documented as an interim measure — CLAUDE.md's asset list still calls for a dedicated branded 1200×630 share image).

## Sitemap and robots

- `sitemap.xml`: 28 entries — 13 static pages (including the 4 new legal pages) + 7 project details + 7 real-estate details + 1 article. Verified by direct fetch, not just code review.
- `robots.txt`: `Allow: /`, `Disallow: /studio`, `Disallow: /api`, correct `Sitemap:` line pointing at the real origin. No draft/preview routes exist outside `/api/draft-mode/*` (draft mode is a cookie on the same public URL, not a separate path), so nothing else needs excluding.

## Automated guards added

`e2e/seo-guards.spec.ts` (6 tests) — fails the build if:
- `SITE_URL` itself resolves to a non-`https://` or `localhost`-containing value
- Rendered homepage HTML contains `localhost` or `127.0.0.1` anywhere
- Canonical URL, `og:url`, or Organization JSON-LD's `url` field don't match `SITE_URL` exactly
- Project detail canonical/JSON-LD/breadcrumb URLs don't match `SITE_URL`
- `sitemap.xml` or `robots.txt` don't resolve to the real origin

This is a genuine regression guard, not a one-time fix — a future accidental reintroduction of a bad `SITE_URL` value will fail CI immediately rather than silently shipping.

## Verification performed

Full e2e suite (178 tests) includes the 6 SEO guard tests plus every page-load test asserting correct titles. Direct manual `curl` inspection of the built production server confirmed zero `localhost` references, correct canonical/OG tags, and a correct 28-entry sitemap — see `INAYAZ_PRODUCTION_FIX_TASKS.md`'s Phase I section for the exact commands and output.

## Remaining SEO work / risks

- **Custom domain not yet configured.** `SITE_URL` correctly falls back to the Vercel URL, but canonical URLs, sitemap, and all structured data will need `NEXT_PUBLIC_SITE_URL` set explicitly once `www.inayazgroup.com` is live — a one-line env var change, no code change required.
- **No dedicated Open Graph share image.** Currently reuses the hero background image as a fallback; a real branded 1200×630 asset is still listed as needed (pre-existing gap, CLAUDE.md Step 29b).
- **No JobPosting schema** — not applicable, no careers page exists.
- Real estate detail pages currently share the same `CreativeWork` schema as project pages; if/when real unit/pricing data is confirmed, a more specific `Product`/`Residence`-style schema could be considered, but that's a future enhancement, not a defect today.
