import { timingSafeEqual } from "node:crypto";

// Shared by every secret-gated route (revalidation webhook, draft-mode
// enable) — a plain `===` on a secret leaks timing information proportional
// to how many leading characters match, letting an attacker brute-force it
// character by character.
export function timingSafeCompare(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
