"use client";

import { useState, useEffect } from "react";
import { submitContactForm } from "@/lib/contact";
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
    <section className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-br from-[#e0f2fe] via-[#f0f6fc] to-[#dbeafe]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#bae6fd]/60 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-10 w-[360px] h-[360px] rounded-full bg-gradient-to-br from-[#fde68a]/40 to-transparent blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #15447b 1px, transparent 1px)", backgroundSize: "24px 24px", maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }} />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 mb-6 bg-white border-2 border-[#15447b] px-4 py-1.5 rounded-full shadow-sm">
            <Ico d={I.star} size={14} className="text-[#fbbf24] fill-[#fbbf24]" />
            <span className="font-bold text-[12px] sm:text-[13px] text-[#15447b]">価格競争に疲れた経営者の方へ</span>
          </div>
          <h1 className="font-black text-[#0a1f3d] leading-[1.3] tracking-[-0.01em] text-[20px] sm:text-[38px] lg:text-[42px] mb-5 [text-wrap:balance]">
            <span className="inline-block">相見積もりで疲弊する前に、</span>
            <span className="inline-block">あなたの技術力を</span>
            <span className="inline-block"><Highlight color="#fbbf24">「選ばれる真価」</Highlight></span>
            <span className="inline-block">に変えませんか。</span>
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#475569] leading-[1.9] mb-8">
            市場分析・ポジショニングから始まる戦略的ブランディングで、<br className="hidden sm:block" />
            「なぜ弊社を選ぶべきか」を言語化し、価格競争から脱却する土台を作ります。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#cta" onClick={() => trackEvent("click_fv_cta", { page: "brand_value" })}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] h-14 px-8 font-black text-[15px] rounded-full shadow-[0_6px_0_#92760e] hover:shadow-[0_3px_0_#92760e] hover:translate-y-[3px] transition-all">
              30分・無料相談を申し込む <Ico d={I.arrow} size={16} />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-[13px] text-[#475569]">
            {["戦略設計から一気通貫", "営業で使える根拠・ストーリー", "実績100社以上"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <span className="w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center shrink-0"><Ico d={I.check} size={11} className="text-white" /></span>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="hidden lg:flex absolute -top-6 -right-3 z-20 w-28 h-28 rounded-full bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white flex-col items-center justify-center shadow-xl rotate-[8deg] ring-4 ring-white">
            <span className="font-black text-[14px] leading-none text-center">価格競争</span>
            <span className="font-black text-[14px] leading-none text-[#fbbf24] text-center">脱却へ</span>
          </div>
          <div className="bg-white rounded-3xl border-2 border-[#e2e8f0] shadow-2xl p-7 sm:p-9">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#c9a227] font-bold mb-2">STRATEGIC BRANDING</div>
            <div className="font-black text-[#0a1f3d] text-[18px] sm:text-[22px] mb-1">戦略ブランディングパッケージ</div>
            <p className="text-[13px] text-[#475569] mb-5">市場分析→ポジショニング→ブランドID構築まで、「選ばれる理由」を根拠から設計します。</p>
            <div className="flex items-end gap-1 pb-5 mb-5 border-b border-[#e2e8f0]">
              <span className="text-[13px] text-[#64748b]">¥</span>
              <span className="font-black text-[#0a1f3d] text-[48px] tabular-nums leading-none">298,000</span>
              <span className="text-[13px] text-[#64748b] mb-1">（税別）</span>
            </div>
            <ul className="space-y-2.5">
              {["ブランドステートメント策定（市場分析・ポジショニング／必須）", "MVV策定（ミッション・ビジョン・バリュー）", "ロゴデザイン（3案）", "名刺デザイン（3案）", "HP制作（4-5P・撮影込み）", "営業用会社紹介資料（A4換算6-8P）"].map((f) => (
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
  { icon: I.layers, text: "常に相見積もりとなり、最安値でしか受注できない。技術力や対応力の本当の価値が伝わっていない" },
  { icon: I.brain,  text: "「なぜ弊社を選ぶべきか」を論理的に説明できず、商談で差別化できないまま価格だけが勝負になっている" },
  { icon: I.pen,    text: "自社の強みは分かっているが、ブランドステートメントや営業ストーリーに落とし込めていない" },
  { icon: I.chart,  text: "現在のロゴ・HPは創業時に安く作ったもので、大手企業との商談時に見劣りして信頼感を損ねている" },
  { icon: I.doc,    text: "リブランディングの必要性は感じているが、どこから手をつければいいか、誰に頼めばいいか分からない" },
];

function Problem() {
  return (
    <section id="problem" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="お悩み" en="PROBLEM" color="#dc2626" />
        <SectionTitle>価格競争から抜け出せない。<span className="inline-block"><Highlight color="#fecaca">その本当の原因</Highlight>は？</span></SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          技術力も対応力も十分なのに「なぜ選ばれないのか」。<br className="hidden sm:block" />その答えは、ブランドの設計にあります。
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
          {PROBLEMS.map((p, i) => (
            <div key={i} className={`relative bg-[#f8fafc] border-2 border-[#e2e8f0] hover:border-[#15447b] hover:bg-white transition-all rounded-2xl p-6 group lg:col-span-2 ${i === 3 ? "lg:col-start-2" : ""} ${i === 4 ? "md:col-span-2 md:max-w-md md:mx-auto lg:col-start-4 lg:max-w-none lg:mx-0" : ""}`}>
              <div className="absolute -top-3 -left-3 w-9 h-9 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white rounded-full flex items-center justify-center font-mono font-black text-[14px] shadow-md">{String(i + 1).padStart(2, "0")}</div>
              <div className="flex items-start gap-4 pl-3">
                <div className="w-12 h-12 bg-[#fef2f2] border border-[#fecaca] rounded-xl flex items-center justify-center text-[#dc2626] shrink-0"><Ico d={p.icon} size={22} /></div>
                <p className="text-[14px] leading-[1.85] text-[#0a1f3d] font-medium pt-1.5">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-2xl p-7 sm:p-10">
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#fbbf24] mb-3 font-bold">INSIGHT</div>
          <p className="text-white font-bold text-[18px] sm:text-[20px] leading-[1.6] mb-4">価格競争の本質は、「選ばれる理由」が言語化されていないことにあります。</p>
          <ul className="space-y-3 text-[13px] text-white/80 leading-[1.85]">
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0">▸</span><span>中小企業の約6割が「自社の強みを言語化できていない」と回答しており、それが相見積もり合戦の根本原因になっている</span></li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0">▸</span><span>ブランド戦略を整備した企業は、整備前と比べて受注単価が<strong className="text-white">平均1.4倍</strong>向上する傾向がある</span></li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0">▸</span><span>「なぜ弊社か」を論理的に伝えられるブランドステートメントは、商談の質と受注確率を同時に上げる最も効果的な投資</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const steps = [
    { n: "01", title: "市場分析・ポジショニングから始める", desc: "同業他社のWebサイト・価格帯・差別化ポイントを整理し「どこで勝負するか」を明確化。競合調査（SEO観点含む）から、お客様の市場での立ち位置を設計します。", period: "WEEK 1", icon: I.target },
    { n: "02", title: "「選ばれる理由」を言語化・ブランド設計", desc: "ブランドステートメント（市場分析・ポジショニング・ブランドID・4P/4C）とMVVを策定。商談で使える根拠とストーリーを、プロの言葉で構築します。", period: "WEEK 1–2", icon: I.pen },
    { n: "03", title: "営業で使えるブランドツールを一括制作", desc: "設計したブランド思想と一貫したロゴ・名刺・HP・営業資料を制作。大手企業との商談でも信頼感を与えられるクオリティで一括納品します。", period: "WEEK 2–4", icon: I.layers },
  ];
  return (
    <section id="solution" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f0f6fc] to-[#e0f2fe]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="解決策" en="SOLUTION" color="#15447b" />
        <SectionTitle>「なぜ弊社か」を根拠から設計する<br /><Highlight>3つのステップ</Highlight></SectionTitle>
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
    { n: "①", title: "「戦略」から入る差別化", desc: "単なるデザインリニューアルではなく、市場分析・競合調査・ポジショニングから設計する戦略的アプローチ。" },
    { n: "②", title: "営業で使える根拠を構築", desc: "ブランドステートメントは「商談で使える根拠とストーリー」。デザインだけでなく、営業現場で機能するツールを作ります。" },
    { n: "③", title: "BtoB・中小企業への深い理解", desc: "技術力・対応力のある企業が「なぜ選ばれないか」の構造を熟知。業界・規模感に合わせた差別化設計が得意です。" },
    { n: "④", title: "一気通貫でコンセプトのブレなし", desc: "戦略〜デザイン〜コピーまで一人格で管理。複数業者発注による「方向性のズレ」が起きません。" },
  ];
  return (
    <section id="why" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="選ばれる理由" en="WHY US" color="#15447b" />
        <SectionTitle>単なるリニューアルでなく、<span className="inline-block"><Highlight>「選ばれる仕組み」</Highlight></span><span className="inline-block">を作ります</span></SectionTitle>
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          <div className="bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-[#e2e8f0] rounded-full flex items-center justify-center"><Ico d={I.x} size={18} className="text-[#64748b]" /></div><h3 className="font-bold text-[#475569] text-[17px]">よくある「見た目だけ」のリニューアル</h3></div>
            <ul className="space-y-3">
              {["デザインを変えても「なぜ弊社か」の答えが変わらない", "競合との差別化ポイントが曖昧なまま制作が進む", "HPがきれいになったが受注単価は変わらない", "営業現場で「強みを説明できない」問題が残り続ける"].map((p) => (
                <li key={p} className="flex items-start gap-3 text-[13.5px] text-[#475569] leading-[1.85]"><span className="shrink-0 w-1 h-1 mt-2.5 rounded-full bg-[#94a3b8]" />{p}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-2xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-[#fbbf24] rounded-full flex items-center justify-center"><Ico d={I.check} size={18} className="text-[#0a1f3d]" /></div><h3 className="font-bold text-white text-[17px]">Growth Design Partnersの強み</h3></div>
            <ul className="space-y-4">
              {strengths.map((s) => (
                <li key={s.n} className="flex items-start gap-3">
                  <span className="shrink-0 font-black text-[#fbbf24] text-[14px] w-5 mt-[3px]">{s.n}</span>
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
    { code: "LIGHT", name: "ライトサポート", price: "50,000", items: ["月次戦略面談（60分）", "メール相談 無制限", "HP軽微更新（月1回）", "営業ツール添削（月3件）"] },
    { code: "PRO", name: "プロサポート", price: "100,000", items: ["月次戦略面談（月2回）", "メール相談 無制限", "HP更新（月2回）", "SNS投稿制作（月3枚）", "新規営業リスト作成（月50件）"], featured: true },
  ];
  return (
    <section id="plans" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#e0f2fe] to-[#f0f6fc]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="料金プラン" en="PLANS" color="#15447b" />
        <SectionTitle>戦略設計込み・4週間一括の<br /><Highlight>ブランディングパッケージ</Highlight></SectionTitle>
        <div className="mt-14">
          <div className="relative bg-gradient-to-br from-[#fef9c3] to-white border-2 border-[#fbbf24] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(201,162,39,0.35)] max-w-3xl mx-auto">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#dc2626] text-white px-5 py-1 rounded-full font-black text-[12px] tracking-wider shadow-lg">★ メインパッケージ</div>
            <div className="grid sm:grid-cols-2 gap-8 items-center">
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-[#c9a227] font-bold mb-2">BRANDING PACKAGE</div>
                <h3 className="font-black text-[#0a1f3d] text-[24px] sm:text-[28px] mb-3 whitespace-nowrap">ブランディングパッケージ</h3>
                <p className="text-[13px] text-[#475569] leading-[1.85] mb-5">市場分析・戦略設計込みの一括制作プラン。価格競争から脱却する「選ばれる理由」を根拠から構築します。</p>
                <div className="pb-5 mb-5 border-b border-[#e2e8f0]">
                  <span className="text-[13px] text-[#64748b] mr-1">¥</span>
                  <span className="font-black text-[#0a1f3d] text-[48px] tabular-nums">298,000</span>
                  <span className="text-[13px] text-[#64748b] ml-2">（税別）</span>
                </div>
                <p className="text-[13px] text-[#475569] flex items-center gap-2"><Ico d={I.clock} size={15} className="text-[#15447b]" />期間：約<strong className="text-[#0a1f3d]">4週間</strong></p>
              </div>
              <div>
                <ul className="space-y-2.5 mb-7">
                  {["ブランドステートメント策定（市場分析・ポジショニング）", "MVV（ミッション・ビジョン・バリュー）策定", "ロゴデザイン（3案・バリエーション含む）", "名刺デザイン（3案・表面/裏面）", "HP制作（4-5P・撮影込み）", "会社紹介資料（A4換算6-8P）"].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-[#0a1f3d]">
                      <span className="shrink-0 w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center"><Ico d={I.check} size={11} className="text-white" /></span>{f}
                    </li>
                  ))}
                </ul>
                <a href="#cta" onClick={() => trackEvent("click_plan", { plan: "ブランディングパッケージ", page: "brand_value" })}
                  className="block text-center w-full py-3.5 font-black text-[14px] rounded-full bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] shadow-[0_4px_0_#92760e] hover:shadow-[0_2px_0_#92760e] hover:translate-y-[2px] transition-all">
                  このプランで相談する →
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-gradient-to-br from-[#fef9c3] to-[#fff7e6] border-2 border-[#fbbf24] rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto text-center">
            <div className="font-black text-[#0a1f3d] text-[18px] mb-2">ご契約特典</div>
            <p className="text-[13px] text-[#475569] leading-[1.85]">
              生成AI（ChatGPT・Claude）業務活用カリキュラムを<span className="font-bold text-[#dc2626]">無料視聴</span>。<br />ご契約者様限定のオンライン講座で、AI活用ノウハウを体系的に学べます。
            </p>
          </div>
        </div>
        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-7"><span className="w-10 h-px bg-[#15447b]/30" /><span className="font-bold text-[15px] text-[#15447b]">月額固定サポートプラン（オプション）</span><span className="w-10 h-px bg-[#15447b]/30" /></div>
          <p className="text-center text-[13px] text-[#475569] mb-8">ブランディング完成後も継続して「選ばれる仕組み」を育て続けたい方へ。</p>
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
                <a href="#cta" onClick={() => trackEvent("click_plan", { plan: s.name, page: "brand_value" })}
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
    { n: "01", title: "事前ヒアリングフォームにご記入", desc: "現在の課題・ターゲット・競合状況・既存ブランドツールなどをお聞かせください。事前情報が充実するほど、初回打ち合わせの質が上がります。", time: "DAY 0" },
    { n: "02", title: "打ち合わせ・ヒアリング（60〜90分）", desc: "「今の受注の取れ方と取れない理由」「理想のクライアント像」「3年後の事業の姿」を深掘り。競合との本質的な違いを一緒に言語化します。", time: "WEEK 1" },
    { n: "03", title: "市場調査・分析 → ブランドステートメント策定", desc: "同業他社の分析・ポジショニング設計を経て、「選ばれる理由」を言語化したブランドステートメントを策定。これが全制作物の根拠になります。", time: "WEEK 1–2" },
    { n: "04", title: "各種制作物の並行制作 → 納品", desc: "ブランドステートメントと一貫したロゴ・名刺・HP・営業資料を並行制作。「商談で使える」クオリティで一括納品します。", time: "WEEK 2–4" },
  ];
  return (
    <section id="flow" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8">
        <Kicker jp="ご相談の流れ" en="FLOW" color="#15447b" />
        <SectionTitle>戦略設計から納品まで<Highlight>4〜6週間</Highlight></SectionTitle>
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
  { q: "既存ビジネスのリブランディングにも対応できますか？", a: "はい、むしろリブランディングのご依頼が多数を占めています。現在のブランドの問題点（何が刺さっていないか）を市場・競合分析から明らかにし、「なぜ選ばれないか」の本質から設計し直します。既存のロゴや資料があれば事前にご共有ください。" },
  { q: "BtoB向けの商材ですが、対応できますか？", a: "BtoBのブランディングは当社の得意領域です。技術力・対応力のある企業が価格競争に陥る構造的な問題を熟知しており、「法人営業の商談で使える根拠とストーリー」を重視した設計をします。製造業・IT・コンサルティングなど多業種の実績があります。" },
  { q: "ブランドステートメント策定だけでも依頼できますか？", a: "ブランドステートメントは当パッケージの必須コンテンツですが、その後のロゴ・名刺・HP等の制作物は組み合わせ自由です。まずブランドステートメントだけ策定し、制作物は順次追加していく進め方も可能です。ご希望をお聞かせください。" },
  { q: "全国どこからでも相談できますか？", a: "はい。Zoom等のオンライン打ち合わせで全国対応しています。関西圏の場合は訪問対応も可能です。" },
];

function FAQ() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  return (
    <section id="faq" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f0f6fc] to-[#e0f2fe]">
      <div className="max-w-[900px] mx-auto px-4 sm:px-8">
        <Kicker jp="よくある質問" en="FAQ" color="#15447b" />
        <SectionTitle>気になる<Highlight>ご質問</Highlight></SectionTitle>
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open.has(i);
            return (
              <div key={i} className={`bg-white rounded-2xl border-2 transition-all ${isOpen ? "border-[#15447b] shadow-lg" : "border-[#e2e8f0] hover:border-[#15447b]/40"}`}>
                <button onClick={() => setOpen(prev => { const next = new Set(prev); if (next.has(i)) next.delete(i); else next.add(i); return next; })} className="w-full text-left flex items-start justify-between gap-4 p-5 sm:p-6">
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
  const [submitting, setSubmitting] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    trackEvent("generate_lead", { event_category: "lp_brand_value", event_label: "contact_form_submit" });
    setSubmitting(true);
    await submitContactForm(e.currentTarget, "brand-value");
  }
  return (
    <section id="cta" className="relative py-16 sm:py-24 bg-gradient-to-br from-[#15447b] via-[#0a1f3d] to-[#060d1c] overflow-hidden">
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(251,191,36,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(21,68,123,0.5), transparent 40%)" }} />
      <div className="relative max-w-[1080px] mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-4 py-1.5 rounded-full mb-5 font-black text-[12px] tracking-wider shadow-lg"><Ico d={I.fire} size={14} />今月残り {seats}社限定！</div>
          <h2 className="font-black text-white text-[22px] sm:text-[40px] leading-[1.3]">まずは<span className="text-[#fbbf24]">30分の無料相談</span>から、<br />はじめませんか？</h2>
          <p className="mt-4 text-[14px] text-white/75 leading-[1.95]">2営業日以内にご返信いたします。売り込みは一切ありません。</p>
        </div>
        <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="_subject" value="【LP-B・価格競争脱却】無料相談お申込み" />
            <input type="hidden" name="_next" value="https://gdesign-partners.co.jp/lp/brand-value/thanks" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">お名前</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="name" type="text" required placeholder="佐藤 健一" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
              <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">会社名</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="company" type="text" required placeholder="株式会社〇〇" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
            </div>
            <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">メールアドレス</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="email" type="email" required placeholder="name@company.co.jp" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
            <div><label className="block font-bold text-[12px] text-[#0a1f3d] mb-1.5">現在の最大の課題（近いものを選択）</label><select name="main_issue" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition rounded-xl"><option value="">選択してください</option><option value="相見積もりで価格競争が続いている">相見積もりで価格競争が続いている</option><option value="自社の強みをうまく説明できない">自社の強みをうまく説明できない</option><option value="ブランドツールが古く見劣りしている">ブランドツールが古く見劣りしている</option><option value="新規受注の質を上げたい">新規受注の質（単価・案件規模）を上げたい</option></select></div>
            <div><label className="block font-bold text-[12px] text-[#0a1f3d] mb-1.5">現状の課題・ご相談内容</label><textarea name="challenge" rows={4} placeholder="例：技術力には自信があるが、いつも最安値での受注になってしまう。大手企業との商談で信頼感が出せていないと感じている..." className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 py-3 text-[14px] outline-none transition placeholder:text-[#94a3b8] resize-none rounded-xl" /></div>
            <button type="submit" disabled={submitting} className="w-full h-14 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] hover:from-[#f0d87a] hover:to-[#fbbf24] text-[#0a1f3d] font-black text-[16px] rounded-full shadow-[0_6px_0_#92760e,0_8px_24px_rgba(201,162,39,0.4)] hover:shadow-[0_3px_0_#92760e] hover:translate-y-[3px] transition-all flex items-center justify-center gap-3 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">{submitting ? "送信中…" : <>無料相談を申し込む<Ico d={I.arrow} size={18} /></>}</button>
            <p className="text-[11px] text-[#94a3b8] text-center">送信後、2営業日以内にご連絡します</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function BrandValuePage() {
  useEffect(() => { trackEvent("page_view_lp_brand_value", { page: "/lp/brand-value" }); }, []);
  useScrollTracking("lp_brand_value");
  return <><FV /><SeatBar /><Problem /><Solution /><WhyUs /><Plans /><Flow /><FAQ /><CTA /></>;
}
