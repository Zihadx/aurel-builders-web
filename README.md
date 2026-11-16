# AUREL Roofing Co.

Marketing and booking site for a residential roofing contractor. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, three.js, Motion, Lenis, React Hook Form + Zod.

AUREL is a fictional brand. **All figures, reviews, prices and locations are mock data** so the site reads like a real business while you build. Every mock value lives in `src/data/` (search the repo for `MOCK`) and is meant to be replaced.

## Quick start

```bash
npm install
cp .env.example .env.local     # then edit
npm run dev                    # http://localhost:3000
npm run check                  # typecheck + lint + production build
npm start                      # after a build
```

Requires Node 20.9 or newer.

## What's where

| Path | What it holds |
| --- | --- |
| `src/data/site.ts` | Brand copy, hero parts, materials (with MOCK prices), proof stats, process, contact details |
| `src/data/services.ts`, `projects.ts`, `testimonials.ts`, `faqs.ts`, `service-areas.ts` | Section content |
| `src/data/images.ts` | Every photo URL (Unsplash, hot-linked). Replace with your own photography |
| `src/components/sections/` | One file per page section |
| `src/components/graphics/` | The 3D roof (three.js, lazy-loaded, WebGL fallback) |
| `src/components/booking/` | The five-step booking flow at `/book` |
| `src/server/` | API hardening: env validation, rate limiter, lead handler |
| `src/app/globals.css` | Design tokens (colour, type scale, motion) |

## Before you go live

1. **Replace mock data** in `src/data/`. Update the phone, email, address and WhatsApp number (`NEXT_PUBLIC_WHATSAPP_NUMBER`).
2. **Set `LEAD_WEBHOOK_URL`** (https only) so estimate requests and bookings go somewhere. Until then the forms validate and tell visitors honestly that nothing was sent. Add `LEAD_WEBHOOK_SECRET` to sign every request with `X-Aurel-Signature: sha256=<hmac>`.
3. **Set `NEXT_PUBLIC_SITE_URL`** to your real domain (canonical links, sitemap, social card).
4. **Swap the photos** in `src/data/images.ts`, and keep the alt text specific.
5. If you enable review stars in search results, only do so with real, verifiable reviews.

## Security

- **Headers:** a strict Content-Security-Policy, HSTS, `X-Frame-Options: DENY`, `nosniff`, a tight Referrer-Policy and Permissions-Policy. The CSP allows inline scripts because Next.js emits small inline bootstrap scripts; move to nonce-based CSP via middleware if you need stricter, at the cost of making pages dynamic.
- **Forms (`/api/estimate`, `/api/booking`):** same-origin check, JSON-only, 8 KB body cap, per-IP rate limit (8 per 10 minutes), server-side Zod validation, a silent honeypot, and no personal data in logs.
- **Rate limiter** is in-memory, so it is per server instance. On serverless or multiple instances, replace `src/server/rate-limit.ts` with Redis/Upstash (same function signature).
- **Webhook:** https only, private and local addresses rejected, no redirects followed, 8 s timeout, optional HMAC signing.
- **Images:** the optimizer only accepts `images.unsplash.com/photo-*`.
- Structured data is serialised with `<` escaped, so content can never break out of the script tag.

## Performance and accessibility

- The 3D engine (~590 KB) loads only for the hero and only on the client; the page falls back to a photo without WebGL. It pauses when off-screen.
- Fonts are self-hosted (`src/fonts`, SIL OFL), images are optimised (AVIF/WebP) and sized per viewport.
- All motion respects `prefers-reduced-motion`. Keyboard navigation, visible focus, labelled form fields and live error messages throughout; automated axe scans report no violations on the home and booking pages.

## Editing tips

- Colours, type and spacing: tokens at the top of `src/app/globals.css`.
- Section headers share one component (`ui/section-header.tsx`), so alignment stays consistent when you add sections.
- Booking time windows and services: `src/lib/booking-schema.ts`.
