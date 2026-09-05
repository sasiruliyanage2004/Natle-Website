"use client";

export default function AuroraBackdrop() {
 return (
 <div
 className="fixed inset-0 pointer-events-none overflow-hidden"
 style={{ zIndex: 0 }}
 aria-hidden
 >
 {/* ── Soft white-blue base ── */}
 <div
 className="absolute inset-0"
 style={{
 background: "radial-gradient(ellipse 130% 70% at 50% -10%, #dbeafe 0%, #f8faff 50%)",
 }}
 />

 {/* ── Cyan glow — top right (light, airy) ── */}
 <div
 className="absolute"
 style={{
 top: "-8%",
 right: "0%",
 width: "700px",
 height: "600px",
 background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, rgba(14,165,233,0.03) 50%, transparent 70%)",
 filter: "blur(80px)",
 }}
 />

 {/* ── Lime glow — bottom left ── */}
 <div
 className="absolute"
 style={{
 bottom: "-5%",
 left: "5%",
 width: "600px",
 height: "500px",
 background: "radial-gradient(circle, rgba(90,236,143,0.10) 0%, rgba(90,236,143,0.02) 50%, transparent 70%)",
 filter: "blur(100px)",
 }}
 />

 {/* ── Navy blue soft center ── */}
 <div
 className="absolute"
 style={{
 top: "20%",
 left: "20%",
 width: "800px",
 height: "500px",
 background: "radial-gradient(circle, rgba(26,58,143,0.06) 0%, transparent 65%)",
 filter: "blur(100px)",
 }}
 />

 {/* ── Very subtle dot grid ── */}
 <div
 className="absolute inset-0 dot-grid"
 style={{ opacity: 0.5 }}
 />
 </div>
 );
}
