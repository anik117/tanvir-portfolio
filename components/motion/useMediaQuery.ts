"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribe to a media query without a setState-in-effect. Returns `false`
 * on the server and on the first client render, so markup matches.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useFinePointer = () => useMediaQuery("(pointer: fine)");
