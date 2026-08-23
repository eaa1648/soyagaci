import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Dijital Aile Hafızası | Yapay Zekâ Destekli Soy Ağacı & Kültür Mirası",
  description: "Geçmişin hatıralarını, fotoğraflarını, ses kayıtlarını ve soy ağacını geleceğe taşıyan yeni nesil yapay zekâ destekli dijital aile arşivi platformu.",
  keywords: ["soy ağacı", "aile hafızası", "aile albümü", "yapay zeka soy ağacı", "dijital miras", "genealogy"],
  authors: [{ name: "Dijital Aile Hafızası" }],
  openGraph: {
    title: "Dijital Aile Hafızası | Yapay Zekâ Destekli Soy Ağacı",
    description: "Ailenizin fotoğraflarını, hikâyelerini ve köklerini modern dijital miras platformunda keşfedin.",
    type: "website",
    locale: "tr_TR",
  },
};

export const viewport: Viewport = {
  themeColor: "#060913",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
