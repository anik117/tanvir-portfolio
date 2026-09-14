import { defineArrayMember, defineField, defineType } from "sanity";
import { annotations } from "./annotations";

/*
  Chapters are the long-form case study: an ordered list of typed sections that
  a project page renders in sequence. The older four-act fields still drive any
  project that has no chapters, so the two can live side by side while the
  studies are rewritten one at a time.

  Six types, deliberately. Every extra type is another way for two sections to
  end up looking the same; the variants inside each type are where the rhythm
  comes from.
*/

/** Shared header fields. A factory, so each type owns its own field objects. */
const head = () => [
  defineField({
    name: "navLabel",
    title: "Index label",
    type: "string",
    description:
      "Shown in the sticky index beside the page. Leave empty to keep this chapter out of the index — most chapters should be empty.",
  }),
  defineField({ name: "eyebrow", type: "string", description: "Small label above the heading." }),
  defineField({ name: "heading", type: "string" }),
  defineField({
    name: "lead",
    type: "text",
    rows: 4,
    description: "One or two short paragraphs. Blank line between them.",
  }),
];

const preview = (subtitle: string) => ({
  select: { title: "heading", eyebrow: "eyebrow" },
  prepare: ({ title, eyebrow }: { title?: string; eyebrow?: string }) => ({
    title: title || eyebrow || subtitle,
    subtitle,
  }),
});

/** An image inside a chapter: alt, a caption, and an optional corner label. */
export const chapterImage = defineType({
  name: "chapterImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "alt", type: "string", title: "Alt text", validation: (r) => r.required() }),
    defineField({ name: "caption", type: "string" }),
    defineField({
      name: "label",
      type: "string",
      description: 'Corner tag — e.g. "Before", "After", "Reusable template".',
    }),
    annotations,
  ],
});

/** Prose. The workhorse: challenge, goal statements, takeaway. */
export const statementChapter = defineType({
  name: "statementChapter",
  title: "Statement",
  type: "object",
  fields: [
    ...head(),
    defineField({
      name: "points",
      title: "Points",
      type: "array",
      of: [{ type: "string" }],
      description: "Optional bullets under the lead.",
    }),
    defineField({
      name: "facts",
      title: "Fact row",
      type: "array",
      of: [{ type: "string" }],
      description: 'Three or four short lines under the copy — e.g. "20+ pages". Not sentences.',
    }),
    defineField({
      name: "layout",
      type: "string",
      initialValue: "split",
      options: {
        list: [
          { title: "Heading left, copy right", value: "split" },
          { title: "Stacked", value: "stacked" },
          { title: "Centred pull-quote", value: "pull" },
        ],
      },
    }),
    defineField({
      name: "tone",
      type: "string",
      initialValue: "plain",
      options: {
        list: [
          { title: "On the page", value: "plain" },
          { title: "Soft panel", value: "soft" },
          { title: "Dark band", value: "dark" },
        ],
      },
    }),
  ],
  preview: preview("Statement"),
});

/** Numbered or plain cards. Problems, goals, groups of decisions. */
export const cardsChapter = defineType({
  name: "cardsChapter",
  title: "Cards",
  type: "object",
  fields: [
    ...head(),
    defineField({ name: "numbered", type: "boolean", initialValue: true }),
    defineField({
      name: "columns",
      type: "number",
      initialValue: 3,
      options: { list: [2, 3] },
    }),
    defineField({
      name: "items",
      type: "array",
      validation: (r) => r.min(1),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
    }),
  ],
  preview: preview("Cards"),
});

/** Screens. One big one, a pair, a grid, or a before/after. */
export const mediaChapter = defineType({
  name: "mediaChapter",
  title: "Media",
  type: "object",
  fields: [
    ...head(),
    defineField({
      name: "layout",
      type: "string",
      initialValue: "single",
      options: {
        list: [
          { title: "One full-width image", value: "single" },
          { title: "Two side by side", value: "duo" },
          { title: "Grid — two columns", value: "grid" },
          { title: "Grid — three columns", value: "grid3" },
          { title: "Before / after", value: "beforeAfter" },
          { title: "One large image, then a grid", value: "featureGrid" },
        ],
      },
    }),
    defineField({
      name: "feature",
      title: "Feature image",
      type: "array",
      of: [defineArrayMember({ type: "chapterImage" })],
      validation: (r) => r.max(1),
      description: "Layout \"One large image, then a grid\" only: the image that runs full width above the grid.",
    }),
    defineField({
      name: "featurePending",
      title: "Feature slot still needed",
      type: "string",
      description: "Stands in for the feature image while it does not exist, as a tall dashed slot.",
    }),
    defineField({
      name: "facts",
      title: "Fact row",
      type: "array",
      of: [{ type: "string" }],
      description: "Three short lines between the copy and the images. Not sentences.",
    }),
    defineField({ name: "images", type: "array", of: [defineArrayMember({ type: "chapterImage" })] }),
    defineField({
      name: "pending",
      title: "Assets still needed",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Each line renders as an empty, dashed slot on the page — an honest gap rather than a stand-in image. Delete a line once its image is in place.",
    }),
    defineField({ name: "note", type: "string", description: "One small line under the images." }),
  ],
  preview: preview("Media"),
});

/** A sequence: a user flow, or an iteration timeline. */
export const flowChapter = defineType({
  name: "flowChapter",
  title: "Flow / timeline",
  type: "object",
  fields: [
    ...head(),
    defineField({
      name: "variant",
      type: "string",
      initialValue: "flow",
      options: {
        list: [
          { title: "Flow — arrows between steps", value: "flow" },
          { title: "Timeline — numbered stages", value: "timeline" },
        ],
      },
    }),
    defineField({
      name: "steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "note", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "note" } },
        }),
      ],
    }),
    defineField({
      name: "images",
      title: "Diagram",
      type: "array",
      of: [defineArrayMember({ type: "chapterImage" })],
    }),
    defineField({
      name: "pending",
      title: "Assets still needed",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: preview("Flow"),
});

/** Numbers. A measured value carries its source; an unmeasured one says so. */
export const metricsChapter = defineType({
  name: "metricsChapter",
  title: "Metrics",
  type: "object",
  fields: [
    ...head(),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "value",
              type: "string",
              description: "The number. Leave empty while it is still unverified.",
            }),
            defineField({
              name: "evidence",
              type: "string",
              description: "Where the number comes from. Required once a value is set.",
            }),
            defineField({
              name: "status",
              type: "string",
              initialValue: "pending",
              options: {
                list: [
                  { title: "Verified — has a source", value: "verified" },
                  { title: "Pending — renders as a marked gap", value: "pending" },
                ],
                layout: "radio",
              },
            }),
          ],
          validation: (r) =>
            r.custom((item: { status?: string; value?: string; evidence?: string } | undefined) => {
              if (item?.status !== "verified") return true;
              if (!item.value) return "A verified metric needs a value.";
              if (!item.evidence) return "A verified metric needs its source.";
              return true;
            }),
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({ name: "note", type: "text", rows: 3, description: "The paragraph under the numbers." }),
  ],
  preview: preview("Metrics"),
});

/** How the work was split across the team. */
export const teamChapter = defineType({
  name: "teamChapter",
  title: "Team",
  type: "object",
  fields: [
    ...head(),
    defineField({ name: "leadName", type: "string", initialValue: "Me" }),
    defineField({ name: "leadRole", type: "string" }),
    defineField({
      name: "responsibilities",
      title: "What I held",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "members",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "role", type: "string" }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        }),
      ],
    }),
  ],
  preview: preview("Team"),
});

export const chapterTypes = [
  chapterImage,
  statementChapter,
  cardsChapter,
  mediaChapter,
  flowChapter,
  metricsChapter,
  teamChapter,
];

export const chapterMemberNames = [
  "statementChapter",
  "cardsChapter",
  "mediaChapter",
  "flowChapter",
  "metricsChapter",
  "teamChapter",
] as const;
