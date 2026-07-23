import { cn } from "@/lib/utils/cn";

type ScrollProgressLineProps = {
  totalStages: number;
  activeIndex: number;
  stageLabels: string[];
  className?: string;
};

export function ScrollProgressLine({
  totalStages,
  activeIndex,
  stageLabels,
  className,
}: ScrollProgressLineProps) {
  return (
    <div data-progress-line className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: totalStages }, (_, index) => {
        const isActive = index === activeIndex;
        const isPassed = index <= activeIndex;

        return (
          <span
            key={stageLabels[index] ?? index}
            data-progress-segment
            aria-current={isActive ? "step" : undefined}
            aria-label={stageLabels[index]}
            className={cn(
              "h-0.5 flex-1 rounded-full transition-colors",
              isPassed ? "bg-construction-gold" : "bg-off-white/20",
            )}
          />
        );
      })}
    </div>
  );
}
