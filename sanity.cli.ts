import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

// Lets `npx sanity <command>` run from the repo root without extra flags,
// e.g. `npx sanity cors add http://localhost:3000 --credentials`.
export default defineCliConfig({
  api: { projectId, dataset },
});
