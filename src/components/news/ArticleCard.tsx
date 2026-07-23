import Link from "next/link";
import type { Article } from "@/constants/articles";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div data-article={article.slug}>
      <p className="text-xs font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
        {article.category ?? "News & Insights"}
      </p>
      <h3 className="mt-2 text-xl">{article.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{article.excerpt}</p>

      <Link
        href={`/news/${article.slug}`}
        aria-label={`Read ${article.title}`}
        className="mt-3 inline-flex text-sm font-medium text-foreground underline decoration-construction-gold underline-offset-4 transition-colors hover:text-construction-gold-accessible"
      >
        Read Article
      </Link>
    </div>
  );
}
