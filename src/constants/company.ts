// Centralized brand/legal identity — use `brandName` for navigation,
// marketing copy, and Open Graph; `legalName` only for copyright lines and
// legal documents (privacy/terms/cookies). Both are confirmed values from
// the company profile (CLAUDE.md §3, §39) — not placeholders.
export const company = {
  brandName: "INAYAZ Group",
  legalName: "INAYAZ Construction and Material Import Export",
  shortName: "INAYAZ",
  email: "info@inayazgroup.com",
  phones: ["+251 973 223 312", "+251 968 666 664"],
  address: {
    line1: "ZULYEKA Building",
    line2: "6th Floor, Office 603",
    line3: "Addis Ababa, Ethiopia",
  },
} as const;
