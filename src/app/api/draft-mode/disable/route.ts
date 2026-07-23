import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

// No secret required — leaving draft mode only returns a browser to seeing
// the same published content every regular visitor already sees.
export async function GET(request: Request) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", request.url));
}
