import { ImageResponse } from "next/og";

export const alt = "NATLE Technologies — Enterprise AI Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "#070d24",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top brand header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0052FF 0%, #00D2FF 50%, #10E599 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "26px",
                fontWeight: 900,
              }}
            >
              N
            </div>
            <div style={{ display: "flex", fontSize: "32px", fontWeight: 900, letterSpacing: "-0.03em" }}>
              <span>NATLE</span>
              <span style={{ color: "#0ea5e9" }}>.</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(14, 165, 233, 0.35)",
              background: "rgba(14, 165, 233, 0.12)",
              color: "#38bdf8",
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <span>Enterprise AI Platform</span>
          </div>
        </div>

        {/* Center Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "58px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            <span>Architecting High-Reliability,</span>
            <span style={{ color: "#38bdf8" }}>Sovereign Enterprise AI.</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "21px",
              color: "#94a3b8",
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            <span>Clinical Diagnostics Vision &bull; AgriTech Telemetry Mesh &bull; Edge Inference Runtime</span>
          </div>
        </div>

        {/* Footer Metrics & Institutional Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "36px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: 900, color: "#38bdf8" }}>98.2%</span>
              <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Accuracy</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: 900, color: "#10e599" }}>SOC 2 Type II</span>
              <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Certified</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: 900, color: "#a78bfa" }}>HIPAA BAA</span>
              <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Healthcare Ready</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: 900, color: "#f59e0b" }}>Air-Gapped</span>
              <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Sovereign AI</span>
            </div>
          </div>

          <div style={{ display: "flex", fontSize: "15px", color: "#94a3b8", fontWeight: 700 }}>
            <span>natle.com</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
