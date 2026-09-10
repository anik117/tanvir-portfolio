/** Publishes only Contact-page copy, leaving other site settings unchanged. */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-09-08" });
const contact = JSON.parse(
  readFileSync(join(process.cwd(), "sanity/seed/contact.json"), "utf8"),
);

async function main() {
  await client.patch("siteSettings").set(contact).commit();
  console.log("Contact-page copy published; other site settings were left unchanged.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
