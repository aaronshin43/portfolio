"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { socialLinks } from "@/data/social";

const TAGLINES = [
  "CS & Math @ Dickinson College",
  "Undergraduate Researcher",
  "Hackathon Winner",
] as const;

const TYPING_SPEED_MS = 60;
const ERASE_SPEED_MS = 35;
const PAUSE_AFTER_TYPE_MS = 1800;
const PAUSE_AFTER_ERASE_MS = 400;

const ICON_MAP = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
} as const;

export function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const reducedMotion = useReducedMotion();
  // Motion's hook returns null during SSR; treat null as false (animate by default)
  const prefersReducedMotion = reducedMotion === true;

  useEffect(() => {
    // When reduced motion is preferred, show the first tagline statically — no typing loop
    if (prefersReducedMotion) {
      return;
    }

    const currentTagline = TAGLINES[taglineIndex];

    if (isTyping) {
      if (displayText.length < currentTagline.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentTagline.slice(0, displayText.length + 1));
        }, TYPING_SPEED_MS);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), PAUSE_AFTER_TYPE_MS);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, ERASE_SPEED_MS);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
          setIsTyping(true);
        }, PAUSE_AFTER_ERASE_MS);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayText, isTyping, taglineIndex, prefersReducedMotion]);

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center"
      style={{
        background:
          "radial-gradient(ellipse at top, rgba(124,90,224,0.15) 0%, transparent 60%)",
      }}
      aria-label="Introduction"
    >
      {/* Greeting */}
      <p className="mb-2 text-sm font-medium tracking-widest text-muted uppercase">
        Hi, I&apos;m
      </p>

      {/* Name */}
      <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-7xl">
        <span className="bg-linear-to-r from-lavender-300 to-lavender-500 bg-clip-text text-transparent">
          Aaron Shin
        </span>
      </h1>

      {/* Typewriter tagline */}
      <div
        className="mb-6 h-8 flex items-center justify-center"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-lg font-medium text-foreground md:text-xl">
          <span>{prefersReducedMotion ? TAGLINES[0] : displayText}</span>
          <span
            className={cn(
              "ml-0.5 inline-block h-5 w-0.5 bg-lavender-400 align-middle",
              prefersReducedMotion ? "opacity-100" : "animate-[blink_1s_step-end_infinite]"
            )}
            aria-hidden="true"
          />
        </p>
      </div>

      {/* Intro paragraph */}
      <p className="mx-auto mb-10 max-w-xl text-base text-muted md:text-lg">
        I build AI-powered applications and research the mechanics of language
        models. Currently at Dickinson College, looking toward graduate
        research.
      </p>

      {/* CTA buttons */}
      <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href="#research"
          className={cn(
            "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold",
            "bg-lavender-500 text-white",
            "transition-all duration-200 hover:bg-lavender-400 hover:shadow-[0_0_20px_rgba(124,90,224,0.4)]",
            "focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2"
          )}
        >
          View Research
        </a>
        <a
          href="#projects"
          className={cn(
            "inline-flex items-center justify-center rounded-lg border border-lavender-500 px-6 py-3 text-sm font-semibold",
            "text-lavender-400",
            "transition-all duration-200 hover:bg-lavender-500/10 hover:shadow-[0_0_20px_rgba(124,90,224,0.2)]",
            "focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2"
          )}
        >
          See Projects
        </a>
      </div>

      {/* Social links */}
      <ul className="mb-16 flex items-center gap-6" role="list">
        {socialLinks.map(({ id, label, href, icon }) => {
          const IconComponent = ICON_MAP[icon as keyof typeof ICON_MAP];
          return (
            <li key={id}>
              <a
                href={href}
                aria-label={label}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className={cn(
                  "block text-muted transition-colors duration-200",
                  "hover:text-lavender-400",
                  "focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2 rounded-sm"
                )}
              >
                <IconComponent className="h-5 w-5" />
              </a>
            </li>
          );
        })}
      </ul>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <a
          href="#about"
          tabIndex={-1}
          className="block text-muted hover:text-lavender-400 transition-colors duration-200"
          aria-label="Scroll to about section"
        >
          <svg
            className="h-6 w-6 animate-bounce"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>
    </section>
  );
}
