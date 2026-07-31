"use client";

import { useMotionValue, useSpring } from "motion/react";
import type { PointerEvent } from "react";

type PointerTiltOptions = {
  maxRotateX?: number;
  maxRotateY?: number;
  maxTranslateZ?: number;
  disabled?: boolean;
};

let pointerFineCache: boolean | null = null;
function isPointerFine(): boolean {
  if (typeof window === "undefined") return false;
  if (pointerFineCache === null) {
    pointerFineCache = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }
  return pointerFineCache;
}

// Shared desktop-only pointer-tilt logic for Image3D and MotionCard — one
// implementation of "max rotateX/rotateY/translateZ, smooth spring return"
// instead of duplicating it per component. Disabled entirely off pointer-fine
// devices (touch never triggers a tilt) and via the `disabled` flag, which
// callers wire to reducedMotion.
export function usePointerTilt({
  maxRotateX = 3,
  maxRotateY = 4,
  maxTranslateZ = 0,
  disabled = false,
}: PointerTiltOptions = {}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const translateZ = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 22, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springZ = useSpring(translateZ, springConfig);

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (disabled || !isPointerFine()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(relY * -maxRotateX * 2);
    rotateY.set(relX * maxRotateY * 2);
    if (maxTranslateZ) translateZ.set(maxTranslateZ);
  }

  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    translateZ.set(0);
  }

  return {
    style: {
      rotateX: springRotateX,
      rotateY: springRotateY,
      z: springZ,
      transformStyle: "preserve-3d" as const,
    },
    handlers: { onPointerMove, onPointerLeave },
  };
}
