import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductphotoHeader from "@/components/lp/productphoto/ProductphotoHeader";

export const metadata: Metadata = {
  title: "商品撮影代行 | 月額定額・EC特化フォトサービス",
  description:
    "月額定額で商品撮影を継続的に。アパレルから雑貨まで、EC特化の撮影代行サービス。フルカスタム対応・レタッチ込み。先着3社限定特典あり。まずは無料相談から。",
  alternates: {
    canonical: "https://gdesign-partners.co.jp/lp/productphoto/",
  },
};

export default function ProductphotoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Urgency banner */}
      <div className="fixed top-0 inset-x-0 z-50 bg-[#0a1f3d] text-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 h-10 flex items-center justify-between text-[12px] sm:text-[13px] gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="bg-[#E8602C] text-white px-2 py-0.5 text-[10px] font-bold tracking-widest shrink-0">先行限定</span>
            <span className="text-white/80">初回3社限定 — 専任ディレクター・出張費・レタッチ強化が</span>
            <span className="font-bold text-[#E8602C]">2ヶ月無料</span>
          </div>
          <a href="#contact" className="hidden md:flex items-center gap-1.5 text-[11px] text-white/60 hover:text-white transition shrink-0">
            <span>詳細を見る →</span>
          </a>
        </div>
      </div>

      <ProductphotoHeader />

      {/* pt = banner(40px) + header(64px) */}
      <main className="pt-[104px]">{children}</main>

      <footer className="bg-[#0a1f3d] py-10">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
          <Link href="/">
            <Image
              src="/logo-white.png"
              alt="Growth Design Partners"
              width={160}
              height={40}
              className="h-7 w-auto"
            />
          </Link>
          <p className="mt-4 text-[12px] text-white/40 leading-[1.85] max-w-md">
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
