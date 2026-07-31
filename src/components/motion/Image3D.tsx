"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";
import { usePointerTilt } from "@/lib/motion/usePointerTilt";
import { cn } from "@/lib/utils/cn";

type Image3DProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
  // When true, the component fills its positioned parent (absolute inset-0)
  // instead of sizing itself via aspectRatio — for full-bleed backgrounds
  // like ProcessScroller's pinned stage panels, where the parent already
  // defines the box.
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  blurDataURL?: string;
  delay?: number;
};

const ENTER_EASE = [0.16, 1, 0.3, 1] as const;

// Framer Motion (pointer-hover + one-shot viewport-entrance leaf component —
// GSAP/ScrollTrigger stays reserved for scroll-linked motion elsewhere, see
// CLAUDE.md's animation-library note). Entrance and pointer-tilt live on
// separate nested elements so their transforms never fight each other.
export function Image3D({
  src,
  alt,
  aspectRatio = "4 / 3",
  fill = false,
  sizes = "100vw",
  priority = false,
  className,
  blurDataURL,
  delay = 0,
}: Image3DProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionContext();
  const inView = useInView(outerRef, { once: true, amount: 0.3 });
  const tilt = usePointerTilt({ maxRotateX: 3, maxRotateY: 4, maxTranslateZ: 20, disabled: reducedMotion });

  return (
    <motion.div
      ref={outerRef}
      data-image-3d
      data-motion-initial
      className={cn(
        "relative overflow-hidden [perspective:1000px]",
        fill ? "absolute inset-0" : undefined,
        className,
      )}
      style={fill ? undefined : { aspectRatio }}
      // `initial` stays an unconditional object — it only matters at the
      // literal mount commit, which always matches SSR's hidden state
      // (useReducedMotionContext's server snapshot is always false). Making
      // it conditional on reducedMotion caused a reproducible bug: on the
      // render where reducedMotion flips from false to true post-hydration,
      // Framer would leave the element frozen at its hidden `initial` state
      // forever instead of jumping to `animate`. Driving the visible state
      // through `animate` + an instant transition avoids that path entirely.
      initial={{ opacity: 0, y: 24, scale: 0.95, rotateX: 6 }}
      animate={reducedMotion || inView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : undefined}
      transition={reducedMotion ? { duration: 0 } : { duration: 1, ease: ENTER_EASE, delay }}
    >
      <motion.div
        className="absolute inset-0"
        style={tilt.style}
        onPointerMove={tilt.handlers.onPointerMove}
        onPointerLeave={tilt.handlers.onPointerLeave}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
        />
      </motion.div>
    </motion.div>
  );
}
