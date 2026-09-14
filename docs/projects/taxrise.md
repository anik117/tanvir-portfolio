# TaxRise

| Field | Value |
| --- | --- |
| Status | Rewritten as a seven-section chapter study, 2026-09-14 |
| Source | Tanvir's own briefs, `Claude Prompt — Rebuild TaxRise Case Study.md` then `Claude Prompt — Minimal Senior TaxRise Case Study.md`, both 2026-09-14 |
| Shape | Seven sections, roughly two minutes, weighted toward the work rather than the writing |
| Blocked on | Verified GA4 figures to replace the two approximate ones, and the final homepage image |
| Assets | `assets/projects/taxrise/` |

The public copy lives in `sanity/seed/projects.json` under the `chapters` array. This document is
the evidence worksheet: what the brief established, what the page still marks as a gap, and where
the previous version of this case study said something the brief does not support.

## Verified from the brief

| Field | Value |
| --- | --- |
| Project | TaxRise Website & Lead Form Redesign |
| Employment | Employed through MIADVG LLC, TaxRise's sub-company |
| Role | Lead Product & UX Designer |
| Team | Tanvir as lead, plus two junior designers |
| Collaborators | Stakeholders, the brand team, developers, the two junior designers |
| Duration | Roughly 6–12 months, exploration through developer handoff |
| Scope | Website (20+ pages), lead form, design system |
| Background | TaxRise had just refreshed its brand — logo, colours, direction. The team had to carry that onto a website that had become visually and structurally inconsistent. |
| Business problem | Users were not converting from the website into the lead form as effectively as the business wanted. |
| Process | Stakeholder requirements, brainstorming, visual research, mood boards, UX exploration, wireframes, visual direction, design system, high fidelity, stakeholder review, iteration, finalisation, developer handoff. |
| Visual direction | Minimal, professional, trustworthy, blue-led. |
| Design system | Created by Tanvir; became the foundation for the wider website. |
| Homepage first | The homepage settled visual direction, typography, colour, spacing, hierarchy, component behaviour, CTA treatment and responsive patterns. The system then extended across 20+ pages — some templated, some with unique layouts. |
| Lead form | Treated as a product problem. Flows and flow diagrams were mapped and reviewed with stakeholders before the final UI. |
| Iteration | The first visual direction was not the final one; it changed after stakeholder review. |
| Leadership | Set direction, built the system and reusable patterns, reviewed work, gave feedback, resolved design decisions, held consistency. Not formal people management. |
| Outcome | Post-launch Google Analytics showed better progression from site into the lead form, and improved lead conversion against the previous experience. |

## Conflicts with the previous version of this case study

These were on the site before this rewrite. The brief contradicts or does not support them, so they
have been removed from `projects.json` rather than carried forward.

| Previous claim | Why it was removed |
| --- | --- |
| Role: "Sole UI/UX Designer" | The brief states Lead Product & UX Designer with two junior designers. Direct conflict; the brief wins. |
| Duration: "6 months" | The brief says roughly 6–12 months. Now stated as the range. |
| "Conversations with stakeholders, SEO and marketing surfaced…" | The brief lists stakeholders, the brand team and developers. No SEO or marketing discovery is mentioned. Unsupported. |
| Competitor analysis of tax-relief sites | Not in the brief. No record of it having happened. |
| "~30 screens, one style guide" | The brief says 20+ pages. The screen count has no source. |
| "Internal teams (SEO and marketing)" as a target audience | Same as above — unsupported. |
| Insight about proof being "separated from the moments when people were deciding" | A plausible reading of the old site, but presented as a research finding with nothing behind it. |

## Measured outcome

| Metric | Value | Basis |
| --- | --- | --- |
| Lead-form conversion, before | ~55% | Google Analytics after launch — **approximate**, given from memory |
| Lead-form conversion, after | ~70% | Google Analytics after launch — **approximate**, given from memory |

Both render with a tilde, and the evidence line under each says "approximate". That is deliberate:
an unsourced 55 → 70 is the first thing a design leader will probe, and the page should say what
kind of number it is before the question is asked.

**Worth doing before this study goes in front of anyone:** pull the real figures from GA4, note the
date range and the event being measured (form start → form complete, presumably), and replace both
values and their evidence lines. The schema already refuses a verified metric without a source.

The third metric — a derived "improvement" — was dropped. It restates the two figures and would
have had to be labelled verified while resting on approximations.

## Assets still needed

Every image the case study wants is already named in `sanity/seed/projects.json`. A file that is
not on disk renders as a dashed slot carrying its `pendingLabel`; drop the file into
`assets/projects/taxrise/` under the name below and re-run `npm run publish:projects`, and the slot
becomes the image. No JSON editing.

| File to add | Section | Slot label |
| --- | --- | --- |
_All named files are now on disk and published. Nothing is outstanding._
| `system-foundations.jpg` | The system — feature | Design system foundations — type, colour and spacing |
| `system-button.jpg` | The system | Button sheet |
| `system-accordion.jpg` | The system | Accordion sheet |
| `system-card.jpg` | The system | Card sheet |
| `form-flow.jpg` | Lead form | The lead-form flow diagram |
| `form-1-entry.jpg` | Lead form | Form — entry screen |
| `form-2-multiselect.jpg` | Lead form | Form — a question step ("Which tax years are unfiled?") |
| `form-3-branch.jpg` | Lead form | Form — the branching question (bankruptcy discharge) |
| `form-4-complete.jpg` | Lead form | Form — completion screen |

Every slot on the page now points at a named file. The mood boards and wireframes are described in
the Approach copy but have no slot, because no file was named for them — add one to the seed if
those artifacts exist and should be shown.

## Page shape

Seven sections a reader can see, nine chapters in the data (three of them are headless
continuations that read as part of the section above).

| Section | Carries |
| --- | --- |
| Hero | Headline, one supporting line, Role / Team / Timeline / Scope / Read, the homepage screenshot |
| The challenge | Two-column copy, then 20+ pages · 1 design system · Lead-form redesign |
| Approach | The landing round full width, the two hero rounds beside each other |
| The system | Foundations sheet full width, Button / Accordion / Card in a row, then two pages built from them |
| Lead form | The consultation page before and after, the flow diagram, four form screens |
| The final experience | Two screenshots, minimal captions |
| Outcome | Dark band — three metrics, the Google Analytics statement, the takeaway |

The step chips that used to sit in Approach (Moodboard → Wireframes → Visual direction → Design
system → Homepage) were removed once real exploration sheets existed. A generic process diagram
standing next to the actual work only weakens it, and both briefs asked not to use one.

## Open question: which homepage is the one this study is about

Tanvir sent a homepage headed **"Your financial freedom is our mission."** and called it the final
homepage hero. That is the v1–v4 landing line, refined. It is not the headline in `screen-1.jpg`,
which the case study currently uses as its hero image.

The proof numbers separate the two families cleanly:

| | Headline | Numbers shown |
| --- | --- | --- |
| Landing v1 | Your freedom is our mission | 25k+ customers served · $1.8M tax resolved · 4k+ reviews |
| "Final" homepage | Your financial freedom is our mission | 25k+ clients onboarded · $132M+ saved · 4.8 (1k+) · 100% money-back |
| Hero rounds 1–12 | Let's resolve your tax issues | 100K+ Americans helped · $2.1B+ resolved · 4.6 (7,631 reviews) |
| `screen-1.jpg` | Let's resolve your tax issues | Google 4.6 · 7,631 reviews |

The numbers grow from 25k+/$132M+ to 100K+/$2.1B+, which puts the hero rounds and `screen-1.jpg`
*later* than the "financial freedom" homepage. That matches Tanvir describing the hero variations as
recent work.

**Reading to confirm:** this case study covers the redesign that shipped as "Your financial freedom
is our mission." The "Let's resolve your tax issues" work — the twelve hero directions and
`screen-1.jpg` — is a later, separate round.

If that is right, three things change:

1. The case study's hero image becomes the "financial freedom" homepage, not `screen-1.jpg`.
2. The hero-direction sheets either get labelled as a later round, or come out of this study.
3. `screen-1.jpg` either moves to the final-experience section as the current site, or comes out.

Nothing has been changed on this yet. The file for the final homepage is also not in
`assets/projects/taxrise/`.

## Other open questions

| Question | Why it matters |
| --- | --- |
| Was the persistent trust panel beside the form Tanvir's decision? | It is the most notable UX move visible in the form screens. The copy describes it; it does not yet claim it as his call. |
| Should the hero image be the "financial freedom" homepage? | The case study still opens on `screen-1.jpg`. See the section above. |


## What the landing sheet establishes

Four full landing directions under "Your freedom is our mission" — the line that shipped, refined to
"Your financial freedom is our mission." The four carry the same sections in the same order (hero,
2-Phase Resolution Process, customer review, accreditations, $132 Million, "Ready to qualify",
newsletter, footer). What was being explored was the arrangement and the weight given to proof, not
the structure.

**The hero round was removed from the case study on Tanvir's instruction** — the twelve "Let's
resolve your tax issues" directions are later, separate work and do not belong to this redesign.
`explorations-hero-1.webp` has been deleted.

## What the flow diagram establishes

Read straight off the artifact, so it is safe to state on the page:

- **"Do you have any unfiled tax years?" has three exits** — Yes, No, and Not sure. No and Not sure
  both skip the follow-up question rather than forcing a guess.
- **The bankruptcy question splits the form into two endings.** Yes → asked when discharge is
  expected, told to wait, thank-you screen with a return button. No → "You've qualified for a free
  tax consultation", fill out and submit, thank-you screen with a scheduling option.

The second point is the strongest piece of product thinking in the study: someone who cannot be
helped yet is given a way back instead of a dead end.

## Asset inventory

| File | What it shows | Where it is used |
| --- | --- | --- |
| `screen-1.jpg` | Homepage desktop — hero, client results, two-phase process, FAQ | Hero image at the top of the case study |
| `screen-2.jpg` | Free consultation page, before and after | Lead form — the front door, feature image |
| `screen-3.jpg` | Customer stories on mobile, beside a full story | Final experience |
| `screen-4.jpg` | Team page and enrolled agents | The system — "Content-heavy page" |
| `screen-5.jpg` | Angled mobile montage — services, blog, story, about | The system — "Reusable page pattern" |
| `cover.jpg` | Three mobile screens on blue | Work cards, and the final-experience opener |
