"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fade-and-rise on scroll entry. IntersectionObserver plus a CSS transition —
 * the motion in docs/design-direction.md does not need an animation library.
 *
 * Content is always in the DOM. If the observer never fires, or the visitor
 * prefers reduced motion, it simply renders in its final state.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion is handled in CSS, which forces the final state.
    // This only guards against IntersectionObserver being unavailable.
    if (!("IntersectionObserver" in window)) {
      const id = setTimeout(() => setShown(true), 0);
      return () => clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
