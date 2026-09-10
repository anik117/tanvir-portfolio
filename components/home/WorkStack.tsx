import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectCard } from "@/sanity/types";
import { SanityImage } from "@/components/SanityImage";

/**
 * The project cards, each sticky at the same offset, so every new one slides
 * up over the last as the reader scrolls the dark band. Pure CSS: sticky
 * positioning inside a tall parent, no scroll hijacking.
 *
 * White cards, hairline-framed: ink text on the left, the product shot
 * filling a rounded frame inside white padding on the right.
 */
export function WorkStack({ projects }: { projects: ProjectCard[] }) {
  return (
    <ul className="space-y-8">
      {projects.map((project, i) => (
        <li key={project._id} className="sticky" style={{ top: "calc(var(--nav-h) + 1.5rem)" }}>
          <Link
            href={`/work/${project.slug}`}
            className="card group grid overflow-hidden shadow-[var(--shadow-lift)] transition-transform duration-500 ease-[var(--ease)] hover:-translate-y-1 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
          >
            <div className="flex flex-col justify-between p-6 sm:min-h-[400px] sm:p-8">
              <div>
                <p className="mono flex items-center justify-between text-[12px] text-muted-strong">
                  <span>
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                  <span>{project.year}</span>
                </p>
                <h3 className="mt-12 text-[28px] font-semibold leading-tight sm:mt-16 sm:text-[34px]">
                  {project.title}
                </h3>
                <p className="mono mt-3 text-[12px] text-muted-strong">
                  {[project.projectType, project.industry].filter(Boolean).join("  •  ")}
                </p>
                {project.summary && (
                  <p className="mt-5 max-w-[30ch] text-[15px] leading-relaxed text-muted-strong">
                    {project.summary}
                  </p>
                )}
              </div>
              <p className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-accent">
                Read the case study
                <ArrowUpRight aria-hidden size={15} className="arrow-up" />
              </p>
            </div>

            <div className="border-l border-border bg-white p-4 sm:p-5">
              {project.coverImage && (
                <div className="h-[220px] overflow-hidden rounded-2xl sm:h-full">
                  <SanityImage
                    image={project.coverImage}
                    width={1200}
                    sizes="(max-width: 640px) 100vw, 560px"
                    priority={i === 0}
                    fill
                    className="cover-img"
                  />
                </div>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
