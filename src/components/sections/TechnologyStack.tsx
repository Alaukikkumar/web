import { SectionHeading, revealDelay } from "@/components/ui/Primitives";
import { stackGroups } from "@/data/stack";
import { pad } from "@/lib/utils";

/** Technology stack drawn as terminal blocks mounted on DIN rails. */
export function TechnologyStack() {
  return (
    <section aria-labelledby="stack-title" className="relative border-t border-line py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <SectionHeading
          id="stack-title"
          index="03"
          kicker="Technology stack"
          system="Panel / X1–X6"
          title={
            <>
              The tools behind <span className="text-muted">the system.</span>
            </>
          }
          intro="Grouped the way a control panel is wired — each rail carries one job in the system."
        />

        <div className="mt-16 flex flex-col border-b border-line md:mt-20">
          {stackGroups.map((group, railIndex) => (
            <div
              key={group.id}
              className="grid gap-6 border-t border-line py-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10"
              data-reveal=""
              style={revealDelay(railIndex, 50)}
            >
              <div className="flex items-start justify-between gap-4 lg:flex-col lg:justify-start lg:gap-3">
                <div className="flex flex-col gap-2">
                  <span className="label text-accent">Rail X{railIndex + 1}</span>
                  <h3 className="text-xl font-semibold uppercase tracking-[-0.02em] text-fg">{group.label}</h3>
                </div>
                <p className="label max-w-[16ch] text-right lg:max-w-none lg:text-left">{group.role}</p>
              </div>

              <div className="relative">
                {/* DIN rail */}
                <span aria-hidden="true" className="absolute inset-x-0 top-1/2 hidden h-3 -translate-y-1/2 border-y border-line bg-surface lg:block" />
                <ul className="relative flex flex-wrap gap-2 lg:gap-0">
                  {group.items.map((item, i) => (
                    <li
                      key={item}
                      className="group/terminal relative flex min-w-[9.5rem] flex-col gap-3 border border-line bg-bg px-4 py-3 transition-[border-color,transform] duration-300 hover:z-10 hover:-translate-y-0.5 hover:border-accent lg:-ml-px lg:first:ml-0"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span
                          aria-hidden="true"
                          className="relative flex size-3.5 items-center justify-center rounded-full border border-line-strong transition-colors duration-300 group-hover/terminal:border-accent"
                        >
                          <span className="h-px w-2 rotate-45 bg-dim transition-colors duration-300 group-hover/terminal:bg-accent" />
                        </span>
                        <span className="label">
                          X{railIndex + 1}.{pad(i + 1)}
                        </span>
                      </span>
                      <span className="text-sm font-medium leading-snug text-fg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
