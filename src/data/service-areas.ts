import { ServiceAreaRegion } from "@/types";

/** Sample coverage regions. x/y are positions on the schematic map (0–100). */
export const SERVICE_AREAS_DATA: ServiceAreaRegion[] = [
  {
    id: "metro-core",
    name: "Central corridor",
    hub: "Metro Core and Historic Heights",
    response: "Same-day or 24-hour inspection dispatch",
    municipalities: ["Oakridge Heights", "Kensington Park", "Veridian District", "Founders Square", "Westchester Glen"],
    x: 48,
    y: 46,
    note: "Historic slate restorations, copper box gutters and steep-pitch gables.",
  },
  {
    id: "north-hills",
    name: "Northern ridge",
    hub: "Highland Reserve and Northgate",
    response: "Scheduled assessment within 24–48 hours",
    municipalities: ["Highland Reserve", "Cedar Crest Hills", "Northgate Estates", "Pinehurst Valley", "Summit Ridge"],
    x: 62,
    y: 24,
    note: "Exposed ridgelines that need Class-4 impact resistance, snow-retention rails and ice barrier.",
  },
  {
    id: "west-valley",
    name: "Western foothills",
    hub: "Silverlake and Brookside",
    response: "Scheduled assessment within 24–48 hours",
    municipalities: ["Silverlake Terrace", "Brookside Manor", "Alderwood", "Canyon View", "Meadowbrook"],
    x: 25,
    y: 58,
    note: "Contemporary low-slope homes, standing-seam metal and oversized 6-inch drainage.",
  },
  {
    id: "south-corridor",
    name: "Southern enclaves",
    hub: "Hawthorne and Waverly",
    response: "Scheduled assessment within 24–48 hours",
    municipalities: ["Hawthorne Woods", "Waverly Farms", "Stonebridge", "Maplewood Terrace", "Belmont Crossing"],
    x: 56,
    y: 76,
    note: "Full replacements, ventilated attic conversions and fiber-cement siding.",
  },
];
