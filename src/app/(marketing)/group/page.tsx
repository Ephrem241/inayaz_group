import type { Metadata } from "next";
import { GroupIntro } from "@/components/sections/GroupIntro";
import { GroupNetworks } from "@/components/sections/GroupNetworks";
import { GroupDivisions } from "@/components/sections/GroupDivisions";
import { GroupCTA } from "@/components/sections/GroupCTA";

export const metadata: Metadata = {
  title: "Our Group | INAYAZ Group",
  description:
    "Explore INAYAZ Group's network of sub-brands, our sister company Akoya Properties, and the six business divisions — construction and real estate, export trade, import, manufacturing, tour operation and travel, and machinery and equipment rental.",
};

export default function GroupPage() {
  return (
    <>
      <GroupIntro />
      <GroupNetworks />
      <GroupDivisions />
      <GroupCTA />
    </>
  );
}
