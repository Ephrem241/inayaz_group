import { describe, expect, it } from "vitest";
import { Building2, Container } from "lucide-react";
import {
  adaptArticle,
  adaptDivision,
  adaptMetrics,
  adaptProject,
  adaptService,
  resolveIcon,
} from "./adapters";
import type {
  PortableTextBlock,
  SanityArticle,
  SanityDivision,
  SanityImage,
  SanityProject,
  SanityService,
  SanitySiteSettings,
} from "./types";

function block(text: string, style: "normal" | "h2" | "h3" = "normal"): PortableTextBlock {
  return {
    _type: "block",
    _key: `key-${text.slice(0, 8)}`,
    style,
    children: [{ _type: "span", _key: "span-1", text }],
  };
}

function image(alt: string, lqip?: string): SanityImage {
  return {
    asset: { _ref: "image-abc123-1600x900-jpg", _type: "reference" },
    alt,
    ...(lqip ? { lqip } : {}),
  };
}

describe("resolveIcon", () => {
  it("resolves a known icon name to its component", () => {
    expect(resolveIcon("Building2")).toBe(Building2);
    expect(resolveIcon("Container")).toBe(Container);
  });

  it("falls back to Building2 for an unknown icon name", () => {
    expect(resolveIcon("NotARealIcon")).toBe(Building2);
  });

  it("falls back to Building2 when the name is undefined", () => {
    expect(resolveIcon(undefined)).toBe(Building2);
  });
});

describe("adaptDivision", () => {
  const sanityDivision: SanityDivision = {
    _id: "division-test",
    _updatedAt: "2026-01-01T00:00:00Z",
    title: "Export Trade",
    slug: "export-trade",
    description: [block("Connecting Ethiopian products with international markets.")],
    listLabel: "Products",
    items: ["Coffee and tea", "Oil seeds"],
    icon: "Wheat",
    image: image("Coffee cherries on the branch"),
    featured: false,
  };

  it("flattens portable text description into a plain string", () => {
    const result = adaptDivision(sanityDivision);
    expect(result.description).toBe("Connecting Ethiopian products with international markets.");
  });

  it("maps slug to id and title to name", () => {
    const result = adaptDivision(sanityDivision);
    expect(result.id).toBe("export-trade");
    expect(result.name).toBe("Export Trade");
  });

  it("defaults items to an empty array when undefined", () => {
    const result = adaptDivision({ ...sanityDivision, items: undefined });
    expect(result.items).toEqual([]);
  });

  it("builds an image url carrying the alt text and asset id", () => {
    const result = adaptDivision(sanityDivision);
    expect(result.image.alt).toBe("Coffee cherries on the branch");
    expect(result.image.src).toContain("abc123");
  });
});

describe("adaptService", () => {
  const sanityService: SanityService = {
    _id: "service-test",
    _updatedAt: "2026-01-01T00:00:00Z",
    title: "General Construction",
    slug: "general-construction",
    description: "Full-scope building construction as a Category 1 General Contractor.",
    icon: "HardHat",
    image: image("Tower crane at golden hour"),
    featured: false,
  };

  it("passes description through unchanged (plain text field, not portable text)", () => {
    const result = adaptService(sanityService);
    expect(result.description).toBe(
      "Full-scope building construction as a Category 1 General Contractor.",
    );
  });
});

describe("adaptProject", () => {
  const sanityProject: SanityProject = {
    _id: "project-test",
    _updatedAt: "2026-01-01T00:00:00Z",
    title: "Ameliyaz",
    slug: "ameliyaz",
    client: "Akoya Properties",
    structureType: "2B+G+M+30+T (33 levels)",
    category: "Category 1 General Contractor, GC-1",
    propertyType: "Mixed-Use",
    location: "Sarbet, Addis Ababa",
    description: [block("Landmark high-rise designed to redefine Addis Ababa's skyline.")],
    heroImage: image("Tower crane silhouette at sunset"),
    featured: true,
  };

  it("maps every field to the frontend Project shape", () => {
    const result = adaptProject(sanityProject);
    expect(result).toMatchObject({
      slug: "ameliyaz",
      name: "Ameliyaz",
      client: "Akoya Properties",
      structure: "2B+G+M+30+T (33 levels)",
      category: "Category 1 General Contractor, GC-1",
      propertyType: "Mixed-Use",
      location: "Sarbet, Addis Ababa",
      featured: true,
    });
    expect(result.description).toBe(
      "Landmark high-rise designed to redefine Addis Ababa's skyline.",
    );
  });

  it("converts a missing consultant to null, not undefined", () => {
    const result = adaptProject({ ...sanityProject, consultant: undefined });
    expect(result.consultant).toBeNull();
  });

  it("converts a missing location to null", () => {
    const result = adaptProject({ ...sanityProject, location: undefined });
    expect(result.location).toBeNull();
  });

  it("falls back propertyType to Residential when unset in the Studio", () => {
    const result = adaptProject({ ...sanityProject, propertyType: undefined });
    expect(result.propertyType).toBe("Residential");
  });

  it("defaults client and structure to empty strings when unset", () => {
    const result = adaptProject({ ...sanityProject, client: undefined, structureType: undefined });
    expect(result.client).toBe("");
    expect(result.structure).toBe("");
  });
});

describe("adaptArticle", () => {
  const sanityArticle: SanityArticle = {
    _id: "article-test",
    _updatedAt: "2026-01-01T00:00:00Z",
    title: "Building Ethiopia's Future Through Responsible Construction",
    slug: "building-ethiopias-future-through-responsible-construction",
    excerpt: "Construction is more than building structures.",
    content: [
      block("A Responsibility, Not Just a Project", "h2"),
      block("Every building starts with a responsibility."),
    ],
    author: "INAYAZ",
    publishedAt: "2026-06-06T00:00:00.000Z",
    featured: true,
  };

  it("converts portable text content into heading/paragraph ArticleBlocks", () => {
    const result = adaptArticle(sanityArticle);
    expect(result.body).toEqual([
      { type: "heading", text: "A Responsibility, Not Just a Project" },
      { type: "paragraph", text: "Every building starts with a responsibility." },
    ]);
  });

  it("defaults author to INAYAZ when unset", () => {
    const result = adaptArticle({ ...sanityArticle, author: undefined });
    expect(result.author).toBe("INAYAZ");
  });

  it("omits coverImage when the Sanity document has none", () => {
    const result = adaptArticle(sanityArticle);
    expect(result.coverImage).toBeUndefined();
  });

  it("adapts a coverImage when present", () => {
    const result = adaptArticle({ ...sanityArticle, coverImage: image("Cover photo") });
    expect(result.coverImage?.alt).toBe("Cover photo");
  });
});

describe("adaptMetrics", () => {
  const settings: SanitySiteSettings = {
    _id: "siteSettings",
    contactEmail: "info@inayazgroup.com",
    homepageMetrics: [
      { id: "years-of-experience", label: "Years of Experience", confirmed: true, value: 11 },
      { id: "completed-projects", label: "Completed Projects", confirmed: false },
    ],
  };

  it("maps a confirmed metric to the confirmed status shape", () => {
    const result = adaptMetrics(settings);
    expect(result[0]).toEqual({
      id: "years-of-experience",
      label: "Years of Experience",
      status: "confirmed",
      value: 11,
      suffix: undefined,
    });
  });

  it("maps an unconfirmed metric to the pending status shape, never fabricating a value", () => {
    const result = adaptMetrics(settings);
    expect(result[1]).toEqual({
      id: "completed-projects",
      label: "Completed Projects",
      status: "pending",
    });
  });

  it("treats a confirmed metric with no value as pending rather than crashing", () => {
    const result = adaptMetrics({
      ...settings,
      homepageMetrics: [{ id: "x", label: "X", confirmed: true }],
    });
    expect(result[0].status).toBe("pending");
  });

  it("returns an empty array when settings is null", () => {
    expect(adaptMetrics(null)).toEqual([]);
  });

  it("returns an empty array when homepageMetrics is undefined", () => {
    expect(adaptMetrics({ ...settings, homepageMetrics: undefined })).toEqual([]);
  });
});
