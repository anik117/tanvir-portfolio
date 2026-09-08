# Tanvir Portfolio

Design source and application code for Tanvir Ahassan's portfolio website.

This repository holds both sides of the work: the verified content and design documentation
that decides *what* gets built, and the Next.js application that builds it.

**Start with [docs/brief.md](docs/brief.md).**

## Status

Documentation scaffold complete. No verified content yet, and the app is not scaffolded.

| Area | State |
| --- | --- |
| Stack | Decided — Next.js + TypeScript, Vercel, Three.js |
| CMS | Sanity free plan — decided |
| Profile and site copy | Drafted from the current live site, needs review |
| Design direction | Blank slate — old Framer visual is not a reference |
| Case studies | 4 carried over (blocked on Figma audit) + 1-2 new, unnamed |
| Application code | Not started |

Replaces the current Framer site at <https://tanvirux.framer.website/>.

Every unresolved field is marked `REQUIRES VERIFICATION`. That marker is a hard stop, not a
placeholder to fill in with a plausible guess.

## Layout

```
docs/           what to build — the source of truth
├── brief.md            goal, audience, principles, evidence rules
├── profile.md          bio, experience, capabilities, contact
├── content.md          page copy for every route
├── design-direction.md visual, interaction, motion, Three.js
├── build-spec.md       stack, IA, components, responsive, a11y, performance
└── projects/           one case study per file

assets/         source design exports, organized by scope
```

Application code lands at the repository root when the app is scaffolded — `app/`, `public/`,
`package.json`, and the rest of the standard Next.js layout.

## Working Rules

1. Do not invent metrics, research, user feedback, or business outcomes.
2. Mark anything unconfirmed as `REQUIRES VERIFICATION` instead of guessing.
3. Archived or exploratory work is never a final implementation reference.
4. Read the relevant project doc in `docs/projects/` before using its material.
5. Project-specific documentation beats general assumption.
6. Ask when something important is missing rather than filling the gap.

## Next Steps

1. Resolve the two conflicts in `docs/profile.md` — job title, and positioning line.
2. Confirm Sanity as the CMS, then scaffold the Next.js app.
3. Scope the Three.js work against the risk table in `docs/build-spec.md`.
4. Run the Figma audit — it unblocks all four case studies at once.
