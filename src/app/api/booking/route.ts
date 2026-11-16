import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/booking-schema";

export const runtime = "nodejs";

/**
 * Inspection booking requests. Same rules as /api/estimate: validate, drop
 * honeypot hits quietly, forward to LEAD_WEBHOOK_URL when configured, and
 * report honestly whether anything was delivered.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { website, ...booking } = parsed.data;
  const reference = `BK-${Math.floor(10000 + Math.random() * 90000)}`;

  if (website) return NextResponse.json({ ok: true, reference, delivered: true });

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) return NextResponse.json({ ok: true, reference, delivered: false });

  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "booking", reference, receivedAt: new Date().toISOString(), ...booking }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true, reference, delivered: true });
  } catch (err) {
    console.error("[booking] webhook delivery failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn’t send your booking. Please call us or message us on WhatsApp." },
      { status: 502 }
    );
  }
}
