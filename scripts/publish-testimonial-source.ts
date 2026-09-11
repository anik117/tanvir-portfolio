/**
 * Stamps `source: "LinkedIn"` onto every existing testimonial and drops the old
 * `date` field, so the chip reads the source instead of a date. Non-destructive
 * to everything else: only the testimonials array is rewritten, with all other
 * fields (quote, name, logo reference, etc.) preserved.
 *
 *   npx sanity login          # first time only
 *   npm run publish:testimonials
 *
 * Idempotent: re-running just re-sets the same source.
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-09-08" });

type Testimonial = { source?: string; date?: string; [key: string]: unknown };

async function main() {
  const testimonials = await client.fetch<Testimonial[] | null>(
    `*[_id == "siteSettings"][0].testimonials`,
  );
  if (!testimonials?.length) {
    console.log("No testimonials found; nothing to do.");
    return;
  }

  const updated = testimonials.map(({ date: _date, ...t }) => ({
    ...t,
    source: t.source ?? "LinkedIn",
  }));

  await client.patch("siteSettings").set({ testimonials: updated }).commit();
  console.log(`testimonials: ${updated.length} updated with a source; date removed.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
