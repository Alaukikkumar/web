import { cn } from "@/lib/utils";

interface SparklineProps {
  values: number[];
  min: number;
  max: number;
  className?: string;
  area?: boolean;
  /** Optional horizontal limit lines, e.g. alarm thresholds. */
  limits?: number[];
  label?: string;
}

const W = 200;
const H = 60;

export function Sparkline({ values, min, max, className, area = true, limits = [], label }: SparklineProps) {
  const span = max - min || 1;
  const step = values.length > 1 ? W / (values.length - 1) : W;
  const y = (v: number) => H - ((Math.min(max, Math.max(min, v)) - min) / span) * H;
  const points = values.map((v, i) => `${(i * step).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={cn("block h-full w-full overflow-visible", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} style={{ stroke: "var(--color-line)" }} vectorEffect="non-scaling-stroke" />
      ))}
      {limits.map((limit) => (
        <line
          key={limit}
          x1="0"
          x2={W}
          y1={y(limit)}
          y2={y(limit)}
          style={{ stroke: "var(--color-alarm)" }}
          strokeOpacity={0.6}
          strokeDasharray="3 4"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {area && values.length > 1 && (
        <polygon points={`0,${H} ${points} ${W},${H}`} style={{ fill: "color-mix(in srgb, var(--color-accent) 9%, transparent)" }} />
      )}
      <polyline
        points={points}
        fill="none"
        style={{ stroke: "var(--color-accent)" }}
        strokeWidth="1.5"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
