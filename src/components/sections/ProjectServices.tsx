import { MotionSection } from "@/components/motion/MotionSection";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { DIVISIONS } from "@/constants/divisions";
import type { Project } from "@/constants/projects";

type ProjectServicesProps = {
  project: Project;
};

const constructionDivision = DIVISIONS.find(
  (division) => division.id === "construction-real-estate",
)!;

export function ProjectServices({ project }: ProjectServicesProps) {
  return (
    <section data-project-services-section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Services Delivered
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {constructionDivision.items.map((item) => (
              <li key={item} className="text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </MotionSection>

        <MotionSection delay={0.1} className="mt-12 lg:mt-16">
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Gallery
          </p>
          <div className="mt-6">
            <ProjectGallery images={[project.image]} />
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
