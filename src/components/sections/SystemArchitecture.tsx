"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { IndustrialIcon } from "@/components/diagrams/IndustrialIcon";
import { SectionHeading } from "@/components/ui/Primitives";
import { architectureLayers } from "@/data/systems";
import { cn, pad } from "@/lib/utils";

export function SystemArchitecture() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const layer = architectureLayers[active];

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = architectureLayers.length - 1;
    const map: Record<string, number> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowRight: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in map)) return;
    event.preventDefault();
    setActive(map[event.key]);
    tabs.current[map[event.key]]?.focus();
  };

  return (
    <section id="systems" aria-labelledby="systems-title" className="relative border-t border-line py-24 md:py-32 lg:py-36">
      <div className="grid-bg grid-fade pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          id="systems-title"
          index="06"
          kicker="System architecture"
          system="Layers 01–06"
          title={
            <>
              How I connect <span className="text-muted">the industrial world.</span>
            </>
          }
          intro="Six layers, one system. Select a layer to see what it does and what has to be engineered for it to be reliable."
        />

        <div className="mt-16 grid gap-10 md:mt-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
          <div role="tablist" aria-orientation="vertical" aria-label="Architecture layers" data-live="">
            {architectureLayers.map((item, index) => {
              const selected = index === active;
              return (
                <div key={item.id}>
                  <button
                    ref={(node) => {
                      tabs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`layer-tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls="layer-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    className={cn(
                      "group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border px-4 py-4 text-left transition-colors duration-300 sm:gap-6 sm:px-5",
                      selected ? "border-accent bg-surface" : "border-line bg-bg/60 hover:border-line-strong",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center border transition-colors duration-300",
                        selected ? "border-accent text-accent" : "border-line-strong text-muted",
                      )}
                    >
                      <IndustrialIcon name={item.icon} size={22} />
                    </span>
                    <span className="flex min-w-0 flex-col gap-2">
                      <span className="flex items-baseline gap-3">
                        <span className={cn("label", selected && "text-accent")}>Layer {pad(index + 1)}</span>
                        <span className="text-lg font-semibold uppercase tracking-[-0.02em] text-fg sm:text-xl">{item.name}</span>
                      </span>
                      <span className="hidden flex-wrap gap-1.5 sm:flex">
                        {item.items.map((component) => (
                          <span
                            key={component}
                            className={cn(
                              "border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors duration-300",
                              selected ? "border-accent/40 text-fg" : "border-line text-dim",
                            )}
                          >
                            {component}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn("size-2 transition-colors duration-300", selected ? "bg-accent" : "bg-line-strong")}
                    />
                  </button>

                  {index < architectureLayers.length - 1 && (
                    <div aria-hidden="true" className="relative ml-[38.5px] h-7 w-px bg-line-strong sm:ml-[42.5px]">
                      <span className="packet-track-y" style={{ "--dur": "1.4s", "--delay": `${index * 0.23}s` } as CSSProperties}>
                        <span className="packet" />
                      </span>
                      <span className="absolute -bottom-px left-1/2 size-1.5 -translate-x-1/2 rotate-45 border-b border-r border-line-strong" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div
              id="layer-panel"
              role="tabpanel"
              aria-labelledby={`layer-tab-${layer.id}`}
              className="panel corner-marks relative overflow-hidden p-6 sm:p-8"
            >
              <div key={layer.id} className="anim-rise">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="label text-accent">Layer {pad(active + 1)} / 06</p>
                    <h3 className="display mt-4 text-[clamp(2.5rem,5vw,4rem)]">{layer.name}</h3>
                  </div>
                  <IndustrialIcon name={layer.icon} size={64} strokeWidth={0.9} className="flex-none text-line-strong" />
                </div>

                <p className="mt-6 text-lg leading-relaxed text-fg">{layer.purpose}</p>

                <div className="mt-8 border-t border-line pt-6">
                  <p className="label mb-3">Components</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {layer.items.map((component) => (
                      <li key={component} className="chip text-fg">
                        {component}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-line pt-6">
                  <p className="label mb-3">What has to be engineered</p>
                  <ul className="grid gap-2.5">
                    {layer.engineering.map((point) => (
                      <li key={point} className="flex items-baseline gap-3 text-muted">
                        <span className="h-px w-3 flex-none translate-y-[-4px] bg-accent" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex gap-1.5" aria-hidden="true">
                {architectureLayers.map((item, index) => (
                  <span key={item.id} className={cn("h-1 flex-1 transition-colors duration-300", index <= active ? "bg-accent" : "bg-line")} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
