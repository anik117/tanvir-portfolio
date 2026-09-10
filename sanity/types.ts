import type { SanityImageSource } from "@sanity/image-url";

export type Annotation = {
  _key?: string;
  label: string;
  note?: string;
  tone?: "positive" | "attention" | "neutral";
  x: number;
  y: number;
};

export type SanityImage = SanityImageSource & {
  alt?: string;
  caption?: string;
  annotations?: Annotation[];
};

export type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  projectType?: string;
  summary?: string;
  industry?: string;
  year?: string;
  coverImage?: SanityImage;
};

export type Persona = {
  _key?: string;
  name: string;
  context?: string;
  wants?: string;
  preferences?: string;
  motivations?: string;
};

export type Labelled = { _key?: string; label: string; description?: string };
export type Named = { _key?: string; name: string; description?: string };
export type Flow = { _key?: string; name: string; steps?: string };
export type Metric = { _key?: string; label: string; value: string; evidence: string };

export type Project = ProjectCard & {
  platform?: string;
  duration?: string;
  role?: string;
  externalUrl?: string;
  externalLabel?: string;
  goal?: string;
  targetUsers?: Labelled[];
  discoveryNote?: string;
  insights?: string[];
  competitorAnalysis?: string[];
  personas?: Persona[];
  userFlows?: Flow[];
  wireframes?: string[];
  visualDirection?: string[];
  keyScreens?: Named[];
  expectedOutcomes?: Labelled[];
  outcomes?: Metric[];
  gallery?: SanityImage[];
  others?: ProjectCard[];
};

export type SiteSettings = {
  siteTitle?: string;
  siteDescription?: string;
  availabilityShow?: boolean;
  availabilityLabel?: string;
  heroHeadline?: string;
  heroSupporting?: string;
  services?: Named[];
  testimonials?: {
    _key?: string;
    quote: string;
    name: string;
    title?: string;
    company?: string;
    logo?: SanityImage;
    relationship?: string;
    date?: string;
    projectSlug?: string;
  }[];
  aboutHeading?: string;
  aboutParagraphs?: string[];
  stats?: { _key?: string; value: string; label: string }[];
  brands?: { _key?: string; name: string; logo?: string }[];
  clientsNote?: string;
  processSteps?: Named[];
  aboutIntro?: string;
  aboutAiHeading?: string;
  aboutAiIntro?: string;
  aboutAiSteps?: Named[];
  education?: { _key?: string; qualification: string; institution?: string; years?: string; note?: string }[];
  experience?: { _key?: string; role: string; organization?: string; years?: string; summary?: string }[];
  toolkit?: string[];
  contactHeading?: string;
  contactMessage?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  email?: string;
  socials?: { _key?: string; platform: string; url: string }[];
};
