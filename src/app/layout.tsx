import type { Metadata } from "next";
import { display, body } from "./fonts";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothCursor from "@/components/SmoothCursor";

export const metadata: Metadata = {
  title: "NATLE | Engineering the Future",
  description:
    "We design and engineer the software that lets ambitious teams innovate, build, and grow faster. Expert custom software development, Web3, and enterprise solutions.",
  openGraph: {
    title: "NATLE | Engineering the Future",
    description: "Expert custom software development, Web3, and enterprise solutions.",
    url: "https://natle.com",
    siteName: "NATLE Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NATLE | Engineering the Future",
    description: "Expert custom software development, Web3, and enterprise solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('natle_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-body bg-paper text-ink selection:bg-primary/20 selection:text-primary flex flex-col min-h-screen antialiased">
        <SmoothCursor />
        <Preloader />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1 flex flex-col pt-[76px]">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
