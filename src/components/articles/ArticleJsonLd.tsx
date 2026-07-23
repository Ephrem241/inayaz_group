import { SITE_URL } from "@/constants/site";
import type { Article } from "@/constants/articles";

type ArticleJsonLdProps = {
  article: Article;
};

export function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const url = `${SITE_URL}/news/${article.slug}`;
  // Sanity-sourced cover images are already full CDN URLs; only local
  // constant-authored fallbacks (e.g. "/images/...") need SITE_URL prefixed.
  const imageUrl = article.coverImage
    ? article.coverImage.src.startsWith("http")
      ? article.coverImage.src
      : `${SITE_URL}${article.coverImage.src}`
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: "INAYAZ Group" },
    publisher: { "@type": "Organization", name: "INAYAZ Group" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(imageUrl ? { image: imageUrl } : {}),
  };

  return (
    // Content is fully derived from the trusted ARTICLES constant, not user
    // input, so injecting it directly here carries no XSS risk.
    <script
      type="application/ld+json"
      data-json-ld="article"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
