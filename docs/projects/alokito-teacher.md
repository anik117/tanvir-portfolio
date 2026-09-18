# Alokito Teacher

| Field | Value |
| --- | --- |
| Status | Shipped and live. Source account captured 2026-09-18; public copy rewritten |
| Blocked on | Measured impact only |
| Publication limit | Landing page may be shown freely. **Dashboard imagery must be limited** — Tanvir, 2026-09-18 |
| Assets | `assets/projects/alokito-teacher/` |
| Scope note | The job portal is a separate study — `docs/projects/alokito-job-portal.md` |

The concise public copy now lives in `sanity/seed/projects.json`. This document remains the
evidence worksheet; its unresolved fields must not be filled by inference.

## Sourcing rule for this document

Rows marked **Tanvir, 2026-09-18** are his own first-hand account of work he did. That is
authoritative for what was designed, why, and in what order. It is **not** independently verified,
and it claims no results. Nothing in it may be turned into an outcome or metric on the public site.

## Summary

**From the live site** (<https://tanvirux.framer.website/>, read 2026-09-08) — existing teaser
copy, not a verified case study:

> A complete redesign of Alokito Teacher's website, adding a new job portal feature to connect teachers with opportunities.

| Field | Value | Status |
| --- | --- | --- |
| Full title | Alokito Teacher Website Redesign + Job Portal | From live site |
| Type | Website redesign + platform dashboards | From live site, refined by Tanvir |
| Client | A Bangladeshi education startup, Alokito Teacher | Tanvir, 2026-09-18 |
| My role | Designer — research, design system, landing page, dashboards | Tanvir, 2026-09-18 |
| Timeline | Began early 2025; roughly six to eight months from start to landing | Tanvir, 2026-09-18 |
| Team and collaborators | Sole designer, working with two developers | Tanvir, 2026-09-18 |
| Launch status | All scope is live | Tanvir, 2026-09-18 |
| Outcome / results | — | REQUIRES VERIFICATION — shipped is not the same as measured |

The teaser claims outcomes (bookings, conversions, consistency). Do not repeat those on the new
site as results unless there is evidence behind them — an unbacked metric is the first thing a
design leader will probe in an interview. Tanvir's account, given 2026-09-18, contained **no
outcome claims at all**. Treat that silence as meaningful.

## Context

**Background:** Alokito Teacher is a Bangladeshi startup building an education platform. It trains
anyone who wants to become a teacher, and connects those trained teachers to schools and institutes
that want to recruit them. It is a two-sided platform — teachers on one side, institutes on the
other. *(Tanvir, 2026-09-18)*

**Problem:** The existing landing page was badly outdated. *(Tanvir, 2026-09-18)*

**Goal:** Two things at once. Rebuild the public site so it is unified and design-system-ready, and
design the platform dashboards behind it — separate experiences for teachers, institutes, and the
trainers who administer the programme. *(Tanvir, 2026-09-18)*

### Constraints

| Constraint | Source | Design implication |
| --- | --- | --- |
| Design system readiness was an explicit requirement, not a preference | Tanvir, 2026-09-18 | The system was built before the pages, not extracted afterwards |
| Access to training phases is sold in tiers | Tanvir, 2026-09-18 | Phase state, locking and pricing had to be legible in the teacher UI |
| Institute capacity is seat-based | Tanvir, 2026-09-18 | The institute dashboard is built around seat count against plan |

## Research

### Evidence

| Source | Date | Method | Observation | Limitations |
| --- | --- | --- | --- | --- |
| **Bdjobs** (bdjobs.com) — Bangladesh's dominant job board | Early 2025 | Competitive review | Reference for the recruitment half of the platform | No scored comparison or artefact recorded |
| **10 Minute School** — Bangladeshi edtech platform | Early 2025 | Competitive review | Reference for the training half of the platform | No scored comparison or artefact recorded |
| Client discussion | Early 2025 | Requirement gathering | Requirement flow was produced and handed back to the client | No notes retained in this repo |

*(Both rows: Tanvir, 2026-09-18)*

**Honest framing for the public copy:** this was a competitor review and a requirements exercise. It
was not user research. Do not describe it as user research, and do not imply findings from users.

**Worth saying out loud in the study:** the competitive set spans both halves of the product — a job
board on one side, an edtech platform on the other. No single competitor did both. That is the
clearest available argument for why the platform is shaped the way it is, and it comes directly from
the review rather than from hindsight.

### Open Questions

| Question | Why it matters | Evidence needed | Next step |
| --- | --- | --- | --- |
| Any measured result | The one thing an interviewer will press on | Analytics, client statement | Ask Tanvir; leave blank otherwise |
| Live URL | Shipped work should be linkable | The production URL | Ask Tanvir |

**Resolved 2026-09-18:** competitors named (Bdjobs, 10 Minute School); all scope is live; Tanvir was
sole designer alongside two developers; client permission granted for landing page and job portal,
with dashboard imagery limited.

## Strategy

**Sequence:** research → client discussion → requirement flow → design system and components →
landing page variations → dashboards. The system came first deliberately; the pages were built out
of it. *(Tanvir, 2026-09-18)*

**Priority:** the landing page was the visible deliverable, but the **dashboards were the main
work** and the genuinely complex part. *(Tanvir, 2026-09-18)* The case study should be weighted
accordingly — a study that spends most of its length on the homepage misrepresents the project.

## Landing page

Several variations were explored before landing. The homepage was restructured around the platform's
offerings, several of which were newly surfaced there: *(Tanvir, 2026-09-18)*

- Courses
- The job platform, for both recruiters and teachers
- Job search
- Pricing plans — newly included on the homepage

The homepage acts as the branching point into each of those flows. *(Tanvir, 2026-09-18)*

**Design reference:** `landing-homepage.png`, `landing-job-homepage.png`,
`landing-recruiter-homepage.png`, `landing-courses.png`, `landing-course-details.png`,
`landing-mobile-homepage.png`, `landing-mobile-courses.png`.

## Teacher experience

*(Tanvir, 2026-09-18)*

The core loop, in order:

1. Teacher signs up and lands on their dashboard.
2. They must complete a **basic assessment** first.
3. Training is organised into **four phases**.
4. **Phase 1** holds mandatory items — a workshop, a course, an assessment. Completing them unlocks
   phase 2, and so on through phase 4.
5. **Phases 2–4 are paid** — a pricing plan governs how many phases a teacher gets.
6. Training is delivered by qualified trainers, through **online courses and offline workshops**.
7. Assessments are **scored**, and those scores build a **profile score**.
8. That score earns a **certificate**, and is what the teacher applies to real schools with.

The profile score is the hinge of the whole platform: it is produced by training and spent in
recruitment. Both case studies should treat it as the central mechanic.

**Design reference:** `dash-teacher.png`, `dash-assessment-form.png`.

## Institute (recruiter) experience

*(Tanvir, 2026-09-18)*

- Institutes sign up and are **verified through the admin panel**.
- The dashboard opens on a **plan summary**, built around **seats** — how many teachers the plan
  allows them to enrol. A plan might permit 25.
- When teachers apply, the institute **enrols them from the dashboard**.
- Lists cover enrolled teachers, pending enrolments, teachers in review, and rejected courses.
- They can see the **current progress of each enrolled teacher**.
- They can see which plan they are on, and **buy additional seats** by purchasing a new package.
- Purchase history and **invoices** are available.

**Design reference:** `dash-institute.png`, `dash-institute-billing.png`.

## Trainer / admin experience

*(Tanvir, 2026-09-18)*

The administrative side, used by the trainers who run the programme:

- Registered teachers and registered institutes
- Total spend, and who is active versus pending
- Settings to **lock and unlock phases**
- A teacher's profile, including which courses they have and have not completed
- A **teacher report** — score per phase, and assessment scores

**Design reference:** `dash-trainer.png`, `dash-trainer-courses.png`, `dash-course-details.png`,
`dash-teacher-report.png`, `dash-workshop-test.png`, `dash-admin.png`, `dash-admin-users.png`,
`dash-admin-phases.png`.

## Forms

Forms were a large share of the work, and the **assessment form builder was the hardest single
piece**. *(Tanvir, 2026-09-18)*

The builder had to let an admin compose a form from scratch:

- Multiple field types, including checkbox and text input
- Fields configurable as required or optional
- Adding fields as you go
- Course details surfaced alongside

This is the strongest craft story in the project — a builder is harder than a form, because the
designer has to design the thing that makes the things. It deserves real space in the study.

**Design reference:** `dash-assessment-form.png`, `dash-admin-phases.png`.

## Design System

### Foundations

The system was built **before** the pages, as an explicit client requirement, to give the platform a
unified look. *(Tanvir, 2026-09-18)*

| Category | Token or value | Usage | Source |
| --- | --- | --- | --- |
| Not yet extracted | — | — | Figma pages `Foundations`, `✤ Colors`, `✤ Typography`, `✤ Icons`, `✤ Shadows` |

The Figma file has dedicated Foundations pages plus `Base Componnets` and `Other Componnets`
[sic — the file's own spelling]. These are readable and can be documented properly when the study
needs that level of detail.

## Handoff

### Figma Reference

| Field | Value |
| --- | --- |
| File URL | https://www.figma.com/design/rFIS8JR9wtnNJvjVsloDKB/Alokito-Dashboard---Landing |
| Pages used | `Dashboard - Web` (`0:1`), `Dashboard - Mobile` (`602:8784`), `Landing Page [new]` (`1426:22699`) |
| Role sections | Admin `517:9108`, Trainer `380:4094`, Institute `335:3002`, Teacher `319:2639` |
| Export provenance | `assets/projects/alokito-teacher/figma-manifest.json` — node id, dimensions, scale, bytes and sha256 per image |

### Implementation

| Field | Value |
| --- | --- |
| Missing information | Measured outcomes; production URL |
| Decisions needed | None outstanding for images — see publication limits below |

## Publication limits

Five dashboard frames are **gitignored and must stay that way**: `dash-admin-users`, `dash-trainer`,
`dash-admin`, `dash-institute`, `dash-teacher-report`. Each shows a table or profile of named
individuals with phone numbers and email addresses. The repository is public, so committing them
would publish them regardless of what the site renders.

The published set — teacher dashboard, phase management, assessment builder, plans and billing,
course library and course detail — carries no personal records and stays inside the client's
"dashboard can be limited" constraint.

## Portfolio publication update — 2026-09-18

Tanvir confirmed in the current conversation that the client loved the delivered experience and that Alokito raised funding after development to support further scaling. These are first-hand milestone statements, without a supplied amount, investor, date, analytics result, or claim that the design caused investment. They may appear in the public outcome; prior restrictions against converting his account into measured results still apply to invented metrics.

The revised public narrative uses UI/UX Designer, 2025, the overall 6–8 month engagement, a full-experience prototype, and close handoff with two developers. Training and job stories belong to the same engagement.

Figma inspection confirms colour scales, typography hierarchy, base components, and interaction/validation/access/editing state variants. Automatic prototype wiring inside component sets has not been established.

Published imagery is listed in `figma/featured-manifest.json`. Individual records remain excluded. Seat capacity, phase scores, and profile readiness use original detail-node exports; candidate information uses generic profile components. The PNGs preserve the original UI at high resolution.

The stories use seven primary navigation sections, with shorter supporting chapters. Compact component grids, explicit phone/detail presentation, and bounded long-page previews balance the reading layout. The two Alokito projects lead portfolio ordering; existing image viewers expose complete screens.
