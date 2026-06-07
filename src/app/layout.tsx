import type { Metadata } from "next";
import { Geist, Zen_Kaku_Gothic_New, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import GSAPInit from "@/components/GSAPInit";
import { SITE_URL, ORGANIZATION } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});
const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "株式会社Growth Design Partners | ブランディング・DX・業務設計",
    template: "%s | Growth Design Partners",
  },
  description:
    "中小企業・スタートアップの成長を支援。ブランドパッケージ・DX推進・eラーニング・撮影代行など、ビジネスの課題をワンストップで解決します。大阪市北区拠点。",
  keywords: "ブランディング,DX,業務設計,大阪,スタートアップ,中小企業",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "株式会社Growth Design Partners",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// 構造化データ（Organization）。検索エンジンに会社情報を明示。
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: ORGANIZATION.name,
  url: ORGANIZATION.url,
  logo: ORGANIZATION.logo,
  email: ORGANIZATION.email,
  telephone: ORGANIZATION.telephone,
  address: {
    "@type": "PostalAddress",
    postalCode: ORGANIZATION.address.postalCode,
    addressRegion: ORGANIZATION.address.addressRegion,
    addressLocality: ORGANIZATION.address.addressLocality,
    streetAddress: ORGANIZATION.address.streetAddress,
    addressCountry: ORGANIZATION.address.addressCountry,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${zenKaku.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <GSAPInit />
        {children}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
