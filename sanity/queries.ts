import { groq } from "next-sanity";

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    projectType,
    summary,
    coverImage,
    featured
  }
`;

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    projectType,
    summary,
    role,
    timeline,
    team,
    coverImage,
    outcomes,
    body
  }
`;

export const PROJECT_SLUGS_QUERY = groq`
  *[_type == "project" && defined(slug.current)].slug.current
`;

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    heroHeadline,
    heroSupporting,
    ctaLabel,
    ctaUrl,
    email,
    socials
  }
`;
