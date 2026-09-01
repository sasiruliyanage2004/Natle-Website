"use client";

export default function NEmblem({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nRibbon" x1="10" y1="8" x2="30" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0052FF" />
          <stop offset="1" stopColor="#00D2FF" />
        </linearGradient>
        <linearGradient id="nSwoop" x1="20" y1="46" x2="56" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#10E599" />
          <stop offset="1" stopColor="#00D2FF" />
        </linearGradient>
      </defs>

      {/* orbiting halo arc */}
      <circle
        cx="32"
        cy="32"
        r="27"
        stroke="#0052FF"
        strokeOpacity="0.18"
        strokeWidth="1.4"
        strokeDasharray="3 6"
      />

      {/* folded ribbon pillar */}
      <path d="M14 10 L14 54 L22 54 L22 26 L14 10 Z" fill="url(#nRibbon)" />
      <path d="M22 26 L22 54 L30 54 L30 40 L22 26 Z" fill="#071326" fillOpacity="0.85" />

      {/* diagonal cyan/green swoop */}
      <path
        d="M22 54 C 30 46, 40 44, 50 22"
        stroke="url(#nSwoop)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* rising IoT pixel data matrix */}
      <rect x="46" y="30" width="4" height="4" rx="1" fill="#84CC16" />
      <rect x="52" y="24" width="4" height="4" rx="1" fill="#10E599" />
      <rect x="48" y="18" width="4" height="4" rx="1" fill="#00D2FF" />
      <rect x="54" y="12" width="4" height="4" rx="1" fill="#0052FF" />
    </svg>
  );
}
