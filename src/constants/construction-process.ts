export type ProcessStage = {
  id: string;
  number: string;
  name: string;
  description: string;
  image: { src: string; alt: string };
};

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: "vision",
    number: "01",
    name: "Vision",
    description: "Defining the project's purpose, scope, and long-term goals before design begins.",
    image: {
      src: "/images/process/placeholder-process-vision.jpg",
      alt: "Architectural scale model of miniature buildings on a studio table",
    },
  },
  {
    id: "planning",
    number: "02",
    name: "Planning",
    description: "Establishing budgets, timelines, permits, and resource plans that guide execution.",
    image: {
      src: "/images/process/placeholder-process-planning.jpg",
      alt: "Worker reviewing a floor-plan blueprint on an unfinished site",
    },
  },
  {
    id: "engineering",
    number: "03",
    name: "Engineering",
    description: "Translating design intent into structural, mechanical, and technical specifications.",
    image: {
      src: "/images/process/placeholder-process-engineering.jpg",
      alt: "Workers handling bundled structural rebar at a mid-construction site",
    },
  },
  {
    id: "construction",
    number: "04",
    name: "Construction",
    description: "Executing the build with disciplined site management, sequencing, and safety.",
    image: {
      src: "/images/process/placeholder-process-construction.jpg",
      alt: "Multiple tower cranes silhouetted against a dramatic dusk sky",
    },
  },
  {
    id: "quality-control",
    number: "05",
    name: "Quality Control",
    description: "Verifying materials, workmanship, and systems meet specification at every stage.",
    image: {
      src: "/images/process/placeholder-process-quality-control.jpg",
      alt: "Worker closely checking entries in a paper checklist on site",
    },
  },
  {
    id: "delivery",
    number: "06",
    name: "Delivery",
    description: "Handing over a completed, inspected, and fully operational project to the client.",
    image: {
      src: "/images/process/placeholder-process-delivery.jpg",
      alt: "Low-angle view of a finished modern high-rise's geometric facade",
    },
  },
];
