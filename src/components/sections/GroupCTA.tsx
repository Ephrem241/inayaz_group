import { MotionSection } from "@/components/motion/MotionSection";
import { PRIMARY_CTA } from "@/constants/navigation";
import { TrackedLink } from "@/components/analytics/TrackedLink";

export function GroupCTA() {
  return (
    <section data-group-cta-section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-content text-center">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Work With Us
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">One Group, Every Capability</h2>
          <p className="mx-auto mt-6 max-w-md text-base text-off-white/80">
            Whichever division fits your project, our team is ready to talk
            through the details.
          </p>
          <TrackedLink
            href={PRIMARY_CTA.href}
            event="start_conversation"
            eventProps={{ source: "group_cta" }}
            className="btn btn-primary mt-8 inline-flex"
          >
            {PRIMARY_CTA.label}
          </TrackedLink>
        </MotionSection>
      </div>
    </section>
  );
}
