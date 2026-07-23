"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";

type AnimatedMetricProps = {
  id: string;
  value: number;
  suffix?: string;
  label: string;
};

export function AnimatedMetric({ id, value, suffix, label }: AnimatedMetricProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotionContext();

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        el.textContent = String(value);
        return;
      }

      const counter = { val: 0 };
      gsap.to(counter, {
        val: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        onUpdate: () => {
          el.textContent = String(Math.round(counter.val));
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reducedMotion, value]);

  return (
    <div data-metric={id} data-metric-status="confirmed">
      <p className="text-5xl text-construction-gold md:text-6xl">
        <span ref={numberRef} data-metric-value aria-hidden="true">
          0
        </span>
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
