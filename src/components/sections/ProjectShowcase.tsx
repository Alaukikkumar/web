import { ProjectFilterList } from "@/components/projects/ProjectFilterList";
import { ProjectPanel } from "@/components/projects/ProjectPanel";
import { DataLine } from "@/components/signature/DataLine";
import { ButtonLink, SectionHeading } from "@/components/ui/Primitives";
import { projects } from "@/data/projects";

export function ProjectShowcase() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative border-t border-line py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <SectionHeading
          id="projects-title"
          index="04"
          kicker="Projects"
          system="Case studies · 04"
          title={
            <>
              Real systems. <span className="text-muted">Real industrial problems.</span>
            </>
          }
          intro="Each system is presented as an engineering case study — the problem, the architecture and what it changed. Visuals are clearly labelled demo or concept views; no client data is shown."
        />

        <div className="mb-10 mt-10 sm:mb-0" data-reveal="">
          <ButtonLink href="/case-studies/" variant="ghost">
            Benefits &amp; case studies overview
          </ButtonLink>
        </div>

        <div className="mb-14 mt-16 hidden sm:block md:mt-20">
          <DataLine nodes={["Problem", "Architecture", "Control", "Data", "Result"]} label="Case study path" />
        </div>

        <ProjectFilterList
          items={projects.map((project, index) => ({
            slug: project.slug,
            tags: project.tags,
            node: <ProjectPanel project={project} reverse={index % 2 === 1} />,
          }))}
        />
      </div>
    </section>
  );
}
