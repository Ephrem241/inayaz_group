import { MotionSection } from "@/components/motion/MotionSection";
import { CORE_VALUES } from "@/constants/mission-vision-values";

export function CoreValues() {
  return (
    <section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
            Core Values
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">What Guides Us</h2>
        </MotionSection>

        <div className="mt-12 lg:mt-16">
          {CORE_VALUES.map((value, index) => (
            <MotionSection key={value.id} delay={index * 0.05}>
              <div className="flex items-baseline gap-6 border-t border-construction-gold/20 py-6 last:border-b md:gap-10 md:py-8">
                <span className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible">
                  {value.number}
                </span>
                <h3 className="text-3xl font-medium md:text-5xl">{value.name}</h3>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}
