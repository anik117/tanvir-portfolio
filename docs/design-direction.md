# Design Direction

Portfolio-wide visual, motion, interaction, and 3D direction. Approved direction here is a
source of truth for design work. Inspiration is not direction until it is approved.

## Direction change — paper (2026-09-08, night)

**Tanvir rejected the 3D-morphism pass as "too much 3D" and "non-professional", and named
<https://www.trushaneogi.com/> as the target: a white theme with dark sections, not 3D, with
scroll interactions.** This section wins over everything below it where they conflict. The
earlier 3D pass is gone from the code; its section is kept below as the record of why.

### Divergence from the reference (2026-09-08, later)

Tanvir approved the structure but called the first cut "a 1:1 copy". Four changes were made
so the site reads as his rather than as the reference with different words. The scroll
behaviour — the stacking band, the pinned About, the carousel — is unchanged.

| Change | What | Why it is his |
| --- | --- | --- |
| Annotation device everywhere | Callouts pinned to the product shots on the work cards, and on the hero's screen card | Already the site's signature in the sections below; the reference has nothing like it |
| Type voice | Geist for headings, Inter for body. The serif italic second line is gone; the closing words get a highlighter swipe that draws in on entry | The swipe is the annotation gesture turned on his own sentence |
| One accent | Royal blue `#1d4ed8`, only on decisions: positive callout marks, the availability dot, the active nav marker. Work panels are warm paper `#f4f1ea` instead of a colour per card | Colour carries meaning instead of decorating |
| Footer | "Turning complexity into clarity." set wide with the swipe, in place of the giant cropped wordmark | The reserve line from profile.md, and the wordmark was the reference's most recognisable element |

Refined the same night on Tanvir's notes:

- **Geist Mono** for numbers, meta rows, and the nav. Stat values, outcome numbers, year and
  category lines, act numbers, and the three nav links are all mono now.
- **The swipe became a hand-drawn line.** A yellow (`#f7c948`) SVG stroke with a slight
  wobble under the closing words, drawn in with a dash-offset transition. The blue fill read
  as a text-selection.
- **Testimonials are a ruled grid**, not a carousel: three across on the dark band, hairlines
  between, the quote in Instrument Serif, and the company's mark beside the name. There is an
  optional `logo` image on each testimonial in the Studio; until one is uploaded, a mono
  monogram of the company stands in.

Second pass, same night — "still too close, especially the hero":

- **Hero is two columns, left-aligned.** Mono eyebrow (title, current employer), the headline
  with the yellow line, the supporting paragraph from the Studio (unused until now), two
  buttons, and a mono stats strip under a rule. On the right, one prop instead of four: the
  latest cover as an artboard on a 16px canvas grid, its decisions pinned, with a mono label.
  The fanned desk props are gone — they were the most reference-shaped thing on the page.
- **Line grid, not dots.** The ground is a 64px hairline grid at 4.5% ink; frames inside cards
  use a 16px one. Same "workspace" feeling, different texture, and it ties to the artboard.
- **Nav carries his name**, in the heading face, not a lower-case wordmark with a full stop.
- **Work cards are paper**, not a dark/colour split: ink on `#f4f1ea`, the shot on a canvas
  grid to the right, a mono `01 / 04` index. The section heading sits inside the dark band,
  left-aligned, with a mono count, instead of a centred "Latest work." above it.
- **Testimonials have tiers.** One featured quote at reading size in the serif beside the
  section intro, then the rest in a ruled two-column grid at body size. Mono relationship and
  date on every card. Hierarchy carries the weight, not point size.
- **About pin** gained a mono eyebrow and is left-aligned inside its measure.

Third pass — "the typography is not aligning; use Plus Jakarta Sans; no black sections":

- **Plus Jakarta Sans** is the one text face now, headings at 600. Geist Mono stays for
  numbers, meta and nav; Instrument Serif italic for the signature, which is now also the
  nav logo, so the same mark opens and closes the page.
- **No dark sections.** `.band` is warm paper (`#f4f1ea`) and the sections on it use white
  cards: the work stack and the testimonials. The page runs white → paper → white → paper.
- **Testimonials** follow a customer-stories pattern: heading and subline left, a link right,
  then white rounded cards with the quote on top and the company mark, name and role under a
  rule. The cards pack in CSS columns because the quotes vary a lot in length.
- Compact callouts are spaced apart automatically when two Studio positions sit within 16%
  of each other vertically, so the small frames on cards never stack notes.

Fourth pass:

- **Testimonials are an expanding row.** One card open at 600px with the quote at reading
  size; the others 300px with the quote clamped. Hover (fine pointers, after 160ms so a pass
  of the cursor does not fire it) or click opens a card and the row recentres on it; arrows
  and dots page through. Recentring sets the row's scroll position from the cards' target
  widths, never `scrollIntoView`, which would also scroll the page on first paint.
- **Avatars are coloured discs with bold initials** — six fixed colours cycled by position.
  No photos are needed, and none are asked for in the Studio.
- **Emphasis is italic**, nothing drawn. The hand-drawn yellow line is gone; the closing
  words of a headline are set in Instrument Serif italic — the signature's face — so the
  logo and the headline share one voice.

Fifth pass:

- **Callouts are off the project cards and the case study covers.** Tanvir found them busy
  at card size. The hero artboard keeps its two, as the one place the device is shown.
- **About pin is two columns**: the paragraph at heading size with its closing words in the
  serif italic, then a row of what he does and a link to the About page fading in as the
  words finish; the image pile spreads in the right column.
- **Contact opens with "Hi, I'm Tanvir."** in the serif, the heading, the Studio's message,
  a mono status line (availability, current employer), then the actions. Beside it a paper
  card with what a good first message includes and the channels as coloured discs.
- **Lightbox** is pinned to the viewport and centred both ways; the image scales to fit
  84vh so it never sits off-centre on a tall screenshot.

Sixth pass:

- **Testimonials open on click only.** Hover no longer expands a card; the middle of the
  first three is open on load so the row reads small · large · small, and the open card is
  taller as well as wider. On phones the open card grows with its quote up to eleven lines.
- **No callouts anywhere.** The hero artboard lost its two as well; it is now the cover on a
  canvas grid with a mono label. `AnnotatedImage` stays in the codebase for the day a case
  study wants one deliberately.
- **Case study is quieter.** The act index is a hairline with a marker, no numbers. The big
  faint act numbers and "Act 01" eyebrows are gone; acts are separated by a rule. Lists are
  plain — dashes, hairline rows, no cards. Cards are kept only for the cover frame, the
  gallery images, the outcome numbers, and the "More work" tiles.

Seventh pass:

- **The hero artboard rotates.** Every project's cover is mounted from the start and the
  board crossfades to the next every five seconds, the mono label and the case-study link
  following. A dwell bar in the active dot shows the timer; hovering or focusing holds it;
  the dots jump. Reduced motion shows the first cover and stops.
- **About is one reading column.** Heading, intro, paragraphs, the numbers under a rule,
  then Experience, Education, What I do, and Toolkit as plain rows with a mono label above
  each. No cards, no timeline, no icons.

Eighth pass:

- **Footer is quiet.** The "Turning complexity into clarity." line is gone. A pale grey
  `#f4f4f2` band with the signature and availability on the left, two short mono-labelled
  lists on the right (pages; channels and email), and the year under a rule.

Ninth pass — "no orange tone; white, black, and sand grey only":

- `--panel` is `#f1f1ee` and the canvas grids `#f7f7f5`: neutral greys with no yellow cast.
  The footer is white with a hairline across the top.
- The blue accent is gone; `--accent` resolves to ink. The avatar and channel discs are
  black with white initials; the availability dot is black; the copy-confirm tick is ink.
- Instrument Serif was already the serif — the signature and the italic closing words. Kept.

Tenth pass:

- **The line grid is behind the hero only**, fading out toward its foot. Every other
  section, and the whole of every other page, is flat white. `.band` now draws only a
  hairline across the top of a section; the work-card image panel, the contact card, and
  the outcome numbers are white with a hairline border.

## Direction change — clarify.ai (2026-09-09)

Tanvir pointed at <https://www.clarify.ai/> for card style, colour, spacing and section
design, asked for a light orange-and-blue theme, and for blue primary actions. Read on
2026-09-09: `#fafafa` ground, navy ink `#121f31`, secondary `#394b63`, hairline `#e4e8ec`,
white cards at 24px with a three-layer soft shadow, panels at 32–64px, a floating frosted
pill nav, and a vertical gradient from sky `#badbfc` through mint into cream `#fdf7e8` and
peach `#fcedd1`. Their headings are centred and large; their primary is green.

What was taken, with our content and interactions unchanged:

| Element | Ours |
| --- | --- |
| Hero | A gradient sheet with big rounded bottom corners, running under the floating nav. Centred: status pill, headline with the serif closing words, supporting copy, blue primary + white secondary, then the rotating artboard, then the numbers in a frosted pill |
| Nav | Signature left, links in a frosted white pill centred, blue call to action right. Fixed |
| Work | Centred heading and subline, a soft blue "All projects" button, then the sticky stack inside a cream-to-peach panel; cards white with the shot on a faint blue tint |
| Testimonials | Sky panel, centred heading, arrows under it, the click-to-open row; blue avatar discs |
| Footer | The page runs out into peach: signature centred, three short columns, the year |
| Buttons | Primary is blue `#2f6cf6` (hover `#1f56d9`). Secondary is white with a hairline. A soft blue tint for tertiary |
| Everywhere | Blue for links inside cards, active nav, dots and dwell bar, the availability dot. The line grid is gone — the gradient does that job |

Refinement, same day: **orange out, lilac in.** The cream and peach stops are `#f3effc` and
`#e9e2fb`, so the gradient runs sky → lilac and the panels and footer follow. The hero sheet
now sits inside an even 12–16px margin with 32–48px corners on all four sides, and the nav
sits above it on the ground rather than over it.

Links are 600 everywhere (nav pills 700); the page container is 1200px. The active nav
pill is tinted soft blue.

**The hero artboard is gone (2026-09-09).** In its place a row of the brands Tanvir has
worked with — Salesforce, Burger King, Centerbase, ExamSoft (Turnitin), OpenClinica, TaxRise
Inc., Alokito Teachers, T-Mobile, AT&T, as he listed them — drifting sideways and easing to a
fifth of its speed while a mark is hovered. Five marks are in `public/brands/` (Salesforce, Burger King, T-Mobile,
AT&T, Turnitin for ExamSoft) from Wikimedia Commons and Simple Icons; the other four are
wordmarks until artwork turns up. `lib/brands.ts` picks files up at build time. A thin 44px
grid sits behind the hero content, masked to fade toward the sheet's edges. The list is his own
statement; profile.md's note about being precise on the nature of each engagement still
applies to any copy that expands on it.

Attention callouts, if ever used again, are ink on panel grey. A flagged problem is a meaning, not a decoration, and
turning it blue would say "resolved". The hero's four props are kept, but the sticky note
became the annotated screen and the portrait became the numbers; there is no portrait yet.

### The reference, analysed

Framer site, no canvas or WebGL anywhere. Read on 2026-09-08.

| Aspect | Finding |
| --- | --- |
| Ground | `#fefefe` with a dot grid: `radial-gradient(rgba(153,153,153,.2) .6px, transparent 1.4px)` at 15px |
| Type | Inter Display 500 for everything; Instrument Serif italic for one hero line; Nanum Pen Script on a sticky note |
| Text colours | `#141414` ink, `#9ea1a5` and `#9e9e9e` for secondary |
| Nav | Lower-case first-name wordmark with a full stop, three links, black pill button. Static, not sticky |
| Hero | Two-line centred headline (sans, then serif italic), "Previously at" line, four prop cards fanned like things on a desk |
| Work | "Latest work." on white, then a full-bleed `#141414` band where 604×360 cards stack — each `position: sticky` at the same offset so the next slides over the last. Left half dark `#1e1e1e` text, right half a flat colour with the product shot |
| About | The page pins. The paragraph darkens sentence by sentence and a pile of photos spreads into a loose grid, both driven by scroll |
| Testimonials | A dark `#141414` panel with 24px radius inside the container, "What others said.", a carousel of `#1e1e1e` cards with dots |
| Footer | Links left, signature and status right, then the wordmark set at viewport scale and cropped by the page edge |

### What was recreated, and with what content

| Reference element | Ours | Content source |
| --- | --- | --- |
| Headline in two voices | Sans first line, serif italic second, split at " with " | `heroHeadline` |
| "Previously at TikTok" | "Currently at MIADVG LLC" — first experience entry, "Currently" if its years say Present | `experience[0]` |
| Sticky note "cool stats" | Same, pen script on yellow | `stats` |
| Dark "I write about…" card | "4 case studies on how each product actually got made." → /work | project count |
| Portrait photo card | The latest cover, cropped, with a caption | `projects[0].coverImage` |
| Dictionary card "ai-augmented designer" | "ui/ux designer" with the four process steps as senses | `processSteps` |
| Stacked work cards | Same layout and stacking; panel colours cycle blue, maroon, purple, pale blue | projects |
| Pinned About with photo pile | Word-by-word darkening; five images spread — covers and gallery shots, since there are no personal photos yet | `aboutIntro`, `PILE_QUERY` |
| Testimonial panel | Same, with the relationship and date kept on each card | `testimonials` |
| Signature | The full name in Instrument Serif italic — there is no signature asset | `siteTitle` |
| "Based in …" and the live clock | **Not built.** Location is REQUIRES VERIFICATION in profile.md | — |
| Resume button | The Studio's CTA (Book a Call) — there is no résumé file in the project | `ctaUrl`, `ctaLabel` |

### Motion

All of it is scroll-driven or entry-only. Library: `motion` (Motion for React), with
`MotionConfig reducedMotion="user"` at the root and CSS keyframes zeroed in `globals.css`.

| Pattern | Built as | Reduced motion |
| --- | --- | --- |
| Hero cards | Rise in with stagger, settle at ±6°, straighten and lift on hover | Final state |
| Work stack | `position: sticky` in a tall parent. Native scroll, nothing hijacked | Same — it is layout, not animation |
| About pin | 280vh section, `sticky` child, `useScroll` progress drives per-word opacity and each photo's x/y/rotate | Rendered finished, section is its own height |
| Testimonials | Native scroll-snap; IntersectionObserver keeps the dots honest | Same |
| Wordmark | Rises in once on view | Opacity only |
| Everything else | `Reveal` fade-and-rise, once | Final state |

Still banned: loaders, parallax on images, and anything that delays reading. The pinned About
is the one place the page holds the reader, and it holds real copy while it does.

### Palette

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#fefefe` | Ground, with the dot grid |
| `--foreground` | `#141414` | Ink |
| `--muted` | `#9b9ba5` | Meta rows and captions |
| `--muted-strong` | `#6b6b73` | Body copy that is secondary but still read |
| `--dark` | `#141414` | The band and the testimonial panel |
| `--dark-2` | `#1e1e1e` | Cards inside dark surfaces |
| `--accent` | `#1e5ced` | The first work panel and the availability dot. Nowhere else |

## Reference: jaimec.co

Analysed 2026-09-08. Tanvir named this as the target feel: sleek, modern, clean, interactive,
subtle animation.

### What it actually is

| Aspect | Finding |
| --- | --- |
| Built with | Framer, animated with Motion (framer-motion) |
| Canvas / WebGL | **None.** Zero canvas elements, no Three.js, no 3D anywhere |
| Media | One video element |
| Page height | ~3,000px. The whole homepage is four work cards and a short intro |
| Background | `rgb(250, 250, 250)` — near-white, not pure |
| Text column | `max-width: 480px` — unusually narrow |
| Radii | `1000px` pills for nav, buttons, and tags; 8–16px for cards |
| Alignment | Home is centre-aligned; About is left-aligned |

### Where the "interactive" feeling comes from

Not from 3D. From four things, all cheap:

1. **The work cards are live UI, not screenshots.** A working filter panel with checkboxes and
   colour swatches. A browser-chrome mock with tabs. A layered protocol diagram. They read as
   product, not portfolio.
2. **Annotation callouts pinned to the UI** — "Navigation · No issues found" with a green tick,
   "Right rail · 1 critical issue" with a red warning. This is the single strongest device on
   the site: it shows design *judgement* on top of a screen, not just the screen.
3. **Tactile props.** A rotated yellow sticky note in the corner that opens contact details. An
   ID badge on a lanyard that hangs from the nav on the About page.
4. **Restraint everywhere else.** No parallax, no scroll-jacking, no loaders.

### What to take

- Live or annotated UI in the work cards instead of flat screenshots
- The annotation device — it suits "turning complexity into clarity" better than any 3D effect
- Pill nav, generous whitespace, near-white ground, soft card surfaces
- One playful tactile prop, not five

### What not to take

- **The narrow 480px column.** Fine for four cards with no case studies. This portfolio has
  four full case studies with personas, flows, and galleries — they need width.
- **The sticky nav pill overlaps content on scroll.** Visible on their own site: the project
  title renders straight through the nav. Do not copy the pattern without a solid background.
- **The shallow structure.** Their homepage carries almost no content. That is a different
  strategy from a portfolio built on case-study depth.

## Visual

**Decided 2026-09-08**, anchored on the jaimec.co analysis above.

| Area | Direction |
| --- | --- |
| Character | Sleek, modern, clean. Restraint over spectacle. |
| Ground | Near-white in light, near-black in dark. Never pure #fff or #000. |
| Surfaces | Soft raised cards on the ground, 12–20px radii. |
| Shape language | Pills for nav, buttons, and tags. Rounded rectangles for cards. |
| Space | Generous. Whitespace is the main compositional tool. |
| Width | 1280px page container (`--container-page`). Far wider than the 480px reference — the case studies need room. |
| Signature device | Annotation callouts pinned to real screenshots. |

| Area | Direction | Status |
| --- | --- | --- |
| Typography | Plus Jakarta Sans (Google Fonts); Geist Mono for eyebrows and meta | Decided |
| Composition | Centred hero, left-aligned reading content | Decided |
| Imagery treatment | Screenshots with annotation callouts, never bare | Decided |

### Palette

White ground, cool slate everything else. The first pass used a warm off-white and read
generic; the correction over-shot to a grey ground. White is the ground, slate carries
structure.

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#ffffff` | Page ground |
| `--accent` | `#1d4ed8` | Primary CTA. Royal blue, with a blue-tinted shadow rather than a neutral one |
| `--accent-hover` | `#1e40af` | Primary CTA hover |
| `--surface` | `#f8fafc` | Raised cards and rows |
| `--surface-strong` | `#f1f5f9` | Hover and pressed fills |
| `--foreground` | `#0a0f1c` | Text. Near-black |
| `--muted` | `#475569` | Secondary text. Slate-600 — 500 was too light to read as body copy |
| `--border` | `#e2e8f0` | Hairlines |
| `--highlight` | `#bfdbfe` | Marker swipe only |

### Elevation

Depth comes from a three-step shadow scale, each step two layers: a tight contact shadow plus
a wide ambient one. A single-layer shadow is what makes a raised surface read as a flat grey
box instead of a lifted one.

| Token | Use |
| --- | --- |
| `--shadow-sm` | Resting cards, rows, chips |
| `--shadow-md` | Primary buttons, images |
| `--shadow-lg` | Hover state on anything raised |
| `--shadow-inset` | A 1px inner top highlight on the dark primary button |

`.raised` is the card base; `.raised-hover` adds the 2px lift. Buttons are fully rounded
pills — `.btn` with `.btn-primary` or `.btn-secondary` — and press back down on `:active`,
so the depth responds rather than just decorating.

### Icons

Lucide (`lucide-react`), 15–17px, `strokeWidth` 2–2.5. Used for real affordances —
directional arrows, contact channels, About section headings, and annotation tone marks —
never as decoration beside a heading for its own sake.

Lucide dropped its brand icons, so socials use the platform name with a two-letter monogram
rather than a logo. That reads cleaner than mismatched brand marks anyway.

Annotation tone is now an icon, not a dot: a check for a resolved decision, a warning triangle
for a flagged problem, a minus for a neutral note. The icon carries the meaning without relying
on colour alone.

### Layout

| Token | Value | Use |
| --- | --- | --- |
| `--container-page` | 1080px | Header, footer, work index, covers |
| `--container-read` | 46rem | Body copy on case studies, About, Contact |

Long-form text stays at reading measure; images break out to page width with `.bleed`.

**Labels were removed from every section.** Putting a small mono eyebrow on each block made the
page read as a form. Hierarchy now comes from type size and rules.

### Tactile detail

One playful moment, per the interaction principles.

**Built: the availability chip.** A small status pill beside the name, set 1.6° off-square like
a label stuck on rather than laid out, straightening on hover. Its dot carries the same pulse as
the annotation dots, so the two read as one system. Driven by `availabilityShow` in the Studio —
it is a claim about him, so it has an off switch.

**Built: the highlighter swipe.** The closing words of the hero get a marker stroke that draws
in on entry. Cool blue, not the warm yellow of the first pass. It is the same gesture as annotating a screen, turned on his own sentence — so the
site's one flourish reinforces its signature device instead of competing with it.

The reference's sticky note and lanyard badge were deliberately not copied. A warm-grey palette
and pill shapes are common design vocabulary; those two props are that site's own identity.

**Avoid:** any visual choice that reduces usability, accessibility, or clarity.

**References:** REQUIRES VERIFICATION

## Interaction

| Principle | User value | Application | Accessibility |
| --- | --- | --- | --- |
| Show judgement, not just screens | A screenshot proves you shipped; an annotation proves you decided | Annotation callouts on covers and gallery images | Callout text lives in the DOM as real text, not baked into the image |
| Nothing blocks reading | Content is the product | No loaders, no entrance delays over 600ms | Content renders before animation runs |
| One playful moment, not five | Charm reads as confidence; charm everywhere reads as noise | A single tactile detail, placement TBD | Decorative, so hidden from assistive tech |

## Motion

| Area | Direction | Status |
| --- | --- | --- |
| Motion goals | Confirm arrival and hierarchy. Never announce itself. | Decided |
| Approved patterns | Fade-and-rise on entry; annotations drop in past their mark and settle; slow pulse on annotation dots; 1.5% cover scale and callout lift on card hover; arrows nudge; buttons rise 2px | Decided |
| Duration and easing | 300–600ms, `cubic-bezier(0.16, 1, 0.3, 1)`. Nothing longer. | Decided |
| Reduced-motion | Everything resolves to its final state instantly. Already enforced globally in `globals.css`. | Decided |
| Implementation | IntersectionObserver plus CSS transitions. No animation library — the patterns above do not need one. | Decided |
| Banned | Parallax, scroll-jacking, loading screens, anything that delays reading | Decided |

Reduced-motion behavior is not optional — every approved pattern needs a defined
`prefers-reduced-motion` fallback before it ships.

## Three.js

Three.js is optional. A concept is not approved implementation. Each concept must justify its
cost against usability, accessibility, responsiveness, and performance.

**Dropped, 2026-09-08 (morning). Reinstated that evening as a WebGL hero, then removed again
that night** when Tanvir rejected it — see "Direction change — paper" at the top. Three.js is
out of the project. The gate below still applies to any future proposal.

The reference achieves the exact feel that was asked for — sleek, modern, interactive — with
zero canvas and zero WebGL. Given a proven alternative, 3D could not justify its cost in
performance, accessibility, mobile behaviour, and build time. `three`, `@react-three/fiber`,
and `@react-three/drei` have been removed from the project.

This is reversible. If a specific concept later earns its place, the gate in `build-spec.md`
still applies: it must tell a story 2D cannot, have a non-WebGL fallback, and fit the
performance budget.

Gate for approval: the concept tells a story the page cannot tell without it, has a defined
non-WebGL fallback, and fits the performance budget in [build-spec.md](build-spec.md).

## Case Study Structure

Rebuilt after the first pass read as a form dump: seven identically weighted sections, each
labelled, each boxed. Now four acts, each a step in one story.

| Act | Holds |
| --- | --- |
| 01 The brief | Goal, target users |
| 02 What I found | Discovery note, insights, competitor analysis, personas |
| 03 How I built it | User flows, wireframes, visual direction, gallery, key screens |
| 04 What it set out to do | Measured outcomes if any, then expected outcomes |

Cards and grids were dropped in favour of rules and type hierarchy. Personas and key screens
are definition lists, not boxes. The meta row is a single inline strip, not a five-column grid.

## Site Structure

Home is work only — hero plus the project list. About and Contact are their own pages, so the
homepage stops being a scroll through everything at once.

## Image Lightbox

Case-study gallery images sit at reading-column width and open full size on click.

Built on a native `<dialog>` with `showModal()`, so focus trapping, an inert background, and
the backdrop come from the platform instead of being reimplemented. A 320ms scale-and-fade on
open, a blurred backdrop, a close button top-right, and the caption under the image.

Escape carries an explicit handler alongside the browser's own. The UA behaviour is real but
cannot be exercised through synthetic key events, and a lightbox that traps you is worse than
a redundant line of code.

Backdrop clicks close it by checking that the click target is the dialog itself — clicks on
the content never reach that element.

## Testimonials

The client list *is* the navigation. Picking a name swaps the quote, so the companies are the
interface rather than small print under a paragraph — which is what makes the names read as
credentials instead of decoration.

Built as a real tablist: arrow keys move between clients, Home and End jump to the ends, the
panel is labelled by its tab, and the quote block is keyed so the fade replays on change. On
narrow screens the tabs become a horizontally scrollable row above the quote.

Each card states the relationship — Client, Colleague, or Collaborator — and the date. A
recommendation from a teammate is not the same claim as one from a paying client, and
flattening the two would be the kind of quiet overstatement the rest of this site avoids.

## Site Structure

| Route | Holds |
| --- | --- |
| `/` | Hero, selected work in full, testimonials |
| `/work` | Compact grid index of every project |
| `/work/[slug]` | Case study, four acts |
| `/about` | Intro, stats, experience, education, services, toolkit |
| `/contact` | Channels |
