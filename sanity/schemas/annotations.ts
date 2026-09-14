import { defineArrayMember, defineField } from "sanity";

/** Callouts pinned to an image, positioned as percentages of its box. */
export const annotations = defineField({
  name: "annotations",
  title: "Annotations",
  description:
    "Design decisions pinned to the screen. This is the signature device — a screenshot shows what shipped, an annotation shows what you decided.",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      fields: [
        defineField({ name: "label", type: "string", validation: (r) => r.required() }),
        defineField({ name: "note", type: "string", description: "One short line of reasoning." }),
        defineField({
          name: "tone",
          type: "string",
          initialValue: "neutral",
          options: { list: ["positive", "attention", "neutral"], layout: "radio" },
        }),
        defineField({
          name: "x",
          type: "number",
          description: "Horizontal position, 0–100 (% from left).",
          validation: (r) => r.required().min(0).max(100),
        }),
        defineField({
          name: "y",
          type: "number",
          description: "Vertical position, 0–100 (% from top).",
          validation: (r) => r.required().min(0).max(100),
        }),
      ],
      preview: { select: { title: "label", subtitle: "note" } },
    }),
  ],
});
