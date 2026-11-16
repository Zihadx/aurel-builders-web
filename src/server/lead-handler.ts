import "server-only";
import { createHmac, randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import type { ZodType } from "zod";
import { serverEnv } from "@/server/env";
import { clientIp, rateLimit } from "@/server/rate-limit";

const MAX_BODY_BYTES = 8 * 1024;
const json = (body: object, status = 200, headers?: HeadersInit) => NextResponse.json(body, { status, headers });

interface Options<T> {
  /** "estimate" | "booking", used in the reference number and webhook payload. */
  type: string;
  prefix: string;
  schema: ZodType<T & { website?: string }>;
  /** Max submissions per IP in the window. */
  limit: number;
  windowMs: number;
}

/** Same-origin check for browser requests. Non-browser clients send no Origin
 *  and cannot be used for cross-site request forgery, so they pass. */
function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function deliver(payload: object) {
  const { LEAD_WEBHOOK_URL, LEAD_WEBHOOK_SECRET } = serverEnv();
  if (!LEAD_WEBHOOK_URL) return "unconfigured" as const;
  const body = JSON.stringify(payload);
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (LEAD_WEBHOOK_SECRET) {
    headers["X-Aurel-Signature"] = `sha256=${createHmac("sha256", LEAD_WEBHOOK_SECRET).update(body).digest("hex")}`;
  }
  const res = await fetch(LEAD_WEBHOOK_URL, { method: "POST", headers, body, signal: AbortSignal.timeout(8000), redirect: "error" });
  if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  return "delivered" as const;
}

/**
 * One hardened POST handler for every lead form: same-origin check, JSON-only,
 * body size cap, per-IP rate limit, schema validation, honeypot, signed
 * webhook delivery, and no personal data in logs.
 */
export function createLeadHandler<T extends object>(opts: Options<T>) {
  return async function POST(request: Request) {
    if (!sameOrigin(request)) return json({ ok: false, error: "Request blocked." }, 403);
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return json({ ok: false, error: "Expected JSON." }, 415);
    }

    const rl = rateLimit(`${opts.type}:${clientIp(request)}`, opts.limit, opts.windowMs);
    if (!rl.allowed) {
      return json({ ok: false, error: "Too many requests. Please wait a few minutes, or call us." }, 429, {
        "Retry-After": String(rl.retryAfter),
      });
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "Request too large." }, 413);

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return json({ ok: false, error: "Invalid request body." }, 400);
    }

    const parsed = opts.schema.safeParse(body);
    if (!parsed.success) {
      return json({ ok: false, error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors }, 422);
    }

    const { website, ...lead } = parsed.data;
    const reference = `${opts.prefix}-${randomInt(10000, 99999)}`;
    if (website) return json({ ok: true, reference, delivered: true }); // honeypot: look successful, do nothing

    try {
      const result = await deliver({ type: opts.type, reference, receivedAt: new Date().toISOString(), ...lead });
      return json({ ok: true, reference, delivered: result === "delivered" });
    } catch (err) {
      console.error(`[${opts.type}] delivery failed:`, err instanceof Error ? err.message : "unknown");
      return json({ ok: false, error: "We couldn’t send your request. Please call us or message us on WhatsApp." }, 502);
    }
  };
}
