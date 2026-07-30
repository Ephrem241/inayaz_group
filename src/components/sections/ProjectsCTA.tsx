import { MotionSection } from "@/components/motion/MotionSection";
import { PRIMARY_CTA } from "@/constants/navigation";
import { TrackedLink } from "@/components/analytics/TrackedLink";

export function ProjectsCTA() {
  return (
    <section data-projects-cta-section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-content text-center">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Have a Project in Mind?
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Let&apos;s Build It Together</h2>
          <p className="mx-auto mt-6 max-w-md text-base text-off-white/80">
            Reach out to discuss a project, a partnership, or anything else about
            INAYAZ Group.
          </p>
          <TrackedLink
            href={PRIMARY_CTA.href}
            event="construction_consultation"
            eventProps={{ source: "projects_cta" }}
            className="btn btn-primary mt-8 inline-flex"
          >
            {PRIMARY_CTA.label}
          </TrackedLink>
        </MotionSection>
      </div>
    </section>
  );
}
