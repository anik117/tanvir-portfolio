import type { SiteSettings } from "@/sanity/types";

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const socials = settings?.socials ?? [];

  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="max-w-2xl text-balance text-3xl font-medium tracking-tight sm:text-4xl">
          {settings?.contactHeading ?? "Have a project in mind or just want to connect?"}
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          {settings?.ctaUrl ? (
            <a
              href={settings.ctaUrl}
              className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              {settings.ctaLabel ?? "Get in touch"}
            </a>
          ) : (
            <span className="eyebrow">Contact link not set</span>
          )}
          {settings?.email && (
            <a href={`mailto:${settings.email}`} className="text-sm hover:opacity-60">
              {settings.email}
            </a>
          )}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
          <span className="text-xs text-muted">
            © {new Date().getFullYear()} {settings?.siteTitle ?? "Tanvir Ahassan"}
          </span>
          {socials.length > 0 && (
            <ul className="flex flex-wrap gap-6 text-xs">
              {socials.map((s) => (
                <li key={s._key ?? s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted hover:text-foreground"
                  >
                    {s.platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
