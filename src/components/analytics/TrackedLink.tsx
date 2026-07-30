"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackCta, type CtaEventName } from "@/lib/analytics/track";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: CtaEventName;
  eventProps?: Record<string, string>;
};

// Wraps next/link with a single onClick tracking call — kept as its own
// small client leaf so the *CTA.tsx sections that use it can stay server
// components (matching CLAUDE.md's "server components by default").
export function TrackedLink({ event, eventProps, onClick, ...linkProps }: TrackedLinkProps) {
  return (
    <Link
      {...linkProps}
      onClick={(clickEvent) => {
        trackCta(event, eventProps);
        onClick?.(clickEvent);
      }}
    />
  );
}
