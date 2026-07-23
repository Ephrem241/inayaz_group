import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with INAYAZ Group to discuss a construction project, a partnership, or a general inquiry. Reach our Addis Ababa office by phone, email, or the form below.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact headingLevel="h1" />;
}
