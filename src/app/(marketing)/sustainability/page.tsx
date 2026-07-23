import type { Metadata } from "next";
import { Sustainability } from "@/components/sections/Sustainability";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "How INAYAZ Group builds responsibly — environmental care, worker safety, sustainable materials, and long-term community and asset value across every project.",
  alternates: { canonical: "/sustainability" },
};

export default function SustainabilityPage() {
  return <Sustainability headingLevel="h1" />;
}
