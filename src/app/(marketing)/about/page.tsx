import type { Metadata } from "next";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { MissionVision } from "@/components/sections/MissionVision";
import { CoreValues } from "@/components/sections/CoreValues";
import { Leadership } from "@/components/sections/Leadership";
import { RecognitionAndTrust } from "@/components/sections/RecognitionAndTrust";
import { WhyChooseInayaz } from "@/components/sections/WhyChooseInayaz";
import { AboutCTA } from "@/components/sections/AboutCTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about INAYAZ Group — an Ethiopian construction and business conglomerate operating since 2015, guided by integrity, technical excellence, and a commitment to lasting value.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <MissionVision />
      <CoreValues />
      <Leadership />
      <RecognitionAndTrust />
      <WhyChooseInayaz />
      <AboutCTA />
    </>
  );
}
