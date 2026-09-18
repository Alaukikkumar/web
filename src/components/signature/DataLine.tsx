import type { CSSProperties } from "react";
import { signaturePath } from "@/data/site";
import { cn } from "@/lib/utils";

interface DataLineProps {
  nodes?: readonly string[];
  className?: string;
  duration?: number;
  label?: string;
}

/**
 * Signature visual: a continuously moving industrial data line.
 * SENSOR → PLC → SCADA → DATABASE → REPORT
 */
export function DataLine({ nodes = signaturePath, className, duration = 6, label = "Signal path" }: DataLineProps) {
  return (
    <div
      className={cn("relative flex items-center justify-between overflow-hidden py-1", className)}
      data-live=""
      role="img"
      aria-label={`${label}: ${nodes.join(" to ")}`}
    >
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-strong" aria-hidden="true">
        <span className="packet-track-x" style={{ "--dur": `${duration}s` } as CSSProperties}>
          <span className="packet" />
        </span>
        <span className="packet-track-x" style={{ "--dur": `${duration}s`, "--delay": `${duration / 2}s` } as CSSProperties}>
          <span className="packet opacity-60" />
        </span>
      </div>
      {nodes.map((node, index) => (
        <span
          key={node}
          aria-hidden="true"
          className={cn(
            "relative z-10 flex items-center gap-1.5 bg-bg font-mono text-[10px] uppercase tracking-[0.1em] text-dim sm:gap-2 sm:text-[11px] sm:tracking-[0.14em]",
            index === 0 ? "pr-2" : index === nodes.length - 1 ? "pl-2" : "px-2",
          )}
        >
          <span className="size-1.5 border border-accent" />
          {node}
        </span>
      ))}
    </div>
  );
}
