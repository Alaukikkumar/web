import type { CSSProperties } from "react";
import type { ArchitectureStage } from "@/data/projects";
import { cn, pad } from "@/lib/utils";

interface FlowDiagramProps {
  stages: ArchitectureStage[];
  /** Breakpoint at which the diagram switches from a vertical to a horizontal layout. */
  horizontalFrom?: "lg" | "xl";
  className?: string;
  label: string;
}

const layouts = {
  lg: {
    wrap: "lg:flex-row lg:items-stretch",
    stage: "lg:min-w-0 lg:flex-1",
    connector: "lg:h-px lg:w-6 lg:self-center",
    trackY: "lg:hidden",
    trackX: "hidden lg:block",
    arrowY: "lg:hidden",
    arrowX: "hidden lg:block",
  },
  xl: {
    wrap: "xl:flex-row xl:items-stretch",
    stage: "xl:min-w-0 xl:flex-1",
    connector: "xl:h-px xl:w-6 xl:self-center",
    trackY: "xl:hidden",
    trackX: "hidden xl:block",
    arrowY: "xl:hidden",
    arrowX: "hidden xl:block",
  },
} as const;

/** Data-driven architecture diagram with animated signal flow between stages. */
export function FlowDiagram({ stages, horizontalFrom = "lg", className, label }: FlowDiagramProps) {
  const l = layouts[horizontalFrom];

  return (
    <figure className={cn("relative", className)} data-live="">
      <figcaption className="sr-only">
        {label}: {stages.map((stage) => stage.nodes.join(", ")).join(" → ")}
      </figcaption>
      <ol className={cn("flex flex-col", l.wrap)} aria-hidden="true">
        {stages.map((stage, index) => (
          <li key={stage.title} className={cn("contents")}>
            <div
              className={cn("panel corner-marks flex flex-col gap-3 p-4", l.stage)}
              data-reveal=""
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
            >
              <span className="label">
                <span className="text-accent">{pad(index + 1)}</span> · {stage.title}
              </span>
              <div className="flex flex-col gap-1.5">
                {stage.nodes.map((node) => (
                  <span
                    key={node}
                    className="border border-line bg-surface-2 px-2.5 py-2 font-mono text-[11px] uppercase leading-snug tracking-[0.06em] text-fg"
                  >
                    {node}
                  </span>
                ))}
              </div>
            </div>
            {index < stages.length - 1 && (
              <div className={cn("relative h-8 w-px flex-none self-center bg-line-strong", l.connector)}>
                <span
                  className={cn("packet-track-y", l.trackY)}
                  style={{ "--dur": "2.4s", "--delay": `${index * 0.4}s` } as CSSProperties}
                >
                  <span className="packet" />
                </span>
                <span
                  className={cn("packet-track-x", l.trackX)}
                  style={{ "--dur": "2.4s", "--delay": `${index * 0.4}s` } as CSSProperties}
                >
                  <span className="packet" />
                </span>
                <span
                  className={cn(
                    "absolute -bottom-px left-1/2 size-1.5 -translate-x-1/2 rotate-45 border-b border-r border-line-strong",
                    l.arrowY,
                  )}
                />
                <span
                  className={cn(
                    "absolute -right-px top-1/2 size-1.5 -translate-y-1/2 -rotate-45 border-b border-r border-line-strong",
                    l.arrowX,
                  )}
                />
              </div>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
