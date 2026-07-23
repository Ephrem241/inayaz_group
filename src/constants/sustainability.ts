export type SustainabilityTopic = {
  id: string;
  number: string;
  name: string;
  description: string;
};

export const SUSTAINABILITY_TOPICS: SustainabilityTopic[] = [
  {
    id: "environmental-responsibility",
    number: "01",
    name: "Environmental responsibility",
    description:
      "Minimizing environmental impact through careful site management and responsible construction practices.",
  },
  {
    id: "sustainable-materials",
    number: "02",
    name: "Sustainable materials",
    description:
      "Selecting materials for durability and reduced environmental impact without compromising quality.",
  },
  {
    id: "energy-efficient-construction",
    number: "03",
    name: "Energy-efficient construction",
    description: "Designing and building with energy performance in mind, from insulation to system efficiency.",
  },
  {
    id: "worker-safety",
    number: "04",
    name: "Worker safety",
    description: "Rigorous safety standards and training to protect every person on every site.",
  },
  {
    id: "community-impact",
    number: "05",
    name: "Community impact",
    description: "Building in ways that respect and support the communities where we work.",
  },
  {
    id: "long-term-asset-value",
    number: "06",
    name: "Long-term asset value",
    description: "Constructing assets built to last, retaining value for owners and communities well beyond delivery.",
  },
  {
    id: "responsible-sourcing",
    number: "07",
    name: "Responsible sourcing",
    description: "Materials and suppliers selected for quality, ethics, and long-term reliability.",
  },
];
