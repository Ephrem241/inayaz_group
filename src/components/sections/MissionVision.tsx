import { MotionSection } from "@/components/motion/MotionSection";
import { MISSION_STATEMENT, VISION_STATEMENT } from "@/constants/mission-vision-values";

export function MissionVision() {
  return (
    <section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <MotionSection>
            <div className="border-l-2 border-construction-gold pl-6">
              <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
                Our Mission
              </p>
              <p className="mt-4 text-xl leading-relaxed text-off-white md:text-2xl">
                {MISSION_STATEMENT}
              </p>
            </div>
          </MotionSection>

          <MotionSection delay={0.1}>
            <div className="border-l-2 border-construction-gold pl-6">
              <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
                Our Vision
              </p>
              <p className="mt-4 text-xl leading-relaxed text-off-white md:text-2xl">
                {VISION_STATEMENT}
              </p>
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
