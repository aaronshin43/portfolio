# Portfolio Implementation Plan

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 15 (App Router) | Aaron has Next.js experience; native Vercel deploy, SSG, SEO |
| Language | TypeScript | Type safety, demonstrates skill on the portfolio itself |
| Styling | Tailwind CSS v4 | Utility-first, rapid development, easy theming |
| Animations | Motion (Framer Motion v12) | Scroll reveals, hover effects, typewriter |
| Icons | Lucide React | Lightweight, tree-shakeable |
| Cat Feature | Custom React component (oneko.js-inspired) | Sprite-based mouse-following cat |
| Contact Form | Web3Forms (free tier) | No backend needed, sends to email |
| Deployment | Vercel (free) | Native Next.js host |
| Font | Inter via next/font/google | Clean, professional |

## Color Palette — Lavender/Dark Theme

```
Background:      #0a0a0f   (near-black, blue undertone)
Background Alt:  #12121a   (cards, alternate sections)
Card:            #14141f
Border:          #1e1e2e
Foreground:      #e8e8ed   (primary text)
Muted:           #8888a0   (secondary text)

Lavender Scale:
  50:  #f5f0ff    100: #ede5ff    200: #d4c4ff
  300: #b89dff    400: #9b7aff (PRIMARY ACCENT)
  500: #7c5ae0    600: #6344b8
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout: fonts, metadata, Neko cat
│   ├── page.tsx              # Single page composing all sections
│   ├── globals.css           # Tailwind + CSS custom properties
│   └── not-found.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Fixed nav + mobile hamburger
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx          # Landing with typewriter tagline
│   │   ├── About.tsx         # Bio + resume download
│   │   ├── Research.tsx      # PROMINENT — research cards + tags
│   │   ├── Projects.tsx      # 2x2 project card grid
│   │   ├── Experience.tsx    # Timeline layout
│   │   ├── Skills.tsx        # Categorized tech chips
│   │   ├── Honors.tsx        # Awards split view
│   │   └── Contact.tsx       # Web3Forms + social links
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── ScrollReveal.tsx
│   │   └── SocialIcons.tsx   # Shared GitHub/LinkedIn SVG icons
│   └── cat/
│       └── Neko.tsx          # Interactive cat (use client)
├── data/
│   ├── types.ts              # Shared content types (Project, ResearchItem, etc.)
│   ├── projects.ts
│   ├── experience.ts
│   ├── research.ts
│   ├── skills.ts
│   ├── honors.ts
│   └── social.ts
├── lib/
│   └── utils.ts              # cn() helper
└── hooks/
    ├── useMousePosition.ts
    ├── useActiveSection.ts
    └── useMediaQuery.ts
```

## Section Breakdown

### 1. Navbar
- Fixed top, backdrop-blur, semi-transparent background
- Section anchor links: About, Research, Projects, Experience, Skills, Honors, Contact
- Active section highlighting via Intersection Observer
- Mobile: hamburger → slide-in menu

### 2. Hero (full viewport)
- "Hi, I'm" → **Aaron Shin** (large, lavender gradient)
- Typewriter tagline cycling through role descriptions
- 1-2 sentence intro
- CTA buttons: "View Research" (primary) + "See Projects" (outline)
- Social icons: GitHub, LinkedIn, Email
- Subtle gradient mesh background

### 3. About
- Two columns: personal paragraph (left) + photo placeholder (right)
- Who Aaron is, CS + Math intersection, ML passion, hackathon creativity
- "Download Resume" button
- ScrollReveal fade-in

### 4. Research (HIGHLIGHTED — distinct visual treatment)
- `bg-background-alt` section background with lavender gradient border
- Research position: "Undergraduate Researcher, Dickinson College, Jan 2026–Present"
- Three detail cards with icons and lavender left-border accent:
  1. NanoGPT/PyTorch experimental framework
  2. Target masking on autoregressive generation
  3. Chain-of-Thought scratchpad & curriculum learning
- Keyword tags: NanoGPT, PyTorch, Transformers, CoT, Curriculum Learning
- CTA: "Interested in research collaboration?" → Contact

### 5. Projects (2x2 grid)
Each card:
- Screenshot thumbnail (next/image, placeholder div if no image)
- Project name + award badge (lavender)
- 2-line description
- Tech stack tags
- GitHub link + Live Demo button (where applicable)

Projects:
1. **Forge the World** — Next.js, FastAPI, Vultr | DevFest 2026 | GitHub + Demo
2. **Procrasti-Hator** — PyQt6, LiveKit, MediaPipe | NexHacks 2026 | GitHub only
3. **The Last Vigil** — FastAPI, MediaPipe, OpenCV | Technica 2025 | GitHub + Demo
4. **CharAIdes** — React, FastAPI | PennApps XXVI | GitHub + Demo

### 6. Experience (vertical timeline)
- IT Specialist, ROK Army (Jul 2023–Jan 2025)
- Leadership: VP, Korean Student Association
- Training: Java Spring Immersive, Military ICT Program
- Timeline with lavender accent dots/line

### 7. Skills (categorized grid)
- Languages, Libraries, Frameworks, Dev Tools, Platforms
- Each skill as a chip/card with icon + name
- Hover glow in lavender

### 8. Honors & Awards
- Academic: Landis Prize, Dean's List, 1783 Scholarship
- Hackathons: 4 awards with trophy icons, linked to project anchors
- Two-column layout (academic | hackathon)

### 9. Contact (two columns)
- Left: Form (Name, Email, Message) → Web3Forms
- Right: "Let's connect" + email/GitHub/LinkedIn links
- Success/error toast, client-side validation

### 10. Footer
- "Built by Aaron Shin" | Social icons | Year

## Interactive Cat Feature

React client component wrapping oneko.js sprite logic:
- Single `<div>` with `position: fixed`, sprite sheet as background
- `requestAnimationFrame` loop, sprite updates throttled to ~15fps (page stays at native refresh rate)
- State machine: IDLE → ALERT → RUNNING → IDLE → SCRATCHING → SLEEPING
- 8-directional running sprites, 2 frames each
- Mobile: follows last tap position, wanders when idle
- Mounted in `layout.tsx`, `pointer-events: none`, `z-index: 9999`
- Sprite sheet: `public/images/cat/oneko.gif` (~5KB)

Performance and accessibility constraints:
- Pause animation when tab is hidden (`document.visibilityState !== "visible"`)
- Respect `prefers-reduced-motion` by reducing/pausing non-essential movement
- Keep interaction smooth on low-end devices (target 55-60 FPS on desktop, 45+ FPS on mobile)

## Cross-Cutting Requirements

### Testing Strategy
- Unit tests: `src/lib/utils.ts`, core hooks (`useActiveSection`, `useMediaQuery`, `useMousePosition`)
- Component smoke tests: Navbar, Hero, Research, Contact
- E2E smoke tests: anchor navigation, mobile menu open/close, contact form validation and submit flow
- Add at least one regression test for every fixed bug in navigation, animation, or form behavior

### Accessibility Requirements
- Keyboard accessibility for navigation, mobile menu, and form controls
- Visible focus states on all interactive elements
- Respect reduced motion for reveal effects and cat animation
- Semantic sectioning (`header`, `main`, `section`, `footer`) and heading order with no level skips
- Color contrast target: WCAG AA minimum for text and interactive controls

### Performance Budgets
- Lighthouse Performance target: 90+
- Largest Contentful Paint target: <= 2.5s (desktop), <= 3.0s (mobile)
- Initial JS budget target: <= 220KB gzipped on first load route
- Image assets: WebP/AVIF preferred, per-image budget <= 300KB unless justified

### Data and Content Contracts
- Define shared content types for all `src/data/` modules (projects, research, experience, skills, honors, social)
- Required/optional field rules documented next to each type
- Research and Projects sections must render gracefully when optional fields are missing

### Contact Form Reliability and Abuse Prevention
- Include honeypot field and server-agnostic bot mitigation pattern
- Add client-side cooldown/throttle on repeated submit attempts
- Provide robust success/error states and retry guidance

### Asset Standards
- Naming convention: kebab-case for assets (`project-forge-the-world.webp`)
- Keep project screenshots consistent ratio (16:10 preferred)
- Define OG image size (`1200x630`) and favicon set before deploy phase

## Phase Quality Gates (Definition of Done)

- Gate A (foundation complete): `npm run lint` and `npm run typecheck` pass
- Gate B (layout complete): responsive checks pass at 375px, 768px, 1024px, 1440px
- Gate C (content complete): all sections render from data files without hardcoded portfolio copy
- Gate D (interaction complete): keyboard navigation, reduced-motion behavior, and anchor scroll verified
- Gate E (release-ready): Lighthouse targets met, metadata/schema validated, production deploy smoke-tested

## Implementation Phases

### Phase 1: Foundation
- [x] Create CLAUDE.md and PLAN.md
- [x] Initialize Next.js 15 project with TypeScript + Tailwind
- [x] Configure color palette and `@theme` tokens in globals.css (Tailwind v4)
- [x] Set up fonts (Inter) in layout.tsx via `next/font/google`
- [x] Create `cn()` utility
- [x] Add ESLint + Prettier scripts and baseline config
- [x] Set up Vitest + React Testing Library for component testing
- [x] Set up Playwright for E2E testing
- [x] Add `npm run typecheck` script
- [x] Pass Gate A

### Phase 2: Layout Shell
- [x] Build Navbar (fixed, blur, mobile menu)
- [x] Build Footer
- [x] Build SectionHeading + ScrollReveal components
- [x] Scaffold all sections in page.tsx
- [x] Add keyboard navigation support for mobile menu, including a Focus Trap
- [x] Add visible focus styles for all nav controls
- [x] Pass Gate B

### Phase 3: Data Layer
- [x] Create all data files (projects, experience, research, skills, honors, social)
- [x] Create shared content types and validate required fields
- [x] Ensure section components consume typed data only
- [x] Pass Gate C

### Phase 4: Core Sections
- [x] Hero with typewriter + gradient background
- [x] About with two-column layout
- [x] Research (prominent styling)
- [x] Projects grid with cards
- [x] Experience timeline
- [x] Skills categorized chips
- [x] Honors split view
- [x] Contact form + links
- [x] Add contact form validation, success/error states, anti-spam honeypot (and optionally hCaptcha/Turnstile)
- [x] Add component smoke tests for critical sections

### Phase 5: Interactive Cat
- [ ] Download oneko.gif sprite sheet
- [ ] Build useMousePosition hook
- [ ] Build Neko.tsx component with state machine
- [ ] Mount in layout, test mobile + idle transitions
- [ ] Add reduced-motion fallback and tab-hidden pause behavior
- [ ] Add a manual UI toggle to disable the cat entirely
- [ ] Verify no jank during scroll and section transitions

### Phase 6: Polish
- [ ] ScrollReveal on all sections
- [ ] Hover effects (cards, chips, awards)
- [ ] Active section nav highlighting
- [ ] Smooth scroll behavior
- [ ] Refine hero gradient
- [ ] Perform keyboard-only pass for full single-page flow
- [ ] Run E2E smoke tests for nav and contact flows
- [ ] Pass Gate D

### Phase 7: Assets & Content
- [ ] Project screenshots
- [ ] Favicon + OG image
- [ ] Resume PDF in public/
- [ ] Final copy review
- [ ] Convert and compress images to WebP/AVIF where possible
- [ ] Enforce screenshot ratio and file naming conventions

### Phase 8: Deploy
- [ ] SEO metadata + JSON-LD Person schema
- [ ] Lighthouse audit (target 90+)
- [ ] Image optimization via next/image
- [ ] Deploy to Vercel
- [ ] Test on mobile + desktop
- [ ] Run final lint/typecheck/test pipeline in production mode
- [ ] Validate structured data and Open Graph preview
- [ ] Pass Gate E
