import "server-only";
import { z } from "zod";

/** Hosts a lead webhook must never point at (basic SSRF guard). */
const PRIVATE_HOST = /^(localhost|0\.0\.0\.0|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|\[?::1\]?$)/i;

const schema = z.object({
  LEAD_WEBHOOK_URL: z
    .string()
    .url()
    .refine((u) => u.startsWith("https://"), "LEAD_WEBHOOK_URL must use https")
    .refine((u) => !PRIVATE_HOST.test(new URL(u).hostname), "LEAD_WEBHOOK_URL must not point at a private address")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  /** Optional shared secret; when set, webhook bodies are signed (HMAC-SHA256). */
  LEAD_WEBHOOK_SECRET: z.string().min(16).optional().or(z.literal("").transform(() => undefined)),
});

let cached: z.infer<typeof schema> | null = null;

/** Validated server environment. A bad value logs once and is treated as unset,
 *  so a typo can never crash the site or send leads somewhere unsafe. */
export function serverEnv() {
  if (cached) return cached;
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    console.error("[env] invalid configuration, ignoring:", parsed.error.issues.map((i) => i.path.join(".") + ": " + i.message).join("; "));
    cached = {};
  } else {
    cached = parsed.data;
  }
  return cached;
}
