import { ServiceItem } from "@/types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "roof-replacement",
    number: "01",
    title: "Roof Replacement",
    shortCategory: "Complete Structural Envelope",
    description:
      "Complete roof replacement using durable materials and professional installation—engineered down to the structural timber decking, ice barriers, and balanced ridge ventilation.",
    architecturalSpecs: [
      "Full tear-off & structural decking inspection",
      "Class-4 impact shingles, standing-seam metal, or slate",
      "Custom-fabricated 24-gauge drip edge & valley metal",
    ],
    estimatedTimelineSample: "2–4 Days (Sample)",
    imageKey: "serviceReplacement",
    aspectLayout: "wide",
    styleVariant: "dark-overlay",
  },
  {
    id: "roof-repair",
    number: "02",
    title: "Roof Repair",
    shortCategory: "Targeted Leak Remediation",
    description:
      "Address leaks, damaged shingles, flashing issues, and other roofing problems with surgical accuracy that stops water intrusion at its true origin.",
    architecturalSpecs: [
      "Chimney counter-flashing & skylight curb rebuilds",
      "Wind-lifted shingle sealing & valley restoration",
      "Attic moisture tracing & airflow balancing",
    ],
    estimatedTimelineSample: "Same-Day to 1 Day",
    imageKey: "serviceRepair",
    aspectLayout: "tall",
    styleVariant: "light-editorial",
  },
  {
    id: "roof-inspection",
    number: "03",
    title: "Roof Inspection",
    shortCategory: "45-Point Condition Audit",
    description:
      "Identify potential problems and understand the condition of your roof through comprehensive exterior, flashing, and interior attic diagnostics.",
    architecturalSpecs: [
      "Macro photo documentation of shingle wear",
      "Attic intake/exhaust & moisture evaluation",
      "Honest remaining-lifespan assessment",
    ],
    estimatedTimelineSample: "60–90 Minutes",
    imageKey: "serviceInspection",
    aspectLayout: "standard",
    styleVariant: "light-editorial",
  },
  {
    id: "storm-damage-restoration",
    number: "04",
    title: "Storm Damage Restoration",
    shortCategory: "Weather & Impact Recovery",
    description:
      "Repair weather-related roofing damage and restore protection following severe hail, high-velocity wind gusts, or fallen limb impacts.",
    architecturalSpecs: [
      "Priority weatherproof tarping & stabilization",
      "Timestamped hail-bruise & wind photo reports",
      "Impact-resistant Class-4 system upgrades",
    ],
    estimatedTimelineSample: "24–48 Hr Dispatch",
    imageKey: "serviceStorm",
    aspectLayout: "standard",
    styleVariant: "obsidian-card",
  },
  {
    id: "gutter-installation",
    number: "05",
    title: "Gutter Installation",
    shortCategory: "Hydrologic Drainage Systems",
    description:
      "Improve water drainage and protect your property's foundation and exterior with custom-extruded seamless gutters and micro-mesh leaf guards.",
    architecturalSpecs: [
      "6-inch seamless aluminum or architectural copper",
      "Hidden heavy-gauge structural fascia brackets",
      "Debris-shedding micro-screen leaf protection",
    ],
    estimatedTimelineSample: "1 Day Installation",
    imageKey: "serviceGutter",
    aspectLayout: "tall",
    styleVariant: "light-editorial",
  },
  {
    id: "siding-exterior",
    number: "06",
    title: "Siding & Exterior",
    shortCategory: "Architectural Facade & Soffits",
    description:
      "Enhance your home's appearance and exterior protection with engineered fiber-cement cladding, ventilated soffits, and custom metal fascia trim.",
    architecturalSpecs: [
      "Engineered fiber-cement lap & board-and-batten profiles",
      "Continuous weather barrier & window flashing integration",
      "Ventilated cedar or aluminum soffit assemblies",
    ],
    estimatedTimelineSample: "4–8 Days (Sample)",
    imageKey: "serviceSiding",
    aspectLayout: "wide",
    styleVariant: "horizontal-feature",
  },
];
