/**
 * Project case studies.
 *
 * Content rule: no client names, no invented numbers, qualitative outcomes only.
 * To add real screenshots, place files in /public/projects/<slug>/ and list them in `gallery`.
 */

export const projectFilters = ["ALL", "SCADA", "PLC", "EMS", "IIOT", "DATA", "HMI"] as const;
export type ProjectFilter = (typeof projectFilters)[number];
export type ProjectTag = Exclude<ProjectFilter, "ALL">;

export type ProjectVisualKind = "electroplating" | "ems" | "biogas" | "data";

export interface ArchitectureStage {
  title: string;
  nodes: string[];
}

export interface Challenge {
  title: string;
  detail: string;
}

/** Benefits shared across projects — used for the "benefits at a glance" matrix. Qualitative only. */
export const benefitCatalogue = {
  centralized: { label: "Centralized monitoring", detail: "One view of the process instead of separate panels, HMIs and meters." },
  control: { label: "Automated control", detail: "Equipment responds to process conditions instead of manual adjustment." },
  logging: { label: "Automated data logging", detail: "Values stored with timestamps — not written down by hand." },
  reporting: { label: "Less manual reporting", detail: "Reports generated from stored records." },
  faults: { label: "Faster fault identification", detail: "Alarms and history show what failed and when." },
  traceability: { label: "Process traceability", detail: "Any lot, shift or source can be looked back at later." },
  history: { label: "Historical analysis", detail: "Trends and records for comparing periods." },
  alerts: { label: "Remote alerts", detail: "SMS / Telegram / email when something needs attention." },
} as const;

export type BenefitKey = keyof typeof benefitCatalogue;

export interface BenefitGroup {
  audience: "Operators" | "Maintenance & engineering" | "Management & quality";
  points: string[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  category: string;
  tags: ProjectTag[];
  status: string;
  summary: string;
  problem: string;
  problemPoints: string[];
  solution: string;
  approach: string[];
  architecture: ArchitectureStage[];
  capabilitiesLabel: string;
  capabilities: string[];
  technologies: string[];
  controlLogic: string[];
  dataFlow: string[];
  scadaLabel: string;
  scadaFeatures: string[];
  reporting: string[];
  results: string[];
  /** What was added to the plant or process — capabilities delivered. */
  added: string[];
  /** Who benefits and how. Derived from the delivered features; no figures. */
  benefitGroups: BenefitGroup[];
  benefitKeys: BenefitKey[];
  challenges: Challenge[];
  visual: ProjectVisualKind;
  gallery: GalleryImage[];
}

export const projects: Project[] = [
  {
    slug: "electroplating-scada",
    index: "01",
    title: "Electroplating SCADA & Process Automation",
    shortTitle: "Electroplating SCADA",
    category: "SCADA / PLC / SQL / Rectifier control / Production data",
    tags: ["SCADA", "PLC", "DATA", "IIOT"],
    status: "PROCESS ACTIVE",
    summary:
      "An integrated SCADA platform connecting PLCs, RS485 rectifiers, temperature, pH / TDS, recipes, lots, alarms and SQL-backed production reports.",
    problem:
      "Electroplating plants often depend on manual monitoring, multiple HMIs, PLCs, rectifiers, temperature parameters and manually prepared reports.",
    problemPoints: [
      "Process parameters spread across separate HMIs and panels",
      "Rectifier currents and bath temperatures checked by hand",
      "Lot and production records prepared manually",
      "Little historical data when a quality question comes up",
    ],
    solution:
      "Developed an integrated SCADA platform that brings the PLC, multiple RS485 rectifiers, temperature, chemistry and production data into one supervised system.",
    approach: [
      "Map every data source — PLC, rectifiers, temperature, pH / TDS — onto one SCADA tag model",
      "Communicate with the RS485 rectifiers and write setpoints from SCADA",
      "Tie recipe management and lot loading to current-density based control",
      "Log process and production data to SQL Server and build reports on top of it",
      "Route alarms to operators on screen and via SMS / Telegram / email",
    ],
    architecture: [
      { title: "Field & control", nodes: ["PLC", "12 RS485 rectifiers", "Temperature", "pH / TDS"] },
      { title: "Supervision", nodes: ["SCADA"] },
      { title: "Data", nodes: ["SQL Server"] },
      { title: "Reporting", nodes: ["Reports"] },
      { title: "Notification", nodes: ["SMS", "Telegram", "Email"] },
    ],
    capabilitiesLabel: "System capabilities",
    capabilities: [
      "Lot management",
      "Recipe control",
      "Rectifier control",
      "Temperature monitoring",
      "pH / TDS",
      "Alarm management",
      "AH dosing",
      "Reporting",
    ],
    technologies: ["SCADA", "PLC", "RS485 rectifier communication", "SQL Server", "Recipe management", "SMS / Telegram / Email"],
    controlLogic: [
      "Current-density based control — rectifier setpoints derived from the active recipe and the loaded lot",
      "Ampere-hour (Ah) dosing — accumulated rectifier ampere-hours trigger chemical dosing",
      "Chiller / heater control to keep bath temperature within the recipe band",
      "Chemical dosing supported by pH / TDS monitoring",
      "Lot loading linked to recipe selection",
      "Alarm handling for process deviations",
    ],
    dataFlow: [
      "PLC and RS485 rectifiers → SCADA tags",
      "Temperature and pH / TDS values → SCADA",
      "SCADA → SQL Server process and production records",
      "SQL Server → lot and production reports",
      "Alarm events → SMS / Telegram / email",
    ],
    scadaLabel: "SCADA features",
    scadaFeatures: [
      "Process overview",
      "Rectifier control",
      "Recipe management",
      "Lot loading",
      "Temperature monitoring",
      "pH / TDS monitoring",
      "Chiller / heater control",
      "Alarm management",
    ],
    reporting: [
      "Production reports",
      "Lot-wise process records",
      "Ampere-hour records",
      "Alarm notifications via SMS / Telegram / email",
    ],
    results: [
      "Centralized monitoring of PLC, rectifier, temperature and pH / TDS data",
      "Reduced manual reporting",
      "Improved process traceability per lot",
      "Automated data logging",
      "Faster fault identification through alarm management",
    ],
    added: [
      "One SCADA over the PLC, 12 RS485 rectifiers, temperature and pH / TDS",
      "Recipe management and lot loading",
      "Current-density based rectifier control",
      "Ampere-hour (Ah) dosing",
      "Chiller / heater and chemical dosing control",
      "SQL Server database for process and production data",
      "Production and lot reports",
      "Alarm notifications by SMS / Telegram / email",
    ],
    benefitGroups: [
      {
        audience: "Operators",
        points: [
          "Rectifiers, bath temperatures and chemistry on one screen",
          "Recipes and lots set from SCADA instead of separate panels",
          "Alarms on screen and on the phone",
        ],
      },
      {
        audience: "Maintenance & engineering",
        points: ["Alarm history shows what happened and when", "Process values logged for fault investigation"],
      },
      {
        audience: "Management & quality",
        points: ["Lot-wise records for every production run", "Production reports without manual compilation"],
      },
    ],
    benefitKeys: ["centralized", "control", "logging", "reporting", "faults", "traceability", "alerts"],
    challenges: [
      {
        title: "Many devices, one serial bus",
        detail:
          "Multiple rectifiers sharing RS485 need a polling strategy that keeps screens responsive and isolates a single non-responding device.",
      },
      {
        title: "Recipes that drive real current",
        detail:
          "Setpoints written to rectifiers must come from validated recipe and lot data — invalid values must never reach the process.",
      },
      {
        title: "Records that stay trustworthy",
        detail:
          "Production records are only useful if every lot, recipe and alarm is logged consistently, with timestamps that line up.",
      },
      {
        title: "Screens operators can read fast",
        detail:
          "Each tank carries many parameters — the interface has to surface what matters first without hiding the detail.",
      },
    ],
    visual: "electroplating",
    gallery: [],
  },
  {
    slug: "industrial-ems",
    index: "02",
    title: "Energy Management System",
    shortTitle: "Industrial EMS",
    category: "EMS / Power monitoring / SCADA / Data",
    tags: ["EMS", "SCADA", "DATA", "IIOT"],
    status: "DATA STREAMING",
    summary:
      "An industrial EMS architecture for centralized monitoring of electrical and utility parameters — from field meters to SQL historian, dashboards and alarms.",
    problem:
      "Electrical and utility data — meters, DG, UPS, solar, water, gas — often sits in separate devices, read manually or not at all, so consumption and demand are hard to see in one place.",
    problemPoints: [
      "Meter readings collected manually",
      "No single view of grid, DG, UPS and solar sources",
      "Limited history for consumption and demand analysis",
      "Utility parameters monitored separately from electrical data",
    ],
    solution:
      "Designed an industrial EMS architecture for centralized monitoring of electrical and utility parameters.",
    approach: [
      "Collect multifunction meter and utility data over Modbus RTU / TCP",
      "Aggregate field communication through a gateway or PLC",
      "Supervise in SCADA / EMS with single-line-diagram navigation",
      "Historize to SQL for trends, reports and demand analysis",
      "Raise alarms and notify via SMS / Telegram",
    ],
    architecture: [
      { title: "Field", nodes: ["Field meters"] },
      { title: "Protocol", nodes: ["Modbus RTU / TCP"] },
      { title: "Aggregation", nodes: ["Gateway / PLC"] },
      { title: "Supervision", nodes: ["SCADA / EMS"] },
      { title: "Data", nodes: ["SQL historian"] },
      { title: "Visualization", nodes: ["Dashboard"] },
      { title: "Output", nodes: ["Reports / Alarms"] },
    ],
    capabilitiesLabel: "Monitored sources",
    capabilities: [
      "Multifunction meters",
      "DG",
      "UPS",
      "Solar",
      "Water",
      "Gas",
      "Temperature",
      "Energy consumption",
      "Power demand",
    ],
    technologies: ["Modbus RTU", "Modbus TCP", "Gateway / PLC", "SCADA / EMS", "SQL historian", "SMS / Telegram"],
    controlLogic: [
      "Meter registers polled and scaled to engineering units",
      "Energy consumption accumulated per source and period",
      "Power demand evaluated over defined intervals",
      "Alarm limits on electrical and utility parameters",
      "Source status for grid, DG, UPS and solar",
    ],
    dataFlow: [
      "Field meters → Modbus RTU / TCP",
      "Gateway / PLC → SCADA / EMS",
      "SCADA / EMS → SQL historian",
      "SQL historian → dashboards, trends and reports",
      "Alarm events → SMS / Telegram",
    ],
    scadaLabel: "EMS features",
    scadaFeatures: [
      "Real-time monitoring",
      "Historical trends",
      "SLD",
      "Alarm management",
      "Energy reports",
      "User roles",
      "Data logging",
      "SMS / Telegram notifications",
    ],
    reporting: ["Energy reports", "Consumption by source", "Demand analysis", "Alarm history"],
    results: [
      "Centralized energy monitoring",
      "Historical analysis of consumption and demand",
      "Better visibility across electrical and utility sources",
      "Automated data logging",
      "Reduced manual meter reading",
    ],
    added: [
      "Modbus RTU / TCP data collection from field meters",
      "Gateway / PLC aggregation layer",
      "SCADA / EMS with single-line-diagram navigation",
      "SQL historian for electrical and utility data",
      "Energy dashboards and reports",
      "User roles",
      "Alarm notifications by SMS / Telegram",
    ],
    benefitGroups: [
      {
        audience: "Operators",
        points: ["Live electrical and utility values on one SLD-based screen", "Alarm notifications by SMS / Telegram"],
      },
      {
        audience: "Maintenance & engineering",
        points: ["Source status for grid, DG, UPS and solar", "Historical trends of power and demand"],
      },
      {
        audience: "Management & quality",
        points: ["Energy reports by source and period", "Demand analysis from logged data"],
      },
    ],
    benefitKeys: ["centralized", "logging", "reporting", "history", "alerts"],
    challenges: [
      {
        title: "Every meter speaks differently",
        detail:
          "Meters expose different register maps, data types and word orders — each map must be verified before the data can be trusted.",
      },
      {
        title: "Energy data needs continuity",
        detail: "Gaps in logged energy values distort reports, so logging intervals and timestamps must be handled deliberately.",
      },
      {
        title: "An SLD operators recognise",
        detail: "The single-line diagram must mirror the real electrical network so operators navigate by the plant they already know.",
      },
      {
        title: "Built to grow",
        detail: "New feeders, meters and utilities should be addable without restructuring the system.",
      },
    ],
    visual: "ems",
    gallery: [],
  },
  {
    slug: "biogas-automation",
    index: "03",
    title: "Biogas Process Automation",
    shortTitle: "Biogas Automation",
    category: "PLC / HMI / VFD / Process control",
    tags: ["PLC", "HMI"],
    status: "PLC CONNECTED",
    summary:
      "Process automation for a biogas system — blower speed control through a VFD, analog process measurement, pumps and valves, with an operator HMI.",
    problem:
      "A biogas process needs gas flow, pressure and temperature under continuous observation, with the blower, pumps and valves responding to process conditions instead of manual adjustment.",
    problemPoints: [
      "Gas flow, pressure and temperature need continuous measurement",
      "Blower speed must follow the process",
      "Pumps and valves need coordinated, interlocked operation",
      "Operators need clear status and manual control",
    ],
    solution:
      "A PLC-based control architecture on Schneider Modicon M241 with an ATV340 drive for the biogas blower, analog instrumentation and an operator HMI, connected over Industrial Ethernet.",
    approach: [
      "Acquire gas flow, pressure and temperature through analog I/O",
      "Control the biogas blower through a VFD",
      "Coordinate pumps and valves from the PLC",
      "Give operators an HMI for status, manual control and alarms",
      "Connect devices over Industrial Ethernet — EtherNet/IP and Modbus",
    ],
    architecture: [
      { title: "Process", nodes: ["Biogas process"] },
      { title: "Measurement", nodes: ["Gas flow", "Pressure", "Temperature"] },
      { title: "Control", nodes: ["PLC"] },
      { title: "Actuation", nodes: ["VFD / Blower", "Pumps", "Valves"] },
      { title: "Operator", nodes: ["HMI"] },
      { title: "Supervision", nodes: ["SCADA"] },
    ],
    capabilitiesLabel: "System components",
    capabilities: [
      "Biogas blower",
      "VFD",
      "PLC",
      "Analog sensors",
      "Gas flow",
      "Pressure",
      "Temperature",
      "Pumps",
      "Valves",
      "HMI",
      "Industrial Ethernet",
    ],
    technologies: ["Schneider Modicon M241", "ATV340", "EtherNet/IP", "Modbus", "HMI", "Analog I/O"],
    controlLogic: [
      "Analog signal scaling for gas flow, pressure and temperature",
      "Blower speed reference and run commands to the VFD",
      "Manual / Auto operation modes",
      "Interlocks between blower, pumps and valves",
      "Fault handling for drive and process alarms",
    ],
    dataFlow: [
      "Transmitters → PLC analog inputs",
      "PLC ↔ VFD over Industrial Ethernet",
      "PLC ↔ HMI for status and commands",
      "PLC → SCADA for supervision",
    ],
    scadaLabel: "HMI features",
    scadaFeatures: ["Process overview", "Blower / VFD status", "Manual controls", "Alarm screen", "Analog process values"],
    reporting: ["Alarm history on the operator interface", "Process values available to SCADA for supervision and logging"],
    results: [
      "Centralized view of the biogas process",
      "Blower control through the VFD instead of manual adjustment",
      "Faster fault identification",
      "Better visibility of gas flow, pressure and temperature",
    ],
    added: [
      "PLC control on Schneider Modicon M241",
      "Biogas blower speed control through an ATV340 VFD",
      "Analog measurement of gas flow, pressure and temperature",
      "Interlocked pump and valve control",
      "Manual / Auto operating modes",
      "Operator HMI",
      "Industrial Ethernet — EtherNet/IP and Modbus",
    ],
    benefitGroups: [
      {
        audience: "Operators",
        points: ["Clear process status and manual control on the HMI", "Blower speed follows the process through the VFD"],
      },
      {
        audience: "Maintenance & engineering",
        points: ["Drive and process alarms help locate faults", "Defined interlocks between blower, pumps and valves"],
      },
      {
        audience: "Management & quality",
        points: ["Better visibility of gas flow, pressure and temperature"],
      },
    ],
    benefitKeys: ["centralized", "control", "faults"],
    challenges: [
      {
        title: "Analog signals you can trust",
        detail: "Scaling, range checks and sensor-fault detection decide whether flow and pressure readings are fit to drive control.",
      },
      {
        title: "Drive integration",
        detail: "Control words, status words and speed references must map cleanly between the PLC and the drive.",
      },
      {
        title: "Defined safe states",
        detail: "Interlocks must define what the blower, pumps and valves do on a fault or a communication loss.",
      },
    ],
    visual: "biogas",
    gallery: [],
  },
  {
    slug: "industrial-data",
    index: "04",
    title: "Industrial Data Pipeline",
    shortTitle: "Industrial Data & Reporting",
    category: "SQL / Data validation / Reporting / Notifications",
    tags: ["DATA", "SCADA", "IIOT"],
    status: "DATABASE ONLINE",
    summary:
      "A data pipeline that turns PLC and SCADA values into validated SQL records, automated reports and email / Telegram delivery.",
    problem:
      "Process values that only live on a screen disappear. Without validated, time-stamped records, reports stay manual and investigations rely on memory.",
    problemPoints: [
      "Values visible live but not preserved",
      "Reports compiled by hand from screens and logbooks",
      "No record of when an alarm happened or who acknowledged it",
      "Bad or missing values mixed in with good ones",
    ],
    solution:
      "A pipeline from field data through PLC and SCADA into SQL Server, with validation, report generation and automated delivery.",
    approach: [
      "Collect field data through PLC and SCADA",
      "Log to SQL Server on time-based and event-based triggers",
      "Validate values and flag bad quality",
      "Generate reports from stored records",
      "Deliver reports and alerts by email and Telegram",
    ],
    architecture: [
      { title: "Source", nodes: ["Field data"] },
      { title: "Control", nodes: ["PLC"] },
      { title: "Supervision", nodes: ["SCADA"] },
      { title: "Storage", nodes: ["SQL Server"] },
      { title: "Quality", nodes: ["Data validation"] },
      { title: "Output", nodes: ["Reporting"] },
      { title: "Delivery", nodes: ["Email / Telegram"] },
    ],
    capabilitiesLabel: "Logged signals",
    capabilities: ["Temperature", "Current", "Voltage", "pH", "TDS", "Production", "Alarms", "Energy"],
    technologies: ["PLC", "SCADA", "Microsoft SQL Server", "Automated reports", "Email", "Telegram"],
    controlLogic: [
      "Time-based logging at defined intervals",
      "Event-based logging for alarms and state changes",
      "Quality checks for out-of-range or stale values",
      "Timestamps on every stored record",
    ],
    dataFlow: [
      "Field signals → PLC",
      "PLC → SCADA tags",
      "SCADA → SQL Server tables",
      "SQL Server → validation and report queries",
      "Reports → email / Telegram",
    ],
    scadaLabel: "SCADA features",
    scadaFeatures: ["Live values", "Alarm list", "Historical trends", "Report triggers"],
    reporting: ["Production reports", "Process / temperature reports", "Alarm reports", "Energy reports", "Automated email delivery"],
    results: [
      "Automated data logging",
      "Reduced manual reporting",
      "Improved process traceability",
      "Historical data available for analysis",
    ],
    added: [
      "Time-based and event-based SQL logging",
      "Data validation with quality flags",
      "Automated report generation",
      "Report and alert delivery by email / Telegram",
    ],
    benefitGroups: [
      {
        audience: "Operators",
        points: ["Alarms and events recorded automatically"],
      },
      {
        audience: "Maintenance & engineering",
        points: ["Bad or stale values flagged, not stored as real measurements", "Historical data for investigations"],
      },
      {
        audience: "Management & quality",
        points: ["Scheduled reports delivered by email / Telegram", "Traceable records per lot, shift or source"],
      },
    ],
    benefitKeys: ["logging", "reporting", "traceability", "history", "alerts"],
    challenges: [
      {
        title: "Bad data is worse than no data",
        detail: "Out-of-range, frozen or disconnected values must be flagged — never silently stored as real measurements.",
      },
      {
        title: "Database connections fail",
        detail: "Logging has to detect a lost SQL connection, recover, and make any gap visible.",
      },
      {
        title: "Reports people actually read",
        detail: "A report should answer a question — what happened to this lot, this shift, this feeder — not dump every tag.",
      },
    ],
    visual: "data",
    gallery: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 2): Project[] {
  const current = getProject(slug);
  if (!current) return [];
  return projects
    .filter((project) => project.slug !== slug)
    .map((project) => ({ project, overlap: project.tags.filter((tag) => current.tags.includes(tag)).length }))
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map(({ project }) => project);
}
