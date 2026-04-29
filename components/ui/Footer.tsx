import Link from "next/link";
import { Mail, Rss } from "lucide-react";
import { GitHubIcon, XIcon } from "./SocialIcons";

const SOCIAL = [
  {
    href: "https://github.com/binsta",
    label: "GitHub",
    icon: GitHubIcon,
  },
  {
    href: "https://x.com/binston",
    label: "X / Twitter",
    icon: XIcon,
  },
  {
    href: "mailto:binstoncardoza@gmail.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "/rss.xml",
    label: "RSS",
    icon: Rss,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-text-muted">
          © {new Date().getFullYear()} Binston Cardoza
        </p>

        <nav aria-label="Social links" className="flex items-center gap-4">
          {SOCIAL.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-text-muted transition-colors hover:text-text no-underline"
            >
              <Icon width={18} height={18} />
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
