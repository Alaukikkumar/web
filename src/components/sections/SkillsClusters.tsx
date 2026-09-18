import { skillClusters } from "@/data/skills";
import { revealDelay } from "@/components/ui/Primitives";

const W = 300;
const H = 220;
const CX = W / 2;
const CY = H / 2;

function ClusterDiagram({ name, nodes }: { name: string; nodes: string[] }) {
  const placed = nodes.map((label, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / nodes.length + (nodes.length % 2 === 0 ? Math.PI / 4 : 0);
    return { label, x: CX + Math.cos(angle) * 96, y: CY + Math.sin(angle) * 70 };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`${name}: ${nodes.join(", ")}`}>
      {placed.map((node) => (
        <line
          key={`l-${node.label}`}
          x1={CX}
          y1={CY}
          x2={node.x}
          y2={node.y}
          style={{ stroke: "var(--color-line-strong)" }}
          strokeDasharray="3 4"
          className="transition-[stroke] duration-500 group-hover:[stroke:var(--color-accent)]!"
        />
      ))}
      <circle cx={CX} cy={CY} r="46" fill="none" style={{ stroke: "var(--color-line)" }} />
      <rect x={CX - 52} y={CY - 15} width="104" height="30" style={{ fill: "var(--color-bg)", stroke: "var(--color-accent)" }} />
      <text x={CX} y={CY + 4.5} textAnchor="middle" fontSize="12" style={{ fill: "var(--color-fg)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>
        {name.toUpperCase()}
      </text>
      {placed.map((node) => {
        const width = node.label.length * 7 + 16;
        return (
          <g key={node.label}>
            <rect x={node.x - width / 2} y={node.y - 11} width={width} height="22" style={{ fill: "var(--color-surface)", stroke: "var(--color-line-strong)" }} />
            <text x={node.x} y={node.y + 3.8} textAnchor="middle" fontSize="11" style={{ fill: "var(--color-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Technical skill clusters — relationships, not percentages. */
export function SkillsClusters() {
  return (
    <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
      {skillClusters.map((cluster, index) => (
        <li key={cluster.name} className="group bg-bg p-5 transition-colors duration-500 hover:bg-surface" data-reveal="" style={revealDelay(index, 70)}>
          <p className="label mb-2">
            <span className="text-accent">CL/{String(index + 1).padStart(2, "0")}</span> · {cluster.name}
          </p>
          <ClusterDiagram name={cluster.name} nodes={cluster.nodes} />
        </li>
      ))}
      <li className="flex flex-col justify-end gap-3 bg-bg p-6" data-reveal="" style={revealDelay(skillClusters.length, 70)}>
        <p className="label">Reading this map</p>
        <p className="text-lg leading-snug text-fg">Skills are shown as connected clusters — how they work together in a system.</p>
        <p className="text-sm leading-relaxed text-muted">No percentage bars. Capability is shown through the projects and architecture above.</p>
      </li>
    </ul>
  );
}
