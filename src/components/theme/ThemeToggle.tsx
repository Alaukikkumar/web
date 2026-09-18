"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import { DEFAULT_THEME, THEME_COLORS, THEME_STORAGE_KEY, type Theme } from "./theme";

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
}

/**
 * Dark / light switch. The visible icon is chosen by CSS from <html data-theme>,
 * so server and client render identical markup (no hydration mismatch).
 */
export function ThemeToggle({ className }: { className?: string }) {
  // Re-apply after React's dev Strict Mode remount clears <html> attributes; a no-op in production.
  useLayoutEffect(() => {
    applyTheme(readStored() ?? DEFAULT_THEME);
  }, []);

  const toggle = () => {
    const current = (document.documentElement.getAttribute("data-theme") as Theme | null) ?? DEFAULT_THEME;
    const next: Theme = current === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the choice lasts for this page view only */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && !document.hidden && "startViewTransition" in document) {
      // The fade can be skipped by the browser (e.g. tab hidden); the theme is still applied.
      document.startViewTransition(() => applyTheme(next)).ready.catch(() => {});
    } else {
      applyTheme(next);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between dark and light theme"
      title="Switch theme"
      className={cn(
        "flex size-11 flex-none items-center justify-center border border-line-strong text-fg transition-colors hover:border-fg lg:size-10",
        className,
      )}
    >
      {/* In dark mode show the sun (switch to light); in light mode show the moon. */}
      <Sun className="theme-icon-sun size-4" aria-hidden="true" />
      <Moon className="theme-icon-moon size-4" aria-hidden="true" />
    </button>
  );
}
