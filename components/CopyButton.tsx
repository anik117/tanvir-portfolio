"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies a string and confirms for a moment. */
export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      // Clipboard can be unavailable in insecure contexts; the value is
      // still visible on the page, so there is nothing else to do.
    }
  };

  return (
    <button type="button" onClick={copy} className="btn btn-light" aria-live="polite">
      {done ? <Check aria-hidden size={14} className="text-emerald-600" /> : <Copy aria-hidden size={14} />}
      {done ? "Copied" : label}
    </button>
  );
}
