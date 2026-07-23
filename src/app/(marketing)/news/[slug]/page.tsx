import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { ArticleJsonLd } from "@/components/articles/ArticleJsonLd";
import { ArticleHero } from "@/components/sections/ArticleHero";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { NewsCTA } from "@/components/sections/NewsCTA";
import { DEFAULT_OG_IMAGE } from "@/constants/site";
import { getArticleBySlug, getArticles } from "../../../../../sanity/lib/queries";
import { adaptArticle } from "../../../../../sanity/lib/adapters";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const sanityArticles = await getArticles();
  return sanityArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sanityArticle = await getArticleBySlug(slug);
  if (!sanityArticle) notFound();
  const article = adaptArticle(sanityArticle);
  const ogImage = article.coverImage?.src ?? DEFAULT_OG_IMAGE;
  const ogImageAlt = article.coverImage?.alt ?? article.title;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: "article",
      title: `${article.title} | INAYAZ Group`,
      description: article.excerpt,
      url: `/news/${article.slug}`,
      publishedTime: article.publishedAt,
      authors: [article.author],
      images: [{ url: ogImage, alt: ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | INAYAZ Group`,
      description: article.excerpt,
      images: [ogImage],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const sanityArticle = await getArticleBySlug(slug, { preview });
  if (!sanityArticle) notFound();
  const article = adaptArticle(sanityArticle);

  return (
    <>
      <ArticleJsonLd article={article} />
      <ArticleHero article={article} />
      <ArticleBody article={article} />
      <NewsCTA />
    </>
  );
}
