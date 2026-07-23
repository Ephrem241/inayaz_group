import { MotionSection } from "@/components/motion/MotionSection";
import { WHY_CHOOSE_STRENGTHS } from "@/constants/why-choose";

export function WhyChooseInayaz() {
  return (
    <section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-wide">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
            Why Choose INAYAZ
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Built for Confidence</h2>
        </MotionSection>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2 lg:mt-16 lg:gap-x-16">
          {WHY_CHOOSE_STRENGTHS.map((strength, index) => (
            <MotionSection key={strength.id} delay={index * 0.05}>
              <div data-why-choose={strength.id} className="border-l-2 border-construction-gold pl-6">
                <span className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible">
                  {strength.number}
                </span>
                <h3 className="mt-3 text-2xl font-medium md:text-3xl">{strength.title}</h3>
                <p className="mt-3 max-w-md text-base text-muted-foreground">{strength.body}</p>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}
