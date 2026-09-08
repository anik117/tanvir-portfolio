import { safeFetch } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { ArrowUpRight, CalendarDays, Mail } from "lucide-react";
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

        <ul className="mt-12 grid gap-3">
          {settings?.email && (
            <li>
              <a
                href={`mailto:${settings.email}`}
                className="group raised raised-hover flex items-center gap-4 rounded-2xl px-5 py-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
                  <Mail aria-hidden size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-muted">Email</span>
                  <span className="block truncate font-medium">{settings.email}</span>
                </span>
                <ArrowUpRight aria-hidden size={17} className="arrow shrink-0 text-muted" />
              </a>
            </li>
          )}

          {settings?.ctaUrl && (
            <li>
              <a
                href={settings.ctaUrl}
                target="_blank"
                rel="noreferrer"
                className="group raised raised-hover flex items-center gap-4 rounded-2xl px-5 py-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
                  <CalendarDays aria-hidden size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-muted">Book a call</span>
                  <span className="block truncate font-medium">
                    {settings.ctaLabel ?? "Book a Call"}
                  </span>
                </span>
                <ArrowUpRight aria-hidden size={17} className="arrow shrink-0 text-muted" />
              </a>
            </li>
          )}

          {settings?.socials?.map((s) => (
            <li key={s._key ?? s.platform}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group raised raised-hover flex items-center gap-4 rounded-2xl px-5 py-4"
              >
                <span className="mono flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-xs font-semibold ring-1 ring-border">
                  {s.platform.slice(0, 2)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-muted">{s.platform}</span>
                  <span className="block truncate font-medium">
                    {s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                  </span>
                </span>
                <ArrowUpRight aria-hidden size={17} className="arrow shrink-0 text-muted" />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </main>
  );
}
