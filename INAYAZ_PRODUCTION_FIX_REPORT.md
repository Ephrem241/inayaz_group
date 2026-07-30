# INAYAZ Production Fix — Report

Full production-readiness hardening pass on the already-built INAYAZ Group website, covering all 16 numbered issues from the fix request. This is a narrative summary — see `INAYAZ_PRODUCTION_FIX_TASKS.md` for the per-issue audit trail (affected files, exact verification result per item) and `INAYAZ_SEO_REPORT.md` / `INAYAZ_ACCESSIBILITY_REPORT.md` for those two topics in depth.

**Scope discipline maintained throughout**: no redesign, no imagery replaced, no metrics or recognitions invented, no legal name guessed, no WhatsApp CTA fabricated without a real number, no security headers weakened, no accessibility regressed.

## What was completed

### SEO / URL correctness (issues #2, #11)
- The site's `localhost:3333` leak was a single stray `.env.local` value plus a non-Vercel code fallback — both fixed; `SITE_URL` now falls back to `https://inayaz-group.vercel.app` until a custom domain is configured, with trailing-slash normalization.
- Added the missing Project JSON-LD schema and extended breadcrumb structured data to every top-level page that lacked it.
- Added `e2e/seo-guards.spec.ts`, a permanent regression guard that fails the build if `localhost`/`127.0.0.1` ever reappears in canonical URLs, Open Graph tags, JSON-LD, `sitemap.xml`, or `robots.txt`.

### Honest content, not fabricated placeholders (issues #3, #4)
- Homepage metrics moved from a `confirmed: boolean` field to a `draft → verified → published` editorial workflow. Unpublished metrics are no longer shown as a dash with "Pending confirmation" text — they simply don't render. Below three published metrics, a plain confirmed-facts strip (founded year, computed years of experience, GC-1, HQ, division count) replaces the sparse grid.
- Recognition (CBE, COOP, GC-1) moved from hardcoded constants with an always-visible "certificate pending" caveat to a real Sanity-backed schema with the same draft/verified/published workflow, plus a `logoApproved` gate before any institution's logo can render. CBE and COOP are seeded `draft` — hidden entirely from the public site — until real evidence is uploaded and an editor publishes them. Only GC-1 (already documented) shows today, under a neutral "Credentials and Institutional Relationships" heading.

### Homepage restructure (issue #5)
- Removed `MissionVision`, `CoreValues`, and `RecognitionAndTrust` from the homepage — each already rendered in full, verbatim, on `/about`; this was pure duplication, not a preview.
- Trimmed `CompanyIntroduction` to a two-sentence purpose statement (its own duplicate of `/about`'s meaning-of-INAYAZ quote and founding timeline was removed).
- Added a `preview` variant to `Sustainability` (3 of 7 topics + an "Explore Sustainability" CTA) for the homepage; the dedicated `/sustainability` page is unaffected.
- Replaced the homepage's embedded full `<Contact>` section (address block + entire form) with a compact `HomeFinalCTA` band; the full contact experience lives exclusively on `/contact`.
- New order: Hero → Credibility Summary → Business Divisions → Featured Projects → Construction Process → Why Choose INAYAZ → Sustainability Preview → Final Consultation CTA → Footer.

### Real Estate section (issue #6)
- The project Sanity schema already had `status`, `completionYear`, `builtArea`, `units`, `propertyType`, and `location` fields, fully queried via GROQ — but `adaptProject()` silently stripped them before they ever reached the frontend, which is why `/projects/[slug]` hardcoded "Pending confirmation" regardless of what was actually in Sanity. Fixed the adapter to surface real data, and added six new optional real-estate fields (`unitTypes`, `amenities`, `pricingNote`, `paymentPlanNote`, `brochure`, `salesContact`).
- New `/real-estate` (listing, with Property Type + Location + a dynamically-derived Status filter) and `/real-estate/[slug]` (detail: overview, unit types, amenities, pricing-or-"Contact for pricing", payment plan, brochure download, similar developments, schedule-visit CTA) reuse the same seven project documents — a buyer-facing presentation of the same data the contractor-facing `/projects` already shows, not a parallel content type.

### CTA strategy, analytics, contact form (issues #7, #8)
- Replaced the single generic "Contact Us" label with intent-based CTA copy per division/context (construction, real estate, export, import, rental, general).
- Wired Vercel Analytics (the user's confirmed choice — cookieless, no consent banner required) via small client-leaf `TrackedLink`/`TrackedAnchor` wrapper components, so the CTA sections themselves stay server components.
- Contact form: required-field indicators, an accessible validation summary, a duplicate-submission guard, Ethiopia-formatted phone placeholder, response-time expectation copy, and conditional field groups per service interest (construction, real estate, rental). URL query params (`?interest=`, `?development=`) pre-fill the form from Real Estate and division CTAs. UTM/lead-source fields are captured and stored alongside each submission.
- No WhatsApp CTA was added anywhere — no confirmed business WhatsApp number exists to link to.

### Brand consistency, navigation, footer (issues #9, #10, #15)
- New `src/constants/company.ts` centralizes `brandName` ("INAYAZ Group") vs. `legalName` ("INAYAZ Construction and Material Import Export" — confirmed per the company profile, not a placeholder), used consistently in the footer copyright, structured data, and legal pages.
- Removed the explicit "Home" nav item (the logo already routes home); the logo now carries the active-route semantics. Primary CTA relabeled "Discuss a Project" everywhere.
- Footer gained a Real Estate link (automatic via the shared nav list) and a legal-links row.

### Legal & trust pages (issue #12)
- `/privacy`, `/terms`, `/cookies`, `/accessibility` — written specific to this site's actual practices (Sanity storage, Resend email, in-memory rate limiting, cookieless analytics, Studio-only auth cookies), not generic boilerplate. No cookie-consent banner, because nothing non-essential requiring consent is in use.

### Accessibility hardening (issues #13, #14)
- Found and fixed a real no-JS/hydration-failure risk: `MotionSection`, `CinematicHero`, `MaskRevealImage`, and `ProjectShowcase` all shipped a static hidden initial state (`opacity-0` class or inline `clip-path`) with no fallback if GSAP's `useEffect` never ran. Added a `data-motion-initial` attribute plus a `.no-js` class on `<html>` (removed by a render-blocking inline script the instant JS actually runs) with a matching CSS override, and an independent `<noscript>` stylesheet as a second line of defense.
- Found a related, more severe variant in `ProcessScroller`: without JS, its desktop tree has no server-safe opacity gating at all — all four stage panels would render absolutely-positioned on top of each other, overlapping and illegible, not just hidden. Fixed by forcing the desktop tree to the always-safe stacked mobile timeline under `.no-js`.
- Verified empirically, not just by mechanism: `e2e/no-js-fallback.spec.ts` runs with JavaScript genuinely disabled via Playwright and confirms hero, section, gallery, and process content all remain visible.
- Added the missing `global-error.tsx` root-layout error boundary.
- Confirmed via automated check that `ProcessScroller`'s pinned section contains zero focusable elements, so keyboard Tab can never get trapped inside it.
- Content copy pass: audited all constants for unverifiable superlatives; fixed the one exact match to the task's own worked example (Ameliyaz's "world-class engineering execution" → "disciplined engineering coordination"). Left CLAUDE.md's explicitly-verified, client-provided copy elsewhere untouched (a Vision statement's aspirational "become a leading..." phrasing is not a present-tense factual claim; "Connecting Industry Leaders" describes the network, not INAYAZ itself).

## Files created

`src/constants/company.ts` · `src/components/seo/ProjectJsonLd.tsx` · `e2e/seo-guards.spec.ts` · `sanity/schemas/documents/recognition.ts` · `e2e/legal-pages.spec.ts` · `src/components/sections/HomeFinalCTA.tsx` · `src/components/real-estate/RealEstateCard.tsx` · `src/components/real-estate/RealEstateListing.tsx` · `src/components/sections/RealEstate{Intro,Hero,Details,Related,CTA,DetailCTA}.tsx` · `src/app/(marketing)/real-estate/page.tsx` · `src/app/(marketing)/real-estate/[slug]/page.tsx` · `e2e/real-estate.spec.ts` · `src/lib/analytics/track.ts` + `TrackedLink.tsx` + `TrackedAnchor.tsx` · `src/constants/division-cta.ts` · `src/constants/service-interests.ts` · `src/components/legal/LegalPageLayout.tsx` · `src/app/(marketing)/{privacy,terms,cookies,accessibility}/page.tsx` · `src/app/global-error.tsx` · `e2e/no-js-fallback.spec.ts` · `e2e/console-errors.spec.ts` · `INAYAZ_PRODUCTION_FIX_TASKS.md`

## Files modified (representative — see `INAYAZ_PRODUCTION_FIX_TASKS.md` for the complete per-issue list)

`src/constants/site.ts`, `.env.local`, `.env.example` · `src/app/layout.tsx`, `globals.css` · `sitemap.ts`, `robots.ts` (routes only) · `OrganizationJsonLd.tsx`, `ArticleJsonLd.tsx`, `Breadcrumbs.tsx` (+ usage on About/Group/Services/Projects/News/Sustainability) · `sanity/schemas/documents/{siteSettings,project}.ts`, `sanity/lib/{types,queries,adapters}.ts`, `sanity/seed.mts` · `Metrics.tsx`, `AnimatedMetric.tsx`, `RecognitionAndTrust.tsx` · `src/app/(marketing)/page.tsx`, `CompanyIntroduction.tsx`, `Sustainability.tsx` · `ProjectHero.tsx`, `ProjectCard.tsx`, `src/constants/projects.ts` · `Footer.tsx`, `src/constants/navigation.ts`, `Wordmark.tsx` · `ContactForm.tsx`, `src/lib/validations/contact.ts`, `sanity/schemas/documents/contactSubmission.ts` · `MotionSection.tsx`, `CinematicHero.tsx`, `MaskRevealImage.tsx`, `ProjectShowcase.tsx`, `ProcessScroller.tsx` (via CSS only)

## Packages installed

`@vercel/analytics` — the user's confirmed choice for CTA tracking (cookieless, no consent banner required).

## Environment variables

No new required variables. `NEXT_PUBLIC_SITE_URL` should be set explicitly once a custom domain is live (currently falls back to `https://inayaz-group.vercel.app` if unset).

## Verification performed

`npm run lint`, `npm run type-check`, `npm run test` (64/64 Vitest), `npm run test:e2e` (178/178 Playwright — 174 Desktop Chromium + 4 Mobile Chrome), `npm run build` (37 routes, clean). Manual production-HTML spot-check confirmed zero `localhost` references, correct canonical/OG URLs, zero draft content leakage, and a correct 28-entry sitemap. Full detail in `INAYAZ_PRODUCTION_FIX_TASKS.md`.

## Remaining risks / known limitations

- **Vercel Analytics only activates on Vercel's actual infrastructure.** Its script always 404s under local/CI `next build && next start` (documented and filtered in `e2e/console-errors.spec.ts`) — this is expected and resolves once genuinely deployed.
- **In-memory, per-instance rate limiting** on the contact form (pre-existing, not part of this pass) won't hold up across multiple serverless instances/regions at scale — flagged in code comments as a stopgap.
- **Resend email sender** is still the shared sandbox address (`onboarding@resend.dev`), pending a verified `inayazgroup.com` sending domain (DNS setup, pre-existing).
- No `loading.tsx` exists on any route (Suspense boundaries) — not part of this task's scope, worth a future look.

## Company information still requiring confirmation

- Official *registered* legal name (the confirmed *operating* name is already in use — see `company.ts`)
- Custom domain (`www.inayazgroup.com`) — DNS/Vercel configuration
- CBE and COOP certificate scans + logo usage permission (to move Recognition from draft to published)
- Business WhatsApp number (no CTA fabricated in its absence)
- Real estate development details: unit types, amenities, pricing, payment plans, brochures (all schema-ready, hidden until entered)
- Leadership names, titles, and photography (pre-existing gap, unchanged by this pass)
- Verified social media links (schema-ready, still empty)
- GC-1 registration number/details
