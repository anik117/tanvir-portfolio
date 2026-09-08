import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/** Null until Sanity is configured. Every caller must handle that. */
export const client: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Next's revalidate window controls freshness; the CDN just makes the
      // fetch cheap when it does run.
      useCdn: true,
      perspective: "published",
    })
  : null;

/** Fetch that never throws — returns null on any failure. */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.error("[sanity] fetch failed:", error);
    return null;
  }
}
