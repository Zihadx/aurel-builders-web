# AUREL Roofing Co. — Ultra-Premium Architectural Roofing & Home Services Website

An Awwwards-caliber, conversion-engineered residential roofing and exterior renovation website built with **Next.js 16 (App Router)**, **TypeScript (Strict Mode)**, **Tailwind CSS v4**, **GSAP + ScrollTrigger**, and **React Hook Form + Zod**.

---

## 1. Visual Identity & Architectural Design System

- **Custom Palette Tokens**:
  - `Obsidian` (`#171A18`) — Primary dark editorial backgrounds
  - `Graphite` (`#252A27`) — Secondary dark surfaces & technical ledgers
  - `Warm Ivory` (`#F4F1E9`) — Primary light editorial backgrounds
  - `Stone` (`#D9D5CA`) — Neutral borders & structural dividers
  - `Burnt Copper` (`#C77B50`) — Primary architectural accent & tactile CTAs
  - `Muted Sage` (`#858E7C`) — Secondary diagnostic & specification accent
  - `Pure White` (`#FFFFFF`) — Elevated card surfaces & high-contrast typography
- **Editorial Typography**:
  - **Headings**: `Manrope` (geometric architectural sans-serif with responsive `clamp()` scaling)
  - **Editorial Accents**: `Instrument Serif` (italic luxury editorial contrast)
  - **Body & Specs**: `Inter` + monospace technical specification tags

---

## 2. How to Install Dependencies

Ensure you have **Node.js 18.18+ or 20+ / 22+** and **npm** installed:

```bash
npm install
```

---

## 3. How to Run the Development Server

Start the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the live application.

---

## 4. How to Edit Company Information

All company branding, phone numbers, email addresses, announcement bar text, hero headlines, trust badges, about story, differentiators, and process steps are centralized in:

- **`src/data/site.ts`**

Updating `SITE_CONFIG` in `src/data/site.ts` automatically updates the navigation bar, hero section, trust strip, about section, contact cards, footer, and JSON-LD structured data without touching any React component code.

---

## 5. How to Replace Images

All photography URLs, alt text, and captions are stored in a single configuration dictionary:

- **`src/data/images.ts`**

To use your own photography:
1. Place local images inside `public/images/` or host them on your CDN / Unsplash.
2. Update the corresponding keys (`heroArchitecture`, `serviceReplacement`, `project1Before`, `project1After`, etc.) in `src/data/images.ts`.
3. If using a custom external image domain, add its hostname to `images.remotePatterns` in `next.config.ts`.

---

## 6. How to Update Services

All six roofing and exterior services (titles, descriptions, 3-point architectural specs, sample timelines, and asymmetric grid aspect layouts) are stored in:

- **`src/data/services.ts`**

---

## 7. How to Update Projects, Before/After Comparisons & Testimonials

- **Featured Projects & Interactive Before/After Slider**: Edit `PROJECTS_DATA` in **`src/data/projects.ts`**. Each project supports distinct `beforeImageKey` and `afterImageKey` assets, location labels, footprint metrics, and challenge/resolution notes.
- **Client Testimonials**: Edit `TESTIMONIALS_DATA` in **`src/data/testimonials.ts`**.
- **Service Areas & Interactive Coverage Radar**: Edit `SERVICE_AREAS_DATA` in **`src/data/service-areas.ts`**.
- **Frequently Asked Questions**: Edit `FAQS_DATA` in **`src/data/faqs.ts`**.

---

## 8. How to Configure a Real Contact / Estimate Form Backend

The conversion form in **`src/components/sections/contact.tsx`** uses **React Hook Form** and **Zod** validation (`estimateSchema`) with an isolated submission handler (`submitEstimateDemonstration`).

To connect a real backend (such as a Next.js App Router API route `src/app/api/estimate/route.ts`, Resend, HubSpot, or JobNimbus):
1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_LEAD_API_ENDPOINT`.
2. Replace the body of `submitEstimateDemonstration()` in `src/components/sections/contact.tsx` with a `fetch()` POST request to your endpoint.

---

## 9. How to Build and Verify for Production

Run TypeScript typechecking, ESLint, and the production Next.js build:

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```
