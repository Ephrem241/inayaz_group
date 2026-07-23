import { MotionSection } from "@/components/motion/MotionSection";
import { RECOGNITIONS } from "@/constants/recognition";

export function RecognitionAndTrust() {
  return (
    <section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-wide">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Recognition &amp; Trust
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Earned, Not Assumed</h2>
        </MotionSection>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-3 lg:mt-16">
          {RECOGNITIONS.map((item, index) => (
            <MotionSection key={item.id} delay={index * 0.05}>
              <div data-recognition={item.id} className="border-l-2 border-construction-gold pl-6">
                <span className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
                  {item.eyebrow}
                </span>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-off-white">
                  {item.name}
                </p>
                <p className="mt-3 text-base text-off-white/80">{item.description}</p>
                {item.pendingNote && (
                  <p data-pending-note className="mt-4 text-xs text-off-white/40 italic">
                    {item.pendingNote}
                  </p>
                )}
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}
