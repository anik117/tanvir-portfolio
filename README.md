# Tanvir Portfolio

Design source and application code for Tanvir Ahassan's portfolio website.

This repository holds both sides of the work: the verified content and design documentation
that decides *what* gets built, and the Next.js application that builds it.

**Start with [docs/brief.md](docs/brief.md).**

Replaces the current Framer site at <https://tanvirux.framer.website/>.

## Status

| Area | State |
| --- | --- |
| Stack | Next.js 16, React 19, TypeScript, Tailwind v4 |
| App scaffold | Builds, typechecks, and lints clean |
| CMS | Sanity wired up — needs an account and a project ID |
| Hosting | Vercel — not yet deployed |
| Content | Imported from the old Framer site into Sanity |
| Design direction | Working baseline built. Full redesign still to come |
| Case studies | 4 imported with full content and images; 1-2 new still unnamed |
| Three.js | Installed, unused. Scope undecided |

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

## Connecting Sanity

1. Create a free account at [sanity.io](https://www.sanity.io) and make a project. No card needed.
2. `cp .env.local.example .env.local`
3. Paste the project ID into `NEXT_PUBLIC_SANITY_PROJECT_ID`, then restart the dev server.
4. In Sanity, add CORS origins for `http://localhost:3000` and the Vercel domain once deployed.

Then `/studio` mounts the real Studio. Until step 3, it shows setup instructions instead.

## Layout

```
app/            routes — home, work/[slug], studio
components/     shared UI
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

1. Fill in `role` on each project — the old site never stated it, and it is the first
   thing a hiring manager looks for.
2. Add the missing URLs: project links, contact CTA, email, socials.
3. Rewrite the generic gallery alt text in the Studio.
4. Decide the visual direction, then do the full redesign.
5. Scope the Three.js work against the risk table in `docs/build-spec.md`.
6. Name the one or two new projects.
