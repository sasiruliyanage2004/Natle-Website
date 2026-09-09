export default function AmbientBackground({
  variant = "default",
}: {
  variant?: "default" | "reversed";
}) {
  const positions =
    variant === "reversed"
      ? [
          "absolute -top-24 -right-20 w-[600px] h-[600px] rounded-full bg-lime/10 blur-[130px]",
          "absolute top-1/2 -left-24 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-azure/10 blur-[140px]",
          "absolute -bottom-20 right-1/3 w-[500px] h-[400px] rounded-full bg-teal/10 blur-[150px]",
        ]
      : [
          "absolute -top-24 -left-20 w-[600px] h-[600px] rounded-full bg-azure/10 blur-[130px]",
          "absolute top-1/2 -right-24 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-teal/10 blur-[140px]",
          "absolute -bottom-20 left-1/3 w-[500px] h-[400px] rounded-full bg-lime/10 blur-[150px]",
        ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(rgba(10, 10, 10, 0.07) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className={`${positions[0]} animate-pulse`} style={{ animationDuration: "8s" }} />
      <div className={`${positions[1]} animate-pulse`} style={{ animationDuration: "10s" }} />
      <div className={`${positions[2]} animate-pulse`} style={{ animationDuration: "12s" }} />
    </div>
  );
}
