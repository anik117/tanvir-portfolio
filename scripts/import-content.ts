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
import { createHash } from "node:crypto";
import { createReadStream, existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, parse } from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-09-08" });

type Project = {
  slug: string;
  title: string;
  order: number;
  coverAlt: string;
  galleryAlt: string[];
  galleryCaption?: string[];
  /** Annotations per gallery slot; index 0 is screen-1. */
  galleryAnnotations?: Annotation[][];
  /** Big image at the top of the case study; falls back to cover.jpg. */
  heroFile?: string;
  heroAlt?: string;
  chapters?: SeedChapter[];
  [key: string]: unknown;
};

/** A chapter as written in the seed: images name a file in the project's
    asset folder rather than a Sanity asset id. */
type SeedImage = {
  file: string;
  alt: string;
  caption?: string;
  label?: string;
  /** Shown in the dashed slot that stands in for this image until the file
      exists. Falls back to the corner label, then to the filename. */
  pendingLabel?: string;
  /** Inline preview height as a fraction of width; the lightbox shows all. */
  previewAspect?: number;
  displayWidth?: number;
  annotations?: Annotation[];
};

type SeedChapter = {
  _type: string;
  images?: SeedImage[];
  feature?: SeedImage[];
  [key: string]: unknown;
};

const projects: Project[] = JSON.parse(
  readFileSync(join(process.cwd(), "sanity/seed/projects.json"), "utf8"),
);
const aboutContent = JSON.parse(
  readFileSync(join(process.cwd(), "sanity/seed/about.json"), "utf8"),
);
const homeContent = JSON.parse(
  readFileSync(join(process.cwd(), "sanity/seed/home.json"), "utf8"),
);
const contactContent = JSON.parse(
  readFileSync(join(process.cwd(), "sanity/seed/contact.json"), "utf8"),
);

/**
 * Resolves an image asset by its *contents*, uploading it only if the dataset
 * does not already hold those bytes. Keyed on the hash rather than the filename
 * because the filenames here are stable slots — cover.jpg, screen-1.jpg … —
 * whose contents can change; a name lookup would hand back the previous image.
 * Hashing also relinks a document that lost its reference instead of
 * re-uploading, and never duplicates an asset that is already there.
 */
async function resolveAsset(wanted: string, filename: string) {
  const path = withAnyExtension(wanted);
  if (!path) {
    console.warn(`  ! missing ${wanted} — skipping`);
    return null;
  }
  const sha1 = createHash("sha1").update(readFileSync(path)).digest("hex");
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "sanity.imageAsset" && sha1hash == $sha1][0]{_id}`,
    { sha1 },
  );
  if (existing?._id) return existing._id;

  const asset = await client.assets.upload("image", createReadStream(path), { filename });
  console.log(`  ↑ uploaded ${filename}`);
  return asset._id;
}

/**
 * The seed names a file; the export tool decides the extension. Match on the
 * basename so a .webp on disk still answers to `foo.jpg` in the seed, and the
 * two never have to be kept in step by hand.
 */
function withAnyExtension(wanted: string) {
  if (existsSync(wanted)) return wanted;
  const dir = dirname(wanted);
  if (!existsSync(dir)) return null;
  const base = parse(wanted).name.toLowerCase();
  const match = readdirSync(dir).find(
    (f) => parse(f).name.toLowerCase() === base && /\.(jpe?g|png|webp|avif|gif)$/i.test(f),
  );
  return match ? join(dir, match) : null;
}

type Annotation = { label: string; note?: string; tone?: string; x: number; y: number };

function imageField(
  assetId: string,
  alt: string,
  caption?: string,
  annotations?: Annotation[],
  label?: string,
) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt,
    ...(caption ? { caption } : {}),
    ...(label ? { label } : {}),
    ...(annotations?.length
      ? { annotations: annotations.map((a, i) => ({ _key: `ann-${i}`, ...a })) }
      : {}),
  };
}

/**
 * Stamps a _key on every object inside an array, recursively. Sanity needs one
 * per array member; writing them by hand in the seed would be noise.
 */
function keyArrays(value: unknown, prefix: string): unknown {
  if (Array.isArray(value)) {
    return value.map((item, i) =>
      item && typeof item === "object"
        ? { _key: `${prefix}-${i}`, ...(keyArrays(item, `${prefix}-${i}`) as object) }
        : item,
    );
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k,
        k === "_key" ? v : keyArrays(v, `${prefix}-${k}`),
      ]),
    );
  }
  return value;
}

/**
 * A seed file may sit in a subfolder with spaces in its name — the assets are
 * organised for the person who exported them, not for a URL. Flatten that into
 * one lowercase, hyphenated filename for the upload.
 */
function assetName(slug: string, file: string) {
  const flat = file
    .replace(/\\/g, "/")
    .replace(/\.[a-z]+$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const ext = parse(file).ext || ".jpg";
  return `${slug}-${flat}${ext}`;
}

/** What the dashed stand-in says while an image's file does not exist yet. */
function slotLabel(img: SeedImage) {
  if (img.pendingLabel) return img.pendingLabel;
  if (img.label) return img.label;
  return img.file.replace(/\.[a-z]+$/i, "").replace(/[-_]/g, " ");
}

/** Resolves each chapter's `file` references into uploaded Sanity images. */
async function buildChapters(chapters: SeedChapter[], dir: string, slug: string) {
  const out: unknown[] = [];

  for (const [ci, chapter] of chapters.entries()) {
    const { images, feature, ...rest } = chapter;
    const built = keyArrays(rest, `ch${ci}`) as Record<string, unknown>;
    built._key = `ch-${String(ci + 1).padStart(2, "0")}`;

    for (const [field, list] of [
      ["images", images],
      ["feature", feature],
    ] as const) {
      if (!list?.length) continue;
      const resolved: unknown[] = [];
      const absent: string[] = [];

      for (const [ii, img] of list.entries()) {
        const assetId = await resolveAsset(join(dir, img.file), assetName(slug, img.file));
        if (!assetId) {
          absent.push(slotLabel(img));
          continue;
        }
        resolved.push({
          ...imageField(assetId, img.alt, img.caption, img.annotations, img.label),
          ...(img.previewAspect ? { previewAspect: img.previewAspect } : {}),
          ...(img.displayWidth ? { displayWidth: img.displayWidth } : {}),
          _key: `ch-${ci}-${field}-${ii}`,
          // imageField writes the generic "image" type; inside a chapter the
          // member type is the named one the schema declares.
          _type: "chapterImage",
        });
      }

      if (resolved.length) built[field] = resolved;

      // An image whose file is not on disk yet becomes a dashed slot rather
      // than a hole, so the seed only ever lists the assets it actually wants
      // and the page stays honest about which of them exist.
      if (!absent.length) continue;
      if (field === "feature") {
        built.featurePending = built.featurePending ?? absent[0];
      } else {
        built.pending = [...((built.pending as string[] | undefined) ?? []), ...absent];
      }
    }

    out.push(built);
  }

  return out;
}

async function main() {
  const requestedSlug = process.env.SANITY_PROJECT_SLUG;
  const selectedProjects = requestedSlug
    ? projects.filter((p) => p.slug === requestedSlug)
    : projects;
  if (requestedSlug && selectedProjects.length !== 1) {
    throw new Error(`Expected one project for ${requestedSlug}; found ${selectedProjects.length}`);
  }
  if (requestedSlug && process.env.SANITY_PROJECTS_ONLY !== "1") {
    throw new Error("A scoped project publish requires SANITY_PROJECTS_ONLY=1");
  }
  for (const p of selectedProjects) {
    const id = `project-${p.slug}`;
    const dir = join(process.cwd(), "assets/projects", p.slug);
    const coverId = await resolveAsset(join(dir, "cover.jpg"), `${p.slug}-cover.jpg`);
    const coverImage = coverId ? imageField(coverId, p.coverAlt) : undefined;

    const gallery: unknown[] = [];
    for (let i = 1; i <= 5; i++) {
      const assetId = await resolveAsset(join(dir, `screen-${i}.jpg`), `${p.slug}-screen-${i}.jpg`);
      if (!assetId) continue;
      gallery.push({
        _key: `screen-${i}`,
        ...imageField(
          assetId,
          p.galleryAlt[i - 1] ?? `${p.title} screen ${i}`,
          p.galleryCaption?.[i - 1],
          p.galleryAnnotations?.[i - 1],
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
      team: p.team,
      scope: p.scope,
      headline: p.headline,
      snapshotNote: p.snapshotNote,
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

    if (p.heroFile) {
      const heroId = await resolveAsset(join(dir, p.heroFile), assetName(p.slug, p.heroFile));
      if (heroId) doc.heroImage = imageField(heroId, p.heroAlt ?? p.coverAlt);
    }
    if (p.chapters?.length) {
      doc.chapters = await buildChapters(p.chapters, dir, p.slug);
    }

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
    ...homeContent,
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
    ...contactContent,
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
    ...aboutContent,
    // Only tools there is actual evidence for: Figma (the Ibadat prototype link),
    // Framer (the old site), Sanity (this one). Add the rest in the Studio.
    toolkit: ["Figma", "Framer", "AI tools: Claude, Codex"],
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
