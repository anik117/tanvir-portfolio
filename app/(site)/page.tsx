import Link from "next/link";
import { safeFetch } from "@/sanity/client";
import { PROJECTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { ProjectCard, SiteSettings } from "@/sanity/types";
import { AnnotatedImage } from "@/components/AnnotatedImage";
import { Reveal } from "@/components/Reveal";
import { SetupBanner } from "@/components/SetupBanner";
import { Highlight } from "@/components/Highlight";

export default async function HomePage() {
  const [projects, settings] = await Promise.all([
    safeFetch<ProjectCard[]>(PROJECTS_QUERY),
    safeFetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  if (!projects?.length) {
    return (
      <>
        <SetupBanner />
        <main className="mx-auto max-w-6xl px-6 py-32">
          <h1 className="text-4xl font-medium tracking-tight">No content yet</h1>
          <p className="mt-4 text-muted">
            Run{" "}
            <code className="font-mono text-sm">
              npx sanity exec scripts/import-content.ts --with-user-token
            </code>
          </p>
        </main>
      </>
    );
  }

  return (
    <main>
      <section className="mx-auto max-w-2xl px-6 pb-28 pt-24 text-center sm:pt-32">
        <Reveal>
          <h1 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight sm:text-[2.75rem]">
            {settings?.heroHeadline && <Highlight text={settings.heroHeadline} words={3} />}
          </h1>
          {settings?.heroSupporting && (
            <p className="mx-auto mt-6 max-w-xl text-balance leading-relaxed text-muted">
              {settings.heroSupporting}
            </p>
          )}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {settings?.ctaUrl && (
              <a
                href={settings.ctaUrl}
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/10"
              >
                {settings.ctaLabel ?? "Book a Call"}
              </a>
            )}
            {settings?.email && (
              <a
                href={`mailto:${settings.email}`}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:bg-surface"
              >
                Email me
              </a>
            )}
          </div>
        </Reveal>
      </section>

      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-8">
        <ul className="space-y-24">
          {projects.map((project, i) => (
            <li key={project._id}>
              <Reveal>
                <article className="group">
                  {project.coverImage && (
                    <Link href={`/work/${project.slug}`} className="block">
                      <AnnotatedImage
                        image={project.coverImage}
                        width={1600}
                        sizes="(max-width: 1024px) 100vw, 1100px"
                        priority={i === 0}
                      />
                    </Link>
                  )}

                  <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                    <div>
                      <h2 className="text-2xl font-medium tracking-tight">
                        <Link href={`/work/${project.slug}`} className="hover:opacity-70">
                          {project.title}
                        </Link>
                      </h2>
                      {project.summary && (
                        <p className="mt-2 max-w-2xl leading-relaxed text-muted">
                          {project.summary}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="eyebrow">
                        {[project.projectType, project.year].filter(Boolean).join(" · ")}
                      </span>
                      <Link
                        href={`/work/${project.slug}`}
                        className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-surface"
                      >
                        Case study <span className="arrow">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {settings?.services?.length ? (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <h2 className="eyebrow mb-10 border-b border-border pb-5">What I do</h2>
            <ul className="grid gap-10 sm:grid-cols-3">
              {settings.services.map((service) => (
                <li key={service._key ?? service.name}>
                  <h3 className="font-medium tracking-tight">{service.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ) : null}

      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
        <Reveal>
          <h2 className="eyebrow mb-10 border-b border-border pb-5">About</h2>
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
            <div>
              {settings?.aboutHeading && (
                <h3 className="max-w-xl text-balance text-2xl font-medium tracking-tight sm:text-3xl">
                  {settings.aboutHeading}
                </h3>
              )}
              <div className="mt-7 space-y-5 leading-relaxed text-muted">
                {settings?.aboutParagraphs?.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div className="space-y-11">
              {settings?.stats?.length ? (
                <dl className="grid grid-cols-3 gap-6">
                  {settings.stats.map((stat) => (
                    <div key={stat._key ?? stat.label}>
                      <dt className="text-3xl font-medium tracking-tight">{stat.value}</dt>
                      <dd className="mt-1 text-xs text-muted">{stat.label}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {settings?.processSteps?.length ? (
                <div>
                  <h4 className="eyebrow">Process</h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {settings.processSteps.map((step) => (
                      <li
                        key={step._key ?? step.name}
                        className="rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-sm transition-colors hover:bg-surface"
                      >
                        {step.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {settings?.clientsNote && (
                <p className="text-sm leading-relaxed text-muted">{settings.clientsNote}</p>
              )}
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
