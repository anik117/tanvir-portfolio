# Seed content

Imports project content and images into Sanity.

```bash
npx sanity login                                              # once
npx sanity exec scripts/import-content.ts --with-user-token
```

Idempotent. Documents use fixed `_id`s and are replaced on re-run; images are only
uploaded when the document has no cover yet, so re-running does not duplicate assets.

## Where this came from

`projects.json` was extracted from the live Framer site at
<https://tanvirux.framer.website/> on 2026-09-08 — the four `/work/*` pages carried full
case studies, not just the teasers on the homepage. Images came from the same pages and
live in `assets/projects/<slug>/`.

## Deliberately empty

| Field | Why |
| --- | --- |
| `role` | Not stated anywhere on the old site. You need to fill this in — it is the first thing a hiring manager looks for. |
| `outcomes` (measured) | No real numbers exist. The schema requires evidence on every metric. |
| `externalUrl` | The old site had "Visit Website" / "View Prototype" buttons but the targets were not captured. |
| `ctaUrl`, `email`, `socials` | URLs behind the old site's buttons and social icons. |

## Needs review

**Gallery alt text is generic** — "final design screens, N of 4". The old site had no alt
text at all, so there was nothing to carry over, and describing screens not seen would be
inventing detail. Cover images have real descriptions. Rewrite the gallery alt in the Studio.

**Expected outcomes are not results.** The old site said "the expected outcomes included" —
that framing is honest and the site preserves it, rendering them under a heading that says
so. Do not promote them to measured results without evidence.
