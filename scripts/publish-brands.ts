/**
 * Seeds the brand / logo marquee into siteSettings, uploading the current
 * logos from public/brands. Non-destructive: only the `brands` field is
 * patched, every other site setting is left untouched.
 *
 *   npx sanity login            # first time only
 *   npm run publish:brands
 *
 * Idempotent: assets are keyed by filename, so re-running relinks the existing
 * logo rather than uploading a duplicate. Run it once to move the current row
 * into the Studio; after that, manage brands in the Studio, not here.
 */
import { createReadStream, existsSync } from "node:fs";
import { join } from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-09-08" });

// Same names and order as the code fallback in lib/brands.ts.
const names = [
  "Salesforce",
  "Burger King",
  "Centerbase",
  "ExamSoft (Turnitin)",
  "OpenClinica",
  "TaxRise Inc.",
  "Alokito Teachers",
  "T-Mobile",
  "AT&T",
];

const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Uploads a logo only if the dataset does not already hold one by that name. */
async function resolveAsset(path: string, filename: string) {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}`,
    { filename },
  );
  if (existing?._id) return existing._id;
  if (!existsSync(path)) return null;
  const asset = await client.assets.upload("image", createReadStream(path), { filename });
  console.log(`  ↑ uploaded ${filename}`);
  return asset._id;
}

async function main() {
  const brands = [];
  for (const name of names) {
    const s = slug(name);
    let logoAssetId: string | null = null;
    for (const ext of ["svg", "png"]) {
      const file = `${s}.${ext}`;
      const path = join(process.cwd(), "public/brands", file);
      if (existsSync(path)) {
        logoAssetId = await resolveAsset(path, file);
        break;
      }
    }
    brands.push({
      _key: `brand-${s}`,
      name,
      ...(logoAssetId
        ? { logo: { _type: "image", asset: { _type: "reference", _ref: logoAssetId } } }
        : {}),
    });
  }

  await client.patch("siteSettings").set({ brands }).commit();
  console.log(`\nbrands: ${brands.length} written to siteSettings; other settings unchanged.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
