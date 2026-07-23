import { MotionSection } from "@/components/motion/MotionSection";
import { MaskRevealImage } from "@/components/motion/MaskRevealImage";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CONTRACTOR, type Project } from "@/constants/projects";

type ProjectHeroProps = {
  project: Project;
};

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section data-project-detail-section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: project.name },
          ]}
        />

        <MotionSection className="mt-6">
          <MaskRevealImage
            src={project.image.src}
            alt={project.image.alt}
            blurDataURL={project.image.blurDataURL}
            aspectRatio="21 / 9"
            priority
          />
        </MotionSection>

        <MotionSection delay={0.1} className="mt-10">
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            {project.category}
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl">{project.name}</h1>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <div>
              <dt className="inline font-medium">Client: </dt>
              <dd className="inline">{project.client}</dd>
            </div>
            <div>
              <dt className="inline font-medium">Contractor: </dt>
              <dd className="inline">{CONTRACTOR}</dd>
            </div>
            {project.consultant && (
              <div>
                <dt className="inline font-medium">Consultant: </dt>
                <dd className="inline">{project.consultant}</dd>
              </div>
            )}
            <div>
              <dt className="inline font-medium">Structure: </dt>
              <dd className="inline">{project.structure}</dd>
            </div>
            {project.location && (
              <div>
                <dt className="inline font-medium">Location: </dt>
                <dd className="inline">{project.location}</dd>
              </div>
            )}
            {/* Status, completion year, built area, and unit counts are not
                yet client-confirmed (CLAUDE.md Phase 16 lists all four under
                "Still confirm before production launch") — rendered honestly
                as pending rather than inferred from hedged third-party hints. */}
            <div>
              <dt className="inline font-medium">Status: </dt>
              <dd data-pending-field="status" className="inline italic text-muted-foreground/70">
                Pending confirmation
              </dd>
            </div>
            <div>
              <dt className="inline font-medium">Completion Year: </dt>
              <dd
                data-pending-field="completion-year"
                className="inline italic text-muted-foreground/70"
              >
                Pending confirmation
              </dd>
            </div>
            <div>
              <dt className="inline font-medium">Built Area: </dt>
              <dd
                data-pending-field="built-area"
                className="inline italic text-muted-foreground/70"
              >
                Pending confirmation
              </dd>
            </div>
            <div>
              <dt className="inline font-medium">Units: </dt>
              <dd data-pending-field="units" className="inline italic text-muted-foreground/70">
                Pending confirmation
              </dd>
            </div>
          </dl>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground">{project.description}</p>

          {project.client === "Akoya Properties" && (
            <p data-sister-company-note className="mt-4 max-w-2xl text-sm text-muted-foreground">
              Akoya Properties is INAYAZ&apos;s sister company — this project pairs
              in-house development with Category 1 General Contractor execution
              under one group.
            </p>
          )}
        </MotionSection>
      </div>
    </section>
  );
}
