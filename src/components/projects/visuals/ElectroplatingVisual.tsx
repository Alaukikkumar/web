import { C } from "@/components/diagrams/palette";

const tanks = [
  { id: "T-01", temp: "42.0" },
  { id: "T-02", temp: "25.1" },
  { id: "T-03", temp: "31.4" },
  { id: "T-04", temp: "57.9", active: true },
  { id: "T-05", temp: "25.3" },
  { id: "T-06", temp: "48.6" },
];

// Twelve RS485 rectifiers — bar heights are demo values.
const rectifiers = [0.72, 0.64, 0.8, 0.58, 0.9, 0.46, 0.7, 0.62, 0.84, 0.5, 0.76, 0.66];

const TEXT = { fontFamily: "var(--font-mono)", letterSpacing: "0.08em" } as const;

export function ElectroplatingVisual() {
  return (
    <svg viewBox="0 0 640 380" className="block h-auto w-full" role="img" aria-label="Demo SCADA mimic of an electroplating line: hoist, six process tanks with temperatures, twelve RS485 rectifiers and lot information. Simulated values.">
      {/* Hoist rail */}
      <line x1="20" y1="34" x2="620" y2="34" stroke={C.fgA(28)} />
      <line x1="20" y1="40" x2="620" y2="40" stroke={C.fgA(10)} />
      <g style={{ animation: "hoist 18s cubic-bezier(0.65,0,0.35,1) infinite" }}>
        <rect x="40" y="24" width="60" height="20" fill={C.surface} stroke={C.accent} />
        <text x="70" y="37.5" textAnchor="middle" fontSize="9" fill={C.accent} style={TEXT}>
          HOIST
        </text>
        <line x1="52" y1="44" x2="52" y2="76" stroke={C.fgA(35)} strokeDasharray="2 3" />
        <line x1="88" y1="44" x2="88" y2="76" stroke={C.fgA(35)} strokeDasharray="2 3" />
        <rect x="46" y="76" width="48" height="10" fill="none" stroke={C.fgA(55)} />
      </g>

      {/* Tanks */}
      {tanks.map((tank, i) => {
        const x = 30 + i * 100;
        return (
          <g key={tank.id}>
            <text x={x + 40} y="104" textAnchor="middle" fontSize="10" fill={tank.active ? C.accent : C.dim} style={TEXT}>
              {tank.id}
            </text>
            <rect x={x} y="112" width="80" height="104" fill={C.bg} stroke={tank.active ? C.accent : C.fgA(22)} />
            <rect x={x + 1} y="132" width="78" height="83" fill={tank.active ? C.accentA(12) : C.fgA(4)} />
            <line x1={x + 1} x2={x + 79} y1="132" y2="132" stroke={tank.active ? C.accent : C.fgA(30)} />
            <text x={x + 40} y="236" textAnchor="middle" fontSize="12" fill={C.fg} style={TEXT}>
              {tank.temp} °C
            </text>
          </g>
        );
      })}

      {/* Rectifier strip */}
      <text x="20" y="266" fontSize="9" fill={C.dim} style={TEXT}>
        RS485 · RECTIFIERS R01–R12
      </text>
      {rectifiers.map((level, i) => {
        const x = 20 + i * 50.5;
        const h = 44 * level;
        return (
          <g key={i}>
            <rect x={x} y="274" width="44" height="54" fill={C.surface} stroke={C.fgA(14)} />
            <g style={{ transformOrigin: `${x + 22}px 322px`, animation: `level ${3.2 + (i % 4) * 0.7}s ease-in-out ${i * 0.2}s infinite` }}>
              <rect x={x + 16} y={322 - h} width="12" height={h} fill={C.accentA(55)} />
            </g>
            <circle cx={x + 38} cy="280" r="2" fill={C.accent} />
            <text x={x + 5} y="283" fontSize="7.5" fill={C.dim} style={TEXT}>
              R{String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}

      {/* Lot / chemistry strip */}
      <g style={TEXT} fontSize="10">
        <rect x="20" y="342" width="600" height="26" fill={C.surface} stroke={C.fgA(10)} />
        <text x="32" y="359" fill={C.muted}>LOT <tspan fill={C.fg}>DEMO-014</tspan></text>
        <text x="160" y="359" fill={C.muted}>RECIPE <tspan fill={C.fg}>R-DEMO-02</tspan></text>
        <text x="315" y="359" fill={C.muted}>AH <tspan fill={C.accent}>12.5</tspan></text>
        <text x="400" y="359" fill={C.muted}>pH <tspan fill={C.fg}>4.1</tspan></text>
        <text x="480" y="359" fill={C.muted}>TDS <tspan fill={C.fg}>1320 ppm</tspan></text>
      </g>
    </svg>
  );
}
