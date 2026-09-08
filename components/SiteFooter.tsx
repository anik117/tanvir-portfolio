import { ArrowUpRight } from "lucide-react";
import type { SiteSettings } from "@/sanity/types";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";

/**
 * The positioning line held in reserve in profile.md, set wide with the
 * highlighter, then links on the left and the signature on the right.
 */
export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const socials = settings?.socials ?? [];
  const name = settings?.siteTitle ?? "Tanvir Ahassan";

  return (
    <footer className="mt-32">
      <div className="mx-auto max-w-page px-5 pb-12 sm:px-10">
        <Reveal>
          <p className="heading max-w-5xl text-balance text-[2.6rem] font-medium leading-[1.02] tracking-[-0.035em] sm:text-[5rem] lg:text-[6.5rem]">
            <Highlight text="Turning complexity into clarity." words={2} />
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-16 flex flex-wrap items-end justify-between gap-x-12 gap-y-10 border-t border-border pt-10 sm:mt-24">
            <ul className="space-y-3 text-[15px]">
              {socials.map((s) => (
                <li key={s._key ?? s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-medium hover:text-muted-strong"
                  >
                    {s.platform}
                    <ArrowUpRight aria-hidden size={15} className="arrow-up" />
                  </a>
                </li>
              ))}
              {settings?.ctaUrl && (
                <li>
                  <a
                    href={settings.ctaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-medium hover:text-muted-strong"
                  >
                    {settings.ctaLabel ?? "Book a Call"}
                    <ArrowUpRight aria-hidden size={15} className="arrow-up" />
                  </a>
                </li>
              )}
              {settings?.email && (
                <li className="pt-2">
                  <a href={`mailto:${settings.email}`} className="font-medium hover:text-muted-strong">
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>

            <div className="text-right">
              <p className="serif-italic text-5xl leading-none tracking-tight sm:text-6xl">{name}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {settings?.availabilityShow && settings.availabilityLabel && (
                  <li className="inline-flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="annotation-dot absolute inset-0 rounded-full bg-accent" />
                      <span className="relative h-2 w-2 rounded-full bg-accent" />
                    </span>
                    {settings.availabilityLabel}
                  </li>
                )}
                <li className="text-muted-strong">© {new Date().getFullYear()}</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
