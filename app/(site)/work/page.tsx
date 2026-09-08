import Link from "next/link";
import { safeFetch } from "@/sanity/client";
import { PROJECTS_QUERY } from "@/sanity/queries";
import type { ProjectCard } from "@/sanity/types";
import { SanityImage } from "@/components/SanityImage";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Work | Tanvir Ahassan",
  description: "Selected product and UX design projects.",
};

export default async function WorkIndexPage() {
  const projects = await safeFetch<ProjectCard[]>(PROJECTS_QUERY);

  return (
    <main className="mx-auto max-w-page px-6 py-20 sm:py-24">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Work</h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">
          Selected projects where I designed intuitive, user-focused experiences that solve
          real business challenges.
        </p>
      </Reveal>

      {projects?.length ? (
        <ul className="mt-16 grid gap-8 sm:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project._id}>
              <Reveal delay={i * 60}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group raised raised-hover block h-full overflow-hidden rounded-2xl"
                >
                  {project.coverImage && (
                    <div className="overflow-hidden border-b border-border bg-surface-strong">
                      <SanityImage
                        image={project.coverImage}
                        width={900}
                        sizes="(max-width: 640px) 100vw, 500px"
                        className="cover-img"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-lg font-semibold tracking-tight">{project.title}</h2>
                      <span className="mono shrink-0 text-xs text-muted">{project.year}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {[project.projectType, project.industry].filter(Boolean).join(" · ")}
                    </p>
                    {project.summary && (
                      <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
                    )}
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-16 text-muted">No projects yet.</p>
      )}
    </main>
  );
}
