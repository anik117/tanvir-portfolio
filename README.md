# Tanvir Portfolio

Design source and application code for Tanvir Ahassan's portfolio website.

This repository holds both sides of the work: the verified content and design documentation
that decides *what* gets built, and the Next.js application that builds it.

**Start with [docs/brief.md](docs/brief.md).**

## Status

Documentation scaffold complete. No verified content yet, and the app is not scaffolded.

| Area | State |
| --- | --- |
| Brief and positioning | Verified |
| Stack | Decided — Next.js + TypeScript |
| Profile, content, design direction | Awaiting verified input |
| Four case studies | Blocked on Figma audit |
| Application code | Not started |

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

1. Run the Figma audit — it unblocks all four case studies at once.
2. Fill `docs/profile.md`, which needs no Figma access.
3. Decide the sitemap and routes in `docs/build-spec.md`.
4. Scaffold the Next.js app.
