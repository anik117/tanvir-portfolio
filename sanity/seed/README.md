# Seed content

Imports project content and images into Sanity.

```bash
npx sanity login          # first time only
npm run publish:projects  # leaves site settings unchanged
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
| `outcomes` (measured) | No sourced numbers are available. The public case study omits the impact section until evidence is added. |

## Role — read this

The current seed says **"Sole UI/UX Designer"** on all four projects. Keep that wording only
if it is verified. Otherwise use a title that does not claim team structure.

## Public case-study narrative

The public page is intentionally narrower than the CMS schema:

- no demographic personas unless they come from documented research;
- no expected-outcome checklist presented as impact;
- three concrete design decisions instead of a screen inventory;
- user flows and process notes are available on demand, not in the main reading path.

## Notes

**Alt text was written from the images, not carried over.** The old site had none on any of
the 20 screenshots. Every image now has a real description and the gallery has captions.

**Assets are keyed by filename.** `resolveAsset` looks up `sanity.imageAsset` by
`originalFilename` before uploading, so re-running relinks existing assets rather than
duplicating them — and repairs a document that lost its image references.

**The availability chip is a claim.** `availabilityShow` is on with the label "Available for
new work". Turn it off in the Studio the moment it stops being true.

**Measured impact needs evidence.** Add a result only when its source can be included with it.
