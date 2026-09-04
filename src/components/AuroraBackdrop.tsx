export default function AuroraBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-base"
    >
      <div
        className="aurora-blob animate-drift h-[38rem] w-[38rem] bg-accent-cyan/10"
        style={{ top: "-10%", left: "-8%" }}
      />
      <div
        className="aurora-blob animate-drift h-[34rem] w-[34rem] bg-accent-lime/10"
        style={{ top: "20%", right: "-10%", animationDelay: "-6s" }}
      />
      <div
        className="aurora-blob animate-drift h-[30rem] w-[30rem] bg-accent-cyan/[0.08]"
        style={{ bottom: "-12%", left: "20%", animationDelay: "-11s" }}
      />
      {/* faint grid to give the navy field texture without competing with the glows */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#8C97BE 1px, transparent 1px), linear-gradient(90deg, #8C97BE 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
