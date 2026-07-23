import type { Metadata } from "next";
import { NewsIntro } from "@/components/sections/NewsIntro";
import { NewsListing } from "@/components/news/NewsListing";
import { NewsCategories } from "@/components/sections/NewsCategories";
import { NewsCTA } from "@/components/sections/NewsCTA";
import { getArticles } from "../../../../sanity/lib/queries";
import { adaptArticle } from "../../../../sanity/lib/adapters";

export const metadata: Metadata = {
  title: "News & Insights",
  description:
    "Updates and insights from INAYAZ Group on responsible construction, project execution, and building Ethiopia's future as a Category 1 General Contractor.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const sanityArticles = await getArticles();
  const articles = sanityArticles.map(adaptArticle);

  return (
    <>
      <NewsIntro />
      <NewsListing articles={articles} />
      <NewsCategories />
      <NewsCTA />
    </>
  );
}
