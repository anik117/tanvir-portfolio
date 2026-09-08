import { safeFetch } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Contact | Tanvir Ahassan",
  description: "Get in touch about a role or a project.",
};

export default async function ContactPage() {
  const settings = await safeFetch<SiteSettings>(SITE_SETTINGS_QUERY);

  return (
    <main className="mx-auto max-w-read px-6 py-20 sm:py-28">
      <Reveal>
        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {settings?.contactHeading ?? "Have a project in mind or just want to connect?"}
        </h1>

        {settings?.contactMessage && (
          <p className="mt-8 text-lg leading-relaxed text-muted">{settings.contactMessage}</p>
        )}

        <div className="mt-12 space-y-px overflow-hidden rounded-lg border border-border">
          {settings?.email && (
            <a
              href={`mailto:${settings.email}`}
              className="group flex items-baseline justify-between gap-6 bg-surface px-6 py-5 transition-colors hover:bg-surface-strong"
            >
              <span className="text-sm text-muted">Email</span>
              <span className="font-medium">
                {settings.email} <span className="arrow">→</span>
              </span>
            </a>
          )}

          {settings?.ctaUrl && (
            <a
              href={settings.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-baseline justify-between gap-6 bg-surface px-6 py-5 transition-colors hover:bg-surface-strong"
            >
              <span className="text-sm text-muted">Book a call</span>
              <span className="font-medium">
                {settings.ctaLabel ?? "Book a Call"} <span className="arrow">↗</span>
              </span>
            </a>
          )}

          {settings?.socials?.map((s) => (
            <a
              key={s._key ?? s.platform}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-baseline justify-between gap-6 bg-surface px-6 py-5 transition-colors hover:bg-surface-strong"
            >
              <span className="text-sm text-muted">{s.platform}</span>
              <span className="font-medium">
                {s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}{" "}
                <span className="arrow">↗</span>
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
