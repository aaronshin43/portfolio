import type { AcademicHonor, HackathonAward } from "./types";

export const academicHonors: AcademicHonor[] = [
  {
    id: "landis-prize",
    title: "William W. Landis Memorial Prize in Mathematics",
    period: "Apr 2023",
  },
  {
    id: "deans-list",
    title: "Dean's List (Over 3.75 GPA)",
    period: "All Semesters",
  },
  {
    id: "1783-scholarship",
    title: "The 1783 Scholarship (Merit-based)",
    period: "All Semesters",
  },
];

export const hackathonAwards: HackathonAward[] = [
  {
    id: "devfest-2026",
    award: "Best Use of Vultr",
    hackathon: "DevFest 2026",
    date: "Feb 2026",
    projectId: "forge-the-world",
  },
  {
    id: "nexhacks-2026",
    award: "Best Use of ElevenLabs",
    hackathon: "NexHacks 2026",
    date: "Jan 2026",
    projectId: "procrasti-hator",
  },
  {
    id: "technica-2025",
    award: "Best Gamification Hack & Best Use of Vultr",
    hackathon: "Technica 2025",
    date: "Nov 2025",
    projectId: "the-last-vigil",
  },
  {
    id: "pennapps-xxvi",
    award: "Most Creative Hack",
    hackathon: "PennApps XXVI",
    date: "Sep 2025",
    projectId: "charaides",
  },
];
