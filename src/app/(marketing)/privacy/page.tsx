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
  title: "Privacy Policy",
  description: "How INAYAZ Group collects, uses, and stores information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Privacy Policy" lastUpdated="July 25, 2026">
      <LegalParagraph>
        This policy explains what information {company.legalName} (&quot;INAYAZ&quot;, &quot;we&quot;, &quot;us&quot;)
        collects through this website, why we collect it, how it is stored, and who can
        access it. It applies only to this website — not to INAYAZ&apos;s physical offices,
        social media accounts, or any third-party site we link to (such as our sister
        company Akoya Properties).
      </LegalParagraph>

      <LegalHeading>What we collect</LegalHeading>
      <LegalParagraph>
        The only personal information this website collects is what you choose to submit
        through the contact form on the <Link href="/contact" className="underline decoration-construction-gold underline-offset-4">Contact page</Link>:
      </LegalParagraph>
      <LegalList>
        <li>Full name, company name (optional), email address, and phone number (optional)</li>
        <li>Your service interest and any project, development, or rental details relevant to that interest</li>
        <li>The message you write to us</li>
        <li>
          Basic technical context automatically captured from the URL and browser at
          submission time — the page you arrived from (referrer) and, if you followed a
          marketing link, its campaign parameters (utm_source, utm_medium, utm_campaign) —
          used only to understand which channel a lead came from
        </li>
      </LegalList>
      <LegalParagraph>
        We do not use tracking cookies, and we do not sell or share your information with
        third parties for their own marketing purposes.
      </LegalParagraph>

      <LegalHeading>Why we collect it</LegalHeading>
      <LegalParagraph>
        Solely to respond to your inquiry — to understand what you&apos;re asking about, get
        back to you through the contact details you provided, and route your message to
        the right team internally. Lead-source fields help us understand which channels
        (search, referrals, campaigns) bring in genuine inquiries.
      </LegalParagraph>

      <LegalHeading>How it is stored</LegalHeading>
      <LegalParagraph>
        Submissions are stored as records in Sanity, the content management system behind
        this website. Access to that system is restricted to INAYAZ staff and authorized
        editors who have been individually invited — there is no public access to
        submitted records. A copy of your message is also sent via email (through Resend,
        our transactional email provider) to the relevant INAYAZ inbox, and a confirmation
        email is sent to the address you provided.
      </LegalParagraph>

      <LegalHeading>How long we keep it</LegalHeading>
      <LegalParagraph>
        We retain contact submissions for as long as reasonably necessary to respond to
        your inquiry and to keep a business record of it. INAYAZ has not yet finalized a
        specific retention period for lead records — this policy will be updated once one
        is set. If you&apos;d like your information deleted sooner, contact us using the
        details below.
      </LegalParagraph>

      <LegalHeading>Analytics</LegalHeading>
      <LegalParagraph>
        This site uses Vercel Web Analytics to understand aggregate visitor traffic and
        which calls-to-action get used. It is cookieless — it does not set cookies, track
        you across other sites, or build an individual profile of you. See our{" "}
        <Link href="/cookies" className="underline decoration-construction-gold underline-offset-4">
          Cookie Policy
        </Link>{" "}
        for more detail.
      </LegalParagraph>

      <LegalHeading>Your rights</LegalHeading>
      <LegalParagraph>
        You can ask us what information we hold about you, request a correction, or ask us
        to delete it, at any time, by emailing{" "}
        <a href={`mailto:${company.email}`} className="underline decoration-construction-gold underline-offset-4">
          {company.email}
        </a>
        .
      </LegalParagraph>

      <LegalHeading>Contact</LegalHeading>
      <LegalParagraph>
        Questions about this policy can be sent to{" "}
        <a href={`mailto:${company.email}`} className="underline decoration-construction-gold underline-offset-4">
          {company.email}
        </a>{" "}
        or to our office at {company.address.line1}, {company.address.line2},{" "}
        {company.address.line3}.
      </LegalParagraph>
    </LegalPageLayout>
  );
}
