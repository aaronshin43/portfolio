export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  award: string;
  hackathon: string;
  date: string;
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  icon: string; // icon name hint for the component
  tags: string[];
}

export interface ResearchPosition {
  role: string;
  institution: string;
  location: string;
  period: string;
  items: ResearchItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
}

export interface TrainingItem {
  id: string;
  title: string;
  period: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface AcademicHonor {
  id: string;
  title: string;
  period: string;
}

export interface HackathonAward {
  id: string;
  award: string;
  hackathon: string;
  date: string;
  projectId: string; // links to Project.id for anchor nav
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: string; // 'github' | 'linkedin' | 'email'
}
