import { IndustrialIcon } from "@/components/diagrams/IndustrialIcon";
import { SectionHeading, revealDelay } from "@/components/ui/Primitives";
import { principles } from "@/data/principles";
import { pad } from "@/lib/utils";

export function EngineeringPrinciples() {
  return (
    <section aria-labelledby="principles-title" className="relative border-t border-line py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <SectionHeading
          id="principles-title"
          index="13"
          kicker="Engineering philosophy"
          system="Principles · 05"
          title={
            <>
              Automation should be reliable <span className="text-muted">before it is impressive.</span>
            </>
          }
          titleClassName="max-w-[20ch]"
        />

        <ol className="mt-16 border-b border-line md:mt-20">
          {principles.map((principle, index) => (
            <li
              key={principle.title}
              className="group relative grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-6 gap-y-3 border-t border-line py-8 md:grid-cols-[8rem_minmax(0,22rem)_minmax(0,1fr)_auto] md:items-center md:gap-x-10 md:py-10"
              data-reveal=""
              style={revealDelay(index, 70)}
            >
              <span aria-hidden="true" className="absolute left-0 top-[-1px] h-px w-0 bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              <span className="row-span-2 font-mono text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_var(--color-dim)] transition-colors duration-500 group-hover:[-webkit-text-stroke:1px_var(--color-accent)] md:row-span-1">
                {pad(index + 1)}
              </span>
              <h3 className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold uppercase leading-none tracking-[-0.03em] text-fg">
                {principle.title}
              </h3>
              <div className="flex flex-col gap-1 leading-relaxed text-muted md:text-lg">
                {principle.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <span className="hidden size-14 items-center justify-center border border-line text-muted transition-colors duration-500 group-hover:border-accent group-hover:text-accent md:flex">
                <IndustrialIcon name={principle.icon} size={26} strokeWidth={1.2} />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
