// MOCK DATA: sample plans and prices. Replace with your real offer.
export interface CarePlan {
  id: string;
  name: string;
  price: number;
  blurb: string;
  featured?: boolean;
  features: string[];
}

export const CARE_PLANS: CarePlan[] = [
  {
    id: "watch",
    name: "Watch",
    price: 149,
    blurb: "A yearly check-up so nothing surprises you.",
    features: ["Annual photographed inspection", "Written condition report", "Minor sealant touch-ups included", "Reminder before storm season"],
  },
  {
    id: "guard",
    name: "Guard",
    price: 329,
    blurb: "Seasonal care and priority when the weather turns.",
    featured: true,
    features: ["Spring and autumn visits", "Gutter flush and debris clearing", "24-hour priority storm dispatch", "10% off any repair work", "Everything in Watch"],
  },
  {
    id: "heritage",
    name: "Heritage",
    price: 649,
    blurb: "Full stewardship for premium roofs and larger homes.",
    features: ["Two visits plus a mid-season check", "Emergency tarping included", "Attic moisture monitoring", "Plan transfers to the next owner", "Everything in Guard"],
  },
];
