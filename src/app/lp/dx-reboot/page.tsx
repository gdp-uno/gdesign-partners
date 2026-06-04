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
  chart:  "M3 3v18h18M7 14l4-4 3 3 6-7",
  doc:    "M7 3h7l5 5v13H7zM14 3v5h5M9 13h8M9 17h8M9 9h3",
  fire:   "M12 2c0 4-5 6-5 11a5 5 0 0 0 10 0c0-2-1-3-2-4 0 2-1 3-2 3 0-4 1-6-1-10z",
  target: "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  plus:   "M12 5v14M5 12h14", minus: "M5 12h14",
  refresh:"M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  cpu:    "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
  users:  "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  alert:  "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  brain:  "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM9 9h.01M15 9h.01M9 14c1.5 1.5 4.5 1.5 6 0",
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
        <div className="absolute -top-20 right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#fbbf24]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[#22c55e]/10 to-transparent blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fbbf24 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 mb-6 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <Ico d={I.refresh} size={14} className="text-[#fbbf24]" />
            <span className="font-bold text-[12px] sm:text-[13px] text-white">DX導入経験があり定着しなかった企業へ</span>
          </div>
          <h1 className="font-black text-white leading-[1.3] tracking-[-0.01em] text-[28px] sm:text-[38px] lg:text-[46px] mb-5">
            前回のDX導入で<br />
            <span className="text-[#fbbf24]">失敗した経験は</span><br />
            ありませんか。
          </h1>
          <p className="text-[15px] sm:text-[16px] text-white/80 leading-[1.9] mb-8">
            業務フローから逆算した設計で、<br className="hidden sm:block" />
            今度こそ<strong className="text-[#fbbf24]">現場が本当に使える</strong>仕組みを作ります。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#cta" onClick={() => trackEvent("click_fv_cta", { page: "dx_reboot" })}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] h-14 px-8 font-black text-[15px] rounded-full shadow-[0_6px_0_#92760e] hover:shadow-[0_3px_0_#92760e] hover:translate-y-[3px] transition-all">
              30分・無料相談を申し込む <Ico d={I.arrow} size={16} />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-[13px] text-white/70">
            {["AsIs/ToBe分析から丁寧に設計", "「なぜ使われないか」を先に解決", "人材業界・サービス業 支援実績多数"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <span className="w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center shrink-0"><Ico d={I.check} size={11} className="text-white" /></span>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute -top-4 -right-3 z-20 bg-[#dc2626] text-white px-4 py-2.5 rounded-2xl shadow-xl rotate-[3deg] text-center">
            <div className="font-black text-[13px] leading-none">「高い名刺管理ツール」</div>
            <div className="font-black text-[13px] leading-none text-[#fbbf24] mt-1">になっていませんか？</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl p-7 sm:p-9 mt-8">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#fbbf24] font-bold mb-3">DX REBOOT SUPPORT</div>
            <div className="font-black text-white text-[20px] mb-4">DX再設計・定着支援</div>
            <div className="space-y-3">
              {[
                { label: "AsIs/ToBe分析", desc: "現状業務の可視化と理想フロー設計" },
                { label: "「使われない原因」の特定", desc: "前回失敗のボトルネックを明確化" },
                { label: "現場目線の再構築", desc: "スタッフが使いたくなる設計に変更" },
                { label: "定着まで伴走", desc: "研修・マニュアル・改善対応まで" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
                  <span className="shrink-0 w-5 h-5 bg-[#fbbf24] rounded-full flex items-center justify-center mt-0.5"><Ico d={I.check} size={11} className="text-[#0a1f3d]" /></span>
                  <div>
                    <div className="font-bold text-white text-[13px]">{item.label}</div>
                    <div className="text-[11px] text-white/60">{item.desc}</div>
                  </div>
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
  { icon: I.alert,   text: "kintoneやRPAを導入したが、誰も使わないまま月額費用だけかかっている「高い名刺管理ツール」状態になっている" },
  { icon: I.brain,   text: "前回の失敗の原因が分からないまま。「ツールが悪かったのか」「使い方が悪かったのか」「設計が悪かったのか」が整理できていない" },
  { icon: I.users,   text: "現場スタッフが「使いにくい」「従来の方が早い」と言って旧来の方法に戻ってしまった。定着させるための手が打てなかった" },
  { icon: I.layers,  text: "業務フローを考慮せずにツールを導入したため、現場の実態とシステムの設計がずれたまま運用不能な状態が続いている" },
  { icon: I.chart,   text: "次のDX投資をする前に、前回の失敗コストをすでに払っている。再び失敗することへの経営的なリスクを感じ、新たな投資に踏み切れない" },
];

function Problem() {
  return (
    <section id="problem" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="お悩み" en="PROBLEM" color="#dc2626" />
        <SectionTitle>「DXで失敗した」ではなく、<br className="hidden sm:block" /><Highlight color="#fecaca">「設計が合わなかった」</Highlight>だけです</SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          DXが定着しない理由はツールではなく、業務フローとの設計ミスにあります。
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
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#fbbf24] mb-3 font-bold">ROOT CAUSE</div>
          <p className="text-white font-bold text-[18px] sm:text-[20px] leading-[1.6] mb-4">DXが定着しない理由は、業務フローを無視してツールを選んだからです。</p>
          <ul className="space-y-3 text-[13px] text-white/80 leading-[1.85]">
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0 mt-1">▸</span><span>「どのツールを使うか」を先に決めるのは誤りで、「どの業務を、どんな流れで改善するか（ToBe設計）」から逆算してツールを選ぶのが正しい順序</span></li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0 mt-1">▸</span><span>DX導入後の定着率が低い組織の<strong className="text-white">73%は「現場スタッフへの事前説明・トレーニングが不足していた」</strong>と報告している（DX白書2023）</span></li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0 mt-1">▸</span><span>失敗の原因を正しく特定し、業務フロー設計から再設計すれば、同じ現場でも高い定着率を実現できる。ツールを変える必要がない場合も多い</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const steps = [
    { n: "01", title: "「なぜ定着しなかったか」の原因特定", desc: "前回の導入内容・現場の声・業務フローをヒアリングし、定着しなかった原因を明確化。「ツールが悪いのか」「設計が悪いのか」「運用が悪いのか」を正確に特定します。", period: "WEEK 1", icon: I.target },
    { n: "02", title: "業務フローのAsIs/ToBe設計", desc: "現状の業務フロー（AsIs）を可視化し、理想の業務フロー（ToBe）を現場スタッフと一緒に設計。「現場が使いたくなる設計」を優先し、ツール選定・再設計を行います。", period: "WEEK 1〜2", icon: I.refresh },
    { n: "03", title: "再構築・定着支援・継続伴走", desc: "設計に従って再構築し、現場へのトレーニング・マニュアル整備・運用後の改善対応まで実施。「使える状態になるまで帰らない」姿勢で伴走します。", period: "WEEK 2〜", icon: I.shield },
  ];
  return (
    <section id="solution" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f0f6fc] to-[#e0f2fe]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="解決策" en="SOLUTION" color="#15447b" />
        <SectionTitle>原因特定から始める<br /><Highlight>DX再設計・定着支援</Highlight></SectionTitle>
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
    { n: "①", title: "「失敗の原因特定」から入る", desc: "過去の導入内容を丁寧にヒアリングし、「なぜ定着しなかったか」を正確に特定。原因を曖昧にしたまま再設計しないのが原則です。" },
    { n: "②", title: "業務フロー設計を先に行う", desc: "ツール選定の前に、現場スタッフと一緒にAsIs/ToBe設計を実施。「現場が使いやすい設計」を優先し、その後にツールを選定します。" },
    { n: "③", title: "人材業界・サービス業の定着支援実績", desc: "kintone・Notion・Make・Google Workspace等を使った業務改善で、人材業・サービス業での定着支援実績が豊富です。" },
    { n: "④", title: "「今あるツール」を活かす", desc: "必ずしも新しいツールに切り替える必要はありません。既存のkintone・RPAの設計見直し・カスタマイズで解決できるケースも多くあります。" },
  ];
  return (
    <section id="why" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="選ばれる理由" en="WHY US" color="#15447b" />
        <SectionTitle>「またDXを頼んで失敗」を<Highlight>起こさない</Highlight>アプローチ</SectionTitle>
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          <div className="bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-[#e2e8f0] rounded-full flex items-center justify-center"><Ico d={I.x} size={18} className="text-[#64748b]" /></div><h3 className="font-bold text-[#475569] text-[17px]">また失敗するDX支援の特徴</h3></div>
            <ul className="space-y-3">
              {["失敗の原因を特定せずにツールを変えるだけ", "現場の業務フローを無視してシステム先行で設計", "導入研修が1回のみで、定着フォローがない", "ツールありきで提案し、現場の実態を軽視する"].map((p) => (
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
    { code: "SPOT 01", name: "スポット（ライト）", price: "200,000", unit: "〜", period: "0.5ヶ月 / 15時間", items: ["失敗原因の特定・分析", "業務フロー AsIs/ToBe設計", "既存ツールの改善提案", "現場トレーニング（1回）"] },
    { code: "SPOT 02", name: "スポット（スタンダード）", price: "450,000", unit: "〜", period: "0.5〜1ヶ月 / 35時間", items: ["失敗原因の特定・根本解決", "業務フロー全体の再設計", "ツール再構築・カスタマイズ", "現場トレーニング・マニュアル作成"], featured: true },
    { code: "SPOT 03", name: "スポット（フル）", price: "900,000", unit: "〜", period: "1.5〜2ヶ月 / 75時間", items: ["全業務の棚卸し・再設計", "複数ツールの統合・再構築", "部署横断の定着支援", "継続改善フロー構築"] },
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
        <SectionTitle>再設計の規模に合わせた<br /><Highlight>DX再挑戦プラン</Highlight></SectionTitle>
        <div className="mt-14">
          <div className="flex items-center justify-center gap-3 mb-8"><span className="w-10 h-px bg-[#15447b]/30" /><span className="font-bold text-[15px] text-[#15447b]">スポット支援プラン（再設計・単発）</span><span className="w-10 h-px bg-[#15447b]/30" /></div>
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
                <a href="#cta" onClick={() => trackEvent("click_plan", { plan: s.name, page: "dx_reboot" })}
                  className={`block text-center w-full h-11 leading-[2.75rem] font-bold text-[13px] rounded-full transition-all ${s.featured ? "bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] shadow-[0_4px_0_#92760e]" : "bg-[#0a1f3d] text-white hover:bg-[#15447b]"}`}>
                  {s.featured ? "このプランで相談する →" : "詳細を相談する"}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-7"><span className="w-10 h-px bg-[#15447b]/30" /><span className="font-bold text-[15px] text-[#15447b]">月額サブスクプラン（継続改善・定着支援）</span><span className="w-10 h-px bg-[#15447b]/30" /></div>
          <p className="text-center text-[13px] text-[#475569] mb-8">再設計後も継続して改善・フォロー・機能追加を行いたい場合は月額プランへ移行できます。</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {subs.map((s) => (
              <div key={s.code} className={`relative rounded-2xl p-5 text-center ${s.featured ? "bg-gradient-to-b from-[#15447b] to-[#0a1f3d] border-2 border-[#fbbf24] shadow-xl" : "bg-white border-2 border-[#e2e8f0] hover:border-[#15447b] shadow-sm"}`}>
                {s.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fbbf24] text-[#0a1f3d] px-3 py-0.5 rounded-full font-black text-[10px] shadow whitespace-nowrap">⭐ 最多契約</div>}
                <div className={`font-mono text-[9px] tracking-[0.3em] font-bold mb-2 ${s.featured ? "text-[#fbbf24]" : "text-[#dc2626]"}`}>{s.code}</div>
                <div className={`font-black text-[14px] mb-1 ${s.featured ? "text-white" : "text-[#0a1f3d]"}`}>{s.name}</div>
                <div className={`text-[11px] mb-3 ${s.featured ? "text-white/60" : "text-[#64748b]"}`}>{s.hours}</div>
                <div className={`font-black tabular-nums text-[22px] mb-3 ${s.featured ? "text-white" : "text-[#0a1f3d]"}`}>¥{s.price}<span className={`text-[12px] font-normal ${s.featured ? "text-white/60" : "text-[#64748b]"}`}>/月</span></div>
                <a href="#cta" onClick={() => trackEvent("click_plan", { plan: s.name, page: "dx_reboot" })}
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
    { n: "01", title: "無料相談フォームにご記入", desc: "前回の導入ツール・導入時期・現在の状況・最も困っていることをお聞かせください。過去の経緯を把握することで、より的確な提案が可能になります。", time: "DAY 0" },
    { n: "02", title: "無料相談（60分）・失敗原因のヒアリング", desc: "前回の導入内容・現場の声・何が問題だったかをじっくりヒアリング。「なぜ定着しなかったか」の原因を一緒に特定し、再設計の方向性を整理します。", time: "WEEK 1" },
    { n: "03", title: "簡易レポート・AsIs/ToBe提案 → プラン確定", desc: "ヒアリング内容をもとに、現状業務フロー（AsIs）・理想フロー（ToBe）・具体的な改善案と費用感をまとめた提案書を作成。内容にご納得いただけたらプラン確定です。", time: "WEEK 1〜2" },
    { n: "04", title: "再設計・再構築 → 現場定着まで伴走", desc: "設計に従ってツールを再構築。現場スタッフへのトレーニング・マニュアル作成・運用後の改善対応まで実施します。月額プランへの移行で継続的な改善も可能です。", time: "WEEK 2〜" },
  ];
  return (
    <section id="flow" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8">
        <Kicker jp="ご相談の流れ" en="FLOW" color="#15447b" />
        <SectionTitle>原因特定から再構築まで<Highlight>最短4週間</Highlight></SectionTitle>
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
  { q: "現在もkintoneの月額費用を払い続けています。既存ツールを活かすことはできますか？", a: "はい、既存ツールを活かす設計を最優先に考えます。kintoneの場合、設計・カスタマイズを見直すことで大幅に使い勝手が改善するケースが多くあります。新しいツールへの切り替えより、まず既存ツールの設計改善から検討します。" },
  { q: "前回の失敗がどんな原因だったか自分でも分かりません。それでも相談できますか？", a: "むしろそういう状況の方が多いです。「なぜ定着しなかったか」を一緒に特定することが初回相談の主な目的です。前回の導入時期・ツール名・現場の反応だけ教えていただければ、そこから原因を一緒に掘り下げます。原因が分からなくてもご連絡ください。" },
  { q: "社員から「またDXをやるの？」と言われそうで、上司への説明が難しいです。", a: "多くのお客様が同じ状況でご相談に来ます。社内説明用の資料作成をご支援することも可能です。また、初回の相談・提案の段階で「なぜ前回と違うか」を論理的に説明できる提案書を作成しますので、社内説得の材料としてご活用ください。" },
  { q: "全国どこからでも相談できますか？", a: "はい。Zoom等のオンライン打ち合わせで全国対応しています。現場視察が必要な場合は関西圏は訪問対応も可能で、それ以外の地域は都度ご相談ください。" },
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
  function handleSubmit() { trackEvent("generate_lead", { event_category: "lp_dx_reboot", event_label: "contact_form_submit" }); }
  return (
    <section id="cta" className="relative py-16 sm:py-24 bg-gradient-to-br from-[#15447b] via-[#0a1f3d] to-[#060d1c] overflow-hidden">
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(251,191,36,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(34,197,94,0.3), transparent 40%)" }} />
      <div className="relative max-w-[1080px] mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-4 py-1.5 rounded-full mb-5 font-black text-[12px] tracking-wider shadow-lg"><Ico d={I.fire} size={14} />今月残り {seats}社限定！</div>
          <h2 className="font-black text-white text-[22px] sm:text-[40px] leading-[1.3]">まずは<span className="text-[#fbbf24]">60分の無料相談</span>から、<br />はじめませんか？</h2>
          <p className="mt-4 text-[14px] text-white/75 leading-[1.95]">前回の失敗原因をヒアリングした上で、方向性と費用感をその場でご提示します。売り込みは一切ありません。</p>
        </div>
        <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-2xl">
          <form action="https://formsubmit.co/info@gdesign-partners.co.jp" method="POST" onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="_subject" value="【LP-E・DX再挑戦】無料相談お申込み" />
            <input type="hidden" name="_next" value="https://gdesign-partners.co.jp/lp/dx-reboot/thanks" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">お名前</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="name" type="text" required placeholder="鈴木 恵子" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
              <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">会社名</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="company" type="text" required placeholder="株式会社〇〇" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
            </div>
            <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">メールアドレス</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="email" type="email" required placeholder="name@company.co.jp" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
            <div><label className="block font-bold text-[12px] text-[#0a1f3d] mb-1.5">以前導入したツール（近いものを選択）</label><select name="previous_tool" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition rounded-xl"><option value="">選択してください</option><option value="kintone">kintone</option><option value="RPA（UiPath・WinActorなど）">RPA（UiPath・WinActorなど）</option><option value="Salesforce / HubSpot">Salesforce / HubSpot</option><option value="グループウェア（Slack・Teams等）">グループウェア（Slack・Teamsなど）</option><option value="その他のシステム">その他のシステム・ツール</option></select></div>
            <div><label className="block font-bold text-[12px] text-[#0a1f3d] mb-1.5">現在の状況・相談したいこと</label><textarea name="challenge" rows={4} placeholder="例：2年前にkintoneを導入したが、現場スタッフが使わず元のExcel管理に戻ってしまった。月額費用だけ払い続けている状態..." className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 py-3 text-[14px] outline-none transition placeholder:text-[#94a3b8] resize-none rounded-xl" /></div>
            <button type="submit" className="w-full h-14 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] hover:from-[#f0d87a] hover:to-[#fbbf24] text-[#0a1f3d] font-black text-[16px] rounded-full shadow-[0_6px_0_#92760e,0_8px_24px_rgba(201,162,39,0.4)] hover:shadow-[0_3px_0_#92760e] hover:translate-y-[3px] transition-all flex items-center justify-center gap-3 mt-2">無料相談を申し込む<Ico d={I.arrow} size={18} /></button>
            <p className="text-[11px] text-[#94a3b8] text-center">送信後、2営業日以内にご連絡します</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function DxRebootPage() {
  useEffect(() => { trackEvent("page_view_lp_dx_reboot", { page: "/lp/dx-reboot" }); }, []);
  useScrollTracking("lp_dx_reboot");
  return <><FV /><SeatBar /><Problem /><Solution /><WhyUs /><Plans /><Flow /><FAQ /><CTA /></>;
}
