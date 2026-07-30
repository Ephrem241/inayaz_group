import Link from "next/link";
import { MotionSection } from "@/components/motion/MotionSection";
import { MaskRevealImage } from "@/components/motion/MaskRevealImage";

// Trimmed to a ≤2-sentence purpose statement for the homepage's "credibility
// summary" step — the full brand story (meaning of INAYAZ, founding quote,
// timeline) already renders in full on /about's AboutIntro, so repeating it
// here was pure duplication rather than a preview.
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
                built on care, technical excellence, and disciplined execution. From
                high-rise construction to international trade and manufacturing, every
                INAYAZ business is guided by one principle: deliver lasting value while
                protecting the interests of clients, partners, and communities.
              </p>
            </MotionSection>

            <MotionSection delay={0.15}>
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
