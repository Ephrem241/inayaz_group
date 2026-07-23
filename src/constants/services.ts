import {
  HardHat,
  PencilRuler,
  Landmark,
  Route,
  ClipboardCheck,
  DraftingCompass,
  PaintRoller,
  Settings2,
  Wrench,
  Container,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  image: { src: string; alt: string };
};

export const SERVICES: Service[] = [
  {
    id: "general-construction",
    name: "General Construction",
    description:
      "Executing full-scope building construction as a Category 1 General Contractor, from groundwork through structural completion.",
    icon: HardHat,
    image: {
      src: "/images/divisions/placeholder-division-construction.jpg",
      alt: "Low-angle view of a tower crane against a golden-hour sky above a scaffolded building facade",
    },
  },
  {
    id: "design-build",
    name: "Design and Build",
    description:
      "Carrying a project from design development through construction under one accountable, single-source team.",
    icon: PencilRuler,
    image: {
      src: "/images/services/placeholder-service-design-build.jpg",
      alt: "Overlapping architectural floor plans and technical drawings spread across a table",
    },
  },
  {
    id: "real-estate-development",
    name: "Real Estate Development",
    description:
      "Developing residential and commercial property from concept through delivery as a finished, market-ready asset.",
    icon: Landmark,
    image: {
      src: "/images/services/placeholder-service-real-estate-development.jpg",
      alt: "Close-up of a modern high-rise residential facade with rows of balconies at golden hour",
    },
  },
  {
    id: "infrastructure-development",
    name: "Infrastructure Development",
    description:
      "Delivering the civil and infrastructure works that support roads, utilities, and site access around a development.",
    icon: Route,
    image: {
      src: "/images/services/placeholder-service-infrastructure-development.jpg",
      alt: "Aerial view of a new road curb and a framed house structure on a development site",
    },
  },
  {
    id: "project-management",
    name: "Project Management",
    description:
      "Coordinating planning, scheduling, and site oversight to keep budget, timeline, and quality aligned from start to finish.",
    icon: ClipboardCheck,
    image: {
      src: "/images/services/placeholder-service-project-management.jpg",
      alt: "Two construction supervisors in hard hats and high-visibility vests reviewing a clipboard on site",
    },
  },
  {
    id: "engineering-consultancy",
    name: "Engineering Consultancy",
    description:
      "Coordinating structural, technical, and design consultancy input so engineering decisions stay aligned with construction execution.",
    icon: DraftingCompass,
    image: {
      src: "/images/services/placeholder-service-engineering-consultancy.jpg",
      alt: "Close-up of an abstract radial structural drawing with numbered grid lines",
    },
  },
  {
    id: "interior-fit-out",
    name: "Interior Fit-Out",
    description:
      "Finishing interior spaces so a completed structure becomes fully functional and move-in ready.",
    icon: PaintRoller,
    image: {
      src: "/images/services/placeholder-service-interior-fit-out.jpg",
      alt: "Interior under renovation with exposed metal stud framing, insulation, and stacked drywall sheets",
    },
  },
  {
    id: "facility-management",
    name: "Facility Management",
    description:
      "Supporting building operations and maintenance after handover to protect a property's condition and value.",
    icon: Settings2,
    image: {
      src: "/images/services/placeholder-service-facility-management.jpg",
      alt: "Monochrome shot of a technician in a safety vest inspecting overhead industrial pipework",
    },
  },
  {
    id: "machinery-rental",
    name: "Machinery Rental",
    description:
      "Providing flexible access to construction and industrial machinery without the cost of ownership.",
    icon: Wrench,
    image: {
      src: "/images/divisions/placeholder-division-rental.jpg",
      alt: "Three excavators silhouetted against a deep blue twilight sky",
    },
  },
  {
    id: "import-supply",
    name: "Import and Supply",
    description:
      "Sourcing and importing equipment, materials, and vehicles for contractors, developers, and industrial operators.",
    icon: Container,
    image: {
      src: "/images/divisions/placeholder-division-import.jpg",
      alt: "Close-up detail of precision industrial metal machinery and piping",
    },
  },
];
