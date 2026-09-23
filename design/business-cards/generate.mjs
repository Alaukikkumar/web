// Business card concepts for ALAUKIK — generates print-size HTML (3.5 × 2 in at 300 dpi = 1050 × 600 px).
// Usage: node design/business-cards/generate.mjs   → writes cards.html, sheet-1.html, sheet-2.html next to this file.
// Replace the placeholder contact details in `person` before exporting final artwork.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const logoDir = path.resolve(here, "../logo-options");

const person = {
  name: "Alaukik Kumar",
  brand: "ALAUKIK",
  role: "Industrial Automation Engineer",
  skills: "SCADA · PLC · EMS · Industrial Data",
  phone: "+91 00000 00000",
  email: "you@example.com",
  web: "yourportfolio.com",
  linkedin: "linkedin.com/in/your-profile",
  base: "India",
  since: "2021",
};

// Logo icons are read from the logo concepts and recoloured per card.
function icon(id, size, fg, accent) {
  const svg = fs.readFileSync(path.join(logoDir, `option-${id}-icon.svg`), "utf8");
  return svg
    .replace(/width="48" height="48"/, `width="${size}" height="${size}"`)
    .replaceAll("#efefeb", fg)
    .replaceAll("#3ee08f", accent);
}

const DARK = { bg: "#08090a", panel: "#0e1012", bar: "#14171a", fg: "#efefeb", muted: "#9ba1a8", dim: "#7d848b", accent: "#3ee08f", line: "rgba(255,255,255,.12)" };
const PAPER = { bg: "#f4f3ee", fg: "#0d0f11", muted: "#4a5056", dim: "#6b7178", accent: "#0b8a4c", line: "rgba(13,15,17,.22)" };

const contactRows = (labelColor, valueColor) =>
  [
    ["T", person.phone],
    ["E", person.email],
    ["W", person.web],
    ["IN", person.linkedin],
  ]
    .map(
      ([k, v]) =>
        `<div class="crow"><span class="mono" style="color:${labelColor}">${k}</span><span class="mono" style="color:${valueColor}">${v}</span></div>`,
    )
    .join("");

const dataLine = (color, lineColor, dotColor) => `
  <div class="dline mono" style="color:${color}">
    <span class="dl-track" style="background:${lineColor}"><i style="background:${dotColor}"></i></span>
    ${["Sensor", "PLC", "SCADA", "Database", "Report"].map((n) => `<b style="border-color:${dotColor}"></b><span>${n}</span>`).join("")}
  </div>`;

/* ───────────── Card designs ───────────── */
const designs = [
  {
    id: "01",
    name: "Control Room",
    note: "Dark · logo 01 Signal Node · signature data line",
    front: `
      <div class="card" style="background:${DARK.bg};color:${DARK.fg}">
        <div class="grid" style="--g:rgba(255,255,255,.05)"></div>
        <div class="marks" style="--m:${DARK.line}"></div>
        <div style="position:absolute;left:84px;top:170px;display:flex;align-items:center;gap:36px">
          ${icon("01", 132, DARK.fg, DARK.accent)}
          <div>
            <div style="font-size:104px;font-weight:600;letter-spacing:-.035em;line-height:1">ALAUKIK</div>
            <div class="mono" style="font-size:27px;letter-spacing:.24em;color:${DARK.dim};margin-top:16px">AUTOMATION ENGINEER</div>
          </div>
        </div>
        <div style="position:absolute;left:84px;right:84px;bottom:78px">${dataLine(DARK.dim, "rgba(255,255,255,.18)", DARK.accent)}</div>
      </div>`,
    back: `
      <div class="card" style="background:${DARK.bg};color:${DARK.fg}">
        <div class="grid" style="--g:rgba(255,255,255,.04)"></div>
        <div class="marks" style="--m:${DARK.line}"></div>
        <div style="position:absolute;left:84px;top:80px">
          <div style="font-size:66px;font-weight:600;letter-spacing:-.03em;line-height:1">${person.name}</div>
          <div class="mono" style="font-size:27px;letter-spacing:.14em;color:${DARK.accent};margin-top:18px;text-transform:uppercase">${person.role}</div>
          <div class="mono" style="font-size:26px;letter-spacing:.08em;color:${DARK.muted};margin-top:10px">${person.skills}</div>
        </div>
        <div class="contacts" style="left:84px;bottom:76px">${contactRows(DARK.accent, DARK.fg)}</div>
        <div class="mono" style="position:absolute;right:84px;top:92px;font-size:24px;letter-spacing:.14em;color:${DARK.dim};display:flex;align-items:center;gap:14px">
          <span style="width:14px;height:14px;border-radius:9px;background:${DARK.accent}"></span>AVAILABLE FOR PROJECTS
        </div>
      </div>`,
  },
  {
    id: "02",
    name: "Blueprint",
    note: "Light paper · logo 03 Instrument Tag · engineering drawing title block",
    front: `
      <div class="card" style="background:${PAPER.bg};color:${PAPER.fg}">
        <div class="grid" style="--g:rgba(13,15,17,.05)"></div>
        <div class="frame" style="--f:${PAPER.fg}"></div>
        ${[1, 2, 3, 4].map((n, i) => `<span class="mono zone" style="left:${150 + i * 250}px;top:16px">${n}</span>`).join("")}
        ${["A", "B"].map((n, i) => `<span class="mono zone" style="left:18px;top:${190 + i * 220}px">${n}</span>`).join("")}
        <div style="position:absolute;left:96px;top:96px">${icon("03", 196, PAPER.fg, PAPER.accent)}</div>
        <div style="position:absolute;left:300px;top:150px;width:170px;border-top:2px solid ${PAPER.fg}"></div>
        <div class="mono" style="position:absolute;left:484px;top:128px;font-size:26px;letter-spacing:.1em;color:${PAPER.muted};line-height:1.5">TAG AK-01<br/>FIELD → PLC → SCADA</div>
        <table class="tblock mono" style="--t:${PAPER.fg};right:62px;bottom:62px;width:620px">
          <tr><td colspan="3" style="font-family:Geist,sans-serif;font-size:50px;font-weight:600;letter-spacing:-.02em;text-transform:none;color:${PAPER.fg}">${person.name}</td></tr>
          <tr><td colspan="3" style="color:${PAPER.accent}">${person.role}</td></tr>
          <tr><td>DWG AK-001</td><td>REV 01</td><td>SHEET 1/1</td></tr>
        </table>
      </div>`,
    back: `
      <div class="card" style="background:${PAPER.bg};color:${PAPER.fg}">
        <div class="grid" style="--g:rgba(13,15,17,.05)"></div>
        <div class="frame" style="--f:${PAPER.fg}"></div>
        <div style="position:absolute;left:92px;top:92px;display:flex;align-items:center;gap:22px">
          ${icon("03", 84, PAPER.fg, PAPER.accent)}
          <div>
            <div style="font-size:48px;font-weight:600;letter-spacing:-.02em;line-height:1">ALAUKIK</div>
            <div class="mono" style="font-size:24px;letter-spacing:.16em;color:${PAPER.muted};margin-top:8px">${person.skills.toUpperCase()}</div>
          </div>
        </div>
        <table class="tblock mono" style="--t:${PAPER.fg};left:92px;bottom:78px;width:866px">
          <tr><td class="k">TEL</td><td>${person.phone}</td><td class="k">BASE</td><td>${person.base.toUpperCase()}</td></tr>
          <tr><td class="k">EMAIL</td><td colspan="3" style="text-transform:none">${person.email}</td></tr>
          <tr><td class="k">WEB</td><td colspan="3" style="text-transform:none">${person.web}</td></tr>
          <tr><td class="k">LINKEDIN</td><td colspan="3" style="text-transform:none">${person.linkedin}</td></tr>
        </table>
      </div>`,
  },
  {
    id: "03",
    name: "HMI Faceplate",
    note: "Dark · logo 05 Digital Pulse · SCADA faceplate with live trend",
    front: `
      <div class="card" style="background:#050606;color:${DARK.fg}">
        <div class="plate" style="left:56px;top:56px;right:56px;bottom:56px;background:${DARK.panel};border-color:${DARK.line}">
          <div class="pbar mono" style="background:${DARK.bar};border-color:${DARK.line}">
            <span style="color:${DARK.muted}">FACEPLATE · ENG-01</span>
            <span style="color:${DARK.accent};display:flex;align-items:center;gap:12px"><i style="width:14px;height:14px;background:${DARK.accent}"></i>RUNNING</span>
          </div>
          <div style="display:flex;align-items:center;gap:30px;padding:34px 40px 0">
            ${icon("05", 96, DARK.fg, DARK.accent)}
            <div style="font-size:64px;font-weight:600;letter-spacing:-.03em;line-height:1">${person.name}</div>
          </div>
          <div class="mono kv" style="padding:24px 40px 0;color:${DARK.fg}">
            <div><span style="color:${DARK.dim}">ROLE</span>${person.role}</div>
            <div><span style="color:${DARK.dim}">SPEC</span>${person.skills}</div>
            <div><span style="color:${DARK.dim}">BASE</span>${person.base}</div>
          </div>
          <svg viewBox="0 0 900 70" preserveAspectRatio="none" style="position:absolute;left:40px;right:40px;bottom:24px;width:calc(100% - 80px);height:62px">
            <polyline points="0,50 60,44 120,48 180,30 240,34 300,20 360,28 420,16 480,24 540,12 600,22 660,14 720,26 780,18 840,22 900,10" fill="none" stroke="${DARK.accent}" stroke-width="3"/>
          </svg>
        </div>
      </div>`,
    back: `
      <div class="card" style="background:#050606;color:${DARK.fg}">
        <div class="plate" style="left:56px;top:56px;right:56px;bottom:56px;background:${DARK.panel};border-color:${DARK.line}">
          <div class="pbar mono" style="background:${DARK.bar};border-color:${DARK.line}">
            <span style="color:${DARK.muted}">CONTACT · TAG LIST</span>
            <span style="color:${DARK.dim}">ALAUKIK</span>
          </div>
          <table class="tags mono" style="--l:${DARK.line}">
            <tr style="color:${DARK.dim}"><td>TAG</td><td>VALUE</td><td>Q</td></tr>
            ${[
              ["PHONE", person.phone],
              ["EMAIL", person.email],
              ["WEB", person.web],
              ["LINKEDIN", person.linkedin],
            ]
              .map(([k, v]) => `<tr><td style="color:${DARK.muted}">${k}</td><td style="color:${DARK.fg};text-transform:none">${v}</td><td style="color:${DARK.accent}">GOOD</td></tr>`)
              .join("")}
          </table>
        </div>
      </div>`,
  },
  {
    id: "04",
    name: "Rating Plate",
    note: "Light metal · logo 04 Control Module · equipment nameplate",
    front: `
      <div class="card" style="background:#c9ccc8">
        <div class="plate" style="left:40px;top:40px;right:40px;bottom:40px;background:#e2e4e0;border:3px solid #8d9291">
          ${["left:22px;top:22px", "right:22px;top:22px", "left:22px;bottom:22px", "right:22px;bottom:22px"].map((p) => `<i class="rivet" style="${p}"></i>`).join("")}
          <div style="background:#1b1f23;color:#efefeb;margin:58px 58px 0;padding:22px 30px;display:flex;align-items:center;gap:24px">
            ${icon("04", 70, "#efefeb", "#3ee08f")}
            <div style="font-size:54px;font-weight:700;letter-spacing:-.02em;line-height:1">${person.name.toUpperCase()}</div>
          </div>
          <div class="fields mono">
            <div><span>TYPE</span>${person.role}</div>
            <div><span>SERIES</span>SCADA · PLC · EMS</div>
            <div><span>PROTOCOLS</span>Modbus · EtherNet/IP · OPC UA</div>
            <div><span>SINCE</span>${person.since} · Based in ${person.base}</div>
          </div>
        </div>
      </div>`,
    back: `
      <div class="card" style="background:#c9ccc8">
        <div class="plate" style="left:40px;top:40px;right:40px;bottom:40px;background:#e2e4e0;border:3px solid #8d9291">
          ${["left:22px;top:22px", "right:22px;top:22px", "left:22px;bottom:22px", "right:22px;bottom:22px"].map((p) => `<i class="rivet" style="${p}"></i>`).join("")}
          <div class="mono" style="margin:64px 64px 0;display:flex;justify-content:space-between;align-items:center;font-size:26px;letter-spacing:.16em;color:#3a3f44">
            <span style="display:flex;align-items:center;gap:18px">${icon("04", 52, "#1b1f23", "#0b8a4c")}ALAUKIK</span>
            <span>CONTACT DATA</span>
          </div>
          <div class="fields mono" style="margin-top:26px">
            <div><span>TEL</span>${person.phone}</div>
            <div><span>EMAIL</span><em>${person.email}</em></div>
            <div><span>WEB</span><em>${person.web}</em></div>
            <div><span>LINKEDIN</span><em>${person.linkedin}</em></div>
          </div>
        </div>
      </div>`,
  },
  {
    id: "05",
    name: "Signal Green",
    note: "Brand green · logo 02 Data-Line A · bold and memorable",
    front: `
      <div class="card" style="background:#3ee08f;color:#04140b">
        <div style="position:absolute;left:0;right:0;top:320px;height:5px;background:#04140b"></div>
        <div style="position:absolute;left:92px;top:118px">${icon("02", 330, "#04140b", "#04140b").replace('fill="#04140b"/>', 'fill="#f4f3ee"/>')}</div>
        <div style="position:absolute;left:470px;top:192px;font-size:108px;font-weight:700;letter-spacing:-.04em;line-height:1">ALAUKIK</div>
        <div class="mono" style="position:absolute;left:474px;top:352px;font-size:28px;letter-spacing:.22em;opacity:.8">SCADA · PLC · EMS</div>
      </div>`,
    back: `
      <div class="card" style="background:${PAPER.bg};color:${PAPER.fg}">
        <div style="position:absolute;left:0;top:0;bottom:0;width:22px;background:#3ee08f"></div>
        <div style="position:absolute;left:96px;top:86px">
          <div style="font-size:66px;font-weight:600;letter-spacing:-.03em;line-height:1">${person.name}</div>
          <div class="mono" style="font-size:27px;letter-spacing:.14em;color:${PAPER.accent};margin-top:18px;text-transform:uppercase">${person.role}</div>
        </div>
        <div class="contacts" style="left:96px;bottom:80px">${contactRows(PAPER.accent, PAPER.fg)}</div>
        <div style="position:absolute;right:84px;bottom:84px">${icon("02", 96, PAPER.fg, PAPER.accent)}</div>
      </div>`,
  },
  {
    id: "06",
    name: "Status Bracket",
    note: "Dark minimal · logo 06 Status Bracket · quiet and premium",
    front: `
      <div class="card" style="background:${DARK.bg};color:${DARK.fg}">
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px">
          ${icon("06", 128, DARK.fg, DARK.accent)}
          <div class="mono" style="font-size:66px;font-weight:700;letter-spacing:.2em;line-height:1;padding-left:.2em">ALAUKIK</div>
          <div class="mono" style="font-size:24px;letter-spacing:.3em;color:${DARK.dim}">AUTOMATION ENGINEER</div>
        </div>
      </div>`,
    back: `
      <div class="card" style="background:${DARK.bg};color:${DARK.fg}">
        <div style="position:absolute;right:-40px;top:-10px;opacity:.045">${icon("06", 620, DARK.fg, DARK.fg)}</div>
        <div style="position:absolute;left:84px;top:92px">
          <div style="font-size:62px;font-weight:600;letter-spacing:-.03em;line-height:1">${person.name}</div>
          <div class="mono" style="font-size:26px;letter-spacing:.14em;color:${DARK.accent};margin-top:18px;text-transform:uppercase">${person.role}</div>
        </div>
        <div class="contacts" style="left:84px;bottom:80px">${contactRows(DARK.dim, DARK.muted)}</div>
      </div>`,
  },
];

/* ───────────── Shared styles ───────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=block');
  *{box-sizing:border-box;margin:0;padding:0}
  .card{position:relative;width:1050px;height:600px;overflow:hidden;font-family:Geist,sans-serif}
  .mono{font-family:'JetBrains Mono',monospace}
  .grid{position:absolute;inset:0;background-image:linear-gradient(to right,var(--g) 1px,transparent 1px),linear-gradient(to bottom,var(--g) 1px,transparent 1px);background-size:50px 50px}
  .marks::before,.marks::after{content:"";position:absolute;width:40px;height:40px;border:2px solid var(--m)}
  .marks::before{left:36px;top:36px;border-width:2px 0 0 2px}
  .marks::after{right:36px;bottom:36px;border-width:0 2px 2px 0}
  .dline{position:relative;display:flex;align-items:center;justify-content:space-between;font-size:24px;letter-spacing:.14em;text-transform:uppercase}
  .dline b{width:14px;height:14px;border:3px solid;background:inherit;position:relative;z-index:1}
  .dline span:not(.dl-track){position:relative;z-index:1;margin:0 18px 0 12px;background:#08090a;padding-right:6px}
  .dline span:last-child{margin-right:0}
  .dl-track{position:absolute;left:0;right:0;top:50%;height:2px}
  .dl-track i{position:absolute;left:42%;top:-6px;width:14px;height:14px;border-radius:8px}
  .contacts{position:absolute;display:grid;gap:10px}
  .crow{display:grid;grid-template-columns:52px auto;font-size:28px;letter-spacing:.04em}
  .frame{position:absolute;inset:40px;border:3px solid var(--f)}
  .frame::after{content:"";position:absolute;inset:10px;border:1px solid var(--f);opacity:.5}
  .zone{position:absolute;font-size:20px;color:#6b7178}
  .tblock{position:absolute;border-collapse:collapse;font-size:24px;letter-spacing:.1em;text-transform:uppercase}
  .tblock td{border:2px solid var(--t);padding:12px 18px}
  .tblock td.k{width:1%;white-space:nowrap;color:#6b7178}
  .plate{position:absolute;border:2px solid}
  .pbar{display:flex;justify-content:space-between;align-items:center;padding:18px 32px;border-bottom:2px solid;font-size:26px;letter-spacing:.16em}
  .kv div{display:grid;grid-template-columns:120px auto;font-size:27px;letter-spacing:.04em;margin-top:10px}
  .tags{width:calc(100% - 80px);margin:26px 40px 0;border-collapse:collapse;font-size:28px;letter-spacing:.04em}
  .tags td{padding:13px 0;border-bottom:2px solid var(--l)}
  .tags td:last-child{text-align:right}
  .rivet{position:absolute;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#f4f5f2,#8d9291 70%);box-shadow:0 1px 0 #fff}
  .fields{margin:30px 58px 0;display:grid;gap:14px;color:#1b1f23}
  .fields div{display:grid;grid-template-columns:210px auto;font-size:28px;letter-spacing:.03em;border-bottom:2px solid #9ea3a2;padding-bottom:10px}
  .fields span{font-size:22px;letter-spacing:.16em;color:#5b6166;align-self:center}
  .fields em{font-style:normal}
`;

/* ───────────── Output ───────────── */
const page = (body, extra = "") => `<!doctype html><html><head><meta charset="utf-8"><style>${css}${extra}</style></head><body>${body}</body></html>`;

// 1. All faces at print size (for export).
fs.writeFileSync(
  path.join(here, "cards.html"),
  page(
    designs.map((d) => `<div data-face="card-${d.id}-front">${d.front}</div><div data-face="card-${d.id}-back">${d.back}</div>`).join(""),
    "body{background:#777}",
  ),
);

// 2. Comparison sheets, three designs each.
const sheetCss = `
  body{background:#1b1d20;color:#efefeb;font-family:Geist,sans-serif;padding:56px;width:1300px}
  h1{font-size:40px;font-weight:600;letter-spacing:-.02em;text-transform:uppercase}
  .intro{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:1px solid rgba(255,255,255,.14);padding-bottom:24px;margin-bottom:34px}
  .intro p{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.14em;color:#9ba1a8;text-transform:uppercase}
  .row{margin-bottom:40px}
  .row h2{font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:.14em;text-transform:uppercase;display:flex;gap:16px;margin-bottom:14px}
  .row h2 b{color:#3ee08f;font-weight:500} .row h2 span{color:#9ba1a8}
  .pair{display:flex;gap:28px}
  .face{zoom:.56;outline:2px solid rgba(255,255,255,.14);box-shadow:0 20px 50px rgba(0,0,0,.45)}
  .lab{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.16em;color:#7d848b;margin-top:10px;text-transform:uppercase}
`;
[designs.slice(0, 3), designs.slice(3)].forEach((group, i) => {
  const rows = group
    .map(
      (d) => `
    <section class="row">
      <h2><b>Card ${d.id}</b>${d.name}<span>· ${d.note}</span></h2>
      <div class="pair">
        <div><div class="face">${d.front}</div><div class="lab">Front</div></div>
        <div><div class="face">${d.back}</div><div class="lab">Back</div></div>
      </div>
    </section>`,
    )
    .join("");
  fs.writeFileSync(
    path.join(here, `sheet-${i + 1}.html`),
    page(
      `<div class="intro"><h1>ALAUKIK — business cards (${i + 1}/2)</h1><p>3.5 × 2 in · 300 dpi · placeholder contact details</p></div>${rows}`,
      sheetCss,
    ),
  );
});
console.log("written:", designs.length, "designs");
