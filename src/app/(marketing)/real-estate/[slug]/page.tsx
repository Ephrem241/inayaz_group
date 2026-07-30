import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { RealEstateHero } from "@/components/sections/RealEstateHero";
import { RealEstateDetails } from "@/components/sections/RealEstateDetails";
import { RealEstateRelated } from "@/components/sections/RealEstateRelated";
import { RealEstateDetailCTA } from "@/components/sections/RealEstateDetailCTA";
import { ProjectJsonLd } from "@/components/seo/ProjectJsonLd";
import type { Project } from "@/constants/projects";
import { getProjectBySlug, getProjects } from "../../../../../sanity/lib/queries";
import { adaptProject } from "../../../../../sanity/lib/adapters";

type Props = {
  params: Promise<{ slug: string }>;
};

// Same sort as /projects/[slug]'s getRelatedProjects — same-propertyType
// peers first, current excluded.
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
    title: `${project.name} | Real Estate`,
    description: project.description,
    alternates: { canonical: `/real-estate/${project.slug}` },
    openGraph: {
      type: "website",
      title: `${project.name} | INAYAZ Group Real Estate`,
      description: project.description,
      url: `/real-estate/${project.slug}`,
      images: [{ url: project.image.src, alt: project.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | INAYAZ Group Real Estate`,
      description: project.description,
      images: [project.image.src],
    },
  };
}

export default async function RealEstateDetailPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const [sanityProject, sanityProjects] = await Promise.all([
    getProjectBySlug(slug, { preview }),
    getProjects(),
  ]);
  if (!sanityProject) notFound();

  const project = adaptProject(sanityProject);
  const allProjects = sanityProjects.map(adaptProject);
  const relatedProjects = getRelatedProjects(allProjects, project);

  return (
    <>
      <ProjectJsonLd project={project} path={`/real-estate/${project.slug}`} />
      <RealEstateHero project={project} />
      <RealEstateDetails project={project} />
      <RealEstateRelated relatedProjects={relatedProjects} />
      <RealEstateDetailCTA project={project} />
    </>
  );
}
