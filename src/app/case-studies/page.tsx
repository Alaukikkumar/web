import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { AddedAndBenefits } from "@/components/projects/AddedAndBenefits";
import { BenefitsMatrix } from "@/components/projects/BenefitsMatrix";
import { JsonLd } from "@/components/seo/JsonLd";
import { DataLine } from "@/components/signature/DataLine";
import { ButtonLink, StatusIndicator, revealDelay } from "@/components/ui/Primitives";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { breadcrumbNode, graph, ids } from "@/lib/seo";

const title = "Industrial Automation Case Studies — SCADA, EMS, PLC & Data";
const description =
  "Case studies by Alaukik Kumar: electroplating SCADA, industrial energy management (EMS), biogas PLC automation and industrial data pipelines — what was added and who benefits.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/case-studies/" },
  openGraph: { type: "website", url: "/case-studies/", title: `${title} | ${site.name}`, description },
  twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
};

const structuredData = graph(
  {
    "@type": "CollectionPage",
    "@id": `${site.url}/case-studies/#page`,
    name: title,
    description,
    url: `${site.url}/case-studies/`,
    isPartOf: { "@id": ids.website },
    author: { "@id": ids.person },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${site.url}/projects/${project.slug}/`,
        name: project.title,
      })),
    },
  },
  breadcrumbNode([
    { name: "Home", path: "/" },
    { name: "Case studies", path: "/case-studies/" },
  ]),
);

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <header className="relative overflow-hidden border-b border-line pb-16 pt-28 md:pb-20 md:pt-36">
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
              <li className="label text-fg" aria-current="page">
                Case studies
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
            <div className="anim-rise" style={{ animationDelay: "80ms" }}>
              <StatusIndicator>{projects.length} case studies</StatusIndicator>
              <h1 className="display mt-6 text-[clamp(2.6rem,6.4vw,6.25rem)]">
                What I added<span className="text-muted"> — and what it changed.</span>
              </h1>
            </div>
            <p className="anim-rise max-w-lg text-lg leading-relaxed text-muted" style={{ animationDelay: "160ms" }}>
              Each case study lists the capabilities that were added to the plant or process, and who benefits from them —
              operators, maintenance and management. Outcomes are described qualitatively; no figures are claimed.
            </p>
          </div>

          <div className="mt-16 hidden sm:block">
            <DataLine nodes={["Problem", "Added", "Operators", "Maintenance", "Management"]} label="Case study path" />
          </div>
        </div>
      </header>

      <section aria-labelledby="matrix-title" className="border-b border-line py-20 md:py-28">
        <div className="container-x">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label text-accent">Benefits at a glance</p>
              <h2 id="matrix-title" className="display mt-4 text-[clamp(2rem,4.4vw,3.75rem)]">
                One table, <span className="text-muted">four systems.</span>
              </h2>
            </div>
            <p className="max-w-md text-muted">
              Filled squares show the benefits each system was built to deliver. Select a project to read its full case
              study.
            </p>
          </div>
          <BenefitsMatrix />
        </div>
      </section>

      <section aria-label="Case studies" className="py-20 md:py-28">
        <div className="container-x flex flex-col gap-8 md:gap-10">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              aria-labelledby={`cs-${project.slug}`}
              className="border border-line bg-surface/40 p-5 sm:p-8 lg:p-10"
              data-reveal=""
              style={revealDelay(index % 2, 80)}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="label text-accent">Case study {project.index}</span>
                <StatusIndicator>{project.status}</StatusIndicator>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
                <div>
                  <h2 id={`cs-${project.slug}`} className="display text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[0.95]">
                    <Link href={`/projects/${project.slug}/`} className="transition-colors hover:text-accent">
                      {project.title}
                    </Link>
                  </h2>
                  <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-muted">
                    {project.category}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="leading-relaxed text-muted">
                    <span className="label mr-2 text-dim">Problem</span>
                    {project.problem}
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <AddedAndBenefits project={project} className="mt-8" />

              <div className="mt-8 flex justify-end">
                <ButtonLink href={`/projects/${project.slug}/`} variant="ghost" arrow={false}>
                  Read the full case study
                  <span className="sr-only">: {project.title}</span>
                  <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="cs-cta" className="relative overflow-hidden border-t border-line py-20 md:py-28">
        <div className="grid-bg grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <h2 id="cs-cta" className="display max-w-[18ch] text-[clamp(2.2rem,5.5vw,5rem)]">
            Have a process like these? <span className="text-muted">Let&apos;s talk.</span>
          </h2>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#contact">Start a conversation</ButtonLink>
            <ButtonLink href="/#projects" variant="ghost">
              Back to systems
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
