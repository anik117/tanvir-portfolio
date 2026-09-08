import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "home", title: "Homepage" },
    { name: "about", title: "About page" },
    { name: "contact", title: "Contact page" },
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

    defineField({
      name: "testimonials",
      type: "array",
      group: "home",
      description: "Real recommendations only. Each one names who said it and how they know you.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "quote", type: "text", rows: 6, validation: (r) => r.required() }),
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "company", type: "string" }),
            defineField({
              name: "logo",
              type: "image",
              description: "The company's mark. A monogram placeholder is shown until one is added.",
              options: { hotspot: true },
            }),
            defineField({
              name: "relationship",
              type: "string",
              description: "How they worked with you. Shown on the card, so keep it accurate.",
              options: { list: ["Client", "Colleague", "Collaborator"] },
              initialValue: "Client",
            }),
            defineField({ name: "date", type: "string" }),
            defineField({
              name: "projectSlug",
              type: "string",
              description: "Optional. Links the quote to a case study, e.g. alokito-teacher.",
            }),
          ],
          preview: { select: { title: "name", subtitle: "company" } },
        }),
      ],
    }),

    defineField({ name: "aboutIntro", type: "text", rows: 3, group: "about" }),
    defineField({
      name: "education",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "qualification", type: "string", validation: (r) => r.required() }),
            defineField({ name: "institution", type: "string" }),
            defineField({ name: "years", type: "string" }),
            defineField({ name: "note", type: "string" }),
          ],
          preview: { select: { title: "qualification", subtitle: "institution" } },
        }),
      ],
    }),
    defineField({
      name: "experience",
      type: "array",
      group: "about",
      description: "Most recent first.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "role", type: "string", validation: (r) => r.required() }),
            defineField({ name: "organization", type: "string" }),
            defineField({ name: "years", type: "string" }),
            defineField({ name: "summary", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "role", subtitle: "organization" } },
        }),
      ],
    }),
    defineField({
      name: "toolkit",
      title: "Toolkit",
      type: "array",
      group: "about",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({ name: "contactHeading", type: "string", group: "contact" }),
    defineField({ name: "contactMessage", type: "text", rows: 3, group: "contact" }),
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
