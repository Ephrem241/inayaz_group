import { MotionSection } from "@/components/motion/MotionSection";
import { MaskRevealImage } from "@/components/motion/MaskRevealImage";
import type { Article } from "@/constants/articles";

type ArticleHeroProps = {
  article: Article;
};

function formatPublishedDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

export function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <section data-article-hero-section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            {article.category ?? "News & Insights"}
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl">{article.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            By {article.author} · Published {formatPublishedDate(article.publishedAt)}
          </p>
        </MotionSection>

        {article.coverImage && (
          <MotionSection delay={0.1} className="mt-10">
            <MaskRevealImage
              src={article.coverImage.src}
              alt={article.coverImage.alt}
              blurDataURL={article.coverImage.blurDataURL}
              aspectRatio="21 / 9"
              priority
            />
          </MotionSection>
        )}
      </div>
    </section>
  );
}
