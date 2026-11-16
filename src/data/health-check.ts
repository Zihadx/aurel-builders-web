// MOCK DATA: scoring is illustrative. Tune the weights with your own field experience.
export interface HealthQuestion {
  id: string;
  prompt: string;
  hint: string;
  multi?: boolean;
  options: Array<{ label: string; penalty: number; none?: boolean }>;
}

export const HEALTH_QUESTIONS: HealthQuestion[] = [
  {
    id: "age",
    prompt: "How old is your roof?",
    hint: "A rough guess is fine.",
    options: [
      { label: "Under 10 years", penalty: 0 },
      { label: "10 to 20 years", penalty: 14 },
      { label: "Over 20 years", penalty: 30 },
      { label: "I’m not sure", penalty: 18 },
    ],
  },
  {
    id: "material",
    prompt: "What is it made of?",
    hint: "Look at the surface from the street.",
    options: [
      { label: "Asphalt shingle", penalty: 6 },
      { label: "Metal", penalty: 0 },
      { label: "Slate or tile", penalty: 0 },
      { label: "Flat or membrane", penalty: 10 },
      { label: "Not sure", penalty: 8 },
    ],
  },
  {
    id: "signs",
    prompt: "Have you noticed any of these?",
    hint: "Choose everything that applies.",
    multi: true,
    options: [
      { label: "Curling or cracked shingles", penalty: 10 },
      { label: "Dark stains on a ceiling or wall", penalty: 14 },
      { label: "Granules in the gutters", penalty: 8 },
      { label: "Missing or lifted pieces", penalty: 12 },
      { label: "Daylight in the attic", penalty: 16 },
      { label: "Sagging roof lines", penalty: 20 },
      { label: "None of these", penalty: 0, none: true },
    ],
  },
  {
    id: "storm",
    prompt: "Any storm history?",
    hint: "Wind, hail or fallen limbs.",
    options: [
      { label: "No major storm", penalty: 0 },
      { label: "Heavy wind or hail in the last 2 years", penalty: 10 },
      { label: "I’ve seen direct damage", penalty: 18 },
    ],
  },
  {
    id: "inspection",
    prompt: "When was it last inspected?",
    hint: "By anyone who went up and looked.",
    options: [
      { label: "Within the last year", penalty: 0 },
      { label: "1 to 3 years ago", penalty: 4 },
      { label: "More than 3 years ago", penalty: 9 },
      { label: "Never", penalty: 12 },
    ],
  },
];

export interface HealthBand {
  min: number;
  label: string;
  tone: "good" | "watch" | "act" | "urgent";
  headline: string;
  advice: string[];
}

export const HEALTH_BANDS: HealthBand[] = [
  {
    min: 80,
    label: "Healthy",
    tone: "good",
    headline: "Your roof sounds in good shape.",
    advice: ["Keep gutters clear and trim overhanging branches.", "A photographed inspection every two years keeps small issues small.", "Ask about a Care Plan if you’d like us to watch it for you."],
  },
  {
    min: 60,
    label: "Worth watching",
    tone: "watch",
    headline: "Nothing alarming, but worth a proper look.",
    advice: ["Age and wear are starting to show.", "A 45-point inspection will separate cosmetic wear from real risk.", "Catching flashing and sealant problems now usually avoids a larger bill."],
  },
  {
    min: 35,
    label: "Needs attention",
    tone: "act",
    headline: "Several signs point to a roof that needs attention.",
    advice: ["Book an inspection soon, before the next heavy weather.", "Repair may still be an option. We’ll tell you honestly.", "Photograph any ceiling stains so we can trace the source."],
  },
  {
    min: 0,
    label: "Act soon",
    tone: "urgent",
    headline: "Your roof needs a professional look soon.",
    advice: ["Prioritise a visit this week if you can.", "If water is coming in, we can arrange temporary protection.", "Please don’t climb up yourself. We’ll document everything safely."],
  },
];

export const bandFor = (score: number) => HEALTH_BANDS.find((b) => score >= b.min) ?? HEALTH_BANDS[HEALTH_BANDS.length - 1];
