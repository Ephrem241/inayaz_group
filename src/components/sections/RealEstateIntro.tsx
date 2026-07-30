import { MotionSection } from "@/components/motion/MotionSection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function RealEstateIntro() {
  return (
    <section data-real-estate-intro-section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Real Estate" }]} />

        <MotionSection className="mt-6">
          <p className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
            Real Estate
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl">
            Developments Built for Long-Term Value.
          </h1>
        </MotionSection>

        <MotionSection delay={0.1}>
          <p className="mt-10 max-w-2xl text-base text-muted-foreground">
            INAYAZ delivers residential, commercial, and mixed-use developments across Addis
            Ababa — designed with the same structural discipline and Category 1 General
            Contractor execution behind every INAYAZ project.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
