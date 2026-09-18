import Link from "next/link";
import { benefitCatalogue, projects, type BenefitKey } from "@/data/projects";
import { cn } from "@/lib/utils";

const keys = Object.keys(benefitCatalogue) as BenefitKey[];

/** Benefit × project matrix. Scrolls horizontally on small screens. */
export function BenefitsMatrix() {
  return (
    <div className="relative overflow-x-auto border border-line" data-reveal="">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <caption className="sr-only">Which benefits each case study delivers</caption>
        <thead>
          <tr className="border-b border-line bg-surface">
            <th scope="col" className="label w-[34%] px-5 py-4 font-normal text-muted">
              Benefit
            </th>
            {projects.map((project) => (
              <th key={project.slug} scope="col" className="px-3 py-4 text-center font-normal">
                <Link
                  href={`/projects/${project.slug}/`}
                  className="group inline-flex flex-col items-center gap-1.5"
                >
                  <span className="label text-accent">P{project.index}</span>
                  <span className="text-sm font-medium leading-tight text-fg underline-offset-4 group-hover:underline">
                    {project.shortTitle}
                  </span>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr key={key} className="border-b border-line last:border-b-0">
              <th scope="row" className="px-5 py-4 font-normal">
                <span className="block text-sm font-medium text-fg">{benefitCatalogue[key].label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-dim">{benefitCatalogue[key].detail}</span>
              </th>
              {projects.map((project) => {
                const has = project.benefitKeys.includes(key);
                return (
                  <td key={project.slug} className="px-3 py-4 text-center">
                    <span
                      className={cn("inline-block size-3", has ? "bg-accent" : "border border-line-strong")}
                      aria-hidden="true"
                    />
                    <span className="sr-only">{has ? "Yes" : "No"}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
