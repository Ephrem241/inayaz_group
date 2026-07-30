import type { Metadata } from "next";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { CompanyIntroduction } from "@/components/sections/CompanyIntroduction";
import { BusinessDivisions } from "@/components/sections/BusinessDivisions";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ConstructionProcess } from "@/components/sections/ConstructionProcess";
import { Metrics } from "@/components/sections/Metrics";
import { WhyChooseInayaz } from "@/components/sections/WhyChooseInayaz";
import { Sustainability } from "@/components/sections/Sustainability";
import { HomeFinalCTA } from "@/components/sections/HomeFinalCTA";
import { getDivisions, getProjects, getSiteSettings } from "../../../sanity/lib/queries";
import { adaptDivision, adaptMetrics, adaptProject } from "../../../sanity/lib/adapters";

// Title/description are omitted here — the root layout's defaults
// (src/app/layout.tsx) already describe the homepage exactly; only the
// canonical URL is genuinely page-specific.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
      <Metrics metrics={metrics} />
      <BusinessDivisions divisions={divisions} />
      <FeaturedProjects projects={projects} />
      <ConstructionProcess />
      <WhyChooseInayaz />
      <Sustainability variant="preview" />
      <HomeFinalCTA />
    </>
  );
}
