import { MotionSection } from "@/components/motion/MotionSection";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { company } from "@/constants/company";
import type { Project } from "@/constants/projects";
import { TrackedAnchor } from "@/components/analytics/TrackedAnchor";

type RealEstateDetailsProps = {
  project: Project;
};

// Every field here is optional and hidden cleanly when unset — the one
// exception is pricing, which always shows something: a real pricingNote
// once confirmed, or an honest "Contact for pricing" fallback (never a
// fabricated figure).
export function RealEstateDetails({ project }: RealEstateDetailsProps) {
  const hasSpecs = project.builtArea || project.units;
  const contactLine = project.salesContact ?? company.email;

  return (
    <section data-real-estate-details-section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-secondary uppercase">
            Development Details
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">What This Development Offers</h2>
        </MotionSection>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 lg:mt-16 lg:grid-cols-2">
          {project.unitTypes && project.unitTypes.length > 0 && (
            <MotionSection>
              <h3 className="text-lg font-medium">Unit Types</h3>
              <ul className="mt-4 space-y-2 text-base text-off-white/80">
                {project.unitTypes.map((type) => (
                  <li key={type} className="border-l-2 border-construction-gold pl-4">
                    {type}
                  </li>
                ))}
              </ul>
            </MotionSection>
          )}

          {project.amenities && project.amenities.length > 0 && (
            <MotionSection delay={0.05}>
              <h3 className="text-lg font-medium">Amenities</h3>
              <ul className="mt-4 space-y-2 text-base text-off-white/80">
                {project.amenities.map((amenity) => (
                  <li key={amenity} className="border-l-2 border-construction-gold pl-4">
                    {amenity}
                  </li>
                ))}
              </ul>
            </MotionSection>
          )}
        </div>

        {hasSpecs && (
          <MotionSection delay={0.1} className="mt-12 flex flex-wrap gap-x-10 gap-y-4 lg:mt-16">
            {project.builtArea && (
              <div>
                <p className="text-sm text-off-white/60">Built Area</p>
                <p className="mt-1 text-2xl text-off-white">{project.builtArea}</p>
              </div>
            )}
            {project.units && (
              <div>
                <p className="text-sm text-off-white/60">Units</p>
                <p className="mt-1 text-2xl text-off-white">{project.units}</p>
              </div>
            )}
          </MotionSection>
        )}

        <MotionSection delay={0.15} className="mt-12 border-t border-off-white/10 pt-10 lg:mt-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm text-off-white/60">Pricing</p>
              <p className="mt-1 text-2xl text-off-white">
                {project.pricingNote ?? "Contact for pricing"}
              </p>
              {project.paymentPlanNote && (
                <p className="mt-2 max-w-md text-sm text-off-white/70">{project.paymentPlanNote}</p>
              )}
            </div>

            {project.brochureUrl && (
              <TrackedAnchor
                href={project.brochureUrl}
                event="brochure_download"
                eventProps={{ development: project.slug }}
                className="btn btn-outline"
                target="_blank"
                rel="noopener"
              >
                Download Brochure
              </TrackedAnchor>
            )}
          </div>

          <p className="mt-6 text-sm text-off-white/60">
            Sales inquiries:{" "}
            <TrackedAnchor
              href={`mailto:${contactLine}`}
              event="email_click"
              eventProps={{ source: "real_estate_details", development: project.slug }}
              className="text-off-white/80 hover:text-secondary"
            >
              {contactLine}
            </TrackedAnchor>
          </p>
        </MotionSection>

        {project.gallery.length > 0 && (
          <MotionSection delay={0.2} className="mt-12 lg:mt-16">
            <ProjectGallery images={project.gallery} />
          </MotionSection>
        )}
      </div>
    </section>
  );
}
