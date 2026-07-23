import { MotionSection } from "@/components/motion/MotionSection";
import { EXECUTION_SCOPE_STAGES } from "@/constants/project-execution-scope";

export function ProjectScope() {
  return (
    <section data-project-scope-section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Scope &amp; Timeline
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">How This Project Was Built</h2>
          <p className="mt-6 max-w-2xl text-base text-off-white/80">
            Every INAYAZ project follows the same four-phase execution
            sequence — the scope of work below is also the build order.
          </p>
        </MotionSection>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {EXECUTION_SCOPE_STAGES.map((stage, index) => (
            <MotionSection key={stage.id} delay={index * 0.05}>
              <div data-scope-stage={stage.id} className="border-l-2 border-construction-gold pl-6">
                <span className="text-sm font-medium tracking-[0.2em] text-primary">
                  {stage.number}
                </span>
                <h3 className="mt-2 text-xl font-medium">{stage.name}</h3>
                <p className="mt-2 text-sm text-off-white/80">{stage.description}</p>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}
