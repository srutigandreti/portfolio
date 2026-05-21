# Portfolio

Product design portfolio. **Phase 1** scaffold — foundation only. No styling decisions, no content, no CMS.

Built on Next.js 16 (App Router) + React 19 + TypeScript strict.

## Setup

```bash
npm install
npm run dev
```

Dev server runs at http://localhost:3000.

## Scripts

| Script                 | Purpose                     |
| ---------------------- | --------------------------- |
| `npm run dev`          | Start dev server            |
| `npm run build`        | Production build            |
| `npm start`            | Run production build        |
| `npm run lint`         | ESLint                      |
| `npm run type-check`   | TypeScript (`tsc --noEmit`) |
| `npm run format`       | Prettier write              |
| `npm run format:check` | Prettier check              |

A Husky `pre-commit` hook runs `lint-staged` (Prettier + ESLint on staged files) and `type-check`.

## Folder structure

```
app/                     App Router routes (root)
  layout.tsx             Root layout + metadata
  page.tsx               / — home
  error.tsx              Root error boundary
  not-found.tsx          404 page
  work/page.tsx          /work — case studies index
  work/[slug]/page.tsx   /work/:slug — case study
  about/page.tsx         /about
  contact/page.tsx       /contact
components/              Reusable components (empty shells)
  Header.tsx
  Footer.tsx
  CaseStudyCard.tsx
  CaseStudyContent.tsx
  ContactForm.tsx
lib/                     Utilities, types, constants
  types/index.ts         CaseStudy, ProjectMetadata, MediaItem
  env.ts                 Environment variable access + validation
  constants.ts           ROUTES map
public/                  Static assets (empty)
styles/                  Global styles only
  globals.css            Minimal reset — no design tokens
```

Path alias: `@/*` → project root.

## TypeScript types

Exported from `@/lib/types`:

- **`CaseStudy`** — `{ title, slug, description, role, timeline, tools[], metadata, cover? }`
- **`ProjectMetadata`** — `{ tags[], categories[], date }`
- **`MediaItem`** — `{ src, alt, type: "image" | "video", width?, height?, caption? }`

Add new types to `lib/types/` and re-export from `lib/types/index.ts`.

## Environment

Copy `.env.example` to `.env.local` and fill in as phases land. Read values through `lib/env.ts` — never `process.env` directly in app code.

## Roadmap

- **Phase 2** — CMS integration, media optimization, content architecture, contact API
- **Phase 3** — Security headers, SEO + sitemap + OG images, analytics, deployment configs
