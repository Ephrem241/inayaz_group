import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { previewSecret } from "../../../../../sanity/lib/serverEnv";
import { timingSafeCompare } from "@/lib/utils/timingSafeCompare";

// Only the two content types with their own public detail route can be
// previewed individually — division/service content lives on shared
// listing pages (/group, /services) rather than a per-item URL.
const PATH_BY_TYPE: Record<string, (slug: string) => string> = {
  project: (slug) => `/projects/${slug}`,
  article: (slug) => `/news/${slug}`,
};

// Entry point for Studio's "Open Preview" link (sanity/components/
// OpenPreviewButton.tsx, reached via /api/preview-url). Enables Next.js
// Draft Mode and redirects to the document's live page, which then reads
// from Sanity's drafts perspective (sanity/lib/queries.ts) instead of the
// published-only client.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");

  if (!timingSafeCompare(secret, previewSecret)) {
    return new NextResponse("Invalid preview secret", { status: 401 });
  }
  if (!type || !slug || !(type in PATH_BY_TYPE)) {
    return new NextResponse("Missing or unsupported type/slug", { status: 400 });
  }

  (await draftMode()).enable();
  return NextResponse.redirect(new URL(PATH_BY_TYPE[type](slug), request.url));
}
