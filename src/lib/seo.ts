import { education } from "@/data/experience";
import type { Project } from "@/data/projects";
import { site } from "@/data/site";

/** Stable JSON-LD identifiers so pages can reference the same entities. */
export const ids = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
};

export const personNode = {
  "@type": "Person",
  "@id": ids.person,
  name: site.name,
  alternateName: site.brand,
  jobTitle: site.longRole,
  url: `${site.url}/`,
  description: site.description,
  address: { "@type": "PostalAddress", addressCountry: site.country },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.institution },
  knowsAbout: [
    "Industrial Automation",
    "SCADA",
    "Citect SCADA",
    "AVEVA Plant SCADA",
    "PLC Programming",
    "Schneider Modicon",
    "Energy Management Systems",
    "Modbus",
    "EtherNet/IP",
    "OPC UA",
    "Microsoft SQL Server",
    "Industrial IoT",
    "Node-RED",
  ],
  ...(site.linkedin ? { sameAs: [site.linkedin] } : {}),
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": ids.website,
  name: `${site.name} — ${site.longRole}`,
  alternateName: site.brand,
  url: `${site.url}/`,
  inLanguage: "en",
  publisher: { "@id": ids.person },
};

export function breadcrumbNode(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function caseStudyNode(project: Project) {
  const url = `${site.url}/projects/${project.slug}/`;
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: `${project.title} — Case Study`,
    description: project.summary,
    url,
    mainEntityOfPage: url,
    image: `${site.url}/opengraph-image`,
    inLanguage: "en",
    author: { "@id": ids.person },
    publisher: { "@id": ids.person },
    isPartOf: { "@id": ids.website },
    about: project.tags.map((tag) => ({ "@type": "Thing", name: tag === "IIOT" ? "Industrial IoT" : tag })),
    keywords: [...project.technologies, ...project.capabilities].join(", "),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
