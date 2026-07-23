import { MotionSection } from "@/components/motion/MotionSection";
import { DivisionDetail } from "@/components/divisions/DivisionDetail";
import { DIVISIONS } from "@/constants/divisions";
import { PROJECTS } from "@/constants/projects";

const featuredProjects = PROJECTS.filter((project) => project.featured);

export function GroupDivisions() {
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
          {DIVISIONS.map((division, index) => (
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
