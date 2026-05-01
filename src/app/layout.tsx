import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";
import { AuthLoader } from "@/components/auth-loader";

const SHOW_AUTH_LOADER = false;

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Evlogia | Product, Platform & Applied AI Engineering",
  description:
    "Evlogia is a product and engineering team. We scope, design, build, and ship production AI systems, internal tools, IoT, and platforms for teams that need to ship in months — not just prototype in slides.",
  metadataBase: new URL("https://evlogia.ai"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Evlogia | The Applied AI Team That Ships",
    description:
      "Production AI, internal tools, IoT, and platforms. Scoped properly, built cleanly, shipped on time.",
    url: "https://evlogia.ai",
    siteName: "Evlogia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Evlogia: The Applied AI Team That Ships.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evlogia | The Applied AI Team That Ships",
    description: "Production AI, internal tools, IoT, and platforms — built and shipped, not pitched.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrumentSerif.variable} h-full antialiased no-js`}
      suppressHydrationWarning
    >
      <head>
        {/* Drop the no-js class as soon as JS runs, so reveal animations stay
            opt-in for crawlers / no-JS users while normal visitors get the
            choreographed entry. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a href="#main" className="skip-link">Skip to content</a>
        {SHOW_AUTH_LOADER && <AuthLoader />}
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
