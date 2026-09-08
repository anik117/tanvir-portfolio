import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { SanityImage as SanityImageType } from "@/sanity/types";

type Props = {
  image: SanityImageType;
  /** Rendered width hint for the CDN. Height follows the source aspect ratio. */
  width?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export function SanityImage({
  image,
  width = 1600,
  sizes = "100vw",
  className,
  priority = false,
}: Props) {
  const builder = urlFor(image);
  if (!builder) return null;

  const src = builder.width(width).auto("format").quality(82).url();
  const alt = image.alt ?? "";

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={Math.round(width * 0.5625)}
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ width: "100%", height: "auto" }}
    />
  );
}
