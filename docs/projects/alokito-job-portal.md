# Alokito Job Portal

| Field | Value |
| --- | --- |
| Status | Shipped and live. Source account captured; public copy rewritten |
| Blocked on | Outcome evidence only |
| Publication limit | Cleared to show publicly — Tanvir, 2026-09-18 |
| Assets | `assets/projects/alokito-job-portal/figma/` |
| Split from | `docs/projects/alokito-teacher.md` — Tanvir's call, 2026-09-18 |
| Role | Sole designer, working with two developers — Tanvir, 2026-09-18 |

The job portal was a **new feature** added to the Alokito Teacher platform, not part of the
original site. Tanvir decided on 2026-09-18 that it carries its own case study, separate from the
landing page and training dashboard work.

## Sourcing rule for this document

Everything below marked **Tanvir, 2026-09-18** is his own first-hand account of work he did. It is
authoritative for what was designed and why. It is **not** independently verified, and it contains
no measured outcomes — he did not claim any. Do not convert any of it into a results claim.

## Context

**Background:** Alokito Teacher is a platform for teacher training in Bangladesh. Teachers train on
the platform, and schools and institutes recruit from that trained pool. The job portal is the
connective tissue between those two sides — the point where a trained teacher becomes a job
applicant and an institute becomes a recruiter. *(Tanvir, 2026-09-18)*

**Problem:** REQUIRES VERIFICATION — the specific failure or gap that motivated building a portal
rather than pointing teachers at existing job boards was not stated. Context that bears on it: the
competitive review covered **Bdjobs**, Bangladesh's dominant general job board, and **10 Minute
School**, an edtech platform. Neither connects training to hiring, which is the gap this portal
occupies — but that reasoning is the worksheet's inference, not Tanvir's stated rationale, and must
be confirmed before it appears as a claim.

**Goal:** Give teachers a way to find and apply to real school jobs using the profile and score
they built through training, and give institutes a way to review and act on those applicants.
*(Tanvir, 2026-09-18)*

**Scope:** Two sides, each with web and mobile. Applicant (teacher) and Recruiter (school).
*(Tanvir, 2026-09-18; corroborated by the Figma file, which has four sections — Applicant (Teacher),
Recruiter (School), and a mobile section for each)*

## Applicant (teacher) side

*(Tanvir, 2026-09-18)*

| Capability | Detail |
| --- | --- |
| Application tracking | Sees which jobs they applied to, which are in review, which they saved |
| Search | Location-based search, plus filtering |
| Saving | Save a job for later |
| Job posts | Browse and read job postings |
| Deadlines | Application deadline visible on a job |
| Apply | Application form with defined required inputs |
| Incomplete profile | A warning is shown when the profile is not complete enough to apply |
| Submission | Explicit success state after submitting |
| Undo | An application can be undone after submitting |
| Profile | Own applicant profile with a profile score and badges |

**Design reference:** `job-dashboard.png`, `job-search.png`, `job-search-empty.png`,
`job-details.png`, `job-application-form.png`, `job-application-warning.png`,
`job-application-confirmation.png`, `job-applicant-cv.png`, `job-applicant-cv-edit.png`,
`job-add-experience.png`, `job-undo-application.png`, `job-report-modal.png`,
`job-mobile-dashboard.png`, `job-mobile-search.png`.

## Recruiter (school) side

*(Tanvir, 2026-09-18)*

| Capability | Detail |
| --- | --- |
| Dashboard | Sees who applied and who is pending |
| Decisions | Can reject an applicant; an accept path exists alongside it |
| Applicant review | Can open and read an applicant's profile |
| Posting | Job posting is a multi-step flow — four steps in the file |
| Scoring | A scoring system is used in recruiting |

**Design reference:** `recruiter-dashboard.png`, `recruiter-post-step-1.png` through
`recruiter-post-step-4.png`, `recruiter-compensation.png`, `recruiter-posting-details.png`,
`recruiter-applicant-review.png`, `recruiter-accept-modal.png`.

## The link back to training

The portal is not a generic job board. The applicant's profile score comes out of the training
platform — assessments scored across phases — and that score is what the teacher applies with.
*(Tanvir, 2026-09-18)*

This is the strongest structural idea in the project and the thing that distinguishes it from a
jobs listing site. It is worth being the spine of the case study.

## Open Questions

| Question | Why it matters | Evidence needed | Next step |
| --- | --- | --- | --- |
| What problem justified building it? | Without it the study opens on a feature list, not a reason | Client brief or discussion notes | Ask Tanvir |
| Live URL | Shipped work should be linkable | The production URL | Ask Tanvir |
| Was the recruiter side validated? | Two-sided products fail on the thinner side | Any research with schools | Ask Tanvir |
| How does the score feed recruiter decisions? | It is the core mechanic; the study should state it precisely | Spec or design annotation | Ask Tanvir, or read the recruiter applicant-review frame |
| Outcome / results | REQUIRES VERIFICATION. No metric was claimed and none should be written | — | — |

## Publication limits

Ten exported frames are **gitignored and must stay that way**. They show individual people's
records — name, photo, phone, email, and on the applicant profile also date of birth, religion and
marital status. The data is almost certainly mock, but it reads as real, and
`github.com/anik117/tanvir-portfolio` is a public repository, so committing those files would
publish them no matter what the site renders.

Held back from this study: `job-applicant-cv`, `job-applicant-cv-edit`,
`recruiter-applicant-review`, `job-application-form`, `recruiter-posting-details`.

## Handoff

### Figma Reference

| Field | Value |
| --- | --- |
| File URL | https://www.figma.com/design/rFIS8JR9wtnNJvjVsloDKB/Alokito-Dashboard---Landing |
| Page | `Job Portal [new]` (`1141:16375`) |
| Sections | Applicant (Teacher) `1143:11561`, Recruiter (School) `1296:15661`, Applicant Mobile `1642:22100`, Recruiter Mobile `1687:19777` |
| Export provenance | `assets/projects/alokito-job-portal/figma-manifest.json` — node id, dimensions, scale, bytes and sha256 per image |

## Portfolio publication update — 2026-09-18

Tanvir confirmed in the current conversation that the client loved the delivered experience and that Alokito raised funding after development to support further scaling. These are first-hand milestone statements, without a supplied amount, investor, date, analytics result, or claim that the design caused investment. They may appear in the public outcome; prior restrictions against converting his account into measured results still apply to invented metrics.

The revised public narrative uses UI/UX Designer, 2025, the overall 6–8 month engagement, a full-experience prototype, and close handoff with two developers. Training and job stories belong to the same engagement.

Figma inspection confirms colour scales, typography hierarchy, base components, and interaction/validation/access/editing state variants. Automatic prototype wiring inside component sets has not been established.

Published imagery is listed in `figma/featured-manifest.json`. Individual records remain excluded. Seat capacity, phase scores, and profile readiness use original detail-node exports; candidate information uses generic profile components. The PNGs preserve the original UI at high resolution.

The stories use seven primary navigation sections, with shorter supporting chapters. Compact component grids, explicit phone/detail presentation, and bounded long-page previews balance the reading layout. The two Alokito projects lead portfolio ordering; existing image viewers expose complete screens.
