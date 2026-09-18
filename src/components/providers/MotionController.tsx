"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL = "[data-reveal]:not([data-visible])";
// Every section plus explicit live regions: continuous animations pause while off-screen.
const LIVE = "section, [data-live]";

/**
 * One shared pair of IntersectionObservers for the whole page:
 *  - [data-reveal] elements get [data-visible] once they scroll into view.
 *  - sections and [data-live] regions get [data-inview="true|false"] so CSS can pause
 *    continuous animations that are off-screen.
 * A MutationObserver picks up elements mounted later (e.g. filtered project panels).
 */
export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(REVEAL).forEach((el) => el.setAttribute("data-visible", ""));
      return;
    }

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-visible", "");
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    const live = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.setAttribute("data-inview", String(entry.isIntersecting));
        }
      },
      { rootMargin: "120px 0px" },
    );

    const scan = (root: ParentNode) => {
      root.querySelectorAll(REVEAL).forEach((el) => reveal.observe(el));
      root.querySelectorAll(LIVE).forEach((el) => live.observe(el));
    };

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(REVEAL)) reveal.observe(node);
          if (node.matches(LIVE)) live.observe(node);
          scan(node);
        });
      }
    });

    scan(document);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      reveal.disconnect();
      live.disconnect();
    };
  }, [pathname]);

  return null;
}
