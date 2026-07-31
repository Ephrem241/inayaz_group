"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";
import { cn } from "@/lib/utils/cn";

type ParallaxImageProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  blurDataURL?: string;
  throwPx?: number;
};

// GSAP + ScrollTrigger, not Framer Motion — scroll-linked motion stays on
// ScrollTrigger for Lenis-sync correctness (see CLAUDE.md's animation-
// library note). A light, supporting-tier parallax: a much smaller throw
// than CinematicHero/ProjectShowcase's scroll-scrub, no pointer component.
// The inner image is oversized by `throwPx` on each side so the scrub never
// reveals a gap at the wrapper's edge.
export function ParallaxImage({
  src,
  alt,
  aspectRatio = "4 / 5",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  className,
  blurDataURL,
  throwPx = 12,
}: ParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionContext();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(innerRef.current, { y: 0 });
        return;
      }

      gsap.set(innerRef.current, { y: -throwPx });

      gsap.timeline({
        scrollTrigger: { trigger: wrapper, start: "top bottom", end: "bottom top", scrub: true },
      }).to(innerRef.current, { y: throwPx, ease: "none" }, 0);
    }, wrapper);

    return () => ctx.revert();
  }, [reducedMotion, throwPx]);

  return (
    <div
      ref={wrapperRef}
      data-parallax-image
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio }}
    >
      <div ref={innerRef} className="absolute inset-x-0" style={{ top: -throwPx, bottom: -throwPx }}>
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
}
