import { C } from "@/components/diagrams/palette";

const TEXT = { fontFamily: "var(--font-mono)", letterSpacing: "0.08em" } as const;
const PIPE = C.fgA(45);
const SIGNAL = C.accentA(70);

const instruments = [
  { x: 220, tag: "FT", loop: "101" },
  { x: 290, tag: "PT", loop: "102" },
  { x: 360, tag: "TT", loop: "103" },
];

export function BiogasVisual() {
  return (
    <svg viewBox="0 0 640 380" className="block h-auto w-full" role="img" aria-label="Concept process diagram of biogas automation: digester, gas line with flow, pressure and temperature transmitters, valve, blower driven by a VFD, pump, PLC and HMI connected over industrial Ethernet.">
      {/* Digester */}
      <path d="M30 300 V150 Q30 100 100 100 Q170 100 170 150 V300 Z" fill={C.bg} stroke={PIPE} />
      <path d="M31 190 H169" stroke={C.accentA(35)} strokeDasharray="4 4" />
      <rect x="31" y="190" width="138" height="109" fill={C.accentA(6)} />
      <text x="100" y="250" textAnchor="middle" fontSize="10" fill={C.muted} style={TEXT}>DIGESTER</text>

      {/* Gas line */}
      <path d="M100 100 V70 H600" fill="none" stroke={PIPE} strokeWidth="2" />
      <path d="M100 100 V70 H600" fill="none" stroke={C.accent} strokeWidth="2" className="anim-dash" />
      <path d="M592 64 L604 70 L592 76" fill="none" stroke={PIPE} />
      <text x="604" y="56" textAnchor="end" fontSize="9" fill={C.dim} style={TEXT}>GAS USE</text>

      {/* Instruments (ISA bubbles) */}
      {instruments.map((inst) => (
        <g key={inst.tag}>
          <line x1={inst.x} y1="70" x2={inst.x} y2="48" stroke={PIPE} />
          <circle cx={inst.x} cy="30" r="18" fill={C.surface} stroke={C.fg} strokeOpacity="0.7" />
          <line x1={inst.x - 18} x2={inst.x + 18} y1="30" y2="30" stroke={C.fgA(30)} />
          <text x={inst.x} y="26" textAnchor="middle" fontSize="9" fill={C.fg} style={TEXT}>{inst.tag}</text>
          <text x={inst.x} y="42" textAnchor="middle" fontSize="8" fill={C.muted} style={TEXT}>{inst.loop}</text>
          {/* signal line to PLC */}
          <path d={`M${inst.x} 70 V240`} stroke={SIGNAL} strokeDasharray="5 4" fill="none" className="anim-dash" style={{ animationDirection: "reverse" }} />
        </g>
      ))}

      {/* Valve */}
      <path d="M420 60 V80 L444 60 V80 Z" fill={C.bg} stroke={C.fg} strokeOpacity="0.7" />
      <line x1="432" y1="70" x2="432" y2="52" stroke={PIPE} />
      <rect x="425" y="44" width="14" height="8" fill="none" stroke={PIPE} />
      <text x="432" y="100" textAnchor="middle" fontSize="8" fill={C.dim} style={TEXT}>XV-104</text>

      {/* Blower */}
      <circle cx="520" cy="70" r="26" fill={C.bg} stroke={C.fg} strokeOpacity="0.8" />
      <g className="anim-spin">
        <path d="M520 70 C520 56 528 50 536 52 M520 70 C532 77 533 87 527 92 M520 70 C508 77 498 74 495 67" fill="none" stroke={C.accent} strokeWidth="1.5" />
      </g>
      <text x="532" y="118" fontSize="9" fill={C.muted} style={TEXT}>B-01 BLOWER</text>

      {/* VFD */}
      <rect x="470" y="150" width="100" height="58" fill={C.surface} stroke={C.accent} />
      <text x="520" y="170" textAnchor="middle" fontSize="9" fill={C.muted} style={TEXT}>VFD · ATV340</text>
      <text x="520" y="193" textAnchor="middle" fontSize="14" fill={C.fg} style={TEXT}>38.2 Hz</text>
      <line x1="520" y1="150" x2="520" y2="96" stroke={PIPE} strokeWidth="2" />

      {/* Pump */}
      <path d="M100 300 V324" stroke={PIPE} strokeWidth="2" />
      <circle cx="100" cy="338" r="14" fill={C.bg} stroke={C.fg} strokeOpacity="0.7" />
      <path d="M93 330 L111 338 L93 346" fill="none" stroke={C.fgA(50)} />
      <path d="M114 338 H170" stroke={PIPE} strokeWidth="2" />
      <text x="100" y="372" textAnchor="middle" fontSize="8" fill={C.dim} style={TEXT}>P-01</text>

      {/* PLC */}
      <rect x="200" y="240" width="200" height="62" fill={C.surface} stroke={C.fg} strokeOpacity="0.8" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={302 + i * 18} y="248" width="12" height="46" fill="none" stroke={C.fgA(18)} />
      ))}
      <text x="214" y="262" fontSize="10" fill={C.fg} style={TEXT}>PLC</text>
      <text x="214" y="278" fontSize="8.5" fill={C.muted} style={TEXT}>MODICON M241</text>
      <text x="214" y="293" fontSize="8" fill={C.dim} style={TEXT}>ANALOG I/O</text>

      {/* Industrial Ethernet */}
      <path d="M400 256 H520 V208" fill="none" stroke={SIGNAL} strokeDasharray="5 4" className="anim-dash" />
      <text x="410" y="250" fontSize="8.5" fill={C.accent} style={TEXT}>ETHERNET/IP</text>
      <path d="M400 288 H460 V310" fill="none" stroke={SIGNAL} strokeDasharray="5 4" className="anim-dash" />
      <text x="410" y="282" fontSize="8.5" fill={C.muted} style={TEXT}>MODBUS</text>

      {/* HMI */}
      <rect x="410" y="310" width="120" height="54" fill={C.surface} stroke={C.fg} strokeOpacity="0.8" />
      <rect x="420" y="318" width="66" height="38" fill="none" stroke={C.fgA(25)} />
      <polyline points="424,348 436,340 448,344 460,332 472,336 482,328" fill="none" stroke={C.accent} strokeWidth="1.2" />
      <text x="508" y="342" textAnchor="middle" fontSize="10" fill={C.fg} style={TEXT}>HMI</text>

      <text x="620" y="376" textAnchor="end" fontSize="8.5" fill={C.dim} style={TEXT}>SIGNAL ─ ─   PROCESS ━━</text>
    </svg>
  );
}
