import { Counter } from "@/components/ui/Counter";
import { revealDelay } from "@/components/ui/Primitives";
import { site } from "@/data/site";
import { pad } from "@/lib/utils";

type Stat =
  | { kind: "number"; value: number; from: number; label: string; note: string }
  | { kind: "text"; value: string; label: string; note: string };

// Real figures only. Category tiles are used wherever an exact number is not verified.
const stats: Stat[] = [
  { kind: "number", value: site.careerStartYear, from: 1990, label: "In industrial automation since", note: "Timeline" },
  { kind: "number", value: 12, from: 0, label: "RS485 rectifiers in one SCADA system", note: "Project 01" },
  { kind: "text", value: "SCADA", label: "Automation systems", note: "Supervision" },
  { kind: "text", value: "PLC", label: "Control systems", note: "Control" },
  { kind: "text", value: "EMS", label: "Energy monitoring", note: "Energy" },
  { kind: "text", value: "SQL", label: "Industrial data", note: "Data" },
];

export function Stats() {
  return (
    <section aria-label="Key facts" className="relative border-t border-line">
      <div className="container-x py-16 md:py-20">
        <p
          className="display max-w-[22ch] text-[clamp(1.6rem,3.4vw,2.9rem)] text-muted"
          data-reveal=""
        >
          I build systems that make <span className="text-fg">industry smarter.</span>
        </p>
      </div>
      <dl className="container-x grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="group relative flex flex-col justify-between gap-10 border-t border-line py-8 pr-4 md:py-10 xl:border-l xl:pl-6 xl:first:border-l-0 xl:first:pl-0"
            data-reveal=""
            style={revealDelay(index, 60)}
          >
            <span className="label flex items-center gap-2">
              <span className="text-accent">SYS/{pad(index + 1)}</span>
              {stat.note}
            </span>
            <div className="flex flex-col-reverse">
              <dt className="mt-3 max-w-[20ch] text-sm leading-snug text-muted">{stat.label}</dt>
              <dd className="text-[clamp(2.5rem,3.5vw,3.5rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums text-fg">
                {stat.kind === "number" ? <Counter value={stat.value} from={stat.from} /> : stat.value}
              </dd>
            </div>
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-10 bg-accent transition-[width] duration-700 group-hover:w-full xl:left-6 xl:group-first:left-0"
            />
          </div>
        ))}
      </dl>
    </section>
  );
}
