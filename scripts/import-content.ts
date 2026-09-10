/**
 * Imports project content and images into Sanity.
 *
 *   npx sanity exec scripts/import-content.ts --with-user-token
 *   SANITY_PROJECTS_ONLY=1 npx sanity exec scripts/import-content.ts --with-user-token
 *
 * Idempotent: documents use fixed _ids and are replaced on re-run. Images are
 * only uploaded when the document does not already reference one, so re-running
 * does not duplicate assets.
 */
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-09-08" });

type Project = {
  slug: string;
  title: string;
  order: number;
  coverAlt: string;
  galleryAlt: string[];
  galleryCaption?: string[];
  coverAnnotations?: Annotation[];
  [key: string]: unknown;
};

const projects: Project[] = JSON.parse(
  readFileSync(join(process.cwd(), "sanity/seed/projects.json"), "utf8"),
);

/**
 * Resolves an image asset by its original filename, uploading it only if the
 * dataset does not already hold one. Keyed on filename rather than on what the
 * document currently references, so a document that lost its reference is
 * relinked instead of re-uploaded.
 */
async function resolveAsset(path: string, filename: string) {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}`,
    { filename },
  );
  if (existing?._id) return existing._id;

  if (!existsSync(path)) {
    console.warn(`  ! missing ${path} — skipping`);
    return null;
  }
  const asset = await client.assets.upload("image", createReadStream(path), { filename });
  console.log(`  ↑ uploaded ${filename}`);
  return asset._id;
}

type Annotation = { label: string; note?: string; tone?: string; x: number; y: number };

function imageField(
  assetId: string,
  alt: string,
  caption?: string,
  annotations?: Annotation[],
) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt,
    ...(caption ? { caption } : {}),
    ...(annotations?.length
      ? { annotations: annotations.map((a, i) => ({ _key: `ann-${i}`, ...a })) }
      : {}),
  };
}

async function main() {
  for (const p of projects) {
    const id = `project-${p.slug}`;
    const dir = join(process.cwd(), "assets/projects", p.slug);
    const coverId = await resolveAsset(join(dir, "cover.jpg"), `${p.slug}-cover.jpg`);
    const coverImage = coverId
      ? imageField(coverId, p.coverAlt, undefined, p.coverAnnotations)
      : undefined;

    const gallery: unknown[] = [];
    for (let i = 1; i <= 4; i++) {
      const assetId = await resolveAsset(join(dir, `screen-${i}.jpg`), `${p.slug}-screen-${i}.jpg`);
      if (!assetId) continue;
      gallery.push({
        _key: `screen-${i}`,
        ...imageField(
          assetId,
          p.galleryAlt[i - 1] ?? `${p.title} screen ${i}`,
          p.galleryCaption?.[i - 1],
        ),
      });
    }

    // Give every array item a stable _key so Sanity does not complain.
    const keyed = (arr: unknown[] | undefined, prefix: string) =>
      (arr ?? []).map((item, i) =>
        typeof item === "string" ? item : { _key: `${prefix}-${i}`, ...(item as object) },
      );

    const doc: Record<string, unknown> = {
      _id: id,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      summary: p.summary,
      projectType: p.projectType,
      industry: p.industry,
      platform: p.platform,
      year: p.year,
      duration: p.duration,
      role: p.role,
      externalLabel: p.externalLabel,
      externalUrl: p.externalUrl,
      goal: p.goal,
      targetUsers: keyed(p.targetUsers as unknown[], "user"),
      discoveryNote: p.discoveryNote,
      insights: p.insights,
      competitorAnalysis: p.competitorAnalysis,
      personas: keyed(p.personas as unknown[], "persona"),
      userFlows: keyed(p.userFlows as unknown[], "flow"),
      wireframes: p.wireframes,
      visualDirection: p.visualDirection,
      keyScreens: keyed(p.keyScreens as unknown[], "screen"),
      expectedOutcomes: keyed(p.expectedOutcomes as unknown[], "outcome"),
      featured: true,
      order: p.order,
    };

    if (coverImage) doc.coverImage = coverImage;
    if (gallery?.length) doc.gallery = gallery;

    await client.createOrReplace(doc as never);
    console.log(`${p.slug}: document written`);
  }

  if (process.env.SANITY_PROJECTS_ONLY === "1") {
    console.log("\nDone. Project records written; site settings left unchanged.");
    return;
  }

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "Tanvir Ahassan",
    siteDescription:
      "UI/UX Designer with 7+ years of experience designing intuitive, user-friendly digital products for startups and enterprises.",
    heroHeadline: "Crafting seamless digital experiences with a human touch.",
    heroSupporting:
      "I'm Tanvir Ahassan, a UI/UX Designer with 7+ years of experience designing intuitive, user-friendly digital products for startups and enterprises.",
    ctaLabel: "Book a Call",
    availabilityLabel: "Available for hire",
    availabilityShow: true,
    // The old site's header button pointed at cal.com/babarogic — a leftover from
    // the Framer template, not Tanvir's calendar. This is the correct one.
    ctaUrl: "https://cal.com/tanvir-ahassan-hy2rwn/30min",
    email: "anik880@gmail.com",
    socials: [
      { _key: "so1", platform: "LinkedIn", url: "https://www.linkedin.com/in/tanvir-ahassan/" },
      { _key: "so2", platform: "Twitter", url: "https://x.com/ux_tanvir" },
      { _key: "so3", platform: "Dribbble", url: "https://dribbble.com/anik117" },
      { _key: "so4", platform: "Behance", url: "https://www.behance.net/anik117" },
    ],
    contactHeading: "Have a project in mind or just want to connect?",
    contactMessage:
      "I'm currently looking for a new remote role. If you're hiring, or you have a project that needs a designer, I'd like to hear about it.",
    // From LinkedIn recommendations, read 2026-09-08. Verbatim.
    testimonials: [
      {
        _key: "t1",
        quote:
          "Working with Tanvir on the Alokito Teachers website was a seamless experience. He designed a platform that is both user-friendly and visually engaging, while carefully aligning with our vision of building a comprehensive ecosystem for developing, assessing, and placing teachers, as well as supporting education institutions. His ability to combine functionality with clean, attractive design significantly improved the user experience of our platform.",
        name: "Azwa Nayeem",
        title: "Educator, Social Entrepreneur, and Founder",
        company: "Alokito Teachers",
        relationship: "Client",
        date: "Feb 2026",
        projectSlug: "alokito-teacher",
      },
      {
        _key: "t2",
        quote:
          "From the first interaction I had with Tanvir I knew I was dealing with someone who takes great care in his work. He was communicative, responsive, professional, and understanding. We delivered the scope of work to his team and when he gave us our first design examples I was blown away. The quality of his designs were top notch, his attention to detail was fantastic, and he was able to execute on our vision to the T.",
        name: "David Ventura",
        company: "SMART Battery Analytics",
        relationship: "Client",
        date: "Feb 2026",
      },
      {
        _key: "t3",
        quote:
          "Tanvir is an amazing part of my team. He brings so much to each project. Primarily he is great at communicating and even more important — at listening. His attention to the client produces the best designs that are always on point and appreciated by our clients. In addition to his work skills, Tanvir is also a person who keeps his word. Upfront, we agree on the work to be done, the timeline and cost. Tanvir has always come in on time and in budget.",
        name: "Barry Girsh",
        title: "CEO",
        company: "My Value Add Inc.",
        relationship: "Collaborator",
        date: "Feb 2026",
      },
      {
        _key: "t4",
        quote:
          "I had the pleasure of working with Tanvir for over a year and a half on various UX projects. His skills with Figma are exceptional and his designs are always intuitive and thought out. But what really sets him apart is his collaborative attitude — he's always willing to lend a hand and go above and beyond to help his teammates out and ensure the success of the project. Tanvir is a great communicator and would make an invaluable asset to any team.",
        name: "Krystian Bagunu",
        title: "Senior Product Designer",
        relationship: "Colleague",
        date: "Apr 2023",
      },
      {
        _key: "t5",
        quote:
          "Tanvir was incredible in the assistance of creating my website for my therapy and coaching business. Tanvir was kind, helpful, collaborative, and great to work with. His attention to detail is incredible! I highly recommend his services to anyone needing assistance in website or UX Design.",
        name: "Jason Sleisenger",
        title: "M.A., LPCC, NCC — psychotherapy and coaching",
        relationship: "Client",
        date: "Feb 2026",
      },
    ],
    aboutIntro:
      "I started with a degree in Software Engineering, which gave me a foundation in technology, problem-solving, and systems thinking. Working in tech is where I found my interest in how people actually use digital products, and that is what moved me into UI/UX design.",
    // Only tools there is actual evidence for: Figma (the Ibadat prototype link),
    // Framer (the old site), Sanity (this one). Add the rest in the Studio.
    toolkit: ["Figma", "Framer", "Sanity"],
    // From LinkedIn, 2026-09-08. Most recent first.
    experience: [
      {
        _key: "x1",
        role: "UI/UX Designer",
        organization: "MIADVG LLC · Full-time · Bangladesh",
        years: "Apr 2020 — Present",
        summary:
          "Leading end-to-end UI/UX design processes for web and mobile applications, and collaborating with cross-functional teams to align user experience with business goals.",
      },
      {
        _key: "x2",
        role: "Product Designer",
        organization: "DigiTruck Bangladesh · Full-time · Mirpur DOHS",
        years: "Jul 2019 — Apr 2020",
        summary:
          "Designed user interfaces for mobile and web applications, working closely with developers to implement pixel-perfect UI components.",
      },
      {
        _key: "x3",
        role: "Visualizer",
        organization: "Lie to Eye · Full-time · Gulshan 1, Dhaka",
        years: "Dec 2018 — Jun 2019",
        summary:
          "Designed visual assets including illustrations, icons, and marketing materials, and developed creative concepts for branding and advertising campaigns.",
      },
      {
        _key: "x4",
        role: "Front-end Engineer, Intern",
        organization: "Monstarlab · Internship · Bangladesh",
        years: "Jan 2017 — Jun 2017",
        summary:
          "Assisted in front-end development with HTML, CSS, and JavaScript frameworks, implementing UI components alongside the design team.",
      },
      {
        _key: "x5",
        role: "Graphic Design Intern",
        organization: "10 Minute School · Bangladesh",
        years: "Feb 2017 — Apr 2017",
      },
    ],
    education: [
      {
        _key: "e1",
        qualification: "BSc in Software Engineering, Computer Science",
        institution: "Institute of Information Technology (IIT), University of Dhaka",
        years: "2014 — 2018",
        note: 'General member of the Dhaka University IT Society.',
      },
    ],
    aboutHeading: "Designing Digital Solutions With Impact",
    aboutParagraphs: [
      "Collaboration is at the heart of my work. I enjoy partnering with developers, product managers, and stakeholders to create seamless workflows and efficient design systems. My goal is always to bridge the gap between creativity and functionality — delivering designs that are visually appealing, intuitive, and aligned with both business objectives and user expectations.",
    ],
    services: [
      { _key: "s1", name: "UI/UX Design", description: "Crafting user-centered digital experiences through research, wireframing, prototyping, and testing. Every design decision is made with the user in mind." },
      { _key: "s2", name: "Design System", description: "Building scalable design systems to ensure consistency, efficiency, and seamless collaboration between design and development teams." },
      { _key: "s3", name: "Design Consultation", description: "Helping startups and businesses refine their digital products by identifying usability issues, improving workflows, and aligning design with business goals." },
    ],
    stats: [
      { _key: "st1", value: "7+", label: "Years designing" },
      { _key: "st2", value: "15+", label: "Completed projects" },
      { _key: "st3", value: "20+", label: "Clients" },
    ],
    clientsNote:
      "I've had the opportunity to design for a variety of industries — from enterprise SaaS to consumer brands. My collaborations with companies like Salesforce, Burger King, Centerbase, ZO Skin Centre, and Accurate have allowed me to solve complex design challenges at scale while keeping the user at the center of every solution.",
    processSteps: [
      { _key: "p1", name: "Discover" },
      { _key: "p2", name: "Define" },
      { _key: "p3", name: "Design" },
      { _key: "p4", name: "Deliver" },
    ],
  } as never);
  console.log("siteSettings: written");

  console.log("\nDone. Measured outcomes, role, and external URLs are intentionally empty.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
