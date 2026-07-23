import Link from "next/link";
import { MotionSection } from "@/components/motion/MotionSection";
import { PRIMARY_CTA } from "@/constants/navigation";

export function ServicesCTA() {
  return (
    <section data-services-cta-section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-content text-center">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Start a Conversation
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Let&apos;s Discuss Your Project</h2>
          <p className="mx-auto mt-6 max-w-md text-base text-off-white/80">
            Reach out to discuss a project, a partnership, or anything else about
            INAYAZ Group.
          </p>
          <Link href={PRIMARY_CTA.href} className="btn btn-primary mt-8 inline-flex">
            {PRIMARY_CTA.label}
          </Link>
        </MotionSection>
      </div>
    </section>
  );
}
