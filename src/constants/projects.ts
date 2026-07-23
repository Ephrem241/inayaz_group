export type Project = {
  slug: string;
  name: string;
  client: string;
  structure: string;
  consultant: string | null;
  category: string;
  // Editorially derived from each project's existing description text
  // (not a client-confirmed field) — see Phase 4 Step 18.
  propertyType: "Residential" | "Commercial" | "Mixed-Use";
  location: string | null;
  description: string;
  featured: boolean;
  image: { src: string; alt: string };
};

export const CONTRACTOR = "INAYAZ Construction and Material Import Export";

export const LEVEL_LEGEND =
  "B = Basement · SB = Sub-Basement · G = Ground · M = Mezzanine · T = Terrace";

export const PROJECTS: Project[] = [
  {
    slug: "ameliyaz",
    name: "Ameliyaz",
    client: "Akoya Properties",
    structure: "2B+G+M+30+T (33 levels)",
    consultant: "KH Consulting",
    category: "Category 1 General Contractor, GC-1",
    propertyType: "Mixed-Use",
    location: "Sarbet, Addis Ababa",
    description:
      "Landmark high-rise designed to redefine Addis Ababa's skyline — 2 basements, ground, mezzanine, 30 stories, and terrace — blending premium corporate and residential spaces with advanced structural design and world-class engineering execution.",
    featured: true,
    image: {
      src: "/images/projects/placeholder-project-ameliyaz.jpg",
      alt: "Silhouette of a tower crane and an in-progress high-rise structure at sunset",
    },
  },
  {
    slug: "gold-souq",
    name: "Gold Souq",
    client: "Akoya Properties",
    structure: "14 levels",
    consultant: null,
    category: "Category 1 General Contractor, GC-1",
    propertyType: "Commercial",
    location: "4 Kilo district, Addis Ababa",
    description:
      "A landmark of luxury, prestige, and promise in the heart of Addis Ababa's 4 Kilo district — 14 levels of vibrant retail spaces designed for visibility, value, and success, executed with the structural precision and commercial fit-out scale of a Category 1 General Contractor.",
    featured: true,
    image: {
      src: "/images/projects/placeholder-project-gold-souq.jpg",
      alt: "Generic mid-rise concrete structure with scaffolding under construction",
    },
  },
  {
    slug: "akoya-ozone",
    name: "Akoya Ozone",
    client: "Akoya Properties",
    structure: "2B+G+M+16+T (19 levels)",
    consultant: "KH Consulting",
    category: "Category 1 General Contractor, GC-1",
    propertyType: "Residential",
    location: null,
    description:
      "Premium high-density residential development in the heart of Addis Ababa, emphasizing modern spatial efficiency, luxurious residential comfort, and robust structural durability.",
    featured: true,
    image: {
      src: "/images/projects/placeholder-project-akoya-ozone.jpg",
      alt: "Close-up of coiled steel rebar",
    },
  },
  {
    slug: "tes-realty",
    name: "Tes Realty",
    client: "Mr. Daniel Tesfaye",
    structure: "1B+G+17 (19 levels)",
    consultant: "KH Consulting",
    category: "Category 1 General Contractor, GC-1",
    propertyType: "Residential",
    location: null,
    description:
      "Modern high-rise residential development for Mr. Daniel Tesfaye focused on spatial efficiency, contemporary architectural aesthetics, structural longevity, and strict safety compliance.",
    featured: false,
    image: {
      src: "/images/projects/placeholder-project-tes-realty.jpg",
      alt: "Abstract close-up of a woven metal mesh screen",
    },
  },
  {
    slug: "twinz",
    name: "Twinz",
    client: "Akoya Properties",
    structure: "B+G+M+12 (15 levels)",
    consultant: "KH Consulting",
    category: "Category 1 General Contractor, GC-1",
    propertyType: "Residential",
    location: null,
    description:
      "A residential development for Akoya Properties, delivered to the same structural and quality standards as INAYAZ's other Akoya Properties towers.",
    featured: false,
    image: {
      src: "/images/projects/placeholder-project-twinz.jpg",
      alt: "Close-up of a weathered gray concrete surface",
    },
  },
  {
    slug: "park-view",
    name: "Park View",
    client: "Akoya Properties",
    structure: "SB+1B+G+12 (15 levels)",
    consultant: "KH Consulting",
    category: "Category 1 General Contractor, GC-1",
    propertyType: "Residential",
    location: null,
    description:
      "Elite high-rise residential development designed to overlook the urban landscape, blending luxury high-density living with advanced structural design, exceptional spatial layout, and high-end modern amenities.",
    featured: false,
    image: {
      src: "/images/projects/placeholder-project-park-view.jpg",
      alt: "Scaffolding silhouetted against a dramatic sunset sky",
    },
  },
  {
    slug: "novelty",
    name: "Novelty",
    client: "Akoya Properties",
    structure: "3B+G+18 (22 levels)",
    consultant: "KH Consulting",
    category: "Category 1 General Contractor, GC-1",
    propertyType: "Residential",
    location: null,
    description:
      "Architectural landmark of premier high-rise residential luxury — a symbol of contemporary urban living and sophisticated structural engineering with exceptional spatial planning and maximum structural durability.",
    featured: false,
    image: {
      src: "/images/projects/placeholder-project-novelty.jpg",
      alt: "Symmetric low-angle view of a bolted structural steel beam junction against the sky",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getRelatedProjects(current: Project, limit = 3): Project[] {
  return PROJECTS.filter((project) => project.slug !== current.slug)
    .sort(
      (a, b) =>
        Number(b.propertyType === current.propertyType) -
        Number(a.propertyType === current.propertyType),
    )
    .slice(0, limit);
}
