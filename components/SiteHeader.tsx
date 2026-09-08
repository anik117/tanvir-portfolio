import Link from "next/link";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader({ name }: { name: string }) {
  return (
    <header className="sticky top-0 z-50 px-6 pt-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link
          href="/"
          className="whitespace-nowrap rounded-full border border-border bg-background/90 px-3.5 py-2 text-sm font-medium tracking-tight shadow-sm backdrop-blur transition-opacity hover:opacity-70 sm:px-4"
        >
          {name}
        </Link>

        <nav className="rounded-full border border-border bg-background/90 p-1 shadow-sm backdrop-blur">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] text-muted transition-colors hover:bg-surface hover:text-foreground sm:px-4 sm:text-sm"
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
