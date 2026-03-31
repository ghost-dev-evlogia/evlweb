import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";
import { AuthLoader } from "@/components/auth-loader";

const SHOW_AUTH_LOADER = false;

const inter = Inter({
  variable: "--font-inter",
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
  title: "Evlogia | Applied AI Research",
  description:
    "Evlogia is an Applied AI Research company. We partner with enterprises and research institutions to solve complex AI problems, build production systems, file patents, and publish research.",
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
    title: "Evlogia | Applied AI Research",
    description:
      "Applied AI Research: R&D consulting, proprietary products, patents, and research publications.",
    url: "https://evlogia.ai",
    siteName: "Evlogia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Evlogia: The Applied AI Lab That Ships.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evlogia | Applied AI Research",
    description: "Applied AI Research: R&D consulting, products, patents, and research.",
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
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {SHOW_AUTH_LOADER && <AuthLoader />}
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
