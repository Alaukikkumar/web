import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { breadcrumbNode, caseStudyNode, graph } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const path = `/projects/${project.slug}/`;
  const title = `${project.title} — Case Study`;
  return {
    title,
    description: project.summary,
    keywords: [project.shortTitle, "case study", ...project.technologies],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: `${title} | ${site.name}`,
      description: project.summary,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          caseStudyNode(project),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Case studies", path: "/case-studies/" },
            { name: project.shortTitle, path: `/projects/${project.slug}/` },
          ]),
        )}
      />
      <ProjectDetail project={project} />
    </>
  );
}
