"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";
import { cn } from "@/lib/utils/cn";

type RevealImageProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const ENTER_EASE = [0.16, 1, 0.3, 1] as const;

// Generic wrapper — a softer, lighter-weight alternative to MaskRevealImage's
// clip-path wipe, for the "supporting images" tier (About/Sustainability/
// News). MaskRevealImage itself stays untouched; this is a separate,
// intentionally distinct implementation, not a competing one.
export function RevealImage({ children, className, delay = 0 }: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionContext();
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      data-reveal-image
      data-motion-initial
      className={cn(className)}
      // See Image3D's identical comment: `initial` stays an unconditional
      // object (it only matters at mount, which always matches SSR's hidden
      // state) — making it conditional on reducedMotion caused a
      // reproducible bug where a post-hydration false-to-true flip left the
      // element frozen at its hidden state forever instead of jumping to
      // `animate`.
      initial={{ opacity: 0, y: 24, scale: 0.95, rotateX: 4 }}
      animate={reducedMotion || inView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : undefined}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.9, ease: ENTER_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
