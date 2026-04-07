import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "JF Inoxidable | Bumpers y Lujos en Acero Inoxidable para Tractomulas — Bogotá",
  description:
    "Fabricamos bumpers, tanques, cajas y estribos en acero inoxidable para tractomulas Kenworth, Freightliner, Scania y Volvo. Acabado espejo, sobre medida. Bogotá, Colombia. Cotiza por WhatsApp.",
  keywords: [
    "bumpers acero inoxidable Bogotá",
    "lujos para tractomulas Colombia",
    "fabricación accesorios camión Kenworth",
    "tanques inoxidable tractomula",
    "cajas herramientas camión carga pesada",
    "taller lujos camión Bogotá",
  ],
  openGraph: {
    title: "JF Inoxidable — Lujos en Acero 304 para Tractomulas",
    description:
      "Fabricación a la medida de bumpers, tanques y accesorios en acero inoxidable para camiones de carga pesada. Bogotá, Colombia.",
    locale: "es_CO",
    type: "website",
    siteName: "JF Inoxidable",
  },
  alternates: {
    canonical: "https://inoxidablejf.com",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
