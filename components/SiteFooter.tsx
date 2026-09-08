import Link from "next/link";
import type { SiteSettings } from "@/sanity/types";

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const socials = settings?.socials ?? [];

  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-10">
        <span className="text-sm text-muted">
          © {new Date().getFullYear()} {settings?.siteTitle ?? "Tanvir Ahassan"}
        </span>

        <ul className="flex flex-wrap items-center gap-6 text-sm">
          <li>
            <Link href="/contact" className="text-muted transition-colors hover:text-foreground">
              Contact
            </Link>
          </li>
          {socials.map((s) => (
            <li key={s._key ?? s.platform}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-muted transition-colors hover:text-foreground"
              >
                {s.platform}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
