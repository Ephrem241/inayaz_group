export type WhyChooseStrength = {
  id: string;
  number: string;
  title: string;
  body: string;
  provenance: "verified" | "suggested";
};

export const WHY_CHOOSE_STRENGTHS: WhyChooseStrength[] = [
  {
    id: "trusted-expertise",
    number: "01",
    title: "Trusted Expertise",
    body: "As a Category 1 General Contractor, INAYAZ brings proven technical knowledge, professional leadership, and construction capability to every project.",
    provenance: "verified",
  },
  {
    id: "built-on-responsibility",
    number: "02",
    title: "Built on Responsibility",
    body: "Every project is approached with care, discipline, accountability, safety, and close attention to detail.",
    provenance: "verified",
  },
  {
    id: "reliable-delivery",
    number: "03",
    title: "Reliable Delivery",
    body: "From planning to completion, INAYAZ prioritizes clear execution, efficient project management, quality control, and long-term value.",
    provenance: "verified",
  },
  {
    id: "integrated-capabilities",
    number: "04",
    title: "Integrated Capabilities",
    body: "Construction, real estate, import, manufacturing, trade, and equipment operations work together under one group.",
    provenance: "suggested",
  },
  {
    id: "financial-reliability",
    number: "05",
    title: "Financial Reliability",
    body: "Disciplined operations and trusted institutional relationships support the successful delivery of demanding projects.",
    provenance: "suggested",
  },
  {
    id: "local-expertise-global-standards",
    number: "06",
    title: "Local Expertise, Global Standards",
    body: "INAYAZ combines an understanding of Ethiopia's market with international standards of quality, engineering, and professionalism.",
    provenance: "suggested",
  },
];
