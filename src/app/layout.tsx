import type { Metadata, Viewport } from "next";
import { Pixelify_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";
import { PostHogProvider } from "@/components/posthog-provider";
import { CalInit } from "@/components/cal-init";

// Display / UI chrome: chunky pixel font.
const pixelify = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Body: VT323 — a crisp bitmap/terminal font that stays in the pixel world of
// the display font. Self-hosted so we can apply `size-adjust`: VT323's glyphs
// sit small in the em, so we scale them up ~18% for comfortable body reading
// without touching a single font-size across the site.
const vt323 = localFont({
  src: "./fonts/vt323.woff2",
  variable: "--font-body",
  display: "swap",
  declarations: [{ prop: "size-adjust", value: "118%" }],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Evlogia: we build hard things for fun",
  description:
    "A lean engineering team. Web, AI, hardware, firmware, whatever the problem needs. The difficult ones are the fun ones. That's the whole business model.",
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
    title: "Evlogia: we build hard things for fun",
    description:
      "A lean engineering team. The difficult problems are the fun ones. That's the whole business model.",
    url: "https://evlogia.ai",
    siteName: "Evlogia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-farm.png",
        width: 1200,
        height: 630,
        alt: "Pixel-art farm with the message: We build hard things for fun. Evlogia, evlogia.ai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evlogia: we build hard things for fun",
    description:
      "A lean engineering team. The difficult problems are the fun ones.",
    images: ["/og-farm.png"],
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
      data-scroll-behavior="smooth"
      className={`${pixelify.variable} ${vt323.variable} h-full antialiased no-js`}
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
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <PostHogProvider>
          <CalInit />
          <PageTransition>{children}</PageTransition>
        </PostHogProvider>
      </body>
    </html>
  );
}
