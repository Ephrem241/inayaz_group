import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { revalidateSecret } from "../../../../sanity/lib/serverEnv";
import { timingSafeCompare } from "@/lib/utils/timingSafeCompare";

// Sanity webhook target (configure in sanity.io/manage -> API -> Webhooks):
// POST this route on publish, with a custom header carrying
// SANITY_REVALIDATE_SECRET so only Sanity's own webhook can trigger
// revalidation. CLAUDE.md asks for the webhook "secured with a shared
// secret" specifically (not HMAC payload signing), so a timing-safe header
// comparison — not full signature verification — is the proportionate
// implementation here; note for future hardening (Phase 13, Security) if a
// stronger guarantee is ever wanted.
export async function POST(request: Request) {
  if (!revalidateSecret) {
    console.error("[revalidate] SANITY_REVALIDATE_SECRET is not configured — rejecting all requests.");
    return NextResponse.json({ revalidated: false, message: "Not configured" }, { status: 500 });
  }

  if (!timingSafeCompare(request.headers.get("x-revalidate-secret"), revalidateSecret)) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string; slug?: { current?: string } };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ revalidated: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const { _type, slug } = body;
  if (!_type) {
    return NextResponse.json({ revalidated: false, message: "Missing _type in payload" }, { status: 400 });
  }

  // Next 16's revalidateTag requires a cache-life profile as the second
  // argument; { expire: 0 } means "this tag's cached content is stale as of
  // now" — the correct semantics for an on-demand webhook purge, as opposed
  // to a named profile like "hours" which describes a time-based ceiling.
  revalidateTag(_type, { expire: 0 });
  if (slug?.current) {
    revalidateTag(`${_type}:${slug.current}`, { expire: 0 });
  }

  return NextResponse.json({ revalidated: true, type: _type, slug: slug?.current ?? null });
}
