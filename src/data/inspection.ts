// MOCK DATA: sample content, replace with your real inspection checklist.
export interface InspectionGroup {
  id: string;
  title: string;
  summary: string;
  points: string[];
}

/** The 45-point inspection: 10 + 9 + 9 + 8 + 9 = 45. */
export const INSPECTION_GROUPS: InspectionGroup[] = [
  {
    id: "surface",
    title: "Roof surface",
    summary: "What the weather sees every day.",
    points: [
      "Shingle or panel condition and curling",
      "Granule loss and exposed mat",
      "Cracks, blistering and bruising",
      "Missing, lifted or slipped pieces",
      "Ridge and hip cap seating",
      "Fastener exposure and backing out",
      "Moss, algae and debris build-up",
      "Previous repairs and patches",
      "Surface staining and discoloration",
      "Overall wear against expected lifespan",
    ],
  },
  {
    id: "flashings",
    title: "Flashings and penetrations",
    summary: "Where most leaks actually begin.",
    points: [
      "Chimney step and counter-flashing",
      "Skylight curbs and seals",
      "Valley metal and underlay",
      "Wall and dormer transitions",
      "Vent pipe boots and collars",
      "Sealant age and cracking",
      "Drip edge and rake metal",
      "Satellite and solar mounts",
      "Roof-to-wall junctions",
    ],
  },
  {
    id: "attic",
    title: "Ventilation and attic",
    summary: "The air you can't see, working for your roof.",
    points: [
      "Intake at the soffits",
      "Exhaust at the ridge or vents",
      "Balance of intake to exhaust",
      "Insulation depth and gaps",
      "Moisture, mold and condensation",
      "Daylight at the deck",
      "Bath and kitchen fan terminations",
      "Frost or water staining on nails",
      "Attic temperature against outdoors",
    ],
  },
  {
    id: "drainage",
    title: "Drainage and edges",
    summary: "Moving water away from the house.",
    points: [
      "Gutter slope and sizing",
      "Seams, hangers and fascia fixings",
      "Downspout placement and discharge",
      "Fascia and soffit rot",
      "Ice-dam signs along the eave",
      "Splash-back against the walls",
      "Leaf and debris loading",
      "Foundation grading at drip lines",
    ],
  },
  {
    id: "structure",
    title: "Structure and deck",
    summary: "The frame everything else relies on.",
    points: [
      "Roof plane straightness and sag",
      "Deck softness underfoot",
      "Rafter and truss condition",
      "Sheathing joints and delamination",
      "Ceiling stains below the roof",
      "Load paths at valleys",
      "Past water entry in framing",
      "Rodent or pest entry points",
      "Remaining service life estimate",
    ],
  },
];
