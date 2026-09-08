import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SiteSettings } from "@/sanity/types";

const pages = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * The page runs out into peach: the signature and status centred, three
 * short columns underneath, the year at the foot.
 */
export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const socials = settings?.socials ?? [];
  const name = settings?.siteTitle ?? "Tanvir Ahassan";

  return (
    <footer className="mt-32 bg-gradient-to-b from-background via-[var(--cream)] to-[var(--peach)]">
      <div className="mx-auto max-w-page px-5 pb-10 pt-20 sm:px-10 sm:pt-28">
        <div className="text-center">
          <p className="serif-italic text-[40px] leading-none sm:text-[48px]">{name}</p>
          {settings?.availabilityShow && settings.availabilityLabel && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-3.5 py-1.5 text-[13px] font-medium text-muted-strong">
              <span className="relative flex h-2 w-2">
                <span className="annotation-dot absolute inset-0 rounded-full bg-accent" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              {settings.availabilityLabel}
            </p>
          )}
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-10 text-center sm:grid-cols-3">
          <div>
            <p className="text-[14px] font-semibold">Pages</p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-muted-strong hover:text-foreground">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[14px] font-semibold">Elsewhere</p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {socials.map((s) => (
                <li key={s._key ?? s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-muted-strong hover:text-foreground"
                  >
                    {s.platform}
                    <ArrowUpRight aria-hidden size={12} className="arrow-up" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-[14px] font-semibold">Contact</p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {settings?.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="text-muted-strong hover:text-foreground">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.ctaUrl && (
                <li>
                  <a
                    href={settings.ctaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-strong hover:text-foreground"
                  >
                    {settings.ctaLabel ?? "Book a Call"}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <p className="mono mt-20 text-center text-[12px] text-muted">
          © {new Date().getFullYear()} {name}
        </p>
      </div>
    </footer>
  );
}
