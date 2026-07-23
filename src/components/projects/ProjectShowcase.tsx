"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";
import type { Project } from "@/constants/projects";

type ProjectShowcaseProps = {
  project: Project;
  tone: "dark" | "light";
};

export function ProjectShowcase({ project, tone }: ProjectShowcaseProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionContext();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(wrapper, { clipPath: "inset(0 0 0% 0)" });
        gsap.set(imageRef.current, { scale: 1 });
        return;
      }

      gsap.set(imageRef.current, { scale: 1.08 });

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 80%",
        toggleActions: "play none none none",
        onEnter: () => {
          gsap.to(wrapper, { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "expo.out" });
        },
      });

      // Continuous scroll-scrubbed scale — distinct mechanism from the one-shot
      // reveal above, modeled on CinematicHero's background-scale technique.
      gsap.timeline({
        scrollTrigger: { trigger: wrapper, start: "top bottom", end: "bottom top", scrub: true },
      }).to(imageRef.current, { scale: 1.18, ease: "none" }, 0);
    }, wrapper);

    // ctx.revert() only — NOT a global ScrollTrigger.getAll() sweep. This
    // component renders 3 times per page; a global sweep on unmount would
    // wrongly kill the other panels' (and every other component's) triggers.
    // That global-sweep pattern is only safe for a true page singleton
    // (see CinematicHero) — this is not one.
    return () => ctx.revert();
  }, [reducedMotion]);

  const sectionClass = tone === "dark" ? "section-dark" : "section-light";

  return (
    <section data-project={project.slug} className={`${sectionClass} py-16 md:py-24 lg:py-32`}>
      <div
        ref={wrapperRef}
        data-project-reveal
        className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[21/9]"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div ref={imageRef} data-project-image-scale className="absolute inset-0">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
            placeholder={project.image.blurDataURL ? "blur" : "empty"}
            blurDataURL={project.image.blurDataURL}
          />
        </div>
      </div>

      <div className="container-wide mt-10">
        <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
          {project.category}
        </p>
        <h3 className="mt-4 text-4xl md:text-5xl">{project.name}</h3>

        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <div>
            <dt className="inline font-medium">Client: </dt>
            <dd className="inline">{project.client}</dd>
          </div>
          <div>
            <dt className="inline font-medium">Structure: </dt>
            <dd className="inline">{project.structure}</dd>
          </div>
          {project.consultant && (
            <div>
              <dt className="inline font-medium">Consultant: </dt>
              <dd className="inline">{project.consultant}</dd>
            </div>
          )}
          {project.location && (
            <div>
              <dt className="inline font-medium">Location: </dt>
              <dd className="inline">{project.location}</dd>
            </div>
          )}
        </dl>

        <p className="mt-6 max-w-2xl text-base text-muted-foreground">{project.description}</p>

        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View ${project.name} project`}
          className="btn btn-primary mt-8 inline-flex"
        >
          View Project
        </Link>
      </div>
    </section>
  );
}
