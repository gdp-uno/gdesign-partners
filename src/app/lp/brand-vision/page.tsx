"use client";

import { useState, useEffect } from "react";
import { useScrollTracking } from "@/lib/useScrollTracking";
import { getAvailableSeats } from "@/lib/seats";

declare global { interface Window { gtag?: (...args: unknown[]) => void; } }
function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.gtag) window.gtag("event", name, params);
}
function Ico({ d, size = 20, className = "" }: { d: string; size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d={d} /></svg>;
}
const I = {
  arrow:  "M5 12h14M13 6l6 6-6 6", check: "M4 12l5 5L20 6", x: "M18 6 6 18M6 6l12 12",
  clock:  "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM12 7v5l3 2",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5",
  chart:  "M3 3v18h18M7 14l4-4 3 3 6-7", brain: "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM9 9h.01M15 9h.01M9 14c1.5 1.5 4.5 1.5 6 0",
  doc:    "M7 3h7l5 5v13H7zM14 3v5h5M9 13h8M9 17h8M9 9h3",
  bolt:   "M13 2 4 14h7l-1 8 9-12h-7z", fire: "M12 2c0 4-5 6-5 11a5 5 0 0 0 10 0c0-2-1-3-2-4 0 2-1 3-2 3 0-4 1-6-1-10z",
  target: "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  plus:   "M12 5v14M5 12h14", minus: "M5 12h14",
  pen:    "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  star:   "M12 2l2.6 6.5L22 9.5l-5.5 4.7L18 22l-6-3.5L6 22l1.5-7.8L2 9.5l7.4-1z",
  heart:  "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  book:   "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5z",
};
function Kicker({ jp, en, color = "#15447b" }: { jp: string; en: string; color?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 mb-6">
      <div className="font-mono text-[11px] tracking-[0.4em] font-bold" style={{ color }}>{en}</div>
      <div className="flex items-center gap-2">
        <span className="w-6 h-px" style={{ background: color }} />
        <span className="font-bold text-[12px] tracking-[0.3em]" style={{ color }}>{jp}</span>
        <span className="w-6 h-px" style={{ background: color }} />
      </div>
    </div>
  );
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-black text-[#0a1f3d] text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.35] tracking-[-0.01em] text-center max-w-4xl mx-auto">{children}</h2>;
}
function Highlight({ children, color = "#fbbf24" }: { children: React.ReactNode; color?: string }) {
  return <span className="[box-decoration-break:clone] [-webkit-box-decoration-break:clone]" style={{ backgroundImage: `linear-gradient(${color}99, ${color}99)`, backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "100% 0.625rem" }}>{children}</span>;
}

function FV() {
  return (
    <section className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-br from-[#fdf4ff] via-[#f5f0fb] to-[#e0f2fe]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#e9d5ff]/50 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-10 w-[360px] h-[360px] rounded-full bg-gradient-to-br from-[#fde68a]/40 to-transparent blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #15447b 1px, transparent 1px)", backgroundSize: "24px 24px", maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }} />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 mb-6 bg-white border-2 border-[#15447b] px-4 py-1.5 rounded-full shadow-sm">
            <Ico d={I.heart} size={14} className="text-[#a855f7] fill-[#a855f7]" />
            <span className="font-bold text-[12px] sm:text-[13px] text-[#15447b]">理念はあるが言語化できていない方へ</span>
          </div>
          <h1 className="font-black text-[#0a1f3d] leading-[1.3] tracking-[-0.01em] text-[20px] sm:text-[38px] lg:text-[42px] mb-5">
            頭の中にある熱い想いを、<br />
            ターゲットに届く<br />
            <Highlight color="#e9d5ff">ブランドストーリー</Highlight>に翻訳します。
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#475569] leading-[1.9] mb-8">
            MVV策定から始める、想いが伝わるブランドを一緒につくります。<br className="hidden sm:block" />
            あなたの「なぜこの事業をやるのか」を、届けたい人に刺さる言葉と見た目にします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#cta" onClick={() => trackEvent("click_fv_cta", { page: "brand_vision" })}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] h-14 px-8 font-black text-[15px] rounded-full shadow-[0_6px_0_#92760e] hover:shadow-[0_3px_0_#92760e] hover:translate-y-[3px] transition-all">
              30分・無料相談を申し込む <Ico d={I.arrow} size={16} />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-[13px] text-[#475569]">
            {["MVV策定から一気通貫", "想いを言葉にするプロ", "実績100社以上"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <span className="w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center shrink-0"><Ico d={I.check} size={11} className="text-white" /></span>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="hidden lg:flex absolute -top-6 -right-3 z-20 w-28 h-28 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#0a1f3d] text-white flex-col items-center justify-center shadow-xl rotate-[8deg] ring-4 ring-white">
            <span className="font-black text-[14px] leading-none text-center">想いを</span>
            <span className="font-black text-[14px] leading-none text-[#fbbf24] text-center">ブランドへ</span>
          </div>
          <div className="bg-white rounded-3xl border-2 border-[#e2e8f0] shadow-2xl p-7 sm:p-9">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#7c3aed] font-bold mb-2">VISION BRANDING</div>
            <div className="font-black text-[#0a1f3d] text-[18px] sm:text-[22px] mb-1">理念ブランディングパッケージ</div>
            <p className="text-[13px] text-[#475569] mb-5">MVV策定→ブランドストーリー→デザイン制作まで、「なぜあなたの事業なのか」をターゲットに伝わる形に言語化します。</p>
            <div className="flex items-end gap-1 pb-5 mb-5 border-b border-[#e2e8f0]">
              <span className="text-[13px] text-[#64748b]">¥</span>
              <span className="font-black text-[#0a1f3d] text-[48px] tabular-nums leading-none">298,000</span>
              <span className="text-[13px] text-[#64748b] mb-1">（税別）</span>
            </div>
            <ul className="space-y-2.5">
              {["MVV（ミッション・ビジョン・バリュー）策定", "ブランドステートメント策定（必須）", "ブランドストーリー・コンセプト設計", "ロゴデザイン（3案）", "名刺デザイン（3案）", "HP制作（4-5P・撮影込み）", "営業用会社紹介資料（A4換算6-8P）"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[13px] text-[#0a1f3d]">
                  <span className="shrink-0 w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center"><Ico d={I.check} size={11} className="text-white" /></span>{f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeatBar() {
  const seats = getAvailableSeats();
  const used = 5 - seats;
  return (
    <section className="bg-[#0a1f3d]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-7 grid sm:grid-cols-[auto_1fr_auto] items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e]" /></span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#22c55e] font-bold">LIVE・受付中</span>
          </div>
          <div className="font-bold text-white text-[18px] sm:text-[20px]">毎月<span className="text-[#fbbf24]"> 5社 </span>限定 <span className="text-white/70 text-[14px] font-medium">/ {used}社受付済</span></div>
        </div>
        <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#fbbf24] to-[#c9a227] rounded-full" style={{ width: `${Math.round(used / 5 * 100)}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full ring-2 ring-[#fbbf24]" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="absolute top-0 bottom-0 w-px bg-[#0a1f3d]/40" style={{ left: `${i * 20}%` }} />
          ))}
        </div>
        <div className="text-right border-l border-white/15 pl-6">
          <div className="font-mono text-[10px] tracking-[0.25em] text-[#fbbf24] mb-0.5">今月残り</div>
          <div className="font-black text-[#fbbf24] text-[48px] sm:text-[56px] tabular-nums leading-none">{seats}<span className="text-lg font-bold text-white/80 ml-1">社</span></div>
        </div>
      </div>
    </section>
  );
}

const PROBLEMS = [
  { icon: I.heart, text: "「なぜこの事業をやるのか」という想いや理念はあるが、言葉にしようとすると漠然としてしまい、人に伝えられない" },
  { icon: I.brain, text: "自分のブランドの独自性や世界観は感じているが、それをどう表現すれば届けたい人に刺さるのかが分からない" },
  { icon: I.target, text: "競合のブランドとの違いを聞かれると「想い」の話になるが、それがビジネス上の差別化になっているのか自信が持てない" },
  { icon: I.pen, text: "ミッション・ビジョン・バリューを整理しようと試みたが、フレームワークに当てはめると空虚な言葉になってしまう" },
  { icon: I.doc, text: "HPやSNSで何を発信すればいいか迷い、「結局、何者なのか分からない」ブランドになってしまっている" },
];

function Problem() {
  return (
    <section id="problem" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="お悩み" en="PROBLEM" color="#dc2626" />
        <SectionTitle>想いはある。でも<Highlight color="#fecaca">言葉にならない</Highlight>のはなぜか？</SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          ブランディングで一番難しいのは「自分ごと」の言語化です。<br className="hidden sm:block" />近すぎて見えない、を一緒に解決します。
        </p>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {PROBLEMS.map((p, i) => (
            <div key={i} className={`relative bg-[#f8fafc] border-2 border-[#e2e8f0] hover:border-[#15447b] hover:bg-white transition-all rounded-2xl p-6 group ${i === 4 ? "md:col-span-2 lg:col-span-3 lg:max-w-xl lg:mx-auto" : ""}`}>
              <div className="absolute -top-3 -left-3 w-9 h-9 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white rounded-full flex items-center justify-center font-mono font-black text-[14px] shadow-md">{String(i + 1).padStart(2, "0")}</div>
              <div className="flex items-start gap-4 pl-3">
                <div className="w-12 h-12 bg-[#fdf4ff] border border-[#e9d5ff] rounded-xl flex items-center justify-center text-[#7c3aed] shrink-0"><Ico d={p.icon} size={22} /></div>
                <p className="text-[14px] leading-[1.85] text-[#0a1f3d] font-medium pt-1.5">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-2xl p-7 sm:p-10">
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#fbbf24] mb-3 font-bold">INSIGHT</div>
          <p className="text-white font-bold text-[18px] sm:text-[20px] leading-[1.6] mb-4">想いの言語化は「見つける」作業ではなく、「翻訳する」作業です。</p>
          <ul className="space-y-3 text-[13px] text-white/80 leading-[1.85]">
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0 mt-1">▸</span><span>ブランドの核になる「想い」はすでにあなたの中に存在している。それを第三者の視点で引き出し、ターゲットが理解できる言葉に翻訳するのが専門家の仕事</span></li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0 mt-1">▸</span><span>MVVが空虚になる理由の9割は「フレームワーク先行」。まず経営者の言葉でストーリーを描き、そこからMVVを抽出する順序が正しい</span></li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0 mt-1">▸</span><span>「想い」が届くブランドは、デザイン以前に言語設計で決まる。一貫したブランドストーリーを持つ企業は<strong className="text-white">顧客ロイヤルティが平均1.5〜2倍</strong>になる傾向</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const steps = [
    { n: "01", title: "ブランドストーリーの発掘・言語化", desc: "「なぜこの事業を始めたのか」「誰に何を届けたいのか」「10年後にどんな世界をつくりたいのか」を深掘りするセッションで、あなたのブランドの核心を引き出します。", period: "WEEK 1", icon: I.heart },
    { n: "02", title: "MVV策定 → ブランドステートメント構築", desc: "発掘したストーリーからMVV（ミッション・ビジョン・バリュー）を策定し、「なぜあなたの事業でなければならないか」を伝えるブランドステートメントに落とし込みます。これがすべての制作物の根拠になります。", period: "WEEK 1–2", icon: I.book },
    { n: "03", title: "想いと一貫したビジュアル・制作物に変換", desc: "言語化したブランドストーリーと完全に一致するロゴ・名刺・HP・営業資料を制作。「このデザインが生まれた理由」を説明できるブランドを丸ごと構築します。", period: "WEEK 2–4", icon: I.layers },
  ];
  return (
    <section id="solution" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#fdf4ff] to-[#f5f0fb]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="解決策" en="SOLUTION" color="#15447b" />
        <SectionTitle>想いを届くブランドに変える<br /><Highlight>3つのステップ</Highlight></SectionTitle>
        <div className="mt-14 grid lg:grid-cols-3 gap-5 lg:gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {i < 2 && <div className="hidden lg:flex absolute top-[64px] -right-7 z-10 items-center justify-center w-12 h-12 -translate-y-1/2"><div className="w-12 h-12 bg-[#fbbf24] text-[#0a1f3d] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(201,162,39,0.4)] ring-4 ring-white"><Ico d={I.arrow} size={20} /></div></div>}
              <div className="relative bg-white rounded-3xl p-7 lg:p-9 shadow-xl border border-[#15447b]/10 h-full overflow-hidden">
                <div className="absolute -top-4 -right-2 font-mono font-black text-[#15447b]/[0.06] text-[140px] leading-none tabular-nums select-none">{s.n}</div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white rounded-2xl shadow-lg">
                      <span className="font-mono text-[8px] tracking-widest opacity-70 leading-none">STEP</span>
                      <span className="font-black text-[18px] tabular-nums leading-none mt-0.5">{s.n}</span>
                    </div>
                    <div><div className="font-mono text-[10px] tracking-[0.2em] text-[#dc2626] font-bold">{s.period}</div><Ico d={s.icon} size={20} className="text-[#fbbf24]" /></div>
                  </div>
                  <h3 className="font-bold text-[#0a1f3d] text-[17px] sm:text-[18px] leading-[1.5] mb-3">{s.title}</h3>
                  <p className="text-[13.5px] text-[#475569] leading-[1.95]">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const strengths = [
    { n: "①", title: "「引き出す」技術を持つ", desc: "経営者本人が言語化できない「想い」を、構造化インタビューで引き出す。ブランドの核心を発見するセッションが最大の差別化です。" },
    { n: "②", title: "ストーリーから逆算した設計", desc: "MVVやブランドストーリーが決まってからデザインに入るため、「なぜこのデザインなのか」を説明できるブランドになります。" },
    { n: "③", title: "言葉とビジュアルを一人格で管理", desc: "コピーライティング・デザイン・戦略設計を一人格で担当。「言葉とデザインがバラバラ」という問題が起きません。" },
    { n: "④", title: "「届く」言語化のプロ", desc: "想いを内輪の言葉のままにせず、ターゲットの価値観・悩み・言語感覚に翻訳するコピーライティングが強みです。" },
  ];
  return (
    <section id="why" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="選ばれる理由" en="WHY US" color="#15447b" />
        <SectionTitle>想いを「伝わる言葉と形」に変える<Highlight>専門家</Highlight></SectionTitle>
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          <div className="bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-[#e2e8f0] rounded-full flex items-center justify-center"><Ico d={I.x} size={18} className="text-[#64748b]" /></div><h3 className="font-bold text-[#475569] text-[17px]">よくある「表面的な」ブランド整理</h3></div>
            <ul className="space-y-3">
              {["フレームワーク通りに書いたMVVが「きれいだが刺さらない」言葉になっている", "デザインとブランドストーリーが連動していない", "HPができたが「結局何者なのか分からない」と言われてしまう", "想いを言葉にしようとしたが「ふわっとした理念文」で終わってしまった"].map((p) => (
                <li key={p} className="flex items-start gap-3 text-[13.5px] text-[#475569] leading-[1.85]"><span className="shrink-0 w-1 h-1 mt-2.5 rounded-full bg-[#94a3b8]" />{p}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-2xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-[#fbbf24] rounded-full flex items-center justify-center"><Ico d={I.check} size={18} className="text-[#0a1f3d]" /></div><h3 className="font-bold text-white text-[17px]">Growth Design Partnersの強み</h3></div>
            <ul className="space-y-4">
              {strengths.map((s) => (
                <li key={s.n} className="flex items-start gap-3">
                  <span className="shrink-0 font-black text-[#fbbf24] text-[14px] leading-none mt-0.5 w-5">{s.n}</span>
                  <div><span className="font-bold text-white text-[14px]">{s.title}</span><p className="text-[12.5px] text-white/70 leading-[1.7] mt-0.5">{s.desc}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Plans() {
  const monthly = [
    { code: "LIGHT", name: "ライトサポート", price: "50,000", items: ["月次ブランド面談（60分）", "メール相談 無制限", "HP軽微更新（月1回）", "SNS投稿文のレビュー（月3件）"] },
    { code: "PRO", name: "プロサポート", price: "100,000", items: ["月次ブランド面談（月2回）", "メール相談 無制限", "HP更新（月2回）", "SNS投稿制作（月3枚）", "コンテンツ企画サポート"], featured: true },
  ];
  return (
    <section id="plans" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#fdf4ff] to-[#f5f0fb]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="料金プラン" en="PLANS" color="#15447b" />
        <SectionTitle>想いから始まる・4週間一括の<br /><Highlight>ブランディングパッケージ</Highlight></SectionTitle>
        <div className="mt-14">
          <div className="relative bg-gradient-to-br from-[#fef9c3] to-white border-2 border-[#fbbf24] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(201,162,39,0.35)] max-w-3xl mx-auto">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#dc2626] text-white px-5 py-1 rounded-full font-black text-[12px] tracking-wider shadow-lg">★ メインパッケージ</div>
            <div className="grid sm:grid-cols-2 gap-8 items-center">
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-[#7c3aed] font-bold mb-2">VISION BRANDING</div>
                <h3 className="font-black text-[#0a1f3d] text-[20px] sm:text-[24px] mb-3 whitespace-nowrap">理念ブランディングパッケージ</h3>
                <p className="text-[13px] text-[#475569] leading-[1.85] mb-5">MVV策定・ブランドストーリー構築込みの一括制作プラン。「なぜあなたの事業なのか」が伝わるブランドを4週間で構築します。</p>
                <div className="pb-5 mb-5 border-b border-[#e2e8f0]">
                  <span className="text-[13px] text-[#64748b] mr-1">¥</span>
                  <span className="font-black text-[#0a1f3d] text-[48px] tabular-nums">298,000</span>
                  <span className="text-[13px] text-[#64748b] ml-2">（税別）</span>
                </div>
                <p className="text-[13px] text-[#475569] flex items-center gap-2"><Ico d={I.clock} size={15} className="text-[#15447b]" />期間：約<strong className="text-[#0a1f3d]">4週間</strong></p>
              </div>
              <div>
                <ul className="space-y-2.5 mb-7">
                  {["MVV（ミッション・ビジョン・バリュー）策定", "ブランドストーリー・コンセプト設計", "ブランドステートメント策定", "ロゴデザイン（3案・バリエーション含む）", "名刺デザイン（3案・表面/裏面）", "HP制作（4-5P・撮影込み）", "会社紹介資料（A4換算6-8P）"].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-[#0a1f3d]">
                      <span className="shrink-0 w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center"><Ico d={I.check} size={11} className="text-white" /></span>{f}
                    </li>
                  ))}
                </ul>
                <a href="#cta" onClick={() => trackEvent("click_plan", { plan: "理念ブランディングパッケージ", page: "brand_vision" })}
                  className="block text-center w-full py-3.5 font-black text-[14px] rounded-full bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] shadow-[0_4px_0_#92760e] hover:shadow-[0_2px_0_#92760e] hover:translate-y-[2px] transition-all">
                  このプランで相談する →
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-7"><span className="w-10 h-px bg-[#15447b]/30" /><span className="font-bold text-[15px] text-[#15447b]">月額固定サポートプラン（オプション）</span><span className="w-10 h-px bg-[#15447b]/30" /></div>
          <p className="text-center text-[13px] text-[#475569] mb-8">ブランディング完成後も継続して「想いが届くブランド」を育て続けたい方へ。</p>
          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {monthly.map((s) => (
              <div key={s.code} className={`relative rounded-3xl p-7 transition-all ${s.featured ? "bg-gradient-to-b from-[#15447b] to-[#0a1f3d] text-white border-2 border-[#fbbf24] shadow-2xl" : "bg-white border-2 border-[#e2e8f0] hover:border-[#15447b] shadow-sm"}`}>
                {s.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#fbbf24] text-[#0a1f3d] px-4 py-1 rounded-full font-black text-[11px] tracking-wider shadow-lg">⭐ 最も人気</div>}
                <div className={`font-mono text-[10px] tracking-[0.3em] font-bold mb-3 ${s.featured ? "text-[#fbbf24]" : "text-[#dc2626]"}`}>{s.code}</div>
                <h3 className={`font-black mb-4 text-[18px] ${s.featured ? "text-white" : "text-[#0a1f3d]"}`}>{s.name}</h3>
                <div className={`pb-4 mb-5 border-b flex items-end gap-0.5 ${s.featured ? "border-white/15" : "border-[#e2e8f0]"}`}>
                  <span className={`text-[12px] mb-1 ${s.featured ? "text-white/60" : "text-[#64748b]"}`}>¥</span>
                  <span className={`font-black tabular-nums text-[36px] ${s.featured ? "text-white" : "text-[#0a1f3d]"}`}>{s.price}</span>
                  <span className={`text-[12px] mb-1 ${s.featured ? "text-white/60" : "text-[#64748b]"}`}>/月</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {s.items.map((f) => (<li key={f} className={`flex items-center gap-2.5 text-[13px] ${s.featured ? "text-white/90" : "text-[#0a1f3d]"}`}><span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${s.featured ? "bg-[#fbbf24]" : "bg-[#22c55e]"}`}><Ico d={I.check} size={11} className={s.featured ? "text-[#0a1f3d]" : "text-white"} /></span>{f}</li>))}
                </ul>
                <a href="#cta" onClick={() => trackEvent("click_plan", { plan: s.name, page: "brand_vision" })}
                  className={`block text-center w-full h-11 leading-[2.75rem] font-bold text-[13px] rounded-full transition-all ${s.featured ? "bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] shadow-[0_4px_0_#92760e]" : "bg-[#0a1f3d] text-white hover:bg-[#15447b]"}`}>
                  {s.featured ? "このプランで申し込む →" : "詳細を相談する"}
                </a>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center text-[11px] text-[#64748b]">※ 表示価格はすべて税抜。月額プランは最低3ヶ月契約（以降1ヶ月単位で更新）</p>
      </div>
    </section>
  );
}

function Flow() {
  const flows = [
    { n: "01", title: "事前ヒアリングフォームにご記入", desc: "現在の事業内容・届けたいターゲット・競合との違いとして感じていること・既存ブランドツールなどをお聞かせください。事前情報が充実するほど、初回セッションの深さが変わります。", time: "DAY 0" },
    { n: "02", title: "ブランド発掘セッション（60〜90分）", desc: "「なぜこの事業を始めたのか」「お客様のどんな変化を生み出したいのか」「10年後にどんな世界をつくりたいのか」を深掘り。あなたの言葉でブランドの核を引き出します。", time: "WEEK 1" },
    { n: "03", title: "MVV策定 → ブランドステートメント策定", desc: "発掘したブランドストーリーをもとにMVVを策定し、「なぜあなたの事業でなければならないか」を届けたい人に伝わるブランドステートメントに変換します。これが全制作物の根拠になります。", time: "WEEK 1–2" },
    { n: "04", title: "ブランドと一貫した各制作物 → 納品", desc: "言語化したブランドストーリーと完全に一致するロゴ・名刺・HP・営業資料を並行制作。「このデザインが生まれた理由」まで説明できるブランドツール一式を納品します。", time: "WEEK 2–4" },
  ];
  return (
    <section id="flow" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8">
        <Kicker jp="ご相談の流れ" en="FLOW" color="#15447b" />
        <SectionTitle>想いの発掘から納品まで<Highlight>4〜6週間</Highlight></SectionTitle>
        <div className="mt-12 relative">
          <div className="absolute left-7 sm:left-10 top-3 bottom-3 w-[3px] bg-gradient-to-b from-[#fbbf24] via-[#15447b] to-[#15447b]/20 rounded-full" />
          <ol className="space-y-4">
            {flows.map((f, i) => (
              <li key={i} className="relative pl-20 sm:pl-28">
                <div className="absolute left-0 top-0 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-full flex flex-col items-center justify-center text-white shadow-lg ring-4 ring-white">
                  <span className="font-mono text-[8px] tracking-widest opacity-70 leading-none">STEP</span>
                  <span className="font-black text-[18px] sm:text-[24px] tabular-nums leading-none mt-0.5">{f.n}</span>
                </div>
                <div className="bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl p-5 sm:p-6 hover:border-[#15447b] hover:bg-white transition-all">
                  <div className="flex flex-wrap items-start gap-x-3 gap-y-1 mb-2">
                    <h3 className="font-bold text-[#0a1f3d] text-[14px] sm:text-[18px] leading-[1.5] w-full sm:w-auto">{f.title}</h3>
                    <span className="font-mono text-[10px] tracking-wider text-[#dc2626] font-bold bg-[#fef2f2] px-2 py-0.5 rounded">{f.time}</span>
                  </div>
                  <p className="text-[13.5px] text-[#475569] leading-[1.95]">{f.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "まだ創業したばかりで、事業の方向性が固まっていません。それでも依頼できますか？", a: "むしろ創業初期が最もブランディングの効果が出るタイミングです。方向性が固まっていない状態から一緒に整理していくこともできますし、それがブランド発掘セッションの目的の一つでもあります。「想いはあるが言葉にならない」状態を歓迎します。" },
  { q: "既存のロゴやHPは変えずに、MVVとブランドストーリーだけ整理してもらえますか？", a: "はい、可能です。MVV策定・ブランドステートメント構築だけのご依頼も承っています。その後、ロゴ・名刺・HPの制作をご希望の場合は順次追加することもできます。まずはご希望をお聞かせください。" },
  { q: "「想い」をうまく言語化できるか不安です。どんな準備が必要ですか？", a: "特別な準備は不要です。事前ヒアリングフォームに答えていただければ、そこから深掘りするセッションを進めます。うまく言葉が出てこなくても、私たちがインタビューの中で引き出していきます。「言語化できない」ことを心配せずにお申し込みください。" },
  { q: "全国どこからでも相談できますか？", a: "はい。Zoom等のオンライン打ち合わせで全国対応しています。関西圏の場合は訪問対応も可能です。" },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#fdf4ff] to-[#f5f0fb]">
      <div className="max-w-[900px] mx-auto px-4 sm:px-8">
        <Kicker jp="よくある質問" en="FAQ" color="#15447b" />
        <SectionTitle>気になる<Highlight>ご質問</Highlight></SectionTitle>
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`bg-white rounded-2xl border-2 transition-all ${isOpen ? "border-[#15447b] shadow-lg" : "border-[#e2e8f0] hover:border-[#15447b]/40"}`}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full text-left flex items-start justify-between gap-4 p-5 sm:p-6">
                  <div className="flex items-start gap-4 flex-1">
                    <span className="shrink-0 w-9 h-9 bg-[#dc2626] text-white rounded-full flex items-center justify-center font-black text-[14px]">Q</span>
                    <span className="font-bold text-[#0a1f3d] text-[15px] sm:text-[16px] leading-[1.6] pt-1">{f.q}</span>
                  </div>
                  <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-[#15447b] text-white rotate-180" : "bg-[#f0f6fc] text-[#15447b]"}`}>
                    <Ico d={isOpen ? I.minus : I.plus} size={16} />
                  </div>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden"><div className="px-5 sm:px-6 pb-6 pl-[72px]"><p className="text-[13.5px] text-[#475569] leading-[1.95]">{f.a}</p></div></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const seats = getAvailableSeats();
  function handleSubmit() { trackEvent("generate_lead", { event_category: "lp_brand_vision", event_label: "contact_form_submit" }); }
  return (
    <section id="cta" className="relative py-16 sm:py-24 bg-gradient-to-br from-[#15447b] via-[#0a1f3d] to-[#060d1c] overflow-hidden">
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(251,191,36,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(124,58,237,0.4), transparent 40%)" }} />
      <div className="relative max-w-[1080px] mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-4 py-1.5 rounded-full mb-5 font-black text-[12px] tracking-wider shadow-lg"><Ico d={I.fire} size={14} />今月残り {seats}社限定！</div>
          <h2 className="font-black text-white text-[22px] sm:text-[40px] leading-[1.3]">まずは<span className="text-[#fbbf24]">30分の無料相談</span>から、<br />はじめませんか？</h2>
          <p className="mt-4 text-[14px] text-white/75 leading-[1.95]">2営業日以内にご返信いたします。売り込みは一切ありません。</p>
        </div>
        <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-2xl">
          <form action="https://formsubmit.co/info@gdesign-partners.co.jp" method="POST" onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="_subject" value="【LP-C・理念ブランディング】無料相談お申込み" />
            <input type="hidden" name="_next" value="https://gdesign-partners.co.jp/lp/brand-vision/thanks" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">お名前</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="name" type="text" required placeholder="山田 彩" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
              <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">会社名 / 屋号</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="company" type="text" required placeholder="〇〇サロン / フリーランス" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
            </div>
            <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">メールアドレス</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="email" type="email" required placeholder="name@company.co.jp" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
            <div><label className="block font-bold text-[12px] text-[#0a1f3d] mb-1.5">現在の最大の課題（近いものを選択）</label><select name="main_issue" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition rounded-xl"><option value="">選択してください</option><option value="想いや理念を言葉にできない">想いや理念をうまく言葉にできない</option><option value="MVVを作りたいが空虚な言葉になってしまう">MVVを作りたいが空虚な言葉になってしまう</option><option value="ブランドの独自性を表現できていない">ブランドの独自性・世界観をうまく表現できていない</option><option value="ターゲットに想いが届いていない感覚がある">ターゲットに想いが届いていない感覚がある</option></select></div>
            <div><label className="block font-bold text-[12px] text-[#0a1f3d] mb-1.5">伝えたい想い・ご相談内容</label><textarea name="challenge" rows={4} placeholder="例：「なぜこの事業をやっているのか」という想いはあるが、いざ言葉にしようとすると漠然としてしまい、HPやSNSで何を発信すればいいか分からなくなっている..." className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 py-3 text-[14px] outline-none transition placeholder:text-[#94a3b8] resize-none rounded-xl" /></div>
            <button type="submit" className="w-full h-14 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] hover:from-[#f0d87a] hover:to-[#fbbf24] text-[#0a1f3d] font-black text-[16px] rounded-full shadow-[0_6px_0_#92760e,0_8px_24px_rgba(201,162,39,0.4)] hover:shadow-[0_3px_0_#92760e] hover:translate-y-[3px] transition-all flex items-center justify-center gap-3 mt-2">無料相談を申し込む<Ico d={I.arrow} size={18} /></button>
            <p className="text-[11px] text-[#94a3b8] text-center">送信後、2営業日以内にご連絡します</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function BrandVisionPage() {
  useEffect(() => { trackEvent("page_view_lp_brand_vision", { page: "/lp/brand-vision" }); }, []);
  useScrollTracking("lp_brand_vision");
  return <><FV /><SeatBar /><Problem /><Solution /><WhyUs /><Plans /><Flow /><FAQ /><CTA /></>;
}
