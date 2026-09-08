"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { SiteSettings } from "@/sanity/types";

type Item = NonNullable<SiteSettings["testimonials"]>[number];

/** A blue disc with bold initials — no photos are needed. */
function Avatar({ name, large }: { name: string; large: boolean }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white transition-all duration-500 ${
        large ? "h-14 w-14 text-[17px]" : "h-11 w-11 text-[14px]"
      } bg-accent`}
    >
      {initials}
    </span>
  );
}

/**
 * A row of quotes that scrolls sideways. One card is open — wide and tall,
 * the full quote at reading size — and the rest sit beside it smaller.
 * Clicking a card opens it and closes the last, and the row recentres on it.
 */
export function TestimonialCarousel({ items }: { items: Item[] }) {
  const track = useRef<HTMLUListElement>(null);
  // Open the middle of the first three, so the row reads small · large · small.
  const [active, setActive] = useState(items.length >= 3 ? 1 : 0);

  /**
   * Scroll the row so card `i` sits in the middle. Computed from the cards'
   * target widths rather than measured, so it is right even while the width
   * transition is still running — and it only ever moves the row, never the
   * page, which `scrollIntoView` would do on first paint.
   */
  const centre = (i: number, behavior: ScrollBehavior = "smooth") => {
    const node = track.current;
    if (!node) return;
    const wide = window.innerWidth >= 640;
    const small = wide ? 300 : window.innerWidth * 0.7;
    const large = wide ? 600 : window.innerWidth * 0.86;
    const gap = 20;
    const pad = parseFloat(getComputedStyle(node).paddingLeft) || 0;
    const left = pad + i * (small + gap);
    node.scrollTo({ left: left + large / 2 - node.clientWidth / 2, behavior });
  };

  // Start with the open card in the middle of the row.
  useEffect(() => {
    centre(active, "auto");
    // Only on mount — later moves are driven by the handlers below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = (i: number) => {
    setActive(i);
    centre(i);
  };

  return (
    <section className="panel-sky mt-8 overflow-hidden rounded-[32px] py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <h2 className="text-4xl font-semibold leading-[1.05] sm:text-[52px]">
          What clients and teammates say
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[18px] text-muted-strong sm:text-[20px]">
          Who hired him, who worked beside him — each card says which.
        </p>
        <div className="mt-7 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => open(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/80 shadow-[var(--shadow-card)] transition-colors hover:bg-white disabled:opacity-40"
          >
            <ArrowLeft aria-hidden size={17} />
          </button>
          <button
            type="button"
            onClick={() => open(Math.min(items.length - 1, active + 1))}
            disabled={active === items.length - 1}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/80 shadow-[var(--shadow-card)] transition-colors hover:bg-white disabled:opacity-40"
          >
            <ArrowRight aria-hidden size={17} />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        className="no-scrollbar mt-12 flex items-center gap-5 overflow-x-auto px-[6vw] pb-4 sm:px-[12vw]"
      >
        {items.map((item, i) => {
          const on = i === active;
          return (
            <li
              key={item._key ?? item.name}
              className={`flex shrink-0 transition-[width,height] duration-500 ease-[var(--ease)] ${
                on ? "min-h-[440px] w-[86vw] sm:h-[440px] sm:w-[600px]" : "h-[360px] w-[70vw] sm:w-[300px]"
              }`}
            >
              <button
                type="button"
                onClick={() => open(i)}
                aria-pressed={on}
                className={`card flex h-full w-full flex-col justify-between p-7 text-left transition-[opacity,box-shadow] duration-500 sm:p-8 ${
                  on ? "opacity-100 shadow-[var(--shadow-lift)]" : "opacity-75 hover:opacity-95"
                }`}
              >
                <blockquote
                  className={`leading-[1.6] transition-[font-size] duration-500 ${
                    on
                      ? "line-clamp-[11] text-[16px] sm:line-clamp-none sm:text-[19px] sm:leading-[1.55]"
                      : "line-clamp-6 text-[14px]"
                  }`}
                >
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-6">
                  <span className="flex items-center gap-3.5">
                    <Avatar name={item.name} large={on} />
                    <span className="min-w-0">
                      <span className="block text-[14px] font-semibold">{item.name}</span>
                      <span className="block text-[13px] leading-snug text-muted-strong">
                        {[item.title, item.company].filter(Boolean).join(" @ ")}
                      </span>
                    </span>
                  </span>
                  {on && (
                    <span className="mono flex flex-wrap items-center gap-x-4 text-[11px] uppercase tracking-[0.12em] text-muted">
                      {item.relationship && (
                        <span>
                          {item.relationship}
                          {item.date ? ` · ${item.date}` : ""}
                        </span>
                      )}
                      {item.projectSlug && (
                        <Link
                          href={`/work/${item.projectSlug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-accent hover:text-accent-hover"
                        >
                          Project ↗
                        </Link>
                      )}
                    </span>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <ol className="mt-6 flex justify-center gap-2" aria-label="Quotes">
        {items.map((item, i) => (
          <li key={item._key ?? item.name}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`Open quote ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-accent" : "w-2 bg-foreground/15 hover:bg-foreground/35"
              }`}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
