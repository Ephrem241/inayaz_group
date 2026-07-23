export type ProcessStage = {
  id: string;
  number: string;
  name: string;
  description: string;
};

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: "vision",
    number: "01",
    name: "Vision",
    description: "Defining the project's purpose, scope, and long-term goals before design begins.",
  },
  {
    id: "planning",
    number: "02",
    name: "Planning",
    description: "Establishing budgets, timelines, permits, and resource plans that guide execution.",
  },
  {
    id: "engineering",
    number: "03",
    name: "Engineering",
    description: "Translating design intent into structural, mechanical, and technical specifications.",
  },
  {
    id: "construction",
    number: "04",
    name: "Construction",
    description: "Executing the build with disciplined site management, sequencing, and safety.",
  },
  {
    id: "quality-control",
    number: "05",
    name: "Quality Control",
    description: "Verifying materials, workmanship, and systems meet specification at every stage.",
  },
  {
    id: "delivery",
    number: "06",
    name: "Delivery",
    description: "Handing over a completed, inspected, and fully operational project to the client.",
  },
];
