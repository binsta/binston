"use client";

import { useEffect } from "react";

export function HeadingLinkHandler() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest(
        ".prose h2[id] a, .prose h3[id] a, .prose h4[id] a"
      );
      const heading = anchor?.closest("h2[id], h3[id], h4[id]");
      if (!(heading instanceof HTMLElement)) return;

      const url = `${window.location.origin}${window.location.pathname}#${heading.id}`;
      void navigator.clipboard?.writeText(url).catch(() => {});
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
