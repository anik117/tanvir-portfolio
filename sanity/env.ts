// Sanity connection values. Everything here tolerates a missing project ID so
// the app still builds and runs before the Sanity account exists.

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-08";

/** False until NEXT_PUBLIC_SANITY_PROJECT_ID is set in .env.local */
export const isSanityConfigured = Boolean(projectId);
