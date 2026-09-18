import { ArrowUpRight, Mail } from "lucide-react";
import { DataLine } from "@/components/signature/DataLine";
import { ButtonLink, ExternalButton, StatusIndicator } from "@/components/ui/Primitives";
import { site } from "@/data/site";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line py-24 md:py-32 lg:py-40">
      <div className="grid-bg grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <div className="mb-8 flex items-center gap-4 md:mb-10" data-reveal="">
          <span className="label text-accent">15</span>
          <span className="label">Contact</span>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
          <span className="hidden sm:block">
            <StatusIndicator>Available for automation projects</StatusIndicator>
          </span>
        </div>

        <h2 id="contact-title" className="display max-w-[16ch] text-[clamp(2.6rem,7.4vw,7.5rem)]" data-reveal="">
          Have a process that needs to be <span className="text-accent">automated?</span>
        </h2>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="flex flex-col gap-10" data-reveal="">
            <p className="max-w-md text-xl leading-relaxed text-fg md:text-2xl">
              Let&apos;s turn the process into a system that can be monitored, controlled, measured and improved.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="#contact-form">Start a conversation</ButtonLink>
              {site.linkedin && (
                <ExternalButton href={site.linkedin} target="_blank" rel="noopener noreferrer" icon={<ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />}>
                  View LinkedIn
                </ExternalButton>
              )}
              {site.email ? (
                <ExternalButton href={`mailto:${site.email}`} icon={<Mail className="size-4" aria-hidden="true" />}>
                  Email me
                </ExternalButton>
              ) : (
                <ButtonLink href="#contact-form" variant="ghost" arrow={false}>
                  <Mail className="size-4" aria-hidden="true" />
                  Email me
                </ButtonLink>
              )}
            </div>

            <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {[
                ["Scope", "SCADA · PLC · EMS · HMI"],
                ["Also", "IIoT · Energy monitoring · Data / reporting"],
                ["Based in", site.country],
                ["Response", "By email"],
              ].map(([label, value]) => (
                <div key={label} className="bg-bg px-4 py-3">
                  <dt className="label">{label}</dt>
                  <dd className="mt-1.5 text-sm text-fg">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="hidden sm:block">
              <DataLine nodes={["Process", "Signals", "Control", "Data", "Improvement"]} label="Engagement path" />
            </div>
          </div>

          <div data-reveal="">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
