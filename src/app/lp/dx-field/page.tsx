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
  chart:  "M3 3v18h18M7 14l4-4 3 3 6-7",
  doc:    "M7 3h7l5 5v13H7zM14 3v5h5M9 13h8M9 17h8M9 9h3",
  bolt:   "M13 2 4 14h7l-1 8 9-12h-7z", fire: "M12 2c0 4-5 6-5 11a5 5 0 0 0 10 0c0-2-1-3-2-4 0 2-1 3-2 3 0-4 1-6-1-10z",
  target: "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  plus:   "M12 5v14M5 12h14", minus: "M5 12h14",
  tool:   "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  cpu:    "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
  users:  "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  zap:    "M13 2 4 14h7l-1 8 9-12h-7z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
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
    <section className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-br from-[#0a1f3d] via-[#15447b] to-[#0a1f3d]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#fbbf24]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#15447b]/50 to-transparent blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 mb-6 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <Ico d={I.tool} size={14} className="text-[#fbbf24]" />
            <span className="font-bold text-[12px] sm:text-[13px] text-white">製造業・アナログ業務の多い企業へ</span>
          </div>
          <h1 className="font-black text-white leading-[1.3] tracking-[-0.01em] text-[28px] sm:text-[38px] lg:text-[46px] mb-5">
            500万円の見積もりに<br />
            <span className="text-[#fbbf24]">驚いた経験は</span><br />
            ありませんか。
          </h1>
          <p className="text-[15px] sm:text-[16px] text-white/80 leading-[1.9] mb-8">
            AI活用で従来の<strong className="text-[#fbbf24]">1/3以下のコスト</strong>で実現。<br className="hidden sm:block" />
            ITが苦手な現場でも「使えるまで」、一緒に走ります。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#cta" onClick={() => trackEvent("click_fv_cta", { page: "dx_field" })}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] h-14 px-8 font-black text-[15px] rounded-full shadow-[0_6px_0_#92760e] hover:shadow-[0_3px_0_#92760e] hover:translate-y-[3px] transition-all">
              30分・無料相談を申し込む <Ico d={I.arrow} size={16} />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-[13px] text-white/70">
            {["IT人材ゼロでも導入可能", "現場が使えるまで伴走", "製造業支援実績多数"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <span className="w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center shrink-0"><Ico d={I.check} size={11} className="text-white" /></span>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="hidden lg:flex absolute -top-6 -right-3 z-20 w-32 h-32 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] flex-col items-center justify-center shadow-xl rotate-[8deg] ring-4 ring-white/20">
            <span className="font-black text-[13px] leading-none text-center">AI活用で</span>
            <span className="font-black text-[24px] leading-none text-[#0a1f3d] text-center">1/3</span>
            <span className="font-black text-[13px] leading-none text-center">のコスト</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl p-7 sm:p-9">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#fbbf24] font-bold mb-2">DX / BPR SUPPORT</div>
            <div className="font-black text-white text-[22px] mb-1">現場伴走型DX支援</div>
            <p className="text-[13px] text-white/70 mb-5">アナログ業務の洗い出しから設計・構築・運用定着まで。現場スタッフが本当に使える仕組みを、一緒に作ります。</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "スポット支援", price: "¥200,000〜", note: "課題特化・短期" },
                { label: "スポット（人気）", price: "¥450,000〜", note: "★ 最多ご依頼", featured: true },
                { label: "サブスク", price: "¥50,000/月", note: "継続サポート" },
                { label: "サブスク（人気）", price: "¥120,000/月", note: "★ 最多契約", featured: true },
              ].map((p) => (
                <div key={p.label} className={`rounded-xl p-3 ${p.featured ? "bg-[#fbbf24]/20 border border-[#fbbf24]/40" : "bg-white/5 border border-white/10"}`}>
                  <div className={`font-mono text-[9px] tracking-widest mb-1 ${p.featured ? "text-[#fbbf24]" : "text-white/50"}`}>{p.note}</div>
                  <div className="font-black text-white text-[15px]">{p.price}</div>
                  <div className="text-[11px] text-white/60 mt-0.5">{p.label}</div>
                </div>
              ))}
            </div>
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
    <section className="bg-[#060d1c]">
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
  { icon: I.doc,    text: "受発注・在庫管理・日報が紙とExcelのまま。転記ミスや集計に毎日1〜2時間を費やしており、本来の業務に集中できていない" },
  { icon: I.chart,  text: "DX化を検討してベンダーに相談したところ、500万〜1,000万円超の見積もりが届いて導入を断念。「中小には無理」と思い込んでいる" },
  { icon: I.users,  text: "社員のITリテラシーにばらつきがあり、「システムを入れても現場が使いこなせない」という失敗を何度も経験してきた" },
  { icon: I.layers, text: "大手向けのパッケージシステムは機能が多すぎ・費用が高すぎで自社規模に合わない。かといって自社開発できるエンジニアもいない" },
  { icon: I.target, text: "「どの業務から手をつけるか」の優先順位がつけられず、DXが後回しになり続けている。何年も同じ課題を抱えたまま" },
];

function Problem() {
  return (
    <section id="problem" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="お悩み" en="PROBLEM" color="#dc2626" />
        <SectionTitle>「DXしたい」のに進まない。<Highlight color="#fecaca">その理由</Highlight>はどれですか？</SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          製造業・アナログ業務の現場が抱える「DXの壁」を、私たちは熟知しています。
        </p>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {PROBLEMS.map((p, i) => (
            <div key={i} className={`relative bg-[#f8fafc] border-2 border-[#e2e8f0] hover:border-[#15447b] hover:bg-white transition-all rounded-2xl p-6 group ${i === 4 ? "md:col-span-2 lg:col-span-3 lg:max-w-xl lg:mx-auto" : ""}`}>
              <div className="absolute -top-3 -left-3 w-9 h-9 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white rounded-full flex items-center justify-center font-mono font-black text-[14px] shadow-md">{String(i + 1).padStart(2, "0")}</div>
              <div className="flex items-start gap-4 pl-3">
                <div className="w-12 h-12 bg-[#fef2f2] border border-[#fecaca] rounded-xl flex items-center justify-center text-[#dc2626] shrink-0"><Ico d={p.icon} size={22} /></div>
                <p className="text-[14px] leading-[1.85] text-[#0a1f3d] font-medium pt-1.5">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-2xl p-7 sm:p-10">
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#fbbf24] mb-3 font-bold">REALITY CHECK</div>
          <p className="text-white font-bold text-[18px] sm:text-[20px] leading-[1.6] mb-4">DXが高額になる理由の9割は「大手向け設計」を押しつけられているからです。</p>
          <ul className="space-y-3 text-[13px] text-white/80 leading-[1.85]">
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0 mt-1">▸</span><span>中小製造業のDXに必要なのは「大規模システム」ではなく「現場の特定業務を確実に楽にするツール」。AI活用でこれが<strong className="text-white">従来の1/3以下のコスト</strong>で実現できる</span></li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0 mt-1">▸</span><span>「現場が使えない」問題の原因は、ツール選定・設計・導入後の伴走のどこかが欠けていること。私たちは「使えるまで帰らない」姿勢で伴走する</span></li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0 mt-1">▸</span><span>DXに成功した中小製造業は、最初の一歩を「全社一括」でなく「一つの業務の改善」から始めている。どこから着手するかの設計が最重要</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const steps = [
    { n: "01", title: "業務の「棚卸し」と優先順位設計", desc: "現場へのヒアリングと業務フロー分析で「どの業務をDXすれば最大のROIが出るか」を特定。費用対効果の高い着手点から始めるので、投資対効果が明確です。", period: "WEEK 1〜2", icon: I.target },
    { n: "02", title: "AI活用ツールの設計・構築", desc: "kintone・Make・Claude API等のノーコード〜ローコードツールとAIを組み合わせ、現場の業務フローに合った仕組みを設計・構築。既製品を押しつけるのではなく、御社の業務に合わせて設計します。", period: "WEEK 2〜4", icon: I.cpu },
    { n: "03", title: "現場への定着支援・継続伴走", desc: "「ツールを入れて終わり」にしません。現場スタッフへのトレーニング・マニュアル作成・運用後の改善対応まで、実際に使われる状態になるまで伴走します。", period: "WEEK 4〜", icon: I.shield },
  ];
  return (
    <section id="solution" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f0f6fc] to-[#e0f2fe]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="解決策" en="SOLUTION" color="#15447b" />
        <SectionTitle>「高い・使えない」を解消する<br /><Highlight>3ステップDX支援</Highlight></SectionTitle>
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
    { n: "①", title: "AI活用で従来の1/3以下のコスト", desc: "Claude API・Make・kintone等を組み合わせたAI活用設計で、従来のSIer見積もりの1/3〜1/5のコストを実現。中小製造業でも無理のない投資で始められます。" },
    { n: "②", title: "「業務フロー設計」から入る", desc: "ツールを売りたいベンダーと違い、まず「どの業務が最も重要か」の優先順位設計から入ります。費用対効果の高い着手点を一緒に設計します。" },
    { n: "③", title: "現場が使えるまで伴走", desc: "導入して終わりではなく、現場スタッフが実際に使いこなすまでのトレーニング・改善・運用支援まで含めた伴走型支援です。" },
    { n: "④", title: "IT人材なしでも継続できる設計", desc: "専属エンジニアが不要な運用設計を前提にします。月額サポートプランで、継続的な改善・機能追加も担当します。" },
  ];
  return (
    <section id="why" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="選ばれる理由" en="WHY US" color="#15447b" />
        <SectionTitle>「ツールを売る」のでなく、<Highlight>「使える仕組み」</Highlight>を作ります</SectionTitle>
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          <div className="bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-[#e2e8f0] rounded-full flex items-center justify-center"><Ico d={I.x} size={18} className="text-[#64748b]" /></div><h3 className="font-bold text-[#475569] text-[17px]">よくある「ツール導入で終わる」DX</h3></div>
            <ul className="space-y-3">
              {["高額な見積もりで予算オーバー、導入断念", "現場への説明が不十分で誰も使わないまま放置", "ベンダーが自社ツールを売ることを優先、現場に合わない", "導入後のサポートが手薄で問題が起きても対応が遅い"].map((p) => (
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
  const spots = [
    { code: "SPOT 01", name: "スポット（ライト）", price: "200,000", unit: "〜", period: "0.5ヶ月 / 15時間", items: ["業務棚卸し・優先順位設計", "特定業務1〜2本のDX設計", "ツール選定・基本設定", "現場トレーニング（1回）"] },
    { code: "SPOT 02", name: "スポット（スタンダード）", price: "450,000", unit: "〜", period: "0.5〜1ヶ月 / 35時間", items: ["業務棚卸し・全体設計", "主要業務3〜5本のDX構築", "AI活用自動化フロー設計", "現場トレーニング・マニュアル作成"], featured: true },
    { code: "SPOT 03", name: "スポット（フル）", price: "900,000", unit: "〜", period: "1.5〜2ヶ月 / 75時間", items: ["業務全体の設計・再構築", "全主要業務のDX一括対応", "AI活用・データ連携設計", "定着支援・改善サポート"] },
  ];
  const subs = [
    { code: "SUB 01", name: "ライト", price: "50,000", hours: "5時間/月" },
    { code: "SUB 02", name: "スタンダード", price: "120,000", hours: "10時間/月", featured: true },
    { code: "SUB 03", name: "プロ", price: "300,000", hours: "30時間/月" },
    { code: "SUB 04", name: "エンタープライズ", price: "500,000", hours: "50時間/月" },
  ];
  return (
    <section id="plans" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#e0f2fe] to-[#f0f6fc]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="料金プラン" en="PLANS" color="#15447b" />
        <SectionTitle>現場の規模・課題に合わせた<br /><Highlight>DX支援プラン</Highlight></SectionTitle>
        <div className="mt-14">
          <div className="flex items-center justify-center gap-3 mb-8"><span className="w-10 h-px bg-[#15447b]/30" /><span className="font-bold text-[15px] text-[#15447b]">スポット支援プラン（課題特化・単発）</span><span className="w-10 h-px bg-[#15447b]/30" /></div>
          <div className="grid lg:grid-cols-3 gap-5">
            {spots.map((s) => (
              <div key={s.code} className={`relative rounded-3xl p-7 transition-all ${s.featured ? "bg-gradient-to-b from-[#15447b] to-[#0a1f3d] border-2 border-[#fbbf24] shadow-2xl" : "bg-white border-2 border-[#e2e8f0] hover:border-[#15447b] shadow-sm"}`}>
                {s.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#dc2626] text-white px-4 py-1 rounded-full font-black text-[11px] tracking-wider shadow-lg whitespace-nowrap">★ 最多ご依頼プラン</div>}
                <div className={`font-mono text-[10px] tracking-[0.3em] font-bold mb-3 ${s.featured ? "text-[#fbbf24]" : "text-[#dc2626]"}`}>{s.code}</div>
                <h3 className={`font-black mb-1 text-[18px] ${s.featured ? "text-white" : "text-[#0a1f3d]"}`}>{s.name}</h3>
                <div className={`text-[11px] mb-4 ${s.featured ? "text-white/60" : "text-[#64748b]"}`}>{s.period}</div>
                <div className={`pb-4 mb-5 border-b flex items-end gap-0.5 ${s.featured ? "border-white/15" : "border-[#e2e8f0]"}`}>
                  <span className={`text-[12px] mb-1 ${s.featured ? "text-white/60" : "text-[#64748b]"}`}>¥</span>
                  <span className={`font-black tabular-nums text-[32px] ${s.featured ? "text-white" : "text-[#0a1f3d]"}`}>{s.price}</span>
                  <span className={`text-[12px] mb-1 ${s.featured ? "text-white/60" : "text-[#64748b]"}`}>{s.unit}（税別）</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {s.items.map((f) => (<li key={f} className={`flex items-center gap-2.5 text-[13px] ${s.featured ? "text-white/90" : "text-[#0a1f3d]"}`}><span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${s.featured ? "bg-[#fbbf24]" : "bg-[#22c55e]"}`}><Ico d={I.check} size={11} className={s.featured ? "text-[#0a1f3d]" : "text-white"} /></span>{f}</li>))}
                </ul>
                <a href="#cta" onClick={() => trackEvent("click_plan", { plan: s.name, page: "dx_field" })}
                  className={`block text-center w-full h-11 leading-[2.75rem] font-bold text-[13px] rounded-full transition-all ${s.featured ? "bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] shadow-[0_4px_0_#92760e]" : "bg-[#0a1f3d] text-white hover:bg-[#15447b]"}`}>
                  {s.featured ? "このプランで相談する →" : "詳細を相談する"}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-7"><span className="w-10 h-px bg-[#15447b]/30" /><span className="font-bold text-[15px] text-[#15447b]">月額サブスクプラン（継続伴走・改善対応）</span><span className="w-10 h-px bg-[#15447b]/30" /></div>
          <p className="text-center text-[13px] text-[#475569] mb-8">スポット支援後も継続して改善・機能追加・運用対応を行いたい場合はサブスクプランへ移行できます。</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {subs.map((s) => (
              <div key={s.code} className={`relative rounded-2xl p-5 text-center ${s.featured ? "bg-gradient-to-b from-[#15447b] to-[#0a1f3d] border-2 border-[#fbbf24] shadow-xl" : "bg-white border-2 border-[#e2e8f0] hover:border-[#15447b] shadow-sm"}`}>
                {s.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fbbf24] text-[#0a1f3d] px-3 py-0.5 rounded-full font-black text-[10px] shadow whitespace-nowrap">⭐ 最多契約</div>}
                <div className={`font-mono text-[9px] tracking-[0.3em] font-bold mb-2 ${s.featured ? "text-[#fbbf24]" : "text-[#dc2626]"}`}>{s.code}</div>
                <div className={`font-black text-[14px] mb-1 ${s.featured ? "text-white" : "text-[#0a1f3d]"}`}>{s.name}</div>
                <div className={`text-[11px] mb-3 ${s.featured ? "text-white/60" : "text-[#64748b]"}`}>{s.hours}</div>
                <div className={`font-black tabular-nums text-[22px] mb-3 ${s.featured ? "text-white" : "text-[#0a1f3d]"}`}>¥{s.price}<span className={`text-[12px] font-normal ${s.featured ? "text-white/60" : "text-[#64748b]"}`}>/月</span></div>
                <a href="#cta" onClick={() => trackEvent("click_plan", { plan: s.name, page: "dx_field" })}
                  className={`block text-center w-full h-9 leading-9 font-bold text-[12px] rounded-full transition-all ${s.featured ? "bg-[#fbbf24] text-[#0a1f3d]" : "bg-[#0a1f3d] text-white hover:bg-[#15447b]"}`}>
                  相談する
                </a>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center text-[11px] text-[#64748b]">※ 表示価格はすべて税抜。スポットプランは着手前に50%前払い。サブスクは最低3ヶ月契約（以降1ヶ月単位で更新）</p>
      </div>
    </section>
  );
}

function Flow() {
  const flows = [
    { n: "01", title: "無料相談フォームにご記入", desc: "現在最も困っている業務・現場の規模・IT環境の状況をお聞かせください。事前情報をいただくことで、初回相談の質が格段に上がります。", time: "DAY 0" },
    { n: "02", title: "無料相談（60分）", desc: "現場の業務フローを丁寧にヒアリング。「どの業務をDXすると最大の効果が出るか」「どんな手法が現場に合うか」を一緒に整理します。費用感の概算もご提示します。", time: "WEEK 1" },
    { n: "03", title: "簡易レポート提出 → プラン確定", desc: "ヒアリング内容をもとに「AsIs（現状）→ToBe（あるべき姿）→具体的な改善案と費用感」をまとめた簡易レポートを作成。ご納得いただけたらプラン確定・着手します。", time: "WEEK 1〜2" },
    { n: "04", title: "構築・導入 → 現場定着支援", desc: "設計に従ってツールを構築。導入後は現場スタッフへのトレーニング・マニュアル作成・運用後の改善対応まで実施。サブスクへの移行で継続的な伴走も可能です。", time: "WEEK 2〜" },
  ];
  return (
    <section id="flow" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8">
        <Kicker jp="ご相談の流れ" en="FLOW" color="#15447b" />
        <SectionTitle>無料相談から<Highlight>最短2週間で着手</Highlight></SectionTitle>
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
  { q: "ITに詳しい社員がいないのですが、導入できますか？", a: "はい、IT人材ゼロの現場への導入が当社の得意領域です。現場スタッフが「使いやすい」と感じる操作性を前提にツールを選定・設計し、導入後のトレーニングからマニュアル作成まで実施します。「教えても使ってもらえない」を起こさない伴走支援が強みです。" },
  { q: "どのくらいの規模・業種の企業が対象ですか？", a: "従業員数10名〜200名程度の中小製造業・加工業・食品業等が主な対象です。紙・Excel・FAX中心の業務が残っている現場であれば、業種を問わず対応できます。まず無料相談でヒアリングさせてください。" },
  { q: "既存のシステム（販売管理・生産管理など）と連携できますか？", a: "API連携が可能なシステムであれば、既存システムとの連携設計も対応可能です。まず現在のシステム環境をヒアリングの上、連携の可否と費用感をご説明します。完全な連携が難しい場合でも、部分的な自動化・効率化ができるケースが多くあります。" },
  { q: "スポット支援後にサブスクへの切り替えはできますか？", a: "はい、推奨しています。スポット支援で仕組みを構築した後、継続的な改善・機能追加・運用トラブル対応をサブスクプランでカバーするのが最も多いご利用パターンです。スポット終了後にサブスク移行の場合、特別な手続きは不要で移行できます。" },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f0f6fc] to-[#e0f2fe]">
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
  const [submitting, setSubmitting] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    trackEvent("generate_lead", { event_category: "lp_dx_field", event_label: "contact_form_submit" });
    setSubmitting(true);
    await submitContactForm(e.currentTarget, "dx-field");
  }
  return (
    <section id="cta" className="relative py-16 sm:py-24 bg-gradient-to-br from-[#15447b] via-[#0a1f3d] to-[#060d1c] overflow-hidden">
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(251,191,36,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(21,68,123,0.5), transparent 40%)" }} />
      <div className="relative max-w-[1080px] mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-4 py-1.5 rounded-full mb-5 font-black text-[12px] tracking-wider shadow-lg"><Ico d={I.fire} size={14} />今月残り {seats}社限定！</div>
          <h2 className="font-black text-white text-[22px] sm:text-[40px] leading-[1.3]">まずは<span className="text-[#fbbf24]">60分の無料相談</span>から、<br />はじめませんか？</h2>
          <p className="mt-4 text-[14px] text-white/75 leading-[1.95]">現場の業務をヒアリングした上で、費用感の概算もその場でご提示します。売り込みは一切ありません。</p>
        </div>
        <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="_subject" value="【LP-D・製造業DX】無料相談お申込み" />
            <input type="hidden" name="_next" value="https://gdesign-partners.co.jp/lp/dx-field/thanks" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">お名前</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="name" type="text" required placeholder="木村 大輔" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
              <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">会社名</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="company" type="text" required placeholder="株式会社〇〇製作所" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
            </div>
            <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">メールアドレス</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="email" type="email" required placeholder="name@company.co.jp" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
            <div><label className="block font-bold text-[12px] text-[#0a1f3d] mb-1.5">最も改善したい業務（近いものを選択）</label><select name="main_issue" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition rounded-xl"><option value="">選択してください</option><option value="受発注・在庫管理の効率化">受発注・在庫管理の効率化（紙・FAX・Excel）</option><option value="日報・報告書の自動化">日報・作業報告書の入力・集計自動化</option><option value="請求・経費処理のデジタル化">請求・経費処理のデジタル化</option><option value="社内情報共有の改善">社内情報共有・ナレッジ管理の改善</option><option value="その他の業務効率化">その他の業務効率化</option></select></div>
            <div><label className="block font-bold text-[12px] text-[#0a1f3d] mb-1.5">現在の課題・相談したいこと</label><textarea name="challenge" rows={4} placeholder="例：受発注の管理がFAX・紙中心で転記に毎日2時間かかっている。DX化を検討したが見積もりが高額すぎた..." className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 py-3 text-[14px] outline-none transition placeholder:text-[#94a3b8] resize-none rounded-xl" /></div>
            <button type="submit" disabled={submitting} className="w-full h-14 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] hover:from-[#f0d87a] hover:to-[#fbbf24] text-[#0a1f3d] font-black text-[16px] rounded-full shadow-[0_6px_0_#92760e,0_8px_24px_rgba(201,162,39,0.4)] hover:shadow-[0_3px_0_#92760e] hover:translate-y-[3px] transition-all flex items-center justify-center gap-3 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">{submitting ? "送信中…" : <>無料相談を申し込む<Ico d={I.arrow} size={18} /></>}</button>
            <p className="text-[11px] text-[#94a3b8] text-center">送信後、2営業日以内にご連絡します</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function DxFieldPage() {
  useEffect(() => { trackEvent("page_view_lp_dx_field", { page: "/lp/dx-field" }); }, []);
  useScrollTracking("lp_dx_field");
  return <><FV /><SeatBar /><Problem /><Solution /><WhyUs /><Plans /><Flow /><FAQ /><CTA /></>;
}
