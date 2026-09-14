import type { SchemaTypeDefinition } from "sanity";
import { chapterTypes } from "./chapters";
import { project } from "./project";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  project,
  siteSettings,
  ...(chapterTypes as SchemaTypeDefinition[]),
];
