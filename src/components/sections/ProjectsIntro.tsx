import { MotionSection } from "@/components/motion/MotionSection";

export function ProjectsIntro() {
  return (
    <section data-projects-intro-section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
            Projects
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl">
            Proven Footprints. Future Landscapes.
          </h1>
        </MotionSection>

        <MotionSection delay={0.1}>
          <p className="mt-10 max-w-2xl text-base text-muted-foreground">
            A portfolio of residential, commercial, and mixed-use developments
            delivered across Addis Ababa as a Category 1 General Contractor.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
