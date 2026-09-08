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
| `outcomes` (measured) | No real numbers exist. The schema requires evidence on every metric, so these stay empty until there are sources. |

## Role — read this

Set to **"UI/UX Designer"** on all four projects. That is Tanvir's own stated title applied to
work the case studies show he did end to end: discovery, personas, flows, wireframes, design
system, final UI. Each one says "I collaborated…", and no other designer is ever mentioned.

It deliberately makes **no claim about team structure**, because the source never states one.
If he was the sole designer, or led other designers, that is materially stronger and should be
said explicitly in the Studio — "Sole designer" and "Lead designer" are the two upgrades worth
making, and both are the kind of thing an interviewer will ask about directly.

## Notes

**Alt text was written from the images, not carried over.** The old site had none on any of
the 20 screenshots. Every image now has a real description and the gallery has captions.

**Assets are keyed by filename.** `resolveAsset` looks up `sanity.imageAsset` by
`originalFilename` before uploading, so re-running relinks existing assets rather than
duplicating them — and repairs a document that lost its image references.

**The availability chip is a claim.** `availabilityShow` is on with the label "Available for
new work". Turn it off in the Studio the moment it stops being true.

**Expected outcomes are not results.** The old site said "the expected outcomes included" —
that framing is honest and the site preserves it, rendering them under a heading that says
so. Do not promote them to measured results without evidence.
