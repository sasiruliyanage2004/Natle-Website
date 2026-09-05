import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NATLE Technologies — Enterprise AI, Engineered",
    short_name: "NATLE AI",
    description: "Architecting high-reliability, sovereign enterprise AI platforms across clinical diagnostics, agriculture, and automation.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8faff",
    theme_color: "#0ea5e9",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
