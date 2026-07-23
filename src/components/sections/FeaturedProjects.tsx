import { MotionSection } from "@/components/motion/MotionSection";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PROJECTS, LEVEL_LEGEND } from "@/constants/projects";

const FEATURED_TONES: Array<"dark" | "light"> = ["dark", "light", "dark"];

export function FeaturedProjects() {
  const featured = PROJECTS.filter((project) => project.featured);
  const secondary = PROJECTS.filter((project) => !project.featured);

  return (
    <>
      <section className="section-light py-16 md:py-24 lg:py-32">
        <div className="container-wide">
          <MotionSection>
            <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
              Our Portfolio
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl">Proven Footprints. Future Landscapes.</h2>
          </MotionSection>
        </div>
      </section>

      {featured.map((project, index) => (
        <ProjectShowcase key={project.slug} project={project} tone={FEATURED_TONES[index]} />
      ))}

      <section className="section-light py-16 md:py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {secondary.map((project, index) => (
              <MotionSection key={project.slug} delay={index * 0.05}>
                <ProjectCard project={project} />
              </MotionSection>
            ))}
          </div>

          <p className="mt-12 text-xs tracking-wide text-muted-foreground">{LEVEL_LEGEND}</p>
        </div>
      </section>
    </>
  );
}
