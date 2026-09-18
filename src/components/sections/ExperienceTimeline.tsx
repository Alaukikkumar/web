import { SectionHeading, StatusIndicator, revealDelay } from "@/components/ui/Primitives";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

export function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative border-t border-line py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <SectionHeading
          id="experience-title"
          index="12"
          kicker="Experience"
          system="Timeline · 2021 → Present"
          title={
            <>
              From training <span className="text-muted">to connected systems.</span>
            </>
          }
        />

        <ol className="relative mt-16 md:mt-20">
          <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-line md:left-[calc(14rem+7px)]" />
          {experience.map((entry, index) => (
            <li
              key={entry.organization}
              className="relative grid gap-4 pb-14 pl-10 last:pb-0 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-0 md:pl-0"
              data-reveal=""
              style={revealDelay(index, 100)}
            >
              <div className="md:pr-10 md:pt-1">
                <p className={cn("font-mono text-sm uppercase tracking-[0.08em] tabular-nums", entry.current ? "text-accent" : "text-muted")}>
                  {entry.period}
                </p>
              </div>

              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-1.5 flex size-[15px] items-center justify-center border bg-bg md:left-[14rem]",
                  entry.current ? "border-accent" : "border-line-strong",
                )}
              >
                <span className={cn("size-[5px]", entry.current ? "bg-accent" : "bg-line-strong")} />
              </span>

              <div className="md:pl-12">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <h3 className="text-[clamp(1.6rem,3vw,2.5rem)] font-semibold uppercase leading-none tracking-[-0.03em] text-fg">
                    {entry.organization}
                  </h3>
                  {entry.current && <StatusIndicator>Current</StatusIndicator>}
                </div>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">{entry.summary}</p>
                <div className="mt-6">
                  <p className="label mb-3">Focus</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {entry.focus.map((item) => (
                      <li key={item} className={cn("chip", entry.current && "text-fg")}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
