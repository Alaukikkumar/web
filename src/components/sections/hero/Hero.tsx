import { site } from "@/data/site";
import { DataLine } from "@/components/signature/DataLine";
import { ButtonLink, StatusIndicator } from "@/components/ui/Primitives";
import { HeroSystem } from "./HeroSystem";

const disciplines = ["Industrial Automation", "SCADA", "EMS", "PLC", "IIoT", "Data"];

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-28 md:pt-32 lg:pb-20 lg:pt-40">
      <div className="grid-bg grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-12 xl:gap-20">
          <div>
            <div className="anim-rise flex flex-col gap-2">
              <StatusIndicator className="text-fg">Automation engineer</StatusIndicator>
              <span className="label pl-[17px]">SCADA / PLC / EMS / Industrial data</span>
            </div>

            <h1
              id="hero-title"
              className="display mt-8 text-[clamp(2.85rem,7.2vw,7.25rem)] md:mt-10"
            >
              <span className="block">I connect</span>{" "}
              <span className="block">machines,</span>{" "}
              <span className="block">data and</span>{" "}
              <span className="block">
                people<span className="text-accent">.</span>
              </span>
            </h1>

            <p className="anim-rise mt-8 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:text-xs" style={{ animationDelay: "120ms" }}>
              {disciplines.map((item, i) => (
                <span key={item} className="flex items-center gap-3">
                  {i > 0 && <span className="text-accent" aria-hidden="true">•</span>}
                  {item}
                </span>
              ))}
            </p>

            <p className="anim-rise mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg" style={{ animationDelay: "180ms" }}>
              {site.longRole} specializing in SCADA, PLC, EMS, industrial communication, data logging and connected
              industrial systems.
            </p>

            <div className="anim-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
              <ButtonLink href="#projects">View my systems</ButtonLink>
              <ButtonLink href="#contact" variant="ghost">
                Start a conversation
              </ButtonLink>
            </div>
          </div>

          <div className="anim-rise" style={{ animationDelay: "160ms" }}>
            <HeroSystem />
          </div>
        </div>

        <div className="mt-16 hidden md:block lg:mt-24">
          <DataLine />
        </div>
      </div>
    </section>
  );
}
