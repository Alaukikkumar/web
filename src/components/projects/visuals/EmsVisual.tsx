const TEXT = { fontFamily: "var(--font-mono)", letterSpacing: "0.08em" } as const;
const LINE = "rgb(255 255 255 / 0.4)";

type FeederKind = "generator" | "ups" | "solar" | "load";

const feeders: { x: number; id: string; kind: FeederKind; value: string; source: boolean }[] = [
  { x: 90, id: "DG-01", kind: "generator", value: "0.0 kW", source: true },
  { x: 205, id: "UPS-01", kind: "ups", value: "18.6 kW", source: false },
  { x: 320, id: "SOLAR", kind: "solar", value: "64.2 kW", source: true },
  { x: 435, id: "LOAD-01", kind: "load", value: "214.2 kW", source: false },
  { x: 550, id: "LOAD-02", kind: "load", value: "149.4 kW", source: false },
];

function FeederSymbol({ kind, x }: { kind: FeederKind; x: number }) {
  const y = 236;
  switch (kind) {
    case "generator":
      return (
        <g>
          <circle cx={x} cy={y} r="18" fill="#0b0c0e" stroke={LINE} />
          <text x={x} y={y + 4.5} textAnchor="middle" fontSize="13" fill="#efefeb" style={TEXT}>G</text>
        </g>
      );
    case "ups":
      return (
        <g>
          <rect x={x - 22} y={y - 16} width="44" height="32" fill="#0b0c0e" stroke={LINE} />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill="#efefeb" style={TEXT}>UPS</text>
        </g>
      );
    case "solar":
      return (
        <g>
          <path d={`M${x - 24} ${y + 14} L${x - 14} ${y - 14} H${x + 24} L${x + 14} ${y + 14} Z`} fill="#0b0c0e" stroke={LINE} />
          <path d={`M${x - 19} ${y} H${x + 19} M${x - 5} ${y - 14} L${x - 10} ${y + 14} M${x + 5} ${y - 14} L${x} ${y + 14}`} stroke="rgb(255 255 255 / 0.25)" />
        </g>
      );
    default:
      return (
        <g>
          <path d={`M${x - 16} ${y - 12} H${x + 16} L${x} ${y + 14} Z`} fill="#0b0c0e" stroke={LINE} />
        </g>
      );
  }
}

export function EmsVisual() {
  return (
    <svg viewBox="0 0 640 380" className="block h-auto w-full" role="img" aria-label="Demo single-line diagram for an energy management system: grid incomer, transformer, main bus and feeders for DG, UPS, solar and two loads with power readings, plus a demand trend. Simulated values.">
      {/* Incomer + transformer */}
      <text x="120" y="24" textAnchor="middle" fontSize="10" fill="#7d848b" style={TEXT}>GRID INCOMER</text>
      <line x1="120" y1="32" x2="120" y2="54" stroke={LINE} />
      <circle cx="120" cy="64" r="11" fill="none" stroke={LINE} />
      <circle cx="120" cy="80" r="11" fill="none" stroke={LINE} />
      <line x1="120" y1="91" x2="120" y2="106" stroke={LINE} />
      <rect x="112" y="106" width="16" height="16" fill="#0b0c0e" stroke="#3ee08f" />
      <line x1="120" y1="122" x2="120" y2="146" stroke={LINE} />
      <line x1="120" y1="32" x2="120" y2="146" stroke="#3ee08f" strokeOpacity="0.8" className="anim-dash" />
      <text x="140" y="118" fontSize="9" fill="#9ba1a8" style={TEXT}>MFM-00 · 318.0 kW</text>

      {/* Main bus */}
      <line x1="50" y1="148" x2="600" y2="148" stroke="#efefeb" strokeWidth="3" />
      <text x="600" y="140" textAnchor="end" fontSize="9" fill="#7d848b" style={TEXT}>415 V MAIN BUS</text>

      {/* Feeders */}
      {feeders.map((f) => (
        <g key={f.id}>
          <line x1={f.x} y1="150" x2={f.x} y2="218" stroke={LINE} />
          <line
            x1={f.x}
            y1="150"
            x2={f.x}
            y2="218"
            stroke="#3ee08f"
            strokeOpacity={f.value === "0.0 kW" ? 0 : 0.85}
            className="anim-dash"
            style={{ animationDirection: f.source ? "reverse" : "normal" }}
          />
          <rect x={f.x - 7} y="170" width="14" height="14" fill="#0b0c0e" stroke={f.value === "0.0 kW" ? LINE : "#3ee08f"} />
          <FeederSymbol kind={f.kind} x={f.x} />
          <text x={f.x} y="278" textAnchor="middle" fontSize="10" fill="#9ba1a8" style={TEXT}>{f.id}</text>
          <rect x={f.x - 46} y="288" width="92" height="26" fill="#0e1012" stroke="rgb(255 255 255 / 0.12)" />
          <text x={f.x} y="305" textAnchor="middle" fontSize="11" fill={f.value === "0.0 kW" ? "#7d848b" : "#efefeb"} style={TEXT}>
            {f.value}
          </text>
        </g>
      ))}

      {/* Demand trend */}
      <g>
        <rect x="330" y="14" width="290" height="110" fill="#0b0c0e" stroke="rgb(255 255 255 / 0.12)" />
        <text x="344" y="34" fontSize="9" fill="#7d848b" style={TEXT}>DEMAND · 15-MIN AVG</text>
        <text x="606" y="34" textAnchor="end" fontSize="11" fill="#3ee08f" style={TEXT}>318 kW</text>
        {[60, 80, 100].map((y) => (
          <line key={y} x1="344" x2="606" y1={y} y2={y} stroke="rgb(255 255 255 / 0.06)" />
        ))}
        <line x1="344" x2="606" y1="56" y2="56" stroke="rgb(255 176 32 / 0.6)" strokeDasharray="3 4" />
        <text x="606" y="52" textAnchor="end" fontSize="8" fill="rgb(255 176 32 / 0.8)" style={TEXT}>DEMAND LIMIT</text>
        <polyline
          points="344,104 366,98 388,100 410,90 432,86 454,92 476,80 498,76 520,82 542,72 564,74 586,68 606,70"
          fill="none"
          stroke="#3ee08f"
          strokeWidth="1.5"
        />
      </g>

      {/* Energy summary */}
      <g style={TEXT} fontSize="10">
        <rect x="20" y="336" width="600" height="30" fill="#0e1012" stroke="rgb(255 255 255 / 0.1)" />
        <text x="34" y="355" fill="#9ba1a8">kWh TODAY <tspan fill="#efefeb">3,842.6</tspan></text>
        <text x="220" y="355" fill="#9ba1a8">PF <tspan fill="#efefeb">0.96</tspan></text>
        <text x="300" y="355" fill="#9ba1a8">WATER <tspan fill="#efefeb">12.4 m³</tspan></text>
        <text x="450" y="355" fill="#9ba1a8">GAS <tspan fill="#efefeb">86.0 Nm³</tspan></text>
      </g>
    </svg>
  );
}
