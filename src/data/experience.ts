export interface ExperienceEntry {
  period: string;
  organization: string;
  summary: string;
  focus: string[];
  current?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    period: "2024 — Present",
    organization: "Unique Power Control",
    summary: "SCADA, EMS and PLC work across industrial communication, rectifier systems and notification pipelines.",
    focus: [
      "SCADA",
      "EMS",
      "PLC",
      "Industrial communication",
      "Node-RED",
      "SMS / Telegram",
      "Mitsubishi FX",
      "Rectifier systems",
      "Industrial automation",
    ],
    current: true,
  },
  {
    period: "2021 — 2024",
    organization: "Industrus Pvt Ltd",
    summary: "Citect SCADA development with Modbus communication, SQL data logging, alarms and industrial reporting.",
    focus: ["Citect SCADA", "Modbus", "SQL", "Industrial reporting", "Alarm systems", "Automation projects"],
  },
  {
    period: "2021",
    organization: "Industrial Automation Training",
    summary: "Foundation training in industrial automation and SCADA.",
    focus: ["Industrial automation", "SCADA"],
  },
];

export const education = {
  degree: "B.Sc. Mathematics Honours",
  institution: "Magadh University",
  year: "2020",
};

export const resumeFacts: Array<{ label: string; value: string }> = [
  { label: "Name", value: "Alaukik Kumar" },
  { label: "Role", value: "Automation Engineer" },
  { label: "Education", value: `${education.degree} — ${education.institution} — ${education.year}` },
  { label: "Training", value: "Industrial Automation / SCADA" },
  { label: "Experience", value: "Industrial Automation · SCADA · EMS · PLC · SQL · Industrial Communication" },
];
