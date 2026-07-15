import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DxHeader from "@/components/lp/dx/DxHeader";

export const metadata: Metadata = {
  title: "DX・業務効率化支援 | 定型業務を仕組みに任せて、経営戦略に集中する",
  description:
    "スタートアップ・少人数組織の社長・責任者へ。定型業務をAI×ノーコードで自動化し、月72時間を取り戻します。初回相談30分無料。先着10社限定。",
  alternates: {
    canonical: "https://gdesign-partners.co.jp/lp/dx/",
  },
};

export default function DxLpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Urgency banner */}
      <div className="fixed top-0 inset-x-0 z-50 bg-gradient-to-r from-[#dc2626] via-[#ef4444] to-[#dc2626] text-white shadow-md">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-10 flex items-center justify-between text-[12px] sm:text-[13px] font-bold gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="bg-white text-[#dc2626] px-2 py-0.5 text-[10px] font-black tracking-widest shrink-0">急募</span>
            <span className="hidden sm:inline">先着10社限定！</span>
            <span>残り</span>
            <span className="inline-flex items-baseline px-1.5 bg-[#fbbf24] text-[#7c2d12] font-black text-[16px] tabular-nums leading-none py-0.5 animate-pulse">6</span>
            <span>社のみ</span>
          </div>
          <a href="#cta" className="hidden md:flex items-center gap-2 text-[11px] opacity-90 hover:opacity-100 hover:underline underline-offset-2 transition">
            <span>▶</span><span>無料相談はこちら</span>
          </a>
        </div>
      </div>

      <DxHeader />

      {/* pt = banner(40px) + header(64px) */}
      <main className="pt-[104px]">{children}</main>

      <footer className="bg-[#060d1c] py-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <Link href="/">
            <Image
              src="/logo-white.png"
              alt="Growth Design Partners"
              width={180}
              height={46}
              className="h-7 w-auto"
            />
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
