"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";

export function CinematicHero() {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const midgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionContext();

  useEffect(() => {
    const container = heroRef.current;
    if (!container) return;

    let removePointerListener: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const revealTargets = [
        eyebrowRef.current,
        subtextRef.current,
        ctaRef.current,
        scrollIndicatorRef.current,
      ];

      if (reducedMotion) {
        gsap.set(revealTargets, { opacity: 1, y: 0 });
        gsap.set(headlineRef.current, { clipPath: "inset(0 0 0% 0)" });
        gsap.set(backgroundRef.current, { scale: 1.05 });
        return;
      }

      gsap.set(backgroundRef.current, { scale: 1.05 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          headlineRef.current,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "expo.out" },
          "-=0.3",
        )
        .fromTo(subtextRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2",
        );

      gsap.timeline({
        scrollTrigger: { trigger: container, start: "top top", end: "bottom top", scrub: true },
      })
        .to(backgroundRef.current, { scale: 1.12, ease: "none" }, 0)
        .to(midgroundRef.current, { yPercent: -8, ease: "none" }, 0)
        .to(foregroundRef.current, { yPercent: -14, ease: "none" }, 0);

      const pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (pointerFine) {
        const setMidX = gsap.quickTo(midgroundRef.current, "x", { duration: 0.8, ease: "power2.out" });
        const setMidY = gsap.quickTo(midgroundRef.current, "y", { duration: 0.8, ease: "power2.out" });
        const setForeX = gsap.quickTo(foregroundRef.current, "x", { duration: 0.6, ease: "power2.out" });
        const setForeY = gsap.quickTo(foregroundRef.current, "y", { duration: 0.6, ease: "power2.out" });

        const onPointerMove = (event: PointerEvent) => {
          const rect = container.getBoundingClientRect();
          const relX = (event.clientX - rect.left) / rect.width - 0.5;
          const relY = (event.clientY - rect.top) / rect.height - 0.5;

          setMidX(relX * 12);
          setMidY(relY * 8);
          setForeX(relX * 22);
          setForeY(relY * 14);
        };

        container.addEventListener("pointermove", onPointerMove);
        removePointerListener = () => container.removeEventListener("pointermove", onPointerMove);
      }
    }, container);

    return () => {
      removePointerListener?.();
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [reducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative h-dvh min-h-[640px] w-full overflow-hidden bg-dark"
    >
      <div ref={backgroundRef} className="absolute inset-0">
        <Image
          src="/images/hero/placeholder-hero-background.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div ref={midgroundRef} className="absolute inset-x-0 -top-[6%] h-[112%]">
        <Image
          src="/images/hero/placeholder-hero-midground.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-80"
        />
      </div>

      <div ref={foregroundRef} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image
          src="/images/hero/placeholder-hero-foreground.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-90"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/85 via-deep-navy/45 to-deep-navy/15" />
      <div className="grain-overlay absolute inset-0" />

      <div className="container-content relative z-10 flex h-full flex-col justify-center text-off-white">
        <p
          ref={eyebrowRef}
          className="text-sm font-medium tracking-[0.3em] text-primary uppercase opacity-0"
        >
          INAYAZ Group
        </p>

        <h1
          ref={headlineRef}
          className="mt-6 max-w-3xl text-5xl leading-tight md:text-7xl"
          style={{ clipPath: "inset(0 0 100% 0)" }}
        >
          Engineering Landmarks.
          <br />
          Creating Lasting Value.
        </h1>

        <p ref={subtextRef} className="mt-6 max-w-xl text-base text-off-white/85 opacity-0">
          A diversified Ethiopian business group delivering construction, real estate,
          manufacturing, import, export, travel, and equipment solutions with precision,
          integrity, and long-term responsibility.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4 opacity-0">
          <Link href="/projects" className="btn btn-primary">
            Explore Our Projects
          </Link>
          <Link href="/about" className="btn btn-outline">
            Discover INAYAZ
          </Link>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-off-white/70 opacity-0"
        aria-hidden="true"
      >
        <div className="h-10 w-px bg-current" />
      </div>
    </section>
  );
}
