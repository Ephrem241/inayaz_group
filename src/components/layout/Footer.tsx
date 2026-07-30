import Link from "next/link";
import { NAV_ITEMS } from "@/constants/navigation";
import { Wordmark } from "@/components/layout/Wordmark";
import { company } from "@/constants/company";
import { TrackedAnchor } from "@/components/analytics/TrackedAnchor";

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Accessibility", href: "/accessibility" },
];

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
            {company.address.line1}
            <br />
            {company.address.line2}
            <br />
            {company.address.line3}
          </p>
          <p className="mt-4 text-sm">
            <TrackedAnchor
              href={`mailto:${company.email}`}
              event="email_click"
              eventProps={{ source: "footer" }}
              className="text-muted hover:text-primary"
            >
              {company.email}
            </TrackedAnchor>
          </p>
          <p className="mt-2 text-sm">
            {company.phones.map((phone, index) => (
              <span key={phone}>
                <TrackedAnchor
                  href={telHref(phone)}
                  event="phone_click"
                  eventProps={{ source: "footer" }}
                  className="text-muted hover:text-primary"
                >
                  {phone}
                </TrackedAnchor>
                {index < company.phones.length - 1 && <br />}
              </span>
            ))}
          </p>
          {/* Future: add verified INAYAZ social links here once confirmed live */}
        </address>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col gap-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
