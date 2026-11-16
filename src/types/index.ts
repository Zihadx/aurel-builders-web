export type ThemeId =
  | "royal-gold"
  | "cobalt-slate"
  | "emerald-bronze"
  | "onyx-terracotta";

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroHotspot {
  id: string;
  topPercent: string;
  leftPercent: string;
  shortPinLabel: string;
  tag: string;
  title: string;
  description: string;
}

export interface MaterialAssemblyItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  lifespanBadge: string;
  imageKey: string;
  windRating: string;
  underlaymentSpec: string;
  thermalSpec: string;
}

export interface SiteConfig {
  companyName: string;
  shortName: string;
  tagline: string;
  announcement: {
    text: string;
    ctaLabel: string;
    ctaHref: string;
    badge: string;
  };
  contact: {
    phoneDisplay: string;
    phoneHref: string;
    email: string;
    officeHours: string;
    emergencyNote: string;
    headquartersSample: string;
  };
  hero: {
    eyebrow: string;
    headlineLines: [string, string];
    accentWord: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    trustIndicator: string;
    floatingCard: {
      title: string;
      subtitle: string;
      metricValue: string;
      metricLabel: string;
    };
    hotspots: HeroHotspot[];
  };
  marqueeSpecs: string[];
  materialStudio: MaterialAssemblyItem[];
  trustStrip: Array<{
    id: string;
    title: string;
    subtitle: string;
    iconName: "ShieldCheck" | "Compass" | "Layers" | "Award" | "Hammer";
  }>;
  about: {
    label: string;
    heading: string;
    highlightSerif: string;
    leadParagraph: string;
    philosophyParagraph: string;
    craftsmanshipStatement: string;
    ctaLabel: string;
    demoMetrics: Array<{
      value: string;
      suffix: string;
      label: string;
      note: string;
    }>;
    pillars: string[];
  };
  whyChooseUs: {
    label: string;
    heading: string;
    subheading: string;
    principles: Array<{
      number: string;
      roman: string;
      title: string;
      subtitle: string;
      description: string;
      specificationTag: string;
      iconName: "DraftingCompass" | "Layers" | "MessageSquareCode" | "ClockCheck";
    }>;
  };
  processSteps: Array<{
    number: string;
    title: string;
    durationSample: string;
    description: string;
    deliverable: string;
  }>;
  finalCta: {
    eyebrow: string;
    heading: string;
    supportingCopy: string;
    primaryCta: string;
    secondaryCta: string;
  };
  socials: Array<{
    platform: string;
    href: string;
    handle: string;
  }>;
  legalNote: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortCategory: string;
  description: string;
  architecturalSpecs: string[];
  estimatedTimelineSample: string;
  imageKey: string;
  aspectLayout: "wide" | "tall" | "standard";
  styleVariant: "dark-overlay" | "light-editorial" | "obsidian-card" | "horizontal-feature";
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Roof Replacement" | "Storm Restoration" | "Exterior Renovation";
  locationSample: string;
  yearSample: string;
  materialSystem: string;
  squareFootageSample: string;
  completionDurationSample: string;
  summary: string;
  challenge: string;
  resolution: string;
  afterImageKey: string;
  beforeImageKey: string;
  beforeLabel: string;
  afterLabel: string;
}

export interface TestimonialItem {
  id: string;
  clientNameSample: string;
  propertyLocationSample: string;
  serviceReceived: string;
  projectYearSample: string;
  rating: number;
  quote: string;
  architecturalDetail: string;
  avatarKey: string;
}

export interface ServiceAreaRegion {
  id: string;
  regionName: string;
  hubCitySample: string;
  responseWindowSample: string;
  municipalities: string[];
  coordinatesSample: {
    xPercent: number;
    yPercent: number;
  };
  architecturalNote: string;
}

export interface FaqItem {
  id: string;
  category: "Inspection & Replacement" | "Materials & Timeline" | "Storm & Warranty";
  question: string;
  answer: string;
  keyTakeaway: string;
}

export interface EstimateFormValues {
  fullName: string;
  email: string;
  phone: string;
  propertyAddress?: string;
  serviceRequired:
    | "Roof Replacement"
    | "Roof Repair"
    | "Roof Inspection"
    | "Storm Damage"
    | "Gutter Installation"
    | "Siding & Exterior"
    | "Other";
  preferredContactMethod: "Phone Call" | "Email" | "Text Message";
  projectDescription: string;
}
