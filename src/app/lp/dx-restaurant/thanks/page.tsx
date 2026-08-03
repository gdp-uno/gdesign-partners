"use client";

import { useEffect } from "react";
import Link from "next/link";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function DxRestaurantThanksPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        event_category: "lp_dx_restaurant",
        event_label: "form_complete",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1f3d] flex items-center justify-center px-4 py-20">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-[#fbbf24]/20 flex items-center justify-center mx-auto mb-5">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#fbbf24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">
          送信完了しました
        </h1>
        <p className="text-white/70 text-sm leading-relaxed mb-2">
          無料相談のお申し込みありがとうございます。
        </p>
        <p className="text-white/70 text-sm leading-relaxed mb-8">
          担当者より<span className="font-semibold text-[#fbbf24]">2営業日以内</span>にご連絡いたします。<br />
          しばらくお待ちください。
        </p>
        <div className="bg-white/5 rounded-xl p-4 mb-8 text-left border border-white/10">
          <p className="text-xs text-white/50 font-semibold mb-2">次のステップ</p>
          <ul className="space-y-1.5 text-sm text-white/70">
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] font-bold mt-0.5">1.</span>担当者からメールまたはお電話でご連絡</li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] font-bold mt-0.5">2.</span>お店の業務フローのヒアリング（30分）</li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] font-bold mt-0.5">3.</span>AI活用による業務効率化プランをご提案</li>
          </ul>
        </div>
        <Link
          href="/lp/dx-restaurant"
          className="inline-block bg-[#fbbf24] hover:bg-[#f59e0b] text-[#0a1f3d] font-bold px-8 py-3 rounded-lg text-sm transition-colors"
        >
          ページに戻る
        </Link>
      </div>
    </div>
  );
}
