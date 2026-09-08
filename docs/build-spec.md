# Build Specification

How the portfolio gets implemented and validated. Approved requirements here are a source of
truth for development.

## Stack

| Layer | Choice | Status |
| --- | --- | --- |
| Framework | Next.js (App Router) | Decided |
| Language | TypeScript | Decided |
| Runtime | Node 25.x locally | Decided |
| Package manager | npm | Decided |
| Hosting | Vercel | Decided |
| 3D | Three.js via react-three-fiber + drei | Decided |
| CMS | Sanity (free plan) | Proposed — see below |
| Styling | — | REQUIRES VERIFICATION |
| Analytics | — | REQUIRES VERIFICATION |
| Domain | — | REQUIRES VERIFICATION |

**Browser and device support:** REQUIRES VERIFICATION

### CMS Rationale

A design portfolio is asset-heavy, and image delivery — not content modelling — is the thing
that will actually hurt. That is the deciding factor.

| Option | Free tier | Why / why not |
| --- | --- | --- |
| **Sanity** | 20 GB asset storage, 10 GB bandwidth/mo, 500k CDN requests/mo, 10k documents, 20 seats, does not expire | **Proposed.** Image CDN with on-the-fly resize, format conversion, and hotspot cropping. Studio embeds at `/studio` in the same Next.js app and ships to Vercel with the site. Free-tier datasets are public — fine, since portfolio content is public anyway. |
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
| 3D budget | — | REQUIRES VERIFICATION — now load-bearing, see below |
| Validation plan | — | REQUIRES VERIFICATION |

## Three.js Risk

The stated intent is a "fully interactive" Three.js site. That collides directly with three
principles in [brief.md](brief.md): effects support storytelling rather than lead it,
performance and accessibility outrank decoration, and 3D is used *selectively*.

This is not a reason to drop the 3D — it is a reason to decide the scope deliberately before
building. Resolve before the first Three.js commit:

| Question | Status |
| --- | --- |
| Which sections get 3D, and which stay flat? | REQUIRES VERIFICATION |
| What does each 3D moment communicate that 2D cannot? | REQUIRES VERIFICATION |
| Non-WebGL and low-power fallback | REQUIRES VERIFICATION |
| `prefers-reduced-motion` behavior | REQUIRES VERIFICATION |
| Mobile performance budget | REQUIRES VERIFICATION |
| Bundle-size ceiling for 3D code and assets | REQUIRES VERIFICATION |

The audience is hiring managers and design leaders. A site that stutters on a mid-range phone
argues against the craft it is meant to demonstrate.

## Reference

Current site: <https://tanvirux.framer.website/> — Framer, being replaced by this build.
Its copy and structure are captured in [content.md](content.md) and [profile.md](profile.md).
