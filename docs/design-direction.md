# Design Direction

Portfolio-wide visual, motion, interaction, and 3D direction. Approved direction here is a
source of truth for design work. Inspiration is not direction until it is approved.

## Starting Point

**The design is fully new.** The current Framer site at <https://tanvirux.framer.website/> is
being retired, and its visual language is *not* a constraint on this build — no colors,
type, layout, or component decisions carry over.

What does carry over is content: bio, services, process, stats, and client list, captured in
[profile.md](profile.md) and [content.md](content.md). Reference the copy, not the look.

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
| Width | Wider than the 480px reference — the case studies need room. |
| Signature device | Annotation callouts pinned to real screenshots. |

| Area | Direction | Status |
| --- | --- | --- |
| Typography | Geist Sans, Geist Mono for eyebrows and meta | Working |
| Color | Neutral warm greys, one accent reserved for annotation tone | Working |
| Composition | Centred hero, left-aligned reading content | Decided |
| Imagery treatment | Screenshots with annotation callouts, never bare | Decided |

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
| Approved patterns | Fade-and-rise on scroll entry; subtle scale on card hover; annotation callouts settling in after their image | Decided |
| Duration and easing | 300–600ms, `cubic-bezier(0.16, 1, 0.3, 1)`. Nothing longer. | Decided |
| Reduced-motion | Everything resolves to its final state instantly. Already enforced globally in `globals.css`. | Decided |
| Implementation | IntersectionObserver plus CSS transitions. No animation library — the patterns above do not need one. | Decided |
| Banned | Parallax, scroll-jacking, loading screens, anything that delays reading | Decided |

Reduced-motion behavior is not optional — every approved pattern needs a defined
`prefers-reduced-motion` fallback before it ships.

## Three.js

Three.js is optional. A concept is not approved implementation. Each concept must justify its
cost against usability, accessibility, responsiveness, and performance.

**Dropped, 2026-09-08.** No 3D on this site.

The reference achieves the exact feel that was asked for — sleek, modern, interactive — with
zero canvas and zero WebGL. Given a proven alternative, 3D could not justify its cost in
performance, accessibility, mobile behaviour, and build time. `three`, `@react-three/fiber`,
and `@react-three/drei` have been removed from the project.

This is reversible. If a specific concept later earns its place, the gate in `build-spec.md`
still applies: it must tell a story 2D cannot, have a non-WebGL fallback, and fit the
performance budget.

Gate for approval: the concept tells a story the page cannot tell without it, has a defined
non-WebGL fallback, and fits the performance budget in [build-spec.md](build-spec.md).
