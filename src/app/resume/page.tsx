import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ButtonLink, ExternalButton } from "@/components/ui/Primitives";
import { PrintButton } from "@/components/ui/PrintButton";
import { education, experience, resumeFacts } from "@/data/experience";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { stackGroups } from "@/data/stack";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, ${site.longRole} — SCADA, PLC, EMS, industrial communication and SQL data systems.`,
  alternates: { canonical: "/resume/" },
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 print:break-inside-avoid print:border-black/20 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10">
      <h2 className="label pt-1 text-accent print:text-black">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <div className="container-x pb-24 pt-28 md:pt-36 print:pt-0">
      <nav aria-label="Breadcrumb" className="no-print mb-10 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="label flex items-center gap-2 text-muted transition-colors hover:text-fg">
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to portfolio
        </Link>
        <div className="flex flex-wrap gap-3">
          <PrintButton />
          {site.resumeUrl && (
            <ExternalButton href={site.resumeUrl} download variant="primary">
              Download CV
            </ExternalButton>
          )}
        </div>
      </nav>

      <header className="pb-10">
        <p className="label text-accent print:text-black">Resume · Engineering experience</p>
        <h1 className="display mt-5 text-[clamp(2.75rem,7vw,6rem)] print:text-5xl print:text-black">{site.name}</h1>
        <p className="mt-4 text-xl text-fg print:text-black">{site.longRole}</p>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted print:text-black">
          I design and develop industrial automation systems that connect machines, PLCs, SCADA, energy data and business
          intelligence into reliable, measurable and maintainable systems.
        </p>
      </header>

      <Block title="Summary">
        <dl className="grid gap-3">
          {resumeFacts.map((fact) => (
            <div key={fact.label} className="grid gap-1 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
              <dt className="label pt-1 print:text-black">{fact.label}</dt>
              <dd className="text-fg print:text-black">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title="Experience">
        <ol className="grid gap-8">
          {experience.map((entry) => (
            <li key={entry.organization}>
              <p className="font-mono text-sm uppercase tracking-[0.08em] text-muted print:text-black">{entry.period}</p>
              <h3 className="mt-1 text-xl font-semibold uppercase tracking-[-0.02em] text-fg print:text-black">{entry.organization}</h3>
              <p className="mt-2 leading-relaxed text-muted print:text-black">{entry.summary}</p>
              <p className="mt-2 text-sm text-dim print:text-black">Focus: {entry.focus.join(" · ")}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Education">
        <p className="text-fg print:text-black">
          {education.degree} — {education.institution} — {education.year}
        </p>
      </Block>

      <Block title="Training">
        <p className="text-fg print:text-black">Industrial Automation / SCADA</p>
      </Block>

      <Block title="Technical stack">
        <dl className="grid gap-4">
          {stackGroups.map((group) => (
            <div key={group.id} className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
              <dt className="label pt-1 print:text-black">{group.label}</dt>
              <dd className="text-fg print:text-black">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title="Selected systems">
        <ul className="grid gap-5">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}/`} className="text-lg font-semibold uppercase tracking-[-0.01em] text-fg underline-offset-4 hover:underline print:text-black">
                {project.title}
              </Link>
              <p className="mt-1 text-sm text-muted print:text-black">{project.category}</p>
            </li>
          ))}
        </ul>
      </Block>

      <div className="no-print mt-6 border-t border-line pt-10">
        <ButtonLink href="/#contact">Start a conversation</ButtonLink>
      </div>
    </div>
  );
}
