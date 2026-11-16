# AUREL Roofing Co.

Marketing site for a (fictional) residential roofing contractor. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, three.js, Motion, Lenis, React Hook Form + Zod.

## Design direction

Dark, photographic and tactile. The hero is a real-time 3D roof model (three.js): physically based metal, plywood, plaster and glass, soft shadows, drag-to-orbit, and a layer-by-layer "take it apart" mode driven by the list beside it. It assembles itself on load. Below it, sections use real photography, word-by-word headline reveals, image clip-reveals, scroll parallax and inertial smooth scrolling (Lenis). All motion respects `prefers-reduced-motion`.

Palette: zinc paper, slate, one patina-green accent. Type: Archivo (headings/UI) and Newsreader (reading text), self-hosted. Tokens live in `src/app/globals.css`.

## 3D model

`src/components/graphics/roof-scene.tsx` builds the whole scene procedurally (no model files to download). The model loads client-side only, pauses when off-screen, and falls back to a photo if WebGL is unavailable. The mouse wheel is not captured, so page scrolling is never hijacked.

## Photography

All photos are hot-linked from Unsplash roofing results and listed in one place: `src/data/images.ts` (project before/after pairs are `p1Before`, `p1After`, and so on). Replace any URL with your own photography. A tonal placeholder shows if an image fails to load.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build && npm start
```

## Editing content

- Brand copy, hero callouts, materials, approach, process: `src/data/site.ts`
- Services: `src/data/services.ts` · Projects: `src/data/projects.ts` · Reviews: `src/data/testimonials.ts`
- Service regions: `src/data/service-areas.ts` · FAQ: `src/data/faqs.ts`

All figures, locations and reviews are sample content. Swap in real project photography in `src/data/images.ts`.

## Booking (`/book`)

A five-step inspection booking flow: service, property, day and time window, contact details, review. Validated in the browser and again at `/api/booking` (shared Zod schema in `src/lib/booking-schema.ts`). Visitors can download a calendar file (.ics) and confirm on WhatsApp after booking. Time windows are *requested*, not guaranteed, and the page says so; there is no live availability backend.

## WhatsApp

A floating WhatsApp button appears on every page, with the same link in the menu, contact section and booking confirmation. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, international format) and edit the greeting in `src/data/site.ts`. The shipped number is a placeholder.

## Estimate form

The form validates in the browser and again on the server (`src/lib/estimate-schema.ts`, shared) and posts to `/api/estimate`. Set `LEAD_WEBHOOK_URL` (see `.env.example`) to forward estimate requests and bookings (tagged `type: "estimate"` or `"booking"`) to your CRM, Zapier/Make, or an email relay. With no webhook set, the form tells the visitor nothing was sent instead of pretending it was.

## Fonts

Archivo and Newsreader are self-hosted from `src/fonts` (SIL OFL licenses included), so builds work offline and no requests go to Google.
