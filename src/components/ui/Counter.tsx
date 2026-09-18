"use client";

import { useEffect, useRef } from "react";

interface CounterProps {
  value: number;
  from?: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

/**
 * Counts up once when scrolled into view. Writes to the DOM directly (no re-renders)
 * and renders the final value on the server so the number is correct without JS.
 */
export function Counter({ value, from = 0, duration = 1400, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          node.textContent = `${Math.round(from + (value - from) * eased)}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        node.textContent = `${from}${suffix}`;
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, from, duration, suffix]);

  return (
    <span ref={ref} className={className}>
      {`${value}${suffix}`}
    </span>
  );
}
