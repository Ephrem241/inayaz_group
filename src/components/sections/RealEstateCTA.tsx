import { MotionSection } from "@/components/motion/MotionSection";
import { TrackedLink } from "@/components/analytics/TrackedLink";

export function RealEstateCTA() {
  return (
    <section data-real-estate-cta-section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-content text-center">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-secondary uppercase">
            Interested in a Development?
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Schedule a Property Visit</h2>
          <p className="mx-auto mt-6 max-w-md text-base text-off-white/80">
            Reach out to schedule a visit or request more information about any INAYAZ
            development.
          </p>
          <TrackedLink
            href="/contact?interest=real-estate"
            event="property_details_request"
            eventProps={{ source: "real_estate_listing_cta" }}
            className="btn btn-primary mt-8 inline-flex"
          >
            Request Property Details
          </TrackedLink>
        </MotionSection>
      </div>
    </section>
  );
}
