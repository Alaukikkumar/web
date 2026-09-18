import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface Row {
  ts: string;
  tag: string;
  value: string;
  quality: "GOOD" | "BAD" | "EVENT";
}

const rows: Row[] = [
  { ts: "09:10:00", tag: "TT101_PV", value: "57.9 °C", quality: "GOOD" },
  { ts: "09:10:00", tag: "R05_CURRENT", value: "37.4 A", quality: "GOOD" },
  { ts: "09:10:00", tag: "R05_VOLTAGE", value: "6.8 V", quality: "GOOD" },
  { ts: "09:10:00", tag: "PH_T04", value: "4.1 pH", quality: "GOOD" },
  { ts: "09:10:00", tag: "TDS_T04", value: "1320 ppm", quality: "GOOD" },
  { ts: "09:10:05", tag: "TT102_PV", value: "—", quality: "BAD" },
  { ts: "09:10:00", tag: "EM01_KWH", value: "3842.6 kWh", quality: "GOOD" },
  { ts: "09:10:00", tag: "LINE_LOTS", value: "14", quality: "GOOD" },
  { ts: "09:11:02", tag: "ALM_T04_HI", value: "ACTIVE", quality: "EVENT" },
];

const stages = ["Validate", "Report", "Email / Telegram"];

export function DataPipelineVisual() {
  return (
    <div
      className="grid h-full grid-cols-1 gap-3 p-3 sm:grid-cols-[minmax(0,1fr)_9.5rem] sm:p-4"
      role="img"
      aria-label="Demo SQL process log: time-stamped rows with tag, value and quality, including a bad-quality value and an alarm event, flowing into validation, reporting and email / Telegram delivery. Simulated values."
    >
      <div className="flex min-w-0 flex-col border border-line bg-bg" aria-hidden="true">
        <div className="flex items-center justify-between border-b border-line px-3 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">dbo.ProcessLog</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">● Streaming</span>
        </div>
        <div className="grid grid-cols-[4.6rem_minmax(0,1fr)_5.4rem_3.4rem] gap-2 border-b border-line px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-dim">
          <span>Ts</span>
          <span>Tag</span>
          <span className="text-right">Value</span>
          <span className="text-right">Q</span>
        </div>
        <div className="relative h-[15.5rem] overflow-hidden">
          <div className="absolute inset-x-0 top-0" style={{ animation: "scroll-rows 22s linear infinite" }}>
            {[...rows, ...rows].map((row, i) => (
              <div
                key={i}
                className={cn(
                  "grid grid-cols-[4.6rem_minmax(0,1fr)_5.4rem_3.4rem] gap-2 border-b border-line/60 px-3 py-[0.45rem] font-mono text-[10.5px] tabular-nums",
                  row.quality === "EVENT" && "bg-alarm/[0.06]",
                )}
              >
                <span className="text-dim">{row.ts}</span>
                <span className="truncate text-fg">{row.tag}</span>
                <span className="text-right text-muted">{row.value}</span>
                <span
                  className={cn(
                    "text-right",
                    row.quality === "GOOD" && "text-accent",
                    row.quality === "BAD" && "text-alarm",
                    row.quality === "EVENT" && "text-alarm",
                  )}
                >
                  {row.quality}
                </span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-bg to-transparent" />
        </div>
      </div>

      <ol className="hidden flex-col sm:flex" aria-hidden="true">
        {stages.map((stage, i) => (
          <li key={stage} className="contents">
            <div className="flex flex-1 flex-col justify-center gap-1 border border-line bg-bg px-3 py-3">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-dim">Stage {i + 1}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg">{stage}</span>
            </div>
            {i < stages.length - 1 && (
              <div className="relative mx-auto h-6 w-px bg-line-strong">
                <span className="packet-track-y" style={{ "--dur": "1.6s", "--delay": `${i * 0.5}s` } as CSSProperties}>
                  <span className="packet" />
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
