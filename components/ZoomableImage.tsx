"use client";

import { useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { SanityImage } from "@/components/SanityImage";
import { imageDimensions } from "@/sanity/image";
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
  previewAspect,
}: {
  image: SanityImageType;
  width?: number;
  sizes?: string;
  /** Show only the top of the picture, at this height-over-width ratio, and
      leave the whole of it to the lightbox. For a full-page screenshot, whose
      inline height would otherwise run to several screens. */
  previewAspect?: number;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  // The full-size copy is mounted only once the dialog has been opened, so a
  // case study does not fetch a second, larger version of every screenshot that
  // nobody may enlarge. It stays mounted afterwards, so reopening costs nothing.
  const [loaded, setLoaded] = useState(false);

  const open = () => {
    setLoaded(true);
    ref.current?.showModal();
  };
  const close = () => ref.current?.close();

  // UI exports open at their logical width and scroll vertically, so fitting
  // a long screen into one viewport does not shrink its lettering. Other
  // images retain the existing fit-to-viewport behaviour.
  const size = imageDimensions(image);
  const frameWidth = image.displayWidth
    ? `min(96vw, ${image.displayWidth}px)`
    : size
      ? `min(96vw, ${size.width}px, calc(86vh * ${(size.width / size.height).toFixed(4)}))`
      : undefined;

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="zoomable img-plain group relative block w-full"
        aria-label={`Enlarge: ${image.alt ?? "screenshot"}`}
      >
        <div className="relative">
          <SanityImage
            image={image}
            width={width}
            sizes={sizes}
            aspect={previewAspect ?? (size ? size.height / size.width : undefined)}
            crop={Boolean(previewAspect)}
            focus="top"
            className="cover-img"
          />
          {previewAspect && (
            // Says there is more below the cut without a label having to.
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent"
            />
          )}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/75 text-white shadow-sm">
              <Maximize2 size={18} strokeWidth={1.75} />
            </span>
          </span>
        </div>
      </button>

      <dialog
        ref={ref}
        className="lightbox"
        style={frameWidth ? { width: frameWidth } : undefined}
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
          {/* The same padded surface protects the original screen edges
              when the full-resolution image is enlarged. */}
          <div className="img-plain no-scrollbar max-h-[90vh] overflow-y-auto shadow-2xl">
            {loaded && (
              <SanityImage
                image={image}
                width={size?.width ?? 2400}
                aspect={size ? size.height / size.width : undefined}
                sizes={size ? `(max-width: ${size.width}px) 96vw, ${size.width}px` : "96vw"}
                quality={90}
                contain
              />
            )}
          </div>

          {/* Outside the scroller, so it stays on the corner of the frame. */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground shadow-md transition-transform hover:scale-105"
          >
            <X aria-hidden size={18} />
          </button>

          {image.caption && (
            <p className="mt-3 text-center text-sm text-white/80">{image.caption}</p>
          )}
        </div>
      </dialog>
    </>
  );
}
