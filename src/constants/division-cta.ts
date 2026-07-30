import type { CtaEventName } from "@/lib/analytics/track";

type DivisionCta = {
  label: string;
  event: CtaEventName;
};

// Intent-based CTA copy per division, replacing the previous generic
// "Discuss a {division.name} Project" for every division alike. `interest`
// matches each division's own id and is passed to /contact as
// ?interest=<id> so the contact form (Phase E) can pre-select the matching
// service-interest option.
export const DIVISION_CTA: Record<string, DivisionCta> = {
  "construction-real-estate": {
    label: "Discuss a Construction Project",
    event: "construction_consultation",
  },
  "export-trade": {
    label: "Send a Trade Inquiry",
    event: "trade_inquiry",
  },
  import: {
    label: "Discuss Supply Requirements",
    event: "supply_inquiry",
  },
  manufacturing: {
    label: "Discuss a Manufacturing Order",
    event: "construction_consultation",
  },
  "tour-operation-travel": {
    label: "Plan Your Trip",
    event: "travel_inquiry",
  },
  "machinery-equipment-rental": {
    label: "Get a Rental Quote",
    event: "equipment_quote",
  },
};
