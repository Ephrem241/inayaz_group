# INAYAZ Launch Checklist

Deployment itself is out of scope for this pass (requires the user's Vercel/domain/Sanity-dashboard access) — this checklist is what's left before flipping the site live, building on CLAUDE.md's own Phase 15 checklist plus everything this production-fix pass touched.

## Verified done in this pass ✅

- [x] `npm run lint` — clean
- [x] `npm run type-check` — clean
- [x] `npm run test` (Vitest) — 64/64 passing
- [x] `npm run test:e2e` (Playwright, both projects) — 178/178 passing
- [x] `npm run build` — succeeds, 37 routes generated cleanly
- [x] No `localhost`/`127.0.0.1` anywhere in production output (automated guard + manual spot-check)
- [x] Sitemap and robots.txt correct (28 entries, correct disallows)
- [x] Legal pages exist and are linked from the footer
- [x] Contact form validated end-to-end (empty-state errors, consent gate, success path, honeypot, rate limiting)
- [x] No-JS fallback verified with JavaScript genuinely disabled
- [x] `/studio` confirmed still loads correctly after all root-layout changes

## Still required before going live

### Domain & hosting
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real production domain once `www.inayazgroup.com` (or whichever domain is chosen) is configured on Vercel — currently falls back to `https://inayaz-group.vercel.app`.
- [ ] Point DNS at Vercel and verify the domain in the Vercel dashboard.
- [ ] Confirm Sanity CORS origins include the production domain (sanity.io/manage → API → CORS Origins) — `http://localhost:3000` was set up for development; the production origin still needs adding.
- [ ] Confirm the Sanity revalidation webhook (API → Webhooks) points at `/api/revalidate` on the production domain with the matching `SANITY_REVALIDATE_SECRET` header.

### Email
- [ ] Verify a real sending domain in Resend (currently uses the shared `onboarding@resend.dev` sandbox address) so confirmation/notification emails come from `@inayazgroup.com`.
- [ ] Set `RESEND_API_KEY` and `ADMIN_EMAIL` in production environment variables — both are currently blank in `.env.local`, meaning emails are silently skipped in this dev/test environment (confirmed via the `[contact] RESEND_API_KEY not set — skipping email notifications` log line seen throughout testing). `CONTACT_EMAIL` is already set to `info@inayazgroup.com`.

### Analytics
- [x] `@vercel/analytics` is installed and mounted — it will start reporting automatically once deployed to Vercel (its script only resolves on Vercel's actual edge infrastructure, which is why it 404s in local testing — expected, not a bug).

### Content (see `INAYAZ_CONTENT_VERIFICATION_CHECKLIST.md` for the full list)
- [ ] At minimum, decide whether to launch with only "Years of Experience" published as a metric, or hold for more real numbers first.
- [ ] Decide whether to launch with CBE/COOP recognition hidden (current default) or wait for certificate evidence.
- [ ] Real estate development details (pricing, unit types, brochures) — can launch with "Contact for pricing" as the honest fallback, or wait for real data.

### Access & permissions
- [ ] Invite INAYAZ editorial staff to the Sanity project with appropriate roles (Studio access is invite-only by design — no public signup).
- [ ] Confirm who holds the Vercel project's ownership/admin access.

### Final pre-launch pass
- [ ] Re-run the full verification suite (`lint`, `type-check`, `test`, `test:e2e`, `build`) one more time against the final production environment variables before the first real deploy.
- [ ] Test the contact form in the actual production environment (real Resend send, not the skipped-in-dev path).
- [ ] Test `/studio` login and publish flow with a real invited editor account.
- [ ] Load the live production URL in an incognito window and manually confirm: no console errors, no `localhost` in view-source, mobile menu works, reduced-motion works, all nav links resolve.

## Explicitly not fabricated, by design

The following are correctly absent from the live site today and should **not** be added without real data first: WhatsApp CTA (no confirmed number), CBE/COOP recognition claims (no evidence on file), specific project statuses/completion years/built areas/unit counts (none client-confirmed), real estate pricing figures (shows "Contact for pricing" instead), leadership names/photos, and five of six homepage metrics. Do not treat any of these as bugs to "fix" by inventing values — they're intentional, honest gaps waiting on real information from `INAYAZ_CONTENT_VERIFICATION_CHECKLIST.md`.
