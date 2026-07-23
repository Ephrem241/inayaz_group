import { Building2, Compass, Container, Factory, Wheat, Wrench, type LucideIcon } from "lucide-react";

export type Division = {
  id: string;
  name: string;
  description: string;
  listLabel: string;
  items: string[];
  icon: LucideIcon;
  image: { src: string; alt: string };
};

export const DIVISIONS: Division[] = [
  {
    id: "construction-real-estate",
    name: "Construction and Real Estate",
    description:
      "INAYAZ Construction and Real Estate combines technical expertise, financial reliability, and modern development thinking to deliver high-quality projects across Ethiopia. From complex high-rise construction to premium residential and commercial developments, we build structures designed for performance, comfort, and enduring investment value.",
    listLabel: "Services",
    items: [
      "Category 1 General Contracting (GC-1)",
      "High-rise construction",
      "Residential development",
      "Commercial development",
      "Real estate development",
      "Project management",
      "Machinery and equipment rental",
    ],
    icon: Building2,
    image: {
      src: "/images/divisions/placeholder-division-construction.jpg",
      alt: "Low-angle view of a tower crane against a golden-hour sky above a scaffolded building facade",
    },
  },
  {
    id: "export-trade",
    name: "Export Trade",
    description:
      "INAYAZ Export Trade connects high-value Ethiopian agricultural products with international markets through reliable sourcing, quality control, and market-driven trade operations.",
    listLabel: "Products",
    items: ["Coffee and tea", "Oil seeds", "Cereals and pulses", "Fruits and vegetables", "Spices"],
    icon: Wheat,
    image: {
      src: "/images/divisions/placeholder-division-export.jpg",
      alt: "Close-up of ripening coffee cherries, green to red, on the branch",
    },
  },
  {
    id: "import",
    name: "Import",
    description:
      "INAYAZ Import provides contractors, manufacturers, developers, and industrial operators with reliable access to internationally sourced equipment, materials, vehicles, and technical products.",
    listLabel: "Categories",
    items: [
      "Vehicles",
      "Industrial machinery",
      "Construction machinery",
      "Electrical equipment",
      "Metal materials",
      "Non-metal scraps",
    ],
    icon: Container,
    image: {
      src: "/images/divisions/placeholder-division-import.jpg",
      alt: "Close-up detail of precision industrial metal machinery and piping",
    },
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description:
      "INAYAZ Manufacturing produces essential metal, clay, and ceramic products supporting Ethiopia's construction and industrial sectors.",
    listLabel: "Products",
    items: [
      "Primary nonferrous metal products",
      "Structural clay products",
      "Ceramic products",
      "Custom manufacturing orders",
    ],
    icon: Factory,
    image: {
      src: "/images/divisions/placeholder-division-manufacturing.jpg",
      alt: "A welder mid-task with sparks flying, face fully covered by a welding helmet",
    },
  },
  {
    id: "tour-operation-travel",
    name: "Tour Operation and Travel",
    description:
      "INAYAZ Tour Operation and Travel delivers curated journeys and professional travel services that showcase Ethiopia's cultural heritage, natural landscapes, and historic destinations.",
    listLabel: "Services",
    items: ["Historical and heritage tours", "Nature and wildlife tours", "Cultural immersion experiences"],
    icon: Compass,
    image: {
      src: "/images/divisions/placeholder-division-travel.jpg",
      alt: "Terraced Ethiopian highland escarpment near Lalibela with traditional round huts in the valley",
    },
  },
  {
    id: "machinery-equipment-rental",
    name: "Machinery and Equipment Rental",
    description:
      "INAYAZ provides flexible machinery and equipment rental solutions that help contractors, agricultural operators, and industrial businesses execute projects efficiently without the cost of long-term ownership.",
    listLabel: "Rental categories",
    items: [
      "Heavy construction machinery",
      "Construction equipment",
      "Construction materials",
      "Agricultural machinery",
      "Industrial machinery",
    ],
    icon: Wrench,
    image: {
      src: "/images/divisions/placeholder-division-rental.jpg",
      alt: "Three excavators silhouetted against a deep blue twilight sky",
    },
  },
];
