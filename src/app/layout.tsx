import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionController } from "@/components/providers/MotionController";
import { JsonLd } from "@/components/seo/JsonLd";
import { InlineScript } from "@/components/theme/InlineScript";
import { DEFAULT_THEME, THEME_COLORS, themeInitScript } from "@/components/theme/theme";
import { site } from "@/data/site";
import { graph, personNode, websiteNode } from "@/lib/seo";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.name} — ${site.longRole}`,
    title: site.title,
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
  category: "technology",
  applicationName: site.brand,
  // Search engine ownership checks (HTML-tag method) — set these env vars once the domain is live.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLORS[DEFAULT_THEME],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeInitScript} />
        <JsonLd data={graph(personNode, websiteNode)} />
      </head>
      <body className="min-h-dvh bg-bg text-fg">
        <a
          href="#main"
          className="btn btn-primary fixed left-4 top-4 z-[60] -translate-y-24 focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MotionController />
      </body>
    </html>
  );
}
