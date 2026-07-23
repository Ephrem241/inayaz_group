import { MotionSection } from "@/components/motion/MotionSection";
import { ShareLinks } from "@/components/articles/ShareLinks";
import type { Article } from "@/constants/articles";

type ArticleBodyProps = {
  article: Article;
};

export function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <section className="section-light pb-16 md:pb-24 lg:pb-32">
      <div className="container-narrow">
        <MotionSection>
          <div>
            {article.body.map((block, index) =>
              block.type === "heading" ? (
                <h2 key={index} className="text-2xl font-medium md:text-3xl">
                  {block.text}
                </h2>
              ) : (
                <p key={index} className="mt-4 text-base text-muted-foreground">
                  {block.text}
                </p>
              ),
            )}
          </div>

          <div className="mt-10 border-t border-construction-gold/20 pt-8">
            <ShareLinks article={article} />
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
