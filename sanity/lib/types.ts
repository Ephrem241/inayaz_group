// Hand-written types matching sanity/schemas/ exactly, rather than
// `sanity typegen` output — this project's constants files (Project,
// Division, Service, Article) have all been hand-typed the same way, and
// typegen needs a deployed schema + real dataset to introspect, which isn't
// available yet (CORS/connection still pending manual setup, Step 22).
// Revisit typegen once the project is genuinely live.

export type SanityImage = {
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt: string;
};

export type PortableTextBlock = {
  _type: "block";
  _key: string;
  style?: string;
  children: { _type: "span"; _key: string; text: string; marks?: string[] }[];
  markDefs?: unknown[];
};

export type SanityProject = {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: string;
  client?: string;
  contractor?: string;
  consultant?: string;
  structureType?: string;
  category: string;
  propertyType?: "Residential" | "Commercial" | "Mixed-Use";
  location?: string;
  status?: "Completed" | "Ongoing" | "Upcoming";
  startYear?: number;
  completionYear?: number;
  shortDescription?: string;
  description: PortableTextBlock[];
  heroImage: SanityImage;
  gallery?: SanityImage[];
  services?: string[];
  builtArea?: string;
  units?: number;
  featured: boolean;
  orderRank?: number;
};

export type SanityDivision = {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: string;
  description: PortableTextBlock[];
  listLabel: string;
  items?: string[];
  icon?: string;
  image: SanityImage;
  featured: boolean;
};

export type SanityService = {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: string;
  description: string;
  image: SanityImage;
  icon?: string;
  featured: boolean;
};

export type SanityArticle = {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: string;
  excerpt: string;
  content: PortableTextBlock[];
  coverImage?: SanityImage;
  category?: string;
  author?: string;
  publishedAt: string;
  featured: boolean;
};

export type SanitySiteSettings = {
  _id: string;
  contactEmail: string;
  contactPhones?: string[];
  address?: string;
  socialLinks?: { platform: string; url: string }[];
  homepageMetrics?: {
    id: string;
    label: string;
    confirmed: boolean;
    value?: number;
    suffix?: string;
  }[];
  footerTagline?: string;
  footerDescription?: string;
  featuredProjects?: SanityProject[];
};

export type ProjectListFilters = {
  category?: string;
  status?: SanityProject["status"];
  location?: string;
  year?: number;
  limit?: number;
  offset?: number;
};

export type ArticleListFilters = {
  category?: string;
  limit?: number;
  offset?: number;
};
