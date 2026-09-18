import type { Project } from "@/data/projects";
import { ScadaFrame } from "./ScadaFrame";
import { BiogasVisual } from "./visuals/BiogasVisual";
import { DataPipelineVisual } from "./visuals/DataPipelineVisual";
import { ElectroplatingVisual } from "./visuals/ElectroplatingVisual";
import { EmsVisual } from "./visuals/EmsVisual";

const frames = {
  electroplating: { screen: "HMI / Plating line — overview", badge: "Demo system", Visual: ElectroplatingVisual },
  ems: { screen: "EMS / Single-line diagram", badge: "Demo system", Visual: EmsVisual },
  biogas: { screen: "P&ID / Biogas blower loop", badge: "Concept visual", Visual: BiogasVisual },
  data: { screen: "SQL / Process data stream", badge: "Demo system", Visual: DataPipelineVisual },
} as const;

/**
 * Project preview. Uses the first real screenshot from `project.gallery` when one exists,
 * otherwise an animated, clearly-labelled technical placeholder.
 */
export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const frame = frames[project.visual];
  const cover = project.gallery[0];

  if (cover) {
    return (
      <figure className={className}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export serves pre-optimized images */}
        <img src={cover.src} alt={cover.alt} loading="lazy" decoding="async" className="h-auto w-full border border-line" />
        {cover.caption && <figcaption className="label mt-3">{cover.caption}</figcaption>}
      </figure>
    );
  }

  const { Visual } = frame;
  return (
    <div className={className} data-live="">
      <ScadaFrame screen={frame.screen} status={project.status} badge={frame.badge}>
        <Visual />
      </ScadaFrame>
    </div>
  );
}
