/**
 * Imports project content and images into Sanity.
 *
 *   npx sanity exec scripts/import-content.ts --with-user-token
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
  [key: string]: unknown;
};

const projects: Project[] = JSON.parse(
  readFileSync(join(process.cwd(), "sanity/seed/projects.json"), "utf8"),
);

async function uploadImage(path: string, label: string) {
  if (!existsSync(path)) {
    console.warn(`  ! missing ${path} — skipping`);
    return null;
  }
  const asset = await client.assets.upload("image", createReadStream(path), {
    filename: label,
  });
  return { _type: "reference" as const, _ref: asset._id };
}

function imageField(ref: { _ref: string }, alt: string, caption?: string) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: ref._ref },
    alt,
    ...(caption ? { caption } : {}),
  };
}

async function main() {
  for (const p of projects) {
    const id = `project-${p.slug}`;
    const dir = join(process.cwd(), "assets/projects", p.slug);

    const existing = await client.fetch<{ coverImage?: unknown } | null>(
      `*[_id == $id][0]{coverImage}`,
      { id },
    );

    let coverImage: unknown = existing?.coverImage;
    let gallery: unknown[] | undefined;

    if (!coverImage) {
      console.log(`${p.slug}: uploading images…`);
      const coverRef = await uploadImage(join(dir, "cover.jpg"), `${p.slug}-cover.jpg`);
      coverImage = coverRef ? imageField(coverRef, p.coverAlt) : undefined;

      gallery = [];
      for (let i = 1; i <= 4; i++) {
        const ref = await uploadImage(join(dir, `screen-${i}.jpg`), `${p.slug}-screen-${i}.jpg`);
        if (ref) {
          gallery.push({
            _key: `screen-${i}`,
            ...imageField(ref, p.galleryAlt[i - 1] ?? `${p.title} screen ${i}`),
          });
        }
      }
    } else {
      console.log(`${p.slug}: images already present, keeping them`);
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
      externalLabel: p.externalLabel,
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

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "Tanvir Ahassan",
    siteDescription:
      "UI/UX Designer with 5+ years of experience designing intuitive, user-friendly digital products for startups and enterprises.",
    heroHeadline: "Crafting seamless digital experiences with a human touch.",
    heroSupporting:
      "I'm Tanvir Ahassan, a UI/UX Designer with 5+ years of experience designing intuitive, user-friendly digital products for startups and enterprises.",
    ctaLabel: "Book a Call",
    contactHeading: "Have a project in mind or just want to connect?",
    aboutHeading: "Designing Digital Solutions With Impact",
    aboutParagraphs: [
      "I started my professional journey with a degree in Software Engineering, where I built a strong foundation in technology, problem-solving, and system thinking. While working in the tech field, I discovered my deep interest in how people interact with digital products. This curiosity and passion for creating seamless experiences eventually led me to transition into UI/UX design.",
      "Collaboration is at the heart of my work. I enjoy partnering with developers, product managers, and stakeholders to create seamless workflows and efficient design systems. My goal is always to bridge the gap between creativity and functionality — delivering designs that are visually appealing, intuitive, and aligned with both business objectives and user expectations.",
    ],
    services: [
      { _key: "s1", name: "UI/UX Design", description: "Crafting user-centered digital experiences through research, wireframing, prototyping, and testing. Every design decision is made with the user in mind." },
      { _key: "s2", name: "Design System", description: "Building scalable design systems to ensure consistency, efficiency, and seamless collaboration between design and development teams." },
      { _key: "s3", name: "Design Consultation", description: "Helping startups and businesses refine their digital products by identifying usability issues, improving workflows, and aligning design with business goals." },
    ],
    stats: [
      { _key: "st1", value: "5+", label: "Years in business" },
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
