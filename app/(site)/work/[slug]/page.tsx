import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { safeFetch } from "@/sanity/client";
import { PROJECT_BY_SLUG_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";
import type { Project } from "@/sanity/types";
import { SanityImage } from "@/components/SanityImage";
import { ZoomableImage } from "@/components/ZoomableImage";
import { Reveal } from "@/components/Reveal";
import { ActNav, type ActLink } from "@/components/case-study/ActNav";

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
 * Four acts — brief, research, design, outcome — each a step in one story,
 * separated by a hairline. The sticky index on wide screens tracks which act
 * is on screen.
 */
function Act({
  id,
  title,
  deck,
  children,
}: {
  id: string;
  title: string;
  /** One line on what this act covers, so a skimmer knows whether to stop. */
  deck: string;
  children: ReactNode;
}) {
  return (
    // The Reveal wrapper is what the parent spaces; the section inside is
    // always its first child, so `first:` resets must live on the wrapper.
    <Reveal className="border-t border-border pt-10 first:border-t-0 first:pt-0">
      <section id={id} className="scroll-mt-28">
        <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
        <p className="mb-9 mt-2 text-[15px] text-muted">{deck}</p>
        {children}
      </section>
    </Reveal>
  );
}

/**
 * Secondary material, folded until asked for. The summary line says what is
 * inside and how much, so nothing is hidden — just deferred.
 */
function Folded({
  label,
  count,
  children,
}: {
  label: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <details className="group mt-10 rounded-2xl border border-border bg-white/60 open:bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
        <span>
          {label}
          <span className="mono ml-3 text-[12px] font-medium text-muted">
            {count} {count === 1 ? "note" : "notes"}
          </span>
        </span>
        <span
          aria-hidden
          className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-strong transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="px-5 pb-5">{children}</div>
    </details>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-5 flex items-center gap-3 text-sm font-medium text-muted-strong">
      <span aria-hidden className="h-px w-6 bg-dark" />
      {children}
    </h3>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4 text-[17px] leading-[1.65]">
          <span aria-hidden className="mt-[0.9em] h-px w-4 shrink-0 bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="mb-9 text-[21px] leading-[1.5]">{children}</p>;
}

/** Roughly how long the study takes to read, from its own text. */
function readingTime(project: Project) {
  const text = [
    project.summary,
    project.goal,
    project.discoveryNote,
    ...(project.insights ?? []),
    ...(project.competitorAnalysis ?? []),
    ...(project.wireframes ?? []),
    ...(project.visualDirection ?? []),
    ...(project.targetUsers ?? []).map((u) => `${u.label} ${u.description ?? ""}`),
    ...(project.personas ?? []).map((p) => `${p.wants ?? ""} ${p.preferences ?? ""} ${p.motivations ?? ""}`),
    ...(project.userFlows ?? []).map((f) => `${f.name} ${f.steps ?? ""}`),
    ...(project.keyScreens ?? []).map((k) => `${k.name} ${k.description ?? ""}`),
    ...(project.expectedOutcomes ?? []).map((o) => `${o.label} ${o.description ?? ""}`),
  ]
    .filter(Boolean)
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

function Rows({ items }: { items: { key: string; label: string; description?: string }[] }) {
  return (
    <dl className="divide-y divide-border border-y border-border">
      {items.map((it) => (
        <div key={it.key} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
          <dt className="font-semibold">{it.label}</dt>
          <dd className="text-[16px] leading-relaxed text-muted-strong">{it.description}</dd>
        </div>
      ))}
    </dl>
  );
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
    ["Read", `${readingTime(project)} min`],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  const hasBrief = Boolean(project.goal || project.targetUsers?.length);
  const hasResearch = Boolean(
    project.insights?.length || project.competitorAnalysis?.length || project.personas?.length,
  );
  const hasBuild = Boolean(
    project.userFlows?.length ||
      project.wireframes?.length ||
      project.visualDirection?.length ||
      project.keyScreens?.length ||
      project.gallery?.length,
  );
  const hasOutcome = Boolean(project.outcomes?.length || project.expectedOutcomes?.length);

  const acts: ActLink[] = [
    hasBrief && { id: "act-01", n: "01", title: "The brief" },
    hasResearch && { id: "act-02", n: "02", title: "What I found" },
    hasBuild && { id: "act-03", n: "03", title: "How I built it" },
    hasOutcome && { id: "act-04", n: "04", title: "What it set out to do" },
  ].filter(Boolean) as ActLink[];

  return (
    <main className="pb-10">
      {/* ---- Header -------------------------------------------------------- */}
      <div className="mx-auto max-w-page px-5 pt-8 sm:px-10 sm:pt-12">
        <Link
          href="/work"
          className="group inline-flex items-center gap-1.5 text-sm text-muted-strong transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden size={15} className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <header className="mt-10 max-w-4xl">
          <Reveal y={10}>
            <p className="mono text-[12px] text-muted">
              {[project.year, project.projectType, project.industry].filter(Boolean).join("  •  ")}
            </p>
          </Reveal>
          <Reveal delay={80} y={14}>
            <h1 className="mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-6xl">
              {project.title}
            </h1>
          </Reveal>
          {project.summary && (
            <Reveal delay={180} y={12}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-strong sm:text-xl">
                {project.summary}
              </p>
            </Reveal>
          )}
          {project.externalUrl && (
            <Reveal delay={260} y={12}>
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="group btn btn-dark mt-8"
              >
                {project.externalLabel ?? "Visit Website"}
                <ArrowUpRight aria-hidden size={16} className="arrow-up" />
              </a>
            </Reveal>
          )}
        </header>

        {project.coverImage && (
          <Reveal delay={200} className="mt-14">
            <div className="card group overflow-hidden p-3 sm:p-4">
              <div className="overflow-hidden rounded-xl border border-border bg-white">
                <SanityImage
                  image={project.coverImage}
                  width={1800}
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  priority
                  className="cover-img"
                />
              </div>
            </div>
          </Reveal>
        )}

        {meta.length > 0 && (
          <Reveal delay={300}>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-border py-5 sm:grid-cols-3 lg:grid-cols-6">
              {meta.map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <dt className="mono text-[11px] uppercase tracking-[0.14em] text-muted">{label}</dt>
                  <dd className="mt-1 text-[15px] font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>

      {/* ---- At a glance ---------------------------------------------------
           The whole study in three cells, built from fields it already has,
           for the reader who will not scroll. */}
      {(project.goal || project.targetUsers?.length || project.expectedOutcomes?.length) && (
        <div className="mx-auto mt-10 max-w-page px-5 sm:px-10">
          <Reveal delay={360}>
            <dl className="grid gap-6 rounded-[28px] bg-gradient-to-b from-[var(--sky-3)] to-[var(--accent-soft)] p-6 sm:grid-cols-3 sm:gap-10 sm:p-8">
              {project.goal && (
                <div>
                  <dt className="mono text-[11px] uppercase tracking-[0.16em] text-muted-strong">The goal</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed">{project.goal}</dd>
                </div>
              )}
              {project.targetUsers?.length ? (
                <div>
                  <dt className="mono text-[11px] uppercase tracking-[0.16em] text-muted-strong">Designed for</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed">
                    {project.targetUsers.map((u) => u.label).join(" · ")}
                  </dd>
                </div>
              ) : null}
              {project.expectedOutcomes?.length ? (
                <div>
                  <dt className="mono text-[11px] uppercase tracking-[0.16em] text-muted-strong">Set out to</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed">
                    {project.expectedOutcomes.map((o) => o.label).join(" · ")}
                  </dd>
                </div>
              ) : null}
            </dl>
          </Reveal>
        </div>
      )}

      {/* ---- Story --------------------------------------------------------- */}
      <div className="mx-auto mt-24 max-w-page px-5 sm:px-10 xl:grid xl:grid-cols-[14rem_1fr] xl:gap-16">
        <aside className="hidden xl:block">
          <div className="sticky top-[calc(var(--nav-h)+1.5rem)]">
            <ActNav acts={acts} />
          </div>
        </aside>

        <div className="max-w-read space-y-20">
          {hasBrief && (
            <Act id="act-01" title="The brief" deck="What the client needed, and who it had to serve.">
              {project.goal && <Lead>{project.goal}</Lead>}
              {project.targetUsers?.length ? (
                <>
                  <Sub>Who it had to work for</Sub>
                  <Rows
                    items={project.targetUsers.map((u) => ({
                      key: u._key ?? u.label,
                      label: u.label,
                      description: u.description,
                    }))}
                  />
                </>
              ) : null}
            </Act>
          )}

          {hasResearch && (
            <Act id="act-02" title="What I found" deck="What research and conversations turned up before any design.">
              {project.discoveryNote && <Lead>{project.discoveryNote}</Lead>}

              {project.insights?.length ? (
                <>
                  <Sub>Insights</Sub>
                  <Points items={project.insights} />
                </>
              ) : null}

              {project.competitorAnalysis?.length ? (
                <Folded label="Competitor analysis" count={project.competitorAnalysis.length}>
                  <Points items={project.competitorAnalysis} />
                </Folded>
              ) : null}

              {project.personas?.length ? (
                <div className="mt-12">
                  <Sub>Who I designed for</Sub>
                  <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
                    {project.personas.map((p) => (
                      <div key={p._key ?? p.name} className="border-t border-border pt-5">
                        <p className="text-lg font-medium tracking-tight">{p.name}</p>
                        {p.context && <p className="mt-0.5 text-sm text-muted-strong">{p.context}</p>}
                        <dl className="mt-5 space-y-3 text-[16px] leading-relaxed">
                          {[
                            ["Wants", p.wants],
                            ["Prefers", p.preferences],
                            ["Motivated by", p.motivations],
                          ]
                            .filter(([, v]) => Boolean(v))
                            .map(([label, value]) => (
                              <div key={label as string}>
                                <dt className="text-[11px] uppercase tracking-wider text-muted">
                                  {label}
                                </dt>
                                <dd className="mt-0.5">{value}</dd>
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

          {hasBuild && (
            <Act id="act-03" title="How I built it" deck="The flows, the decisions, and the screens that came out of them.">
              {project.userFlows?.length ? (
                <div>
                  <Sub>Critical flows</Sub>
                  <ol className="divide-y divide-border border-y border-border">
                    {project.userFlows.map((f) => (
                      <li key={f._key ?? f.name} className="py-4">
                        <p className="font-semibold">{f.name}</p>
                        {f.steps && (
                          <p className="mt-2 text-[14px] leading-relaxed text-muted-strong">
                            {f.steps}
                          </p>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}

              {project.wireframes?.length ? (
                <Folded label="Wireframes" count={project.wireframes.length}>
                  <Points items={project.wireframes} />
                </Folded>
              ) : null}

              {project.visualDirection?.length ? (
                <Folded label="Visual direction" count={project.visualDirection.length}>
                  <Points items={project.visualDirection} />
                </Folded>
              ) : null}

              {project.gallery?.length ? (
                <div className="mt-14 space-y-8">
                  {project.gallery.map((img, i) => (
                    <Reveal key={i} amount={0.2}>
                      <figure>
                        <ZoomableImage image={img} />
                        {img.caption && (
                          <figcaption className="mt-3 text-sm text-muted-strong">
                            {img.caption} — click to enlarge
                          </figcaption>
                        )}
                      </figure>
                    </Reveal>
                  ))}
                </div>
              ) : null}

              {project.keyScreens?.length ? (
                <div className="mt-14">
                  <Sub>Key screens</Sub>
                  <Rows
                    items={project.keyScreens.map((s) => ({
                      key: s._key ?? s.name,
                      label: s.name,
                      description: s.description,
                    }))}
                  />
                </div>
              ) : null}
            </Act>
          )}

          {hasOutcome && (
            <Act id="act-04" title="What it set out to do" deck="The outcomes it was designed for, and any that were measured.">
              {project.outcomes?.length ? (
                <ul className="panel-cream mb-8 grid gap-6 rounded-[28px] p-6 sm:grid-cols-3 sm:p-8">
                  {project.outcomes.map((o) => (
                    <li key={o._key ?? o.label}>
                      <p className="mono text-4xl font-medium tracking-[-0.03em] text-accent-hover">{o.value}</p>
                      <p className="mt-2 text-sm">{o.label}</p>
                      <p className="mono mt-2 text-xs text-muted-strong">{o.evidence}</p>
                    </li>
                  ))}
                </ul>
              ) : null}

              {project.expectedOutcomes?.length ? (
                <>
                  <p className="mb-6 text-muted-strong">
                    Designed for, not measured — this was a redesign without instrumentation.
                  </p>
                  <Rows
                    items={project.expectedOutcomes.map((o) => ({
                      key: o._key ?? o.label,
                      label: o.label,
                      description: o.description,
                    }))}
                  />
                </>
              ) : null}
            </Act>
          )}
        </div>
      </div>

      {/* ---- Other work ---------------------------------------------------- */}
      {project.others?.length ? (
        <div className="mx-auto mt-28 max-w-page px-5 sm:px-10">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">More work.</h2>
              <Link
                href="/work"
                className="group inline-flex items-center gap-1.5 text-sm text-muted-strong transition-colors hover:text-foreground"
              >
                All projects
                <ArrowUpRight aria-hidden size={15} className="arrow-up" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {project.others.map((other, i) => (
                <li key={other._id}>
                  <Reveal delay={i * 80} className="h-full">
                    <Link
                      href={`/work/${other.slug}`}
                      className="card card-hover group block h-full rounded-2xl p-2.5"
                    >
                      {other.coverImage && (
                        <div className="overflow-hidden rounded-xl border border-border bg-foreground/[0.03]">
                          <SanityImage
                            image={other.coverImage}
                            width={700}
                            sizes="(max-width: 640px) 100vw, 380px"
                            className="cover-img"
                          />
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-3 px-3 pb-3 pt-4">
                        <div>
                          <p className="font-medium">{other.title}</p>
                          <p className="mt-0.5 text-sm text-muted-strong">{other.projectType}</p>
                        </div>
                        <ArrowUpRight aria-hidden size={16} className="mt-1 shrink-0 text-muted transition-colors group-hover:text-foreground" />
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      ) : null}
    </main>
  );
}
