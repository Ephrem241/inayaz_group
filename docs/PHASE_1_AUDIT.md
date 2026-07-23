# INAYAZ Group Website Rebuild — Phase 1 Project Audit

**Date:** 2026-07-17
**Scope:** CLAUDE.md Phase 1 ("Project Audit"), adapted for the actual project state (see note below).

## Note on scope adaptation

CLAUDE.md's Phase 1 checklist (Section "Step 1: Inspect the Existing Codebase") assumes an existing local Next.js codebase to inspect — version, router type, Tailwind config, lint/type-check/build, etc. That assumption doesn't hold here: **there is no local codebase**. The project directory contains only `CLAUDE.md` and a `docs/` folder. The "existing website" referenced throughout CLAUDE.md is a live, third-party-hosted site with no available source, credentials, or CMS access — only its publicly visible pages.

This audit therefore covers: (1) the actual local project state, (2) a read-only technical audit of the live site as the closest available analogue to "existing implementation," and (3) verification of the two local reference artifacts (company profile doc, brand board).

---

## 1. Local project state

| Item | Status |
|---|---|
| `package.json` | Does not exist |
| Next.js project | Not scaffolded |
| App Router / Pages Router | N/A — no project yet |
| Tailwind config | Not present |
| UI libraries (ShadCN, Radix) | None installed |
| Animation libraries (GSAP) | None installed |
| Routes | None |
| CMS / hardcoded data | None |
| Image hosting config | None (`next.config.*` doesn't exist) |
| Forms / API routes | None |
| SEO implementation | None |
| Lockfile | None |
| `node_modules` | Absent |
| Git repository | Not initialized |
| `docs/` folder | Present — contains `INAYAZ_Company_Profile.docx` and `brand-board.png` |

**Conclusion:** this is a greenfield build, not a migration. Lint/type-check/build cannot be run — there is nothing to run them against yet. Phase 2 (Project Foundation) will create all of the above from scratch.

---

## 2. Live site technical audit (https://inayaz-website.vercel.app/)

Read-only audit via HTTP fetch of headers/HTML and rendered-content spot checks. No forms submitted, nothing modified on the live site.

### Navigation & routes
Live nav (identical in header and footer) has 6 items, all HTTP 200:

| Label | Route |
|---|---|
| Home | `/` |
| About Us | `/about` |
| Services | `/services` |
| Works | `/works` |
| News | `/news` |
| Contact | `/contact` |

`/group` and `/sustainability` both return 404 — these are **not live today**. This isn't a conflict with CLAUDE.md; it confirms the Group/Sustainability sections are net-new additions in the rebuild rather than migrations of existing content.

Sub-brand pages exist via a generic `/[slug]` catch-all, linked from the homepage service grid:
`/construction-and-realestate`, `/export-trade`, `/inayaz-import`, `/inayaz-manufacturing`, `/inayaz-tour`, `/inayaz-machinery-and-equipment-rental`.

No `/robots.txt` or `/sitemap.xml` (both 404).

### Project pages
Pattern: `/works/[slug]`. Six live project cards on the `/works` listing page:

| Live slug | Project |
|---|---|
| `/works/ameliyaz-inayaz` | AMELIYAZ |
| `/works/ozon-inayaz` | AKOYA OZON Apartment |
| `/works/tes-realty-inayaz` | TES REALTY Apartment |
| `/works/twinz-residential-building` | TWINZ Residential Building |
| `/works/parkview-apartment-project` | PARKVIEW Apartment |
| `/works/novelity-apartment` | NOVELITY Apartment |

Only 2 of these (`ameliyaz-inayaz`, `tes-realty-inayaz`) are linked from the homepage; the other 4 are only reachable via the `/works` listing.

CLAUDE.md's decided slug naming standard (`ameliyaz`, `akoya-ozone`, `tes-realty`, `twinz`, `park-view`, `novelty`, `gold-souq`) is cleaner than the live slugs and should be used as-is in the rebuild — no need to preserve the old `-inayaz` suffixes or misspellings (`novelity`, `parkview`).

**Bug found:** `/works/[slug]` does not validate the slug server-side. An invalid slug returns HTTP 200 with client-rendered "404" text instead of a real 404 status — a soft-404 that would look fine to monitoring/search engines while actually broken. Worth avoiding in the rebuild (return real 404s from the route handler/`notFound()`).

### Contact form
Confirmed from HTML source — exactly 3 fields:
- Name (text)
- Email (⚠️ `type="text"`, not `type="email"` — no native format validation)
- Message (textarea)

Submit button labeled "send." The identical form appears in two places: the dedicated `/contact` page and embedded in the global footer (so it's on every page). No phone, company, budget, or service-interest fields exist live — those are new fields CLAUDE.md's contact form spec (Step 15) adds for the rebuild.

### SEO signals
- `<title>Inayaz</title>` — identical on every page checked (home, about, services, works, contact, project pages). No per-page unique titles.
- No meta descriptions anywhere.
- No Open Graph or Twitter Card tags anywhere.
- No `robots.txt`, no `sitemap.xml`.
- Viewport meta tag present and correct site-wide.

This confirms Phase 9 (SEO) in CLAUDE.md is greenfield work — there's nothing to preserve or migrate, only gaps to fill.

### Tech stack signals (informational only — not reused)
- `X-Powered-By: Next.js`, hosted on Vercel.
- App Router (RSC streaming payload `self.__next_f.push(...)`, not classic `__NEXT_DATA__`).
- Built with Turbopack (chunk names `turbopack-*.js`).
- Tailwind-style utility classes with custom tokens (`px-xl`, `body-large`, `bg-inayaz-red`).
- Images served from Sanity CDN (`cdn.sanity.io/images/r8japn2c/...`) — confirms the live site already used Sanity. **Per CLAUDE.md, this is the previous developer's project with no available access/credentials; the rebuild creates a brand-new Sanity project regardless.**

### Image handling
No Next.js Image Optimization (`/_next/image?url=...`) used anywhere on the live site — all images are plain `<img>` tags, either static `/public` files (`inayazLogo.svg`, `construction.png`, etc.) or raw, unoptimized Sanity CDN URLs. At least one asset is served at full 2560×2560 resolution regardless of rendered size — a clear performance gap the rebuild's Next Image + Sanity image-URL-builder pipeline (Step 24/28) will fix.

### Footer
- "Let's Connect" heading + duplicate Name/Email/Message form.
- Address, email, both phone numbers (all match CLAUDE.md's verified contact info).
- Three social icons (LinkedIn/Facebook/Telegram-shaped) — **not wrapped in `<a href>`**, purely decorative, non-functional.
- No legal links (no Privacy Policy/Terms/Cookies), no sitemap link, no sub-brand links.

### Content quality issue
The News section currently has 4 live `/news/[slug]` entries, all with identical headline, date (2026-06-06), and body text — duplicate/unfinished placeholder data. This matches CLAUDE.md's own instruction ("it appears twice on the old News page — enter it only ONCE") and confirms only one real article exists.

### Broken links
No other broken links or failed page loads found among ~20 routes checked, beyond the soft-404 issue noted above.

---

## 3. Content source verification — `docs/INAYAZ_Company_Profile.docx`

Extracted and cross-checked against the verified content already embedded in CLAUDE.md. **Fully consistent** — mission, vision, values, all six division descriptions, import/travel process steps and key figures, the six-project portfolio table (client/structure/levels), case-study copy, recognitions (CBE, COOP), "Why Choose INAYAZ," sub-brand list (INAYAZ Construction/Export/Motors), and contact details all match. Confirmed usable as-is as the authoritative Sanity seed source in Phase 5.

Note: the docx's project table has 6 projects only (no Gold Souq) — consistent with CLAUDE.md, which sources Gold Souq separately from Akoya Properties' own site and explicitly adds it as the 7th portfolio project.

---

## 4. Brand asset verification — `docs/brand-board.png`

Reviewed. Confirms:
- All six palette hex values exactly match CLAUDE.md Section 4 (Deep Navy `#0B1F33`, Architectural Charcoal `#14181D`, Warm Stone `#D8C7A5`, Construction Gold `#B79052`, Off White `#F5F3EE`, Steel Gray `#7B848C`).
- Typography pairing matches Section 6: Playfair Display (heading) / DM Sans (body).
- Logo mark: a stylized building/skyline icon in gold, paired with "INAYAZ GROUP" wordmark.
- Includes example UI sections (hero, service card, values panel) consistent with the cinematic/architectural direction in Section 5.

⚠️ **Flag:** the brand board displays example metrics — "120+ Projects," "15+ Years," "500+ Professionals" — presented as sample content for a metrics section mockup. These are **not** present in the verified company profile and are **not** confirmed company-wide figures. Per CLAUDE.md Section 10 ("Do not invent final numbers... Company-wide totals... are NOT yet confirmed"), these must be treated as illustrative placeholder numbers only and **must not** be seeded into Sanity or published as real data without explicit confirmation from INAYAZ.

---

## 5. Open items still needed from INAYAZ (carried forward from CLAUDE.md Phase 16)

- Official registered legal name (vs. operating name "INAYAZ Construction and Material Import Export")
- GC-1 registration number/details
- Gold Souq: consultant name and full structure notation (currently only "14 levels" is known)
- Project locations, statuses, completion years, built areas, unit counts (beyond what's verified)
- Client, consultant, and partner logo usage permissions (Akoya Properties, KH Consulting, CBE, COOP)
- Recognition certificate high-res scans and dates
- Leadership names and titles (CEO, executives, project directors — none currently available)
- Confirmed company-wide metrics (total completed projects, professionals, built area) — brand-board figures are mockup only, not to be used
- Real project/division/leadership photography (see CLAUDE.md Step 29 — placeholder stock system to be used in the interim, prefixed `placeholder-`)

---

## 6. Recommendation

Proceed to **Phase 2 — Project Foundation**: scaffold the Next.js/TypeScript/App Router project, initialize git, configure Tailwind with the verified design tokens, and set up the folder structure per CLAUDE.md Section 8. This is a separate, consequential step (repo init, dependency choices, later Sanity project creation) and should be a deliberate next action rather than bundled into this audit.
