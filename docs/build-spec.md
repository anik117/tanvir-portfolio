# Build Specification

How the portfolio gets implemented and validated. Approved requirements here are a source of
truth for development.

## Stack

| Layer | Choice | Status |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) | Decided |
| Language | TypeScript | Decided |
| Runtime | Node 22 LTS (`.nvmrc`), matching Vercel | Decided |
| Package manager | npm | Decided |
| Hosting | Vercel | Decided |
| 3D | None. A WebGL hero was built and removed the same day — see design-direction.md | Decided 2026-09-08 |
| CMS | Sanity (free plan) | Decided |
| Styling | Tailwind v4 | Decided |
| Animation | `motion` (Motion for React) for scroll-linked and entry animation; `position: sticky` for the stacking and pinning | Decided 2026-09-08 |
| Analytics | — | REQUIRES VERIFICATION |
| Domain | — | REQUIRES VERIFICATION |

**Browser and device support:** REQUIRES VERIFICATION

### CMS Rationale

Decided: **Sanity free plan.**

A design portfolio is asset-heavy, and image delivery — not content modelling — is the thing
that will actually hurt. That is the deciding factor.

| Option | Free tier | Why / why not |
| --- | --- | --- |
| **Sanity** | 20 GB asset storage, 10 GB bandwidth/mo, 500k CDN requests/mo, 10k documents, 20 seats, does not expire | **Decided.** $0 forever, no card. Image CDN with on-the-fly resize, format conversion, and hotspot cropping. Studio embeds at `/studio` in the same Next.js app and ships to Vercel with the site. Free-tier datasets are public — fine, since portfolio content is public anyway. |
| Keystatic | Free, open source | Git-based, so images land in the repo. For high-res case-study screens that means repo bloat and Git LFS. Rejected on the image constraint. |
| Payload | Free, open source, MIT | Excellent, but needs a database and more ops. Overkill for four case studies maintained by one person. |
| MDX in-repo | Free | Zero vendor risk, but no visual editing and the same image-in-git problem as Keystatic. |

**Watch item:** Sanity's 10 GB/month bandwidth is the ceiling to keep an eye on, not the
document count. Serve AVIF/WebP through the image pipeline and it is not close.

**Important:** the CMS holds *published website content*. It does not replace `docs/`, which is
internal design reasoning and stays in git. Two different jobs.


## Information Architecture

**Sitemap:** REQUIRES VERIFICATION

The brief implies a home page, a work index, four case-study pages, an about page, and a
contact surface — but neither the route shape nor whether contact is a page or a section is
decided.

| Route | Page | Content source |
| --- | --- | --- |
| REQUIRES VERIFICATION | — | — |

**Navigation model:** REQUIRES VERIFICATION

## Component Architecture

Do not invent a component API before final designs are verified.

| Area | Decision | Status |
| --- | --- | --- |
| Architecture principles | — | REQUIRES VERIFICATION |
| Component map | — | REQUIRES VERIFICATION |
| Data and content boundaries | — | REQUIRES VERIFICATION |
| Reuse rules | — | REQUIRES VERIFICATION |

## Responsive

Do not infer responsive behavior from a single viewport. Every layout needs desktop, tablet,
and mobile intent before it is built.

| Area | Decision | Status |
| --- | --- | --- |
| Breakpoint strategy | — | REQUIRES VERIFICATION |
| Layout changes per breakpoint | — | REQUIRES VERIFICATION |
| Content priority when space is tight | — | REQUIRES VERIFICATION |
| Media behavior | — | REQUIRES VERIFICATION |

## Accessibility

Do not claim compliance before it has been tested.

| Area | Target | Status |
| --- | --- | --- |
| Conformance target | — | REQUIRES VERIFICATION |
| Keyboard and focus behavior | — | REQUIRES VERIFICATION |
| Contrast | — | REQUIRES VERIFICATION |
| Motion and reduced motion | — | REQUIRES VERIFICATION |
| Content and media (alt text, captions) | — | REQUIRES VERIFICATION |
| Validation plan | — | REQUIRES VERIFICATION |

## Performance

Do not claim performance results before measurement.

| Area | Budget | Status |
| --- | --- | --- |
| Core Web Vitals targets | — | REQUIRES VERIFICATION |
| Asset budgets | — | REQUIRES VERIFICATION |
| Loading and rendering strategy | — | REQUIRES VERIFICATION |

| Validation plan | — | REQUIRES VERIFICATION |

## Reference

Current site: <https://tanvirux.framer.website/> — Framer, being replaced by this build.
Its copy and structure are captured in [content.md](content.md) and [profile.md](profile.md).

## Build Notes

Non-obvious things the scaffold depends on. Do not remove them without checking.

| Setting | In | Why |
| --- | --- | --- |
| `serverExternalPackages: ["sanity", "@sanity/vision"]` | `next.config.ts` | Sanity Studio imports `useSWR` as a default export, but swr's `react-server` build only has named exports. Turbopack resolves that condition in the RSC graph and the build fails. Keeping Sanity out of the server graph avoids it. |
| `turbopack.root` | `next.config.ts` | Turbopack otherwise walks up and finds a stray `package-lock.json` in the home directory, outside this repo. |
| `styled-components` | dependency | `NextStudio` uses it internally. Missing it gives a runtime "styled is not defined". |
| Studio loaded via `next/dynamic` with `ssr: false` | `app/studio/[[...tool]]/page.tsx` | Server-rendering the Studio fails on React internals (`useMemoCache`) and only recovers by falling back to client rendering. Skipping SSR avoids it. |
| Studio page is a client component | `app/studio/[[...tool]]/page.tsx` | `sanity.config.ts` builds objects with methods, which cannot be passed from a server component as props. Route config and metadata live in the sibling layout. |
| `wordmark()` lives in `lib/`, not in a client component | `lib/wordmark.ts` | A helper exported from a `"use client"` module cannot be called from a server component — Next throws at render. |
| `fill` mode on `SanityImage` | `components/SanityImage.tsx` | The hero and pile photos are square frames; the default `height: auto` would letterbox them. |
| Static header | `components/SiteHeader.tsx` | A sticky white bar would sit over the dark work band. The reference is static too. |
| Callouts anchor away from the nearest edge | `components/AnnotatedImage.tsx` | A note pinned at 80% would otherwise be squeezed against the frame and wrap into a column. |
| `.canvas-grid` and the body grid are `background-image` gradients | `globals.css` | No asset, no extra element, and they scale with the box. |
| Callouts set `text-foreground` explicitly | `components/AnnotatedImage.tsx` | Inside `.band` they would inherit near-white and vanish on their white pill. |
| `autoPort: true` | `.claude/launch.json` | Lets the preview fall back to another port when 3000 is taken by another session. |
| Null-safe Sanity client | `sanity/client.ts` | The app must build and run before the Sanity account exists. `safeFetch` returns null rather than throwing. |
