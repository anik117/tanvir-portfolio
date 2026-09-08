import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "home", title: "Homepage" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    defineField({ name: "siteTitle", type: "string", group: "general" }),
    defineField({ name: "siteDescription", type: "text", rows: 2, group: "general", description: "Meta description." }),

    defineField({
      name: "availabilityShow",
      title: "Show availability chip",
      type: "boolean",
      group: "home",
      description: "Turn off when you are not taking work. This is a claim about you — keep it true.",
      initialValue: false,
    }),
    defineField({
      name: "availabilityLabel",
      type: "string",
      group: "home",
      initialValue: "Available for new work",
    }),
    defineField({ name: "heroHeadline", type: "string", group: "home" }),
    defineField({ name: "heroSupporting", type: "text", rows: 3, group: "home" }),
    defineField({
      name: "services",
      type: "array",
      group: "home",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "name", subtitle: "description" } },
        }),
      ],
    }),
    defineField({ name: "aboutHeading", type: "string", group: "home" }),
    defineField({
      name: "aboutParagraphs",
      type: "array",
      group: "home",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "stats",
      type: "array",
      group: "home",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "clientsNote",
      type: "text",
      rows: 3,
      group: "home",
      description: "Be precise about whether each was employment, agency, or contract work.",
    }),
    defineField({
      name: "processSteps",
      type: "array",
      group: "home",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", rows: 2, description: "Not on the old site — still to write." }),
          ],
          preview: { select: { title: "name", subtitle: "description" } },
        }),
      ],
    }),

    defineField({ name: "contactHeading", type: "string", group: "contact" }),
    defineField({ name: "ctaLabel", type: "string", group: "contact", initialValue: "Get in touch" }),
    defineField({ name: "ctaUrl", type: "url", group: "contact" }),
    defineField({ name: "email", type: "string", group: "contact" }),
    defineField({
      name: "socials",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: { list: ["LinkedIn", "Twitter", "Dribbble", "Behance", "GitHub", "Other"] },
              validation: (r) => r.required(),
            }),
            defineField({ name: "url", type: "url", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
