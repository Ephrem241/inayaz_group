export type ProjectType = {
  id: string;
  label: string;
};

export const PROJECT_TYPES: ProjectType[] = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "industrial", label: "Industrial" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "other", label: "Other" },
];
