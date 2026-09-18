/**
 * Site-wide configuration.
 *
 * OWNER TODO before deploying:
 *  - NEXT_PUBLIC_SITE_URL      → your production domain (used for canonical URLs, sitemap, Open Graph)
 *  - email / linkedin          → your real contact channels (buttons hide or fall back while empty)
 *  - resumeUrl                 → path to a real CV file placed in /public (the "Download CV" button appears only when set)
 *  - NEXT_PUBLIC_CONTACT_ENDPOINT (optional) → a form backend such as Formspree; otherwise the form opens the visitor's email client
 */
export const site = {
  name: "Alaukik Kumar",
  brand: "ALAUKIK",
  role: "Automation Engineer",
  longRole: "Industrial Automation Engineer",
  title: "Alaukik Kumar | Industrial Automation Engineer | SCADA | PLC | EMS",
  description:
    "Portfolio of Alaukik Kumar, Industrial Automation Engineer specializing in SCADA, PLC automation, EMS, industrial communication, SQL data systems and industrial IoT.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com").replace(/\/$/, ""),
  country: "India",
  email: "",
  linkedin: "",
  resumeUrl: "",
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "",
  careerStartYear: 2021,
  keywords: [
    "Industrial Automation Engineer",
    "SCADA Engineer",
    "PLC Programmer",
    "EMS Engineer",
    "SCADA Development",
    "PLC Automation",
    "Industrial IoT",
    "Energy Management System",
    "Industrial Automation India",
    "Schneider PLC",
    "Citect SCADA",
    "AVEVA Plant SCADA",
    "Modbus",
    "Industrial Communication",
  ],
} as const;

export const signaturePath = ["SENSOR", "PLC", "SCADA", "DATABASE", "REPORT"] as const;
