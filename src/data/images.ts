export interface ImageAsset {
  url: string;
  alt: string;
  caption?: string;
  creditNote?: string;
}

/**
 * Centralized Unsplash Architectural & Roofing Image Configuration
 * All URLs use stable direct images.unsplash.com endpoints with explicit crop & quality parameters.
 */
export const IMAGES: Record<string, ImageAsset> = {
  heroArchitecture: {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
    alt: "Contemporary luxury residence with dark architectural standing-seam and slate roofing line at dusk",
    caption: "Architectural Standing-Seam & Natural Slate Envelope — Sample Showcase",
  },
  heroFloatingDetail: {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
    alt: "Modern residential elevation featuring custom copper fascia and precision roof overhangs",
  },
  serviceReplacement: {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    alt: "Complete residential roof replacement featuring high-definition architectural shingles and metal accents",
  },
  serviceRepair: {
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    alt: "Precision roof flashing and ridge detail restoration on contemporary gable structure",
  },
  serviceInspection: {
    url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80",
    alt: "Multi-point architectural roof envelope diagnostic inspection on modern two-story home",
  },
  serviceStorm: {
    url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80",
    alt: "Weather-hardened residential roof restored after severe wind and hail exposure",
  },
  serviceGutter: {
    url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
    alt: "Seamless box-profile architectural gutter and copper downspout drainage system",
  },
  serviceSiding: {
    url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    alt: "Architectural fiber-cement siding, cedar soffits, and thermally broken exterior envelope",
  },
  aboutPrimaryCraft: {
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    alt: "Roofing craftsman inspecting structural timber decking and weatherproof underlayment alignment",
  },
  aboutSecondaryMaterial: {
    url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
    alt: "Architectural construction blueprints and precision copper and slate material samples",
  },
  project1After: {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    alt: "Completed modern residential roof replacement with charcoal standing-seam metal and warm soffit lighting",
  },
  project1Before: {
    url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80",
    alt: "Weathered older pitched residential roof prior to comprehensive structural re-roofing transformation",
  },
  project2After: {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
    alt: "Restored estate residence featuring impact-rated architectural slate shingles after storm restoration",
  },
  project2Before: {
    url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=80",
    alt: "Aged traditional residential roof showing granule wear and storm-weathered ridge lines prior to restoration",
  },
  project3After: {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    alt: "Contemporary exterior renovation with custom burnt-copper fascia, charcoal cladding, and low-slope roof membrane",
  },
  project3Before: {
    url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80",
    alt: "Dated suburban exterior elevation prior to roof overhang rebuild and architectural siding transformation",
  },
  finalCtaBackdrop: {
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
    alt: "Twilight architectural photograph of a protected contemporary home under clear evening skies",
  },
  avatar1: {
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    alt: "Sample client portrait — Elena Vance",
  },
  avatar2: {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    alt: "Sample client portrait — Marcus Sterling",
  },
  avatar3: {
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    alt: "Sample client portrait — Claire & Julian Mercer",
  },
};
