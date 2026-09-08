# Build Specification

How the portfolio gets implemented and validated. Approved requirements here are a source of
truth for development.

## Stack

Decided. Everything else in this document is still open.

| Layer | Choice | Status |
| --- | --- | --- |
| Framework | Next.js (App Router) | Decided |
| Language | TypeScript | Decided |
| Runtime | Node 25.x locally | Decided |
| Package manager | npm | Decided |
| Styling | — | REQUIRES VERIFICATION |
| Content source | Markdown in `docs/` vs CMS | REQUIRES VERIFICATION |
| 3D | react-three-fiber, only if a Three.js concept is approved | Conditional |
| Hosting | — | REQUIRES VERIFICATION |
| Analytics | — | REQUIRES VERIFICATION |

**Browser and device support:** REQUIRES VERIFICATION

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
| 3D budget, if approved | — | REQUIRES VERIFICATION |
| Validation plan | — | REQUIRES VERIFICATION |
