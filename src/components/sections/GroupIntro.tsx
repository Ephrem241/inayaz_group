import { MotionSection } from "@/components/motion/MotionSection";

export function GroupIntro() {
  return (
    <section data-group-intro-section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
            Our Group
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl">
            One Group. Six Divisions. A Family of Brands.
          </h1>
        </MotionSection>

        <MotionSection delay={0.1}>
          <p className="mt-10 max-w-2xl text-base text-muted-foreground">
            Since 2015, INAYAZ has grown into a diversified Ethiopian business
            group and Category 1 General Contractor operating across six
            divisions — construction and real estate, export trade, import,
            manufacturing, tour operation and travel, and machinery and
            equipment rental.
          </p>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Alongside these divisions, INAYAZ is part of a wider family of
            sub-brands and a sister real estate development company, working
            together under one shared standard of care and execution.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
