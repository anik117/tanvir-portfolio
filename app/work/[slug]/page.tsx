import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { safeFetch } from "@/sanity/client";
import { PROJECT_BY_SLUG_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";

type Outcome = { label: string; value: string; evidence: string };

type Project = {
  title: string;
  projectType?: string;
  summary?: string;
  role?: string;
  timeline?: string;
  team?: string[];
  outcomes?: Outcome[];
  body?: PortableTextBlock[];
};

export async function generateStaticParams() {
  const slugs = await safeFetch<string[]>(PROJECT_SLUGS_QUERY);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await safeFetch<Project>(PROJECT_BY_SLUG_QUERY, { slug });

  // Before Sanity is connected there is no content for any slug. Show a stub
  // rather than a 404, so the route is still walkable during development.
  if (!project) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24">
        <Link href="/" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground">
          ← Back
        </Link>
        <h1 className="mt-10 text-4xl font-medium tracking-tight">{slug}</h1>
        <p className="mt-4 text-muted">
          No case study yet. Write it in <code className="font-mono text-sm">docs/projects/{slug}.md</code>{" "}
          first, then publish it through the Studio.
        </p>
      </main>
    );
  }

  if (!project.title) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24">
      <Link href="/" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground">
        ← Back
      </Link>

      <header className="mt-10">
        <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">{project.title}</h1>
        {project.summary && <p className="mt-4 text-lg text-muted">{project.summary}</p>}
      </header>

      <dl className="mt-12 grid gap-6 border-y border-border py-8 sm:grid-cols-3">
        {[
          ["Role", project.role],
          ["Timeline", project.timeline],
          ["Type", project.projectType],
        ]
          .filter(([, value]) => Boolean(value))
          .map(([label, value]) => (
            <div key={label as string}>
              <dt className="font-mono text-xs uppercase tracking-widest text-muted">{label}</dt>
              <dd className="mt-1 text-sm">{value}</dd>
            </div>
          ))}
      </dl>

      {project.outcomes?.length ? (
        <section className="mt-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Outcomes</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {project.outcomes.map((outcome) => (
              <li key={outcome.label}>
                <p className="text-3xl font-medium tracking-tight">{outcome.value}</p>
                <p className="mt-1 text-sm text-muted">{outcome.label}</p>
                <p className="mt-2 font-mono text-xs text-muted">{outcome.evidence}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.body?.length ? (
        <div className="prose mt-16 max-w-none space-y-6 leading-relaxed">
          <PortableText value={project.body} />
        </div>
      ) : null}
    </main>
  );
}
