"use client";

import { useCallback, useState } from "react";
import { Sparkline } from "@/components/diagrams/Sparkline";
import { DemoBadge, SectionHeading } from "@/components/ui/Primitives";
import { useInView, useInterval, useReducedMotion } from "@/lib/hooks";
import { cn, drift, pad } from "@/lib/utils";
import { AlarmList, type Alarm } from "./AlarmList";
import { TankMimic } from "./TankMimic";

const ALARM_SCRIPT = [
  { tag: "TT-104", message: "Bath temperature high", priority: 2 },
  { tag: "R07", message: "Rectifier communication timeout", priority: 1 },
  { tag: "LT-02", message: "Tank level low", priority: 3 },
];

const equipment = [
  { tag: "M-01", type: "Motor", state: "Running", detail: "1450 rpm" },
  { tag: "P-01", type: "Pump", state: "Running", detail: "Auto" },
  { tag: "P-02", type: "Pump", state: "Stopped", detail: "Manual" },
  { tag: "VFD-01", type: "VFD", state: "Running", detail: "38.2 Hz" },
];

function timeString(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

const initialState = () => ({
  tick: 0,
  temp: 72.4,
  current: 184,
  voltage: 12.6,
  power: 42.8,
  flow: 126,
  ah: 12.5,
  progress: 46,
  levels: [0.68, 0.54, 0.81],
  trend: Array.from({ length: 60 }, (_, i) => 72.4 + Math.sin(i / 6) * 0.7 + Math.cos(i / 2.5) * 0.2),
});

export function ScadaPreview() {
  const reducedMotion = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "100px" });
  const [state, setState] = useState(initialState);
  const [clock, setClock] = useState("--:--:--");
  const [alarms, setAlarms] = useState<Alarm[]>([
    { id: "a0", time: "10:30:12", tag: "TT-104", message: "Bath temperature high", priority: 2, acked: true, cleared: true },
    { id: "a1", time: "09:58:40", tag: "P-02", message: "Stopped by operator", priority: 3, acked: true, cleared: true },
  ]);

  useInterval(
    () => {
      const now = new Date();
      setClock(timeString(now));
      setState((prev) => {
        const temp = drift(prev.temp, 0.2, 71.2, 74.2);
        const current = drift(prev.current, 1.6, 176, 192);
        return {
          tick: prev.tick + 1,
          temp,
          current,
          voltage: drift(prev.voltage, 0.05, 12.2, 13),
          power: drift(prev.power, 0.4, 40.5, 45),
          flow: drift(prev.flow, 1.2, 118, 134),
          ah: prev.ah + current / 3600,
          progress: prev.progress >= 100 ? 0 : prev.progress + 0.25,
          levels: prev.levels.map((level) => drift(level, 0.012, 0.35, 0.92)),
          trend: [...prev.trend.slice(1), temp],
        };
      });
      if (state.tick > 0 && state.tick % 18 === 0) {
        const script = ALARM_SCRIPT[(state.tick / 18 - 1) % ALARM_SCRIPT.length];
        setAlarms((prev) =>
          [
            { id: `live-${state.tick}`, time: timeString(now), ...script, acked: false, cleared: false },
            ...prev,
          ].slice(0, 5),
        );
      }
    },
    1000,
    inView && !reducedMotion,
  );

  const acknowledge = useCallback((id: string) => {
    setAlarms((prev) => prev.map((alarm) => (alarm.id === id ? { ...alarm, acked: true } : alarm)));
  }, []);

  const unacked = alarms.filter((alarm) => !alarm.acked).length;

  const tiles = [
    { tag: "TT-101", label: "Temp", value: state.temp.toFixed(1), unit: "°C" },
    { tag: "R05", label: "Current", value: Math.round(state.current).toString(), unit: "A" },
    { tag: "R05", label: "Voltage", value: state.voltage.toFixed(1), unit: "V" },
    { tag: "MFM-01", label: "Power", value: state.power.toFixed(1), unit: "kW" },
    { tag: "FT-101", label: "Flow", value: Math.round(state.flow).toString(), unit: "Nm³/h" },
    { tag: "LINE-01", label: "Status", value: "RUNNING", unit: "" },
  ];

  return (
    <section aria-labelledby="scada-title" className="force-dark relative border-t border-line bg-[#050606] py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <SectionHeading
          id="scada-title"
          index="07"
          kicker="Control room"
          system="HMI / Overview"
          title={
            <>
              Control <span className="text-muted">the</span> process.
            </>
          }
          intro="A demo SCADA overview built for this page — simulated values, live only while it is on screen. Acknowledge an alarm to see its state change."
        />

        <div ref={ref} className="mt-16 md:mt-20" data-live="" data-reveal="scale">
          <div className="panel corner-marks overflow-hidden bg-surface">
            {/* Title bar */}
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line bg-surface-2 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="size-2 bg-accent" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-fg">Demo plant · Line 01</span>
                <span className="label hidden md:inline">/ Overview</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                <span className="label flex items-center gap-2 text-accent"><span className="size-1.5 bg-accent" aria-hidden="true" />PLC connected</span>
                <span className="label flex items-center gap-2 text-accent"><span className="size-1.5 bg-accent" aria-hidden="true" />Database online</span>
                <span className="label hidden text-muted sm:inline">User · Operator</span>
                <span className="label tabular-nums text-fg" aria-hidden="true">{clock}</span>
              </div>
            </div>

            <div className="grid gap-px bg-line lg:grid-cols-12">
              {/* Process + equipment */}
              <div className="flex flex-col gap-5 bg-surface p-4 sm:p-5 lg:col-span-4">
                <p className="label">Process mimic</p>
                <TankMimic levels={state.levels} flowing={!reducedMotion} />
                <div>
                  <p className="label mb-2">Equipment</p>
                  <ul className="divide-y divide-line border border-line">
                    {equipment.map((item) => {
                      const running = item.state === "Running";
                      return (
                        <li key={item.tag} className="grid grid-cols-[4.2rem_minmax(0,1fr)_auto] items-center gap-3 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.06em]">
                          <span className="text-fg">{item.tag}</span>
                          <span className="truncate text-dim">{item.type} · {item.detail}</span>
                          <span className={cn("flex items-center gap-1.5", running ? "text-accent" : "text-muted")}>
                            <span className={cn("size-1.5", running ? "bg-accent" : "border border-muted")} aria-hidden="true" />
                            {item.state}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Values + trend */}
              <div className="flex flex-col gap-5 bg-surface p-4 sm:p-5 lg:col-span-5">
                <p className="label">Live values</p>
                <dl className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
                  {tiles.map((tile) => (
                    <div key={`${tile.tag}-${tile.label}`} className="flex flex-col gap-2 bg-bg p-3">
                      <dt className="flex items-center justify-between gap-2">
                        <span className="label text-muted">{tile.label}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-dim">{tile.tag}</span>
                      </dt>
                      <dd className={cn("font-mono text-xl tabular-nums tracking-tight sm:text-2xl", tile.unit ? "text-fg" : "text-accent")}>
                        {tile.value}
                        {tile.unit && <span className="ml-1 text-xs text-muted">{tile.unit}</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="flex flex-1 flex-col border border-line bg-bg p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="label">Trend · TT-101 · 60 s</span>
                    <span className="label flex items-center gap-2">
                      <span className="h-px w-4 border-t border-dashed border-alarm" aria-hidden="true" />
                      Hi 74.0
                    </span>
                  </div>
                  <div className="h-32 min-h-32 flex-1">
                    <Sparkline values={state.trend} min={70} max={75} limits={[74]} label="Temperature trend over the last 60 seconds, demo values" />
                  </div>
                </div>
              </div>

              {/* Production + alarms */}
              <div className="flex flex-col gap-5 bg-surface p-4 sm:p-5 lg:col-span-3">
                <div>
                  <p className="label mb-2">Production</p>
                  <dl className="grid grid-cols-2 gap-px border border-line bg-line font-mono text-[11px] uppercase">
                    {[
                      ["Lot", "DEMO-014"],
                      ["Recipe", "R-DEMO-02"],
                      ["Tank", "T-04"],
                      ["Ah", state.ah.toFixed(2)],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-bg px-3 py-2">
                        <dt className="text-dim">{label}</dt>
                        <dd className="mt-1 tabular-nums text-fg">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-3">
                    <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                      <span>Process time</span>
                      <span className="tabular-nums">{Math.round(state.progress)}%</span>
                    </div>
                    <div className="h-1.5 bg-line" role="progressbar" aria-label="Process time, demo" aria-valuenow={Math.round(state.progress)} aria-valuemin={0} aria-valuemax={100}>
                      <div className="h-full origin-left bg-accent transition-transform duration-1000 ease-linear" style={{ transform: `scaleX(${state.progress / 100})` }} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="label">Alarms</p>
                    <span className={cn("label tabular-nums", unacked ? "anim-blink text-alarm" : "text-dim")}>
                      {unacked} unack
                    </span>
                  </div>
                  <AlarmList alarms={alarms} onAcknowledge={acknowledge} />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3">
              <span className="label">Scan 1000 ms · Data streaming</span>
              <DemoBadge>Demo system · simulated values · not a client system</DemoBadge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
