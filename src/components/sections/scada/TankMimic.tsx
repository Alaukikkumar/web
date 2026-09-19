import { C } from "@/components/diagrams/palette";

const TEXT = { fontFamily: "var(--font-mono)", letterSpacing: "0.08em" } as const;
const TANKS = ["TK-01", "TK-02", "TK-03"];

/** Three-tank mimic with live levels (scaleY transform — no layout work). */
export function TankMimic({ levels, flowing }: { levels: number[]; flowing: boolean }) {
  return (
    <svg viewBox="0 0 320 190" className="block h-auto w-full" role="img" aria-label={`Demo tank levels: ${TANKS.map((t, i) => `${t} ${Math.round(levels[i] * 100)}%`).join(", ")}`}>
      {/* piping */}
      <path d="M78 150 H138 M198 150 H258" stroke={C.fgA(40)} strokeWidth="2" />
      {/* P-01 running (flow), P-02 stopped (no flow) */}
      <path d="M78 150 H138" stroke={C.accent} strokeWidth="2" className={flowing ? "anim-dash" : undefined} strokeDasharray="4 6" />
      {/* pumps */}
      {[108, 228].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="150" r="9" fill={C.bg} stroke={i === 0 ? C.accent : C.fgA(40)} />
          <path d={`M${x - 4} ${145} L${x + 5} 150 L${x - 4} 155`} fill="none" stroke={i === 0 ? C.accent : C.fgA(40)} />
          <text x={x} y="176" textAnchor="middle" fontSize="8" fill={C.dim} style={TEXT}>
            P-0{i + 1}
          </text>
        </g>
      ))}
      {TANKS.map((tank, i) => {
        const x = 18 + i * 120;
        const level = levels[i] ?? 0.5;
        return (
          <g key={tank}>
            <text x={x + 30} y="14" textAnchor="middle" fontSize="9" fill={C.muted} style={TEXT}>
              {tank}
            </text>
            <rect x={x} y="22" width="60" height="140" fill={C.bg} stroke={C.fgA(30)} />
            <rect
              x={x + 1}
              y="23"
              width="58"
              height="138"
              fill={C.accentA(16)}
              style={{ transformOrigin: `${x + 30}px 161px`, transform: `scaleY(${level})`, transition: "transform 1s linear" }}
            />
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1={x + 50} x2={x + 60} y1={22 + 140 * f} y2={22 + 140 * f} stroke={C.fgA(30)} />
            ))}
            <text x={x + 30} y="100" textAnchor="middle" fontSize="13" fill={C.fg} style={TEXT}>
              {Math.round(level * 100)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}
