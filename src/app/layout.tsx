import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import NatleAIAssistant from "@/components/interactive/NatleAIAssistant";
import GlobalSoundManager from "@/components/common/GlobalSoundManager";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: "NATLE | Innovate • Build • Grow",
  description: "Empowering Agriculture with Next-Gen Intelligence & Software Solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth" style={{ colorScheme: "light" }}>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#edf6f2] text-[#071326] antialiased`}>
        <ThemeProvider>
          <GlobalSoundManager />
          {children}
          <NatleAIAssistant />
        </ThemeProvider>
      </body>
    </html>
  );
}
