export interface ImageAsset {
  url: string;
  alt: string;
}

const u = (id: string, w = 1800, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

/**
 * Photography is hot-linked from Unsplash (images.unsplash.com is allowed in
 * next.config.ts). Swap any URL for your own photography; keep the alt text
 * specific to what the photo shows.
 */
export const IMAGES = {
  hero: { url: u("1600585154340-be6161a56a0c", 2200, 80), alt: "Contemporary home with a dark metal roof at dusk" },
  heroDetail: { url: u("1513694203232-719a280e022f", 1400), alt: "Pitched roof ridge and gable against the sky" },
  serviceReplacement: { url: u("1600607687939-ce8a6c25118c", 1400), alt: "Newly roofed modern home with clean rooflines" },
  serviceRepair: { url: u("1513694203232-719a280e022f", 1400), alt: "Roof ridge and flashing detail" },
  serviceInspection: { url: u("1580587771525-78b9dba3b914", 1400), alt: "Large two-story home, roof visible from the street" },
  serviceStorm: { url: u("1600566753376-12c8ab7fb75b", 1400), alt: "Home with a weathered roof after a storm season" },
  serviceGutter: { url: u("1600585154526-990dced4db0d", 1400), alt: "Roof edge and gutter on a modern home" },
  serviceSiding: { url: u("1600607687920-4e2a09cf159d", 1400), alt: "Home exterior with clean siding and trim" },
  craft: { url: u("1504307651254-35680f356dfd", 1400), alt: "Roofing craftsman at work on timber decking" },
  materials: { url: u("1541888946425-d81bb19240f5", 1200), alt: "Construction drawings and material samples on a table" },
  project1: { url: u("1600607687939-ce8a6c25118c", 1800), alt: "Standing-seam metal roof on a contemporary home" },
  project2: { url: u("1600596542815-ffad4c1539a9", 1800), alt: "Restored estate home with a new slate-profile roof" },
  project3: { url: u("1600585154526-990dced4db0d", 1800), alt: "Renovated home exterior at twilight with new roofline and cladding" },
  cta: { url: u("1600566753190-17f0baa2a6c3", 2200, 75), alt: "Home glowing at twilight under a sound roof" },
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof IMAGES;
