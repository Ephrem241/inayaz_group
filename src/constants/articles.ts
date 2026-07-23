export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  body: ArticleBlock[];
  author: string;
  publishedAt: string;
  category?: string;
  featured: boolean;
  coverImage?: { src: string; alt: string };
};

export const ARTICLES: Article[] = [
  {
    slug: "building-ethiopias-future-through-responsible-construction",
    title: "Building Ethiopia's Future Through Responsible Construction",
    excerpt:
      "Construction is more than building structures — it's about creating lasting value through care, quality, and responsibility.",
    body: [
      { type: "heading", text: "A Responsibility, Not Just a Project" },
      {
        type: "paragraph",
        text: "Every building starts with a responsibility. Whether it's a high-rise development, a commercial space, or a residential project, we understand that what we build will serve people for years. That is why we focus on careful planning, strong coordination, and disciplined execution from the very beginning.",
      },
    ],
    author: "INAYAZ",
    publishedAt: "2026-06-06",
    category: undefined,
    featured: true,
    coverImage: undefined,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

// CLAUDE.md's own "potential future topics" — NOT live categories (no
// article uses any of them yet). Do not add a filter/helper keyed on these
// until a real article actually carries one.
export const FUTURE_TOPICS = [
  "Project milestones",
  "Construction progress",
  "Company announcements",
  "Sustainability",
  "Engineering insights",
  "Ethiopian construction market",
  "Awards and recognition",
] as const;

// When a second article is added: build getRelatedArticles(current, limit=3)
// here (mirroring getRelatedProjects in projects.ts) and an ArticleRelated.tsx
// section component together, in the same change.
