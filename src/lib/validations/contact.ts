import { z } from "zod";
import { SERVICE_INTERESTS } from "@/constants/service-interests";
import { PROJECT_TYPES } from "@/constants/project-types";

const serviceInterestIds = SERVICE_INTERESTS.map((interest) => interest.id) as [string, ...string[]];
const projectTypeIds = PROJECT_TYPES.map((type) => type.id) as [string, ...string[]];
const contactMethods = ["Email", "Phone"] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .or(z.literal(""));

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  companyName: optionalText(160),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal(""))
    .refine((value) => !value || /^[+()\d\s-]{7,20}$/.test(value), {
      message: "Enter a valid phone number",
    }),
  serviceInterest: z.enum(serviceInterestIds).optional().or(z.literal("")),
  // Construction (serviceInterest === "construction-real-estate")
  projectType: z.enum(projectTypeIds).optional().or(z.literal("")),
  estimatedBudget: optionalText(120),
  projectLocation: optionalText(160),
  targetStartDate: optionalText(40),
  // Real Estate (serviceInterest === "real-estate")
  developmentInterest: optionalText(160),
  preferredUnitType: optionalText(80),
  visitDate: optionalText(40),
  preferredContactMethod: z.enum(contactMethods).optional().or(z.literal("")),
  // Machinery Rental (serviceInterest === "machinery-equipment-rental")
  equipmentType: optionalText(160),
  rentalPeriod: optionalText(80),
  rentalLocation: optionalText(160),
  requiredDate: optionalText(40),
  message: z.string().trim().min(10, "Tell us a bit more (at least 10 characters)").max(2000),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent is required to submit this form",
  }),
  // Captured automatically from the URL on mount — never shown to the user.
  utmSource: optionalText(120),
  utmMedium: optionalText(120),
  utmCampaign: optionalText(120),
  leadSource: optionalText(200),
  // Deliberately no length/emptiness constraint here — a bot that fills this
  // field must still pass schema validation so src/lib/services/contact.ts's
  // own honeypot check is what runs (returning a fake "success" identical to
  // a real submission). A max(0) constraint here would instead fail schema
  // validation first, handing the bot a distinctly different error response
  // and defeating the point of disguising the rejection.
  honeypot: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
