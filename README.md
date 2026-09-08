# Tanvir Portfolio

Design source and application code for Tanvir Ahassan's portfolio website.

This repository holds both sides of the work: the verified content and design documentation
that decides *what* gets built, and the Next.js application that builds it.

**Start with [docs/brief.md](docs/brief.md).**

**Live:** <https://tanvir-portfolio-two.vercel.app> · **Studio:** <https://tanvir-portfolio-two.vercel.app/studio>

Replaces the Framer site at <https://tanvirux.framer.website/>, which is still up.

## Status

| Area | State |
| --- | --- |
| Stack | Next.js 16, React 19, TypeScript, Tailwind v4 |
| App scaffold | Builds, typechecks, and lints clean |
| CMS | Sanity wired up — needs an account and a project ID |
| Hosting | Vercel, auto-deploying from `main` |
| Content | Imported from the old Framer site into Sanity |
| Design direction | Redesigned 2026-09-08: white ground with a dot grid, dark bands, scroll-driven sections, annotation callouts as the signature. See `docs/design-direction.md` |
| Case studies | 4 imported with full content and images; 1-2 new still unnamed |
| Three.js | Not used. Tried and removed the same day |

Unresolved fields across `docs/` are marked `REQUIRES VERIFICATION`. That marker is a hard
stop, not a placeholder to fill with a plausible guess.

## Getting Started

```bash
npm install
npm run dev
```

Runs at <http://localhost:3000>. It works without Sanity — the homepage falls back to
placeholder projects and shows a setup banner.

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

**Node:** `.nvmrc` pins 22 (LTS), which matches Vercel. Node 25 works but is a non-LTS release
and some dependencies warn about it.

## Sanity

Project `wr5d5bj5`, dataset `production`. For local work:

```bash
cp .env.local.example .env.local   # then paste the project ID
```

Without it the site still runs — it falls back to placeholder projects and `/studio` shows
setup instructions rather than crashing.

A new origin needs to be in Sanity's CORS list before the Studio works there. Visiting the
Studio while signed in registers it automatically; if it does not, add it by hand at
<https://www.sanity.io/manage/project/wr5d5bj5/api> with credentials allowed.

To re-import or repair content:

```bash
npx sanity login
npx sanity exec scripts/import-content.ts --with-user-token
```

## Layout

```
app/            routes — home, work, work/[slug], about, contact, studio
components/     shared UI
  home/         HeroCards, WorkStack, AboutReveal, TestimonialCarousel
  motion/       Providers, GrowLine, useMediaQuery
lib/            small pure helpers
sanity/         client, schemas, queries, studio structure
public/         web-serving assets

docs/           what to build — the source of truth
├── brief.md            goal, audience, principles, evidence rules
├── profile.md          bio, experience, capabilities, contact
├── content.md          page copy for every route
├── design-direction.md visual, interaction, motion, Three.js
├── build-spec.md       stack, IA, components, responsive, a11y, performance
└── projects/           one case study per file, plus _template.md

assets/         source design exports, not web-serving
```

`docs/` is internal design reasoning and stays in git. Sanity holds published website content.
Two different jobs — the CMS does not replace `docs/`.

## Working Rules

1. Do not invent metrics, research, user feedback, or business outcomes.
2. Mark anything unconfirmed as `REQUIRES VERIFICATION` instead of guessing.
3. Archived or exploratory work is never a final implementation reference.
4. Read the relevant project doc in `docs/projects/` before using its material.
5. Ask when something important is missing rather than filling the gap.

## Next Steps

1. Upgrade `role` if he was sole or lead designer — it currently says "UI/UX Designer",
   which claims nothing about team structure. See `sanity/seed/README.md`.
2. Add measured outcomes once there are numbers with sources behind them.
3. Point the old Framer site at this one, or take it down. Its header "Book a Call" button
   still links to someone else's calendar.
4. Add a custom domain.
5. Name the one or two new projects.
