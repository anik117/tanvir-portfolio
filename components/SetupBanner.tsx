export function SetupBanner() {
  return (
    <aside className="border-b border-border bg-foreground/[0.03] px-6 py-4">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 text-sm">
        <p className="font-medium">Sanity is not connected yet.</p>
        <p className="text-muted">
          The projects below are placeholders from{" "}
          <code className="font-mono text-xs">docs/</code>. Add{" "}
          <code className="font-mono text-xs">NEXT_PUBLIC_SANITY_PROJECT_ID</code> to{" "}
          <code className="font-mono text-xs">.env.local</code> to load real content — see{" "}
          <code className="font-mono text-xs">.env.local.example</code>.
        </p>
      </div>
    </aside>
  );
}
