import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalPageLayout,
  LegalHeading,
  LegalParagraph,
  LegalList,
} from "@/components/legal/LegalPageLayout";
import { company } from "@/constants/company";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "What cookies and similar technologies this website actually uses.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Cookie Policy" lastUpdated="July 25, 2026">
      <LegalParagraph>
        This page describes exactly what this website uses today — not a generic
        boilerplate list of things a site &quot;might&quot; use. There is no cookie-consent banner
        because nothing described below requires one.
      </LegalParagraph>

      <LegalHeading>Analytics — no cookies</LegalHeading>
      <LegalParagraph>
        This site uses Vercel Web Analytics to count page views and measure which
        calls-to-action get used. It works without setting any cookie and without
        tracking you across other websites — it counts visits in aggregate rather than
        building a profile tied to you individually.
      </LegalParagraph>

      <LegalHeading>Sanity Studio — editor authentication only</LegalHeading>
      <LegalParagraph>
        The <code>/studio</code> route is INAYAZ&apos;s content-management admin area, used
        only by invited editors to publish content. Logging in there sets an
        authentication session cookie so an editor stays signed in. This only applies to
        staff who log in at <code>/studio</code> — it is never set for a visitor browsing
        the public site.
      </LegalParagraph>

      <LegalHeading>Marketing or advertising cookies</LegalHeading>
      <LegalParagraph>
        None are currently used. If that changes in the future, this page will be updated
        first, and a consent banner will be added before any such cookie is set.
      </LegalParagraph>

      <LegalHeading>Your browser&apos;s own controls</LegalHeading>
      <LegalParagraph>
        Since this site sets no tracking cookies of its own, there&apos;s nothing to opt out of
        here — but you can always review or clear cookies for any site through your
        browser&apos;s settings.
      </LegalParagraph>

      <LegalHeading>Related</LegalHeading>
      <LegalList>
        <li>
          <Link href="/privacy" className="underline decoration-construction-gold underline-offset-4">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/terms" className="underline decoration-construction-gold underline-offset-4">
            Terms of Service
          </Link>
        </li>
      </LegalList>

      <LegalHeading>Contact</LegalHeading>
      <LegalParagraph>
        Questions about this policy can be sent to{" "}
        <a href={`mailto:${company.email}`} className="underline decoration-construction-gold underline-offset-4">
          {company.email}
        </a>
        .
      </LegalParagraph>
    </LegalPageLayout>
  );
}
