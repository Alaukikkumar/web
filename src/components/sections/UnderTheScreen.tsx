"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { SectionHeading } from "@/components/ui/Primitives";
import { engineeringStages } from "@/data/engineering";
import { cn, pad } from "@/lib/utils";

const COMMENT = /^\s*(\/\/|\(\*|--|!)/;
const KEYWORD = /^(\s*)(IF|ELSIF|ELSE|END_IF|CASE|END_CASE|FUNCTION|END|RETURN|SELECT|FROM|JOIN|LEFT JOIN|WHERE|GROUP BY|TX|RX|NORMAL|ACTIVE|CLEARED)\b/;

function CodeLine({ line }: { line: string }) {
  if (COMMENT.test(line)) return <span className="text-dim">{line}</span>;
  const match = line.match(KEYWORD);
  if (match) {
    const [, indent, keyword] = match;
    return (
      <>
        {indent}
        <span className="text-accent">{keyword}</span>
        {line.slice(indent.length + keyword.length)}
      </>
    );
  }
  return <>{line}</>;
}

export function UnderTheScreen() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const stage = engineeringStages[active];

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = engineeringStages.length - 1;
    let next = index;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
    tabs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <section aria-labelledby="under-title" className="relative border-t border-line py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <SectionHeading
          id="under-title"
          index="08"
          kicker="Engineering detail"
          system="Behind the HMI"
          title={
            <>
              Under the screen, <span className="text-muted">there is a system.</span>
            </>
          }
          intro="A clean screen is the last step. These are the layers of engineering that make the values on it true."
        />

        <div className="mt-16 md:mt-20" data-reveal="">
          <div
            role="tablist"
            aria-label="Engineering stages"
            className="-mx-5 flex overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0"
          >
            {engineeringStages.map((item, index) => {
              const selected = index === active;
              return (
                <div key={item.id} className="flex flex-none items-center lg:flex-1">
                  <button
                    ref={(node) => {
                      tabs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`eng-tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls="eng-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    className={cn(
                      "flex w-full flex-col items-start gap-1.5 border px-3.5 py-3 text-left transition-colors duration-300",
                      selected ? "border-accent bg-surface" : "border-line hover:border-line-strong",
                    )}
                  >
                    <span className={cn("label", selected && "text-accent")}>{pad(index + 1)}</span>
                    <span className={cn("whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em]", selected ? "text-fg" : "text-muted")}>
                      {item.label}
                    </span>
                  </button>
                  {index < engineeringStages.length - 1 && (
                    <span aria-hidden="true" className={cn("mx-1 h-px w-4 flex-none", index < active ? "bg-accent" : "bg-line-strong")} />
                  )}
                </div>
              );
            })}
          </div>

          <div
            id="eng-panel"
            role="tabpanel"
            aria-labelledby={`eng-tab-${stage.id}`}
            className="mt-6 grid gap-px border border-line bg-line lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          >
            <div key={`copy-${stage.id}`} className="anim-rise flex flex-col bg-bg p-6 sm:p-8">
              <p className="label text-accent">Stage {pad(active + 1)} / {pad(engineeringStages.length)}</p>
              <h3 className="mt-5 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold uppercase leading-[1] tracking-[-0.03em]">
                {stage.heading}
              </h3>
              <p className="mt-5 leading-relaxed text-muted">{stage.body}</p>
              <ul className="mt-8 flex flex-wrap gap-1.5 border-t border-line pt-6">
                {stage.concepts.map((concept) => (
                  <li key={concept} className="chip text-fg">
                    {concept}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex min-w-0 flex-col bg-surface">
              <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
                <span className="label text-muted">{stage.language}</span>
                <span className="label">Illustrative · simplified</span>
              </div>
              <pre key={`code-${stage.id}`} className="code-block anim-rise overflow-x-auto p-5 sm:p-6">
                <code>
                  {stage.code.split("\n").map((line, i) => (
                    <span key={i} className="block min-h-[1.7em]">
                      <span className="mr-5 inline-block w-5 select-none text-right text-dim/60" aria-hidden="true">
                        {i + 1}
                      </span>
                      <CodeLine line={line} />
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
