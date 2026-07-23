import type { Metadata } from "next";
import { ProjectsIntro } from "@/components/sections/ProjectsIntro";
import { ProjectsListing } from "@/components/projects/ProjectsListing";
import { ProjectsCTA } from "@/components/sections/ProjectsCTA";

export const metadata: Metadata = {
  title: "Projects | INAYAZ Group",
  description:
    "Browse INAYAZ Group's portfolio of residential, commercial, and mixed-use developments across Addis Ababa, delivered as a Category 1 General Contractor.",
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsIntro />
      <ProjectsListing />
      <ProjectsCTA />
    </>
  );
}
