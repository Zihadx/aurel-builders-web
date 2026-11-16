// MOCK DATA: sample articles written as realistic, general guidance. Review and
// localise before publishing under your own name.
export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  minutes: number;
  body: Array<{ h?: string; p?: string; list?: string[] }>;
}

export const ARTICLES: Article[] = [
  {
    slug: "how-long-does-a-roof-last",
    title: "How long does a roof really last?",
    excerpt: "Manufacturer numbers and real-world numbers are rarely the same. Here is what to expect from each material, and what shortens the clock.",
    category: "Materials",
    date: "2026-10-22",
    minutes: 5,
    body: [
      { p: "Every roofing product comes with a lifespan on the box. Most roofs never reach it. The gap between the claim and the reality is usually down to ventilation, installation quality and weather exposure, not the material itself." },
      { h: "Typical ranges", list: ["Standard asphalt shingle: 18 to 28 years in most climates.", "Class-4 impact-rated shingle: 30 to 50 years.", "Standing-seam metal: 50 years or more, with finish warranties that are shorter.", "Natural slate: 75 to 100 years, provided the fixings and flashings are renewed."] },
      { h: "What shortens a roof’s life", p: "Poor attic ventilation is the most common culprit. Trapped heat bakes shingles from below, and trapped moisture rots the deck. Next come flashing failures at chimneys and valleys, then storm events, and finally long periods without anyone looking at it." },
      { h: "How to get more years", list: ["Keep gutters clear so water never backs up at the eave.", "Have the roof photographed every two years, and after major storms.", "Fix small flashing and sealant problems early, while they are cheap.", "Check that the attic breathes, with intake at the soffits and exhaust at the ridge."] },
      { h: "Repair or replace?", p: "A good rule: if more than a third of the roof needs work, or repairs are recurring, replacement usually costs less over the next decade. An honest inspection will tell you which side of that line you are on." },
    ],
  },
  {
    slug: "after-a-storm-what-to-photograph",
    title: "After a storm: what to photograph before anyone touches the roof",
    excerpt: "A calm ten minutes with a phone camera can make an insurance claim far smoother. A short checklist, and what to avoid.",
    category: "Storm advice",
    date: "2026-09-30",
    minutes: 4,
    body: [
      { p: "After hail or high wind, the instinct is to climb up and look. Please don’t. Wet shingles and loosened material are dangerous, and an unqualified inspection can make damage worse. You can gather most of what you need from the ground and from inside the house." },
      { h: "From the ground", list: ["Wide shots of each side of the house, showing the roofline.", "Close-ups of anything visibly lifted, missing or dented.", "Gutters, downspouts and the ground below them, where granules and debris collect.", "Fences, cars and garden furniture, since hail marks there support the claim."] },
      { h: "From inside", list: ["Any new ceiling or wall stains, with a coin or ruler for scale.", "The attic, if it is safe to enter, looking for daylight or damp insulation.", "Dates: your phone timestamps photos, so keep the originals."] },
      { h: "Protect it, then call", p: "If water is coming in, a temporary tarp is reasonable and usually covered. Keep the receipt and photograph it. Then contact your insurer and ask a roofer for an itemised written scope." },
      { h: "A word of caution", p: "Be wary of anyone who knocks on your door after a storm and pressures you to sign the same day. A reputable contractor will give you time, a written scope and references." },
    ],
  },
  {
    slug: "standing-seam-or-shingle-honest-costs",
    title: "Standing-seam or shingle? An honest cost comparison",
    excerpt: "Metal costs more up front and less over time, but not for everyone. How to decide which one actually suits your home.",
    category: "Costs",
    date: "2026-09-12",
    minutes: 6,
    body: [
      { p: "Standing-seam metal typically costs roughly two to three times as much as architectural shingle to install. Whether that is worth it depends on how long you will stay, your climate and the shape of your roof." },
      { h: "Upfront cost", p: "As a guide, installed shingle commonly runs several hundred dollars per roofing square, while standing-seam runs well over a thousand. Complex roofs with many valleys narrow or widen that gap, because metal rewards simple geometry." },
      { h: "Over thirty years", list: ["A shingle roof may need replacing once within that window; metal usually does not.", "Metal sheds snow and resists wind uplift when properly clipped.", "Reflective finishes can reduce cooling costs in hot climates.", "Insurance discounts for impact-rated roofs vary by provider, so ask."] },
      { h: "The common worries", p: "Noise is the usual concern, but a properly decked and insulated metal roof is no louder than shingle in rain. Denting is real in severe hail, which is why gauge and panel profile matter." },
      { h: "So which one?", p: "If you plan to stay ten years or more, or want to avoid a second replacement, metal often wins. If you may move within five years, a quality Class-4 shingle gives most of the protection for far less." },
    ],
  },
];
