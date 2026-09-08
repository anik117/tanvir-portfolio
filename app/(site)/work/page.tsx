import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    <main className="mx-auto max-w-page px-5 py-20 sm:px-10 sm:py-28">
      <Reveal y={16}>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-5xl font-medium tracking-tight sm:text-[64px] sm:leading-none">
            All work.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-strong">
            {projects?.length ?? 0} case studies — the brief, what I found, how I built it, and
            what it set out to do.
          </p>
        </div>
      </Reveal>

      {projects?.length ? (
        <ul className="mt-16 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project._id}>
              <Reveal delay={i * 80} className="h-full">
                <Link
                  href={`/work/${project.slug}`}
                  className="card card-hover group block h-full overflow-hidden p-3"
                >
                  {project.coverImage && (
                    <div className="overflow-hidden rounded-xl border border-border bg-foreground/[0.03]">
                      <SanityImage
                        image={project.coverImage}
                        width={1000}
                        sizes="(max-width: 640px) 100vw, 560px"
                        priority={i < 2}
                        className="cover-img"
                      />
                    </div>
                  )}
                  <div className="px-3 pb-3 pt-5">
                    <p className="mono text-[12px] text-muted">
                      {[project.year, project.projectType, project.industry]
                        .filter(Boolean)
                        .join("  •  ")}
                    </p>
                    <div className="mt-3 flex items-start justify-between gap-4">
                      <h2 className="text-2xl font-medium tracking-tight">{project.title}</h2>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-strong transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                        <ArrowUpRight aria-hidden size={17} strokeWidth={2} />
                      </span>
                    </div>
                    {project.summary && (
                      <p className="mt-3 text-[15px] leading-relaxed text-muted-strong">
                        {project.summary}
                      </p>
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
