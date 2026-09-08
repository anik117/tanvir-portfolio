"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { EASE } from "@/components/Reveal";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * His signature left, three mono links and a black pill right. Static, like the
 * reference — the page's dark band would otherwise carry a white bar.
 */
export function SiteHeader({
  name,
  cta,
}: {
  name: string;
  cta: { label: string; href: string; external?: boolean };
}) {
  const pathname = usePathname();
  // Track the path the menu was opened on; a navigation closes it without
  // an effect, because the comparison below no longer matches.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const ctaEl = (
    <a
      href={cta.href}
      target={cta.external ? "_blank" : undefined}
      rel={cta.external ? "noreferrer" : undefined}
      className="btn btn-dark mono text-[14px]"
    >
      {cta.label}
    </a>
  );

  return (
    <header className="relative z-50">
      <div
        className="mx-auto flex max-w-page items-center justify-between px-5 sm:px-10"
        style={{ height: "var(--nav-h)" }}
      >
        <Link href="/" className="serif-italic text-[26px] leading-none tracking-tight">
          {name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`mono relative text-[15px] font-medium transition-colors ${
                isActive(link.href) ? "text-foreground" : "text-muted-strong hover:text-foreground"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                />
              )}
            </Link>
          ))}
          {ctaEl}
        </nav>

        <button
          type="button"
          onClick={() => setOpenedOn(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white md:hidden"
        >
          {open ? <X aria-hidden size={18} /> : <Menu aria-hidden size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="card absolute inset-x-4 top-[calc(var(--nav-h)-0.25rem)] rounded-2xl p-3 md:hidden"
          >
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="mono block rounded-xl px-4 py-3 text-lg font-medium hover:bg-foreground/[0.04]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-border px-2 pb-1 pt-3">{ctaEl}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
