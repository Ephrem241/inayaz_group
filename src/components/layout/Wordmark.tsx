"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

// Interim geometric mark inspired by docs/brand-board.png's logo concept —
// an original abstract skyline, not a trace of any delivered vector asset.
// Replace with the real INAYAZ SVG logo once it's delivered (CLAUDE.md Step 29b).
function LogoIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0 text-primary" fill="currentColor" aria-hidden="true">
      <rect x="2" y="14" width="7" height="16" />
      <rect x="12" y="6" width="8" height="24" />
      <path d="M12 6L16 2L20 6H12Z" />
      <rect x="23" y="17" width="7" height="13" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      aria-label="INAYAZ Group — Home"
      aria-current={pathname === "/" ? "page" : undefined}
      className={cn(
        "flex items-center gap-2.5 font-heading leading-none tracking-tight",
        className,
      )}
    >
      <LogoIcon />
      <span>
        {/* Brand wordmark text — exempt from WCAG SC 1.4.3's numeric
            contrast requirement (logos/brand names are explicitly excluded
            from the Contrast (Minimum) success criterion). Measured
            contrast of #B22222 against this header/footer's dark
            backgrounds is ~2.1–2.5:1, well under 4.5:1 — deliberately
            invoked here, not an oversight; see globals.css's comment above
            .section-dark for why no accessible-on-dark red variant exists.
            Do not copy this pattern for any non-logo text. */}
        <span className="block text-lg font-semibold text-brand-red">INAYAZ</span>
        <span className="block text-[0.6rem] font-medium tracking-[0.35em] text-off-white uppercase">
          Group
        </span>
      </span>
    </Link>
  );
}
