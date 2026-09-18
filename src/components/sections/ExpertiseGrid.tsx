import { IndustrialIcon } from "@/components/diagrams/IndustrialIcon";
import { SectionHeading, revealDelay } from "@/components/ui/Primitives";
import { expertise } from "@/data/expertise";
import { pad } from "@/lib/utils";

export function ExpertiseGrid() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="relative border-t border-line py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <SectionHeading
          id="expertise-title"
          index="02"
          kicker="What I do"
          system="System / 02 · Capabilities"
          title={
            <>
              I turn industrial processes into <span className="text-muted">connected systems.</span>
            </>
          }
          titleClassName="max-w-[20ch]"
        />

        <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 md:mt-20 xl:grid-cols-4">
          {expertise.map((area, index) => (
            <li
              key={area.title}
              className="group relative flex flex-col bg-bg p-6 transition-colors duration-500 hover:bg-surface md:p-7"
              data-reveal=""
              style={revealDelay(index % 4, 80)}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
              />
              <div className="flex items-center justify-between">
                <span className="label">
                  <span className="text-accent">System / {pad(index + 1)}</span>
                </span>
                <span className="label">{area.code}</span>
              </div>

              <span className="mt-10 flex size-14 items-center justify-center border border-line-strong text-fg transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
                <IndustrialIcon name={area.icon} size={28} strokeWidth={1.25} />
              </span>

              <h3 className="mt-8 text-2xl font-semibold uppercase leading-[1.05] tracking-[-0.03em] text-fg sm:min-h-[2.1em]">{area.title}</h3>
              {area.platform && <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{area.platform}</p>}

              <ul className="mt-7 flex flex-col gap-2 border-t border-line pt-6">
                {area.items.map((item) => (
                  <li key={item} className="flex items-baseline gap-3 text-sm text-muted">
                    <span aria-hidden="true" className="h-px w-2.5 flex-none translate-y-[-3px] bg-line-strong transition-colors duration-500 group-hover:bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
