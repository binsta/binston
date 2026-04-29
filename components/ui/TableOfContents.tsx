"use client";

import { useEffect, useRef, useState } from "react";
import type { TocEntry } from "@/lib/toc";

interface TableOfContentsProps {
  toc: TocEntry[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (toc.length === 0) return;

    const headingIds = toc.map((e) => e.id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0% -70% 0%", threshold: 0 }
    );

    headingIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
        On this page
      </p>
      <ul className="space-y-1.5" role="list">
        {toc.map((entry) => (
          <li
            key={entry.id}
            style={{ paddingLeft: entry.depth === 3 ? "0.75rem" : "0" }}
          >
            <a
              href={`#${entry.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(entry.id);
                el?.scrollIntoView({ behavior: "smooth" });
                history.pushState(null, "", `#${entry.id}`);
              }}
              className={`block leading-snug transition-colors no-underline ${
                activeId === entry.id
                  ? "text-accent"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
