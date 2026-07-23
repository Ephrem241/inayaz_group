import type { Metadata } from "next";
import { ProjectsIntro } from "@/components/sections/ProjectsIntro";
import { ProjectsListing } from "@/components/projects/ProjectsListing";
import { ProjectsCTA } from "@/components/sections/ProjectsCTA";
import { getProjects } from "../../../../sanity/lib/queries";
import { adaptProject } from "../../../../sanity/lib/adapters";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse INAYAZ Group's portfolio of residential, commercial, and mixed-use developments across Addis Ababa, delivered as a Category 1 General Contractor.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const sanityProjects = await getProjects();
  const projects = sanityProjects.map(adaptProject);

  return (
    <>
      <ProjectsIntro />
      <ProjectsListing projects={projects} />
      <ProjectsCTA />
    </>
  );
}
