"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { useInView, useMotionValue, animate } from "motion/react";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";

type AnimatedCounterProps = {
  value: number;
  duration?: number;
  decimals?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"span">, "children" | "className">;

// Server-renders the FINAL value (not "0") so a no-JS/hydration-failure
// visitor sees the correct number immediately — only resets to the
// animation's start value post-hydration, then counts up. This closes a
// real gap in the manual GSAP counter this replaces (AnimatedMetric used to
// server-render "0" and rely entirely on a useEffect to ever correct it —
// under no-JS that number was permanently stuck at zero).
export function AnimatedCounter({
  value,
  duration = 1.6,
  decimals = 0,
  className,
  ...rest
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotionContext();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const motionValue = useMotionValue(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      el.textContent = value.toFixed(decimals);
      return;
    }

    // Reset from the server-rendered final value down to 0 now that we know
    // JS is running, then count up once the element is actually in view.
    el.textContent = (0).toFixed(decimals);
    motionValue.set(0);

    if (!inView) return;

    const controls = animate(motionValue, value, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (latest) => {
        el.textContent = latest.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [reducedMotion, inView, value, duration, decimals, motionValue]);

  return (
    <span ref={ref} className={className} {...rest}>
      {value.toFixed(decimals)}
    </span>
  );
}
