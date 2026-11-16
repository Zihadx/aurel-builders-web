import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Roof Replacement",
  "Roof Repair",
  "Roof Inspection",
  "Storm Damage",
  "Gutter Installation",
  "Siding & Exterior",
  "Other",
] as const;

export const CONTACT_METHODS = ["Phone Call", "Email", "Text Message"] as const;

/** Shared by the browser form and the /api/estimate route so both validate
 *  against exactly the same rules. */
export const estimateSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d][\d\s().+-]{6,}$/, "Enter a phone number we can reach."),
  propertyAddress: z.string().trim().max(200).optional(),
  serviceRequired: z.enum(SERVICE_OPTIONS),
  preferredContactMethod: z.enum(CONTACT_METHODS),
  projectDescription: z
    .string()
    .trim()
    .min(12, "Tell us a little more — at least a sentence.")
    .max(2000),
  // Honeypot: real visitors never see or fill this.
  website: z.string().max(200).optional(),
});

export type EstimateFormValues = z.infer<typeof estimateSchema>;
