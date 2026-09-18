import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { FlowDiagram } from "@/components/diagrams/FlowDiagram";
import { DataLine } from "@/components/signature/DataLine";
import { ButtonLink, StatusIndicator, revealDelay } from "@/components/ui/Primitives";
import { benefitCatalogue, getRelatedProjects, projects, type Project } from "@/data/projects";
import { pad } from "@/lib/utils";
import { AddedAndBenefits } from "./AddedAndBenefits";
import { ProjectVisual } from "./ProjectVisual";

function CaseSection({ index, title, children, id }: { index: number; title: string; children: ReactNode; id: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="grid gap-6 border-t border-line py-14 md:py-20 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
      <div className="lg:sticky lg:top-24 lg:self-start" data-reveal="">
        <p className="label text-accent">{pad(index)}</p>
        <h2 id={`${id}-title`} className="mt-3 text-2xl font-semibold uppercase leading-none tracking-[-0.03em] text-fg md:text-3xl">
          {title}
        </h2>
      </div>
      <div className="min-w-0" data-reveal="" style={revealDelay(1)}>
        {children}
      </div>
    </section>
  );
}

function DashList({ items, tone = "muted" }: { items: string[]; tone?: "muted" | "fg" }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className={`flex items-baseline gap-4 text-lg leading-relaxed ${tone === "fg" ? "text-fg" : "text-muted"}`}>
          <span aria-hidden="true" className="h-px w-4 flex-none translate-y-[-5px] bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const related = getRelatedProjects(project.slug);
  const position = projects.findIndex((p) => p.slug === project.slug);

  const sections = [
    { id: "problem", title: "The problem" },
    { id: "approach", title: "The approach" },
    { id: "architecture", title: "System architecture" },
    { id: "technologies", title: "Technologies" },
    { id: "control-logic", title: "Control logic" },
    { id: "data-flow", title: "Data flow" },
    { id: "scada", title: project.scadaLabel },
    { id: "reporting", title: "Reporting" },
    { id: "results", title: "Results" },
    { id: "challenges", title: "Lessons / engineering challenges" },
  ];

  return (
    <article aria-labelledby="project-title">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-line pb-16 pt-28 md:pt-36">
        <div className="grid-bg grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <nav aria-label="Breadcrumb" className="anim-rise">
            <ol className="flex flex-wrap items-center gap-3">
              <li>
                <Link href="/" className="label flex items-center gap-2 text-muted transition-colors hover:text-fg">
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                  Home
                </Link>
              </li>
              <li className="label" aria-hidden="true">
                /
              </li>
              <li>
                <Link href="/case-studies/" className="label flex text-muted transition-colors hover:text-fg">
                  Case studies
                </Link>
              </li>
              <li className="label" aria-hidden="true">
                /
              </li>
              <li className="label text-fg" aria-current="page">
                {project.index} of {pad(projects.length)}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
            <div className="anim-rise" style={{ animationDelay: "80ms" }}>
              <StatusIndicator>{project.status}</StatusIndicator>
              <h1 id="project-title" className="display mt-6 text-[clamp(2.3rem,4.4vw,4.5rem)] [overflow-wrap:anywhere]">
                {project.title}
              </h1>
              <p className="mt-5 font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-muted">{project.category}</p>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg/90">{project.summary}</p>
              <ul className="mt-8 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <li key={tech} className="chip text-fg">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div className="anim-rise" style={{ animationDelay: "160ms" }}>
              <ProjectVisual project={project} />
            </div>
          </div>
        </div>
      </header>

      <div className="container-x">
        {/* Contents */}
        <nav aria-label="Case study contents" className="border-b border-line py-6">
          <ol className="flex gap-x-6 gap-y-2 overflow-x-auto [scrollbar-width:none] lg:flex-wrap">
            <li className="flex-none">
              <a href="#at-a-glance" className="label flex gap-2 whitespace-nowrap text-muted transition-colors hover:text-fg">
                <span className="text-accent">00</span>
                At a glance
              </a>
            </li>
            {sections.map((section, i) => (
              <li key={section.id} className="flex-none">
                <a href={`#${section.id}`} className="label flex gap-2 whitespace-nowrap text-muted transition-colors hover:text-fg">
                  <span className="text-accent">{pad(i + 1)}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* At a glance — what was added and who benefits */}
        <section id="at-a-glance" aria-labelledby="at-a-glance-title" className="py-14 md:py-20">
          <div className="mb-6 flex items-center gap-4" data-reveal="">
            <h2 id="at-a-glance-title" className="label text-fg">
              At a glance
            </h2>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
            <Link href="/case-studies/" className="label text-muted transition-colors hover:text-fg">
              Compare all case studies →
            </Link>
          </div>
          <div data-reveal="">
            <AddedAndBenefits project={project} />
          </div>
        </section>

        <CaseSection index={1} id="problem" title="The problem">
          <p className="max-w-3xl text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-snug tracking-[-0.01em] text-fg">
            {project.problem}
          </p>
          <div className="mt-10">
            <DashList items={project.problemPoints} />
          </div>
        </CaseSection>

        <CaseSection index={2} id="approach" title="The approach">
          <p className="max-w-3xl text-xl leading-relaxed text-fg">{project.solution}</p>
          <ol className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
            {project.approach.map((step, i) => (
              <li key={step} className="flex gap-4 bg-bg p-5">
                <span className="label pt-1 text-accent">{pad(i + 1)}</span>
                <span className="leading-relaxed text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </CaseSection>

        <CaseSection index={3} id="architecture" title="System architecture">
          <FlowDiagram
            stages={project.architecture}
            horizontalFrom={project.architecture.length > 5 ? "xl" : "lg"}
            label={`${project.shortTitle} architecture`}
          />
        </CaseSection>

        <CaseSection index={4} id="technologies" title="Technologies">
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
            {project.technologies.map((tech, i) => (
              <li key={tech} className="flex items-center justify-between gap-4 bg-bg px-5 py-4">
                <span className="text-fg">{tech}</span>
                <span className="label">T{pad(i + 1)}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection index={5} id="control-logic" title="Control logic">
          <DashList items={project.controlLogic} tone="fg" />
        </CaseSection>

        <CaseSection index={6} id="data-flow" title="Data flow">
          <ol className="flex flex-col border border-line">
            {project.dataFlow.map((flow, i) => {
              const [from, ...rest] = flow.split("→");
              return (
                <li key={flow} className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-4 border-b border-line px-5 py-4 last:border-b-0 md:grid-cols-[3rem_minmax(0,1fr)_2rem_minmax(0,1fr)]">
                  <span className="label text-accent">{pad(i + 1)}</span>
                  <span className="text-fg">{from.trim()}</span>
                  {rest.length > 0 && (
                    <>
                      <span className="col-start-2 font-mono text-accent md:col-start-auto" aria-hidden="true">
                        →
                      </span>
                      <span className="col-start-2 text-muted md:col-start-auto">
                        <span className="sr-only">to </span>
                        {rest.join("→").trim()}
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </CaseSection>

        <CaseSection index={7} id="scada" title={project.scadaLabel}>
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {project.scadaFeatures.map((feature, i) => (
              <li key={feature} className="flex min-h-28 flex-col justify-between gap-4 bg-bg p-5">
                <span className="label">F{pad(i + 1)}</span>
                <span className="font-medium uppercase tracking-[-0.01em] text-fg">{feature}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection index={8} id="reporting" title="Reporting">
          <DashList items={project.reporting} />
        </CaseSection>

        <CaseSection index={9} id="results" title="Results">
          <ul className="grid gap-3">
            {project.results.map((result) => (
              <li key={result} className="flex items-start gap-4 border border-line bg-surface/50 px-5 py-4 text-lg text-fg">
                <Check className="mt-1 size-5 flex-none text-accent" aria-hidden="true" />
                {result}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="label mb-3">Benefits delivered</p>
            <ul className="flex flex-wrap gap-1.5">
              {project.benefitKeys.map((key) => (
                <li key={key} className="chip border-accent/40 text-fg">
                  {benefitCatalogue[key].label}
                </li>
              ))}
            </ul>
          </div>
          <p className="label mt-5 normal-case tracking-[0.04em]">
            Outcomes are described qualitatively. No performance figures are claimed.
          </p>
        </CaseSection>

        <CaseSection index={10} id="challenges" title="Lessons / engineering challenges">
          <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
            {project.challenges.map((challenge, i) => (
              <li key={challenge.title} className="flex flex-col gap-3 bg-bg p-6">
                <span className="label text-accent">Challenge {pad(i + 1)}</span>
                <h3 className="text-xl font-semibold uppercase leading-tight tracking-[-0.02em] text-fg">{challenge.title}</h3>
                <p className="leading-relaxed text-muted">{challenge.detail}</p>
              </li>
            ))}
          </ul>
        </CaseSection>

        {/* Gallery */}
        <section aria-labelledby="gallery-title" className="border-t border-line py-14 md:py-20">
          <div className="mb-8 flex items-center gap-4">
            <h2 id="gallery-title" className="label text-fg">
              Gallery
            </h2>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
          {project.gallery.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-2">
              {project.gallery.map((image) => (
                <li key={image.src}>
                  <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element -- static export serves pre-optimized images */}
                    <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="h-auto w-full border border-line" />
                    {image.caption && <figcaption className="label mt-3">{image.caption}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
          ) : (
            <p className="max-w-2xl leading-relaxed text-muted">
              Client screens and plant data are not published here. The visuals on this page are demo and concept views
              built for this portfolio and are labelled as such.
            </p>
          )}
        </section>

        {/* Related */}
        <section aria-labelledby="related-title" className="border-t border-line py-14 md:py-20">
          <div className="mb-8 flex items-center gap-4">
            <h2 id="related-title" className="label text-fg">
              Related projects
            </h2>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
          <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug} className="group relative flex flex-col gap-6 bg-bg p-6 transition-colors duration-500 hover:bg-surface md:p-8">
                <div className="flex items-center justify-between">
                  <span className="label text-accent">Project {item.index}</span>
                  <ArrowUpRight className="size-5 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold uppercase leading-none tracking-[-0.03em] text-fg">
                  <Link href={`/projects/${item.slug}/`} className="after:absolute after:inset-0 after:content-['']">
                    {item.title}
                  </Link>
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{item.category}</p>
              </li>
            ))}
          </ul>
          {position >= 0 && (
            <p className="label mt-6">
              {position + 1} of {projects.length} case studies
            </p>
          )}
        </section>
      </div>

      {/* Contact CTA */}
      <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line py-20 md:py-28">
        <div className="grid-bg grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <DataLine className="mb-14" />
          <h2 id="cta-title" className="display max-w-[18ch] text-[clamp(2.2rem,5.5vw,5rem)]">
            Have a similar process? <span className="text-muted">Let&apos;s talk.</span>
          </h2>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#contact">Start a conversation</ButtonLink>
            <ButtonLink href="/#projects" variant="ghost">
              View all systems
            </ButtonLink>
          </div>
        </div>
      </section>
    </article>
  );
}
