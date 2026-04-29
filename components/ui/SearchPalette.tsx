"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import Fuse from "fuse.js";
import { FileText, Shield, Search } from "lucide-react";
import type { SearchItem } from "@/lib/search";

export function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null);
  const router = useRouter();

  // Register keyboard shortcut + custom event
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    document.addEventListener("search:open", onEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("search:open", onEvent);
    };
  }, []);

  // Lazy-load search index on first open
  useEffect(() => {
    if (!open || fuse) return;
    fetch("/api/search")
      .then((r) => r.json())
      .then((data: SearchItem[]) => {
        setItems(data);
        setFuse(
          new Fuse(data, {
            keys: ["title", "summary", "tags"],
            threshold: 0.35,
            minMatchCharLength: 2,
          })
        );
      })
      .catch(() => {});
  }, [open, fuse]);

  const results = useMemo(() => {
    if (!fuse || !query) {
      return items.slice(0, 8);
    }
    return fuse.search(query, { limit: 8 }).map((r) => r.item);
  }, [query, fuse, items]);

  const navigate = useCallback(
    (url: string) => {
      setOpen(false);
      setQuery("");
      router.push(url);
    },
    [router]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <Command
        className="relative w-full max-w-lg overflow-hidden rounded-lg border border-border bg-bg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        label="Search"
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search size={16} className="shrink-0 text-text-muted" />
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search posts, projects, and findings..."
            className="flex-1 bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
            autoFocus
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
            Esc
          </kbd>
        </div>

        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="py-8 text-center text-sm text-text-muted">
            No results found.
          </Command.Empty>

          {results.length > 0 && (
            <Command.Group>
              {results.map((item) => (
                <Command.Item
                  key={item.url}
                  value={item.title}
                  onSelect={() => navigate(item.url)}
                  className="flex cursor-pointer items-start gap-3 rounded px-3 py-2.5 text-sm aria-selected:bg-surface"
                >
                  {item.type === "audit" ? (
                    <Shield
                      size={15}
                      className="mt-0.5 shrink-0 text-text-muted"
                    />
                  ) : (
                    <FileText
                      size={15}
                      className="mt-0.5 shrink-0 text-text-muted"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-medium text-text">
                      {item.title}
                    </p>
                    <p className="truncate text-xs text-text-muted">
                      {item.summary}
                    </p>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          )}
        </Command.List>
      </Command>
    </div>
  );
}
