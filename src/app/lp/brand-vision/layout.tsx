import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BasicHeader from "@/components/lp/basic/BasicHeader";
import { getAvailableSeats } from "@/lib/seats";

export const metadata: Metadata = {
  title: "理念・想いをブランドに変えたい起業家へ｜MVV策定から始まるブランディング | Growth Design Partners",
  description:
    "想いはあるのに言語化できない方へ。ミッション・ビジョン・バリュー（MVV）の策定から、ターゲットに届くブランドストーリーを構築します。女性起業家・スタートアップ向け。¥298,000の一括パッケージ。",
  keywords: "ブランディング 理念 言語化, MVV 策定 起業家, 女性起業家 ブランディング, ブランドストーリー, ミッション ビジョン バリュー 策定",
  openGraph: {
    title: "理念・想いをブランドに変えたい起業家へ｜MVV策定から始まるブランディング",
    description: "頭の中の想いを、ターゲットに届くブランドストーリーに翻訳します。理念起点の戦略設計。",
    type: "website",
    locale: "ja_JP",
    siteName: "株式会社Growth Design Partners",
  },
};

export default function BrandVisionLayout({ children }: { children: React.ReactNode }) {
  const seats = getAvailableSeats();
  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50 bg-gradient-to-r from-[#15447b] via-[#1a5494] to-[#15447b] text-white shadow-md">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-10 flex items-center justify-between text-[12px] sm:text-[13px] font-bold gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="bg-[#fbbf24] text-[#0a1f3d] px-2 py-0.5 text-[10px] font-black tracking-widest shrink-0">限定</span>
            <span className="hidden sm:inline">毎月5社限定受付！</span>
            <span>今月残り</span>
            <span className="inline-flex items-baseline px-1.5 bg-[#fbbf24] text-[#7c2d12] font-black text-[16px] tabular-nums leading-none py-0.5 animate-pulse">{seats}</span>
            <span>社</span>
          </div>
          <a href="#cta" className="hidden md:flex items-center gap-2 text-[11px] opacity-90 hover:opacity-100 hover:underline underline-offset-2 transition">
            <span>▶</span><span>無料相談はこちら</span>
          </a>
        </div>
      </div>
      <BasicHeader />
      <main className="pt-[104px]">{children}</main>
      <footer className="bg-[#060d1c] py-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <Link href="/">
            <Image src="/logo-white.png" alt="Growth Design Partners" width={180} height={46} className="h-7 w-auto" />
          </Link>
          <p className="mt-4 text-[12px] text-white/50 leading-[1.85] max-w-md">
            スタートアップ・中小企業向け ブランディング × DX 支援。<br />
            〒530-0057 大阪市北区曽根崎2-16-19<br />
            メッセージ梅田ビル 1階 ONthe UMEDA内<br />
            © {new Date().getFullYear()} 株式会社Growth Design Partners
          </p>
        </div>
      </footer>
    </>
  );
}
