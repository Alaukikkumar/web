export interface SkillCluster {
  name: string;
  nodes: string[];
}

export const skillClusters: SkillCluster[] = [
  { name: "Control", nodes: ["PLC", "VFD", "HMI", "I/O"] },
  { name: "SCADA", nodes: ["Citect", "AVEVA", "Power Operation"] },
  { name: "Data", nodes: ["SQL", "Reports", "Historian"] },
  { name: "Communication", nodes: ["Modbus", "EtherNet/IP", "OPC UA", "RS485"] },
  { name: "Automation", nodes: ["Node-RED", "IoT", "Notifications"] },
];
