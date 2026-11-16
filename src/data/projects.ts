import { ProjectItem } from "@/types";

/**
 * Sample Architectural Portfolio Projects
 * Uses distinct, verified before & after photographs for interactive slider comparison.
 */
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "kensington-ridge-residence",
    title: "Modern Residential Roof Replacement",
    category: "Roof Replacement",
    locationSample: "Oakridge Architectural District (Sample Location)",
    yearSample: "2026 Sample Case Study",
    materialSystem: "24-Gauge Matte Obsidian Standing-Seam & Burnt Copper Fascia",
    squareFootageSample: "4,850 sq. ft. Roof Footprint",
    completionDurationSample: "4 Days",
    summary:
      "Transformed an aging, heat-retaining asphalt roof into a crisp architectural standing-seam envelope with concealed fasteners and integrated snow-retention rails.",
    challenge:
      "The residence experienced recurring valley ice-dam seepage and severe attic heat gain across three intersecting low-slope and steep-slope roof planes.",
    resolution:
      "Installed high-temperature peel-and-stick membrane across 100% of the deck, ventilated furring channels, and custom-seamed 24-gauge Kynar-coated metal panels.",
    afterImageKey: "project1After",
    beforeImageKey: "project1Before",
    beforeLabel: "BEFORE // WEATHERED ASPHALT SHINGLE ENVELOPE (SAMPLE)",
    afterLabel: "AFTER // STANDING-SEAM ARCHITECTURAL SYSTEM (SAMPLE)",
  },
  {
    id: "hawthorne-estate-restoration",
    title: "Traditional Home Storm Restoration",
    category: "Storm Restoration",
    locationSample: "Highland Reserve Estates (Sample Location)",
    yearSample: "2026 Sample Case Study",
    materialSystem: "Class-4 Impact-Rated Architectural Slate-Profile Shingles",
    squareFootageSample: "5,400 sq. ft. Roof Footprint",
    completionDurationSample: "3 Days",
    summary:
      "Full structural storm restoration following severe hail impact, upgrading the residence to UL-2218 Class-4 impact resistance with hand-soldered copper chimney flashings.",
    challenge:
      "Wind-driven hail fractured over 60% of the existing ridge caps and compromised three skylight perimeter flashings, causing slow ceiling moisture staining.",
    resolution:
      "Executed rapid dry-in stabilization, replaced compromised decking sheets, re-flashed all skylights with custom metal curbs, and installed heavyweight dimensional shingles.",
    afterImageKey: "project2After",
    beforeImageKey: "project2Before",
    beforeLabel: "BEFORE // HAIL-IMPACTED RIDGE & GRANULE WEAR (SAMPLE)",
    afterLabel: "AFTER // CLASS-4 IMPACT ARCHITECTURAL SHINGLE SYSTEM (SAMPLE)",
  },
  {
    id: "veridian-courtyard-house",
    title: "Contemporary Exterior Renovation",
    category: "Exterior Renovation",
    locationSample: "Cedar Crest Hills (Sample Location)",
    yearSample: "2025 Sample Case Study",
    materialSystem: "Architectural Fiber-Cement Cladding, Box Gutters & Roof Overhangs",
    squareFootageSample: "6,100 sq. ft. Combined Envelope",
    completionDurationSample: "7 Days",
    summary:
      "Comprehensive roof and facade renewal unifying the roofline, 6-inch seamless box gutters, ventilated soffits, and thermally isolated exterior cladding.",
    challenge:
      "Undersized 4-inch gutters and unventilated eaves caused fascia rot and rainwater cascading across the primary entryway during heavy downpours.",
    resolution:
      "Re-engineered the eave overhang geometry, installed concealed-hanger 6-inch seamless drainage, and wrapped the exterior in moisture-proof barrier and modern siding.",
    afterImageKey: "project3After",
    beforeImageKey: "project3Before",
    beforeLabel: "BEFORE // DATED EAVES & UNDERSIZED DRAINAGE (SAMPLE)",
    afterLabel: "AFTER // INTEGRATED ROOF, SOFFIT & CLADDING ENVELOPE (SAMPLE)",
  },
];
