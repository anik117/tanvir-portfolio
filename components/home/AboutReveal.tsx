"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import type { SanityImage as SanityImageType } from "@/sanity/types";
import { SanityImage } from "@/components/SanityImage";

/**
 * The page pins for a while and three things happen with the scroll: the
 * paragraph darkens one word at a time, a row of what he does fades in
 * under it, and the pile of images beside it spreads into a loose grid.
 * With reduced motion everything starts finished and the section is simply
 * its own height.
 */

const spread = [
  { x: -120, y: -110, r: -7 },
  { x: 120, y: -95, r: 5 },
  { x: -135, y: 70, r: 6 },
  { x: 10, y: 120, r: -3 },
  { x: 140, y: 75, r: 8 },
];
const piled = [{ r: -6 }, { r: 4 }, { r: -2 }, { r: 0 }, { r: 7 }];

function Word({
  word,
  index,
  total,
  emphasis,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  emphasis: boolean;
  progress: MotionValue<number>;
}) {
  const start = 0.06 + (index / total) * 0.4;
  const opacity = useTransform(progress, [start, start + 0.04], [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block ${emphasis ? "emphasis" : ""}`}>
      {word}&nbsp;
    </motion.span>
  );
}

function Photo({
  image,
  index,
  progress,
}: {
  image: SanityImageType;
  index: number;
  progress: MotionValue<number>;
}) {
  const s = spread[index % spread.length];
  const p = piled[index % piled.length];
  const range = [0.48, 0.9];
  const x = useTransform(progress, range, [0, s.x]);
  const y = useTransform(progress, range, [0, s.y]);
  const rotate = useTransform(progress, range, [p.r, s.r]);
  return (
    <motion.div
      style={{ x, y, rotate, zIndex: index }}
      className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[22px] bg-white shadow-[var(--shadow-lift)] sm:h-[176px] sm:w-[176px]"
    >
      <SanityImage image={image} width={400} aspect={1} crop sizes="176px" fill />
    </motion.div>
  );
}

function Tail({
  chips,
  progress,
}: {
  chips: string[];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0.5, 0.62], [0, 1]);
  const y = useTransform(progress, [0.5, 0.62], [16, 0]);
  return (
    <motion.div style={{ opacity, y }} className="mt-10">
      {chips.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <li key={c} className="card rounded-full px-3.5 py-1.5 text-[13px] font-medium">
              {c}
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/about"
        className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-accent hover:text-accent-hover"
      >
        The longer version
        <ArrowRight aria-hidden size={16} className="arrow" />
      </Link>
    </motion.div>
  );
}

/**
 * 0 when the section's top reaches the top of the viewport, 1 when its
 * bottom reaches the bottom. Read from the live bounding box on every
 * scroll, so it stays right after images above the section finish loading
 * and shift it down — a cached offset would not.
 */
function useScrollThrough(ref: React.RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = node.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      progress.set(span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, progress]);
  return progress;
}

export function AboutReveal({
  text,
  images,
  chips = [],
}: {
  text: string;
  images: SanityImageType[];
  chips?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const scrollYProgress = useScrollThrough(ref);
  const words = text.trim().split(/\s+/);
  const emphasisFrom = words.length - 3;

  const paragraph = (
    <p
      className="heading text-[26px] font-semibold leading-[1.25] sm:text-[34px]"
      aria-label={text}
    >
      {words.map((w, i) => (
        <Word
          key={i}
          word={w}
          index={i}
          total={words.length}
          emphasis={i >= emphasisFrom}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );

  if (reduce) {
    return (
      <section id="about" className="mx-auto grid max-w-page gap-12 px-5 py-32 sm:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mono mb-6 text-[11px] uppercase tracking-[0.18em] text-muted-strong">About</p>
          <p className="heading text-[26px] font-semibold leading-[1.25] sm:text-[34px]">
            {words.slice(0, emphasisFrom).join(" ")}{" "}
            <em className="emphasis">{words.slice(emphasisFrom).join(" ")}</em>
          </p>
          <ul className="mt-10 flex flex-wrap gap-2">
            {chips.map((c) => (
              <li key={c} className="card rounded-full px-3.5 py-1.5 text-[13px] font-medium">{c}</li>
            ))}
          </ul>
          <Link href="/about" className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold">
            More about me
            <ArrowRight aria-hidden size={16} className="arrow" />
          </Link>
        </div>
        <ul className="flex flex-wrap justify-center gap-4">
          {images.map((img, i) => (
            <li key={i} className="h-[150px] w-[150px] overflow-hidden rounded-[22px] shadow-[var(--shadow-lift)]">
              <SanityImage image={img} width={400} aspect={1} crop sizes="150px" fill />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section id="about" ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-page items-center gap-10 px-5 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="mono mb-6 text-[11px] uppercase tracking-[0.18em] text-muted-strong">
              About
            </p>
            {paragraph}
            <Tail chips={chips} progress={scrollYProgress} />
          </div>

          {images.length > 0 && (
            <div
              aria-hidden
              className="relative hidden h-[420px] w-full scale-[0.7] sm:block sm:scale-100"
            >
              {images.map((img, i) => (
                <Photo key={i} image={img} index={i} progress={scrollYProgress} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
