# ZO Skin Centre

| Field | Value |
| --- | --- |
| Status | Rewritten as a seven-section chapter study, 2026-09-14 |
| Source | Tanvir's own brief, `Claude Prompt — ZO Skin Centre Case Study.md`, 2026-09-14 |
| Shape | Seven sections, roughly three minutes, weighted toward the work rather than the writing |
| Blocked on | Nothing. A prototype GIF is coming and will need the renderer to pass animation through |
| Assets | `assets/projects/zo-skin-centre/` |

The public copy lives in `sanity/seed/projects.json` under the `chapters` array. This document is
the evidence worksheet.

## Verified from the brief

| Field | Value |
| --- | --- |
| Project | ZO Skin Centre Website Redesign |
| Company | ZO Skin Centre / ZO Skin Health, Los Angeles |
| What it is | A network of skincare centres where people explore treatments, find locations and practitioners, view results, and request a consultation |
| Role | Lead Product & UX Designer |
| Timeline | 6–8 months |
| Scope | UX strategy, information architecture, UI, design system, prototyping, responsive web |
| Owned | IA, user flows, wireframes, visual direction, design system, interaction design, high-fidelity UI, responsive design, Figma prototyping, stakeholder presentations, refinement, developer handoff |
| Problem | Four locations ran as four separate experiences on separate URLs, sharing most of their services. The IA was organised by location rather than by intent. |
| Second problem | The centre's visual language had drifted from the wider ZO Skin Health brand. |
| Process | Stakeholder discussions, brainstorming, IA exploration, wireframes, rounds of feedback, visual direction, design system, high fidelity, prototype, review, handoff. |
| Outcome | Finalised and handed to development. No business metrics were provided. |

## What the assets establish

Read straight off the screenshots, so it is safe to state on the page:

- **The old main site was a gateway, not a homepage.** `Old Website UI/image 1.jpg` has no
  navigation beyond Contact. It offers a welcome paragraph, "4 locations to serve you", "Find your
  nearest location", and four blocks whose only action is **Visit Location**. Nothing about a
  treatment can be answered there.
- **Each location was a whole website.** `Old Website UI/image 2.jpg` is the Beverly Hills site with
  its own nav — Home, About, Locations, Services, Photos, Practitioners, Shop, Reviews, Contact,
  Book Now — its own hero, its own services grid, its own reviews. Four of these existed.
- **A practitioner lived inside one location.** `Old Website UI/image 3.jpg` is Zein Obagi filed
  under Beverly Hills' *about us* breadcrumb.
- **In the redesign the practitioner owns a Locations section.** `ZOSC Practitioners Profile.jpg`
  lists all four centres with a map, on the practitioner's own page.
- **Location became a filter.** `ZOSC Photo Galleries.jpg` has Location as one filter among
  treatment category, age and gender — 68 results, a removable "Beverly Hills" chip.
- **A result connects four things.** `ZOSC Photos.jpg` puts patient details, the procedures used,
  the practitioner who performed it, a consultation form and the location with a map on one page.
- **Location is a stored preference.** `Manual Location Select Modal.jpg` is a radio list with
  Cancel and Save, and the chosen centre then appears in the top-left of every page.

## Conflicts with the previous version of this case study

| Previous claim | Why it was removed |
| --- | --- |
| Duration: "4 months" | The brief says 6–8 months. Direct conflict; the brief wins. |
| "The clinic manager pointed to three recurring problems…" | No such discovery source is in the brief. Presented as a finding with nothing behind it. |
| Competitor analysis of clinic sites | Not in the brief and no record of it. |
| Target users: Patients / Dermatologists | Plausible, but written as research output with no research behind it. |
| "Booking took too much effort" as a stated problem | The brief's problem is fragmentation and brand drift, not booking effort. |
| Platform: "Desktop & Mobile" | Now "Responsive web", which is what the brief says. |

## Open questions

| Question | Why it matters |
| --- | --- |
| Team | The brief has `[ADD IF AVAILABLE]`. The Team row is omitted from the hero rather than shown as a placeholder. Add it if there was a team. |
| Outcome metrics | None exist. The outcome section is four qualitative results and no numbers — no placeholder, because inventing a slot for a metric that may never arrive is worse than not claiming one. |

## The prototype recording

`Prototype.mp4` has been moved out of the project to `~/Desktop/` — 38 MB, unreferenced, and too
large to load on a page. A GIF replaces it.

**One thing to know before exporting it.** A GIF dropped into a chapter would go through Sanity's
image pipeline like any other picture, and a transformed GIF usually comes back as its first frame —
a still. Motion needs the file served untransformed, or a `<video>` element. Say when the GIF is
ready and the renderer can pass an animated one straight through; it is a small change, but it is
not automatic.

Keep the GIF short and small — a five to ten second loop of the location selector is the strongest
single moment, and a few megabytes is the budget.

Also unused, deliberately: six of the nine wireframes, five of the eight mobile screens, and eight
of the eleven old-site captures. The brief asked for the strongest, not all of them.

## Page shape

Seven sections a reader can see, twelve chapters in the data.

| Section | Carries |
| --- | --- |
| Hero | Headline, one supporting line, Role / Timeline / Scope / Read, the cover image |
| The challenge | Two-column copy, a fact row, then two problem cards |
| The goal | Soft pull-quote |
| Four sites to one | The old gateway and an old location site as Before, three wireframes, then the location selector and the new location page as After — all stacked |
| The decisions | Service, practitioner, gallery and one result, in that order |
| The system | Hero, location card, service card and consultation form sheets, one to a row |
| Final experience | Five key images (`screen-1`…`screen-5`) in order, then three phone captures in a row |
| Outcome | Four outcome cards, then the takeaway on a dark band |

## A note on the screenshots

ZO's exports are full-page — `ZOSC Homepage.jpg` is 1440 × 7813, and the mobile captures reach
eighteen times their own width. An image can set `previewAspect`, and the page then shows a band of
it at that height-over-width, cropped by the Sanity CDN rather than by CSS so no browser downloads
eight thousand pixels for a thumbnail, faded at the cut. The whole page stays one click away in the
lightbox.

Every image in one grid row carries the same value, so rows line up. Anything meant to be read in
place — a design-system sheet — leaves it empty.

The case study opens on `cover.jpg`, as every study does. A full-page screenshot at the top of the
page is a picture of a website; the cover is a piece of design.
