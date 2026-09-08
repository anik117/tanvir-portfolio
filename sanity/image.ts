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
