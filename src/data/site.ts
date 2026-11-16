import { SiteConfig } from "@/types";

/**
 * Single source of truth for brand copy. AUREL Roofing Co. is a fictional
 * showcase brand: figures, locations and contact details are placeholders to
 * replace before launch. Nothing here claims a number the business has not
 * supplied.
 */
export const SITE_CONFIG: SiteConfig = {
  companyName: "AUREL Roofing Co.",
  shortName: "AUREL",
  tagline: "Residential roof replacement, repair and inspection",
  announcement: {
    text: "Free 45-point roof inspections are booking for storm season.",
    ctaLabel: "Book an inspection",
    ctaHref: "#contact",
  },
  contact: {
    phoneDisplay: "(800) 555-0194",
    phoneHref: "tel:+18005550194",
    email: "concierge@aurelroofing.example.com",
    officeHours: "Mon–Sat, 7:30 am – 6:30 pm",
    emergencyNote: "Storm tarping and emergency assessment dispatch",
    headquartersSample: "480 Architectural Way, Suite 210 (sample address)",
    // International format, digits only (sample number: replace before launch)
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "18005550194",
    whatsappMessage: "Hi AUREL, I’d like to book a free roof inspection.",
  },
  hero: {
    headline: "A roof is a system. We build every layer of it.",
    subheadline:
      "AUREL replaces, repairs and inspects residential roofs. Every job starts with a photographed inspection and an itemized written scope, before any work begins.",
    primaryCta: "Book a free inspection",
    secondaryCta: "See recent projects",
    sheetTitle: "Section A–A: standing-seam roof assembly",
    sheetNote: "Not to scale",
    parts: [
      {
        id: "ridge",
        title: "Ridge ventilation",
        description:
          "A continuous, storm-baffled vent at the highest point lets attic air escape, so summer heat and winter condensation don’t build up under the roof.",
      },
      {
        id: "panel",
        title: "Standing-seam panels and ice barrier",
        description:
          "24-gauge panels with concealed clips sit over a peel-and-stick ice barrier. There are no exposed fasteners where water could find a way in.",
      },
      {
        id: "deck",
        title: "Deck and underlayment",
        description:
          "We inspect the deck before covering it. Damaged boards are replaced, then breathable synthetic underlayment goes down before any panel.",
      },
      {
        id: "eave",
        title: "Eave and seamless gutter",
        description:
          "A 6-inch seamless gutter on concealed hangers every 24 inches carries runoff away from the fascia and the foundation.",
      },
    ],
  },
  // MOCK DATA: every figure below is sample content for layout and tone.
  proof: {
    rating: 4.9,
    reviewCount: 612,
    platform: "Google",
    stats: [
      { value: 2140, suffix: "+", label: "Roofs completed", detail: "Across four service regions since 2004" },
      { value: 22, label: "Years in business", detail: "Family-owned and locally managed" },
      { value: 25, suffix: "-year", label: "Workmanship warranty", detail: "In writing, on every replacement" },
      { value: 98, suffix: "%", label: "Finished on schedule", detail: "Of jobs in the last 12 months" },
    ],
  },
  included: [
    "A free 45-point inspection with annotated photos",
    "A written, line-by-line scope you can compare",
    "Help documenting storm damage for your insurer",
    "Financing options explained before you decide",
  ],
  assurances: [
    { title: "Licensed and insured", detail: "Coverage details are listed on every proposal." },
    { title: "Free inspection", detail: "45 points, annotated photos, no obligation." },
    { title: "Itemized written scope", detail: "Priced by layer, before work begins." },
    { title: "Written warranty", detail: "Material and workmanship terms in the proposal." },
    { title: "Clean site", detail: "Landscaping protected, grounds magnet-swept daily." },
  ],
  materials: {
    heading: "Choose the material, see what it takes.",
    intro:
      "Each material has its own fastening rules, underlayment and ventilation needs. Pick one, size your roof, and send the scope straight to the estimate form.",
    note: "Figures are typical ranges for each system. Your written scope confirms the exact specification, schedule and crew.",
    items: [
      {
        id: "standing-seam",
        title: "Standing-seam metal",
        subtitle: "24-gauge panels, concealed fasteners, Kynar 500® finish",
        lifespan: "50+ years",
        wind: "Up to 140 mph, Class-4",
        underlayment: "High-temperature ice and water shield",
        thermal: "Solar-reflective cool-roof finish",
        image: "materialMetal",
        priceSquare: [1150, 1650],
      },
      {
        id: "slate",
        title: "Natural and composite slate",
        subtitle: "Hand-split profile with copper flashing",
        lifespan: "75–100 years",
        wind: "Up to 130 mph, Class-4 hail and fire",
        underlayment: "Double-layer synthetic",
        thermal: "High thermal mass buffers temperature swings",
        image: "materialSlate",
        priceSquare: [1600, 2400],
      },
      {
        id: "shingle",
        title: "Class-4 architectural shingle",
        subtitle: "UL 2218 impact-rated, multi-layer dimensional profile",
        lifespan: "30–50 years",
        wind: "Up to 130 mph, UL 2218 Class-4",
        underlayment: "Breathable synthetic plus valley ice shield",
        thermal: "Balanced ridge and soffit airflow",
        image: "materialShingle",
        priceSquare: [480, 780],
      },
    ],
  },
  approach: {
    heading: "Most roofs fail below the surface.",
    lead: "Water finds the shortcuts: a rushed chimney flashing, a blocked soffit, a skipped ice barrier.",
    body: "We spend our time on those details, and we show you the evidence before you decide anything. A dedicated project director stays on site, and every scope is written line by line.",
    standards: [
      {
        title: "Installers trained on your material",
        description:
          "Standing-seam, slate and shingle each demand different fastening tolerances. The crew on your roof is trained on the system you chose.",
      },
      {
        title: "The hidden layers done properly",
        description:
          "Ice barrier in every valley, breathable synthetic underlayment, and balanced intake-to-ridge airflow. These are the layers you never see again.",
      },
      {
        title: "Diagnostics in plain language",
        description:
          "You get macro photographs of your roof’s condition and an honest comparison of repair versus replacement. No pressure to pick the bigger job.",
      },
      {
        title: "A site left in better order",
        description:
          "Materials staged neatly, landscaping covered, a supervisor photo update each day, and a nightly dry-in and magnet sweep.",
      },
    ],
  },
  process: {
    heading: "From first call to final walkthrough.",
    intro: "Four steps, each ending with something you can hold.",
    steps: [
      {
        title: "Request an inspection",
        description:
          "Tell us what you’re seeing and pick a time that suits your household.",
        deliverable: "A confirmed inspection window",
      },
      {
        title: "We assess the roof",
        description:
          "We check the roof surface, flashings and attic ventilation, and photograph everything we find.",
        deliverable: "An annotated photo report and material samples",
      },
      {
        title: "Plan, then install",
        description:
          "You review the scope, materials and schedule first. Work starts only once you’re comfortable, with your landscaping protected throughout.",
        deliverable: "Daily supervisor logs and a weatherproof build",
      },
      {
        title: "Final walkthrough",
        description:
          "We walk the finished roof with you and hand over the paperwork you’ll need later.",
        deliverable: "Warranty packet and care guide",
      },
    ],
  },
  contactSection: {
    heading: "Book a free roof inspection.",
    intro:
      "Tell us about your home and what you’ve noticed. We’ll reach out by the method you choose to arrange a time.",
    formTitle: "Request an estimate",
    formNote: "Free 45-point inspection and an itemized written scope. No obligation.",
  },
  legalNote:
    "AUREL Roofing Co. is a fictional brand created as a design and engineering showcase. All figures, locations, licenses and client reviews are editable sample content.",
};
