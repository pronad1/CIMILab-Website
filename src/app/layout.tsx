import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteConfig } from "@/lib/content";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: {
    default: `${config.shortName} — ${config.labName}`,
    template: `%s | ${config.shortName}`,
  },
  description: config.motto,
  keywords: [
    "CIMILab",
    "Computation Informatics",
    "Machine Intelligence",
    "Medical AI",
    "Research Lab",
    "Deep Learning",
    "Medical Image Segmentation",
    "Trustworthy AI",
  ],
  authors: [{ name: config.shortName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: config.labName,
    title: config.labName,
    description: config.motto,
  },
  twitter: {
    card: "summary_large_image",
    title: config.labName,
    description: config.motto,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
