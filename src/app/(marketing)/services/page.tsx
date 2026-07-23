import type { Metadata } from "next";
import { ServicesIntro } from "@/components/sections/ServicesIntro";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { ServicesCTA } from "@/components/sections/ServicesCTA";

export const metadata: Metadata = {
  title: "Services | INAYAZ Group",
  description:
    "Explore INAYAZ Group's services — general construction, design and build, real estate development, infrastructure development, project management, engineering consultancy, interior fit-out, facility management, machinery rental, and import and supply — delivered as a Category 1 General Contractor.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesIntro />
      <ServicesShowcase />
      <ServicesCTA />
    </>
  );
}
