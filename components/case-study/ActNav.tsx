"use client";

import { useEffect, useState } from "react";

export type ActLink = { id: string; n: string; title: string };

/**
 * The case study's four acts as a sticky index. Highlights the act currently
 * on screen so a reader always knows where they are in the story.
 */
export function ActNav({ acts }: { acts: ActLink[] }) {
  const [active, setActive] = useState(acts[0]?.id);

  useEffect(() => {
    const nodes = acts
      .map((a) => document.getElementById(a.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [acts]);

  return (
    <nav aria-label="Case study sections" className="card rounded-2xl p-2">
      <ol className="space-y-0.5">
        {acts.map((act) => {
          const on = act.id === active;
          return (
            <li key={act.id}>
              <a
                href={`#${act.id}`}
                aria-current={on ? "location" : undefined}
                className={`flex items-baseline gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                  on ? "bg-dark text-white" : "text-muted-strong hover:text-foreground"
                }`}
              >
                <span className={`mono text-xs ${on ? "text-white/60" : "text-muted"}`}>{act.n}</span>
                <span className="font-medium">{act.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
