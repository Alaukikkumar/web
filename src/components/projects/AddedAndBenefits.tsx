import { Check, Plus } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** "What was added" + "Who benefits" — shared by the case-studies index and each case study. */
export function AddedAndBenefits({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("grid gap-px border border-line bg-line lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]", className)}>
      <div className="bg-bg p-5 sm:p-6">
        <p className="label mb-4 text-accent">What was added</p>
        <ul className="grid gap-2.5">
          {project.added.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-fg">
              <Plus className="mt-0.5 size-4 flex-none text-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-bg p-5 sm:p-6">
        <p className="label mb-4 text-accent">Who benefits</p>
        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {project.benefitGroups.map((group) => (
            <div key={group.audience}>
              <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{group.audience}</p>
              <ul className="grid gap-2">
                {group.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-fg/90">
                    <Check className="mt-0.5 size-4 flex-none text-accent" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
