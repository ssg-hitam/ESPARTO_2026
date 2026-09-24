# ESPARTO 2026 — Official Website
**HITAM Annual Technical Fest | October 09–10, 2026 | Hyderabad, India**

---

## 1. Project Overview
This repository contains the source code for the official website of **ESPARTO 2026**, the flagship technical fest of the **Hyderabad Institute of Technology and Management (HITAM)**.

Built with Next.js (App Router), TypeScript, and Tailwind CSS, the platform is engineered for high performance, accessibility, responsive mobile usability, and a futuristic dark cyber-aesthetic.

---

## 2. Development Commands

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### Scripts
```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Run strict TypeScript compiler checks
npm run typecheck

# Run ESLint validation
npm run lint

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 3. Architecture Overview
```
Esparto_2026/
├── public/
│   ├── images/
│   │   ├── brand/       # Official ESPARTO and HITAM logos
│   │   ├── events/      # Event cover images (WebP/AVIF)
│   │   ├── guests/      # Guest speaker headshots
│   │   ├── campus/      # HITAM campus photography
│   │   ├── team/        # Organizing committee photos
│   │   └── gallery/     # Fest photo gallery
│   └── icons/           # Custom vector icons
└── src/
    ├── app/             # Next.js App Router (Layouts, Pages, Routes)
    ├── components/
    │   ├── ui/          # Reusable UI Primitives (Button, Card, Badge, Container)
    │   ├── shared/      # SectionContainer, SectionHeading, etc.
    │   ├── layout/      # Navbar, Footer, MobileMenu (Phase 2)
    │   ├── home/        # Homepage section components (Phase 3)
    │   └── events/      # Event cards, filters, and detail drawers (Phase 4)
    ├── data/            # Strictly typed data stores (events, schedule, guests)
    ├── types/           # Master TypeScript domain contracts
    ├── lib/             # Constants, utilities (cn, date helpers)
    └── styles/          # Global styles, typography, glow utilities
```

---

## 4. Design System & Tokens
The visual design is grounded in the official ESPARTO identity:
- **Canvas Base**: `#050212` (`--color-background`)
- **Surface Base**: `#0A061D` (`--color-surface`)
- **Surface Elevated**: `#120D2C` (`--color-surface-elevated`)
- **Brand Accents**:
  - Purple: `#7928CA`
  - Violet: `#9B51E0`
  - Magenta: `#FF007A`
  - Orange: `#FF5E00`
  - Amber: `#FFA500`
- **Text (WCAG AA Compliant)**:
  - Primary: `#F8FAFC`
  - Secondary: `#CBD5E1`
  - Muted: `#94A3B8`
- **Typography Scale**:
  - **Display**: Outfit
  - **Body**: Plus Jakarta Sans
  - **Monospace**: JetBrains Mono

---

## 5. Critical Content Policy

> [!IMPORTANT]
> **DO NOT ADD UNVERIFIED ESPARTO CONTENT.**
>
> All fest data, event rules, timings, registration links, guest speakers, prize pools, and committee names must be officially verified by HITAM / ESPARTO organizers before being added.
>
> If information is not yet available, it must remain empty or marked with `CONTENT_REQUIRED`. Do not use placeholder lorem ipsum or fabricated names in production data stores.

---

## 6. How Organizers Will Add Event Data
To add or update events, edit `src/data/events.ts`. Each event adheres to the strict `Event` TypeScript interface defined in `src/types/index.ts`:

```typescript
import { Event } from "@/types";

export const eventsData: Event[] = [
  {
    id: "hackathon-2026",
    slug: "hackathon-2026",
    title: "Official Event Name",
    category: "hackathon",
    shortDescription: "One-line summary for event card",
    fullDescription: "Complete event details and problem statements",
    date: "2026-10-09",
    venue: "Lab / Auditorium Name",
    registrationUrl: "https://unstop.com/...",
    eligibility: "Open to all UG/PG students",
    teamSize: { min: 2, max: 4, type: "team" },
    rules: [
      "Rule 1 description",
      "Rule 2 description"
    ],
    coordinators: [
      { name: "Student Name", role: "Lead Coordinator", phone: "+91-XXXXXXXXXX" }
    ],
    status: "registration-open",
    isFeatured: true
  }
];
```

---

## 7. Asset Placement Instructions
- **Official ESPARTO Logo**: Save transparent vector or high-res PNG into `public/images/brand/esparto-logo.svg` (or `.png`).
- **Official HITAM Logo**: Save into `public/images/brand/hitam-logo.svg` (or `.png`).
- **Event Posters / Artwork**: Save into `public/images/events/[event-slug].webp`.
