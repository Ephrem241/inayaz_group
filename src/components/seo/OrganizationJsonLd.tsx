import { SITE_URL } from "@/constants/site";
import type { SanitySiteSettings } from "../../../sanity/lib/types";

type OrganizationJsonLdProps = {
  settings: SanitySiteSettings | null;
};

// GeneralContractor is schema.org's own subtype of LocalBusiness (itself a
// subtype of Organization), so one accurate block here satisfies both the
// "Organization schema" and "Local business schema" requirements — INAYAZ
// is a verified Category 1 General Contractor, so this isn't a stretch fit.
// Sourced from live Sanity siteSettings rather than hardcoded so it stays
// correct if an editor updates contact details in the Studio.
export function OrganizationJsonLd({ settings }: OrganizationJsonLdProps) {
  if (!settings) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "INAYAZ Group",
    url: SITE_URL,
    email: settings.contactEmail,
    ...(settings.contactPhones?.[0] ? { telephone: settings.contactPhones[0] } : {}),
    ...(settings.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: settings.address.replace(/\n+/g, ", "),
            addressLocality: "Addis Ababa",
            addressCountry: "ET",
          },
        }
      : {}),
  };

  return (
    // Sourced from the site's own trusted Sanity dataset, not user input —
    // no XSS risk from injecting it directly here.
    <script
      type="application/ld+json"
      data-json-ld="organization"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
