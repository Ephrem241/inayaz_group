"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";
import { usePointerTilt } from "@/lib/motion/usePointerTilt";
import { cn } from "@/lib/utils/cn";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  delay?: number;
};

const ENTER_EASE = [0.16, 1, 0.3, 1] as const;

// Generic card wrapper — hover lift + gentle 3D tilt + bigger shadow + soft
// glow. Tilt magnitude is smaller than Image3D's (rotateX/rotateY tilt the
// whole card including its text, not just a photo — too much would distort
// readability, not just look premium).
export function MotionCard({ children, className, tilt: tiltEnabled = true, delay = 0 }: MotionCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionContext();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const tilt = usePointerTilt({ maxRotateX: 2, maxRotateY: 3, disabled: reducedMotion || !tiltEnabled });

  return (
    <motion.div
      ref={ref}
      data-motion-card
      data-motion-initial
      className={cn("[perspective:1200px]", className)}
      // `initial` stays an unconditional object — it only matters at the
      // literal mount commit, which always matches SSR's hidden state
      // (useReducedMotionContext's server snapshot is always false). Making
      // it conditional on reducedMotion caused a reproducible bug: on the
      // render where reducedMotion flips from false to true post-hydration,
      // Framer would leave the element frozen at its hidden `initial` state
      // forever instead of jumping to `animate` — confirmed by inspecting
      // the actual reducedMotion/inView prop values at that render (both
      // correctly true) against the DOM's still-hidden computed style.
      // Driving the visible state through `animate` + an instant transition
      // avoids that path entirely.
      initial={{ opacity: 0, y: 24 }}
      animate={reducedMotion || inView ? { opacity: 1, y: 0 } : undefined}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.9, ease: ENTER_EASE, delay }}
    >
      <motion.div
        style={tilt.style}
        onPointerMove={tilt.handlers.onPointerMove}
        onPointerLeave={tilt.handlers.onPointerLeave}
        whileHover={reducedMotion ? undefined : { y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className={cn(
          "rounded-sm transition-shadow duration-300",
          "shadow-[0_2px_10px_-4px_rgb(0_0_0/0.25)]",
          "hover:shadow-[0_20px_45px_-12px_rgb(0_0_0/0.4),0_0_0_1px_rgb(178_34_34/0.08),0_0_30px_-8px_rgb(178_34_34/0.18)]",
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
