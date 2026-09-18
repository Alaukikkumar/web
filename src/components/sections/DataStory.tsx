"use client";

import { useState } from "react";
import { Sparkline } from "@/components/diagrams/Sparkline";
import { DemoBadge, SectionHeading, revealDelay } from "@/components/ui/Primitives";
import { cn, pad } from "@/lib/utils";

// Demo instrument: TT-101, 4–20 mA → 0–100 °C. Limits follow NAMUR NE43 for signal failure.
const RANGE_LO = 0;
const RANGE_HI = 100;
const LIMIT_H = 80;
const LIMIT_HH = 90;

type Status = "NORMAL" | "HIGH" | "HIGH-HIGH" | "BAD QUALITY";

interface Reading {
  mA: number;
  value: number | null;
  status: Status;
}

function evaluate(mA: number): Reading {
  if (mA < 3.6 || mA > 21) return { mA, value: null, status: "BAD QUALITY" };
  const value = ((mA - 4) / 16) * (RANGE_HI - RANGE_LO) + RANGE_LO;
  const status: Status = value >= LIMIT_HH ? "HIGH-HIGH" : value >= LIMIT_H ? "HIGH" : "NORMAL";
  return { mA, value, status };
}

const presets = [
  { label: "Normal", mA: 15.58 },
  { label: "High", mA: 17.2 },
  { label: "High-high", mA: 18.6 },
  { label: "Wire break", mA: 0 },
];

function clockNow() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function DataStory() {
  const [reading, setReading] = useState<Reading>(() => evaluate(15.58));
  const [history, setHistory] = useState<Reading[]>(() =>
    Array.from({ length: 24 }, (_, i) => evaluate(15.58 + Math.sin(i / 3) * 0.12)),
  );
  const [events, setEvents] = useState<{ time: string; text: string; alarm: boolean }[]>([]);

  const update = (mA: number) => {
    const next = evaluate(Math.round(mA * 100) / 100);
    if (next.status !== reading.status) {
      const text =
        next.status === "NORMAL" ? "TT-101 returned to normal" : `TT-101 ${next.status}${next.value === null ? " · signal fault" : ""}`;
      setEvents((prev) => [{ time: clockNow(), text, alarm: next.status !== "NORMAL" }, ...prev].slice(0, 3));
    }
    setReading(next);
    setHistory((prev) => [...prev.slice(-39), next]);
  };

  const good = history.filter((r) => r.value !== null) as Array<Reading & { value: number }>;
  const avg = good.length ? good.reduce((sum, r) => sum + r.value, 0) / good.length : null;
  const max = good.length ? Math.max(...good.map((r) => r.value)) : null;
  const bad = history.length - good.length;
  const alarmCount = events.filter((e) => e.alarm).length;

  const alarmState = reading.status !== "NORMAL";
  const position = Math.min(1, Math.max(0, reading.mA / 22));

  const steps = [
    {
      key: "raw",
      label: "Raw signal",
      content: (
        <>
          <p className="font-mono text-3xl tabular-nums tracking-tight text-fg">
            {reading.mA.toFixed(2)}
            <span className="ml-1 text-sm text-muted">mA</span>
          </p>
          <div className="relative mt-4 h-1.5 bg-line">
            <span className="absolute inset-y-0 bg-accent/25" style={{ left: `${(4 / 22) * 100}%`, width: `${(16 / 22) * 100}%` }} />
            <span className="absolute -top-1 h-3.5 w-0.5 bg-fg" style={{ left: `${position * 100}%` }} />
          </div>
          <p className="label mt-3">AI channel · 4–20 mA</p>
        </>
      ),
    },
    {
      key: "eng",
      label: "Engineering value",
      content: (
        <>
          <p className={cn("font-mono text-3xl tabular-nums tracking-tight", reading.value === null ? "text-alarm" : "text-fg")}>
            {reading.value === null ? "——.—" : reading.value.toFixed(1)}
            <span className="ml-1 text-sm text-muted">°C</span>
          </p>
          <p className="label mt-4 normal-case tracking-[0.04em]">(mA − 4) / 16 × 100</p>
        </>
      ),
    },
    {
      key: "status",
      label: "Process status",
      content: (
        <>
          <p className={cn("font-mono text-2xl tracking-tight", alarmState ? "text-alarm" : "text-accent", reading.status === "HIGH-HIGH" && "anim-blink")}>
            {reading.status}
          </p>
          <p className="label mt-4">H {LIMIT_H} °C · HH {LIMIT_HH} °C</p>
        </>
      ),
    },
    {
      key: "trend",
      label: "Historical trend",
      content: (
        <div className="h-16">
          <Sparkline values={history.map((r) => r.value ?? RANGE_LO)} min={RANGE_LO} max={RANGE_HI} limits={[LIMIT_H, LIMIT_HH]} />
        </div>
      ),
    },
    {
      key: "event",
      label: "Alarm / event",
      content: events.length ? (
        <ul className="flex flex-col gap-1.5">
          {events.map((event, i) => (
            <li key={`${event.time}-${i}`} className={cn("font-mono text-[11px] uppercase leading-snug tracking-[0.04em]", i === 0 ? (event.alarm ? "text-alarm" : "text-accent") : "text-dim")}>
              <span className="tabular-nums">{event.time}</span> {event.text}
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-mono text-2xl tracking-tight text-fg">No alarm</p>
      ),
    },
    {
      key: "report",
      label: "Report",
      content: (
        <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.04em]">
          <dt className="text-dim">Avg</dt>
          <dd className="text-right tabular-nums text-fg">{avg === null ? "—" : `${avg.toFixed(1)} °C`}</dd>
          <dt className="text-dim">Max</dt>
          <dd className="text-right tabular-nums text-fg">{max === null ? "—" : `${max.toFixed(1)} °C`}</dd>
          <dt className="text-dim">Alarms</dt>
          <dd className="text-right tabular-nums text-fg">{alarmCount}</dd>
          <dt className="text-dim">Bad samples</dt>
          <dd className={cn("text-right tabular-nums", bad ? "text-alarm" : "text-fg")}>{bad}</dd>
        </dl>
      ),
    },
  ];

  return (
    <section aria-labelledby="data-story-title" className="relative border-t border-line py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <SectionHeading
            id="data-story-title"
            index="09"
            kicker="Data story"
            system="Signal → Report"
            title={
              <>
                Industrial data should <span className="text-muted">tell a story.</span>
              </>
            }
          />
          <blockquote className="border-l border-accent pl-6 text-lg leading-relaxed text-fg md:text-xl" data-reveal="" style={revealDelay(2)}>
            Reliable automation is not only about controlling a machine. The system should preserve what happened, when it
            happened and why it happened.
          </blockquote>
        </div>

        <div className="mt-16 md:mt-20" data-reveal="">
          {/* Signal simulator */}
          <div className="panel flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-8">
            <div className="flex flex-none flex-col gap-1.5">
              <label htmlFor="signal-slider" className="label text-fg">
                Simulate field signal · TT-101
              </label>
              <span className="label">Drag to change the transmitter current</span>
            </div>
            <input
              id="signal-slider"
              type="range"
              min={0}
              max={22}
              step={0.01}
              value={reading.mA}
              onChange={(event) => update(Number(event.target.value))}
              aria-valuetext={`${reading.mA.toFixed(2)} milliamps, ${reading.value === null ? "bad quality" : `${reading.value.toFixed(1)} degrees Celsius`}, ${reading.status}`}
              className="h-8 w-full flex-1 cursor-pointer accent-accent"
            />
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => update(preset.mA)}
                  className={cn(
                    "border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                    Math.abs(reading.mA - preset.mA) < 0.005 ? "border-accent text-accent" : "border-line text-muted hover:border-line-strong hover:text-fg",
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <DemoBadge className="self-start lg:self-center">Demo</DemoBadge>
          </div>

          <ol className="mt-6 grid gap-px border border-line bg-line md:grid-cols-3 xl:grid-cols-6">
            {steps.map((step, index) => (
              <li key={step.key} className="relative flex min-h-[12.5rem] flex-col gap-5 bg-bg p-5">
                <div className="flex items-center justify-between">
                  <span className="label">
                    <span className="text-accent">{pad(index + 1)}</span> · {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <span className="label text-dim" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-end">{step.content}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
