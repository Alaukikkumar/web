import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const dynamic = "force-static";
export const alt = `${site.name} — ${site.longRole}: SCADA, PLC, EMS and industrial data`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const path = ["SENSOR", "PLC", "SCADA", "DATABASE", "REPORT"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#08090a",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          color: "#efefeb",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 3, color: "#9ba1a8" }}>
          <div style={{ width: 14, height: 14, background: "#3ee08f" }} />
          ALAUKIK / AUTOMATION ENGINEER
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3, fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
            <span>I CONNECT MACHINES,</span>
            <span>
              DATA AND PEOPLE<span style={{ color: "#3ee08f" }}>.</span>
            </span>
          </div>
          <div style={{ fontSize: 26, color: "#9ba1a8", letterSpacing: 2 }}>SCADA • PLC • EMS • INDUSTRIAL COMMUNICATION • SQL • IIOT</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 20, letterSpacing: 3, color: "#7d848b" }}>
          {path.map((node, i) => (
            <div key={node} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, border: "2px solid #3ee08f" }} />
                {node}
              </div>
              {i < path.length - 1 && <div style={{ width: 110, height: 2, background: "rgba(255,255,255,0.2)", margin: "0 18px" }} />}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
