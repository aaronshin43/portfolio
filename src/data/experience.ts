import type { ExperienceItem, TrainingItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    id: "rok-army",
    role: "IT Specialist",
    organization: "Republic of Korea Army",
    location: "Pocheon, South Korea",
    period: "Jul 2023 – Jan 2025",
    bullets: [
      "Administered Linux-based tactical command systems for a 3,000-personnel brigade, securing Apache web servers via monthly security patches and data backups to ensure 24/7 operational readiness.",
      "Maintained internal websites and managed IP allocation for over 500 devices using network access control system.",
    ],
    tags: ["Linux", "Apache", "Networking", "Security"],
  },
];

export const leadership: ExperienceItem[] = [
  {
    id: "ksa-vp",
    role: "Vice President",
    organization: "Korean Student Association",
    location: "Dickinson College",
    period: "Present",
    bullets: [],
    tags: ["Leadership"],
  },
];

export const training: TrainingItem[] = [
  {
    id: "java-spring",
    title: "Java Spring Backend Web Development Immersive",
    period: "May 2025 – Aug 2025",
    description:
      "Architected a full-featured bulletin board application using Spring Boot and Vue.js, applying MVC design patterns and Dependency Injection.",
  },
  {
    id: "military-ict",
    title: "Military Personnel ICT Intensive Program",
    period: "Aug 2024 – Oct 2024",
    description:
      "Acquired proficiency in data processing and analysis using Pandas, NumPy, and Matplotlib.",
  },
];
