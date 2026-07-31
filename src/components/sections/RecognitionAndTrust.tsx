import Image from "next/image";
import { MotionSection } from "@/components/motion/MotionSection";
import type { Recognition } from "@/constants/recognition";

type RecognitionAndTrustProps = {
  recognitions: Recognition[];
};

// Below two published items, "Recognition & Trust" overclaims the section's
// weight — the neutral heading makes no institutional-endorsement claim by
// itself, appropriate for what's likely to just be GC-1 alone until CBE/COOP
// evidence is uploaded and published.
export function RecognitionAndTrust({ recognitions }: RecognitionAndTrustProps) {
  const isNeutral = recognitions.length < 2;

  return (
    <section className="section-dark py-16 md:py-24 lg:py-32">
      <div className="container-wide">
        <MotionSection>
          <p className="text-sm font-medium tracking-[0.2em] text-secondary uppercase">
            {isNeutral ? "Credentials" : "Recognition & Trust"}
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl">
            {isNeutral ? "Credentials and Institutional Relationships" : "Earned, Not Assumed"}
          </h2>
        </MotionSection>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-3 lg:mt-16">
          {recognitions.map((item, index) => (
            <MotionSection key={item.id} delay={index * 0.05}>
              <div data-recognition={item.id} className="border-l-2 border-construction-gold pl-6">
                {item.logo && (
                  <div className="relative mb-4 h-10 w-32">
                    <Image src={item.logo.src} alt={item.logo.alt} fill sizes="128px" className="object-contain object-left" />
                  </div>
                )}
                <span className="text-sm font-medium tracking-[0.2em] text-secondary uppercase">
                  {item.eyebrow}
                </span>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-off-white">
                  {item.name}
                </p>
                <p className="mt-3 text-base text-off-white/80">{item.description}</p>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}
