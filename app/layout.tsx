import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://classiccarradar.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Classic Car Radar — Trusted Intelligence for the Classic Car Enthusiast",
    template: "%s · Classic Car Radar",
  },
  description:
    "Trusted intelligence for the classic car enthusiast. Signals worth watching. Opportunities worth pursuing. CCR helps collectors navigate the classic and collectible car market with confidence, context, and clarity.",
  applicationName: "Classic Car Radar",
  authors: [{ name: "Classic Car Radar" }],
  keywords: [
    "classic car",
    "collector car",
    "collectible car intelligence",
    "Porsche 911",
    "Ferrari",
    "auction comps",
    "market intelligence",
    "private beta",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Classic Car Radar",
    title: "Classic Car Radar — Trusted Intelligence for the Classic Car Enthusiast",
    description:
      "Signals worth watching. Opportunities worth pursuing. Editorial market intelligence for the classic and collectible car enthusiast.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Classic Car Radar",
    description:
      "Trusted intelligence for the classic car enthusiast. Signals worth watching. Opportunities worth pursuing.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0E1014" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1014" },
  ],
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
      className={`${sourceSerif.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
