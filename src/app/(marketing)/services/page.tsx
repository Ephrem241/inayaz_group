import type { Metadata } from "next";
import { ServicesIntro } from "@/components/sections/ServicesIntro";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { ServicesCTA } from "@/components/sections/ServicesCTA";
import { getServices } from "../../../../sanity/lib/queries";
import { adaptService } from "../../../../sanity/lib/adapters";

export const metadata: Metadata = {
  title: "Services | INAYAZ Group",
  description:
    "Explore INAYAZ Group's services — general construction, design and build, real estate development, infrastructure development, project management, engineering consultancy, interior fit-out, facility management, machinery rental, and import and supply — delivered as a Category 1 General Contractor.",
};

export default async function ServicesPage() {
  const sanityServices = await getServices();
  const services = sanityServices.map(adaptService);

  return (
    <>
      <ServicesIntro />
      <ServicesShowcase services={services} />
      <ServicesCTA />
    </>
  );
}
