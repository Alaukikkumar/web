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
      <line x1="20" y1="34" x2="620" y2="34" stroke="rgb(255 255 255 / 0.28)" />
      <line x1="20" y1="40" x2="620" y2="40" stroke="rgb(255 255 255 / 0.1)" />
      <g style={{ animation: "hoist 18s cubic-bezier(0.65,0,0.35,1) infinite" }}>
        <rect x="40" y="24" width="60" height="20" fill="#0e1012" stroke="#3ee08f" />
        <text x="70" y="37.5" textAnchor="middle" fontSize="9" fill="#3ee08f" style={TEXT}>
          HOIST
        </text>
        <line x1="52" y1="44" x2="52" y2="76" stroke="rgb(255 255 255 / 0.35)" strokeDasharray="2 3" />
        <line x1="88" y1="44" x2="88" y2="76" stroke="rgb(255 255 255 / 0.35)" strokeDasharray="2 3" />
        <rect x="46" y="76" width="48" height="10" fill="none" stroke="rgb(255 255 255 / 0.55)" />
      </g>

      {/* Tanks */}
      {tanks.map((tank, i) => {
        const x = 30 + i * 100;
        return (
          <g key={tank.id}>
            <text x={x + 40} y="104" textAnchor="middle" fontSize="10" fill={tank.active ? "#3ee08f" : "#7d848b"} style={TEXT}>
              {tank.id}
            </text>
            <rect x={x} y="112" width="80" height="104" fill="#0b0c0e" stroke={tank.active ? "#3ee08f" : "rgb(255 255 255 / 0.22)"} />
            <rect x={x + 1} y="132" width="78" height="83" fill={tank.active ? "rgb(62 224 143 / 0.12)" : "rgb(255 255 255 / 0.04)"} />
            <line x1={x + 1} x2={x + 79} y1="132" y2="132" stroke={tank.active ? "#3ee08f" : "rgb(255 255 255 / 0.3)"} />
            <text x={x + 40} y="236" textAnchor="middle" fontSize="12" fill="#efefeb" style={TEXT}>
              {tank.temp} °C
            </text>
          </g>
        );
      })}

      {/* Rectifier strip */}
      <text x="20" y="266" fontSize="9" fill="#7d848b" style={TEXT}>
        RS485 · RECTIFIERS R01–R12
      </text>
      {rectifiers.map((level, i) => {
        const x = 20 + i * 50.5;
        const h = 44 * level;
        return (
          <g key={i}>
            <rect x={x} y="274" width="44" height="54" fill="#0e1012" stroke="rgb(255 255 255 / 0.14)" />
            <g style={{ transformOrigin: `${x + 22}px 322px`, animation: `level ${3.2 + (i % 4) * 0.7}s ease-in-out ${i * 0.2}s infinite` }}>
              <rect x={x + 16} y={322 - h} width="12" height={h} fill="rgb(62 224 143 / 0.55)" />
            </g>
            <circle cx={x + 38} cy="280" r="2" fill="#3ee08f" />
            <text x={x + 5} y="283" fontSize="7.5" fill="#7d848b" style={TEXT}>
              R{String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}

      {/* Lot / chemistry strip */}
      <g style={TEXT} fontSize="10">
        <rect x="20" y="342" width="600" height="26" fill="#0e1012" stroke="rgb(255 255 255 / 0.1)" />
        <text x="32" y="359" fill="#9ba1a8">LOT <tspan fill="#efefeb">DEMO-014</tspan></text>
        <text x="160" y="359" fill="#9ba1a8">RECIPE <tspan fill="#efefeb">R-DEMO-02</tspan></text>
        <text x="315" y="359" fill="#9ba1a8">AH <tspan fill="#3ee08f">12.5</tspan></text>
        <text x="400" y="359" fill="#9ba1a8">pH <tspan fill="#efefeb">4.1</tspan></text>
        <text x="480" y="359" fill="#9ba1a8">TDS <tspan fill="#efefeb">1320 ppm</tspan></text>
      </g>
    </svg>
  );
}
