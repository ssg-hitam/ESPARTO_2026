import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { SkipLink } from "@/components/shared/SkipLink";
import { IntroProvider } from "@/context/IntroContext";
import { LayoutShell } from "@/components/layout/LayoutShell";
import "./globals.css";

const fontDisplay = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.espartohitam.com"),
  title: {
    default: "ESPARTO 2026 | HITAM Technical Fest",
    template: "%s | ESPARTO 2026",
  },
  description:
    "Official website of ESPARTO 2026, the annual technical fest of Hyderabad Institute of Technology and Management (HITAM). Ideas → Innovation → Impact.",
  icons: {
    icon: "/icons/esparto_official_logo.png",
    shortcut: "/icons/esparto_official_logo.png",
    apple: "/icons/esparto_official_logo.png",
  },
  keywords: [
    "ESPARTO 2026",
    "HITAM",
    "HITAM Technical Fest",
    "Hyderabad Technical Fest",
    "Engineering Fest Hyderabad",
    "Hackathon",
    "Robotics Competition",
    "Coding Fest",
  ],
  authors: [{ name: "HITAM Organizing Committee" }],
  openGraph: {
    title: "ESPARTO 2026 | HITAM Technical Fest",
    description:
      "Official website of ESPARTO 2026, the annual technical fest of Hyderabad Institute of Technology and Management (HITAM). October 09–10, 2026. Ideas → Innovation → Impact.",
    siteName: "ESPARTO 2026",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 576,
        alt: "ESPARTO 2026 - HITAM Annual Technical Fest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ESPARTO 2026 | HITAM Technical Fest",
    description:
      "Official website of ESPARTO 2026, the annual technical fest of Hyderabad Institute of Technology and Management (HITAM). October 09–10, 2026.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050212",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} dark`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="bg-background text-text-primary antialiased min-h-screen flex flex-col selection:bg-brand-magenta selection:text-white"
        suppressHydrationWarning
      >
        <IntroProvider>
          <SkipLink />
          {/*
           * LayoutShell is a client component that reads IntroContext.
           * During intro: Navbar + Footer have visibility:hidden so the
           * layout shell holds full min-h-screen height (no footer flash).
           * After intro: Navbar + Footer fade in alongside the hero.
           */}
          <LayoutShell>
            {children}
          </LayoutShell>
        </IntroProvider>
      </body>
    </html>
  );
}
