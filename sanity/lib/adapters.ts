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
import { urlForImage } from "./image";
import type {
  PortableTextBlock,
  SanityDivision,
  SanityImage,
  SanityProject,
  SanityArticle,
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
function sanityImageToImage(image: SanityImage): { src: string; alt: string } {
  return {
    src: urlForImage(image).width(2000).quality(85).auto("format").url(),
    alt: image.alt,
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

export function adaptMetrics(settings: SanitySiteSettings | null): Metric[] {
  if (!settings?.homepageMetrics) return [];
  return settings.homepageMetrics.map((metric) =>
    metric.confirmed && metric.value !== undefined
      ? {
          id: metric.id,
          label: metric.label,
          status: "confirmed" as const,
          value: metric.value,
          suffix: metric.suffix,
        }
      : { id: metric.id, label: metric.label, status: "pending" as const },
  );
}
