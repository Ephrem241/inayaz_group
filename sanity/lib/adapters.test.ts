import { describe, expect, it } from "vitest";
import { Building2, Container } from "lucide-react";
import {
  adaptArticle,
  adaptDivision,
  adaptMetrics,
  adaptProject,
  adaptRecognition,
  adaptService,
  resolveIcon,
} from "./adapters";
import type {
  PortableTextBlock,
  SanityArticle,
  SanityDivision,
  SanityImage,
  SanityProject,
  SanityRecognition,
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

  it("converts unset status/completionYear/builtArea/units to null, never fabricating a value", () => {
    const result = adaptProject(sanityProject);
    expect(result.status).toBeNull();
    expect(result.completionYear).toBeNull();
    expect(result.builtArea).toBeNull();
    expect(result.units).toBeNull();
  });

  it("surfaces status/completionYear/builtArea/units once set in Sanity", () => {
    const result = adaptProject({
      ...sanityProject,
      status: "Ongoing",
      completionYear: 2027,
      builtArea: "12,400 m²",
      units: 220,
    });
    expect(result.status).toBe("Ongoing");
    expect(result.completionYear).toBe(2027);
    expect(result.builtArea).toBe("12,400 m²");
    expect(result.units).toBe(220);
  });

  it("defaults gallery to an empty array and services to null when unset", () => {
    const result = adaptProject(sanityProject);
    expect(result.gallery).toEqual([]);
    expect(result.services).toBeNull();
  });

  it("defaults every real-estate detail field to null when unset", () => {
    const result = adaptProject(sanityProject);
    expect(result.unitTypes).toBeNull();
    expect(result.amenities).toBeNull();
    expect(result.pricingNote).toBeNull();
    expect(result.paymentPlanNote).toBeNull();
    expect(result.brochureUrl).toBeNull();
    expect(result.salesContact).toBeNull();
  });

  it("surfaces real-estate detail fields once set in Sanity", () => {
    const result = adaptProject({
      ...sanityProject,
      unitTypes: ["Studio", "2 Bedroom"],
      amenities: ["Rooftop terrace", "Underground parking"],
      pricingNote: "Starting from $120,000",
      paymentPlanNote: "30% down, balance over 24 months.",
      brochureUrl: "https://cdn.sanity.io/files/x/y/brochure.pdf",
      salesContact: "sales@inayazgroup.com",
    });
    expect(result.unitTypes).toEqual(["Studio", "2 Bedroom"]);
    expect(result.amenities).toEqual(["Rooftop terrace", "Underground parking"]);
    expect(result.pricingNote).toBe("Starting from $120,000");
    expect(result.paymentPlanNote).toBe("30% down, balance over 24 months.");
    expect(result.brochureUrl).toBe("https://cdn.sanity.io/files/x/y/brochure.pdf");
    expect(result.salesContact).toBe("sales@inayazgroup.com");
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
      { id: "years-of-experience", label: "Years of Experience", status: "published", value: 11 },
      { id: "completed-projects", label: "Completed Projects", status: "draft" },
      { id: "active-developments", label: "Active Developments", status: "verified" },
    ],
  };

  it("maps a published metric with a value to the frontend shape", () => {
    const result = adaptMetrics(settings);
    expect(result).toEqual([
      {
        id: "years-of-experience",
        label: "Years of Experience",
        value: 11,
        suffix: undefined,
      },
    ]);
  });

  it("excludes draft and verified metrics entirely — never a placeholder, never rendered", () => {
    const result = adaptMetrics(settings);
    expect(result.find((metric) => metric.id === "completed-projects")).toBeUndefined();
    expect(result.find((metric) => metric.id === "active-developments")).toBeUndefined();
  });

  it("excludes a published metric that has no value rather than crashing", () => {
    const result = adaptMetrics({
      ...settings,
      homepageMetrics: [{ id: "x", label: "X", status: "published" }],
    });
    expect(result).toEqual([]);
  });

  it("returns an empty array when settings is null", () => {
    expect(adaptMetrics(null)).toEqual([]);
  });

  it("returns an empty array when homepageMetrics is undefined", () => {
    expect(adaptMetrics({ ...settings, homepageMetrics: undefined })).toEqual([]);
  });
});

describe("adaptRecognition", () => {
  const base: SanityRecognition = {
    _id: "recognition-gc1",
    name: "Category 1 General Contractor (GC-1)",
    eyebrow: "Industry Classification",
    description: "As a Category 1 General Contractor...",
    status: "published",
    logoApproved: false,
  };

  it("maps a published item with no logo", () => {
    const result = adaptRecognition(base);
    expect(result).toEqual({
      id: "recognition-gc1",
      eyebrow: "Industry Classification",
      name: "Category 1 General Contractor (GC-1)",
      description: "As a Category 1 General Contractor...",
      logo: undefined,
    });
  });

  it("omits the logo when logoApproved is false, even if a logo image exists", () => {
    const result = adaptRecognition({ ...base, logoApproved: false, logo: image("CBE logo") });
    expect(result.logo).toBeUndefined();
  });

  it("includes the logo only when logoApproved is true and a logo image exists", () => {
    const result = adaptRecognition({ ...base, logoApproved: true, logo: image("GC-1 mark") });
    expect(result.logo?.alt).toBe("GC-1 mark");
  });

  it("falls back to an empty eyebrow when unset", () => {
    const result = adaptRecognition({ ...base, eyebrow: undefined });
    expect(result.eyebrow).toBe("");
  });
});
