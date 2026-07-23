import { MotionSection } from "@/components/motion/MotionSection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/constants/projects";

type ProjectRelatedProps = {
  relatedProjects: Project[];
};

export function ProjectRelated({ relatedProjects }: ProjectRelatedProps) {
  if (relatedProjects.length === 0) return null;

  return (
    <section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-wide">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
            Related Projects
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">More From INAYAZ</h2>
        </MotionSection>

        <div
          data-related-projects
          className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {relatedProjects.map((project, index) => (
            <MotionSection key={project.slug} delay={index * 0.05}>
              <ProjectCard project={project} />
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}
