"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { SiteSettings } from "@/sanity/types";
import { EASE } from "@/components/Reveal";

type Item = NonNullable<SiteSettings["testimonials"]>[number];

const DWELL = 7000;

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** A corner bracket, four of which frame the quote like a print proof. */
function Corner({ className }: { className: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute h-5 w-5 border-border ${className}`} />
  );
}

/**
 * One quote at a time, centred on plain white, framed by four corner marks.
 * It turns on its own every few seconds, holds while hovered or focused, and
 * the arrows and dots move it by hand. Reduced motion swaps without the fade.
 */
export function TestimonialSpotlight({ items }: { items: Item[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const rotating = !reduce && !held && items.length > 1;

  useEffect(() => {
    if (!rotating) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), DWELL);
    return () => window.clearInterval(id);
  }, [rotating, items.length]);

  const item = items[index];
  if (!item) return null;
  const go = (i: number) => setIndex((i + items.length) % items.length);

  return (
    <section
      className="py-20 sm:py-28"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <h2 className="serif text-[32px] leading-none sm:text-[38px]">Testimonials</h2>

      <div className="relative mt-8 px-4 py-14 sm:px-16 sm:py-20">
        <Corner className="left-0 top-0 border-l border-t" />
        <Corner className="right-0 top-0 border-r border-t" />
        <Corner className="bottom-0 left-0 border-b border-l" />
        <Corner className="bottom-0 right-0 border-b border-r" />

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous testimonial"
          className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-muted-strong shadow-[var(--shadow-card)] transition-colors hover:bg-accent hover:text-white sm:flex"
        >
          <ArrowLeft aria-hidden size={17} />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next testimonial"
          className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-muted-strong shadow-[var(--shadow-card)] transition-colors hover:bg-accent hover:text-white sm:flex"
        >
          <ArrowRight aria-hidden size={17} />
        </button>

        <div className="mx-auto max-w-[640px] text-center" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={item._key ?? index}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <span
                aria-hidden
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-[17px] font-bold text-white shadow-[var(--shadow-card)]"
              >
                {initials(item.name)}
              </span>

              <blockquote className="mt-7 text-[18px] leading-[1.6] sm:text-[21px] sm:leading-[1.55]">
                {item.quote}
              </blockquote>

              <figcaption className="mt-7">
                <p className="text-[15px] font-semibold">{item.name}</p>
                <p className="mt-1 text-[13px] text-muted-strong">
                  {[item.title, item.company].filter(Boolean).join(" at ")}
                </p>
                <p className="mono mt-3 flex flex-wrap items-center justify-center gap-x-4 text-[11px] uppercase tracking-[0.12em] text-muted">
                  {item.relationship && (
                    <span>
                      {item.relationship}
                      {item.date ? ` · ${item.date}` : ""}
                    </span>
                  )}
                  {item.projectSlug && (
                    <Link
                      href={`/work/${item.projectSlug}`}
                      className="inline-flex items-center gap-1 text-accent hover:text-accent-hover"
                    >
                      Project
                      <ArrowUpRight aria-hidden size={11} />
                    </Link>
                  )}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted-strong sm:hidden"
        >
          <ArrowLeft aria-hidden size={16} />
        </button>
        <ol className="flex items-center gap-2" aria-label="Testimonials">
          {items.map((t, i) => (
            <li key={t._key ?? i}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-accent" : "w-2 bg-foreground/15 hover:bg-foreground/35"
                }`}
              />
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted-strong sm:hidden"
        >
          <ArrowRight aria-hidden size={16} />
        </button>
      </div>
    </section>
  );
}
