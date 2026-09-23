"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LazyMotion, MotionConfig, m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems } from "@/data/navigation";
import { site } from "@/data/site";
import { cn, pad } from "@/lib/utils";
import { LogoMark } from "./LogoMark";
import { StatusIndicator } from "@/components/ui/Primitives";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  // Compact, opaque navigation after the first scroll.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const closeMenu = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Lock scroll, close on Escape and move focus into the menu while it is open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus(), 60);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, closeMenu]);

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => media.matches && setOpen(false);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
      <header className="no-print fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "border-b transition-[background-color,border-color] duration-500",
            scrolled || open ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent",
          )}
        >
          <nav
            aria-label="Primary"
            className={cn(
              "container-x flex items-center justify-between gap-6 transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              scrolled ? "h-14" : "h-[4.5rem] lg:h-20",
            )}
          >
            <Link href="/" className="group flex items-center gap-3 text-fg" aria-label={`${site.name} — home`}>
              <LogoMark size={scrolled ? 24 : 28} />
              <span className="flex items-baseline gap-2.5 whitespace-nowrap">
                <span className="text-base font-semibold uppercase tracking-[-0.01em] text-fg sm:text-lg">{site.brand}</span>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-dim min-[420px]:inline">
                  / {site.role}
                </span>
              </span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const isActive = isHome && active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={hrefFor(item.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative flex items-center gap-2 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                        isActive ? "text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-1 bg-accent transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="mr-1 hidden whitespace-nowrap 3xl:block">
                <StatusIndicator>Available for automation projects</StatusIndicator>
              </span>
              <ThemeToggle />
              <Link href={hrefFor("contact")} className="btn btn-primary hidden min-h-10 px-4 md:inline-flex">
                Let&apos;s build
                <ArrowRight className="btn-arrow size-3.5" aria-hidden="true" />
              </Link>
              <button
                ref={toggleRef}
                type="button"
                className="relative flex size-11 items-center justify-center border border-line-strong lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((value) => !value)}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute h-px w-5 bg-fg transition-transform duration-300",
                    open ? "rotate-45" : "-translate-y-[4px]",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute h-px w-5 bg-fg transition-transform duration-300",
                    open ? "-rotate-45" : "translate-y-[4px]",
                  )}
                />
              </button>
            </div>
          </nav>
        </div>

        <AnimatePresence>
          {open && (
            <m.div
              ref={menuRef}
              id="mobile-menu"
              key="mobile-menu"
              className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto border-t border-line bg-bg lg:hidden"
              style={{ top: scrolled ? "3.5rem" : undefined }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="container-x flex min-h-full flex-col justify-between gap-10 pb-10 pt-8">
                <ul className="flex flex-col">
                  {navItems.map((item, index) => (
                    <m.li
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * index + 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-line"
                    >
                      <Link
                        href={hrefFor(item.id)}
                        onClick={() => closeMenu()}
                        className="flex items-baseline gap-4 py-4 text-3xl font-semibold uppercase tracking-[-0.03em] text-fg sm:text-4xl"
                      >
                        <span className="label text-accent">{pad(index + 1)}</span>
                        {item.label}
                      </Link>
                    </m.li>
                  ))}
                </ul>
                <div className="flex flex-col gap-6">
                  <StatusIndicator>Available for automation projects</StatusIndicator>
                  <Link href={hrefFor("contact")} onClick={() => closeMenu()} className="btn btn-primary w-full">
                    Let&apos;s build
                    <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </header>
      </MotionConfig>
    </LazyMotion>
  );
}
