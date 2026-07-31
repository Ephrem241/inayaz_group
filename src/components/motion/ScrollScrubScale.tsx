"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";
import { cn } from "@/lib/utils/cn";

type ScrollScrubScaleProps = {
  children: ReactNode;
  className?: string;
  maxScale?: number;
};

// Thin GSAP wrapper: scroll-scrubbed scale around arbitrary children,
// modeled on ProjectShowcase's proven technique. Used on full-bleed
// case-study banners (ProjectHero/RealEstateHero) where a pointer-tilt
// would feel gimmicky — scroll-scrub is the better fit for something that
// large. Wraps MaskRevealImage's output rather than editing that component.
export function ScrollScrubScale({ children, className, maxScale = 1.08 }: ScrollScrubScaleProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionContext();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      gsap.set(innerRef.current, { scale: 1 });

      if (reducedMotion) return;

      gsap.timeline({
        scrollTrigger: { trigger: wrapper, start: "top bottom", end: "bottom top", scrub: true },
      }).to(innerRef.current, { scale: maxScale, ease: "none" }, 0);
    }, wrapper);

    return () => ctx.revert();
  }, [reducedMotion, maxScale]);

  return (
    <div ref={wrapperRef} className={cn("overflow-hidden", className)}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
