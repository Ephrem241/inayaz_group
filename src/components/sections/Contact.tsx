import { MotionSection } from "@/components/motion/MotionSection";
import { ContactForm } from "@/components/forms/ContactForm";

type ContactProps = {
  // "h2" when this section is embedded on the homepage (which already has
  // its own h1 in the hero); the dedicated /contact page passes "h1" since
  // this is the only heading on that page — every page needs exactly one h1.
  headingLevel?: "h1" | "h2";
};

export function Contact({ headingLevel = "h2" }: ContactProps = {}) {
  const Heading = headingLevel;

  return (
    <section data-contact-section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <MotionSection>
              <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
                Contact
              </p>
              <Heading className="mt-4 text-4xl md:text-5xl">Start a Conversation</Heading>
              <p className="mt-6 max-w-md text-base text-off-white/80">
                Reach out to discuss a project, a partnership, or anything else about INAYAZ
                Group.
              </p>

              <address className="mt-10 not-italic">
                <p className="text-sm text-muted">
                  ZULYEKA Building
                  <br />
                  6th Floor, Office 603
                  <br />
                  Addis Ababa, Ethiopia
                </p>
                <p className="mt-4 text-sm">
                  <a href="mailto:info@inayazgroup.com" className="text-muted hover:text-primary">
                    info@inayazgroup.com
                  </a>
                </p>
                <p className="mt-2 text-sm">
                  <a href="tel:+251973223312" className="text-muted hover:text-primary">
                    +251 973 223 312
                  </a>
                  <br />
                  <a href="tel:+251968666664" className="text-muted hover:text-primary">
                    +251 968 666 664
                  </a>
                </p>
              </address>
            </MotionSection>
          </div>

          <div className="lg:col-span-7">
            <MotionSection delay={0.1}>
              <div className="rounded bg-off-white p-6 text-architectural-charcoal md:p-8">
                <ContactForm />
              </div>
            </MotionSection>
          </div>
        </div>
      </div>
    </section>
  );
}
