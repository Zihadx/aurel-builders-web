import { SiteConfig } from "@/types";

export const SITE_CONFIG: SiteConfig = {
  companyName: "AUREL Roofing Co.",
  shortName: "AUREL",
  tagline: "Architectural Roofing & Exterior Protection Systems",
  announcement: {
    badge: "Autumn & Winter Storm Readiness",
    text: "Protect your home before the next storm — complimentary 45-point architectural roof inspections now booking.",
    ctaLabel: "Reserve an Inspection Window",
    ctaHref: "#contact",
  },
  contact: {
    phoneDisplay: "(800) 555-0194",
    phoneHref: "tel:+18005550194",
    email: "concierge@aurelroofing.example.com",
    officeHours: "Mon – Sat: 7:30 AM – 6:30 PM",
    emergencyNote: "24/7 Priority Tarping & Storm Assessment Dispatch (Sample)",
    headquartersSample: "480 Architectural Way, Suite 210 — Sample Showcase Address",
  },
  hero: {
    eyebrow: "Architectural Roofing & Exterior Stewardship",
    headlineLines: ["Built to Protect.", "Designed to Last."],
    accentWord: "Designed to Last.",
    subheadline:
      "Premium roofing and exterior solutions, delivered with quiet precision, honest guidance, and architectural craftsmanship that stands the test of time.",
    primaryCta: "Get Your Free Estimate",
    secondaryCta: "Explore Our Work",
    trustIndicator: "Roofing professionals. Quality materials. Work built to last.",
    floatingCard: {
      title: "Your Home Deserves Better Protection",
      subtitle:
        "Hand-soldered valleys, breathable synthetic deck armor & Class-4 impact resistance.",
      metricValue: "45pt",
      metricLabel: "Complimentary visual & attic assessment",
    },
    hotspots: [
      {
        id: "hotspot-01",
        topPercent: "24%",
        leftPercent: "44%",
        shortPinLabel: "01 · Baffled Ridge Vent",
        tag: "ACTIVE NODE 01 // PEAK THERMAL EXHAUST",
        title: "Continuous Storm-Baffled Ridge Ventilation",
        description:
          "Balances attic intake-to-exhaust airflow across the highest roof spine, preventing summer super-heating and winter condensation rot.",
      },
      {
        id: "hotspot-02",
        topPercent: "38%",
        leftPercent: "64%",
        shortPinLabel: "02 · 24-Ga Kynar Seam",
        tag: "ACTIVE NODE 02 // PRIMARY STRUCTURAL ENVELOPE",
        title: "24-Gauge Kynar 500® Standing-Seam & Valley Armor",
        description:
          "Concealed-clip expansion seams paired with high-temperature peel-and-stick ice barrier membrane for zero-penetration waterproofing.",
      },
      {
        id: "hotspot-03",
        topPercent: "52%",
        leftPercent: "31%",
        shortPinLabel: "03 · Eave & Box Drainage",
        tag: "ACTIVE NODE 03 // PERIMETER HYDROLOGIC DISCHARGE",
        title: "Custom 6-Inch Seamless Box Gutter & Drip Edge",
        description:
          "Heavy-gauge concealed structural hangers spaced at 24 inches route torrential roof runoff safely away from fascia and foundation walls.",
      },
    ],
  },
  marqueeSpecs: [
    "UL-2218 CLASS-4 IMPACT RESISTANCE",
    "24-GAUGE KYNAR 500® STANDING-SEAM METAL",
    "HAND-SOLDERED COPPER VALLEY FLASHING",
    "HIGH-TEMP PEEL & STICK ICE BARRIER MEMBRANE",
    "DRONE THERMAL & ATTIC MOISTURE DIAGNOSTICS",
    "MAGNETIC LAWN SWEEP & ESTATE TARPING PROTOCOL",
  ],
  materialStudio: [
    {
      id: "standing-seam",
      badge: "01 // Architectural Standing-Seam System (Sample Spec)",
      title: "24-Gauge Standing-Seam Metal",
      subtitle: "Concealed fastener architectural Kynar 500® finish",
      lifespanBadge: "50+ Yrs",
      imageKey: "project1After",
      windRating: "Up to 140 MPH / Class-4",
      underlaymentSpec: "High-Temp Ice & Water Shield",
      thermalSpec: "Cool-Roof Solar Reflective",
    },
    {
      id: "quarry-slate",
      badge: "02 // Natural & Composite Quarry Slate (Sample Spec)",
      title: "Natural & Composite Quarry Slate",
      subtitle: "Hand-split dimensional stone profile with copper flashing",
      lifespanBadge: "75–100 Yrs",
      imageKey: "project2After",
      windRating: "Up to 130 MPH / Class-4 Fire & Hail",
      underlaymentSpec: "Double-Layer Synthetic Deck Armor",
      thermalSpec: "High-Mass Natural Thermal Buffer",
    },
    {
      id: "designer-shingle",
      badge: "03 // Class-4 Designer Architectural Shingle (Sample Spec)",
      title: "Class-4 Designer Architectural Shingle",
      subtitle: "UL-2218 hail-impact rated multi-layer dimensional profile",
      lifespanBadge: "30–50 Yrs",
      imageKey: "project3After",
      windRating: "Up to 130 MPH / UL-2218 Class-4",
      underlaymentSpec: "Breathable Synthetic + Valley Ice Shield",
      thermalSpec: "Balanced Ridge & Soffit Intake Flow",
    },
  ],
  trustStrip: [
    {
      id: "licensed",
      title: "Licensed & Insured",
      subtitle: "Full residential coverage (Sample)",
      iconName: "ShieldCheck",
    },
    {
      id: "inspections",
      title: "Free Roof Inspections",
      subtitle: "45-point macro photo diagnostics",
      iconName: "Compass",
    },
    {
      id: "materials",
      title: "Quality Materials",
      subtitle: "Slate, standing-seam & Class-4",
      iconName: "Layers",
    },
    {
      id: "warranty",
      title: "Workmanship Warranty",
      subtitle: "Written protection terms (Sample)",
      iconName: "Award",
    },
    {
      id: "installation",
      title: "Professional Installation",
      subtitle: "Daily cleanup & site protection",
      iconName: "Hammer",
    },
  ],
  about: {
    label: "Who We Are",
    heading: "More Than a Roof.",
    highlightSerif: "A Commitment to Doing Things Right.",
    leadParagraph:
      "At AUREL Roofing Co., we view the roof not as a commodity shingle layer, but as the defining crown and structural shield of your residence.",
    philosophyParagraph:
      "Most premature roof failures never happen in the middle of an open slope—they begin at rushed chimney counter-flashing, under-ventilated soffits, and cut corners under the surface. Our craftsmen follow strict architectural details on every home we touch.",
    craftsmanshipStatement:
      "From elevating protective canopies over prized garden beds to sweeping every inch of lawn with magnetic rollers each evening, we treat your property with the care of a private estate.",
    ctaLabel: "Discover Our Approach",
    demoMetrics: [
      {
        value: "1,400",
        suffix: "+",
        label: "Sample Roof Assemblies",
        note: "Editable demonstration figure",
      },
      {
        value: "99.4",
        suffix: "%",
        label: "First-Pass Walkthrough Sign-Off",
        note: "Illustrative quality benchmark",
      },
      {
        value: "48",
        suffix: " hrs",
        label: "Inspection-to-Proposal Turnaround",
        note: "Sample service commitment",
      },
    ],
    pillars: [
      "Hand-cut valleys & 24-gauge flashing",
      "Dedicated on-site project director",
      "Landscape tarping & magnetic sweep",
      "Transparent line-by-line written scopes",
    ],
  },
  whyChooseUs: {
    label: "The AUREL Difference",
    heading: "Quality You Can See.",
    subheading:
      "Four architectural standards that distinguish enduring residential roofing from volume contracting.",
    principles: [
      {
        number: "01",
        roman: "I.",
        title: "Experienced Craftsmanship",
        subtitle: "Specialized Guilds",
        description:
          "Standing-seam metal, natural quarry slate, and dimensional shingles each demand distinct fastening tolerances. We assign dedicated installation artisans trained specifically in your chosen roof architecture.",
        specificationTag: "Custom-bent 24-gauge flashing details",
        iconName: "DraftingCompass",
      },
      {
        number: "02",
        roman: "II.",
        title: "Premium Roofing Materials",
        subtitle: "UL-2218 Class-4 Rated",
        description:
          "A roof is only as resilient as what lies beneath. Every system incorporates high-temperature peel-and-stick ice barriers in valleys, breathable synthetic deck armor, and balanced intake-to-ridge airflow.",
        specificationTag: "Zero compromise on hidden underlayments",
        iconName: "Layers",
      },
      {
        number: "03",
        roman: "III.",
        title: "Transparent Communication",
        subtitle: "Annotated Diagnostics",
        description:
          "Before you make any decision, you receive high-resolution macro photographs of your current roof condition alongside an honest comparison of targeted repair versus full replacement—never high-pressure pitches.",
        specificationTag: "Clear, itemized proposals with zero surprises",
        iconName: "MessageSquareCode",
      },
      {
        number: "04",
        roman: "IV.",
        title: "Reliable Project Delivery",
        subtitle: "Estate Protection Protocol",
        description:
          "We stage materials neatly, shield driveways and landscaping with breathable protective tarps, provide end-of-day supervisor photo updates, and leave your grounds immaculate.",
        specificationTag: "Nightly weatherproof dry-in & magnetic sweep",
        iconName: "ClockCheck",
      },
    ],
  },
  processSteps: [
    {
      number: "01",
      title: "Request an Inspection",
      durationSample: "Step One • Quick Scheduling",
      description:
        "Tell us about your roofing concerns and schedule an assessment at a convenient time for your household.",
      deliverable: "Confirmed Inspection Window",
    },
    {
      number: "02",
      title: "Roof Assessment",
      durationSample: "Step Two • On-Site Diagnostic",
      description:
        "We evaluate the roof, flashings, and attic ventilation, capturing annotated photos to discuss suitable solutions.",
      deliverable: "Annotated Photo Report & Material Samples",
    },
    {
      number: "03",
      title: "Plan & Installation",
      durationSample: "Step Three • Precision Execution",
      description:
        "Review the proposed scope, materials, and project schedule before work begins with full landscape protection.",
      deliverable: "Daily Supervisor Logs & Weatherproof Build",
    },
    {
      number: "04",
      title: "Final Walkthrough",
      durationSample: "Step Four • Quality Sign-Off",
      description:
        "Review the completed work alongside your project lead and receive relevant project documentation and care guidance.",
      deliverable: "Closeout Warranty Packet & Care Guide",
    },
  ],
  finalCta: {
    eyebrow: "Architectural Protection Starts Here",
    heading: "Your Home Deserves a Stronger Roof.",
    supportingCopy:
      "Start with a conversation. Get the clarity, photographic diagnostics, and honest guidance you need to protect your home for decades.",
    primaryCta: "Request Your Free Estimate",
    secondaryCta: "Call Our Team",
  },
  socials: [
    { platform: "Instagram", href: "#contact", handle: "@aurel.roofing.sample" },
    { platform: "LinkedIn", href: "#contact", handle: "AUREL Architectural Roofing" },
    { platform: "Houzz", href: "#contact", handle: "AUREL Exterior Portfolio" },
    { platform: "YouTube", href: "#contact", handle: "AUREL Craftsmanship Journal" },
  ],
  legalNote:
    "Demonstration Portfolio Notice: AUREL Roofing Co. is a fictional brand concept created for design and engineering showcase purposes. All statistics, locations, licenses, and client testimonials are editable sample content.",
};
