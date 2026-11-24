import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
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

const title = "Adrian Higa — Software Engineer .NET & IA";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s — Adrian Higa" },
  description: site.description,
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  keywords: [
    "Software Engineer",
    "Desenvolvedor .NET",
    "Desenvolvedor .NET Sênior",
    "C#",
    "ASP.NET Core",
    "IA generativa",
    "Agentes de IA",
    "Claude Code",
    "LLM",
    "RabbitMQ",
    "AWS",
    "Docker",
    "DevSecOps",
    "APIs REST"
  ],
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${site.url}/`,
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: "Adrian Higa — Software Engineer .NET & IA" }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [`${site.url}/og.png`]
  },
  icons: { icon: `${site.url}/favicon.svg` }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070b16",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: `${site.url}/`,
    email: `mailto:${site.email}`,
    jobTitle: site.role,
    address: { "@type": "PostalAddress", addressLocality: "Paulínia", addressRegion: "SP", addressCountry: "BR" },
    sameAs: [site.linkedin, site.github],
    knowsAbout: [".NET", "C#", "ASP.NET Core", "Generative AI", "AI Agents", "RabbitMQ", "AWS", "Docker", "DevSecOps"]
  };

  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        {children}
        <RevealObserver />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
