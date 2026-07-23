"use client";

import { useEffect, type ReactNode } from "react";
import { initSmoothScroll } from "@/lib/motion/lenis";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotionContext();

  useEffect(() => {
    if (reducedMotion) return;
    return initSmoothScroll();
  }, [reducedMotion]);

  return children;
}
