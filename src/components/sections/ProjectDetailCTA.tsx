import Link from "next/link";
import { MotionSection } from "@/components/motion/MotionSection";
import { PRIMARY_CTA } from "@/constants/navigation";
import type { Project } from "@/constants/projects";

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
          <Link href={PRIMARY_CTA.href} className="btn btn-primary mt-8 inline-flex">
            {PRIMARY_CTA.label}
          </Link>
        </MotionSection>
      </div>
    </section>
  );
}
