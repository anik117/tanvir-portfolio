"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ProjectCard } from "@/sanity/types";
import { SanityImage } from "@/components/SanityImage";
import { EASE } from "@/components/Reveal";

const DWELL = 5000;

/**
 * The hero's one prop: an artboard that turns through every project's cover,
 * a few seconds each, with the label and link following. Every cover is in
 * the DOM from the start so a switch is a crossfade, never a load. Hovering
 * holds the current one; the dots jump; reduced motion shows only the first.
 */
export function HeroArtboard({ projects }: { projects: ProjectCard[] }) {
  const reduce = useReducedMotion();
  const items = projects.filter((p) => p.coverImage);
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const rotating = !reduce && !held && items.length > 1;

  useEffect(() => {
    if (!rotating) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), DWELL);
    return () => window.clearInterval(id);
  }, [rotating, items.length]);

  const current = items[index];
  if (!current) return null;

  return (
    <div
      className="card p-2 shadow-[var(--shadow-lift)]"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="mono flex items-center justify-between px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-muted-strong">
        <span className="relative block h-[1.2em] flex-1 overflow-hidden" aria-live="polite">
          {items.map((p, i) => (
            <motion.span
              key={p._id}
              className="absolute inset-x-0 top-0"
              initial={false}
              animate={{ opacity: i === index ? 1 : 0, y: i === index ? 0 : 6 }}
              transition={{ duration: 0.5, ease: EASE }}
              aria-hidden={i !== index}
            >
              {p.title}
              {p.year ? ` · ${p.year}` : ""}
            </motion.span>
          ))}
        </span>
        <Link
          href={`/work/${current.slug}`}
          className="group inline-flex items-center gap-1 normal-case tracking-normal text-accent hover:text-accent-hover"
        >
          Case study
          <ArrowUpRight aria-hidden size={12} className="arrow-up" />
        </Link>
      </div>

      <div className="canvas-grid rounded-[18px] border border-border p-5 sm:p-7">
        <Link
          href={`/work/${current.slug}`}
          aria-label={`${current.title} case study`}
          className="relative block aspect-[16/9] w-full"
        >
          {items.map((p, i) => (
            <motion.div
              key={p._id}
              className="absolute inset-0 overflow-hidden rounded-xl border border-border bg-white shadow-[0_24px_48px_-16px_rgb(18_31_49/0.25)]"
              initial={false}
              animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1 : 0.985 }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{ pointerEvents: i === index ? "auto" : "none" }}
              aria-hidden={i !== index}
            >
              <SanityImage
                image={p.coverImage!}
                width={1200}
                sizes="(max-width: 1024px) 100vw, 560px"
                priority={i === 0}
                fill
              />
            </motion.div>
          ))}
        </Link>

        {items.length > 1 && (
          <ol className="mt-5 flex items-center justify-center gap-2" aria-label="Projects">
            {items.map((p, i) => {
              const on = i === index;
              return (
                <li key={p._id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show ${p.title}`}
                    aria-current={on ? "true" : undefined}
                    className={`relative h-1.5 overflow-hidden rounded-full bg-foreground/10 transition-[width] duration-300 ${
                      on ? "w-8" : "w-1.5 hover:bg-foreground/30"
                    }`}
                  >
                    {on && (
                      <span
                        key={index}
                        className="absolute inset-y-0 left-0 rounded-full bg-accent"
                        style={{
                          animation: rotating ? `dwell ${DWELL}ms linear forwards` : "none",
                          width: rotating ? undefined : "100%",
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
