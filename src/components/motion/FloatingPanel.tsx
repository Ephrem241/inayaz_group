"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";
import { cn } from "@/lib/utils/cn";

type FloatingPanelProps = {
  children: ReactNode;
  className?: string;
  float?: boolean;
  tone?: "surface" | "section";
};

// Glass panel: blur/border/shadow-hierarchy styling applies regardless of
// motion preference (it's visual design, not animation) — only the
// continuous 1-2px float is gated by reduced motion. Rest state is fully
// visible, so no data-motion-initial is needed here.
export function FloatingPanel({ children, className, float = true, tone = "surface" }: FloatingPanelProps) {
  const reducedMotion = useReducedMotionContext();
  const toneClass = tone === "surface" ? "bg-charcoal-surface/70" : "bg-charcoal-section/70";
  const shouldFloat = float && !reducedMotion;

  return (
    <motion.div
      data-floating-panel
      className={cn(
        "rounded-sm border border-hairline/40 backdrop-blur-md",
        "shadow-[0_8px_30px_-12px_rgb(0_0_0/0.5),inset_0_1px_0_0_rgb(255_255_255/0.04)]",
        toneClass,
        className,
      )}
      // A fixed { y: 0 } target (not undefined) when not floating, with an
      // instant transition, guarantees a clean rest state even if float
      // briefly started before useReducedMotionContext's first-hydrated-
      // render false-then-true flip settled — undefined would just freeze
      // wherever the loop happened to be mid-cycle instead of resetting.
      animate={shouldFloat ? { y: [0, -2, 0] } : { y: 0 }}
      transition={shouldFloat ? { duration: 7, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
    >
      {children}
    </motion.div>
  );
}
