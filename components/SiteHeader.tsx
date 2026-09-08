import Link from "next/link";

const links = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({
  name,
  availability,
}: {
  name: string;
  availability?: string;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="whitespace-nowrap text-[15px] font-semibold tracking-tight transition-opacity hover:opacity-60"
          >
            {name}
          </Link>

          {availability && (
            /* Sits slightly off-square, like a label stuck on rather than laid
               out. Straightens on hover. */
            <span className="availability hidden items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-muted shadow-sm sm:inline-flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="annotation-dot absolute inset-0 rounded-full bg-emerald-600" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-600" />
              </span>
              {availability}
            </span>
          )}
        </div>

        <nav>
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
