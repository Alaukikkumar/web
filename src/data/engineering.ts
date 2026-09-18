/**
 * "Under the screen" — illustrative engineering snippets.
 * Simplified for readability; values are demo values, not taken from a client system.
 */
export interface EngineeringStage {
  id: string;
  label: string;
  heading: string;
  body: string;
  concepts: string[];
  language: string;
  code: string;
}

export const engineeringStages: EngineeringStage[] = [
  {
    id: "plc-logic",
    label: "PLC logic",
    heading: "Logic that behaves predictably.",
    body: "Sequences, interlocks and Manual / Auto modes live in the PLC — the process must stay safe even if the screen goes dark.",
    concepts: ["Sequence control", "Interlocks", "Manual / Auto", "Fault latching"],
    language: "Structured Text",
    code: `(* Blower permissive and run command — demo *)
xPermissive := NOT xEStop
           AND NOT xVFD_Fault
           AND xOutletValve_Open;

CASE eMode OF
  MODE_AUTO:
    xRunCmd := xPermissive AND xProcessDemand;
  MODE_MANUAL:
    xRunCmd := xPermissive AND xHMI_Start;
END_CASE;

(* Latch faults until an operator reset *)
IF xVFD_Fault THEN
  xFaultLatched := TRUE;
ELSIF xHMI_Reset THEN
  xFaultLatched := FALSE;
END_IF;`,
  },
  {
    id: "tags",
    label: "Tag management",
    heading: "Every value has an address and a meaning.",
    body: "PLC memory mapping, data types and scaling are defined once and reused — so a tag means the same thing on every screen, trend and report.",
    concepts: ["PLC memory mapping", "Digital status bits", "Data types", "Engineering units"],
    language: "Tag map",
    code: `TAG            ADDRESS   TYPE   SCALE  UNIT
TT101_PV       %MW100    INT    ×0.1   °C
R05_Current    %MW120    INT    ×1     A
R05_Voltage    %MW121    INT    ×0.1   V
R05_Setpoint   %MW130    INT    ×0.1   A
B1_Status      %MW140    WORD   bits   —

B1_Status bit map
  .0  RUNNING      .1  FAULT
  .2  AUTO         .3  REMOTE
  .4  INTERLOCK    .5  COMM_OK`,
  },
  {
    id: "communication",
    label: "Communication",
    heading: "Know exactly what is on the wire.",
    body: "Register maps, polling cycles, timeouts and exception codes — communication diagnostics are what make field problems findable.",
    concepts: ["Modbus RTU / TCP", "Polling & timeouts", "Exception codes", "Comm diagnostics"],
    language: "Modbus RTU",
    code: `// Read 2 holding registers from rectifier R05
TX  05 03 00 64 00 02 84 50
    slave=5  fc=03  start=100  qty=2  crc=5084

RX  05 03 04 00 B8 00 7E BF F6
    bytes=4  current=0x00B8 → 184 A
             voltage=0x007E → 12.6 V

// Write setpoint 37.5 A (×0.1) to register 200
TX  05 06 00 C8 01 77 48 06

// Exception reply → illegal data address
RX  05 83 02 81 30   → flag R05 COMM_FAULT`,
  },
  {
    id: "validation",
    label: "Data validation",
    heading: "Bad data must look bad.",
    body: "Analog signal scaling with range checks and quality flags — a broken transmitter should raise a fault, not log a believable number.",
    concepts: ["Analog signal scaling", "NAMUR NE43 limits", "Quality flags", "Stale detection"],
    language: "Structured Text",
    code: `(* 4–20 mA → 0–100 °C with signal quality *)
IF rRaw_mA < 3.6 OR rRaw_mA > 21.0 THEN
  eQuality  := Q_BAD;        (* wire break / over-range *)
  xTT101_Fault := TRUE;
ELSE
  rTT101_PV := (rRaw_mA - 4.0) / 16.0
               * (rRangeHi - rRangeLo) + rRangeLo;
  eQuality  := Q_GOOD;
END_IF;

IF tSinceUpdate > T#10S THEN
  eQuality := Q_STALE;       (* value frozen *)
END_IF;`,
  },
  {
    id: "sql",
    label: "SQL logging",
    heading: "Store what happened, with context.",
    body: "Time-based data logging and SQL connection management — reconnect on failure and never hide a gap in the record.",
    concepts: ["Time-based logging", "SQL connection management", "Batch records", "Timestamps"],
    language: "Cicode-style · illustrative",
    code: `FUNCTION LogProcessData()
  INT hSQL;

  hSQL = SQLConnect("DSN=PlantHistorian");
  IF hSQL < 0 THEN
    ErrLog("SQL connect failed: " + SQLErrMsg());
    TagWrite("SQL_Online", "0");   // gap made visible
    RETURN;
  END

  SQLExec(hSQL,
    "INSERT INTO dbo.ProcessLog " +
    "(Ts, Tag, Value, Quality) VALUES (SYSDATETIME(), " +
    "'TT101_PV', " + RealToStr(TT101_PV, 6, 1) + ", 'GOOD')");

  SQLDisconnect(hSQL);
END`,
  },
  {
    id: "alarms",
    label: "Alarm handling",
    heading: "An alarm is an event with a lifecycle.",
    body: "Limits, deadbands and delays prevent nuisance alarms; every state change is logged so the sequence of events can be reconstructed.",
    concepts: ["Alarm logging", "Deadband & delay", "Acknowledgement", "Escalation"],
    language: "Alarm lifecycle",
    code: `NORMAL
  │  PV > HI (61.0 °C) for 5 s
  ▼
ACTIVE · UNACK   log     10:30:12  T-04 TEMP HIGH
                 notify  shift group · SMS / Telegram
  │  operator acknowledges
  ▼
ACTIVE · ACK     log     10:34:40  ACK by OPERATOR-A
  │  PV < HI − deadband (60.0 °C)
  ▼
CLEARED          log     10:52:05  RETURN TO NORMAL`,
  },
  {
    id: "reports",
    label: "Report generation",
    heading: "Reports answer a question.",
    body: "Report queries aggregate stored records per lot, shift or source — generated on schedule and delivered automatically.",
    concepts: ["Lot / shift reports", "Aggregation queries", "Scheduled delivery", "Email / Telegram"],
    language: "T-SQL",
    code: `-- Lot summary report (demo schema)
SELECT  l.LotId,
        l.RecipeId,
        MIN(p.Ts)               AS StartTime,
        MAX(p.Ts)               AS EndTime,
        AVG(p.Temperature)      AS AvgTempC,
        MAX(p.AmpHours)         AS TotalAh,
        COUNT(DISTINCT a.AlarmId) AS Alarms
FROM    dbo.Lots l
JOIN    dbo.ProcessLog p ON p.LotId = l.LotId
LEFT JOIN dbo.AlarmLog a ON a.LotId = l.LotId
WHERE   l.LotId = @LotId
GROUP BY l.LotId, l.RecipeId;`,
  },
];
