import Link from "next/link";
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
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 font-heading leading-none tracking-tight",
        className,
      )}
    >
      <LogoIcon />
      <span>
        <span className="block text-lg font-semibold">INAYAZ</span>
        <span className="block text-[0.6rem] font-medium tracking-[0.35em] text-muted-foreground uppercase">
          Group
        </span>
      </span>
    </Link>
  );
}
