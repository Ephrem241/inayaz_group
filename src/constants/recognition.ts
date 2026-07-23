export type Recognition = {
  id: string;
  eyebrow: string;
  name: string;
  description: string;
  pendingNote?: string;
};

export const RECOGNITIONS: Recognition[] = [
  {
    id: "cbe",
    eyebrow: "A Proven Partner",
    name: "Commercial Bank of Ethiopia (CBE)",
    description:
      "Commercial Bank of Ethiopia formally recognizes INAYAZ for its exemplary record of financial responsibility, integrity, and disciplined business operations.",
    pendingNote: "Certificate publication pending final scans and logo usage permission from CBE.",
  },
  {
    id: "coop",
    eyebrow: "Recommended By",
    name: "COOP",
    description:
      "COOP formally recognizes INAYAZ for its exemplary record of financial responsibility, integrity, and disciplined business operations.",
    pendingNote: "Certificate publication pending final scans and logo usage permission from COOP.",
  },
  {
    id: "gc1",
    eyebrow: "Industry Classification",
    name: "Category 1 General Contractor (GC-1)",
    description:
      "As a Category 1 General Contractor, INAYAZ brings proven technical knowledge, professional leadership, and construction capability to every project.",
  },
];
