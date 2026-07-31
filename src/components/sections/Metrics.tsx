import { MotionSection } from "@/components/motion/MotionSection";
import { AnimatedMetric } from "@/components/metrics/AnimatedMetric";
import { DIVISIONS } from "@/constants/divisions";
import { FOUNDED_YEAR, YEARS_OF_EXPERIENCE, type Metric } from "@/constants/metrics";

type MetricsProps = {
  metrics: Metric[];
};

// Company facts that are true regardless of what's published in Sanity —
// used as the fallback when fewer than three metrics are published, so the
// section is never a sparse one- or two-item grid.
const CONFIRMED_FACTS = [
  `Founded ${FOUNDED_YEAR}`,
  `${YEARS_OF_EXPERIENCE} Years of Experience`,
  "Category 1 General Contractor",
  "Addis Ababa Headquarters",
  `${DIVISIONS.length} Business Divisions`,
];

export function Metrics({ metrics }: MetricsProps) {
  const showGrid = metrics.length >= 3;

  return (
    <section className="bg-dark-secondary py-16 text-off-white md:py-24 lg:py-32">
      <div className="container-wide">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-secondary uppercase">
            By the Numbers
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Our Track Record</h2>
        </MotionSection>

        {showGrid ? (
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:mt-16 lg:grid-cols-6">
            {metrics.map((metric, index) => (
              <MotionSection key={metric.id} delay={index * 0.05}>
                <AnimatedMetric
                  id={metric.id}
                  value={metric.value}
                  suffix={metric.suffix}
                  label={metric.label}
                />
              </MotionSection>
            ))}
          </div>
        ) : (
          <MotionSection delay={0.05} className="mt-12 lg:mt-16">
            <ul
              data-confirmed-facts
              className="flex flex-wrap gap-x-10 gap-y-4 text-base text-off-white/85"
            >
              {CONFIRMED_FACTS.map((fact) => (
                <li key={fact} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-construction-gold" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </MotionSection>
        )}
      </div>
    </section>
  );
}
