import type { Metadata } from "next";
import { RealEstateIntro } from "@/components/sections/RealEstateIntro";
import { RealEstateListing } from "@/components/real-estate/RealEstateListing";
import { RealEstateCTA } from "@/components/sections/RealEstateCTA";
import { getProjects } from "../../../../sanity/lib/queries";
import { adaptProject } from "../../../../sanity/lib/adapters";

export const metadata: Metadata = {
  title: "Real Estate Developments in Ethiopia",
  description:
    "Explore INAYAZ Group's residential, commercial, and mixed-use developments across Addis Ababa — availability, locations, and property types.",
  alternates: { canonical: "/real-estate" },
};

export default async function RealEstatePage() {
  const sanityProjects = await getProjects();
  const projects = sanityProjects.map(adaptProject);

  return (
    <>
      <RealEstateIntro />
      <RealEstateListing projects={projects} />
      <RealEstateCTA />
    </>
  );
}
