import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { ProjectScope } from "@/components/sections/ProjectScope";
import { ProjectServices } from "@/components/sections/ProjectServices";
import { ProjectRelated } from "@/components/sections/ProjectRelated";
import { ProjectDetailCTA } from "@/components/sections/ProjectDetailCTA";
import type { Project } from "@/constants/projects";
import {
  getDivisionBySlug,
  getProjectBySlug,
  getProjects,
} from "../../../../../sanity/lib/queries";
import { adaptDivision, adaptProject } from "../../../../../sanity/lib/adapters";

type Props = {
  params: Promise<{ slug: string }>;
};

// Mirrors constants/projects.ts's getRelatedProjects() sort exactly, but
// operating on the live Sanity-sourced project list instead of the static
// PROJECTS array — same-propertyType peers sort first, current excluded.
function getRelatedProjects(allProjects: Project[], current: Project, limit = 3): Project[] {
  return allProjects
    .filter((project) => project.slug !== current.slug)
    .sort(
      (a, b) =>
        Number(b.propertyType === current.propertyType) -
        Number(a.propertyType === current.propertyType),
    )
    .slice(0, limit);
}

export async function generateStaticParams() {
  const sanityProjects = await getProjects();
  return sanityProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sanityProject = await getProjectBySlug(slug);
  if (!sanityProject) notFound();
  const project = adaptProject(sanityProject);

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "website",
      title: `${project.name} | INAYAZ Group`,
      description: project.description,
      url: `/projects/${project.slug}`,
      images: [{ url: project.image.src, alt: project.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | INAYAZ Group`,
      description: project.description,
      images: [project.image.src],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const [sanityProject, sanityConstructionDivision, sanityProjects] = await Promise.all([
    getProjectBySlug(slug, { preview }),
    getDivisionBySlug("construction-real-estate"),
    getProjects(),
  ]);
  if (!sanityProject) notFound();

  const project = adaptProject(sanityProject);
  const constructionDivision = sanityConstructionDivision
    ? adaptDivision(sanityConstructionDivision)
    : null;
  const allProjects = sanityProjects.map(adaptProject);
  const relatedProjects = getRelatedProjects(allProjects, project);

  return (
    <>
      <ProjectHero project={project} />
      <ProjectScope />
      <ProjectServices project={project} services={constructionDivision?.items ?? []} />
      <ProjectRelated relatedProjects={relatedProjects} />
      <ProjectDetailCTA project={project} />
    </>
  );
}
