"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    const currentTheme =
      resolvedTheme ??
      (document.documentElement.classList.contains("dark") ? "dark" : "light");
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="flex h-8 w-8 items-center justify-center rounded text-text-muted transition-colors hover:text-text"
    >
      <Sun size={18} className="hidden dark:block" aria-hidden />
      <Moon size={18} className="block dark:hidden" aria-hidden />
    </button>
  );
}
