import { MotionSection } from "@/components/motion/MotionSection";

export function NewsIntro() {
  return (
    <section data-news-intro-section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            News &amp; Insights
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl">Updates From INAYAZ</h1>
        </MotionSection>

        <MotionSection delay={0.1}>
          <p className="mt-10 max-w-2xl text-base text-muted-foreground">
            Updates and insights from INAYAZ Group on responsible construction,
            project execution, and building Ethiopia&apos;s future.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
