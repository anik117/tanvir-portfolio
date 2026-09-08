import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectCard } from "@/sanity/types";
import { AnnotatedImage } from "@/components/AnnotatedImage";

/**
 * The hero's one prop: the latest cover on a canvas grid with its decisions
 * pinned, framed like an artboard with a mono label. A screenshot shows what
 * shipped; the callouts show what was decided — and that is the whole pitch.
 */
export function HeroArtboard({ project }: { project: ProjectCard }) {
  if (!project.coverImage) return null;
  return (
    <div className="card rounded-2xl p-2 shadow-[var(--shadow-lift)]">
      <div className="mono flex items-center justify-between px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-muted-strong">
        <span>
          {project.title}
          {project.year ? ` · ${project.year}` : ""}
        </span>
        <Link
          href={`/work/${project.slug}`}
          className="group inline-flex items-center gap-1 normal-case tracking-normal text-foreground hover:text-muted-strong"
        >
          Case study
          <ArrowUpRight aria-hidden size={12} className="arrow-up" />
        </Link>
      </div>
      <div className="canvas-grid group rounded-xl border border-border p-5 sm:p-7">
        <AnnotatedImage
          image={project.coverImage}
          width={1200}
          sizes="(max-width: 1024px) 100vw, 560px"
          priority
          list={false}
          compact
          className="[&_img]:shadow-[0_24px_48px_-16px_rgb(0_0_0/0.35)]"
        />
      </div>
    </div>
  );
}
