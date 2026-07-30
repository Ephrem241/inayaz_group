import { MotionSection } from "@/components/motion/MotionSection";
import { MaskRevealImage } from "@/components/motion/MaskRevealImage";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { Project } from "@/constants/projects";

type RealEstateHeroProps = {
  project: Project;
};

export function RealEstateHero({ project }: RealEstateHeroProps) {
  return (
    <section data-real-estate-detail-section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Real Estate", href: "/real-estate" },
            { label: project.name },
          ]}
        />

        <MotionSection className="mt-6">
          <MaskRevealImage
            src={project.image.src}
            alt={project.image.alt}
            blurDataURL={project.image.blurDataURL}
            aspectRatio="21 / 9"
            sizes="(min-width: 1200px) 1200px, 100vw"
            priority
          />
        </MotionSection>

        <MotionSection delay={0.1} className="mt-10">
          <p className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
            {project.propertyType}
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl">{project.name}</h1>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            {project.location && (
              <div>
                <dt className="inline font-medium">Location: </dt>
                <dd className="inline">{project.location}</dd>
              </div>
            )}
            {/* Hidden entirely (never a placeholder) until client-confirmed —
                mirrors the same policy already applied on /projects/[slug]. */}
            {project.status && (
              <div>
                <dt className="inline font-medium">Availability: </dt>
                <dd data-field="status" className="inline">
                  {project.status}
                </dd>
              </div>
            )}
            {project.completionYear && (
              <div>
                <dt className="inline font-medium">Completion: </dt>
                <dd data-field="completion-year" className="inline">
                  {project.completionYear}
                </dd>
              </div>
            )}
            {project.structure && (
              <div>
                <dt className="inline font-medium">Structure: </dt>
                <dd className="inline">{project.structure}</dd>
              </div>
            )}
          </dl>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground">{project.description}</p>
        </MotionSection>
      </div>
    </section>
  );
}
