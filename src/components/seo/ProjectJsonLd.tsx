import { SITE_URL } from "@/constants/site";
import { company } from "@/constants/company";
import type { Project } from "@/constants/projects";

type ProjectJsonLdProps = {
  project: Project;
  // Same underlying project document is presented at two URLs — the
  // contractor-facing /projects/[slug] (default) and the buyer-facing
  // /real-estate/[slug] — the structured data must match whichever page
  // it's actually rendered on.
  path?: string;
};

// CreativeWork is schema.org's generic fit for a portfolio/case-study page —
// there's no dedicated "construction project" type, and inventing one or
// overclaiming a more specific type (e.g. a building type) isn't warranted
// since structure/unit data isn't uniformly confirmed per project yet.
export function ProjectJsonLd({ project, path }: ProjectJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: `${SITE_URL}${path ?? `/projects/${project.slug}`}`,
    image: project.image.src,
    creator: { "@type": "GeneralContractor", name: company.brandName },
    ...(project.location
      ? { locationCreated: { "@type": "Place", address: project.location } }
      : {}),
  };

  return (
    // Sourced from the site's own trusted Sanity dataset, not user input —
    // no XSS risk from injecting it directly here.
    <script
      type="application/ld+json"
      data-json-ld="project"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
