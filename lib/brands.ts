import { existsSync } from "node:fs";
import path from "node:path";
import type { Brand } from "@/components/home/BrandMarquee";

/**
 * Brands Tanvir has worked with, in the order he gave them. A logo is used
 * when `public/brands/<slug>.svg` (or .png) exists; otherwise the name is
 * set as a wordmark, so the row works before any logo files are added.
 */
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

export function brands(): Brand[] {
  return names.map((name) => {
    const s = slug(name);
    const file = ["svg", "png"]
      .map((ext) => `${s}.${ext}`)
      .find((f) => existsSync(path.join(process.cwd(), "public", "brands", f)));
    return { name, slug: s, logo: file ? `/brands/${file}` : undefined };
  });
}
