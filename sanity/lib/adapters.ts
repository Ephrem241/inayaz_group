// Anti-corruption layer: converts Sanity document shapes into the exact
// types src/constants/*.ts already defined (Project, Division, Service,
// Article, Metric), so every existing display component keeps working
// unchanged — only page-level data-fetching call sites swap their source
// from a hardcoded constant to a Sanity query + adapter call.
import {
  Building2,
  ClipboardCheck,
  Compass,
  Container,
  DraftingCompass,
  Factory,
  HardHat,
  Landmark,
  PaintRoller,
  PencilRuler,
  Route,
  Settings2,
  Wheat,
  Wrench,
  Building2 as FallbackIcon,
  type LucideIcon,
} from "lucide-react";
import type { Division } from "@/constants/divisions";
import type { Service } from "@/constants/services";
import type { Project } from "@/constants/projects";
import type { Article, ArticleBlock } from "@/constants/articles";
import type { Metric } from "@/constants/metrics";
import type { Recognition } from "@/constants/recognition";
import { urlForImage } from "./image";
import type {
  PortableTextBlock,
  SanityDivision,
  SanityImage,
  SanityProject,
  SanityArticle,
  SanityRecognition,
  SanityService,
  SanitySiteSettings,
} from "./types";

// Every icon name actually used across DIVISIONS/SERVICES today (verified
// against src/constants/divisions.ts and services.ts) — editors pick from
// this fixed set in the Studio (schema field description names it as
// free text, but only these names resolve to a real icon; anything else
// falls back to Building2 rather than crashing).
const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Wheat,
  Container,
  Factory,
  Compass,
  Wrench,
  HardHat,
  PencilRuler,
  Landmark,
  Route,
  ClipboardCheck,
  DraftingCompass,
  PaintRoller,
  Settings2,
};

export function resolveIcon(name: string | undefined): LucideIcon {
  return (name && ICON_MAP[name]) || FallbackIcon;
}

function portableTextToPlainText(blocks: PortableTextBlock[] | undefined): string {
  if (!blocks) return "";
  return blocks
    .map((block) => block.children.map((child) => child.text).join(""))
    .join("\n\n");
}

function portableTextToArticleBlocks(blocks: PortableTextBlock[] | undefined): ArticleBlock[] {
  if (!blocks) return [];
  return blocks.map((block) => ({
    type: block.style === "h2" || block.style === "h3" ? "heading" : "paragraph",
    text: block.children.map((child) => child.text).join(""),
  }));
}

// Capped at a generous max width — next/image's own responsive srcset
// (driven by each consumer's `sizes` prop) still requests smaller variants
// through Next's built-in image optimizer; this just bounds the source
// asset Sanity's CDN serves as the largest available rendition.
function sanityImageToImage(image: SanityImage): { src: string; alt: string; blurDataURL?: string } {
  return {
    src: urlForImage(image).width(2000).quality(85).auto("format").url(),
    alt: image.alt,
    blurDataURL: image.lqip,
  };
}

export function adaptDivision(division: SanityDivision): Division {
  return {
    id: division.slug,
    name: division.title,
    description: portableTextToPlainText(division.description),
    listLabel: division.listLabel,
    items: division.items ?? [],
    icon: resolveIcon(division.icon),
    image: sanityImageToImage(division.image),
  };
}

export function adaptService(service: SanityService): Service {
  return {
    id: service.slug,
    name: service.title,
    description: service.description,
    icon: resolveIcon(service.icon),
    image: sanityImageToImage(service.image),
  };
}

export function adaptProject(project: SanityProject): Project {
  return {
    slug: project.slug,
    name: project.title,
    client: project.client ?? "",
    structure: project.structureType ?? "",
    consultant: project.consultant ?? null,
    category: project.category,
    // Falls back to "Residential" only for the type system's sake — every
    // seeded project sets this explicitly; a genuinely unset value here
    // would mean a Studio entry is incomplete, not a real "no type" state.
    propertyType: project.propertyType ?? "Residential",
    location: project.location ?? null,
    description: portableTextToPlainText(project.description),
    featured: project.featured,
    image: sanityImageToImage(project.heroImage),
    // Previously stripped here despite existing in the schema/GROQ query —
    // now surfaced so the frontend can render real values once client-
    // confirmed, instead of a hardcoded "Pending confirmation" (Phase D).
    status: project.status ?? null,
    completionYear: project.completionYear ?? null,
    builtArea: project.builtArea ?? null,
    units: project.units ?? null,
    gallery: project.gallery?.map(sanityImageToImage) ?? [],
    services: project.services ?? null,
    // Real Estate detail fields — all optional, hidden on the frontend when
    // absent rather than fabricated.
    unitTypes: project.unitTypes ?? null,
    amenities: project.amenities ?? null,
    pricingNote: project.pricingNote ?? null,
    paymentPlanNote: project.paymentPlanNote ?? null,
    brochureUrl: project.brochureUrl ?? null,
    salesContact: project.salesContact ?? null,
  };
}

export function adaptArticle(article: SanityArticle): Article {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    body: portableTextToArticleBlocks(article.content),
    author: article.author ?? "INAYAZ",
    publishedAt: article.publishedAt,
    category: article.category,
    featured: article.featured,
    coverImage: article.coverImage ? sanityImageToImage(article.coverImage) : undefined,
  };
}

// Only "published" metrics with a real value reach the frontend at all —
// draft/verified metrics are filtered out here, not rendered as a
// placeholder (Metrics.tsx has no pending-state UI to feed).
export function adaptMetrics(settings: SanitySiteSettings | null): Metric[] {
  if (!settings?.homepageMetrics) return [];
  return settings.homepageMetrics
    .filter(
      (metric): metric is typeof metric & { value: number } =>
        metric.status === "published" && metric.value !== undefined,
    )
    .map((metric) => ({
      id: metric.id,
      label: metric.label,
      value: metric.value,
      suffix: metric.suffix,
    }));
}

export function adaptRecognition(recognition: SanityRecognition): Recognition {
  return {
    id: recognition._id,
    eyebrow: recognition.eyebrow ?? "",
    name: recognition.name,
    description: recognition.description,
    logo:
      recognition.logoApproved && recognition.logo
        ? sanityImageToImage(recognition.logo)
        : undefined,
  };
}
