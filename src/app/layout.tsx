import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuroraBackdrop from "@/components/AuroraBackdrop";
import SmoothScroll from "@/components/SmoothScroll";
import CTAFooter from "@/components/CTAFooter";
import { TrustCenterProvider } from "@/components/trust/TrustCenterModal";
import StructuredData from "@/components/seo/StructuredData";

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
  metadataBase: new URL("https://natle.com"),
  title: {
    default: "NATLE Technologies — Enterprise AI, Engineered",
    template: "%s | NATLE Technologies",
  },
  description:
    "NATLE designs, deploys, and operates high-reliability, sovereign enterprise AI platforms across clinical healthcare diagnostics, agricultural telemetry, and enterprise automation.",
  keywords: [
    "Enterprise AI",
    "Clinical Diagnostics AI",
    "AgriTech Telemetry",
    "Sovereign AI",
    "Air-Gapped AI",
    "SOC 2 Type II",
    "HIPAA Compliant AI",
    "Edge Inference Runtime",
    "Next-Gen AI Systems",
  ],
  authors: [{ name: "NATLE Technologies Inc." }],
  creator: "NATLE Technologies",
  publisher: "NATLE Technologies",
  alternates: {
    canonical: "https://natle.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://natle.com",
    siteName: "NATLE Technologies",
    title: "NATLE Technologies — Enterprise AI, Engineered",
    description:
      "Architecting high-reliability, sovereign enterprise AI platforms across healthcare diagnostics, agricultural telemetry, and enterprise automation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NATLE Technologies — Enterprise AI, Engineered",
    description:
      "Architecting high-reliability, sovereign enterprise AI platforms across healthcare diagnostics, agricultural telemetry, and enterprise automation.",
    creator: "@natletech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="relative min-h-screen overflow-x-hidden" style={{ background: "#f8faff", color: "#0a1628" }}>
        <TrustCenterProvider>
          <SmoothScroll>
            <AuroraBackdrop />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <CTAFooter />
          </SmoothScroll>
        </TrustCenterProvider>
      </body>
    </html>
  );
}