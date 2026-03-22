import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Evlogia | Applied AI Research",
  description:
    "Evlogia is an Applied AI Research company — we partner with enterprises and research institutions to solve complex AI problems, build production systems, file patents, and publish research.",
  metadataBase: new URL("https://evlogia.ai"),
  openGraph: {
    title: "Evlogia | Applied AI Research",
    description:
      "Applied AI Research — R&D consulting, proprietary products, patents, and research publications.",
    url: "https://evlogia.ai",
    siteName: "Evlogia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evlogia — The Applied AI Lab That Ships.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evlogia | Applied AI Research",
    description: "Applied AI Research — R&D consulting, products, patents, and research.",
    images: ["/og-image.png"],
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
        {children}
      </body>
    </html>
  );
}
