import "server-only";
import { client } from "./client";
import type {
  ArticleListFilters,
  ProjectListFilters,
  SanityArticle,
  SanityDivision,
  SanityProject,
  SanityService,
  SanitySiteSettings,
} from "./types";

// Every query here is published-only by construction: `client` (sanity/lib/
// client.ts) is created with `perspective: "published"`, so draft documents
// never appear in these results regardless of query text — satisfies
// CLAUDE.md's "published-only public queries (exclude drafts)" at the
// client level rather than needing a per-query filter.
//
// Cache tags mirror each document type's schema `name` (project, division,
// service, article, siteSettings), plus a `${type}:${slug}` tag on
// slug-lookup queries — /api/revalidate calls revalidateTag() with these
// same names when Sanity's webhook fires on publish.
//
// Errors are caught and logged server-side, never rethrown with raw Sanity
// error detail — callers get null/[] and can render an honest empty state,
// consistent with CLAUDE.md's "no raw Sanity/API errors exposed to the
// client" rule (Phase 13), applied here since it costs nothing to do now.

const projectFields = /* groq */ `
  _id, _updatedAt,
  title,
  "slug": slug.current,
  client, contractor, consultant, structureType, category, propertyType,
  location, status, startYear, completionYear, shortDescription, description,
  heroImage, gallery, services, builtArea, units, featured, orderRank
`;

const divisionFields = /* groq */ `
  _id, _updatedAt,
  title,
  "slug": slug.current,
  description, listLabel, items, icon, image, featured
`;

const serviceFields = /* groq */ `
  _id, _updatedAt,
  title,
  "slug": slug.current,
  description, image, icon, featured
`;

const articleFields = /* groq */ `
  _id, _updatedAt,
  title,
  "slug": slug.current,
  excerpt, content, coverImage, category, author, publishedAt, featured
`;

export async function getProjects(filters: ProjectListFilters = {}): Promise<SanityProject[]> {
  const { category, status, location, year, limit = 50, offset = 0 } = filters;
  try {
    return await client.fetch(
      /* groq */ `
        *[_type == "project"
          && (!defined($category) || category == $category)
          && (!defined($status) || status == $status)
          && (!defined($location) || location == $location)
          && (!defined($year) || completionYear == $year)
        ] | order(orderRank asc, _createdAt desc) [$offset...$end] { ${projectFields} }
      `,
      { category: category ?? null, status: status ?? null, location: location ?? null, year: year ?? null, offset, end: offset + limit },
      { next: { tags: ["project"] } },
    );
  } catch (error) {
    console.error("[sanity] getProjects failed:", error);
    return [];
  }
}

export async function getFeaturedProjects(limit = 3): Promise<SanityProject[]> {
  try {
    return await client.fetch(
      /* groq */ `
        *[_type == "project" && featured == true]
          | order(orderRank asc, _createdAt desc) [0...$limit] { ${projectFields} }
      `,
      { limit },
      { next: { tags: ["project"] } },
    );
  } catch (error) {
    console.error("[sanity] getFeaturedProjects failed:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  try {
    const result = await client.fetch(
      /* groq */ `*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`,
      { slug },
      { next: { tags: ["project", `project:${slug}`] } },
    );
    return result ?? null;
  } catch (error) {
    console.error("[sanity] getProjectBySlug failed:", error);
    return null;
  }
}

export async function getDivisions(): Promise<SanityDivision[]> {
  try {
    return await client.fetch(
      /* groq */ `*[_type == "division"] | order(_createdAt asc) { ${divisionFields} }`,
      {},
      { next: { tags: ["division"] } },
    );
  } catch (error) {
    console.error("[sanity] getDivisions failed:", error);
    return [];
  }
}

export async function getDivisionBySlug(slug: string): Promise<SanityDivision | null> {
  try {
    const result = await client.fetch(
      /* groq */ `*[_type == "division" && slug.current == $slug][0] { ${divisionFields} }`,
      { slug },
      { next: { tags: ["division", `division:${slug}`] } },
    );
    return result ?? null;
  } catch (error) {
    console.error("[sanity] getDivisionBySlug failed:", error);
    return null;
  }
}

export async function getServices(): Promise<SanityService[]> {
  try {
    return await client.fetch(
      /* groq */ `*[_type == "service"] | order(_createdAt asc) { ${serviceFields} }`,
      {},
      { next: { tags: ["service"] } },
    );
  } catch (error) {
    console.error("[sanity] getServices failed:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<SanityService | null> {
  try {
    const result = await client.fetch(
      /* groq */ `*[_type == "service" && slug.current == $slug][0] { ${serviceFields} }`,
      { slug },
      { next: { tags: ["service", `service:${slug}`] } },
    );
    return result ?? null;
  } catch (error) {
    console.error("[sanity] getServiceBySlug failed:", error);
    return null;
  }
}

export async function getArticles(filters: ArticleListFilters = {}): Promise<SanityArticle[]> {
  const { category, limit = 50, offset = 0 } = filters;
  try {
    return await client.fetch(
      /* groq */ `
        *[_type == "article" && (!defined($category) || category == $category)]
          | order(publishedAt desc) [$offset...$end] { ${articleFields} }
      `,
      { category: category ?? null, offset, end: offset + limit },
      { next: { tags: ["article"] } },
    );
  } catch (error) {
    console.error("[sanity] getArticles failed:", error);
    return [];
  }
}

export async function getFeaturedArticles(limit = 1): Promise<SanityArticle[]> {
  try {
    return await client.fetch(
      /* groq */ `
        *[_type == "article" && featured == true] | order(publishedAt desc) [0...$limit] { ${articleFields} }
      `,
      { limit },
      { next: { tags: ["article"] } },
    );
  } catch (error) {
    console.error("[sanity] getFeaturedArticles failed:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<SanityArticle | null> {
  try {
    const result = await client.fetch(
      /* groq */ `*[_type == "article" && slug.current == $slug][0] { ${articleFields} }`,
      { slug },
      { next: { tags: ["article", `article:${slug}`] } },
    );
    return result ?? null;
  } catch (error) {
    console.error("[sanity] getArticleBySlug failed:", error);
    return null;
  }
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  try {
    const result = await client.fetch(
      /* groq */ `
        *[_type == "siteSettings"][0] {
          _id, contactEmail, contactPhones, address, socialLinks, homepageMetrics,
          footerTagline, footerDescription,
          "featuredProjects": featuredProjects[]->{ ${projectFields} }
        }
      `,
      {},
      { next: { tags: ["siteSettings"] } },
    );
    return result ?? null;
  } catch (error) {
    console.error("[sanity] getSiteSettings failed:", error);
    return null;
  }
}
