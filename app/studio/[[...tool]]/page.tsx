"use client";

import dynamic from "next/dynamic";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

// The Studio is a large browser-only bundle. Server-rendering it fails on
// React internals and only recovers by falling back to client rendering, so
// skip SSR outright.
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 font-mono text-xs uppercase tracking-widest text-muted">
        Loading Studio…
      </div>
    ),
  },
);

function SetupInstructions() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-24">
      <h1 className="text-2xl font-medium tracking-tight">Connect Sanity</h1>
      <p className="mt-3 text-muted">
        The Studio is wired up and the schemas are ready. It needs a project to point at.
      </p>

      <ol className="mt-10 space-y-6 text-sm leading-relaxed">
        <li>
          <span className="font-medium">1. Create a free account</span> at{" "}
          <a
            href="https://www.sanity.io"
            className="border-b border-current hover:opacity-60"
            target="_blank"
            rel="noreferrer"
          >
            sanity.io
          </a>
          , then make a new project. The free plan needs no card.
        </li>
        <li>
          <span className="font-medium">2. Copy the env file</span>
          <pre className="mt-2 overflow-x-auto rounded-md border border-border bg-foreground/[0.03] p-3 font-mono text-xs">
            cp .env.local.example .env.local
          </pre>
        </li>
        <li>
          <span className="font-medium">3. Fill in your project ID</span> from the Sanity
          dashboard, then restart the dev server.
        </li>
        <li>
          <span className="font-medium">4. Add the Studio URL</span> to your project&apos;s CORS
          origins in Sanity — <code className="font-mono text-xs">http://localhost:3000</code>{" "}
          for local, plus the Vercel domain once deployed.
        </li>
      </ol>
    </main>
  );
}

export default function StudioPage() {
  if (!isSanityConfigured) return <SetupInstructions />;
  return <NextStudio config={config} />;
}
