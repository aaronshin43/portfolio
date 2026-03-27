import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "forge-the-world",
    title: "Forge the World",
    description:
      "Real-time AI application that analyzes live camera feeds and dynamically generates gameplay and fantasy lore using a multimodal AI pipeline.",
    tech: ["Next.js", "FastAPI", "Vultr Cloud"],
    award: "Best Use of Vultr",
    hackathon: "DevFest 2026",
    date: "Feb 2026",
    githubUrl: "https://github.com/aaronshin43/forgetheworld",
    imageUrl: "/images/forge-the-world.png",
  },
  {
    id: "procrasti-hator",
    title: "Procrasti-Hator",
    description:
      "Real-time AI productivity surveillance agent that monitors screen and webcam feeds to detect distracted behaviors and enforces focus via audio feedback.",
    tech: ["PyQt6", "LiveKit", "MediaPipe", "Gemini", "ElevenLabs TTS"],
    award: "Best Use of ElevenLabs",
    hackathon: "NexHacks 2026",
    date: "Jan 2026",
    githubUrl: "https://github.com/aaronshin43/ProcrastiHater",
    imageUrl: "/images/procrastihater.png",
  },
  {
    id: "the-last-vigil",
    title: "The Last Vigil",
    description:
      "Hands-free interactive ASL learning platform controlled by head-gaze and real-time gesture recognition, powered by a custom model trained on 54,000+ images.",
    tech: ["FastAPI", "MediaPipe", "OpenCV", "Vultr Cloud", "WebSockets"],
    award: "Best Gamification Hack & Best Use of Vultr",
    hackathon: "Technica 2025",
    date: "Nov 2025",
    githubUrl: "https://github.com/aaronshin43/lastvigil-front",
    imageUrl: "/images/lastvigil.png",
  },
  {
    id: "charaides",
    title: "CharAIdes",
    description:
      "Real-time Human-AI interactive charades game using Gemini as an AI opponent that instantly analyzes and guesses user actions via live webcam.",
    tech: ["React", "FastAPI", "Gemini"],
    award: "Most Creative Hack",
    hackathon: "PennApps XXVI",
    date: "Sep 2025",
    githubUrl: "https://github.com/PennApps2025/FrontAiCharades",
    imageUrl: "/images/charaides.png",
  },
];
