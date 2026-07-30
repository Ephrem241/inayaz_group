export type MetricStatus = "draft" | "verified" | "published";

// Seed-shape catalog — mirrors the Sanity siteSettings.homepageMetrics
// schema field-for-field so sanity/seed.mts can map it 1:1. Only entries
// with status "published" ever reach the live site (see adaptMetrics in
// sanity/lib/adapters.ts) — draft/verified exist purely as an internal
// review workflow, never rendered.
export type MetricSeed = {
  id: string;
  label: string;
  status: MetricStatus;
  value?: number;
  suffix?: string;
};

export const FOUNDED_YEAR = 2015;
// Computed, not hardcoded, so this never goes stale as the calendar year
// changes (CLAUDE.md: "11 years of experience, if calculated correctly for
// the current year").
export const YEARS_OF_EXPERIENCE = new Date().getFullYear() - FOUNDED_YEAR;

export const METRICS: MetricSeed[] = [
  {
    id: "years-of-experience",
    label: "Years of Experience",
    status: "published",
    value: YEARS_OF_EXPERIENCE,
  },
  { id: "completed-projects", label: "Completed Projects", status: "draft" },
  { id: "active-developments", label: "Active Developments", status: "draft" },
  { id: "skilled-professionals", label: "Skilled Professionals", status: "draft" },
  { id: "cities-served", label: "Cities Served", status: "draft" },
  { id: "total-built-area", label: "Total Built Area", status: "draft" },
];

// What actually reaches the browser — only ever published metrics, so no
// "pending"/placeholder variant exists in this type at all.
export type Metric = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
};
