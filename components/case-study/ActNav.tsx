"use client";

import { useEffect, useState } from "react";

export type ActLink = { id: string; n: string; title: string };

/**
 * The case study's four acts as a sticky index: a hairline with a marker on
 * the act currently on screen, and nothing else.
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
    <nav aria-label="Case study sections">
      <ol className="border-l border-border">
        {acts.map((act) => {
          const on = act.id === active;
          return (
            <li key={act.id}>
              <a
                href={`#${act.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px block border-l-2 py-2 pl-5 text-[15px] transition-colors ${
                  on
                    ? "border-foreground font-semibold text-foreground"
                    : "border-transparent text-muted-strong hover:text-foreground"
                }`}
              >
                {act.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
