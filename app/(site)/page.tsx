import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { safeFetch } from "@/sanity/client";
import { PROJECTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { ProjectCard, SiteSettings } from "@/sanity/types";
import { AnnotatedImage } from "@/components/AnnotatedImage";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";
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
        <main className="mx-auto max-w-page px-6 py-32">
          <h1 className="text-4xl font-semibold tracking-tight">No content yet</h1>
        </main>
      </>
    );
  }

  return (
    <main className="mx-auto max-w-page px-6">
      <section className="border-b border-border py-24 sm:py-32">
        <Reveal>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            {settings?.heroHeadline && (
              <Highlight text={settings.heroHeadline} words={3} />
            )}
          </h1>
          {settings?.heroSupporting && (
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              {settings.heroSupporting}
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group btn btn-primary"
            >
              Get in touch
              <ArrowRight aria-hidden size={16} className="arrow" />
            </Link>
            <Link
              href="/about"
              className="btn btn-secondary"
            >
              About me
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="py-20">
        <h2 className="text-sm font-medium text-muted">
          Selected work — {projects.length} projects
        </h2>

        <ul className="mt-14 space-y-28">
          {projects.map((project, i) => (
            <li key={project._id}>
              <Reveal>
                <article className="group">
                  <div className="mb-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                    <span className="mono text-sm text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      <Link href={`/work/${project.slug}`} className="hover:opacity-70">
                        {project.title}
                      </Link>
                    </h3>
                    <span className="text-sm text-muted">
                      {[project.industry, project.year].filter(Boolean).join(" · ")}
                    </span>
                  </div>

                  {project.summary && (
                    <p className="mb-8 max-w-2xl leading-relaxed text-muted">
                      {project.summary}
                    </p>
                  )}

                  {project.coverImage && (
                    <Link href={`/work/${project.slug}`} className="block">
                      <AnnotatedImage
                        image={project.coverImage}
                        width={1600}
                        sizes="(max-width: 1024px) 100vw, 1200px"
                        priority={i === 0}
                      />
                    </Link>
                  )}

                  <Link
                    href={`/work/${project.slug}`}
                    className="mt-7 btn btn-secondary"
                  >
                    Read the case study
                    <ArrowRight aria-hidden size={16} className="arrow" />
                  </Link>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
