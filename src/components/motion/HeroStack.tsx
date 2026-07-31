"use client";

import { forwardRef, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";

type HeroStackProps = {
  src: string;
  alt: string;
  // Distinct photos for the two dimmed depth-echo layers — when provided,
  // gives the stack genuine layered depth instead of echoing the sharp
  // foreground photo behind itself. Falls back to `src` when omitted.
  backSrc?: string;
  midSrc?: string;
  sizes?: string;
  priority?: boolean;
  blurDataURL?: string;
};

// Fixed base transform for each echo layer — GSAP owns the whole transform
// once JS runs (see below), so these are only the resting values, not a
// static className/inline style GSAP would otherwise have to fight with.
const BACK_ECHO = { scale: 0.94, x: -12, y: -8 };
const MID_ECHO = { scale: 0.97, x: -6, y: -4 };

// Layered "stacked cards" depth — two dimmed/desaturated echo layers offset
// behind the sharp foreground layer, ideally each a distinct real photo
// (backSrc/midSrc) for genuine layered depth; falls back to reusing `src`
// for projects without extra photography. The foreground layer is the
// forwarded ref, so the caller (ProjectShowcase) keeps driving its existing
// clip-path reveal + scroll-scrub scale on it completely unchanged —
// HeroStack only owns the two echo layers and each layer's small,
// independent pointer-parallax.
export const HeroStack = forwardRef<HTMLDivElement, HeroStackProps>(function HeroStack(
  { src, alt, backSrc, midSrc, sizes = "100vw", priority = false, blurDataURL },
  foregroundRef,
) {
  const resolvedBackSrc = backSrc ?? src;
  const resolvedMidSrc = midSrc ?? src;
  const containerRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionContext();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let removePointerListener: (() => void) | undefined;

    const ctx = gsap.context(() => {
      // Static depth composition (scale/offset/dim) applies regardless of
      // motion preference — it's the "stacked cards" look itself, not an
      // animation. Only the pointer-driven movement on top of it is gated.
      gsap.set(backRef.current, BACK_ECHO);
      gsap.set(midRef.current, MID_ECHO);

      if (reducedMotion) return;

      const pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (!pointerFine) return;

      const setBackX = gsap.quickTo(backRef.current, "x", { duration: 0.7, ease: "power2.out" });
      const setBackY = gsap.quickTo(backRef.current, "y", { duration: 0.7, ease: "power2.out" });
      const setMidX = gsap.quickTo(midRef.current, "x", { duration: 0.6, ease: "power2.out" });
      const setMidY = gsap.quickTo(midRef.current, "y", { duration: 0.6, ease: "power2.out" });

      const onPointerMove = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;
        const relY = (event.clientY - rect.top) / rect.height - 0.5;

        // Absolute values, not deltas — quickTo replaces the whole
        // transform value each call, so the base echo offset has to be
        // re-added every time rather than animated as an increment.
        setBackX(BACK_ECHO.x + relX * 14);
        setBackY(BACK_ECHO.y + relY * 10);
        setMidX(MID_ECHO.x + relX * 10);
        setMidY(MID_ECHO.y + relY * 7);
      };

      container.addEventListener("pointermove", onPointerMove);
      removePointerListener = () => container.removeEventListener("pointermove", onPointerMove);
    }, container);

    return () => {
      removePointerListener?.();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 [perspective:1400px]">
      <div ref={backRef} aria-hidden="true" className="absolute inset-0 opacity-35 grayscale-[30%] brightness-75">
        <Image src={resolvedBackSrc} alt="" fill sizes={sizes} className="object-cover" />
      </div>

      <div ref={midRef} aria-hidden="true" className="absolute inset-0 opacity-55 grayscale-[15%] brightness-90">
        <Image src={resolvedMidSrc} alt="" fill sizes={sizes} className="object-cover" />
      </div>

      <div ref={foregroundRef} data-project-image-scale className="absolute inset-0">
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
      </div>
    </div>
  );
});
