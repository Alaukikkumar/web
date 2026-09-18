import { Download, FileText } from "lucide-react";
import { ButtonLink, ExternalButton, SectionHeading } from "@/components/ui/Primitives";
import { resumeFacts } from "@/data/experience";
import { site } from "@/data/site";
import { SkillsClusters } from "./SkillsClusters";

export function ResumeSection() {
  return (
    <section aria-labelledby="resume-title" className="relative border-t border-line py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="flex flex-col">
            <SectionHeading
              id="resume-title"
              index="14"
              kicker="Resume"
              system="Datasheet"
              title={
                <>
                  Engineering <span className="text-muted">experience.</span>
                </>
              }
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal="">
              <ButtonLink href="/resume/" arrow={false}>
                <FileText className="size-4" aria-hidden="true" />
                View resume
              </ButtonLink>
              {site.resumeUrl ? (
                <ExternalButton href={site.resumeUrl} download icon={<Download className="size-4" aria-hidden="true" />}>
                  Download CV
                </ExternalButton>
              ) : (
                <ButtonLink href="/#contact" variant="ghost">
                  Request full CV
                </ButtonLink>
              )}
            </div>
          </div>

          <div className="panel corner-marks self-start" data-reveal="">
            <div className="flex items-center justify-between border-b border-line bg-surface-2 px-5 py-3">
              <span className="label text-muted">Datasheet / AK-01</span>
              <span className="label text-accent">Rev. 2026</span>
            </div>
            <dl className="divide-y divide-line">
              {resumeFacts.map((fact) => (
                <div key={fact.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="label pt-1">{fact.label}</dt>
                  <dd className="text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <div className="mb-6 flex items-center gap-4">
            <span className="label text-accent">Skills</span>
            <span className="label">Technical clusters</span>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
          <SkillsClusters />
        </div>
      </div>
    </section>
  );
}
