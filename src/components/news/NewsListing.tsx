import Link from "next/link";
import { MotionSection } from "@/components/motion/MotionSection";
import { ArticleCard } from "@/components/news/ArticleCard";
import type { Article } from "@/constants/articles";

function formatPublishedDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

type NewsListingProps = {
  articles: Article[];
};

export function NewsListing({ articles }: NewsListingProps) {
  const featured = articles.filter((article) => article.featured);
  const rest = articles.filter((article) => !article.featured);

  return (
    <section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        {featured.map((article, index) => (
          <MotionSection key={article.slug} delay={index * 0.05}>
            <div data-featured-article={article.slug} className="border-l-2 border-construction-gold pl-6">
              <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
                {article.category ?? "Featured"}
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl">{article.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                By {article.author} · Published {formatPublishedDate(article.publishedAt)}
              </p>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground">{article.excerpt}</p>
              <Link
                href={`/news/${article.slug}`}
                className="mt-6 inline-flex text-sm font-medium text-foreground underline decoration-construction-gold underline-offset-4 transition-colors hover:text-primary"
              >
                Read Article
              </Link>
            </div>
          </MotionSection>
        ))}

        {rest.length > 0 && (
          <div
            data-news-grid
            className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
