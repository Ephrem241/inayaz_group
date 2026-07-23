import { MotionSection } from "@/components/motion/MotionSection";

export function ServicesIntro() {
  return (
    <section data-services-intro-section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Services
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl">
            Ten Services. One Accountable Team.
          </h1>
        </MotionSection>

        <MotionSection delay={0.1}>
          <p className="mt-10 max-w-2xl text-base text-muted-foreground">
            INAYAZ delivers a complete range of construction and project
            services as a Category 1 General Contractor — from design and
            planning through construction, delivery, and ongoing support.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
