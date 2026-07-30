"use client";

import type { ComponentProps } from "react";
import { trackCta, type CtaEventName } from "@/lib/analytics/track";

type TrackedAnchorProps = ComponentProps<"a"> & {
  event: CtaEventName;
  eventProps?: Record<string, string>;
};

// For tel:/mailto:/external links (brochure downloads, quick-contact links)
// where a plain <a> is correct and next/link isn't — same tracking pattern
// as TrackedLink, kept as its own small client leaf.
export function TrackedAnchor({ event, eventProps, onClick, ...anchorProps }: TrackedAnchorProps) {
  return (
    <a
      {...anchorProps}
      onClick={(clickEvent) => {
        trackCta(event, eventProps);
        onClick?.(clickEvent);
      }}
    />
  );
}
