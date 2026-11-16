import { ServiceAreaRegion } from "@/types";

/**
 * Centralized Service Area Data (Editable Sample Regions)
 */
export const SERVICE_AREAS_DATA: ServiceAreaRegion[] = [
  {
    id: "metro-core",
    regionName: "Central Architectural Corridor (Sample)",
    hubCitySample: "Metro Core & Historic Heights",
    responseWindowSample: "Same-Day / 24-Hr Inspection Dispatch",
    municipalities: [
      "Oakridge Heights",
      "Kensington Park",
      "Veridian District",
      "Founders Square",
      "Westchester Glen",
    ],
    coordinatesSample: { xPercent: 48, yPercent: 46 },
    architecturalNote:
      "High concentration of historic slate restorations, custom copper box gutters, and steep-pitch architectural gables.",
  },
  {
    id: "north-hills",
    regionName: "Northern Ridge & Estate Belt (Sample)",
    hubCitySample: "Highland Reserve & Northgate",
    responseWindowSample: "24–48 Hr Scheduled Assessment",
    municipalities: [
      "Highland Reserve",
      "Cedar Crest Hills",
      "Northgate Estates",
      "Pinehurst Valley",
      "Summit Ridge",
    ],
    coordinatesSample: { xPercent: 62, yPercent: 26 },
    architecturalNote:
      "Elevated wind-exposure ridgelines requiring Class-4 impact resistance, snow-retention rails, and ice-barrier membranes.",
  },
  {
    id: "west-valley",
    regionName: "Western Foothills & Lakefront (Sample)",
    hubCitySample: "Silverlake & Brookside",
    responseWindowSample: "24–48 Hr Scheduled Assessment",
    municipalities: [
      "Silverlake Terrace",
      "Brookside Manor",
      "Alderwood",
      "Canyon View",
      "Meadowbrook",
    ],
    coordinatesSample: { xPercent: 27, yPercent: 58 },
    architecturalNote:
      "Contemporary low-slope residential architecture, standing-seam metal roofs, and oversized 6-inch seamless drainage.",
  },
  {
    id: "south-corridor",
    regionName: "Southern Heritage & Suburban Enclaves (Sample)",
    hubCitySample: "Hawthorne & Waverly",
    responseWindowSample: "24–48 Hr Scheduled Assessment",
    municipalities: [
      "Hawthorne Woods",
      "Waverly Farms",
      "Stonebridge",
      "Maplewood Terrace",
      "Belmont Crossing",
    ],
    coordinatesSample: { xPercent: 56, yPercent: 74 },
    architecturalNote:
      "Full residential roof replacements, ventilated attic conversions, and fiber-cement exterior siding transformations.",
  },
];
