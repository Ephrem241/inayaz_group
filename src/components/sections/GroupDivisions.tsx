import { MotionSection } from "@/components/motion/MotionSection";
import { DivisionDetail } from "@/components/divisions/DivisionDetail";
import type { Division } from "@/constants/divisions";
import type { Project } from "@/constants/projects";

type GroupDivisionsProps = {
  divisions: Division[];
  featuredProjects: Project[];
};

export function GroupDivisions({ divisions, featuredProjects }: GroupDivisionsProps) {
  return (
    <section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Our Divisions
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Six Divisions. One Standard.</h2>
        </MotionSection>

        <div className="mt-12 lg:mt-16">
          {divisions.map((division, index) => (
            <MotionSection key={division.id} delay={index * 0.05}>
              <DivisionDetail
                division={division}
                relatedProjects={
                  division.id === "construction-real-estate" ? featuredProjects : undefined
                }
                index={index}
              />
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}
