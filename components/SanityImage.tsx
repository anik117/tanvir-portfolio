import Image from "next/image";
import { imageDimensions, urlFor } from "@/sanity/image";
import type { SanityImage as SanityImageType } from "@/sanity/types";

type Props = {
  image: SanityImageType;
  /** Rendered width hint for the CDN. */
  width?: number;
  /** Height as a fraction of width. Defaults to 16:9. With `crop`, the CDN
      crops to this ratio around the hotspot instead of letterboxing. */
  aspect?: number;
  crop?: boolean;
  /** Where `crop` takes its window from. "top" suits a full-page screenshot,
      whose subject is the fold rather than the middle. */
  focus?: "hotspot" | "top";
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Fill the parent box, cropping with object-fit. The parent needs a size. */
  fill?: boolean;
  /** Fill the lightbox frame's width; tall images scroll inside it. */
  contain?: boolean;
  /** JPEG quality asked of the CDN. Raise it where the image is shown large. */
  quality?: number;
};

export function SanityImage({
  image,
  width = 1600,
  aspect = 0.5625,
  crop = false,
  focus = "hotspot",
  sizes = "100vw",
  className,
  priority = false,
  fill = false,
  contain = false,
  quality = 82,
}: Props) {
  const builder = urlFor(image);
  if (!builder) return null;

  const height = Math.round(width * aspect);
  // UI lettering needs the original export pixels, without two lossy encodes.
  // These images are lazy-loaded and have their own logical display width.
  const preserveDetail = Boolean(image.displayWidth);
  const exportWidth = preserveDetail ? imageDimensions(image)?.width ?? width : width;
  let b = builder.width(exportWidth);
  if (crop) {
    b = b.height(Math.round(exportWidth * aspect)).fit("crop");
    if (focus === "top") b = b.crop("top");
  }
  const src = preserveDetail ? b.format("png").url() : b.auto("format").quality(quality).url();
  const alt = image.alt ?? "";

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      unoptimized={preserveDetail}
      className={className}
      style={
        fill
          ? { width: "100%", height: "100%", objectFit: "cover" }
          : contain
            ? { width: "100%", height: "auto", display: "block" }
            : { width: "100%", height: "auto" }
      }
    />
  );
}
