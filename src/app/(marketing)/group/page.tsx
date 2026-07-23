import type { Metadata } from "next";
import { GroupIntro } from "@/components/sections/GroupIntro";
import { GroupNetworks } from "@/components/sections/GroupNetworks";
import { GroupDivisions } from "@/components/sections/GroupDivisions";
import { GroupCTA } from "@/components/sections/GroupCTA";
import { getDivisions, getProjects } from "../../../../sanity/lib/queries";
import { adaptDivision, adaptProject } from "../../../../sanity/lib/adapters";

export const metadata: Metadata = {
  title: "Our Group",
  description:
    "Explore INAYAZ Group's network of sub-brands, our sister company Akoya Properties, and the six business divisions — construction and real estate, export trade, import, manufacturing, tour operation and travel, and machinery and equipment rental.",
  alternates: { canonical: "/group" },
};

export default async function GroupPage() {
  const [sanityDivisions, sanityProjects] = await Promise.all([getDivisions(), getProjects()]);

  const divisions = sanityDivisions.map(adaptDivision);
  const featuredProjects = sanityProjects.map(adaptProject).filter((project) => project.featured);

  return (
    <>
      <GroupIntro />
      <GroupNetworks />
      <GroupDivisions divisions={divisions} featuredProjects={featuredProjects} />
      <GroupCTA />
    </>
  );
}
