import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuroraBackdrop from "@/components/AuroraBackdrop";
import SmoothScroll from "@/components/SmoothScroll";
import CTAFooter from "@/components/CTAFooter";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NATLE Technologies — Enterprise AI, Engineered",
  description:
    "NATLE builds and operates AI systems for enterprises that can't afford to guess.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden" style={{ background: "#f8faff", color: "#0a1628" }}>
        <SmoothScroll>
          <AuroraBackdrop />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <CTAFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
