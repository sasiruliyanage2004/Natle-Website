export function FieldOSBlueprint() {
  return (
    <svg viewBox="0 0 480 320" className="w-full h-auto">
      <defs>
        <pattern id="grid1" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#0052FF" strokeOpacity="0.08" />
        </pattern>
      </defs>
      <rect width="480" height="320" fill="url(#grid1)" />
      <circle cx="240" cy="160" r="34" fill="none" stroke="#0052FF" strokeWidth="1.5" />
      <text x="240" y="164" textAnchor="middle" className="font-data" fontSize="10" fill="#0052FF">
        FieldOS
      </text>
      {[
        [80, 60], [400, 60], [80, 260], [400, 260], [50, 160], [430, 160],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1={240} y1={160} x2={x} y2={y} stroke="#00D2FF" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.6" />
          <circle cx={x} cy={y} r="7" fill="#00D2FF" fillOpacity="0.85" />
        </g>
      ))}
      <circle cx={240} cy={160} r="3" fill="#0052FF" />
    </svg>
  );
}

export function YieldAIBlueprint() {
  const points = [40, 90, 70, 120, 100, 150, 140, 190, 165, 220, 195, 240, 230];
  const path = points.map((v, i) => `${i === 0 ? "M" : "L"}${i * 36},${260 - v}`).join(" ");
  const bandTop = points.map((v, i) => `${i === 0 ? "M" : "L"}${i * 36},${260 - v - 22}`).join(" ");
  const bandBottom = points.map((v, i) => `L${(points.length - 1 - i) * 36},${260 - points[points.length - 1 - i] + 18}`).join(" ");
  return (
    <svg viewBox="0 0 480 300" className="w-full h-auto">
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" x2="480" y1={i * 60} y2={i * 60} stroke="#059669" strokeOpacity="0.08" />
      ))}
      <path d={`${bandTop} ${bandBottom} Z`} fill="#10E599" fillOpacity="0.15" />
      <path d={path} fill="none" stroke="#059669" strokeWidth="2" />
      {points.map((v, i) => (
        <circle key={i} cx={i * 36} cy={260 - v} r="3" fill="#059669" />
      ))}
      <text x="12" y="24" className="font-data" fontSize="10" fill="#059669">
        yield forecast, ±confidence band
      </text>
    </svg>
  );
}

export function TraceLinkBlueprint() {
  return (
    <svg viewBox="0 0 480 200" className="w-full h-auto">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={20 + i * 76} y="70" width="56" height="56" rx="8" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
          <text x={48 + i * 76} y="103" textAnchor="middle" className="font-data" fontSize="9" fill="#F59E0B">
            {`0x${(i + 1).toString(16).padStart(2, "0")}`}
          </text>
          {i < 5 && (
            <line x1={76 + i * 76} y1="98" x2={96 + i * 76} y2="98" stroke="#F59E0B" strokeWidth="1.5" />
          )}
        </g>
      ))}
    </svg>
  );
}
