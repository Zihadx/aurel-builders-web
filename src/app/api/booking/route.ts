import { createLeadHandler } from "@/server/lead-handler";
import { bookingSchema } from "@/lib/booking-schema";

export const runtime = "nodejs";

export const POST = createLeadHandler({
  type: "booking",
  prefix: "BK",
  schema: bookingSchema,
  limit: 8,
  windowMs: 10 * 60_000,
});
