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
import { getDivisions, getProjects, getSiteSettings } from "../../../sanity/lib/queries";
import { adaptDivision, adaptMetrics, adaptProject } from "../../../sanity/lib/adapters";

export default async function HomePage() {
  const [sanityDivisions, sanityProjects, siteSettings] = await Promise.all([
    getDivisions(),
    getProjects(),
    getSiteSettings(),
  ]);

  const divisions = sanityDivisions.map(adaptDivision);
  const projects = sanityProjects.map(adaptProject);
  const metrics = adaptMetrics(siteSettings);

  return (
    <>
      <CinematicHero />
      <CompanyIntroduction />
      <BusinessDivisions divisions={divisions} />
      <FeaturedProjects projects={projects} />
      <ConstructionProcess />
      <Metrics metrics={metrics} />
      <WhyChooseInayaz />
      <MissionVision />
      <CoreValues />
      <RecognitionAndTrust />
      <Sustainability />
      <Contact />
    </>
  );
}
