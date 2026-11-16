export interface ImageAsset {
  url: string;
  alt: string;
}

const u = (id: string, w = 1800, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

/**
 * Every photo on the site is hot-linked from Unsplash and listed here, so you
 * can replace any of them later by changing one URL. All of these were picked
 * from Unsplash's roofing results. Keep the alt text specific to what the new
 * photo shows.
 */
export const IMAGES = {
  // Hero backdrop
  hero: { url: u("1600585154340-be6161a56a0c", 2200), alt: "Contemporary home with a dark roof at dusk" },
  heroDetail: { url: u("1779941373840-a93f6e0d5db0", 1400), alt: "Grey metal roof with white siding and a dormer window" },

  // Services
  serviceReplacement: { url: u("1763665814538-8ba04597286c", 1400), alt: "Workers installing roof tiles on a new building" },
  serviceRepair: { url: u("1643225523483-e2c434191bba", 1400), alt: "Roofer carrying a bundle of shingles across a residential roof" },
  serviceInspection: { url: u("1632759145351-1d592919f522", 1400), alt: "Roofer standing on a house roof during an inspection" },
  serviceStorm: { url: u("1726589004565-bedfba94d3a2", 1400), alt: "Roofer working on a roof" },
  serviceGutter: { url: u("1635424824849-1b09bdcc55b1", 1400), alt: "Roofer fastening roofing with a power drill" },
  serviceSiding: { url: u("1779941373840-a93f6e0d5db0", 1400), alt: "Grey metal roof with white siding and a dormer window" },

  // Approach + materials
  craft: { url: u("1763665814965-b5c4b3547908", 1400), alt: "Construction workers installing roof tiles" },
  materials: { url: u("1518736346281-76873166a64a", 1200), alt: "Pattern of dark grey roof tiles in bright light" },
  materialMetal: { url: u("1780445392484-5fb7d5610708", 1400), alt: "Hands using a tool to fasten metal roofing" },
  materialSlate: { url: u("1518736346281-76873166a64a", 1400), alt: "Dark grey roof tiles with sharp shadows" },
  materialShingle: { url: u("1643225523483-e2c434191bba", 1400), alt: "Asphalt shingles being carried across a residential roof" },

  // Projects: before / after pairs
  p1Before: { url: u("1633759593085-1eaeb724fc88", 1800), alt: "Roofer removing old shingles from a residential roof" },
  p1After: { url: u("1779941373840-a93f6e0d5db0", 1800), alt: "Finished grey metal roof with white siding and a dormer" },
  p2Before: { url: u("1632759145351-1d592919f522", 1800), alt: "Roofer assessing a storm-damaged roof" },
  p2After: { url: u("1518736346281-76873166a64a", 1800), alt: "New dark grey slate-profile roof tiles" },
  p3Before: { url: u("1635424709961-f3a150459ad4", 1800), alt: "Two roofers working on an aging roofline" },
  p3After: { url: u("1763665814485-a0a1b6f51ed7", 1800), alt: "Crew installing new roofing materials on a house" },

  // Contact backdrop
  cta: { url: u("1763665814485-a0a1b6f51ed7", 2200, 75), alt: "Crew installing roofing on a house" },
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof IMAGES;
