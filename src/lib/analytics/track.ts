"use client";

import { track } from "@vercel/analytics";

// Every event name a CTA in this app can fire — kept as a closed union
// rather than a free string so a typo can't silently create an
// untracked/misnamed event.
export type CtaEventName =
  | "hero_explore_projects"
  | "hero_discover_inayaz"
  | "nav_discuss_project"
  | "construction_consultation"
  | "property_visit"
  | "property_details_request"
  | "equipment_quote"
  | "trade_inquiry"
  | "supply_inquiry"
  | "travel_inquiry"
  | "start_conversation"
  | "phone_click"
  | "email_click"
  | "brochure_download";

export function trackCta(event: CtaEventName, properties?: Record<string, string>): void {
  track(event, properties);
}
