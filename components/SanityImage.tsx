import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { SanityImage as SanityImageType } from "@/sanity/types";

type Props = {
  image: SanityImageType;
  /** Rendered width hint for the CDN. */
  width?: number;
  /** Height as a fraction of width. Defaults to 16:9. With `crop`, the CDN
      crops to this ratio around the hotspot instead of letterboxing. */
  aspect?: number;
  crop?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Fill the parent box, cropping with object-fit. The parent needs a size. */
  fill?: boolean;
  /** Scale to fit the viewport, keeping the whole image visible. For the lightbox. */
  contain?: boolean;
};

export function SanityImage({
  image,
  width = 1600,
  aspect = 0.5625,
  crop = false,
  sizes = "100vw",
  className,
  priority = false,
  fill = false,
  contain = false,
}: Props) {
  const builder = urlFor(image);
  if (!builder) return null;

  const height = Math.round(width * aspect);
  let b = builder.width(width);
  if (crop) b = b.height(height).fit("crop");
  const src = b.auto("format").quality(82).url();
  const alt = image.alt ?? "";

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
      style={
        fill
          ? { width: "100%", height: "100%", objectFit: "cover" }
          : contain
            ? { width: "auto", height: "auto", maxWidth: "min(96vw, 1600px)", maxHeight: "84vh" }
            : { width: "100%", height: "auto" }
      }
    />
  );
}
