"use client";

import { Check, X } from "lucide-react";
import { useCallback, useEffect, useRef, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { DemoBadge, SectionHeading } from "@/components/ui/Primitives";
import { clamp, cn } from "@/lib/utils";

/** Positions are percentages of the stage: `x/y` from `sm` up, `mx/my` for the portrait phone layout. */
interface DiagramNode {
  x: number;
  y: number;
  mx: number;
  my: number;
  label: string;
  sub: string;
  hub?: boolean;
}

const beforeNodes: DiagramNode[] = [
  { x: 16, y: 20, mx: 27, my: 17, label: "Sensors", sub: "Read on gauge" },
  { x: 16, y: 50, mx: 27, my: 37, label: "PLC", sub: "Local only" },
  { x: 16, y: 80, mx: 27, my: 57, label: "Rectifiers", sub: "Panel display" },
  { x: 42, y: 32, mx: 73, my: 17, label: "HMI 01", sub: "Isolated" },
  { x: 42, y: 68, mx: 73, my: 37, label: "HMI 02", sub: "Isolated" },
  { x: 84, y: 20, mx: 73, my: 57, label: "Log sheet", sub: "Hand-written" },
  { x: 84, y: 50, mx: 27, my: 77, label: "Excel report", sub: "End of shift" },
  { x: 84, y: 80, mx: 73, my: 77, label: "Phone call", sub: "When noticed" },
];

const afterNodes: DiagramNode[] = [
  { x: 16, y: 20, mx: 18, my: 17, label: "Sensors", sub: "72.4 °C · live" },
  { x: 16, y: 50, mx: 50, my: 17, label: "PLC", sub: "Connected" },
  { x: 16, y: 80, mx: 82, my: 17, label: "Rectifiers", sub: "RS485 online" },
  { x: 60, y: 50, mx: 66, my: 48, label: "SCADA", sub: "Centralized", hub: true },
  { x: 84, y: 20, mx: 18, my: 79, label: "SQL historian", sub: "Logged" },
  { x: 84, y: 50, mx: 50, my: 79, label: "Auto reports", sub: "Scheduled" },
  { x: 84, y: 80, mx: 82, my: 79, label: "Alerts", sub: "SMS · Telegram" },
];

// Line segments in the same percentage space as the nodes.
const beforeLinks = {
  desktop: [
    [16, 20, 30, 27],
    [16, 50, 42, 32],
    [16, 80, 31, 74],
    [42, 68, 56, 60],
    [84, 20, 70, 26],
    [84, 80, 72, 76],
  ],
  mobile: [
    [42, 17, 50, 17],
    [42, 37, 51, 37],
    [27, 65, 27, 69],
    [73, 25, 73, 29],
  ],
};
const afterLinks = {
  desktop: [
    [16, 20, 60, 50],
    [16, 50, 60, 50],
    [16, 80, 60, 50],
    [60, 50, 84, 20],
    [60, 50, 84, 50],
    [60, 50, 84, 80],
  ],
  mobile: [
    [18, 17, 66, 48],
    [50, 17, 66, 48],
    [82, 17, 66, 48],
    [66, 48, 18, 79],
    [66, 48, 50, 79],
    [66, 48, 82, 79],
  ],
};

const beforeList = [
  "Manual monitoring",
  "Manual reports",
  "Disconnected systems",
  "Limited historical data",
  "Difficult troubleshooting",
  "No centralized visibility",
];
const afterList = [
  "Centralized SCADA",
  "Automated reports",
  "SQL historian",
  "Real-time monitoring",
  "Alarm notifications",
  "Historical trends",
  "Connected industrial systems",
];

function Links({ links, after }: { links: { desktop: number[][]; mobile: number[][] }; after: boolean }) {
  return (
    <>
      <LinkLayer links={links.mobile} after={after} className="sm:hidden" />
      <LinkLayer links={links.desktop} after={after} className="hidden sm:block" />
    </>
  );
}

function LinkLayer({ links, after, className }: { links: number[][]; after: boolean; className: string }) {
  return (
    <svg className={cn("absolute inset-0 h-full w-full", className)} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {links.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          style={{ stroke: after ? "var(--color-accent)" : "var(--color-line-strong)" }}
          strokeOpacity={after ? 0.75 : 1}
          strokeWidth="1"
          strokeDasharray={after ? "4 6" : "3 5"}
          vectorEffect="non-scaling-stroke"
          className={after ? "anim-dash" : undefined}
        />
      ))}
    </svg>
  );
}

function Nodes({ nodes, after }: { nodes: DiagramNode[]; after: boolean }) {
  return (
    <>
      {nodes.map((node) => (
        <div
          key={node.label}
          className={cn(
            "absolute left-[var(--mx)] top-[var(--my)] flex w-[30%] max-w-[11.5rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-1 border px-2 py-2 sm:left-[var(--x)] sm:top-[var(--y)] sm:px-3 sm:py-2.5",
            after ? "bg-bg" : "bg-surface",
            after && node.hub && "max-w-[13rem] border-accent py-3 sm:py-4",
            after && !node.hub && "border-accent/50",
            !after && "border-dashed border-line-strong",
          )}
          style={{ "--x": `${node.x}%`, "--y": `${node.y}%`, "--mx": `${node.mx}%`, "--my": `${node.my}%` } as CSSProperties}
        >
          <span
            className={cn(
              "font-mono text-[10px] uppercase leading-tight tracking-[0.08em] sm:text-[11px]",
              after ? "text-fg" : "text-muted",
              node.hub && "text-sm font-medium text-accent sm:text-base",
            )}
          >
            {node.label}
          </span>
          <span className={cn("flex items-center gap-1.5 font-mono text-[9px] uppercase leading-tight tracking-[0.06em] sm:text-[10px]", after ? "text-accent" : "text-dim")}>
            <span className={cn("size-1.5 flex-none", after ? "bg-accent" : "border border-dim")} aria-hidden="true" />
            {node.sub}
          </span>
        </div>
      ))}
    </>
  );
}

export function BeforeAfter() {
  const stageRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(50);
  const dragging = useRef(false);
  const touched = useRef(false);

  const apply = useCallback((value: number) => {
    const next = clamp(value, 0, 100);
    posRef.current = next;
    stageRef.current?.style.setProperty("--pos", `${next}%`);
    const handle = handleRef.current;
    if (handle) {
      handle.setAttribute("aria-valuenow", String(Math.round(next)));
      handle.setAttribute("aria-valuetext", `${Math.round(100 - next)}% of the view shows the connected system`);
    }
  }, []);

  const fromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    apply(((event.clientX - rect.left) / rect.width) * 100);
  };

  // One gentle hint sweep the first time the slider scrolls into view.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const run = (now: number) => {
          if (touched.current) return;
          const t = Math.min(1, (now - start) / 2200);
          apply(50 + Math.sin(t * Math.PI * 2) * 18 * (1 - t));
          if (t < 1) frame = requestAnimationFrame(run);
        };
        frame = requestAnimationFrame(run);
      },
      { threshold: 0.6 },
    );
    observer.observe(stage);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [apply]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageDown: -10, PageUp: 10 };
    touched.current = true;
    if (event.key in steps) apply(posRef.current + steps[event.key]);
    else if (event.key === "Home") apply(0);
    else if (event.key === "End") apply(100);
    else return;
    event.preventDefault();
  };

  return (
    <section aria-labelledby="before-after-title" className="relative border-t border-line py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <SectionHeading
          id="before-after-title"
          index="05"
          kicker="Transformation"
          system="Before / After"
          title={
            <>
              From manual processes <span className="text-muted">to connected control.</span>
            </>
          }
          intro="Drag the divider. The field equipment stays the same — what changes is how its data travels."
        />

        <div className="mt-16 md:mt-20" data-reveal="">
          <div
            ref={stageRef}
            className="panel relative aspect-[4/5] touch-pan-y select-none overflow-hidden sm:aspect-[16/10] lg:aspect-[16/8]"
            style={{ "--pos": "50%" } as CSSProperties}
            data-live=""
            onPointerDown={(event) => {
              touched.current = true;
              dragging.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              fromPointer(event);
            }}
            onPointerMove={(event) => dragging.current && fromPointer(event)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            {/* BEFORE */}
            <div className="absolute inset-0 bg-surface" aria-hidden="true">
              <div className="absolute inset-0 opacity-60 [background-image:repeating-linear-gradient(135deg,var(--color-line)_0_1px,transparent_1px_10px)]" />
              <Links links={beforeLinks} after={false} />
              <Nodes nodes={beforeNodes} after={false} />
            </div>

            {/* AFTER */}
            <div className="grid-bg absolute inset-0 bg-bg" style={{ clipPath: "inset(0 0 0 var(--pos))" }} aria-hidden="true">
              <Links links={afterLinks} after />
              <Nodes nodes={afterNodes} after />
            </div>

            <span className="label absolute left-3 top-3 border border-line-strong bg-bg/80 px-2 py-1 text-muted sm:left-4 sm:top-4">Before</span>
            <span className="label absolute right-3 top-3 border border-accent/60 bg-bg/80 px-2 py-1 text-accent sm:right-4 sm:top-4">After</span>
            <DemoBadge className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">Concept visual</DemoBadge>

            {/* Divider */}
            <div className="absolute inset-y-0 w-px bg-fg" style={{ left: "var(--pos)" }}>
              <div
                ref={handleRef}
                role="slider"
                tabIndex={0}
                aria-label="Before and after comparison"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={50}
                aria-valuetext="50% of the view shows the connected system"
                onKeyDown={onKeyDown}
                className="absolute left-1/2 top-1/2 flex h-12 w-8 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center gap-1 border border-fg bg-bg"
              >
                <span className="h-4 w-px bg-fg" />
                <span className="h-4 w-px bg-fg" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-px border border-line bg-line md:grid-cols-2">
          <div className="bg-bg p-6 md:p-8" data-reveal="">
            <p className="label mb-5">Before</p>
            <ul className="grid gap-3">
              {beforeList.map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted">
                  <X className="size-4 flex-none text-dim" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-bg p-6 md:p-8" data-reveal="" style={{ "--reveal-delay": "100ms" } as CSSProperties}>
            <p className="label mb-5 text-accent">After</p>
            <ul className="grid gap-3">
              {afterList.map((item) => (
                <li key={item} className="flex items-center gap-3 text-fg">
                  <Check className="size-4 flex-none text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
