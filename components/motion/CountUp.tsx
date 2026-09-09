"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE } from "@/components/Reveal";

/**
 * Counts a stat up from zero when it scrolls into view. Takes the value as
 * stored in the Studio ("7+", "20+", "100%") and animates only the number,
 * leaving any prefix or suffix in place. Non-numeric values render as-is.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*?)(\d[\d,]*)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN;
  const [n, setN] = useState(reduce || Number.isNaN(target) ? target : 0);

  useEffect(() => {
    if (!inView || reduce || Number.isNaN(target)) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target]);

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }
  return (
    <span ref={ref} className={className}>
      {match[1]}
      {n.toLocaleString("en-US")}
      {match[3]}
    </span>
  );
}
