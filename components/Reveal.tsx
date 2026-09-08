"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Fade-and-rise on scroll entry. Content is always in the DOM; with reduced
 * motion it simply renders in its final state.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
  once = true,
  amount = 0.15,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
