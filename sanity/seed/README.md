# Seed content

Initial documents for a fresh dataset. Import with:

```bash
npx sanity login                                              # once
npx sanity documents create sanity/seed/initial-content.ndjson --replace
```

`--replace` overwrites documents with the same `_id`, so re-running is safe and idempotent.

## What is in here

| Document | Notes |
| --- | --- |
| `siteSettings` | Hero line and title as decided on 2026-09-08. `ctaUrl`, `email`, and `socials` are left empty — the URLs are still REQUIRES VERIFICATION in `docs/profile.md`. |
| 4 projects | Title, slug, type, and the old site's teaser summary. |

**Deliberately empty:** `role`, `timeline`, `team`, `outcomes`, `body`, and `coverImage`. All of
those are blocked on the Figma audit, and the schema requires evidence on any outcome. Seeding
guesses would defeat the point.

**Project order** follows the old site — ZO, Ibadat, Alokito, TaxRise. `docs/brief.md` lists a
different order. Change the `order` field in the Studio; the first project carries the most weight.
