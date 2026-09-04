import type { Metadata } from "next";
import { Inter, Space_Grotesk, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import SecurityShield from "@/components/common/SecurityShield";
import NatleAIAssistant from "@/components/interactive/NatleAIAssistant";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: "NATLE Technologies | Enterprise AI — Innovate • Build • Grow",
  description: "NATLE delivers sovereign, HIPAA-compliant enterprise AI across Healthcare, Agriculture, Retail POS, EdTech, and HR. Deployed from Colombo, Sri Lanka to 5 continents.",
  keywords: "enterprise AI, healthcare AI, agriculture AI, POS intelligence, EdTech AI, HR analytics, NATLE Technologies, Sri Lanka AI company",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} font-sans bg-[#070d24] text-[#e8f0fe] antialiased`}>
        <ThemeProvider>
          {children}
          <NatleAIAssistant />
          <SecurityShield />
        </ThemeProvider>
      </body>
    </html>
  );
}
