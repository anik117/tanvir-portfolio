import Link from "next/link";
import { safeFetch } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { PROJECTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { SetupBanner } from "@/components/SetupBanner";

type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  projectType?: string;
  summary?: string;
};

type SiteSettings = {
  heroHeadline?: string;
  heroSupporting?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

// Placeholder list, mirroring docs/brief.md. Used only until Sanity is connected.
const PLACEHOLDER_PROJECTS: ProjectCard[] = [
  { _id: "p1", title: "TaxRise", slug: "taxrise", projectType: "Website redesign" },
  { _id: "p2", title: "ZO Skin Centre", slug: "zo-skin-centre", projectType: "Website redesign" },
  { _id: "p3", title: "Alokito Teacher", slug: "alokito-teacher", projectType: "Website redesign" },
  { _id: "p4", title: "Ibadat", slug: "ibadat", projectType: "Mobile app" },
];

export default async function HomePage() {
  const [projects, settings] = await Promise.all([
    safeFetch<ProjectCard[]>(PROJECTS_QUERY),
    safeFetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  const items = projects?.length ? projects : PLACEHOLDER_PROJECTS;
  const usingPlaceholders = !projects?.length;

  return (
    <>
      {usingPlaceholders && <SetupBanner />}

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
        <section className="mb-32">
          <h1 className="max-w-3xl text-balance text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
            {settings?.heroHeadline ?? "Hero headline not set."}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            {settings?.heroSupporting ??
              "Supporting copy not set. The positioning line is still unresolved — see docs/profile.md."}
          </p>
          {settings?.ctaUrl && (
            <a
              href={settings.ctaUrl}
              className="mt-10 inline-block border-b border-accent pb-0.5 text-sm font-medium transition-opacity hover:opacity-60"
            >
              {settings.ctaLabel ?? "Get in touch"}
            </a>
          )}
        </section>

        <section>
          <h2 className="mb-10 font-mono text-xs uppercase tracking-widest text-muted">
            Selected work
          </h2>
          <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {items.map((project) => (
              <li key={project._id} className="bg-background">
                <Link
                  href={`/work/${project.slug}`}
                  className="flex h-full flex-col gap-2 p-8 transition-colors hover:bg-foreground/[0.03]"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {project.projectType ?? "Project"}
                  </span>
                  <span className="text-xl font-medium">{project.title}</span>
                  {project.summary && (
                    <span className="text-sm text-muted">{project.summary}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-muted">
          <span>Tanvir Ahassan</span>
          {isSanityConfigured ? (
            <Link href="/studio" className="hover:text-foreground">
              Studio
            </Link>
          ) : (
            <span className="font-mono">Sanity not connected</span>
          )}
        </div>
      </footer>
    </>
  );
}
