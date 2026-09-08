import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SiteSettings } from "@/sanity/types";

const pages = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * A quiet grey close: the signature and status on the left, the site's
 * pages and his channels on the right, the year underneath. Nothing else.
 */
export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const socials = settings?.socials ?? [];
  const name = settings?.siteTitle ?? "Tanvir Ahassan";

  return (
    <footer className="mt-32 bg-[#f4f4f2]">
      <div className="mx-auto max-w-page px-5 py-14 sm:px-10 sm:py-16">
        <div className="flex flex-wrap items-start justify-between gap-x-16 gap-y-10">
          <div>
            <p className="serif-italic text-[34px] leading-none">{name}</p>
            {settings?.availabilityShow && settings.availabilityLabel && (
              <p className="mt-4 inline-flex items-center gap-2 text-[13px] text-muted-strong">
                <span className="relative flex h-2 w-2">
                  <span className="annotation-dot absolute inset-0 rounded-full bg-emerald-500" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {settings.availabilityLabel}
              </p>
            )}
          </div>

          <div className="flex gap-16 sm:gap-24">
            <div>
              <p className="mono text-[11px] uppercase tracking-[0.16em] text-muted">Pages</p>
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
              <p className="mono text-[11px] uppercase tracking-[0.16em] text-muted">Elsewhere</p>
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
                {settings?.email && (
                  <li>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-muted-strong hover:text-foreground"
                    >
                      {settings.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <p className="mono mt-14 border-t border-foreground/10 pt-6 text-[12px] text-muted">
          © {new Date().getFullYear()} {name}
        </p>
      </div>
    </footer>
  );
}
