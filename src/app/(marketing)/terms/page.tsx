import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalHeading,
  LegalParagraph,
  LegalList,
} from "@/components/legal/LegalPageLayout";
import { company } from "@/constants/company";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the INAYAZ Group website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Terms of Service" lastUpdated="July 25, 2026">
      <LegalParagraph>
        These terms govern your use of this website, operated by {company.legalName}. By
        using this site, you agree to them. If you don&apos;t agree, please don&apos;t use the site.
      </LegalParagraph>

      <LegalHeading>Site content</LegalHeading>
      <LegalParagraph>
        Project descriptions, images, division and service information, and news articles
        on this site are provided for general information about INAYAZ Group and its
        work. Where a project&apos;s status, completion year, built area, or unit count is not
        shown, it has not yet been confirmed — absence of a figure is not itself a claim
        about it. We update this content as real information becomes available, and we do
        not guarantee it is complete or current at every moment.
      </LegalParagraph>

      <LegalHeading>Intellectual property</LegalHeading>
      <LegalParagraph>
        The INAYAZ name, logo, and original content on this site (text, project
        photography we own, and page design) belong to {company.legalName} or its
        licensors. You may view and share pages of this site for personal, non-commercial
        reference. Reproducing, redistributing, or using our content or brand assets
        commercially requires our prior written permission.
      </LegalParagraph>

      <LegalHeading>Third-party links</LegalHeading>
      <LegalParagraph>
        This site links to a small number of external sites we don&apos;t control — for
        example, our sister company Akoya Properties. We&apos;re not responsible for the
        content, accuracy, or practices of any site we link to.
      </LegalParagraph>

      <LegalHeading>Contact form and inquiries</LegalHeading>
      <LegalParagraph>
        Submitting the contact form is a request to be contacted about the subject you
        describe — it is not itself a contract, quote, booking, or reservation of any
        kind. Pricing, availability, unit types, and similar details discussed after your
        inquiry are handled separately and are not governed by these terms.
      </LegalParagraph>

      <LegalHeading>No warranty</LegalHeading>
      <LegalParagraph>
        This site is provided &quot;as is.&quot; While we take reasonable care to keep it accurate
        and available, we don&apos;t warrant that it will be uninterrupted, error-free, or
        that all content is complete or current, and we&apos;re not liable for losses arising
        from your use of it, to the extent permitted by law.
      </LegalParagraph>

      <LegalHeading>Governing law</LegalHeading>
      <LegalParagraph>
        These terms are governed by the laws of Ethiopia, where {company.legalName} is
        based and operates.
      </LegalParagraph>

      <LegalHeading>Changes to these terms</LegalHeading>
      <LegalParagraph>
        We may update these terms from time to time. The &quot;last updated&quot; date at the top of
        this page reflects the most recent revision.
      </LegalParagraph>

      <LegalHeading>Contact</LegalHeading>
      <LegalList>
        <li>
          Email:{" "}
          <a href={`mailto:${company.email}`} className="underline decoration-construction-gold underline-offset-4">
            {company.email}
          </a>
        </li>
        <li>
          Address: {company.address.line1}, {company.address.line2}, {company.address.line3}
        </li>
      </LegalList>
    </LegalPageLayout>
  );
}
