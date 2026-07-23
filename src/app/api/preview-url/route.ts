import { NextResponse } from "next/server";
import { previewSecret } from "../../../../sanity/lib/serverEnv";

const SUPPORTED_TYPES = new Set(["project", "article"]);

// Mediator between the client-side Studio (sanity/components/
// OpenPreviewButton.tsx, bundled into the browser) and the server-only
// SANITY_PREVIEW_SECRET: the Studio never holds the raw secret itself, it
// fetches the ready-to-use enable link from this route instead. This route
// has no auth of its own beyond knowing the route + a valid type/slug —
// an accepted, low-severity tradeoff (mirrors /api/revalidate's reasoning):
// worst case it lets someone view an unpublished draft, never mutate or
// delete anything, and Sanity Studio access is the real editor-only gate.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");

  if (!previewSecret) {
    return NextResponse.json({ error: "Preview is not configured" }, { status: 500 });
  }
  if (!type || !slug || !SUPPORTED_TYPES.has(type)) {
    return NextResponse.json({ error: "Missing or unsupported type/slug" }, { status: 400 });
  }

  const url = new URL("/api/draft-mode/enable", request.url);
  url.searchParams.set("secret", previewSecret);
  url.searchParams.set("type", type);
  url.searchParams.set("slug", slug);

  return NextResponse.json({ url: url.toString() });
}
