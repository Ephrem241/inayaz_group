"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";
import { cn } from "@/lib/utils/cn";

type MotionSectionProps = {
  children: ReactNode;
  y?: number;
  delay?: number;
  className?: string;
};

export function MotionSection({ children, y = 24, delay = 0, className }: MotionSectionProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionContext();

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay,
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reducedMotion, y, delay]);

  return (
    <div ref={elementRef} data-motion-section className={cn("opacity-0", className)}>
      {children}
    </div>
  );
}
