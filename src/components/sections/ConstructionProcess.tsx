import { MotionSection } from "@/components/motion/MotionSection";
import { ProcessScroller } from "@/components/process/ProcessScroller";
import { PROCESS_STAGES } from "@/constants/construction-process";

export function ConstructionProcess() {
  return (
    <section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-wide">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Our Process
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">From Vision to Delivery</h2>
        </MotionSection>
      </div>

      <div className="mt-12 lg:mt-16">
        <ProcessScroller stages={PROCESS_STAGES} />
      </div>
    </section>
  );
}
