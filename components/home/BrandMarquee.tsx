"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export type Brand = { name: string; slug: string; logo?: string };

const SPEED = 56; // px per second
const SLOW = 0.18; // fraction of full speed while a logo is hovered
const COPIES = 4; // enough that even a very wide screen never sees the row run out

/**
 * The brands he has worked with, drifting past. Driven by a frame loop
 * rather than a CSS animation so the speed can ease down under the cursor
 * and back up again without a jump. Four copies of the row make the loop
 * seamless on any width; reduced motion shows a static wrapped list instead.
 */
export function BrandMarquee({ brands }: { brands: Brand[] }) {
  const reduce = useReducedMotion();
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const node = track.current;
    if (!node || reduce) return;
    let x = 0;
    let speed = 1;
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // Read hover straight from the DOM each frame, so it cannot be missed.
      const target = node.querySelector("li:hover") ? SLOW : 1;
      speed += (target - speed) * Math.min(1, dt * 5);
      x -= SPEED * speed * dt;
      const one = node.scrollWidth / COPIES;
      if (one > 0 && -x >= one) x += one;
      node.style.transform = `translate3d(${x}px,0,0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduce]);

  const item = (b: Brand, hidden: boolean, copy = 0) => (
    <li
      key={`${b.slug}-${copy}`}
      aria-hidden={hidden || undefined}
      className="flex h-12 shrink-0 items-center px-8 text-muted-strong/60 transition-colors duration-300 hover:text-foreground"
    >
      {b.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={b.logo}
          alt={b.name}
          className="h-9 w-auto max-w-[160px] opacity-55 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        <span className="heading whitespace-nowrap text-[22px] font-bold">{b.name}</span>
      )}
    </li>
  );

  if (reduce) {
    return (
      <ul className="flex flex-wrap items-center justify-center gap-y-2" aria-label="Brands worked with">
        {brands.map((b) => item(b, false))}
      </ul>
    );
  }

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <ul ref={track} className="flex w-max items-center will-change-transform" aria-label="Brands worked with">
        {Array.from({ length: COPIES }, (_, c) => brands.map((b) => item(b, c > 0, c)))}
      </ul>
    </div>
  );
}
