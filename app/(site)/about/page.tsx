import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Download, Mail } from "lucide-react";
import { GitHubIcon, XIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Protocol engineer working on Rust-based ZK cryptography and EVM security.",
  alternates: { canonical: "/about" },
};

const SKILLS = [
  { category: "Languages", items: ["Rust", "TypeScript", "Solidity", "Go", "Python"] },
  { category: "ZK", items: ["Groth16", "PLONK", "STARKs", "Circom", "Halo2"] },
  { category: "EVM", items: ["Bytecode analysis", "Concolic execution", "Symbolic execution", "Slither"] },
  { category: "Formal Methods", items: ["Lean 4", "TLA+"] },
  { category: "Audit Platforms", items: ["Code4rena", "Cantina", "Immunefi", "BNB Chain"] },
];

function hasCv() {
  return fs.existsSync(path.join(process.cwd(), "public", "cv.pdf"));
}

export default function AboutPage() {
  const showCv = hasCv();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold text-text">About</h1>

      <div className="prose mt-8">
        <p>
          I&apos;m a protocol engineer focused on ZK cryptography, EVM bytecode
          analysis, and formal methods. I build production-grade Rust tooling for
          constraint systems and bytecode-level program analysis.
        </p>
        <p>
          On the security side, I do competitive smart contract auditing on
          Code4rena and Cantina, and work with Immunefi and BNB Chain bug bounty
          programs. Protocols I&apos;ve reviewed include Injective, Axelar, BNB
          Chain, Jupiter Lend, Kiln, and Coinbase.
        </p>
        <p>
          My research focuses on the intersection of formal verification and
          real-world protocol security — using algebraic methods and machine-checked
          proofs to make correctness arguments that don&apos;t rely on trust.
        </p>
      </div>

      {/* Skills */}
      <section className="mt-12">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
          Technical background
        </h2>
        <dl className="space-y-3">
          {SKILLS.map(({ category, items }) => (
            <div key={category} className="flex gap-4">
              <dt className="w-36 shrink-0 font-mono text-xs text-text-muted pt-0.5">
                {category}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-xs text-text"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Contact */}
      <section className="mt-12">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
          Contact
        </h2>
        <div className="flex flex-col gap-2">
          <Link
            href="mailto:binstoncardoza@gmail.com"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-accent no-underline"
          >
            <Mail size={14} />
            binstoncardoza@gmail.com
          </Link>
          <Link
            href="https://github.com/binsta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-accent no-underline"
          >
            <GitHubIcon width={14} height={14} />
            github.com/binsta
          </Link>
          <Link
            href="https://x.com/binston"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-accent no-underline"
          >
            <XIcon width={14} height={14} />
            x.com/binston
          </Link>
        </div>
      </section>

      {/* CV Download */}
      {showCv && (
        <div className="mt-10">
          <Link
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-sm text-text transition-colors hover:border-accent/50 hover:text-accent no-underline"
          >
            <Download size={14} />
            Download CV
          </Link>
        </div>
      )}
    </div>
  );
}
