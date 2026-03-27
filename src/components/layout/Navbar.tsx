"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Honors", href: "#honors" },
  { label: "Contact", href: "#contact" },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close on Escape and return focus to hamburger
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(
      menuRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
    );

    if (focusable.length === 0) return;

    // Defer focus into menu so React has painted before we steal focus
    const raf = requestAnimationFrame(() => {
      focusable[0]?.focus();
    });

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleTab);
    };
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = () => {
    closeMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo / Name */}
        <Link
          href="#hero"
          className={cn(
            "text-lg font-semibold tracking-tight text-foreground",
            "transition-colors duration-200 hover:text-lavender-400",
            "focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2 rounded-sm"
          )}
          onClick={handleNavClick}
        >
          Aaron Shin
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={cn(
                  "text-sm font-medium text-muted-foreground",
                  "transition-colors duration-200 hover:text-lavender-400",
                  "focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2 rounded-sm"
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button (mobile only) */}
        <button
          ref={hamburgerRef}
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex items-center justify-center rounded-md p-2 md:hidden",
            "text-muted-foreground transition-colors duration-200 hover:text-foreground",
            "focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2"
          )}
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Backdrop blur bar — sits behind nav content */}
      <div
        className="absolute inset-0 -z-10 border-b border-border bg-background/80 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="border-b border-border bg-background/95 backdrop-blur-md md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <ul className="flex flex-col px-4 py-4 sm:px-6" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={handleNavClick}
                  className={cn(
                    "block py-3 text-base font-medium text-muted-foreground",
                    "border-b border-border/50 last:border-0",
                    "transition-colors duration-200 hover:text-lavender-400",
                    "focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2 rounded-sm"
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
