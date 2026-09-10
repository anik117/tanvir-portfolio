/** Publishes only homepage positioning copy, leaving other site settings unchanged. */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-09-08" });
const home = JSON.parse(
  readFileSync(join(process.cwd(), "sanity/seed/home.json"), "utf8"),
);

async function main() {
  await client.patch("siteSettings").set(home).commit();
  console.log("Homepage copy published; other site settings were left unchanged.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
