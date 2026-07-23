import { MotionSection } from "@/components/motion/MotionSection";
import { ServiceImageSwitcher } from "@/components/services/ServiceImageSwitcher";
import { SERVICES } from "@/constants/services";

export function ServicesShowcase() {
  // Icons must be rendered here, server-side, before crossing into the client
  // ServiceImageSwitcher — passing a raw component reference (LucideIcon) as a
  // prop value is not serializable across the server/client boundary, unlike
  // rendering an icon directly into server-owned JSX.
  const services = SERVICES.map((service) => ({
    ...service,
    icon: <service.icon className="h-5 w-5 shrink-0 text-construction-gold" aria-hidden="true" />,
  }));

  return (
    <section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-wide">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Our Services
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Full-Service, Ground to Handover.</h2>
        </MotionSection>

        <div className="mt-12 lg:mt-16">
          <ServiceImageSwitcher items={services} />
        </div>
      </div>
    </section>
  );
}
