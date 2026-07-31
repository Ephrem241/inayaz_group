import { MotionSection } from "@/components/motion/MotionSection";
import type { Project } from "@/constants/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";

type RealEstateDetailCTAProps = {
  project: Project;
};

export function RealEstateDetailCTA({ project }: RealEstateDetailCTAProps) {
  return (
    <section data-real-estate-detail-cta-section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-content text-center">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-secondary uppercase">
            Next Steps
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Interested in {project.name}?</h2>
          <p className="mx-auto mt-6 max-w-md text-base text-off-white/80">
            Schedule a visit or request more information about this development.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <TrackedLink
              href={`/contact?interest=real-estate&development=${project.slug}`}
              event="property_visit"
              eventProps={{ source: "real_estate_detail_cta", development: project.slug }}
              className="btn btn-primary"
            >
              Schedule a Property Visit
            </TrackedLink>
            <TrackedLink
              href={`/contact?interest=real-estate&development=${project.slug}`}
              event="property_details_request"
              eventProps={{ source: "real_estate_detail_cta", development: project.slug }}
              className="btn btn-outline"
            >
              Request Property Details
            </TrackedLink>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
