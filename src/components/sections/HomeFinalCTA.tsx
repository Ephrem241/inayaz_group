import { MotionSection } from "@/components/motion/MotionSection";
import { PRIMARY_CTA } from "@/constants/navigation";
import { company } from "@/constants/company";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { TrackedAnchor } from "@/components/analytics/TrackedAnchor";

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

// Homepage closing section — a compact CTA band, not the full contact form
// (that stays exclusively on /contact, which this links to). Replaces the
// homepage's previous inline <Contact /> instance, which duplicated the
// entire form and address block that already has its own dedicated page.
export function HomeFinalCTA() {
  return (
    <section data-home-final-cta-section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-content text-center">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Next Steps
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Ready to Build What&apos;s Next?</h2>
          <p className="mx-auto mt-6 max-w-md text-base text-off-white/80">
            Reach out to discuss a project, a partnership, or anything else about
            INAYAZ Group.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <TrackedLink
              href={PRIMARY_CTA.href}
              event="start_conversation"
              eventProps={{ source: "homepage_final_cta" }}
              className="btn btn-primary"
            >
              {PRIMARY_CTA.label}
            </TrackedLink>
            <TrackedAnchor
              href={`mailto:${company.email}`}
              event="email_click"
              eventProps={{ source: "homepage_final_cta" }}
              className="btn btn-outline"
            >
              Email Us
            </TrackedAnchor>
          </div>

          <p className="mt-6 text-sm">
            <TrackedAnchor
              href={telHref(company.phones[0])}
              event="phone_click"
              eventProps={{ source: "homepage_final_cta" }}
              className="text-off-white/70 hover:text-primary"
            >
              {company.phones[0]}
            </TrackedAnchor>
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
