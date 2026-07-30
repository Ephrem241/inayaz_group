import { DIVISIONS } from "@/constants/divisions";

export type ServiceInterest = {
  id: string;
  label: string;
};

// Mirrors DIVISIONS, plus a distinct "real-estate" option — a property
// buyer/visitor and a construction client both relate to the same
// Construction and Real Estate division, but the contact form needs to tell
// them apart to show the right follow-up fields (Phase E).
export const SERVICE_INTERESTS: ServiceInterest[] = [
  ...DIVISIONS.map((division) => ({ id: division.id, label: division.name })),
  { id: "real-estate", label: "Real Estate (Buying/Visiting)" },
];
