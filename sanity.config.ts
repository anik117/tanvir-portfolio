import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

// projectId falls back to a placeholder so this module never throws at import
// time. app/studio guards on isSanityConfigured before mounting the Studio.
export default defineConfig({
  basePath: "/studio",
  projectId: projectId ?? "placeholder",
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
