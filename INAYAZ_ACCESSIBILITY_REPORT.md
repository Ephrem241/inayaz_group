# INAYAZ Accessibility Report

Target: WCAG 2.2 AA. This report covers what was audited, what was found and fixed in this pass, and what was already solid before it.

## What was already solid (verified, not just assumed)

- **Mobile navigation** uses a native `<dialog>` element with `.showModal()` — the browser's own built-in focus trap, Escape-to-close (via `onCancel`), and focus-restore-on-close, rather than a hand-rolled implementation. `e2e/mobile-navigation.spec.ts` (4 tests) verifies all of this genuinely works, not just that the code looks right.
- **Skip-to-content link** present on every marketing page, using Tailwind's `sr-only`/`focus:not-sr-only` pattern.
- **`prefers-reduced-motion`** is respected two ways: a global CSS media-query fallback (`animation-duration: 0.01ms !important` etc.) independent of JavaScript, plus a JS-driven `useReducedMotionContext()` that every GSAP-animated component checks explicitly, snapping straight to end-state instead of animating.
- **Color contrast**: the codebase already maintains WCAG-AA-safe variants of the brand gold and steel-gray for text use (`--color-construction-gold-accessible`, etc.), since the literal brand hex values fail 4.5:1 against the light backgrounds.
- **Focus states**: a visible `:focus-visible` outline is defined globally.

## What this pass found and fixed

### No-JS / hydration-failure content visibility (the main finding)

Several motion components shipped a static hidden initial state directly in their server-rendered HTML — `opacity-0` Tailwind classes or inline `clip-path`/`transform` styles — relying entirely on a client-side `useEffect` to ever become visible. If JavaScript fails to load, is blocked, or hydration errors out, that `useEffect` never runs and the content stays **permanently invisible**. This affected:

- `MotionSection` (wraps the majority of section headings/body copy sitewide)
- `CinematicHero` (the homepage hero's eyebrow, headline, subtext, CTA buttons, and scroll indicator)
- `MaskRevealImage` (every editorial image reveal)
- `ProjectShowcase` (featured project images on the homepage)

A related but distinct failure mode was found in `ProcessScroller`: its desktop pinned-scroll tree has **no server-safe opacity gating at all** — the four stage panels are absolutely positioned on top of each other, with per-panel opacity set only by the GSAP effect that never runs without JS. Without the fix, this wouldn't hide content — it would render all four panels' text simultaneously overlapping, illegible.

**Fix**: a `data-motion-initial` attribute on every affected element, a `.no-js` default class on `<html>` removed by a render-blocking inline script the instant JavaScript actually runs (the same technique dark-mode theme scripts use), a matching CSS override (`.no-js [data-motion-initial] { opacity: 1 !important; ... }`), an independent `<noscript>` stylesheet as a second fallback layer, and — for `ProcessScroller` specifically — forcing its already-built, always-safe stacked mobile timeline as the universal `.no-js` fallback regardless of viewport.

**This was verified empirically, not just by code review.** `e2e/no-js-fallback.spec.ts` runs 5 tests with JavaScript genuinely disabled via Playwright's `javaScriptEnabled: false` and confirms: hero headline/CTAs visible, section headings visible, featured-project images visible (`clip-path: none`), editorial mask-reveal images visible, and the construction process correctly falls back to the stacked timeline. All 5 pass.

### Missing root-layout error boundary

`error.tsx` existed (catches errors within a page/section) but `global-error.tsx` did not — meaning a failure in the root layout itself, or above it, would have fallen through to Next.js's own unstyled default error screen instead of a branded one. Added, following the same visual pattern as the existing `error.tsx`.

(While investigating this, also double-checked whether `error.tsx`'s existing `unstable_retry` prop — flagged in earlier research as a possibly-nonstandard API name — actually works in this Next.js version. Confirmed via Next 16.2.10's own internals that both `reset` and `unstable_retry` are genuinely provided to the error component; not a bug, no fix needed.)

### Keyboard safety on the pinned Construction Process section

Confirmed via an automated check (`e2e/construction-process.spec.ts`) rather than manual testing alone: the pinned desktop section contains zero focusable elements (`a`, `button`, `input`, `select`, `textarea`, `[tabindex]`) anywhere inside it, meaning keyboard Tab structurally cannot get trapped there — there's nothing to trap on.

## Content-level accessibility

- Every image field in the Sanity schema requires alt text (`imageWithAlt` object type, enforced at the schema level).
- Form errors are inline and paired with an accessible validation summary (contact form, extended in this pass with required-field indicators).
- No text is conveyed only through an image.

## Verification performed

Full e2e suite (178 tests) includes: mobile-menu focus/keyboard tests, reduced-motion fallback tests, the new no-JS fallback tests, the new keyboard-safety test, and page-load/heading-hierarchy assertions across every route. `npm run lint` and `npm run type-check` clean throughout.

## Known limitations / not covered by this pass

- **No automated accessibility scanning tool** (no `axe-core`/`jest-axe`) is wired into the test suite — all current coverage is hand-written Playwright assertions targeting specific, known-important behaviors (focus, ARIA, reduced motion), not a general-purpose scan. Adding `@axe-core/playwright` would be a reasonable follow-up but wasn't part of this task's scope.
- **No `loading.tsx`** exists on any route — not an accessibility defect per se (content still renders correctly), but worth a future look for perceived-performance/screen-reader-announcement reasons.
- Manual screen-reader testing (VoiceOver/NVDA) was not performed — all verification here is automated (Playwright ARIA-role/attribute assertions) or based on confirmed browser-native semantics (the `<dialog>` element, `aria-current`, etc.), not a live assistive-technology pass.
