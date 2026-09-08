import { groq } from "next-sanity";

const CARD = `
  _id, title, "slug": slug.current, projectType, summary,
  industry, year, coverImage
`;

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) { ${CARD} }
`;

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${CARD},
    platform, duration, role, externalUrl, externalLabel,
    goal, targetUsers, discoveryNote, insights, competitorAnalysis,
    personas, userFlows, wireframes, visualDirection, keyScreens,
    expectedOutcomes, outcomes, gallery, body,
    "others": *[_type == "project" && slug.current != $slug] | order(order asc)[0...3] { ${CARD} }
  }
`;

export const PROJECT_SLUGS_QUERY = groq`
  *[_type == "project" && defined(slug.current)].slug.current
`;

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteTitle, siteDescription, heroHeadline, heroSupporting,
    services, aboutHeading, aboutParagraphs, stats, clientsNote, processSteps,
    contactHeading, ctaLabel, ctaUrl, email, socials
  }
`;
