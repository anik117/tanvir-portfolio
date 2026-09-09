import { safeFetch } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { ArrowUpRight, CalendarDays, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";
import { SocialIcon } from "@/components/SocialIcon";

export const metadata = {
  title: "Contact | Tanvir Ahassan",
  description: "Get in touch about a role or a project.",
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

/** "Currently at X" from the most recent experience entry, if there is one. */
function tenure(settings: SiteSettings | null) {
  const job = settings?.experience?.[0];
  if (!job?.organization) return null;
  const current = /present|now|current/i.test(job.years ?? "");
  const org = job.organization.split(/\s[·•|]\s/)[0].trim();
  return `${current ? "Currently at" : "Previously at"} ${org}`;
}

export default async function ContactPage() {
  const settings = await safeFetch<SiteSettings>(SITE_SETTINGS_QUERY);
  const heading = settings?.contactHeading ?? "Have a project in mind or just want to connect?";
  const first = (settings?.siteTitle ?? "Tanvir Ahassan").split(/\s+/)[0];
  const at = tenure(settings);

  return (
    <main className="mx-auto max-w-page px-5 py-16 sm:px-10 sm:py-24">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        {/* ---- The invitation ------------------------------------------- */}
        <div>
          <Reveal y={10}>
            <p className="serif text-[30px] leading-none sm:text-[38px]">
              Hi, I&rsquo;m {first}. Good to meet you.
            </p>
          </Reveal>
          <Reveal delay={80} y={16}>
            <h1 className="mt-6 max-w-2xl text-[2.3rem] font-semibold leading-[1.08] sm:text-[3.4rem]">
              <Highlight text={heading} words={3} />
            </h1>
          </Reveal>

          {settings?.contactMessage && (
            <Reveal delay={160} y={12}>
              <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-muted-strong">
                {settings.contactMessage}
              </p>
            </Reveal>
          )}

          <Reveal delay={240} y={12}>
            <ul className="mono mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-muted-strong">
              {settings?.availabilityShow && settings.availabilityLabel && (
                <li className="inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="annotation-dot absolute inset-0 rounded-full bg-accent" />
                    <span className="relative h-2 w-2 rounded-full bg-accent" />
                  </span>
                  {settings.availabilityLabel}
                </li>
              )}
              {at && <li>{at}</li>}
            </ul>
          </Reveal>

          {settings?.email && (
            <Reveal delay={320} y={12}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href={`mailto:${settings.email}`} className="group btn btn-primary">
                  <Mail aria-hidden size={16} />
                  Say hello
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
                I read everything myself and reply within a couple of days.
              </p>
            </Reveal>
          )}
        </div>

        {/* ---- The practical side ----------------------------------------- */}
        <Reveal delay={200}>
          <div className="rounded-[32px] bg-gradient-to-b from-[var(--sky-3)] to-[var(--accent-soft)] p-6 sm:p-8">
            <p className="mono text-[11px] uppercase tracking-[0.18em] text-muted-strong">
              Not sure what to write?
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-strong">
              A few lines are plenty. Tell me:
            </p>
            <ol className="mt-4 space-y-2.5 text-[15px] leading-relaxed">
              {[
                "what you're building, and who it's for",
                "where it is — an idea, a redesign, or something live",
                "roughly when you need it. Rough is fine.",
              ].map((line, i) => (
                <li key={line} className="flex gap-3">
                  <span className="mono mt-0.5 shrink-0 text-[12px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>

            <p className="mono mt-10 text-[11px] uppercase tracking-[0.18em] text-muted-strong">
              Elsewhere
            </p>
            <ul className="mt-3 -mx-3">
              {settings?.email && (
                <li>
                  <Channel href={`mailto:${settings.email}`} label="Email" value={settings.email} />
                </li>
              )}
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
