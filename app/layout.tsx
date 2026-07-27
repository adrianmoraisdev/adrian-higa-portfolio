import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Adrian Higa — Software Engineer, .NET, IA & Automação",
    template: "%s — Adrian Higa"
  },
  description: site.description,
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  keywords: [
    "Software Engineer",
    ".NET",
    "C#",
    "ASP.NET Core",
    "IA aplicada",
    "Agentes de IA",
    "Automação",
    "RPA",
    "APIs REST"
  ],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: "Adrian Higa — Intelligent Software Systems",
    description: site.description,
    images: [
      {
        url: `${site.url}/og.png`,
        width: 1200,
        height: 630,
        alt: "Arquitetura digital em preto e verde elétrico"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrian Higa — Intelligent Software Systems",
    description: site.description,
    images: [`${site.url}/og.png`]
  },
  icons: { icon: `${site.url}/favicon.svg` }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050706",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: "Software Engineer",
    sameAs: [site.linkedin, site.github],
    knowsAbout: [
      ".NET",
      "C#",
      "ASP.NET Core",
      "Artificial Intelligence",
      "Automation",
      "RPA"
    ]
  };

  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
