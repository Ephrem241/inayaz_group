import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

type AnimatedMetricProps = {
  id: string;
  value: number;
  suffix?: string;
  label: string;
};

export function AnimatedMetric({ id, value, suffix, label }: AnimatedMetricProps) {
  return (
    <div data-metric={id}>
      <p className="text-5xl text-construction-gold md:text-6xl">
        <AnimatedCounter value={value} data-metric-value aria-hidden="true" />
        {suffix && <span aria-hidden="true">{suffix}</span>}
        <span className="sr-only">
          {value}
          {suffix ?? ""} {label}
        </span>
      </p>
      <p className="mt-2 text-sm tracking-wide text-off-white/70 uppercase">{label}</p>
    </div>
  );
}
