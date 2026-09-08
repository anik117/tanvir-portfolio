import { defineArrayMember, defineField, defineType } from "sanity";

const bullets = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [{ type: "string" }],
  });

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "meta", title: "Meta", default: true },
    { name: "process", title: "Process" },
    { name: "design", title: "Design" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "meta", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      group: "meta",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "projectType",
      title: "Type",
      type: "string",
      group: "meta",
      options: { list: ["Website Redesign", "Website Redesign + Job Portal", "Mobile App Design", "Web App", "Design System", "Other"] },
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      group: "meta",
      description: "One or two sentences for the work card and the page intro.",
      validation: (r) => r.max(280),
    }),
    defineField({ name: "industry", type: "string", group: "meta" }),
    defineField({ name: "platform", type: "string", group: "meta" }),
    defineField({ name: "year", type: "string", group: "meta" }),
    defineField({ name: "duration", type: "string", group: "meta" }),
    defineField({ name: "role", type: "string", group: "meta", description: "Your role. Not on the old site — fill in." }),
    defineField({ name: "externalUrl", type: "url", group: "meta", title: "External link" }),
    defineField({
      name: "externalLabel",
      type: "string",
      group: "meta",
      initialValue: "Visit Website",
      options: { list: ["Visit Website", "View Prototype", "View on App Store"] },
    }),

    defineField({ name: "goal", type: "text", rows: 3, group: "process" }),
    defineField({
      name: "targetUsers",
      type: "array",
      group: "process",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "label", subtitle: "description" } },
        }),
      ],
    }),
    defineField({ name: "discoveryNote", title: "Discovery note", type: "text", rows: 2, group: "process" }),
    { ...bullets("insights", "Key insights", "What discovery actually surfaced."), group: "process" },
    { ...bullets("competitorAnalysis", "Competitor analysis"), group: "process" },
    defineField({
      name: "personas",
      type: "array",
      group: "process",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "context", type: "string", description: "e.g. 35, Small Business Owner" }),
            defineField({ name: "wants", type: "text", rows: 2 }),
            defineField({ name: "preferences", type: "text", rows: 2 }),
            defineField({ name: "motivations", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "name", subtitle: "context" } },
        }),
      ],
    }),
    defineField({
      name: "userFlows",
      type: "array",
      group: "process",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "steps", type: "string", description: "e.g. Homepage → Services → Contact form" }),
          ],
          preview: { select: { title: "name", subtitle: "steps" } },
        }),
      ],
    }),
    { ...bullets("wireframes", "Wireframes", "What the wireframing stage covered."), group: "process" },

    { ...bullets("visualDirection", "Visual direction"), group: "design" },
    defineField({
      name: "keyScreens",
      type: "array",
      group: "design",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "name", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "expectedOutcomes",
      title: "Expected outcomes",
      type: "array",
      group: "design",
      description:
        "Qualitative outcomes that were designed for but not measured. These render labelled as expected, never as results.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "label", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "outcomes",
      title: "Measured outcomes",
      type: "array",
      group: "design",
      description:
        "Real numbers only. Evidence is required — an unbacked metric is the first thing an interviewer will probe. Use Expected outcomes for anything you cannot source.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
            defineField({ name: "evidence", type: "string", description: "Where this number comes from. Required.", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),

    defineField({
      name: "coverImage",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text", validation: (r) => r.required() })],
    }),
    defineField({
      name: "gallery",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text", validation: (r) => r.required() }),
            defineField({ name: "caption", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Extra notes",
      type: "array",
      group: "design",
      description: "Free-form content that does not fit the structured fields above.",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text", validation: (r) => r.required() }),
            defineField({ name: "caption", type: "string" }),
          ],
        },
      ],
    }),

    defineField({ name: "featured", type: "boolean", group: "meta", initialValue: false }),
    defineField({
      name: "order",
      type: "number",
      group: "meta",
      description: "Lower numbers show first. The first project carries the most weight.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "projectType", media: "coverImage" } },
});
