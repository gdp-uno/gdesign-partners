import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ElearningHeader from "@/components/lp/elearning/ElearningHeader";

export const metadata: Metadata = {
  title: "生成AI eラーニング | チーム全員がAIを使いこなせる会社へ",
  description:
    "月額5,000円/人から。600社・4,000名が選んだ実務直結型・生成AI eラーニング。400コンテンツ以上、業務別カリキュラム、AI倫理・セキュリティ対応。法人向けライセンス販売。",
  alternates: {
    canonical: "https://gdesign-partners.co.jp/lp/elearning/",
  },
};

export default function ElearningLpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Urgency banner */}
      <div className="fixed top-0 inset-x-0 z-50 bg-gradient-to-r from-[#0a1f3d] via-[#15447b] to-[#0a1f3d] text-white shadow-md">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-10 flex items-center justify-between text-[12px] sm:text-[13px] font-bold gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="bg-[#fbbf24] text-[#0a1f3d] px-2 py-0.5 text-[10px] font-black tracking-widest shrink-0">今月限定</span>
            <span className="hidden sm:inline">法人向けライセンス 先着受付中！</span>
            <span>月額</span>
            <span className="inline-flex items-baseline px-1.5 bg-[#fbbf24] text-[#0a1f3d] font-black text-[14px] tabular-nums leading-none py-0.5">5,000</span>
            <span>円/人〜</span>
          </div>
          <a href="#cta" className="hidden md:flex items-center gap-2 text-[11px] opacity-90 hover:opacity-100 hover:underline underline-offset-2 transition">
            <span>▶</span><span>無料資料請求はこちら</span>
          </a>
        </div>
      </div>

      <ElearningHeader />

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
