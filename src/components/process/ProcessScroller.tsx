"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";
import { ScrollProgressLine } from "@/components/motion/ScrollProgressLine";
import { MotionSection } from "@/components/motion/MotionSection";
import type { ProcessStage } from "@/constants/construction-process";

type ProcessScrollerProps = {
  stages: ProcessStage[];
};

export function ProcessScroller({ stages }: ProcessScrollerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotionContext();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          if (reducedMotion) return;

          const pinTarget = pinRef.current;
          const panels = panelRefs.current.filter((el): el is HTMLDivElement => el !== null);
          if (!pinTarget || panels.length === 0) return;

          gsap.set(panels.slice(1), { opacity: 0 });
          gsap.set(panels[0], { opacity: 1 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinTarget,
              start: "top top",
              end: `+=${(stages.length - 1) * 100}%`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              onUpdate: (self) => {
                const idx = Math.min(
                  stages.length - 1,
                  Math.round(self.progress * (stages.length - 1)),
                );
                setActiveIndex((prev) => (prev === idx ? prev : idx));
              },
            },
          });

          for (let i = 1; i < panels.length; i++) {
            tl.to(panels[i - 1], { opacity: 0, duration: 1 }, i - 1).to(
              panels[i],
              { opacity: 1, duration: 1 },
              i - 1,
            );
          }
        },
      });
    }, wrapper);

    // ctx.revert() alone is sufficient, including for the pinned trigger —
    // GSAP's revert path automatically un-pins and removes the pin-spacer.
    // Do NOT add the hero's global ScrollTrigger.getAll() sweep here; that
    // pattern is reserved for the one true page-singleton hero.
    return () => ctx.revert();
  }, [reducedMotion, stages.length]);

  const desktopClassName = reducedMotion ? "hidden" : "hidden lg:block";
  const mobileClassName = reducedMotion ? "block" : "lg:hidden";

  return (
    <div ref={wrapperRef}>
      <div data-construction-process-desktop className={desktopClassName}>
        <div
          ref={pinRef}
          data-active-stage={activeIndex}
          className="relative h-screen overflow-hidden"
        >
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              ref={(el) => {
                panelRefs.current[index] = el;
              }}
              className="absolute inset-0 flex flex-col items-start justify-center"
            >
              <div className="container-wide">
                <span className="text-8xl text-construction-gold md:text-9xl">
                  {stage.number}
                </span>
                <h3 className="mt-4 text-4xl md:text-5xl">{stage.name}</h3>
                <p className="mt-4 max-w-xl text-base text-off-white/80">{stage.description}</p>
              </div>
            </div>
          ))}

          <div className="container-wide absolute right-0 bottom-12 left-0">
            <ScrollProgressLine
              totalStages={stages.length}
              activeIndex={activeIndex}
              stageLabels={stages.map((stage) => stage.name)}
            />
          </div>
        </div>
      </div>

      <div data-construction-process-mobile className={mobileClassName}>
        <div className="container-wide flex flex-col gap-12">
          {stages.map((stage) => (
            <MotionSection key={stage.id} className="relative pl-8">
              <span className="absolute top-1 left-0 h-2 w-2 rounded-full bg-construction-gold" />
              <span className="text-4xl text-construction-gold">{stage.number}</span>
              <h3 className="mt-2 text-2xl">{stage.name}</h3>
              <p className="mt-2 max-w-md text-sm text-off-white/80">{stage.description}</p>
            </MotionSection>
          ))}
        </div>
      </div>
    </div>
  );
}
