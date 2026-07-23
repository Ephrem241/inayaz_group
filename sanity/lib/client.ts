import "server-only";
import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";
import { readToken, writeToken } from "./serverEnv";

// CDN-enabled, published-only — the default for nearly all public page
// rendering. Fast and cached; never sees draft content regardless of
// whether a token is set, since `perspective: "published"` excludes drafts
// at the query level (CLAUDE.md's "published-only public queries").
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  token: readToken,
});

// No CDN, write token — used for mutations (the contact form's server
// action creating contactSubmission documents, Phase 5/8) and any future
// draft-preview needs. Never import this into a client component; nothing
// in src/ should query Sanity directly from one anyway (CLAUDE.md's data
// layer rule), but this client makes that mistake load-bearing, not cosmetic
// — without a write token it simply can't be used for its one real job.
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "raw",
  token: writeToken,
});

// No CDN, `perspective: "drafts"` — returns a document's draft version when
// one exists, falling back to published otherwise. Only ever queried when
// Next.js Draft Mode is active (src/app/api/draft-mode/enable), so an
// editor previewing an unpublished edit sees it without affecting what
// public visitors see through the regular `client` above.
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "drafts",
  token: readToken,
});
