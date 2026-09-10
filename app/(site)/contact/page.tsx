import { safeFetch } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { ArrowUpRight, CalendarDays, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";
import { SocialIcon } from "@/components/SocialIcon";
import contactContent from "@/sanity/seed/contact.json";

export const metadata = {
  title: "Contact | Tanvir Ahassan",
  description: "Have a product, role, or idea to discuss? Get in touch with Tanvir Ahassan.",
};

function Channel({
  href,
  label,
  value,
  external,
}: {
  href: string;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-white/70"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-[var(--shadow-card)] ring-1 ring-white/80 transition-colors group-hover:bg-accent group-hover:text-white">
        <SocialIcon platform={label} size={18} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] text-muted">{label}</span>
        <span className="block truncate text-[15px] font-medium">{value}</span>
      </span>
      <ArrowUpRight aria-hidden size={16} className="arrow-up shrink-0 text-muted" />
    </a>
  );
}

export default async function ContactPage() {
  const settings = await safeFetch<SiteSettings>(SITE_SETTINGS_QUERY);
  const heading = settings?.contactHeading ?? contactContent.contactHeading;
  const message = settings?.contactMessage ?? contactContent.contactMessage;
  const first = (settings?.siteTitle ?? "Tanvir Ahassan").split(/\s+/)[0];

  return (
    <main className="mx-auto max-w-page px-5 py-16 sm:px-10 sm:py-24">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        {/* ---- The invitation ------------------------------------------- */}
        <div>
          <Reveal y={10}>
            <p className="serif text-[30px] leading-none sm:text-[38px]">
              Hello, I&rsquo;m {first}.
            </p>
          </Reveal>
          <Reveal delay={80} y={16}>
            <h1 className="mt-6 max-w-2xl text-[2.3rem] font-semibold leading-[1.08] sm:text-[3.4rem]">
              <Highlight text={heading} words={3} />
            </h1>
          </Reveal>

          {message && (
            <Reveal delay={160} y={12}>
              <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-muted-strong">
                {message}
              </p>
            </Reveal>
          )}

          {settings?.availabilityShow && settings.availabilityLabel && (
            <Reveal delay={240} y={12}>
              <ul className="mono mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-muted-strong">
                <li className="inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="annotation-dot absolute inset-0 rounded-full bg-accent" />
                    <span className="relative h-2 w-2 rounded-full bg-accent" />
                  </span>
                  {settings.availabilityLabel}
                </li>
              </ul>
            </Reveal>
          )}

          {settings?.email && (
            <Reveal delay={320} y={12}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href={`mailto:${settings.email}`} className="group btn btn-primary">
                  <Mail aria-hidden size={16} />
                  Email me
                  <ArrowUpRight aria-hidden size={15} className="arrow-up" />
                </a>
                {settings.ctaUrl && (
                  <a
                    href={settings.ctaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group btn btn-light"
                  >
                    <CalendarDays aria-hidden size={16} />
                    {settings.ctaLabel ?? "Book a Call"}
                  </a>
                )}
              </div>
              <p className="mt-4 text-[14px] text-muted-strong">
                I read every message myself.
              </p>
            </Reveal>
          )}
        </div>

        {/* ---- The practical side ----------------------------------------- */}
        <Reveal delay={200}>
          <div className="panel-soft rounded-[32px] p-6 sm:p-8">
            <p className="mono text-[11px] uppercase tracking-[0.18em] text-muted-strong">
              Find me elsewhere
            </p>
            <ul className="mt-3 -mx-3">
              {settings?.socials?.map((s) => (
                <li key={s._key ?? s.platform}>
                  <Channel
                    href={s.url}
                    label={s.platform}
                    value={s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                    external
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
