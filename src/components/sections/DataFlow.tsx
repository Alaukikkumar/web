import type { CSSProperties } from "react";
import { IndustrialIcon } from "@/components/diagrams/IndustrialIcon";
import { SectionHeading } from "@/components/ui/Primitives";
import { packetFlow } from "@/data/systems";

const CYCLE = 7;

/** A single value travelling Sensor → PLC → SCADA → SQL → Dashboard → Telegram. CSS-only animation. */
export function DataFlow() {
  const last = packetFlow.length - 1;

  return (
    <section aria-labelledby="flow-title" className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="flow-title"
          index="10"
          kicker="Automation flow"
          system="Packet trace"
          title={
            <>
              Follow one value <span className="text-muted">through the system.</span>
            </>
          }
          titleClassName="max-w-[22ch] text-[clamp(2rem,4.8vw,4.5rem)]"
        />

        <div className="relative mt-14 md:mt-20" data-live="" data-reveal="">
          <p className="sr-only">
            Data path: {packetFlow.map((node) => `${node.label} (${node.state})`).join(", then ")}.
          </p>

          <div aria-hidden="true" className="relative">
            {/* Track — vertical on mobile, horizontal from md */}
            <div className="absolute bottom-7 left-[27.5px] top-7 w-px bg-line-strong md:bottom-auto md:left-[calc(100%/12)] md:right-[calc(100%/12)] md:top-[46px] md:h-px md:w-auto">
              <span className="packet-track-y md:hidden" style={{ "--dur": `${CYCLE}s` } as CSSProperties}>
                <span className="packet size-2.5! -ml-[5px]! -mt-[5px]!" />
              </span>
              <span className="packet-track-x hidden md:block" style={{ "--dur": `${CYCLE}s` } as CSSProperties}>
                <span className="packet size-2.5! -ml-[5px]! -mt-[5px]!" />
              </span>
            </div>

            <ol className="grid grid-rows-6 gap-4 md:grid-cols-6 md:grid-rows-none md:gap-3">
              {packetFlow.map((node, index) => {
                const delay = `${(index / last) * CYCLE}s`;
                return (
                  <li key={node.label} className="flex items-center gap-5 md:flex-col md:gap-4 md:text-center">
                    <span
                      className="relative z-10 flex size-14 flex-none items-center justify-center border border-line bg-bg text-fg md:size-[92px]"
                      style={{ animation: `row-hit ${CYCLE}s linear ${delay} infinite` }}
                    >
                      <IndustrialIcon name={node.icon} size={24} className="md:hidden" />
                      <IndustrialIcon name={node.icon} size={36} strokeWidth={1.1} className="hidden md:block" />
                    </span>
                    <span className="flex flex-col gap-1.5 md:items-center">
                      <span className="label">[{node.label}]</span>
                      <span
                        className="font-mono text-base uppercase tracking-[0.04em] text-fg md:text-lg"
                        style={{ animation: `text-hit ${CYCLE}s linear ${delay} infinite` }}
                      >
                        {node.state}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
