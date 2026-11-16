import type { ImageKey } from "@/data/images";

export interface NavItem {
  label: string;
  href: string;
}

export interface RoofPart {
  id: "ridge" | "panel" | "deck" | "eave";
  title: string;
  description: string;
}

export interface MaterialItem {
  id: "standing-seam" | "slate" | "shingle";
  title: string;
  subtitle: string;
  lifespan: string;
  wind: string;
  underlayment: string;
  thermal: string;
  image: ImageKey;
}

export interface Standard {
  title: string;
  description: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  deliverable: string;
}

export interface SiteConfig {
  companyName: string;
  shortName: string;
  tagline: string;
  announcement: { text: string; ctaLabel: string; ctaHref: string };
  contact: {
    phoneDisplay: string;
    phoneHref: string;
    email: string;
    officeHours: string;
    emergencyNote: string;
    headquartersSample: string;
    whatsappNumber: string;
    whatsappMessage: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    sheetTitle: string;
    sheetNote: string;
    parts: RoofPart[];
  };
  assurances: Array<{ title: string; detail: string }>;
  materials: {
    heading: string;
    intro: string;
    note: string;
    items: MaterialItem[];
  };
  approach: {
    heading: string;
    lead: string;
    body: string;
    standards: Standard[];
  };
  process: { heading: string; intro: string; steps: ProcessStep[] };
  contactSection: {
    heading: string;
    intro: string;
    formTitle: string;
    formNote: string;
  };
  legalNote: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  description: string;
  includes: string[];
  timeline: string;
  image: ImageKey;
  /** Value of the estimate form's "Service Required" select. */
  formValue:
    | "Roof Replacement"
    | "Roof Repair"
    | "Roof Inspection"
    | "Storm Damage"
    | "Gutter Installation"
    | "Siding & Exterior";
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  system: string;
  footprint: string;
  duration: string;
  summary: string;
  challenge: string;
  resolution: string;
  beforeImage: ImageKey;
  afterImage: ImageKey;
  beforeLabel: string;
  afterLabel: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  service: string;
  quote: string;
  detail: string;
}

export interface ServiceAreaRegion {
  id: string;
  name: string;
  hub: string;
  response: string;
  municipalities: string[];
  x: number;
  y: number;
  note: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}
