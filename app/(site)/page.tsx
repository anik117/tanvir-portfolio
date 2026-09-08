import Link from "next/link";
import { safeFetch } from "@/sanity/client";
import { PROJECTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { ProjectCard, SiteSettings } from "@/sanity/types";
import { SanityImage } from "@/components/SanityImage";
import { SetupBanner } from "@/components/SetupBanner";

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
            Run the import, then reload:{" "}
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
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-24 sm:pt-32">
        <h1 className="max-w-4xl text-balance text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          {settings?.heroHeadline}
        </h1>
        {settings?.heroSupporting && (
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {settings.heroSupporting}
          </p>
        )}
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h2 className="eyebrow">Selected work</h2>
          <p className="max-w-md text-sm text-muted sm:text-right">
            Projects where I designed intuitive, user-focused experiences that solve real
            business challenges.
          </p>
        </div>

        <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project._id} className={i % 3 === 0 ? "sm:col-span-2" : undefined}>
              <Link href={`/work/${project.slug}`} className="group block">
                {project.coverImage && (
                  <div className="overflow-hidden rounded-xl border border-border bg-surface">
                    <SanityImage
                      image={project.coverImage}
                      width={i % 3 === 0 ? 1600 : 900}
                      sizes={i % 3 === 0 ? "(max-width: 640px) 100vw, 1100px" : "(max-width: 640px) 100vw, 550px"}
                      priority={i === 0}
                      className="transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
                  <span className="eyebrow">
                    {[project.industry, project.year].filter(Boolean).join(" · ")}
                  </span>
                </div>
                {project.summary && (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Services */}
      {settings?.services?.length ? (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="eyebrow mb-12 border-b border-border pb-6">What I do</h2>
          <ul className="grid gap-10 sm:grid-cols-3">
            {settings.services.map((service) => (
              <li key={service._key ?? service.name}>
                <h3 className="text-lg font-medium tracking-tight">{service.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="eyebrow mb-12 border-b border-border pb-6">About</h2>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {settings?.aboutHeading && (
              <h3 className="max-w-xl text-balance text-3xl font-medium tracking-tight sm:text-4xl">
                {settings.aboutHeading}
              </h3>
            )}
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
              {settings?.aboutParagraphs?.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          <div className="space-y-12">
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
                <ol className="mt-4 space-y-2">
                  {settings.processSteps.map((step, i) => (
                    <li key={step._key ?? step.name} className="flex gap-4 text-sm">
                      <span className="font-mono text-xs text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{step.name}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {settings?.clientsNote && (
              <p className="text-sm leading-relaxed text-muted">{settings.clientsNote}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
