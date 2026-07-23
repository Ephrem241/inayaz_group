import { z } from "zod";
import { DIVISIONS } from "@/constants/divisions";
import { PROJECT_TYPES } from "@/constants/project-types";

const serviceInterestIds = DIVISIONS.map((division) => division.id) as [string, ...string[]];
const projectTypeIds = PROJECT_TYPES.map((type) => type.id) as [string, ...string[]];

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
  projectType: z.enum(projectTypeIds).optional().or(z.literal("")),
  estimatedBudget: optionalText(120),
  projectLocation: optionalText(160),
  message: z.string().trim().min(10, "Tell us a bit more (at least 10 characters)").max(2000),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent is required to submit this form",
  }),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
