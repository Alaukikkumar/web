import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { StatusIndicator } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectPanel({ project, reverse = false }: { project: Project; reverse?: boolean }) {
  const titleId = `project-${project.slug}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className="group relative grid gap-10 border border-line bg-surface/40 p-5 transition-colors duration-500 hover:border-line-strong sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10"
    >
      <div className={cn("flex flex-col lg:col-span-5", reverse && "lg:order-2")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="label text-accent">Project {project.index}</span>
          <StatusIndicator>{project.status}</StatusIndicator>
        </div>

        <h3 id={titleId} className="display mt-8 text-[clamp(2rem,3.4vw,3.2rem)] leading-[0.95]">
          {project.title}
        </h3>
        <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-muted">{project.category}</p>

        <dl className="mt-8 grid gap-6 border-t border-line pt-8 text-sm leading-relaxed">
          <div>
            <dt className="label mb-2">Problem</dt>
            <dd className="text-muted">{project.problem}</dd>
          </div>
          <div>
            <dt className="label mb-2">Solution</dt>
            <dd className="text-fg/90">{project.solution}</dd>
          </div>
        </dl>

        <p className="mt-6 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.08em] text-dim">
          {project.architecture.map((stage) => stage.nodes.join(" + ")).join("  →  ")}
        </p>

        <div className="mt-8">
          <p className="label mb-3">{project.capabilitiesLabel}</p>
          <ul className="flex flex-wrap gap-1.5">
            {project.capabilities.map((capability) => (
              <li key={capability} className="chip">
                {capability}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-1 items-end">
          <Link
            href={`/projects/${project.slug}/`}
            className="btn btn-ghost after:absolute after:inset-0 after:content-[''] group-hover:border-fg"
          >
            Open case study
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className={cn("lg:col-span-7 lg:self-center", reverse && "lg:order-1")}>
        <ProjectVisual project={project} />
      </div>
    </article>
  );
}
