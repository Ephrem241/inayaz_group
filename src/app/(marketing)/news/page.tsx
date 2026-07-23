import type { Metadata } from "next";
import { NewsIntro } from "@/components/sections/NewsIntro";
import { NewsListing } from "@/components/news/NewsListing";
import { NewsCategories } from "@/components/sections/NewsCategories";
import { NewsCTA } from "@/components/sections/NewsCTA";

export const metadata: Metadata = {
  title: "News & Insights | INAYAZ Group",
  description:
    "Updates and insights from INAYAZ Group on responsible construction, project execution, and building Ethiopia's future as a Category 1 General Contractor.",
};

export default function NewsPage() {
  return (
    <>
      <NewsIntro />
      <NewsListing />
      <NewsCategories />
      <NewsCTA />
    </>
  );
}
