import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug } from "@/constants/projects";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { ProjectScope } from "@/components/sections/ProjectScope";
import { ProjectServices } from "@/components/sections/ProjectServices";
import { ProjectRelated } from "@/components/sections/ProjectRelated";
import { ProjectDetailCTA } from "@/components/sections/ProjectDetailCTA";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return {
    title: `${project.name} | INAYAZ Group`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <ProjectHero project={project} />
      <ProjectScope />
      <ProjectServices project={project} />
      <ProjectRelated currentSlug={project.slug} />
      <ProjectDetailCTA project={project} />
    </>
  );
}
