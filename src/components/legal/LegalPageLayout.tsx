import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

// Shared shell for /privacy, /terms, /cookies, /accessibility — identical
// structure (breadcrumbs, h1, last-updated date, prose body) across all
// four, so this is a real, non-premature abstraction rather than one-off
// duplication.
export function LegalPageLayout({ eyebrow, title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <section data-legal-page-section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-narrow">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />

        <div className="mt-6">
          <p className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>

        <div className="mt-10 max-w-none text-base text-muted-foreground">{children}</div>
      </div>
    </section>
  );
}

export function LegalHeading({ children }: { children: ReactNode }) {
  return <h2 className="mt-10 text-2xl font-medium text-foreground first:mt-0">{children}</h2>;
}

export function LegalParagraph({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-3xl">{children}</p>;
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-6">{children}</ul>;
}
