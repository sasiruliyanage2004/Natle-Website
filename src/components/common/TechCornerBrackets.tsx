"use client";

import React from "react";

interface TechCornerBracketsProps {
  color?: string;
  size?: number;
  offset?: number;
  className?: string;
}

export function TechCornerBrackets({
  color = "rgba(14, 165, 233, 0.6)",
  size = 10,
  offset = 8,
  className = "",
}: TechCornerBracketsProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 select-none ${className}`} aria-hidden="true">
      {/* Top Left ┌ */}
      <span
        className="absolute transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
        style={{
          top: `${offset}px`,
          left: `${offset}px`,
          width: `${size}px`,
          height: `${size}px`,
          borderTop: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
        }}
      />

      {/* Top Right ┐ */}
      <span
        className="absolute transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
        style={{
          top: `${offset}px`,
          right: `${offset}px`,
          width: `${size}px`,
          height: `${size}px`,
          borderTop: `1.5px solid ${color}`,
          borderRight: `1.5px solid ${color}`,
        }}
      />

      {/* Bottom Left └ */}
      <span
        className="absolute transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
        style={{
          bottom: `${offset}px`,
          left: `${offset}px`,
          width: `${size}px`,
          height: `${size}px`,
          borderBottom: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
        }}
      />

      {/* Bottom Right ┘ */}
      <span
        className="absolute transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
        style={{
          bottom: `${offset}px`,
          right: `${offset}px`,
          width: `${size}px`,
          height: `${size}px`,
          borderBottom: `1.5px solid ${color}`,
          borderRight: `1.5px solid ${color}`,
        }}
      />
    </div>
  );
}