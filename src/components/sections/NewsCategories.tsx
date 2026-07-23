import { MotionSection } from "@/components/motion/MotionSection";
import { FUTURE_TOPICS } from "@/constants/articles";

export function NewsCategories() {
  return (
    <section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            What We&apos;ll Be Covering
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Topics on the Horizon</h2>
          <div data-future-topics className="mt-8 flex flex-wrap gap-3">
            {FUTURE_TOPICS.map((topic) => (
              <span
                key={topic}
                data-future-topic={topic}
                className="rounded-full border border-construction-gold/30 px-4 py-2 text-sm text-off-white/80"
              >
                {topic}
              </span>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
