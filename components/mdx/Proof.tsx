"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface ProofProps {
  system?: "lean4" | "tla+";
  collapsed?: boolean;
  children: React.ReactNode;
}

export function Proof({ system, collapsed = true, children }: ProofProps) {
  const [open, setOpen] = useState(!collapsed);

  return (
    <div className="not-prose my-4 rounded-md border border-border bg-surface/20">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-text-muted transition-colors hover:text-text"
        aria-expanded={open}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span className="font-mono font-medium">
          Proof{system ? ` · ${system}` : ""}
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
