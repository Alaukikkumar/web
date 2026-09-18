import type { IconName } from "@/components/diagrams/IndustrialIcon";

export interface ExpertiseArea {
  code: string;
  title: string;
  platform?: string;
  icon: IconName;
  items: string[];
}

export const expertise: ExpertiseArea[] = [
  {
    code: "SCADA",
    title: "SCADA Development",
    platform: "Citect / AVEVA Plant SCADA",
    icon: "scada",
    items: [
      "Process visualization",
      "Alarm management",
      "Trends",
      "Data logging",
      "Reports",
      "User management",
      "Industrial communication",
    ],
  },
  {
    code: "CONTROL",
    title: "PLC Automation",
    platform: "Schneider / Mitsubishi / Modicon",
    icon: "plc",
    items: [
      "PLC programming",
      "Sequence control",
      "Interlocks",
      "Manual / Auto operation",
      "Fault handling",
      "Analog processing",
      "Machine control",
    ],
  },
  {
    code: "ENERGY",
    title: "Energy Management",
    platform: "EMS",
    icon: "meter",
    items: [
      "Power monitoring",
      "Energy dashboards",
      "DG monitoring",
      "UPS monitoring",
      "Solar monitoring",
      "Load monitoring",
      "Energy reports",
      "Demand analysis",
    ],
  },
  {
    code: "CONNECTIVITY",
    title: "Industrial Communication",
    platform: "Fieldbus / Ethernet",
    icon: "network",
    items: [
      "Modbus RTU",
      "Modbus TCP",
      "EtherNet/IP",
      "OPC UA",
      "RS485",
      "Industrial Ethernet",
      "PLC ↔ SCADA",
      "PLC ↔ VFD",
      "PLC ↔ Energy meters",
    ],
  },
  {
    code: "DATA",
    title: "Industrial Database",
    platform: "SQL / Historian",
    icon: "database",
    items: [
      "Process data",
      "Production records",
      "Alarm history",
      "Temperature logging",
      "Energy data",
      "Batch records",
      "Reports",
      "Historical trends",
    ],
  },
  {
    code: "OPERATOR",
    title: "HMI Development",
    platform: "Operator interfaces",
    icon: "hmi",
    items: [
      "Operator interfaces",
      "Machine status",
      "Manual controls",
      "Alarm screens",
      "Trends",
      "Recipe management",
      "Diagnostic screens",
    ],
  },
  {
    code: "IIOT",
    title: "Industrial IoT",
    platform: "Node-RED / MQTT",
    icon: "cloud",
    items: [
      "Node-RED",
      "MQTT",
      "Cloud connectivity",
      "Telegram alerts",
      "SMS notifications",
      "Email reports",
      "Remote monitoring",
    ],
  },
  {
    code: "REPORTING",
    title: "Industrial Reporting",
    platform: "Automated reports",
    icon: "report",
    items: [
      "Production reports",
      "Lot reports",
      "Energy reports",
      "Alarm reports",
      "Temperature reports",
      "Ampere-hour reports",
      "Automated email reporting",
    ],
  },
];
