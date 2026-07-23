import Image from "next/image";
import { MotionSection } from "@/components/motion/MotionSection";
import { MaskRevealImage } from "@/components/motion/MaskRevealImage";
import { SUSTAINABILITY_TOPICS } from "@/constants/sustainability";

type SustainabilityProps = {
  // "h2" when embedded on the homepage (which already has its own h1 in the
  // hero); the dedicated /sustainability page passes "h1" since this is the
  // only heading on that page — every page needs exactly one h1.
  headingLevel?: "h1" | "h2";
};

export function Sustainability({ headingLevel = "h2" }: SustainabilityProps = {}) {
  const Heading = headingLevel;

  return (
    <section
      data-sustainability-section
      className="bg-warm-stone text-architectural-charcoal py-16 md:py-24 lg:py-32"
    >
      <div className="container-content">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <MotionSection y={16}>
              <p className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
                Sustainability
              </p>
              <Heading className="mt-4 text-4xl md:text-5xl">Built to Last, Built Responsibly</Heading>
            </MotionSection>

            <MotionSection y={16} delay={0.1} className="mt-12 lg:mt-16">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                {SUSTAINABILITY_TOPICS.map((topic) => (
                  <div
                    key={topic.id}
                    data-sustainability-topic={topic.id}
                    className="border-l-2 border-construction-gold pl-6"
                  >
                    <span className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible">
                      {topic.number}
                    </span>
                    <h3 className="mt-2 text-xl font-medium md:text-2xl">{topic.name}</h3>
                    <p className="mt-2 text-sm text-architectural-charcoal/70">
                      {topic.description}
                    </p>
                  </div>
                ))}
              </div>
            </MotionSection>
          </div>

          <div className="lg:col-span-5">
            <MaskRevealImage
              src="/images/sustainability/placeholder-sustainability-worksite.jpg"
              alt="Construction worker in a yellow hard hat handling rebar and formwork inside an unfinished concrete-frame building"
              aspectRatio="4 / 5"
            />
            <MotionSection y={16} delay={0.1} className="relative mt-6 aspect-[16/9] overflow-hidden">
              <Image
                src="/images/sustainability/placeholder-sustainability-material-texture.jpg"
                alt="Extreme close-up of a natural, weathered stone surface with a network of cracks"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </MotionSection>
          </div>
        </div>
      </div>
    </section>
  );
}
