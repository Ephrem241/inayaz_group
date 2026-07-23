export type ExecutionScopeStage = {
  id: string;
  number: string;
  name: string;
  description: string;
};

export const EXECUTION_SCOPE_STAGES: ExecutionScopeStage[] = [
  {
    id: "site-preparation",
    number: "01",
    name: "Site Preparation",
    description: "Clearing, surveying, and preparing the site ahead of foundation work.",
  },
  {
    id: "structural-construction",
    number: "02",
    name: "Structural Construction",
    description:
      "Casting foundations, columns, and floor slabs to bring the structure to height.",
  },
  {
    id: "high-rise-execution",
    number: "03",
    name: "High-Rise Execution",
    description:
      "Executing upper-level structural and envelope work specific to high-rise sequencing.",
  },
  {
    id: "quality-control",
    number: "04",
    name: "Quality Control",
    description: "Verifying materials, workmanship, and systems meet specification at every stage.",
  },
];
