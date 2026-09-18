import type { CSSProperties } from "react";
import { IndustrialIcon } from "@/components/diagrams/IndustrialIcon";
import { SectionHeading, revealDelay } from "@/components/ui/Primitives";
import { automationChain } from "@/data/systems";
import { pad } from "@/lib/utils";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative border-t border-line py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
          <SectionHeading
            id="about-title"
            index="01"
            kicker="About"
            system="System / 01 · Full stack"
            title={
              <>
                From field devices to <span className="text-muted">industrial intelligence.</span>
              </>
            }
          />
          <div className="flex flex-col gap-6 text-base leading-relaxed text-muted md:text-lg" data-reveal="" style={revealDelay(2)}>
            <p className="text-fg">
              Industrial automation is not only PLC programming. It is the complete path a signal travels — until a
              person can act on it.
            </p>
            <p>
              I work across the complete industrial automation stack — from field-level signals and PLC logic to SCADA
              visualization, industrial communication, SQL data logging, reports and notification systems.
            </p>
            <p>
              I design and develop industrial automation systems that connect machines, PLCs, SCADA, energy data and
              business intelligence into reliable, measurable and maintainable systems.
            </p>
          </div>
        </div>

        <div className="mt-20 md:mt-24" data-live="">
          <div className="mb-4 flex items-center justify-between gap-4" aria-hidden="true">
            <span className="label">Field level</span>
            <span className="h-px flex-1 bg-line" />
            <span className="label">Decision level</span>
          </div>
          <ol
            aria-label="The industrial automation stack"
            className="grid gap-px border border-line bg-line md:grid-cols-4 xl:grid-cols-8"
          >
            {automationChain.map((step, index) => (
              <li
                key={step.label}
                className="group relative flex items-center gap-4 bg-bg p-5 transition-colors duration-500 hover:bg-surface md:flex-col md:items-start md:gap-6 md:p-6"
                data-reveal=""
                style={revealDelay(index, 80)}
              >
                {/* signal segment */}
                <span aria-hidden="true" className="absolute inset-y-0 left-[41.5px] w-px bg-line-strong md:inset-x-0 md:top-[83px] md:bottom-auto md:h-px md:w-auto">
                  <span
                    className="packet-track-y md:hidden"
                    style={{ "--dur": "1.8s", "--delay": `${index * 0.18}s` } as CSSProperties}
                  >
                    <span className="packet" />
                  </span>
                  <span
                    className="packet-track-x hidden md:block"
                    style={{ "--dur": "1.8s", "--delay": `${index * 0.18}s` } as CSSProperties}
                  >
                    <span className="packet" />
                  </span>
                </span>

                <span className="label absolute right-4 top-4 md:static md:order-first">{pad(index + 1)}</span>
                <span className="relative z-10 flex size-11 flex-none items-center justify-center border border-line-strong bg-bg text-fg transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
                  <IndustrialIcon name={step.icon} size={22} />
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-base font-semibold uppercase tracking-[-0.01em] text-fg">{step.label}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-dim">{step.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
