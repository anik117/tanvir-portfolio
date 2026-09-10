/** Publishes only About-page copy, leaving all other site settings unchanged. */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-09-08" });
const about = JSON.parse(
  readFileSync(join(process.cwd(), "sanity/seed/about.json"), "utf8"),
);

async function main() {
  await client.patch("siteSettings").set(about).commit();
  console.log("About-page copy published; other site settings were left unchanged.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
