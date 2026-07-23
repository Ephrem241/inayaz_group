import { MotionSection } from "@/components/motion/MotionSection";
import { AnimatedMetric } from "@/components/metrics/AnimatedMetric";
import type { Metric } from "@/constants/metrics";

type MetricsProps = {
  metrics: Metric[];
};

export function Metrics({ metrics }: MetricsProps) {
  return (
    <section className="bg-dark-secondary py-16 text-off-white md:py-24 lg:py-32">
      <div className="container-wide">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            By the Numbers
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Our Track Record</h2>
        </MotionSection>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:mt-16 lg:grid-cols-6">
          {metrics.map((metric, index) => (
            <MotionSection key={metric.id} delay={index * 0.05}>
              {metric.status === "confirmed" ? (
                <AnimatedMetric
                  id={metric.id}
                  value={metric.value}
                  suffix={metric.suffix}
                  label={metric.label}
                />
              ) : (
                <div data-metric={metric.id} data-metric-status="pending">
                  <p className="text-5xl text-off-white/30 md:text-6xl">—</p>
                  <p className="mt-2 text-sm tracking-wide text-off-white/70 uppercase">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-xs text-off-white/40 italic">Pending confirmation</p>
                </div>
              )}
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}
