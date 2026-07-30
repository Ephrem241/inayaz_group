import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalHeading,
  LegalParagraph,
  LegalList,
} from "@/components/legal/LegalPageLayout";
import { company } from "@/constants/company";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "INAYAZ Group's commitment to an accessible website, and how to report a barrier.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Accessibility Statement" lastUpdated="July 25, 2026">
      <LegalParagraph>
        INAYAZ Group wants this website to be usable by everyone, including people who
        rely on a keyboard, a screen reader, or reduced-motion settings. We target the
        Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.
      </LegalParagraph>

      <LegalHeading>What we&apos;ve built in</LegalHeading>
      <LegalList>
        <li>Semantic HTML and a consistent heading hierarchy on every page</li>
        <li>A &quot;skip to content&quot; link for keyboard users</li>
        <li>Visible focus states on every interactive element</li>
        <li>A fully keyboard-operable mobile menu, with focus trapped inside it while open and returned to the menu button on close</li>
        <li>Alt text on every image, and no essential information conveyed through an image alone</li>
        <li>Text and interface colors checked against WCAG AA contrast requirements</li>
        <li>
          Full support for <code>prefers-reduced-motion</code> — parallax, pointer-based
          movement, and scroll-linked animation are disabled and content appears
          immediately when it&apos;s set
        </li>
        <li>Accessible form labels, inline error messages, and an error summary on the contact form</li>
      </LegalList>

      <LegalHeading>Known limitations</LegalHeading>
      <LegalParagraph>
        Some project and division photography is temporary placeholder imagery pending
        final assets from INAYAZ (documented internally), and a small number of
        third-party embeds (the Sanity Studio admin area at <code>/studio</code>) are
        outside our direct control. We&apos;re continuing to review the site and will address
        issues as they&apos;re found.
      </LegalParagraph>

      <LegalHeading>Reporting a problem</LegalHeading>
      <LegalParagraph>
        If you encounter an accessibility barrier anywhere on this site, please let us
        know — we want to fix it. Email{" "}
        <a href={`mailto:${company.email}`} className="underline decoration-construction-gold underline-offset-4">
          {company.email}
        </a>{" "}
        with the page URL and a description of the issue, and we&apos;ll respond and address
        it promptly.
      </LegalParagraph>

      <LegalHeading>Contact</LegalHeading>
      <LegalParagraph>
        {company.legalName} · {company.address.line1}, {company.address.line2},{" "}
        {company.address.line3}
      </LegalParagraph>
    </LegalPageLayout>
  );
}
