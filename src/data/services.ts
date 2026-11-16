import { ServiceItem } from "@/types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "roof-replacement",
    title: "Roof replacement",
    summary: "Full tear-off, rebuilt layer by layer",
    description:
      "A complete replacement down to the structural deck: ice barriers, breathable underlayment and balanced ridge ventilation, finished in the material you choose.",
    includes: [
      "Full tear-off and structural deck inspection",
      "Class-4 shingle, standing-seam metal or slate",
      "Custom-fabricated 24-gauge drip edge and valley metal",
    ],
    timeline: "2–4 days",
    image: "serviceReplacement",
    formValue: "Roof Replacement",
  },
  {
    id: "roof-repair",
    title: "Roof repair",
    summary: "Leaks stopped at their source",
    description:
      "Targeted repair of leaks, damaged shingles and failed flashing, traced back to where the water actually gets in.",
    includes: [
      "Chimney counter-flashing and skylight curb rebuilds",
      "Wind-lifted shingle sealing and valley restoration",
      "Attic moisture tracing and airflow balancing",
    ],
    timeline: "Same day to 1 day",
    image: "serviceRepair",
    formValue: "Roof Repair",
  },
  {
    id: "roof-inspection",
    title: "Roof inspection",
    summary: "45 points, photographed and explained",
    description:
      "A complete look at your roof’s exterior, flashings and attic, so you know its condition and its honest remaining life before you spend anything.",
    includes: [
      "Macro photo documentation of shingle wear",
      "Attic intake, exhaust and moisture evaluation",
      "Honest remaining-lifespan assessment",
    ],
    timeline: "60–90 minutes",
    image: "serviceInspection",
    formValue: "Roof Inspection",
  },
  {
    id: "storm-damage",
    title: "Storm damage restoration",
    summary: "Stabilized fast, documented fully",
    description:
      "Priority tarping to stop water coming in, then restoration after hail, high wind or fallen limbs, with documentation you can use.",
    includes: [
      "Priority weatherproof tarping and stabilization",
      "Timestamped hail and wind-damage photo reports",
      "Class-4 impact-resistant system upgrades",
    ],
    timeline: "24–48 hour dispatch",
    image: "serviceStorm",
    formValue: "Storm Damage",
  },
  {
    id: "gutters",
    title: "Gutter installation",
    summary: "Seamless, sized for real rainfall",
    description:
      "Custom-formed seamless gutters and micro-mesh leaf guards that move water away from your fascia and foundation.",
    includes: [
      "6-inch seamless aluminum or copper",
      "Concealed heavy-gauge fascia brackets",
      "Debris-shedding micro-screen leaf protection",
    ],
    timeline: "1 day",
    image: "serviceGutter",
    formValue: "Gutter Installation",
  },
  {
    id: "siding",
    title: "Siding and exterior",
    summary: "Cladding, soffits and trim",
    description:
      "Fiber-cement cladding, ventilated soffits and custom metal fascia that finish the roofline and protect the walls below it.",
    includes: [
      "Fiber-cement lap and board-and-batten profiles",
      "Continuous weather barrier with window flashing",
      "Ventilated cedar or aluminum soffit assemblies",
    ],
    timeline: "4–8 days",
    image: "serviceSiding",
    formValue: "Siding & Exterior",
  },
];
