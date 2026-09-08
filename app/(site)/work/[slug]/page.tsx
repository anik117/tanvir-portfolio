import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { safeFetch } from "@/sanity/client";
import { PROJECT_BY_SLUG_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";
import type { Project } from "@/sanity/types";
import { SanityImage } from "@/components/SanityImage";

export async function generateStaticParams() {
  const slugs = await safeFetch<string[]>(PROJECT_SLUGS_QUERY);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await safeFetch<Project>(PROJECT_BY_SLUG_QUERY, { slug });
  if (!project?.title) return {};
  return { title: `${project.title} | Tanvir Ahassan`, description: project.summary };
}

function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="border-t border-border py-16">
      <h2 className="eyebrow mb-8">{title}</h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4 text-base leading-relaxed">
          <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-border" />
          <span className="text-muted">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await safeFetch<Project>(PROJECT_BY_SLUG_QUERY, { slug });

  if (!project) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-32">
        <Link href="/" className="eyebrow hover:text-foreground">
          ← Back
        </Link>
        <h1 className="mt-10 text-4xl font-medium tracking-tight">{slug}</h1>
        <p className="mt-4 text-muted">
          No content for this project yet. Add it in the Studio.
        </p>
      </main>
    );
  }
  if (!project.title) notFound();

  const meta = [
    ["Industry", project.industry],
    ["Platform", project.platform],
    ["Year", project.year],
    ["Duration", project.duration],
    ["Role", project.role],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  return (
    <main className="mx-auto max-w-5xl px-6 pb-8 pt-16">
      <Link href="/#work" className="eyebrow hover:text-foreground">
        ← All work
      </Link>

      <header className="mt-10">
        <p className="eyebrow">{project.projectType}</p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl">
          {project.title}
        </h1>
        {project.summary && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
        )}
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
          >
            {project.externalLabel ?? "Visit Website"} ↗
          </a>
        )}
      </header>

      {project.coverImage && (
        <div className="mt-12 overflow-hidden rounded-xl border border-border bg-surface">
          <SanityImage image={project.coverImage} width={1600} sizes="(max-width: 1024px) 100vw, 1024px" priority />
        </div>
      )}

      {meta.length > 0 && (
        <dl className="mt-12 grid grid-cols-2 gap-8 border-y border-border py-8 sm:grid-cols-4 lg:grid-cols-5">
          {meta.map(([label, value]) => (
            <div key={label}>
              <dt className="eyebrow">{label}</dt>
              <dd className="mt-2 text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {(project.goal || project.targetUsers?.length) && (
        <section className="py-16">
          <h2 className="eyebrow mb-8">Overview</h2>
          {project.goal && (
            <p className="max-w-3xl text-xl leading-relaxed">{project.goal}</p>
          )}
          {project.targetUsers?.length ? (
            <div className="mt-12">
              <h3 className="eyebrow mb-6">Target users</h3>
              <ul className="grid gap-8 sm:grid-cols-2">
                {project.targetUsers.map((u) => (
                  <li key={u._key ?? u.label} className="rounded-lg border border-border bg-surface p-6">
                    <p className="font-medium">{u.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{u.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      )}

      {(project.insights?.length || project.competitorAnalysis?.length) && (
        <Section title="Research & discovery">
          {project.discoveryNote && (
            <p className="mb-10 max-w-3xl text-lg leading-relaxed">{project.discoveryNote}</p>
          )}
          <div className="grid gap-12 lg:grid-cols-2">
            {project.insights?.length ? (
              <div>
                <h3 className="mb-5 text-sm font-medium">Key insights</h3>
                <Bullets items={project.insights} />
              </div>
            ) : null}
            {project.competitorAnalysis?.length ? (
              <div>
                <h3 className="mb-5 text-sm font-medium">Competitor analysis</h3>
                <Bullets items={project.competitorAnalysis} />
              </div>
            ) : null}
          </div>
        </Section>
      )}

      {project.personas?.length ? (
        <Section title="Personas">
          <ul className="grid gap-6 sm:grid-cols-2">
            {project.personas.map((p) => (
              <li key={p._key ?? p.name} className="rounded-lg border border-border bg-surface p-6">
                <p className="text-lg font-medium tracking-tight">{p.name}</p>
                {p.context && <p className="eyebrow mt-1">{p.context}</p>}
                <dl className="mt-5 space-y-3 text-sm">
                  {[
                    ["Wants", p.wants],
                    ["Prefers", p.preferences],
                    ["Motivated by", p.motivations],
                  ]
                    .filter(([, v]) => Boolean(v))
                    .map(([label, value]) => (
                      <div key={label as string}>
                        <dt className="text-xs text-muted">{label}</dt>
                        <dd className="mt-0.5 leading-relaxed">{value}</dd>
                      </div>
                    ))}
                </dl>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {project.userFlows?.length ? (
        <Section title="User flows">
          <ol className="space-y-px overflow-hidden rounded-lg border border-border">
            {project.userFlows.map((f, i) => (
              <li
                key={f._key ?? f.name}
                className="flex flex-col gap-2 bg-surface p-6 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-48 font-medium">{f.name}</span>
                <span className="text-sm leading-relaxed text-muted">{f.steps}</span>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      {project.wireframes?.length ? (
        <Section title="Wireframes">
          <div className="max-w-3xl">
            <Bullets items={project.wireframes} />
          </div>
        </Section>
      ) : null}

      {(project.visualDirection?.length || project.keyScreens?.length || project.gallery?.length) && (
        <Section title="Final design">
          {project.visualDirection?.length ? (
            <div className="mb-12 max-w-3xl">
              <h3 className="mb-5 text-sm font-medium">Visual direction</h3>
              <Bullets items={project.visualDirection} />
            </div>
          ) : null}

          {project.gallery?.length ? (
            <ul className="mb-14 grid gap-8 sm:grid-cols-2">
              {project.gallery.map((img, i) => (
                <li key={i}>
                  <figure>
                    <div className="overflow-hidden rounded-xl border border-border bg-surface">
                      <SanityImage
                        image={img}
                        width={900}
                        sizes="(max-width: 640px) 100vw, 500px"
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="eyebrow mt-3">{img.caption}</figcaption>
                    )}
                  </figure>
                </li>
              ))}
            </ul>
          ) : null}

          {project.keyScreens?.length ? (
            <div>
              <h3 className="mb-6 text-sm font-medium">Key screens</h3>
              <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {project.keyScreens.map((s) => (
                  <div key={s._key ?? s.name} className="border-t border-border pt-4">
                    <dt className="font-medium">{s.name}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted">{s.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </Section>
      )}

      {project.outcomes?.length ? (
        <Section title="Measured outcomes">
          <ul className="grid gap-8 sm:grid-cols-3">
            {project.outcomes.map((o) => (
              <li key={o._key ?? o.label}>
                <p className="text-4xl font-medium tracking-tight">{o.value}</p>
                <p className="mt-2 text-sm">{o.label}</p>
                <p className="mt-2 font-mono text-xs text-muted">{o.evidence}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {project.expectedOutcomes?.length ? (
        <Section title="Expected outcomes">
          <p className="mb-8 max-w-2xl text-sm text-muted">
            Outcomes this redesign was built to deliver. These were designed for, not measured.
          </p>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {project.expectedOutcomes.map((o) => (
              <div key={o._key ?? o.label} className="border-t border-border pt-4">
                <dt className="font-medium">{o.label}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">{o.description}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      {project.others?.length ? (
        <Section title="Other work">
          <ul className="grid gap-8 sm:grid-cols-3">
            {project.others.map((other) => (
              <li key={other._id}>
                <Link href={`/work/${other.slug}`} className="group block">
                  {other.coverImage && (
                    <div className="overflow-hidden rounded-lg border border-border bg-surface">
                      <SanityImage
                        image={other.coverImage}
                        width={600}
                        sizes="(max-width: 640px) 100vw, 320px"
                        className="transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <p className="mt-4 font-medium">{other.title}</p>
                  <p className="eyebrow mt-1">{other.projectType}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </main>
  );
}
