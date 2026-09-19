"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { IndustrialIcon } from "@/components/diagrams/IndustrialIcon";
import { Sparkline } from "@/components/diagrams/Sparkline";
import { DemoBadge } from "@/components/ui/Primitives";
import { heroLayers } from "@/data/systems";
import { useInView, useInterval, useReducedMotion } from "@/lib/hooks";
import { cn, drift, pad } from "@/lib/utils";

const BOOT_STEPS = ["Initializing system", "Connecting modules", "Ready", "System online"];
const CYCLE = 7; // seconds for one packet to traverse the stack

function seedTrend(): number[] {
  return Array.from({ length: 40 }, (_, i) => 72 + Math.sin(i / 4) * 0.6);
}

export function HeroSystem() {
  const reducedMotion = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "80px" });
  const [boot, setBoot] = useState(0);
  const [clock, setClock] = useState("--:--:--");
  const [telemetry, setTelemetry] = useState(() => ({ temp: 72.4, latency: 24, rows: 0, trend: seedTrend() }));
  const { temp, latency, rows, trend } = telemetry;

  // Short, non-blocking boot sequence.
  useEffect(() => {
    const delays = reducedMotion ? [0, 0, 0] : [380, 820, 1250];
    const timers = delays.map((delay, i) => window.setTimeout(() => setBoot(i + 1), delay));
    return () => timers.forEach(window.clearTimeout);
  }, [reducedMotion]);

  const live = inView && !reducedMotion;

  useInterval(
    () => {
      const now = new Date();
      setClock(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
      setTelemetry((prev) => {
        const nextTemp = drift(prev.temp, 0.18, 71.2, 73.6);
        return {
          temp: nextTemp,
          latency: Math.round(drift(prev.latency, 3, 16, 34)),
          rows: prev.rows + 1,
          trend: [...prev.trend.slice(1), nextTemp],
        };
      });
    },
    1000,
    live,
  );

  const readouts: Record<string, string> = {
    field: `TT-101 · ${temp.toFixed(1)} °C`,
    plc: `%MW100 = ${Math.round(temp * 10)}`,
    network: `MODBUS TCP · ${latency} ms`,
    scada: "TAG TT101_PV · LIVE",
    db: `INSERT OK · +${rows}`,
    report: "SHIFT REPORT · READY",
    notify: "TELEGRAM · 0 PENDING",
  };

  const online = boot >= 3;

  return (
    <div
      ref={ref}
      className="panel corner-marks relative w-full overflow-hidden"
      data-live=""
      role="img"
      aria-label="Animated concept diagram: field devices to PLC, industrial network, SCADA / HMI, database, reporting and SMS / Telegram / email notifications. Demo values."
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 border-b border-line bg-surface-2 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex gap-1" aria-hidden="true">
            <span className="size-2 border border-line-strong" />
            <span className="size-2 border border-line-strong" />
            <span className={cn("size-2", online ? "bg-accent" : "border border-line-strong")} />
          </span>
          <span className="label text-muted">SYS-ARCH / 01</span>
        </div>
        <span className={cn("label", online ? "text-accent" : "text-muted")} aria-hidden="true">
          {online ? "● " : "○ "}
          {BOOT_STEPS[boot]}
        </span>
        <span className="label hidden tabular-nums sm:inline" aria-hidden="true">
          {clock}
        </span>
      </div>

      {/* Layer stack */}
      <div className="grid-bg relative px-3 py-3 sm:px-4 sm:py-4" aria-hidden="true">
        <ol className="relative">
          <span className="absolute bottom-7 left-[29px] top-7 w-px bg-line-strong">
            {online && (
              <span className="packet-track-y" style={{ "--dur": `${CYCLE}s` } as CSSProperties}>
                <span className="packet" />
              </span>
            )}
          </span>
          {heroLayers.map((layer, index) => (
            <li
              key={layer.id}
              className="h-14 py-1"
              style={{ animation: `rise-in 0.6s var(--ease-out-expo) ${120 + index * 90}ms both` }}
            >
              <div
                className="relative flex h-full items-center gap-3 border border-line bg-bg/80 pr-3"
                style={{
                  animation: online ? `row-hit ${CYCLE}s linear ${(index * CYCLE) / (heroLayers.length - 1)}s infinite` : undefined,
                }}
              >
                <span className="relative z-10 ml-3 flex size-8 flex-none items-center justify-center border border-line-strong bg-surface text-fg">
                  <IndustrialIcon name={layer.icon} size={17} />
                </span>
                <span className="label w-5 flex-none text-dim">L{index + 1}</span>
                <span className="min-w-0 flex-1 truncate font-mono text-[11px] uppercase tracking-[0.1em] text-fg sm:text-xs">
                  {layer.label}
                </span>
                <span className="hidden flex-none font-mono text-[11px] tabular-nums tracking-[0.06em] text-muted min-[420px]:inline">
                  {online ? readouts[layer.id] : "—"}
                </span>
                <span
                  className={cn("size-1.5 flex-none", online ? "bg-accent" : "bg-line-strong")}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Trend footer */}
      <div className="grid gap-3 border-t border-line px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="label">TT-101 · Trend</span>
            <span className="font-mono text-xs tabular-nums text-accent">{temp.toFixed(1)} °C</span>
          </div>
          <div className="h-10">
            <Sparkline values={trend} min={70.5} max={74.5} />
          </div>
        </div>
        <DemoBadge className="justify-self-start">Concept visual · demo values</DemoBadge>
      </div>
    </div>
  );
}
