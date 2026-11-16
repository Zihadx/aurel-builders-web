import { createLeadHandler } from "@/server/lead-handler";
import { estimateSchema } from "@/lib/estimate-schema";

export const runtime = "nodejs";

export const POST = createLeadHandler({
  type: "estimate",
  prefix: "AUR",
  schema: estimateSchema,
  limit: 8,
  windowMs: 10 * 60_000,
});
