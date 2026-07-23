import Link from "next/link";
import { Quote } from "lucide-react";
import { MotionSection } from "@/components/motion/MotionSection";
import { MaskRevealImage } from "@/components/motion/MaskRevealImage";
import { MEANING_OF_INAYAZ } from "@/constants/mission-vision-values";

export function CompanyIntroduction() {
  return (
    <section data-company-introduction-section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <MotionSection>
              <p className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
                Since 2015
              </p>
              <h2 className="mt-4 text-4xl md:text-5xl">
                Built on Purpose. Driven by Integrity.
              </h2>
            </MotionSection>

            <MotionSection delay={0.1}>
              <p className="mt-6 max-w-xl text-base text-muted-foreground">
                Since 2015, INAYAZ has grown into a diversified Ethiopian business group
                built on care, technical excellence, professional responsibility, and
                disciplined execution.
              </p>
              <p className="mt-4 max-w-xl text-base text-muted-foreground">
                From complex high-rise developments to international trade and
                manufacturing, every INAYAZ business is guided by one shared principle:
                deliver lasting value while protecting the interests of clients,
                partners, employees, and communities.
              </p>
            </MotionSection>

            <MotionSection delay={0.15}>
              <blockquote className="mt-10 border-l-2 border-construction-gold pl-6">
                <Quote className="h-6 w-6 text-construction-gold-accessible" aria-hidden="true" />
                <p className="mt-3 text-2xl leading-snug text-foreground md:text-3xl">
                  {MEANING_OF_INAYAZ}
                </p>
              </blockquote>
            </MotionSection>

            <MotionSection delay={0.2}>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-construction-gold" />
                <div className="h-px flex-1 bg-construction-gold/30" />
                <span className="text-sm tracking-wide text-muted-foreground">Present</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                2015 — Founded. Operating continuously since.
              </p>
            </MotionSection>

            <MotionSection delay={0.25}>
              <Link href="/about" className="btn btn-outline mt-10 inline-flex">
                About INAYAZ
              </Link>
            </MotionSection>
          </div>

          <div className="lg:col-span-5">
            <MaskRevealImage
              src="/images/about/placeholder-about-intro.jpg"
              alt="Detail of a modern glass-and-steel building facade with an internal staircase visible through the curtain wall, beside an adjacent concrete structure"
              aspectRatio="4 / 5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
