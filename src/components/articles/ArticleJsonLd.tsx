import { SITE_URL } from "@/constants/site";
import type { Article } from "@/constants/articles";

type ArticleJsonLdProps = {
  article: Article;
};

export function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const url = `${SITE_URL}/news/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: "INAYAZ Group" },
    publisher: { "@type": "Organization", name: "INAYAZ Group" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(article.coverImage ? { image: `${SITE_URL}${article.coverImage.src}` } : {}),
  };

  return (
    // Content is fully derived from the trusted ARTICLES constant, not user
    // input, so injecting it directly here carries no XSS risk.
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
