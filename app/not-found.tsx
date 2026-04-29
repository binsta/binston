import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-text-muted">404</p>
      <h1 className="mt-2 text-2xl font-bold text-text">Proof Not Found</h1>
      <p className="mt-4 max-w-sm text-text-muted">
        This path doesn&apos;t exist in the state trie. The constraint system
        has no valid witness for this URL.
      </p>
      <div className="mt-8 font-mono text-xs text-text-muted">
        <p>
          <span className="text-accent">UNSATISFIED</span> — no assignment
          satisfies the constraint at this path.
        </p>
      </div>
      <Link
        href="/"
        className="mt-8 rounded-md border border-border px-4 py-2 font-mono text-sm text-text-muted transition-colors hover:border-accent/50 hover:text-accent no-underline"
      >
        ← Back to /
      </Link>
    </div>
  );
}
