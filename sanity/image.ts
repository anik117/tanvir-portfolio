import createImageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder =
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

/**
 * Build a Sanity CDN image URL. Returns null when Sanity is not configured,
 * so callers fall back rather than rendering a broken image.
 */
export function urlFor(source: SanityImageSource) {
  return builder ? builder.image(source) : null;
}

/**
 * The image's real pixel size, read straight out of the asset id — Sanity
 * encodes it there as `image-<hash>-1600x900-jpg`. Saves a join in every query
 * that only needs the shape of a picture. Null when the id is not in reach.
 */
export function imageDimensions(
  source: SanityImageSource,
): { width: number; height: number } | null {
  const asset = (source as { asset?: { _ref?: string; _id?: string } })?.asset;
  const ref =
    typeof source === "string"
      ? source
      : (asset?._ref ?? asset?._id ?? (source as { _ref?: string })?._ref);
  const size = typeof ref === "string" ? /-(\d+)x(\d+)-[a-z]+$/.exec(ref) : null;
  if (!size) return null;
  return { width: Number(size[1]), height: Number(size[2]) };
}
