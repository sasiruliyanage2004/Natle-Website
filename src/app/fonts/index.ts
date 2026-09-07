import localFont from "next/font/local";

export const display = localFont({
  src: "./SpaceGrotesk.ttf",
  variable: "--font-display",
  display: "swap",
});

export const body = localFont({
  src: [
    { path: "./Inter.ttf", style: "normal" },
    { path: "./Inter-Italic.ttf", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
});
