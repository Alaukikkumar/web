export interface StackGroup {
  id: string;
  label: string;
  role: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    id: "control",
    label: "PLC / Control",
    role: "Logic, sequencing and drives",
    items: ["Schneider Modicon M241", "Schneider M580", "Mitsubishi FX", "TM3 modules", "VFD integration", "Soft starters"],
  },
  {
    id: "scada",
    label: "SCADA",
    role: "Supervision and visualization",
    items: ["AVEVA Plant SCADA", "Citect SCADA", "EcoStruxure Power Operation", "Vijeo Designer", "HMI systems"],
  },
  {
    id: "communication",
    label: "Communication",
    role: "Moving data between devices",
    items: ["Modbus RTU", "Modbus TCP", "EtherNet/IP", "OPC UA", "RS485", "Industrial Ethernet"],
  },
  {
    id: "data",
    label: "Data",
    role: "Storing what happened",
    items: ["Microsoft SQL Server", "SQL logging", "Historian concepts", "Automated reports", "Excel reporting"],
  },
  {
    id: "software",
    label: "Automation / Software",
    role: "Scripts, logic and interfaces",
    items: ["Cicode", "Structured Text", "Node-RED", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "notifications",
    label: "Notifications",
    role: "Reaching people",
    items: ["Telegram", "SMS", "Email automation"],
  },
];
