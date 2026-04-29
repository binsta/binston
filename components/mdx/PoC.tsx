"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface PoCProps {
  lang?: string;
  children: React.ReactNode;
}

export function PoC({ lang = "solidity", children }: PoCProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="not-prose my-4 rounded-md border border-border bg-surface/30">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-text-muted transition-colors hover:text-text"
        aria-expanded={open}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span className="font-mono font-medium">
          Proof of Concept{lang ? ` · ${lang}` : ""}
        </span>
      </button>
      {open && (
        <div className="border-t border-border [&_pre]:m-0 [&_pre]:rounded-none [&_pre]:rounded-b-md [&_pre]:border-0">
          {children}
        </div>
      )}
    </div>
  );
}
