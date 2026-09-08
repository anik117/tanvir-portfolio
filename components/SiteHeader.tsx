"use client";

import { useState, useSyncExternalStore } from "react";
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
 * Floats over the page: the signature left, the links in a frosted pill in
 * the middle, the blue call to action right.
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
  // Transparent over the hero sheet, frosted once the page has scrolled under it.
  const scrolled = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > 24,
    () => false,
  );

  const ctaEl = (
    <a
      href={cta.href}
      target={cta.external ? "_blank" : undefined}
      rel={cta.external ? "noreferrer" : undefined}
      className="btn btn-primary text-[14px]"
    >
      {cta.label}
    </a>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-background/80 shadow-[0_1px_0_var(--border)] backdrop-blur-md" : ""
      }`}
    >
      <div
        className="mx-auto flex max-w-page items-center justify-between px-5 sm:px-10"
        style={{ height: "var(--nav-h)" }}
      >
        <Link href="/" className="serif-italic text-[26px] leading-none tracking-tight">
          {name}
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/60 bg-white/70 p-1 shadow-[var(--shadow-card)] backdrop-blur-md md:flex"
          aria-label="Primary"
        >
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-[14px] font-bold transition-colors ${
                  active
                    ? "bg-accent-soft text-accent-hover shadow-sm"
                    : "text-muted-strong hover:bg-white/80 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">{ctaEl}</div>

        <button
          type="button"
          onClick={() => setOpenedOn(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 backdrop-blur md:hidden"
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
            className="card absolute inset-x-4 top-[calc(var(--nav-h)-0.25rem)] p-3 md:hidden"
          >
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-lg font-semibold hover:bg-foreground/[0.04]"
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
