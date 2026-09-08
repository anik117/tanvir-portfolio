import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { safeFetch } from "@/sanity/client";
import { PROJECT_BY_SLUG_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";
import type { Project } from "@/sanity/types";
import { SanityImage } from "@/components/SanityImage";
import { ZoomableImage } from "@/components/ZoomableImage";
import { AnnotatedImage } from "@/components/AnnotatedImage";
import { Reveal } from "@/components/Reveal";

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

/**
 * Four acts — brief, research, design, outcome. The earlier layout split the
 * same content across seven identically-weighted blocks, which read as a form
 * rather than a story.
 */
function Act({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <section className="mt-20 border-t border-border pt-10">
        <div className="mb-8 flex items-baseline gap-4">
          <span className="mono text-sm text-muted">{n}</span>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        </div>
        {children}
      </section>
    </Reveal>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4 leading-relaxed">
          <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-border" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="mb-8 text-lg leading-relaxed">{children}</p>;
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await safeFetch<Project>(PROJECT_BY_SLUG_QUERY, { slug });

  if (!project) {
    return (
      <main className="mx-auto max-w-read px-6 py-32">
        <Link href="/" className="text-sm text-muted hover:text-foreground">
          ← Back
        </Link>
        <h1 className="mt-10 text-4xl font-semibold tracking-tight">{slug}</h1>
        <p className="mt-4 text-muted">No content for this project yet.</p>
      </main>
    );
  }
  if (!project.title) notFound();

  const meta = [
    ["Role", project.role],
    ["Industry", project.industry],
    ["Platform", project.platform],
    ["Year", project.year],
    ["Duration", project.duration],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  return (
    <main className="pb-10">
      <div className="mx-auto max-w-page px-6 pt-12">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden size={15} />
          All work
        </Link>

        <header className="mt-10 max-w-3xl">
          <p className="text-sm text-muted">{project.projectType}</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            {project.title}
          </h1>
          {project.summary && (
            <p className="mt-6 text-lg leading-relaxed text-muted">{project.summary}</p>
          )}
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="group btn btn-secondary mt-8"
            >
              {project.externalLabel ?? "Visit Website"}
              <ArrowUpRight aria-hidden size={16} className="arrow" />
            </a>
          )}
        </header>

        {project.coverImage && (
          <Reveal className="group mt-14">
            <AnnotatedImage
              image={project.coverImage}
              width={1600}
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </Reveal>
        )}

        {meta.length > 0 && (
          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-5 border-y border-border py-6">
            {meta.map(([label, value]) => (
              <div key={label} className="flex items-baseline gap-2.5">
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="mx-auto max-w-read px-6">
        {(project.goal || project.targetUsers?.length) && (
          <Act n="01" title="The brief">
            {project.goal && <Lead>{project.goal}</Lead>}
            {project.targetUsers?.length ? (
              <dl className="space-y-5">
                {project.targetUsers.map((u) => (
                  <div key={u._key ?? u.label} className="border-t border-border pt-4">
                    <dt className="font-medium">{u.label}</dt>
                    <dd className="mt-1 leading-relaxed text-muted">{u.description}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </Act>
        )}

        {(project.insights?.length ||
          project.competitorAnalysis?.length ||
          project.personas?.length) && (
          <Act n="02" title="What I found">
            {project.discoveryNote && <Lead>{project.discoveryNote}</Lead>}

            {project.insights?.length ? <Points items={project.insights} /> : null}

            {project.competitorAnalysis?.length ? (
              <div className="mt-10">
                <h3 className="mb-4 text-sm font-medium text-muted">Competitor analysis</h3>
                <Points items={project.competitorAnalysis} />
              </div>
            ) : null}

            {project.personas?.length ? (
              <div className="mt-12">
                <h3 className="mb-5 text-sm font-medium text-muted">Who I designed for</h3>
                <div className="space-y-8">
                  {project.personas.map((p) => (
                    <div key={p._key ?? p.name} className="border-t border-border pt-5">
                      <p className="font-medium">
                        {p.name}
                        {p.context && (
                          <span className="ml-2 font-normal text-muted">· {p.context}</span>
                        )}
                      </p>
                      <dl className="mt-3 space-y-2 text-[15px] leading-relaxed">
                        {[
                          ["Wants", p.wants],
                          ["Prefers", p.preferences],
                          ["Motivated by", p.motivations],
                        ]
                          .filter(([, v]) => Boolean(v))
                          .map(([label, value]) => (
                            <div key={label as string} className="flex gap-3">
                              <dt className="w-28 shrink-0 text-sm text-muted">{label}</dt>
                              <dd>{value}</dd>
                            </div>
                          ))}
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </Act>
        )}

        {(project.userFlows?.length ||
          project.wireframes?.length ||
          project.visualDirection?.length ||
          project.keyScreens?.length ||
          project.gallery?.length) && (
          <Act n="03" title="How I built it">
            {project.userFlows?.length ? (
              <div>
                <h3 className="mb-5 text-sm font-medium text-muted">Critical flows</h3>
                <ol className="space-y-4">
                  {project.userFlows.map((f) => (
                    <li key={f._key ?? f.name} className="border-t border-border pt-4">
                      <p className="font-medium">{f.name}</p>
                      <p className="mono mt-1.5 text-[13px] leading-relaxed text-muted">
                        {f.steps}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {project.wireframes?.length ? (
              <div className="mt-12">
                <h3 className="mb-4 text-sm font-medium text-muted">Wireframes</h3>
                <Points items={project.wireframes} />
              </div>
            ) : null}

            {project.visualDirection?.length ? (
              <div className="mt-12">
                <h3 className="mb-4 text-sm font-medium text-muted">Visual direction</h3>
                <Points items={project.visualDirection} />
              </div>
            ) : null}

            {project.gallery?.length ? (
              <div className="mt-14 space-y-10">
                {project.gallery.map((img, i) => (
                  <figure key={i}>
                    <ZoomableImage image={img} />
                    {img.caption && (
                      <figcaption className="mt-3 text-sm text-muted">
                        {img.caption} — click to enlarge
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            ) : null}

            {project.keyScreens?.length ? (
              <div className="mt-14">
                <h3 className="mb-5 text-sm font-medium text-muted">Key screens</h3>
                <dl className="space-y-4">
                  {project.keyScreens.map((s) => (
                    <div
                      key={s._key ?? s.name}
                      className="flex flex-col gap-1 border-t border-border pt-4 sm:flex-row sm:gap-6"
                    >
                      <dt className="w-52 shrink-0 font-medium">{s.name}</dt>
                      <dd className="leading-relaxed text-muted">{s.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </Act>
        )}

        {(project.outcomes?.length || project.expectedOutcomes?.length) && (
          <Act n="04" title="What it set out to do">
            {project.outcomes?.length ? (
              <ul className="mb-12 grid gap-8 sm:grid-cols-3">
                {project.outcomes.map((o) => (
                  <li key={o._key ?? o.label}>
                    <p className="text-4xl font-semibold tracking-tight">{o.value}</p>
                    <p className="mt-2 text-sm">{o.label}</p>
                    <p className="mono mt-2 text-xs text-muted">{o.evidence}</p>
                  </li>
                ))}
              </ul>
            ) : null}

            {project.expectedOutcomes?.length ? (
              <>
                <p className="mb-8 text-muted">
                  Designed for, not measured — this was a redesign without instrumentation.
                </p>
                <dl className="space-y-4">
                  {project.expectedOutcomes.map((o) => (
                    <div
                      key={o._key ?? o.label}
                      className="flex flex-col gap-1 border-t border-border pt-4 sm:flex-row sm:gap-6"
                    >
                      <dt className="w-52 shrink-0 font-medium">{o.label}</dt>
                      <dd className="leading-relaxed text-muted">{o.description}</dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : null}
          </Act>
        )}
      </div>

      {project.others?.length ? (
        <div className="mx-auto mt-24 max-w-page px-6">
          <Reveal>
            <h2 className="border-t border-border pt-10 text-sm font-medium text-muted">
              Other work
            </h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-3">
              {project.others.map((other) => (
                <li key={other._id}>
                  <Link href={`/work/${other.slug}`} className="group block">
                    {other.coverImage && (
                      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-md">
                        <SanityImage
                          image={other.coverImage}
                          width={600}
                          sizes="(max-width: 640px) 100vw, 380px"
                          className="cover-img"
                        />
                      </div>
                    )}
                    <p className="mt-4 font-medium">{other.title}</p>
                    <p className="mt-1 text-sm text-muted">{other.projectType}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      ) : null}
    </main>
  );
}
