import { ProjectItem } from "@/types";

/** Sample projects. Replace with real case studies and photography. */
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "oakridge-replacement",
    title: "Standing-seam replacement",
    category: "Roof replacement",
    location: "Oakridge district",
    system: "24-gauge matte standing-seam with copper fascia",
    footprint: "4,850 sq ft roof",
    duration: "4 days",
    summary:
      "An aging asphalt roof became a standing-seam system with concealed fasteners and integrated snow-retention rails.",
    challenge:
      "Recurring ice-dam leaks in the valleys and heavy attic heat gain across three intersecting roof planes.",
    resolution:
      "Ice-and-water membrane over the whole deck, ventilated furring channels, and custom-seamed metal panels.",
    before: "worn",
    after: "seam",
    beforeLabel: "Worn asphalt shingle",
    afterLabel: "Standing-seam metal",
  },
  {
    id: "highland-storm",
    title: "Hail damage restoration",
    category: "Storm restoration",
    location: "Highland Reserve",
    system: "Class-4 impact-rated slate-profile shingle",
    footprint: "5,400 sq ft roof",
    duration: "3 days",
    summary:
      "Full restoration after severe hail, upgraded to UL 2218 Class-4 impact resistance with hand-soldered copper chimney flashing.",
    challenge:
      "Hail fractured most of the ridge caps and compromised three skylight flashings, leaving slow ceiling stains.",
    resolution:
      "Rapid dry-in, replaced deck sheets, new metal skylight curbs, and heavyweight dimensional shingles.",
    before: "hail",
    after: "slate",
    beforeLabel: "Hail-damaged shingle",
    afterLabel: "Class-4 slate profile",
  },
  {
    id: "cedar-crest-exterior",
    title: "Roofline and exterior renewal",
    category: "Exterior renovation",
    location: "Cedar Crest Hills",
    system: "Fiber-cement cladding, box gutters and rebuilt overhangs",
    footprint: "6,100 sq ft combined envelope",
    duration: "7 days",
    summary:
      "Roof and facade renewal that unified the roofline, 6-inch seamless gutters, ventilated soffits and wall cladding.",
    challenge:
      "Undersized 4-inch gutters and unvented eaves caused fascia rot and water spilling across the front entry.",
    resolution:
      "Rebuilt the eave geometry, fitted concealed-hanger 6-inch gutters, and wrapped the walls in barrier and new cladding.",
    before: "dated",
    after: "clad",
    beforeLabel: "Aged roofline and eaves",
    afterLabel: "Renewed roofline and cladding",
  },
];
