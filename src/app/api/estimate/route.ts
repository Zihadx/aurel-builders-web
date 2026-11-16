import { NextResponse } from "next/server";
import { estimateSchema } from "@/lib/estimate-schema";

export const runtime = "nodejs";

/**
 * Estimate requests.
 *
 * - Validates with the same zod schema the form uses.
 * - Drops honeypot submissions silently (bots get a normal-looking reply).
 * - If LEAD_WEBHOOK_URL is set, forwards the request there (CRM, Zapier,
 *   Resend relay, etc.) and reports whether delivery succeeded.
 * - If it isn't set, nothing is delivered and the response says so, so the UI
 *   never claims a request was sent when it wasn't.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = estimateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { website, ...lead } = parsed.data;
  const reference = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;

  if (website) {
    // Honeypot tripped: pretend success.
    return NextResponse.json({ ok: true, reference, delivered: true });
  }

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) {
    return NextResponse.json({ ok: true, reference, delivered: false });
  }

  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "estimate", reference, receivedAt: new Date().toISOString(), ...lead }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true, reference, delivered: true });
  } catch (err) {
    console.error("[estimate] webhook delivery failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn’t send your request. Please call us instead." },
      { status: 502 }
    );
  }
}
