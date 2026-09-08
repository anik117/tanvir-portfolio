"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/**
 * A vertical rule that draws itself as its parent scrolls through the
 * viewport. Used for the timeline on the About page.
 */
export function GrowLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <div ref={ref} aria-hidden className={`absolute ${className}`}>
      <div className="absolute inset-0 bg-border" />
      <motion.div
        className="timeline-line absolute inset-0 bg-gradient-to-b from-accent via-accent-2 to-accent-3"
        style={{ scaleY }}
      />
    </div>
  );
}
