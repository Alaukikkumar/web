import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/case-studies/`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/resume/`, lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
