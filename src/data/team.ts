// MOCK DATA: sample people. Replace names, roles and quotes with your real team.
export interface TeamMember {
  name: string;
  role: string;
  years: number;
  focus: string;
  quote: string;
}

export const TEAM_DATA: TeamMember[] = [
  { name: "Maya Chen", role: "Founder and Principal", years: 22, focus: "Standards and training", quote: "If we wouldn’t put it on our own home, it doesn’t go on yours." },
  { name: "Daniel Okafor", role: "Head of Field Operations", years: 17, focus: "Scheduling and site quality", quote: "A good roof is mostly good preparation. The shingles are the easy part." },
  { name: "Priya Raman", role: "Customer Director", years: 11, focus: "Scopes, claims and care plans", quote: "You should never have to guess what a line on our proposal means." },
  { name: "Tomás Alvarez", role: "Master Roofer", years: 26, focus: "Standing-seam and slate", quote: "Metal forgives nothing. That’s exactly why I like it." },
];
