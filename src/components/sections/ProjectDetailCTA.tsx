import { MotionSection } from "@/components/motion/MotionSection";
import { PRIMARY_CTA } from "@/constants/navigation";
import type { Project } from "@/constants/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";

type ProjectDetailCTAProps = {
  project: Project;
};

export function ProjectDetailCTA({ project }: ProjectDetailCTAProps) {
  return (
    <section data-project-cta-section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-content text-center">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Start a Conversation
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">
            Have a Project Like {project.name} in Mind?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-off-white/80">
            Reach out to discuss a project, a partnership, or anything else about
            INAYAZ Group.
          </p>
          <TrackedLink
            href={PRIMARY_CTA.href}
            event="construction_consultation"
            eventProps={{ source: "project_detail_cta", project: project.slug }}
            className="btn btn-primary mt-8 inline-flex"
          >
            {PRIMARY_CTA.label}
          </TrackedLink>
        </MotionSection>
      </div>
    </section>
  );
}
