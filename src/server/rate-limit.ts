import "server-only";

interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Bucket>();
let lastSweep = 0;

/**
 * Sliding-window limiter, in memory. Good for one server or a single
 * container; on serverless or multiple instances each instance keeps its own
 * counts, so swap this for Redis/Upstash when you scale out. The interface
 * (key, limit, window) stays the same.
 */
export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  if (now - lastSweep > 60_000) {
    lastSweep = now;
    for (const [k, b] of buckets) {
      b.hits = b.hits.filter((t) => now - t < windowMs);
      if (!b.hits.length) buckets.delete(k);
    }
  }
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
  const allowed = bucket.hits.length < limit;
  if (allowed) bucket.hits.push(now);
  buckets.set(key, bucket);
  const retryAfter = allowed ? 0 : Math.ceil((windowMs - (now - bucket.hits[0])) / 1000);
  return { allowed, remaining: Math.max(0, limit - bucket.hits.length), retryAfter };
}

/** Best-effort client IP behind a proxy. Only trust these headers if your host
 *  strips client-supplied values (Vercel, Cloudflare and most PaaS do). */
export function clientIp(request: Request) {
  const fwd = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || request.headers.get("x-real-ip") || "unknown";
}
