import { z } from "zod";

export const BOOKING_SERVICES = [
  "Roof Inspection",
  "Roof Replacement",
  "Roof Repair",
  "Storm Damage",
  "Gutter Installation",
  "Siding & Exterior",
] as const;

export const PROPERTY_TYPES = [
  "Single-family home",
  "Townhouse or duplex",
  "Multi-unit building",
  "Commercial property",
] as const;

export const ROOF_AGES = ["Under 10 years", "10 to 20 years", "Over 20 years", "Not sure"] as const;

export const TIME_WINDOWS = [
  { value: "Morning", label: "Morning", range: "8:00 – 11:00 am", start: 8, end: 11 },
  { value: "Midday", label: "Midday", range: "11:00 am – 2:00 pm", start: 11, end: 14 },
  { value: "Afternoon", label: "Afternoon", range: "2:00 – 5:00 pm", start: 14, end: 17 },
] as const;

export const BOOKING_CONTACT_METHODS = ["Phone Call", "Text Message", "WhatsApp", "Email"] as const;

const ymd = /^\d{4}-\d{2}-\d{2}$/;

/** Shared by the booking form and /api/booking. */
export const bookingSchema = z.object({
  service: z.enum(BOOKING_SERVICES),
  propertyType: z.enum(PROPERTY_TYPES),
  address: z.string().trim().min(5, "Enter the property address, so we know where to come."),
  roofAge: z.enum(ROOF_AGES),
  date: z
    .string()
    .regex(ymd, "Choose a day for the visit.")
    .refine((d) => new Date(`${d}T12:00:00Z`).getUTCDay() !== 0, "We don’t book visits on Sundays.")
    .refine((d) => d >= new Date().toISOString().slice(0, 10), "Choose a day that hasn’t passed."),
  window: z.enum(["Morning", "Midday", "Afternoon"], { message: "Choose a time window." }),
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d][\d\s().+-]{6,}$/, "Enter a phone number we can reach."),
  contactMethod: z.enum(BOOKING_CONTACT_METHODS),
  notes: z.string().trim().max(1000, "Please keep notes under 1,000 characters.").optional(),
  website: z.string().max(0).optional(), // honeypot
});

export type BookingValues = z.infer<typeof bookingSchema>;

export const STEP_FIELDS: Array<Array<keyof BookingValues>> = [
  ["service"],
  ["propertyType", "address", "roofAge"],
  ["date", "window"],
  ["fullName", "email", "phone", "contactMethod", "notes"],
];
