"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/writing", label: "Writing" },
  { href: "/audits", label: "Audits" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

function NavItems({ pathname }: { pathname: string }) {
  return (
    <>
      {NAV_LINKS.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <li key={href}>
            <Link
              href={href}
              className={`text-sm transition-colors no-underline ${
                active
                  ? "text-accent font-medium"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </>
  );
}

export function Nav() {
  const pathname = usePathname();

  function openSearch() {
    document.dispatchEvent(new CustomEvent("search:open"));
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-mono text-sm font-medium text-text no-underline transition-colors hover:text-accent"
        >
          binston.in
        </Link>

        <ul className="hidden items-center gap-6 sm:flex" role="list">
          <NavItems pathname={pathname} />
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={openSearch}
            aria-label="Search (Ctrl+K)"
            className="flex h-8 items-center gap-2 rounded border border-border px-2.5 text-xs text-text-muted transition-colors hover:border-accent hover:text-text"
          >
            <Search size={14} />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border border-border px-1 py-0.5 font-mono text-[10px] text-text-muted sm:inline">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle />
        </div>
      </nav>
      <nav className="border-t border-border sm:hidden" aria-label="Mobile navigation">
        <ul
          className="mx-auto flex max-w-5xl gap-4 overflow-x-auto px-6 py-2"
          role="list"
        >
          <NavItems pathname={pathname} />
        </ul>
      </nav>
    </header>
  );
}
