import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "projectType",
      title: "Type",
      type: "string",
      options: {
        list: [
          "Website redesign",
          "Mobile app",
          "Web app",
          "Design system",
          "Other",
        ],
      },
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      description: "One or two sentences for the work card.",
      validation: (rule) => rule.max(240),
    }),
    defineField({ name: "role", type: "string", description: "Your role on this project." }),
    defineField({ name: "timeline", type: "string", description: "e.g. 2024, 3 months" }),
    defineField({
      name: "team",
      type: "array",
      of: [{ type: "string" }],
      description: "Collaborators and their roles.",
      options: { layout: "tags" },
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "outcomes",
      title: "Outcomes",
      type: "array",
      description:
        "Only add an outcome you can back up. Evidence is required — an unbacked metric is the first thing an interviewer will probe.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "evidence",
              type: "string",
              description: "Where this number comes from. Required.",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Case study",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "caption", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers show first. The first project carries the most weight.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "projectType", media: "coverImage" },
  },
});
