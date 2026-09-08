"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { SanityImage } from "@/components/SanityImage";
import type { SanityImage as SanityImageType } from "@/sanity/types";

/**
 * A screenshot that opens full size in a lightbox.
 *
 * Uses a native <dialog>, so focus trapping, Esc to close, and the inert
 * background all come from the platform rather than being reimplemented.
 */
export function ZoomableImage({
  image,
  width = 900,
  sizes = "(max-width: 768px) 100vw, 736px",
}: {
  image: SanityImageType;
  width?: number;
  sizes?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  const open = () => ref.current?.showModal();
  const close = () => ref.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="zoomable block w-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-lg"
        aria-label={`Enlarge: ${image.alt ?? "screenshot"}`}
      >
        <SanityImage image={image} width={width} sizes={sizes} />
      </button>

      <dialog
        ref={ref}
        className="lightbox"
        // <dialog> closes on Escape on its own; this makes it explicit rather
        // than resting on UA behaviour we cannot exercise in tests.
        onKeyDown={(e) => {
          if (e.key === "Escape") close();
        }}
        onClick={(e) => {
          // Clicks land on the dialog itself only when they hit the backdrop.
          if (e.target === ref.current) close();
        }}
      >
        <div className="relative">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md ring-1 ring-border backdrop-blur transition-transform hover:scale-105"
          >
            <X aria-hidden size={18} />
          </button>

          <div className="overflow-hidden rounded-xl bg-surface">
            <SanityImage image={image} width={2000} sizes="96vw" />
          </div>

          {image.caption && (
            <p className="mt-3 text-center text-sm text-white/80">{image.caption}</p>
          )}
        </div>
      </dialog>
    </>
  );
}
