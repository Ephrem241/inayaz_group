import Link from "next/link";
import { NAV_ITEMS } from "@/constants/navigation";
import { Wordmark } from "@/components/layout/Wordmark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-dark">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-3 md:py-24">
        <div>
          <Wordmark />
          <p className="mt-6 max-w-xs text-sm text-muted">Building What&apos;s Next</p>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A diversified Ethiopian business group delivering construction, real estate,
            manufacturing, import, export, travel, and equipment solutions.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <address className="not-italic">
          <p className="text-sm text-muted">
            ZULYEKA Building
            <br />
            6th Floor, Office 603
            <br />
            Addis Ababa, Ethiopia
          </p>
          <p className="mt-4 text-sm">
            <a href="mailto:info@inayazgroup.com" className="text-muted hover:text-primary">
              info@inayazgroup.com
            </a>
          </p>
          <p className="mt-2 text-sm">
            <a href="tel:+251973223312" className="text-muted hover:text-primary">
              +251 973 223 312
            </a>
            <br />
            <a href="tel:+251968666664" className="text-muted hover:text-primary">
              +251 968 666 664
            </a>
          </p>
          {/* Future: add verified INAYAZ social links here once confirmed live */}
        </address>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide py-6 text-xs text-muted-foreground">
          © {year} INAYAZ Construction and Material Import Export. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
