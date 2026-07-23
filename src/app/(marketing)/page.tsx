import { CinematicHero } from "@/components/motion/CinematicHero";
import { CompanyIntroduction } from "@/components/sections/CompanyIntroduction";
import { BusinessDivisions } from "@/components/sections/BusinessDivisions";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ConstructionProcess } from "@/components/sections/ConstructionProcess";
import { Metrics } from "@/components/sections/Metrics";
import { WhyChooseInayaz } from "@/components/sections/WhyChooseInayaz";
import { MissionVision } from "@/components/sections/MissionVision";
import { CoreValues } from "@/components/sections/CoreValues";
import { RecognitionAndTrust } from "@/components/sections/RecognitionAndTrust";
import { Sustainability } from "@/components/sections/Sustainability";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <CompanyIntroduction />
      <BusinessDivisions />
      <FeaturedProjects />
      <ConstructionProcess />
      <Metrics />
      <WhyChooseInayaz />
      <MissionVision />
      <CoreValues />
      <RecognitionAndTrust />
      <Sustainability />
      <Contact />
    </>
  );
}
