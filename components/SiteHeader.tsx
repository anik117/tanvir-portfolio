import Link from "next/link";

export function SiteHeader({ name }: { name: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-medium tracking-tight hover:opacity-60">
          {name}
        </Link>
        <nav className="flex items-center gap-8 text-sm text-muted">
          <Link href="/#work" className="hover:text-foreground">
            Work
          </Link>
          <Link href="/#about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/#contact" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
