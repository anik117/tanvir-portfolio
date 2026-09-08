"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import type { SiteSettings } from "@/sanity/types";

type Item = NonNullable<SiteSettings["testimonials"]>[number];

/**
 * The client list is the navigation — picking a name swaps the quote — so the
 * companies are the interface rather than small print under a paragraph.
 *
 * Implemented as a real tablist: arrow keys move between clients, Home and End
 * jump to the ends, and the panel is labelled by its tab.
 */
export function Testimonials({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const current = items[active];
  if (!current) return null;

  const move = (next: number) => {
    const i = (next + items.length) % items.length;
    setActive(i);
    tabs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      move(keys[e.key]);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-14">
      <div
        role="tablist"
        aria-label="Clients and colleagues"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item._key ?? item.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`client-tab-${i}`}
              aria-selected={selected}
              aria-controls="client-quote"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`shrink-0 snap-start rounded-xl px-4 py-3 text-left transition-all lg:w-full ${
                selected
                  ? "bg-surface shadow-sm ring-1 ring-border"
                  : "text-muted hover:bg-surface/70"
              }`}
            >
              <span
                className={`block whitespace-nowrap text-sm font-semibold lg:whitespace-normal ${
                  selected ? "text-foreground" : ""
                }`}
              >
                {item.name}
              </span>
              <span className="mt-0.5 block whitespace-nowrap text-xs lg:whitespace-normal">
                {item.company ? (
                  <span className={selected ? "text-accent" : "text-muted"}>{item.company}</span>
                ) : (
                  <span className="text-muted">{item.title}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="client-quote"
        aria-labelledby={`client-tab-${active}`}
        className="raised rounded-2xl p-7 sm:p-10"
      >
        <Quote aria-hidden size={26} className="text-accent/25" />

        {/* Keyed so the browser rebuilds the block and replays the fade. */}
        <blockquote key={active} className="quote-in mt-5">
          <p className="text-balance text-lg leading-relaxed sm:text-xl">
            {current.quote}
          </p>

          <footer className="mt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t border-border pt-6">
            <div>
              <p className="font-semibold">{current.name}</p>
              <p className="mt-0.5 text-sm text-muted">
                {current.title}
                {current.company && (
                  <>
                    {current.title ? " · " : ""}
                    <span className="font-medium text-accent">{current.company}</span>
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {current.relationship && (
                <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted">
                  {current.relationship}
                  {current.date ? ` · ${current.date}` : ""}
                </span>
              )}
              {current.projectSlug && (
                <Link
                  href={`/work/${current.projectSlug}`}
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:opacity-75"
                >
                  See the project
                  <ArrowRight aria-hidden size={15} className="arrow" />
                </Link>
              )}
            </div>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
