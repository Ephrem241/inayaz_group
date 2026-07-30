# INAYAZ Content Verification Checklist

This is for INAYAZ staff to work through before launch. Each item below is either a piece of information the site needs but doesn't have yet, or a claim currently shown that should be double-checked against real records. Nothing on the live site is fabricated — where information isn't confirmed, the site hides the field entirely rather than guessing, but that means real value is missing until someone fills it in.

## Legal & company identity

- [ ] **Official registered legal name.** The site currently uses "INAYAZ Construction and Material Import Export" (the confirmed *operating* name used on project contracts) for the footer copyright line and legal pages. If the fully registered legal entity name differs, provide it and it can be swapped in one place (`src/constants/company.ts`).
- [ ] **GC-1 contractor registration number/details**, if you'd like them published alongside the classification.
- [ ] **Business WhatsApp number**, if you want a WhatsApp CTA added — none exists today, so no such button appears anywhere.
- [ ] **Verified social media links** — the site has a ready slot (Sanity `siteSettings.socialLinks`) but nothing is published there yet.

## Recognition & credentials

- [ ] **CBE ("A Proven Partner") certificate** — a scan/photo of the actual certificate, plus written confirmation you're able to publish CBE's name and logo publicly.
- [ ] **COOP ("Recommended By") certificate** — same as above.

Until these two are provided, CBE and COOP are **completely hidden** from the public site (not shown with a "pending" caveat — genuinely absent). Once you have the evidence, upload it to the `recognition` document in Sanity Studio, mark its status "published," and (separately) check "logoApproved" only if you also have permission to display that institution's logo.

## Homepage metrics

Currently only "Years of Experience" is published (calculated automatically from your 2015 founding date, so it never goes stale). The following exist as placeholders in Sanity, unpublished, waiting on real numbers:

- [ ] Completed Projects (a count)
- [ ] Active Developments (a count)
- [ ] Skilled Professionals (a headcount)
- [ ] Cities Served (a count)
- [ ] Total Built Area (with unit, e.g. "45,000 m²")

Each can be set and published independently in Sanity Studio (Site Settings → Homepage Metrics) — you don't need all five at once.

## Project details (all 7 developments)

For each of Ameliyaz, Gold Souq, Akoya Ozone, Tes Realty, Twinz, Park View, and Novelty, the following fields exist in Sanity but are currently empty — none are shown as "pending" on the site, they're just absent until filled in:

- [ ] Status (Completed / Ongoing / Upcoming)
- [ ] Completion year
- [ ] Built area
- [ ] Unit count
- [ ] Gallery images (beyond the single hero image each project currently has)

## Real Estate detail pages (buyer-facing, at `/real-estate/[project]`)

New optional fields, currently empty for all 7 developments:

- [ ] Unit types (e.g. "Studio", "2 Bedroom", "3 Bedroom Penthouse")
- [ ] Amenities list
- [ ] Pricing note (or leave blank — the site shows an honest "Contact for pricing" fallback, never a made-up figure)
- [ ] Payment plan details, if you offer one
- [ ] Downloadable brochure (PDF upload)
- [ ] Dedicated sales contact (falls back to the general company email if left blank)

## Leadership

- [ ] Leadership names, titles, and photography. The About page currently shows an honest note that this is pending rather than fabricated headshots or invented names.

## Image assets

- [ ] A dedicated branded 1200×630 social-share image (currently falls back to the hero background image).
- [ ] Real project photography to replace the placeholder stock images currently in `public/images/` — see `public/images/PLACEHOLDERS.md` for the full inventory of what's a placeholder vs. a real asset.

## Content claims — one correction made, worth a final read-through

One piece of existing project copy was softened during this pass: Ameliyaz's description previously said "world-class engineering execution" — changed to "disciplined engineering coordination" (a claim the site can actually stand behind without external verification). Please read through all other project descriptions, division descriptions, and page copy once more and flag anything else that overclaims — the working rule applied was: specific and demonstrable stays, vague superiority claims ("leading," "world-class," "best," "unrivaled") get either removed or backed with evidence.
