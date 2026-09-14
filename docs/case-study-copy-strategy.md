# Case-study copy strategy

The project pages are written for a design leader scanning quickly, then deciding whether the
work is worth a closer read.

## Two layouts

A project can be written either way.

**Chapters** (`chapters` in the Studio) — an ordered list of typed sections that the page renders
in sequence: statement, cards, media, flow or timeline, metrics, team. Use this for a full
case study. TaxRise is the reference.

**Four acts** — the original layout, driven by `goal`, `insights`, `keyScreens` and the rest.
It renders whenever a project has no chapters.

A project with chapters ignores the act fields on its page; keep one source of truth rather than
two. `summary` still feeds the work cards and the page description in both layouts.

A chapter that needs an image it does not have yet lists it under `pending`, and the page draws a
labelled empty slot. A gap shown as a gap is better than a placeholder image pretending to be work.

## Public reading path

1. **Project summary** — one specific sentence about the intervention, not a list of adjectives.
2. **The challenge** — the problem and the audiences it affected.
3. **What shaped the work** — only observations that can be traced to the brief, stakeholders,
   designs, or documented research.
4. **Key decisions** — three moves that connect a problem to a visible design response.
5. **Measured impact** — shown only when a result and its evidence are available.

User flows, wireframes, competitor notes, and visual-direction notes remain available in
collapsed sections. They support the story without interrupting it.

## Writing rules

- Prefer concrete nouns and verbs over phrases such as “modern,” “seamless,” “user-friendly,”
  “boost conversions,” or “increase trust.”
- Do not repeat the same point in the summary, goal, insights, decisions, and outcomes.
- Do not publish demographic personas unless the research behind them is documented.
- Describe what the design changed. Do not present an intended outcome as a measured result.
- Keep the designer visible with plain first-person language where ownership is verified.
- Use three strong decisions rather than a complete inventory of screens.

## Evidence boundary

No measured outcomes are currently included in the seed data. When evidence becomes available,
add the result with its source to `outcomes`; the page will then reveal a measured-impact
section automatically.
