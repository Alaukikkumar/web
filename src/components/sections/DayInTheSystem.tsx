"use client";

import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DemoBadge, SectionHeading } from "@/components/ui/Primitives";
import { dayEvents } from "@/data/systems";
import { useInterval } from "@/lib/hooks";
import { cn, pad } from "@/lib/utils";

const STEP_MS = 1900;

export function DayInTheSystem() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLOListElement>(null);
  const last = dayEvents.length - 1;
  const event = dayEvents[index];

  // Start playback once, the first time the timeline is on screen.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setPlaying(true);
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useInterval(
    () => {
      if (index >= last) setPlaying(false);
      else setIndex(index + 1);
    },
    STEP_MS,
    playing,
  );

  // Keep the newest log line visible without scrolling the page.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [index]);

  const select = (next: number) => {
    setPlaying(false);
    setIndex(Math.max(0, Math.min(last, next)));
  };

  const togglePlay = () => {
    if (index >= last) setIndex(0);
    setPlaying((value) => !value || index >= last);
  };

  return (
    <section aria-labelledby="day-title" className="relative border-t border-line py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <SectionHeading
          id="day-title"
          index="11"
          kicker="A day in the system"
          system="Shift log · Demo"
          title={
            <>
              A day <span className="text-muted">in the system.</span>
            </>
          }
          intro="How a connected electroplating line behaves during one morning — from shift start to an alarm and the report that records it."
        />

        <div ref={sectionRef} className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10" data-reveal="">
          {/* Timeline */}
          <ol aria-label="Timeline of events" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
            {dayEvents.map((item, i) => {
              const done = i < index;
              const current = i === index;
              return (
                <li key={item.time} className="relative flex-none lg:flex-auto">
                  {i < last && (
                    <span
                      aria-hidden="true"
                      className={cn("absolute -bottom-3 left-[22.5px] top-8 hidden w-px lg:block", done ? "bg-accent" : "bg-line")}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-current={current ? "step" : undefined}
                    className={cn(
                      "flex w-full items-center gap-4 border px-3 py-2.5 text-left transition-colors duration-300 lg:border-transparent lg:py-3",
                      current ? "border-accent bg-surface lg:border-accent" : "border-line hover:bg-surface/60",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative z-10 flex size-5 flex-none items-center justify-center border",
                        current && (item.tone === "alarm" ? "border-alarm bg-alarm" : "border-accent bg-accent"),
                        done && "border-accent bg-bg",
                        !current && !done && "border-line-strong bg-bg",
                      )}
                    >
                      {done && <span className="size-1.5 bg-accent" />}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-muted">{item.time}</span>
                    <span className={cn("whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em]", current ? "text-fg" : "text-muted")}>
                      {item.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Console */}
          <div className="panel corner-marks flex min-w-0 flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-2.5">
              <span className="label text-muted">Event console · Line 01</span>
              <DemoBadge>Demo sequence</DemoBadge>
            </div>

            <div className="p-5 sm:p-7">
              <div key={event.time} className="anim-rise">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className={cn("font-mono text-[clamp(2.5rem,6vw,4rem)] leading-none tabular-nums tracking-tight", event.tone === "alarm" ? "text-alarm" : "text-fg")}>
                    {event.time}
                  </span>
                  <span className={cn("label", event.tone === "alarm" ? "text-alarm" : "text-accent")}>[{event.subsystem}]</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold uppercase tracking-[-0.02em] text-fg">{event.title}</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-muted">{event.detail}</p>
              </div>
            </div>

            <ol
              ref={logRef}
              aria-label="System log"
              className="code-block mx-5 mb-5 h-44 overflow-auto border border-line bg-bg p-4 text-[11.5px] sm:mx-7"
            >
              {dayEvents.slice(0, index + 1).map((item, i) => (
                <li
                  key={item.time}
                  className={cn(
                    "whitespace-pre",
                    i === index ? "anim-rise" : "",
                    item.tone === "alarm" ? "text-alarm" : i === index ? "text-fg" : "text-dim",
                  )}
                >
                  {item.log}
                </li>
              ))}
            </ol>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-line px-4 py-3">
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => select(index - 1)} disabled={index === 0} aria-label="Previous event" className="flex size-9 items-center justify-center border border-line text-fg transition-colors hover:border-line-strong disabled:opacity-40">
                  <ChevronLeft className="size-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={togglePlay} aria-label={playing ? "Pause sequence" : index >= last ? "Replay sequence" : "Play sequence"} className="flex size-9 items-center justify-center border border-accent text-accent transition-colors hover:bg-accent hover:text-accent-ink">
                  {playing ? <Pause className="size-4" aria-hidden="true" /> : index >= last ? <RotateCcw className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
                </button>
                <button type="button" onClick={() => select(index + 1)} disabled={index === last} aria-label="Next event" className="flex size-9 items-center justify-center border border-line text-fg transition-colors hover:border-line-strong disabled:opacity-40">
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              </div>
              <div className="flex flex-1 items-center gap-3">
                <div className="h-px flex-1 bg-line">
                  <div className="h-px origin-left bg-accent transition-transform duration-500" style={{ transform: `scaleX(${index / last})` }} />
                </div>
                <span className="label tabular-nums">
                  {pad(index + 1)}/{pad(dayEvents.length)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
