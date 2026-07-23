import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES, getArticleBySlug } from "@/constants/articles";
import { ArticleJsonLd } from "@/components/articles/ArticleJsonLd";
import { ArticleHero } from "@/components/sections/ArticleHero";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { NewsCTA } from "@/components/sections/NewsCTA";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return {
    title: `${article.title} | INAYAZ Group`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <ArticleJsonLd article={article} />
      <ArticleHero article={article} />
      <ArticleBody article={article} />
      <NewsCTA />
    </>
  );
}
