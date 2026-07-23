import { Quote } from "lucide-react";
import { MotionSection } from "@/components/motion/MotionSection";
import { MEANING_OF_INAYAZ } from "@/constants/mission-vision-values";

export function AboutIntro() {
  return (
    <section data-about-intro-section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            About INAYAZ
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl">
            Built on Purpose. Driven by Integrity.
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground italic">
            Grounded in Humility, Committed to Excellence.
          </p>
        </MotionSection>

        <MotionSection delay={0.1}>
          <p className="mt-10 max-w-2xl text-base text-muted-foreground">
            INAYAZ operates as a diversified Ethiopian business group, active in
            construction, real estate, manufacturing, import, export, travel, and
            equipment rental. As a Category 1 General Contractor, the group brings
            proven technical capability to every engagement it undertakes.
          </p>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Every business under the group is expected to operate with the same
            standard: careful attention to detail, disciplined execution, and a
            long-term view of the value delivered to clients, partners, employees,
            and the communities it works within.
          </p>
        </MotionSection>

        <MotionSection delay={0.15}>
          <blockquote className="mt-10 border-l-2 border-construction-gold pl-6">
            <Quote className="h-6 w-6 text-primary" aria-hidden="true" />
            <p className="mt-3 text-2xl leading-snug text-foreground md:text-3xl">
              {MEANING_OF_INAYAZ}
            </p>
          </blockquote>
        </MotionSection>

        <MotionSection delay={0.2}>
          <p className="mt-10 text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Since 2015: A Legacy of Excellence
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-construction-gold" />
            <div className="h-px flex-1 bg-construction-gold/30" />
            <span className="text-sm tracking-wide text-muted-foreground">Present</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            2015 — Founded. Operating continuously since.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Present — active across construction and real estate, export trade,
            import, manufacturing, tour operation and travel, and machinery and
            equipment rental.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
