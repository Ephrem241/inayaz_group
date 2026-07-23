import { MotionSection } from "@/components/motion/MotionSection";

export function Leadership() {
  return (
    <section data-leadership-section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Leadership
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Guided by People, Not Just Process</h2>
          <p className="mt-6 max-w-2xl text-base text-off-white/80">
            INAYAZ&apos;s projects are led by construction and business professionals
            who bring technical expertise and disciplined oversight to every
            engagement. Individual leadership profiles — names, titles, and
            photography — are being prepared and will be published here once
            finalized.
          </p>
          <p data-pending-note className="mt-4 text-xs text-off-white/40 italic">
            Leadership names and titles pending confirmation.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
