# Design Direction

Portfolio-wide visual, motion, interaction, and 3D direction. Approved direction here is a
source of truth for design work. Inspiration is not direction until it is approved.

## Starting Point

**The design is fully new.** The current Framer site at <https://tanvirux.framer.website/> is
being retired, and its visual language is *not* a constraint on this build — no colors,
type, layout, or component decisions carry over.

What does carry over is content: bio, services, process, stats, and client list, captured in
[profile.md](profile.md) and [content.md](content.md). Reference the copy, not the look.

## Visual

**Desired qualities:** Premium, modern, super clean. Further qualities REQUIRES VERIFICATION.

A blank slate needs an anchor before component work starts. Nothing below is decided.

| Area | Direction | Status |
| --- | --- | --- |
| Typography | — | REQUIRES VERIFICATION |
| Color | — | REQUIRES VERIFICATION |
| Composition and grid | — | REQUIRES VERIFICATION |
| Imagery treatment | — | REQUIRES VERIFICATION |

**Avoid:** any visual choice that reduces usability, accessibility, or clarity.

**References:** REQUIRES VERIFICATION

## Interaction

Interactions must support storytelling and usability. One row per principle.

| Principle | User value | Application | Accessibility consideration |
| --- | --- | --- | --- |
| REQUIRES VERIFICATION | — | — | — |

## Motion

| Area | Direction | Status |
| --- | --- | --- |
| Motion goals | — | REQUIRES VERIFICATION |
| Approved patterns | — | REQUIRES VERIFICATION |
| Duration and easing scale | — | REQUIRES VERIFICATION |
| Reduced-motion behavior | — | REQUIRES VERIFICATION |
| Performance limits | — | REQUIRES VERIFICATION |

Reduced-motion behavior is not optional — every approved pattern needs a defined
`prefers-reduced-motion` fallback before it ships.

## Three.js

Three.js is optional. A concept is not approved implementation. Each concept must justify its
cost against usability, accessibility, responsiveness, and performance.

| Concept | Storytelling value | Placement | Fallback | Risk | Status |
| --- | --- | --- | --- | --- | --- |
| REQUIRES VERIFICATION | — | — | — | — | Not approved |

Gate for approval: the concept tells a story the page cannot tell without it, has a defined
non-WebGL fallback, and fits the performance budget in [build-spec.md](build-spec.md).
