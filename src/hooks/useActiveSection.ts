"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "hero",
  "about",
  "research",
  "projects",
  "experience",
  "skills",
  "honors",
  "contact",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return activeSection;
}
