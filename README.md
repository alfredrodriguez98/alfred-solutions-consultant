# Alfred Rodriguez — Portfolio

Personal portfolio site for Alfred Rodriguez, Senior Solutions Engineer at BitGo. Built to showcase technical depth, pre-sales methodology, and institutional digital asset expertise.

**Live site:** [alfredrodriguez.dev](https://alfredrodriguez.dev) *(deploy to update)*

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Theming | next-themes (dark / light) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, theme provider
│   ├── page.tsx            # Page composition (section order)
│   └── globals.css         # Design tokens, CSS variables, keyframes
│
├── components/
│   ├── sections/           # Page sections (Hero, About, Expertise, …)
│   ├── layout/             # Nav, Footer
│   ├── ui/                 # Reusable primitives (Button, Badge, ScrollReveal, …)
│   └── easter-eggs/        # Hidden interactions (Konami code, key sequences, …)
│
├── hooks/
│   ├── useParticleCanvas.ts  # 3-D rotating sphere + floating particle field
│   ├── useBlockTicker.ts     # Live ETH block number in footer
│   ├── useKeySequence.ts     # Keyboard sequence detector
│   └── useKonamiCode.ts      # Konami code detector
│
├── lib/
│   ├── data/               # All copy/content (experience, skills, case studies, …)
│   └── utils/              # cn(), crypto helpers
│
└── types/
    └── index.ts            # Shared TypeScript interfaces
```

---

## Sections

| Section | ID | Description |
|---|---|---|
| Hero | `#hero` | Animated particle sphere, name, tagline, CTAs |
| Stats | `#stats` | Animated count-up metrics (years, clients, roles) |
| About | `#about` | Narrative + three differentiator pillars |
| Expertise | `#expertise` | Six expertise cards (custody, integrations, pre-sales, …) |
| Case Studies | `#problems` | Four real-world engagement outcomes |
| Playbook | `#playbook` | Five-step pre-sales methodology |
| Experience | `#experience` | Career timeline (BitGo → Blockchain Dev → Infosys) |
| Skills | `#skills` | Tech/skill pill cloud + scrolling marquee |
| Contact | `#contact` | Email CTA, LinkedIn, GitHub links |

---

## Easter Eggs

Type any of these key sequences anywhere on the page:

| Sequence | Effect |
|---|---|
| `gm` | GM toast notification |
| `ngmi` | NGMI toast |
| `safu` | SAFU toast |
| `lfg` | LFG toast |
| `hodl` or `wagmi` | WAGMI gradient banner |
| Konami Code (↑↑↓↓←→←→BA) | 🌕 Moon overlay |
| Click the sphere 5× | Block Mined toast |
| Hover the hero quote 2.5 s | Genesis block quote |

---

## Design System

Theming is driven by CSS variables defined in `globals.css` and toggled via the `dark` class on `<html>`.

```css
/* Light */
--bg: #ffffff;
--bg-raised: #f5f5f7;
--foreground: #1d1d1f;
--muted: #6e6e73;

/* Dark */
--bg: #080812;
--bg-raised: #0f0f1a;
--foreground: #f5f5f7;
--muted: #86868b;
```

Accent colours (`--accent`, `--accent-violet`, `--accent-purple`) are hardcoded so Tailwind opacity modifiers (e.g. `border-accent/30`) work correctly.

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
npm run type-check # TypeScript validation
```

---

## Deployment

The site is designed for zero-config deployment on Vercel. Connect the repository and it deploys automatically on every push to `main`.

---

## Content Updates

All copy lives in `src/lib/data/` — no component changes needed for most updates:

- **Experience:** [`src/lib/data/experience.ts`](src/lib/data/experience.ts)
- **Case Studies:** [`src/lib/data/caseStudies.ts`](src/lib/data/caseStudies.ts)
- **Expertise cards:** [`src/lib/data/expertise.ts`](src/lib/data/expertise.ts)
- **Skills:** [`src/lib/data/skills.ts`](src/lib/data/skills.ts)
- **Stats:** [`src/lib/data/stats.ts`](src/lib/data/stats.ts)
- **Playbook steps:** [`src/lib/data/playbook.ts`](src/lib/data/playbook.ts)

---

*Built with Next.js · Deployed on Vercel*
