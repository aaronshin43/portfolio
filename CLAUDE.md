# Portfolio Project — Aaron Shin

## Overview
Personal developer portfolio website for Aaron Shin (Jeongcheol Shin). Built with Next.js 15, TypeScript, Tailwind CSS v4, deployed on Vercel.

## Plan
See [PLAN.md](PLAN.md) for the full implementation plan, section breakdown, and phased build order.

## Code Style Guide

### General
- **Language**: TypeScript (strict mode)
- **Framework**: Next.js 15 App Router with `src/` directory
- **Styling**: Tailwind CSS v4 utility classes — avoid inline styles or CSS modules
- **Components**: Functional components only, no class components
- **Exports**: Prefer named exports for components, hooks, and utilities
- **Formatting/Linting**: ESLint + Prettier required before merging

### Naming Conventions
- **Files**: PascalCase for components (`Hero.tsx`, `Neko.tsx`), camelCase for utilities/hooks (`utils.ts`, `useMousePosition.ts`), camelCase for data files (`projects.ts`)
- **Components**: PascalCase (`SectionHeading`, `ScrollReveal`)
- **Variables/functions**: camelCase
- **Constants**: camelCase for objects/arrays, UPPER_SNAKE_CASE for primitives
- **CSS custom properties**: kebab-case (`--lavender-400`)

### Component Structure
- Client components must have `"use client"` directive at top
- Keep server components as default — only add `"use client"` when needed (event handlers, hooks, browser APIs)
- Colocate section components in `src/components/sections/`
- Reusable UI primitives go in `src/components/ui/`
- Data/content lives in `src/data/` as typed constants
- Shared domain types live in `src/data/types.ts` and are reused by sections

### Imports
- Use `@/` path alias for `src/` directory imports
- Group imports: React/Next → third-party → local components → local utils/data → types

### TypeScript Conventions
- Prefer `type` aliases for unions/compositions and `interface` for extendable object contracts
- Avoid `any`; if unavoidable, document why with a short comment
- Model section data with explicit types (`Project`, `ResearchItem`, `ExperienceItem`, `SkillGroup`, `HonorItem`)

### Tooling
- Enable strict TypeScript checks (`strict: true`, `noUncheckedIndexedAccess: true` recommended)
- Enforce import ordering via ESLint
- Keep formatting deterministic with Prettier (optionally Tailwind class sorting plugin)
- **Testing**: Use Vitest + React Testing Library for unit tests, and Playwright for E2E. Name files `*.test.tsx`.

### Next.js Specifics
- **Images**: Require `next/image` for all project screenshots and profile photos to guarantee automatic WebP/AVIF compression.
- **Fonts**: Enforce importing `Inter` via `next/font/google` at the layout level to prevent layout shifts (CLS).
- This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

### Tailwind
- Use the lavender color scale defined in CSS custom properties
- Define theme tokens entirely inside `globals.css` using the new `@theme` directive (Tailwind v4)
- Mobile-first responsive: write base styles, then `md:` and `lg:` overrides
- Use `cn()` helper from `@/lib/utils` for conditional class merging

### Animation
- Use Motion (Framer Motion v12) for scroll reveals and interactions
- Wrap animated elements in `ScrollReveal` component for consistency
- Cat animation uses raw `requestAnimationFrame` — no Motion dependency
- Respect reduced motion preferences (`prefers-reduced-motion`) for reveal animations and cat movement

### Content
- All portfolio content (projects, skills, experience, etc.) lives in `src/data/` files
- Do NOT hardcode content strings inside components
- Reference PDFs in `reference/` folder are source-of-truth for resume content
- Exception: tiny UI microcopy tied to local component behavior may remain inline when it improves readability

### Accessibility Baseline
- All interactive elements must be keyboard accessible with visible focus states
- Maintain WCAG AA contrast for text and controls
- Use semantic landmarks/headings and preserve logical heading order

## Key Decisions
- Dark mode only (no light mode toggle for v1)
- Single-page layout with anchor navigation
- Contact form via Web3Forms (free tier, 250 submissions/month)
- Interactive cat feature based on oneko.js sprite logic, ported to React
- Lavender/lilac (#9b7aff) as the primary accent color

## Dependencies (minimal)
- `motion` — animations
- `lucide-react` — icons
- `clsx` + `tailwind-merge` — class name utilities
- No heavy UI library, no CMS, no database
- **Dev**: `vitest` + `@testing-library/react` (unit), `playwright` (E2E)
- **Optional**: hCaptcha or Cloudflare Turnstile for contact form spam prevention

## Environment Variables
- `NEXT_PUBLIC_WEB3FORMS_KEY` — Web3Forms API key for contact form
