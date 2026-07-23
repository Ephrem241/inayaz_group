"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NAV_ITEMS, PRIMARY_CTA } from "@/constants/navigation";
import { Wordmark } from "@/components/layout/Wordmark";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils/cn";

export function PremiumHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(80);
  const pathname = usePathname();
  // The transparent, white-text header only works over the homepage's dark
  // cinematic hero — every other page starts with a light section-light
  // intro directly under the fixed header, which would render the
  // off-white wordmark/nav text invisible against an equally off-white
  // background. Solid on every route except the homepage's unscrolled top.
  const solid = scrolled || pathname !== "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-[var(--duration-micro)] ease-[var(--ease-power2-out)]",
        solid
          ? "bg-deep-navy/95 shadow-[0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container-wide flex items-center justify-between py-4 text-off-white">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "font-body text-sm tracking-wide transition-colors hover:text-primary",
                  active ? "text-primary" : "text-off-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link href={PRIMARY_CTA.href} className="btn btn-primary hidden md:inline-flex">
            {PRIMARY_CTA.label}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-full p-2 text-off-white transition-colors hover:text-primary md:hidden"
          >
            <Menu aria-hidden="true" size={26} />
          </button>
        </div>
      </div>

      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
