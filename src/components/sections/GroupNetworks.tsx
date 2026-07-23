import { ArrowUpRight } from "lucide-react";
import { MotionSection } from "@/components/motion/MotionSection";
import { NETWORK_ENTITIES } from "@/constants/networks";

export function GroupNetworks() {
  const subBrands = NETWORK_ENTITIES.filter((entity) => entity.type === "sub-brand");
  const sisterCompany = NETWORK_ENTITIES.find((entity) => entity.type === "sister-company");

  return (
    <section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-content">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Stronger Together: Connecting Industry Leaders
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">Local Expertise. Global Reach.</h2>
        </MotionSection>

        <MotionSection delay={0.1} className="mt-12 lg:mt-16">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
            {subBrands.map((entity) => (
              <div
                key={entity.id}
                data-network={entity.id}
                className="border-t border-construction-gold/20 py-6"
              >
                <span className="font-heading text-2xl font-semibold tracking-tight text-off-white">
                  {entity.name}
                </span>
              </div>
            ))}
          </div>
        </MotionSection>

        {sisterCompany && (
          <MotionSection delay={0.15} className="mt-10">
            <div
              data-network={sisterCompany.id}
              className="rounded-sm border border-construction-gold/30 p-8 md:p-10"
            >
              <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
                Sister Company
              </p>
              <span className="mt-3 block font-heading text-3xl font-semibold tracking-tight text-off-white">
                {sisterCompany.name}
              </span>
              {sisterCompany.description && (
                <p className="mt-4 max-w-2xl text-base text-off-white/80">
                  {sisterCompany.description}
                </p>
              )}
              {sisterCompany.facts && (
                <ul className="mt-6 space-y-2">
                  {sisterCompany.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3 text-sm text-off-white/80">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-construction-gold" />
                      {fact}
                    </li>
                  ))}
                </ul>
              )}
              {sisterCompany.externalUrl && (
                <a
                  href={sisterCompany.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline decoration-construction-gold underline-offset-4 transition-colors hover:text-off-white"
                >
                  Visit akoyarealproperty.com
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </MotionSection>
        )}
      </div>
    </section>
  );
}
