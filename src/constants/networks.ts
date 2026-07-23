export type NetworkEntity = {
  id: string;
  name: string;
  type: "sub-brand" | "sister-company";
  description?: string;
  facts?: string[];
  externalUrl?: string;
};

export const NETWORK_ENTITIES: NetworkEntity[] = [
  { id: "inayaz-construction", name: "INAYAZ Construction", type: "sub-brand" },
  { id: "inayaz-export", name: "INAYAZ Export", type: "sub-brand" },
  { id: "inayaz-motors", name: "INAYAZ Motors", type: "sub-brand" },
  {
    id: "akoya-properties",
    name: "Akoya Properties",
    type: "sister-company",
    description:
      "Akoya Properties is INAYAZ's sister real estate development company — in-house development and construction under one group family. Akoya is the developer behind several of INAYAZ's largest showcased projects.",
    facts: [
      "16 years of experience",
      "Architectural Excellence Winner — Ethio Real Estate Award 2025",
      "First real-estate ShebaMiles Platinum Partner of Ethiopian Airlines",
    ],
    externalUrl: "https://akoyarealproperty.com/",
  },
];
