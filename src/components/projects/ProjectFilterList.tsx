"use client";

import { AnimatePresence, LazyMotion, MotionConfig, m } from "framer-motion";
import { useState, type ReactNode } from "react";
import { projectFilters, type ProjectFilter, type ProjectTag } from "@/data/projects";
import { cn, pad } from "@/lib/utils";

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export interface FilterableItem {
  slug: string;
  tags: ProjectTag[];
  node: ReactNode;
}

/** Client-side project filter. Panels are rendered on the server and passed in as nodes. */
export function ProjectFilterList({ items }: { items: FilterableItem[] }) {
  const [filter, setFilter] = useState<ProjectFilter>("ALL");
  const visible = filter === "ALL" ? items : items.filter((item) => item.tags.includes(filter));
  const countFor = (value: ProjectFilter) =>
    value === "ALL" ? items.length : items.filter((item) => item.tags.includes(value)).length;

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <div className="sticky top-14 z-20 -mx-5 mb-10 border-y border-line bg-bg/90 px-5 py-3 backdrop-blur-md sm:mx-0 sm:border-x sm:px-3">
          <div role="group" aria-label="Filter projects by discipline" className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
            {projectFilters.map((value) => {
              const active = filter === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(value)}
                  className={cn(
                    "flex flex-none items-center gap-2 border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300",
                    active
                      ? "border-accent bg-accent text-accent-ink"
                      : "border-line text-muted hover:border-line-strong hover:text-fg",
                  )}
                >
                  {value === "IIOT" ? "IIoT" : value}
                  <span className={cn("tabular-nums", active ? "text-accent-ink/70" : "text-dim")}>{pad(countFor(value))}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"} shown
        </p>

        <ul className="flex flex-col gap-6 md:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => (
              <m.li
                key={item.slug}
                layout="position"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {item.node}
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      </MotionConfig>
    </LazyMotion>
  );
}
