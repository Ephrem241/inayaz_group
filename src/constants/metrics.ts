export type Metric =
  | { id: string; label: string; status: "confirmed"; value: number; suffix?: string }
  | { id: string; label: string; status: "pending" };

export const METRICS: Metric[] = [
  { id: "years-of-experience", label: "Years of Experience", status: "confirmed", value: 11 },
  { id: "completed-projects", label: "Completed Projects", status: "pending" },
  { id: "active-developments", label: "Active Developments", status: "pending" },
  { id: "skilled-professionals", label: "Skilled Professionals", status: "pending" },
  { id: "cities-served", label: "Cities Served", status: "pending" },
  { id: "total-built-area", label: "Total Built Area", status: "pending" },
];
