import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", type: "string" }),
    defineField({
      name: "siteDescription",
      type: "text",
      rows: 2,
      description: "Used as the meta description.",
    }),
    defineField({
      name: "heroHeadline",
      type: "string",
      description:
        "Unresolved in docs/profile.md: 'Turning complexity into clarity' vs the old Framer line. Decide before launch.",
    }),
    defineField({ name: "heroSupporting", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", type: "string", initialValue: "Get in touch" }),
    defineField({ name: "ctaUrl", type: "url" }),
    defineField({ name: "email", type: "string" }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: {
                list: ["LinkedIn", "Twitter", "Dribbble", "Behance", "GitHub", "Other"],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
