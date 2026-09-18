import type { IconName } from "@/components/diagrams/IndustrialIcon";

/* ─────────────── About — the full automation stack ─────────────── */
export interface ChainStep {
  label: string;
  detail: string;
  icon: IconName;
}

export const automationChain: ChainStep[] = [
  { label: "Sensors", detail: "Field signals", icon: "sensor" },
  { label: "PLC", detail: "Logic & control", icon: "plc" },
  { label: "Communication", detail: "Modbus · Ethernet", icon: "network" },
  { label: "SCADA", detail: "Supervision", icon: "scada" },
  { label: "Database", detail: "SQL records", icon: "database" },
  { label: "Reports", detail: "Shift · lot · energy", icon: "report" },
  { label: "Notifications", detail: "SMS · Telegram · email", icon: "notify" },
  { label: "Decision making", detail: "People act on data", icon: "decision" },
];

/* ─────────────── Hero — live architecture stack ─────────────── */
export interface HeroLayer {
  id: string;
  label: string;
  icon: IconName;
}

export const heroLayers: HeroLayer[] = [
  { id: "field", label: "Field devices", icon: "sensor" },
  { id: "plc", label: "PLC", icon: "plc" },
  { id: "network", label: "Industrial network", icon: "network" },
  { id: "scada", label: "SCADA / HMI", icon: "scada" },
  { id: "db", label: "Database", icon: "database" },
  { id: "report", label: "Reporting", icon: "report" },
  { id: "notify", label: "SMS / Telegram / Email", icon: "notify" },
];

/* ─────────────── System architecture — six layers ─────────────── */
export interface ArchitectureLayer {
  id: string;
  name: string;
  icon: IconName;
  items: string[];
  purpose: string;
  engineering: string[];
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "field",
    name: "Field",
    icon: "sensor",
    items: ["Sensors", "Meters", "Rectifiers", "Motors", "VFDs", "Valves", "Transmitters"],
    purpose: "Where the process physically happens — every value on a screen starts as a signal here.",
    engineering: ["4–20 mA and digital signals", "Instrument ranges and units", "Wiring and signal faults"],
  },
  {
    id: "control",
    name: "Control",
    icon: "plc",
    items: ["PLC", "Remote I/O", "VFD", "Soft starter", "Controllers"],
    purpose: "Deterministic logic that keeps the process safe and running, with or without the screen.",
    engineering: ["Sequences and interlocks", "Manual / Auto modes", "Analog scaling and fault latching"],
  },
  {
    id: "communication",
    name: "Communication",
    icon: "network",
    items: ["Modbus RTU", "Modbus TCP", "EtherNet/IP", "OPC UA", "RS485", "Industrial Ethernet"],
    purpose: "Moves values between devices reliably — and reports clearly when it cannot.",
    engineering: ["Register maps and data types", "Polling, timeouts and retries", "Communication diagnostics"],
  },
  {
    id: "supervision",
    name: "Supervision",
    icon: "scada",
    items: ["SCADA", "HMI", "EMS"],
    purpose: "Gives operators one clear view of the process — status, alarms, trends and control.",
    engineering: ["Tag model and screen hierarchy", "Alarm priorities and acknowledgement", "User roles"],
  },
  {
    id: "data",
    name: "Data",
    icon: "database",
    items: ["SQL Server", "Historian", "Reports"],
    purpose: "Preserves what happened, when it happened and why — the memory of the plant.",
    engineering: ["Time- and event-based logging", "Quality flags and timestamps", "Report queries"],
  },
  {
    id: "intelligence",
    name: "Intelligence",
    icon: "decision",
    items: ["Dashboards", "Analytics", "Notifications", "Email", "SMS", "Telegram"],
    purpose: "Turns stored data into decisions and gets the right information to the right person.",
    engineering: ["Dashboards and KPIs", "Scheduled reports", "Escalation to SMS / Telegram / email"],
  },
];

/* ─────────────── Automation flow — packet path ─────────────── */
export interface FlowNode {
  label: string;
  state: string;
  icon: IconName;
}

export const packetFlow: FlowNode[] = [
  { label: "Sensor", state: "72.4 °C", icon: "thermometer" },
  { label: "PLC", state: "Processing", icon: "plc" },
  { label: "SCADA", state: "Live value", icon: "scada" },
  { label: "SQL", state: "Logged", icon: "database" },
  { label: "Dashboard", state: "Visible", icon: "decision" },
  { label: "Telegram", state: "Alert", icon: "notify" },
];

/* ─────────────── A day in the system (demo) ─────────────── */
export interface DayEvent {
  time: string;
  title: string;
  subsystem: string;
  detail: string;
  log: string;
  tone?: "alarm";
}

export const dayEvents: DayEvent[] = [
  {
    time: "08:00",
    title: "Shift start",
    subsystem: "USER",
    detail: "Operator signs in. SCADA opens the shift session and resets shift counters.",
    log: "08:00:02  [USER]    OPERATOR-A signed in · role OPERATOR",
  },
  {
    time: "08:05",
    title: "Lot loaded",
    subsystem: "LOT",
    detail: "A lot is registered against a tank with its loaded surface area.",
    log: "08:05:14  [LOT]     LOT-DEMO-014 loaded · tank T-04 · area 12.5 dm²",
  },
  {
    time: "08:07",
    title: "Recipe activated",
    subsystem: "RECIPE",
    detail: "Recipe parameters load: current density, process time and temperature band.",
    log: "08:07:40  [RECIPE]  R-DEMO-02 active · 3.0 A/dm² · 55–60 °C",
  },
  {
    time: "08:08",
    title: "Rectifier control started",
    subsystem: "RECT",
    detail: "Setpoint = current density × area. The value is written to the rectifier over RS485.",
    log: "08:08:03  [RECT]    R05 setpoint 37.5 A written · FC06 · ACK",
  },
  {
    time: "08:20",
    title: "Temperature monitoring",
    subsystem: "TEMP",
    detail: "Bath temperature is held inside the recipe band by heater / chiller control.",
    log: "08:20:00  [TEMP]    T-04 57.9 °C · band 55–60 °C · heater OFF",
  },
  {
    time: "09:10",
    title: "Process data logged",
    subsystem: "SQL",
    detail: "Time-based logging writes current, voltage, temperature and Ah to SQL Server.",
    log: "09:10:00  [SQL]     INSERT dbo.ProcessLog · 1 row · quality GOOD",
  },
  {
    time: "10:30",
    title: "Alarm detected",
    subsystem: "ALARM",
    detail: "Temperature crosses the high limit. The alarm is raised, time-stamped and logged.",
    log: "10:30:12  [ALARM]   T-04 TEMP HIGH 61.8 °C · priority 2 · UNACK",
    tone: "alarm",
  },
  {
    time: "10:31",
    title: "Operator notified",
    subsystem: "NOTIFY",
    detail: "The alarm is escalated to the shift group while it waits for acknowledgement.",
    log: "10:31:00  [NOTIFY]  Telegram + SMS sent to shift group",
  },
  {
    time: "11:00",
    title: "Report updated",
    subsystem: "REPORT",
    detail: "The lot report is refreshed from SQL records, including the alarm and its acknowledgement.",
    log: "11:00:00  [REPORT]  LOT-DEMO-014 report updated · email queued",
  },
];
