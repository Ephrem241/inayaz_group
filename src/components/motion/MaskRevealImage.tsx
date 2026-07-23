"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";
import { cn } from "@/lib/utils/cn";

type MaskRevealImageProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  blurDataURL?: string;
};

export function MaskRevealImage({
  src,
  alt,
  aspectRatio = "4 / 5",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  className,
  blurDataURL,
}: MaskRevealImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionContext();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(wrapper, { clipPath: "inset(0 0 0% 0)" });
        gsap.set(imageInnerRef.current, { scale: 1 });
        return;
      }

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 80%",
        toggleActions: "play none none none",
        onEnter: () => {
          gsap.to(wrapper, { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "expo.out" });
          gsap.to(imageInnerRef.current, { scale: 1, duration: 1.6, ease: "power3.out" });
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={wrapperRef}
      data-mask-reveal
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio, clipPath: "inset(0 0 100% 0)" }}
    >
      <div ref={imageInnerRef} className="absolute inset-0 scale-110">
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
