"use client";

import { useState, useEffect } from "react";
import { useScrollTracking } from "@/lib/useScrollTracking";
import { getAvailableSeats } from "@/lib/seats";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}
function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.gtag) window.gtag("event", name, params);
}

function Ico({ d, size = 20, className = "" }: { d: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
const I = {
  arrow:  "M5 12h14M13 6l6 6-6 6",
  check:  "M4 12l5 5L20 6",
  x:      "M18 6 6 18M6 6l12 12",
  clock:  "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM12 7v5l3 2",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5",
  chart:  "M3 3v18h18M7 14l4-4 3 3 6-7",
  brain:  "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM9 9h.01M15 9h.01M9 14c1.5 1.5 4.5 1.5 6 0",
  doc:    "M7 3h7l5 5v13H7zM14 3v5h5M9 13h8M9 17h8M9 9h3",
  star:   "M12 2l2.6 6.5L22 9.5l-5.5 4.7L18 22l-6-3.5L6 22l1.5-7.8L2 9.5l7.4-1z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z",
  mail:   "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM3 7l9 6 9-6",
  bolt:   "M13 2 4 14h7l-1 8 9-12h-7z",
  fire:   "M12 2c0 4-5 6-5 11a5 5 0 0 0 10 0c0-2-1-3-2-4 0 2-1 3-2 3 0-4 1-6-1-10z",
  target: "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  plus:   "M12 5v14M5 12h14",
  minus:  "M5 12h14",
  image:  "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  pen:    "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  user:   "M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 21c0-4 4-7 9-7s9 3 9 7",
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
  // 下線は absolute をやめ、文字背面の背景帯で表現（折り返しても各行に正しく描画）
  return (
    <span
      className="[box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
      style={{
        backgroundImage: `linear-gradient(${color}99, ${color}99)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 100%",
        backgroundSize: "100% 0.625rem",
      }}
    >
      {children}
    </span>
  );
}

// ── FV ───────────────────────────────────────────────────────────────
function FV() {
  return (
    <section className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-br from-[#e0f2fe] via-[#f0f6fc] to-[#dbeafe]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#bae6fd]/60 to-transparent blur-3xl" />
        <div className="absolute top-40 right-10 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-[#fde68a]/40 to-transparent blur-3xl" />
      </div>
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #15447b 1px, transparent 1px)", backgroundSize: "24px 24px", maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }}
      />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 mb-6 bg-white border-2 border-[#15447b] px-4 py-1.5 rounded-full shadow-sm">
            <Ico d={I.bolt} size={14} className="text-[#fbbf24] fill-[#fbbf24]" />
            <span className="font-bold text-[12px] sm:text-[13px] text-[#15447b]">起業準備中・創業直後の方へ</span>
          </div>
          <h1 className="font-black text-[#0a1f3d] leading-[1.3] tracking-[-0.01em] text-[20px] sm:text-[38px] lg:text-[42px] mb-5 [text-wrap:balance]">
            <span className="inline-block">3社への問い合わせで</span>
            <span className="inline-block"><Highlight color="#fbbf24">疲れたなら</Highlight>、</span>
            <span className="inline-block">今すぐここで完結させましょう。</span>
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#475569] leading-[1.9] mb-8">
            ロゴ・名刺・HP・営業資料まで、<strong className="text-[#0a1f3d]">1社・4週間</strong>でブランドをまるごと整えます。<br />
            起業に必要なツール一式を、戦略設計から制作まで一気通貫でご提供します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#cta" onClick={() => trackEvent("click_fv_cta", { page: "brand_start" })}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] h-14 px-8 font-black text-[15px] rounded-full shadow-[0_6px_0_#92760e] hover:shadow-[0_3px_0_#92760e] hover:translate-y-[3px] transition-all">
              30分・無料相談を申し込む
              <Ico d={I.arrow} size={16} />
            </a>
            <a href="#problem" className="inline-flex items-center justify-center gap-2 text-[#15447b] font-bold text-[14px] hover:underline">
              よくある悩みを見る <Ico d={I.arrow} size={14} />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-[13px] text-[#475569]">
            {["売り込み一切なし", "全国オンライン対応", "実績100社以上"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <span className="w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center shrink-0">
                  <Ico d={I.check} size={11} className="text-white" />
                </span>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="hidden lg:flex absolute -top-6 -right-3 z-20 w-28 h-28 rounded-full bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white flex-col items-center justify-center shadow-xl rotate-[8deg] ring-4 ring-white">
            <span className="font-black text-[16px] leading-none">最短</span>
            <span className="font-black text-[20px] leading-none text-[#fbbf24]">4週間</span>
            <span className="font-bold text-[10px] mt-0.5">で納品!</span>
          </div>
          <div className="bg-white rounded-3xl border-2 border-[#e2e8f0] shadow-2xl p-7 sm:p-9">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#c9a227] font-bold mb-2">BRANDING PACKAGE</div>
            <div className="font-black text-[#0a1f3d] text-[22px] mb-3">ブランディングパッケージ</div>
            <div className="flex items-end gap-1 pb-5 mb-5 border-b border-[#e2e8f0]">
              <span className="text-[13px] text-[#64748b]">¥</span>
              <span className="font-black text-[#0a1f3d] text-[48px] tabular-nums leading-none">298,000</span>
              <span className="text-[13px] text-[#64748b] mb-1">（税別）</span>
            </div>
            <ul className="space-y-2.5">
              {[
                "ブランドステートメント策定",
                "MVV（ミッション・ビジョン・バリュー）",
                "ロゴデザイン（3案・バリエーション含む）",
                "名刺デザイン（3案・表裏）",
                "HP制作（4-5P・撮影込み）",
                "会社紹介資料（A4換算6-8P）",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[13px] text-[#0a1f3d]">
                  <span className="shrink-0 w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center">
                    <Ico d={I.check} size={11} className="text-white" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-[#e2e8f0] text-[12px] text-[#64748b]">
              不要なコンテンツは値引き、追加は単品売値で対応可能。柔軟にカスタマイズできます。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SeatBar ─────────────────────────────────────────────────────────
function SeatBar() {
  const seats = getAvailableSeats();
  const used = 5 - seats;
  return (
    <section className="bg-[#0a1f3d] relative overflow-hidden">
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 py-7 grid sm:grid-cols-[auto_1fr_auto] items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e]" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#22c55e] font-bold">LIVE・受付中</span>
          </div>
          <div className="font-bold text-white text-[18px] sm:text-[20px] leading-tight">
            毎月<span className="text-[#fbbf24] tabular-nums"> 5社 </span>限定
            <span className="text-white/70 text-[14px] font-medium ml-1">/ {used}社受付済</span>
          </div>
        </div>
        <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#fbbf24] to-[#c9a227] rounded-full" style={{ width: `${Math.round(used / 5 * 100)}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_16px_#fbbf24] ring-2 ring-[#fbbf24]" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="absolute top-0 bottom-0 w-px bg-[#0a1f3d]/40" style={{ left: `${i * 20}%` }} />
          ))}
        </div>
        <div className="text-right border-l border-white/15 pl-6">
          <div className="font-mono text-[10px] tracking-[0.25em] text-[#fbbf24] mb-0.5">今月残り</div>
          <div className="font-black text-[#fbbf24] text-[48px] sm:text-[56px] tabular-nums leading-none drop-shadow-[0_0_24px_rgba(251,191,36,0.4)]">
            {seats}<span className="text-lg font-bold text-white/80 ml-1">社</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Problem ──────────────────────────────────────────────────────────
const PROBLEMS = [
  { icon: I.layers, text: "ロゴ・名刺・HP・営業資料をそれぞれ別の業者に問い合わせ中で、毎回同じ説明を繰り返すことに疲弊している" },
  { icon: I.chart,  text: "デザイン会社・Web制作会社・コピーライターに別々に発注した結果、方向性がバラバラで統一感が出ない" },
  { icon: I.brain,  text: "どの業者が本当に良い仕事をしてくれるか判断基準がなく、決断できないまま時間だけが経過している" },
  { icon: I.clock,  text: "外注管理や打ち合わせ調整に時間を取られ、本来注力すべき営業活動や事業準備が後回しになっている" },
  { icon: I.doc,    text: "予算の全体感が見えず「どこにいくらかけるべきか」が分からないまま、ブランド整備が進まない" },
];

function Problem() {
  return (
    <section id="problem" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="お悩み" en="PROBLEM" color="#dc2626" />
        <SectionTitle>
          <span className="inline-block">起業準備中によくある</span><span className="inline-block"><Highlight color="#fecaca">「詰まり」</Highlight>、ありませんか？</span>
        </SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          複数の業者への問い合わせ・調整に疲れ、事業開始が遅れていませんか。<br className="hidden sm:block" />
          一つでも当てはまるなら、今すぐ解決する方法があります。
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
          {PROBLEMS.map((p, i) => (
            <div key={i} className={`relative bg-[#f8fafc] border-2 border-[#e2e8f0] hover:border-[#15447b] hover:bg-white transition-all rounded-2xl p-6 group lg:col-span-2 ${i === 3 ? "lg:col-start-2" : ""} ${i === 4 ? "md:col-span-2 md:max-w-md md:mx-auto lg:col-start-4 lg:max-w-none lg:mx-0" : ""}`}>
              <div className="absolute -top-3 -left-3 w-9 h-9 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white rounded-full flex items-center justify-center font-mono font-black text-[14px] shadow-md">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex items-start gap-4 pl-3">
                <div className="w-12 h-12 bg-[#fef2f2] border border-[#fecaca] rounded-xl flex items-center justify-center text-[#dc2626] shrink-0">
                  <Ico d={p.icon} size={22} />
                </div>
                <p className="text-[14px] leading-[1.85] text-[#0a1f3d] font-medium pt-1.5">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-2xl p-7 sm:p-10">
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#fbbf24] mb-3 font-bold">INSIGHT</div>
          <p className="text-white font-bold text-[18px] sm:text-[20px] leading-[1.6] mb-4">
            起業準備期は「見えないコスト」が最も膨らみやすいフェーズです。
          </p>
          <ul className="space-y-3 text-[13px] text-white/80 leading-[1.85]">
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0">▸</span><span>業者分散により、打ち合わせ・調整などの<strong className="text-white">「見えないコスト」</strong>が平均2〜3ヶ月分の時間ロスを生む</span></li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0">▸</span><span>ブランドツール（ロゴ・名刺・HP・営業資料）の不統一が、最初の商談での<strong className="text-white">信頼感の低下</strong>を招き、受注率に直結する</span></li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0">▸</span><span>創業期にブランドの土台を整えた企業は、整備前と比べて初年度の受注単価が<strong className="text-white">平均1.4倍</strong>向上する傾向がある</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── Solution ─────────────────────────────────────────────────────────
function Solution() {
  const steps = [
    { n: "01", title: "ブランドの土台を一から設計", desc: "「なぜこの事業をやるのか」「誰に、どう思われたいか」を深堀りし、MVV・ブランドステートメントを策定。これが以降の全制作物の「共通ものさし」になります。", period: "WEEK 1–1.5", icon: I.target },
    { n: "02", title: "一貫したブランドツールを一括制作", desc: "戦略と一致したロゴ・名刺・HP・営業資料を並行制作。別々の業者への発注ゼロ。方向性がブレない、一気通貫の品質管理を実現します。", period: "WEEK 2–4", icon: I.layers },
    { n: "03", title: "使い方説明付きで完全納品", desc: "「明日からどう使えばいいか」が分かる状態でお渡し。納品後の継続サポートプランも選択可能。一人でも安心して事業をスタートできます。", period: "WEEK 4", icon: I.bolt },
  ];
  return (
    <section id="solution" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f0f6fc] to-[#e0f2fe]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="解決策" en="SOLUTION" color="#15447b" />
        <SectionTitle>
          1社・<Highlight>4週間</Highlight>で、<br className="hidden sm:block" />起業に必要なブランドがまるごと揃う
        </SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          戦略設計から制作・納品まで、一気通貫でお任せください。<br className="hidden sm:block" />複数業者への問い合わせは今日で終わりです。
        </p>
        <div className="mt-14 grid lg:grid-cols-3 gap-5 lg:gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {i < 2 && (
                <div className="hidden lg:flex absolute top-[64px] -right-7 z-10 items-center justify-center w-12 h-12 -translate-y-1/2">
                  <div className="w-12 h-12 bg-[#fbbf24] text-[#0a1f3d] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(201,162,39,0.4)] ring-4 ring-white">
                    <Ico d={I.arrow} size={20} />
                  </div>
                </div>
              )}
              <div className="relative bg-white rounded-3xl p-7 lg:p-9 shadow-xl border border-[#15447b]/10 h-full overflow-hidden">
                <div className="absolute -top-4 -right-2 font-mono font-black text-[#15447b]/[0.06] text-[140px] leading-none tabular-nums select-none">{s.n}</div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white rounded-2xl shadow-lg">
                      <span className="font-mono text-[8px] tracking-widest opacity-70 leading-none">STEP</span>
                      <span className="font-black text-[18px] tabular-nums leading-none mt-0.5">{s.n}</span>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.2em] text-[#dc2626] font-bold">{s.period}</div>
                      <Ico d={s.icon} size={20} className="text-[#fbbf24]" />
                    </div>
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

// ── WhyUs ────────────────────────────────────────────────────────────
function WhyUs() {
  const strengths = [
    { n: "①", title: "一気通貫・窓口1社", desc: "複数業者への発注ゼロ。打ち合わせ・調整コストを省き、コンセプトのブレがない制作を実現します。" },
    { n: "②", title: "起業・創業フェーズへの深い理解", desc: "創業期の不安や「早く形にしたい」というニーズを熟知。スピードと品質を両立した支援設計です。" },
    { n: "③", title: "戦略から制作まで一貫した品質", desc: "ヒアリング〜ブランド設計〜デザイン〜納品まで担当者が変わらず、思想のブレが生じません。" },
    { n: "④", title: "使える状態まで伴走", desc: "納品時に使い方を丁寧にレクチャー。「もらったけど使えない」が起きない仕上げを徹底します。" },
  ];
  return (
    <section id="why" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="選ばれる理由" en="WHY US" color="#15447b" />
        <SectionTitle>
          <span className="block">なぜ、</span>
          <span className="block"><Highlight>Growth Design Partners</Highlight></span>
          <span className="block">が選ばれるのか</span>
        </SectionTitle>
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          <div className="bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#e2e8f0] rounded-full flex items-center justify-center">
                <Ico d={I.x} size={18} className="text-[#64748b]" />
              </div>
              <h3 className="font-bold text-[#475569] text-[17px]">複数業者分散発注の課題</h3>
            </div>
            <ul className="space-y-3">
              {["毎回同じ説明を繰り返す、打ち合わせコストの増大", "業者ごとに方向性がズレ、統一感のないブランドに", "複数の担当者に気を遣いながらの調整疲れ", "中間マージンや調整コストによる予算の膨張"].map((p) => (
                <li key={p} className="flex items-start gap-3 text-[13.5px] text-[#475569] leading-[1.85]">
                  <span className="shrink-0 w-1 h-1 mt-2.5 rounded-full bg-[#94a3b8]" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-2xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#fbbf24] rounded-full flex items-center justify-center">
                <Ico d={I.check} size={18} className="text-[#0a1f3d]" />
              </div>
              <h3 className="font-bold text-white text-[17px]">Growth Design Partnersの強み</h3>
            </div>
            <ul className="space-y-4">
              {strengths.map((s) => (
                <li key={s.n} className="flex items-start gap-3">
                  <span className="shrink-0 font-black text-[#fbbf24] text-[14px] w-5">{s.n}</span>
                  <div>
                    <span className="font-bold text-white text-[14px]">{s.title}</span>
                    <p className="text-[12.5px] text-white/70 leading-[1.7] mt-0.5">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Plans ────────────────────────────────────────────────────────────
function Plans() {
  const monthly = [
    { code: "LIGHT", name: "ライトサポート", price: "50,000", items: ["月次戦略面談（60分）", "メール相談 無制限", "HP軽微更新（月1回）", "営業ツール添削（月3件）"] },
    { code: "PRO", name: "プロサポート", price: "100,000", items: ["月次戦略面談（月2回）", "メール相談 無制限", "HP更新（月2回）", "SNS投稿制作（月3枚）", "新規営業リスト作成（月50件）"], featured: true },
  ];
  return (
    <section id="plans" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#e0f2fe] to-[#f0f6fc]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="料金プラン" en="PLANS" color="#15447b" />
        <SectionTitle>4週間・一括納品の<br /><Highlight>ブランディングパッケージ</Highlight></SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          必要なブランドツールをすべてパッケージ化。<br className="hidden sm:block" />継続的なサポートが必要な場合は月額プランを追加できます。
        </p>
        <div className="mt-14">
          <div className="relative bg-gradient-to-br from-[#fef9c3] to-white border-2 border-[#fbbf24] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(201,162,39,0.35)] max-w-3xl mx-auto">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#dc2626] text-white px-5 py-1 rounded-full font-black text-[12px] tracking-wider shadow-lg">★ メインパッケージ</div>
            <div className="grid sm:grid-cols-2 gap-8 items-center">
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-[#c9a227] font-bold mb-2">BRANDING PACKAGE</div>
                <h3 className="font-black text-[#0a1f3d] text-[24px] sm:text-[28px] mb-3 whitespace-nowrap">ブランディングパッケージ</h3>
                <p className="text-[13px] text-[#475569] leading-[1.85] mb-5">
                  起業・創業向け一括制作プラン。ブランドステートメント・MVV・ロゴ・名刺・HP・営業資料を一括制作します。
                </p>
                <div className="pb-5 mb-5 border-b border-[#e2e8f0]">
                  <span className="text-[13px] text-[#64748b] mr-1">¥</span>
                  <span className="font-black text-[#0a1f3d] text-[48px] tabular-nums">298,000</span>
                  <span className="text-[13px] text-[#64748b] ml-2">（税別）</span>
                </div>
                <div className="text-[13px] text-[#475569] flex items-center gap-2">
                  <Ico d={I.clock} size={15} className="text-[#15447b]" />
                  期間：約<strong className="text-[#0a1f3d]">4週間</strong>
                </div>
                <p className="mt-3 text-[12px] text-[#64748b]">不要なコンテンツは値引き、追加は単品売値で対応可能。</p>
              </div>
              <div>
                <ul className="space-y-2.5 mb-7">
                  {["ブランドステートメント策定", "MVV（ミッション・ビジョン・バリュー）策定", "ロゴデザイン（3案・バリエーション含む）", "名刺デザイン（3案・表面/裏面）", "HP制作（4-5P・撮影込み）", "会社紹介資料（A4換算6-8P）"].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-[#0a1f3d]">
                      <span className="shrink-0 w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center">
                        <Ico d={I.check} size={11} className="text-white" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#cta" onClick={() => trackEvent("click_plan", { plan: "ブランディングパッケージ", page: "brand_start" })}
                  className="block text-center w-full py-3.5 font-black text-[14px] rounded-full bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] shadow-[0_4px_0_#92760e] hover:shadow-[0_2px_0_#92760e] hover:translate-y-[2px] transition-all">
                  このプランで相談する →
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-7">
            <span className="w-10 h-px bg-[#15447b]/30" />
            <span className="font-bold text-[15px] text-[#15447b]">月額固定サポートプラン（オプション）</span>
            <span className="w-10 h-px bg-[#15447b]/30" />
          </div>
          <p className="text-center text-[13px] text-[#475569] mb-8">パッケージ完成後も継続してブランドを育てたい方へ。単体でのご利用も可能です。</p>
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
                  {s.items.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 text-[13px] ${s.featured ? "text-white/90" : "text-[#0a1f3d]"}`}>
                      <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${s.featured ? "bg-[#fbbf24]" : "bg-[#22c55e]"}`}>
                        <Ico d={I.check} size={11} className={s.featured ? "text-[#0a1f3d]" : "text-white"} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#cta" onClick={() => trackEvent("click_plan", { plan: s.name, page: "brand_start" })}
                  className={`block text-center w-full h-11 leading-[2.75rem] font-bold text-[13px] rounded-full transition-all ${s.featured ? "bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] shadow-[0_4px_0_#92760e]" : "bg-[#0a1f3d] text-white hover:bg-[#15447b]"}`}>
                  {s.featured ? "このプランで申し込む →" : "詳細を相談する"}
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-gradient-to-br from-[#fef9c3] to-[#fff7e6] border-2 border-[#fbbf24] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto text-center">
            <div className="font-black text-[#0a1f3d] text-[18px] mb-2">全プラン共通特典</div>
            <p className="text-[13px] text-[#475569] leading-[1.85]">
              生成AI（ChatGPT・Claude）業務活用カリキュラムを<span className="font-bold text-[#dc2626]">無料視聴</span>。<br />ご契約者様限定のオンライン講座で、AI活用ノウハウを体系的に学べます。
            </p>
          </div>
        </div>
        <p className="mt-8 text-center text-[11px] text-[#64748b]">※ 表示価格はすべて税抜。月額プランは最低3ヶ月契約（以降1ヶ月単位で更新）</p>
      </div>
    </section>
  );
}

// ── Flow ─────────────────────────────────────────────────────────────
function Flow() {
  const flows = [
    { n: "01", title: "事前ヒアリングフォームにご記入", desc: "事業内容・現状の課題・ターゲット・希望納期などをお聞かせください。既存のロゴや資料があれば共有いただけると、初回面談がより有意義になります。", time: "DAY 0" },
    { n: "02", title: "打ち合わせ・ヒアリングの実施（60〜90分）", desc: "「なぜこの事業をやるのか」「どんなお客様に、どう思われたいか」「3年後どうなっていたいか」など、ブランドの根幹を一緒に言語化します。", time: "WEEK 1" },
    { n: "03", title: "調査・分析 → ブランドステートメント策定", desc: "市場分析・競合分析・ポジショニングを経て、全制作物の「共通ものさし」となるブランドステートメントを策定します。修正上限2回。", time: "WEEK 1–1.5" },
    { n: "04", title: "各種制作物の並行制作 → 納品", desc: "ロゴ・名刺（1週目）、HP（2〜3週目）、営業資料（4週目）を並行制作。使い方説明付きで「明日から使える」状態で納品します。", time: "WEEK 2–4" },
  ];
  return (
    <section id="flow" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8">
        <Kicker jp="ご相談の流れ" en="FLOW" color="#15447b" />
        <SectionTitle>お問い合わせから<Highlight>4〜6週間</Highlight>で、<br className="hidden lg:block" />ブランドが動き始めます</SectionTitle>
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

// ── FAQ ──────────────────────────────────────────────────────────────
const FAQS = [
  { q: "法人設立前・まだ登記していない段階でも依頼できますか？", a: "はい、むしろ創業前・設立直後のご依頼を歓迎しています。法人設立より先にブランドの土台を整えることで、創業直後の営業活動をスムーズにスタートできます。個人事業主・フリーランスの方も対応しています。" },
  { q: "4週間で本当にすべて完成しますか？", a: "ヒアリング〜最終納品まで約4週間を標準としています。ブランドステートメントが確定してから制作物の並行作業を開始するため、お客様のフィードバックのスピードが重要です。スケジュールは事前に共有し、週次で進捗確認します。" },
  { q: "不要なコンテンツは省いて価格を下げられますか？", a: "はい、ブランドステートメント策定のみ必須コンテンツとなりますが、その他（ロゴ・名刺・HP・営業資料）は組み合わせ自由です。不要なものは値引き、追加したいものは単品価格で対応します。まずはご要望をお聞かせください。" },
  { q: "全国どこからでも相談できますか？", a: "はい。大阪拠点ですが全国対応しています。打ち合わせはZoom等でのオンライン実施が可能です。関西圏への訪問対応もご相談ください。" },
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
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 pl-[72px]">
                      <p className="text-[13.5px] text-[#475569] leading-[1.95]">{f.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── CTA ──────────────────────────────────────────────────────────────
function CTA() {
  const seats = getAvailableSeats();
  function handleSubmit() {
    trackEvent("generate_lead", { event_category: "lp_brand_start", event_label: "contact_form_submit" });
  }
  return (
    <section id="cta" className="relative py-16 sm:py-24 bg-gradient-to-br from-[#15447b] via-[#0a1f3d] to-[#060d1c] overflow-hidden">
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(251,191,36,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(21,68,123,0.5), transparent 40%)" }} />
      <div className="relative max-w-[1080px] mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-4 py-1.5 rounded-full mb-5 font-black text-[12px] tracking-wider shadow-lg">
            <Ico d={I.fire} size={14} />今月残り {seats}社限定！
          </div>
          <h2 className="font-black text-white text-[22px] sm:text-[40px] leading-[1.3]">
            まずは<span className="text-[#fbbf24]">30分の無料相談</span>から、<br />はじめませんか？
          </h2>
          <p className="mt-4 text-[14px] text-white/75 leading-[1.95]">
            2営業日以内にご返信いたします。売り込みは一切ありません。
          </p>
        </div>
        <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-2xl">
          <form action="https://formsubmit.co/info@gdesign-partners.co.jp" method="POST" onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="_subject" value="【LP-A・起業準備】無料相談お申込み" />
            <input type="hidden" name="_next" value="https://gdesign-partners.co.jp/lp/brand-start/thanks" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-1.5 mb-1.5">
                  <span className="font-bold text-[12px] text-[#0a1f3d]">お名前</span>
                  <span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span>
                </label>
                <input name="name" type="text" required placeholder="田中 誠"
                  className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" />
              </div>
              <div>
                <label className="flex items-center gap-1.5 mb-1.5">
                  <span className="font-bold text-[12px] text-[#0a1f3d]">会社名 / 屋号</span>
                  <span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span>
                </label>
                <input name="company" type="text" required placeholder="株式会社〇〇（または予定の屋号）"
                  className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 mb-1.5">
                <span className="font-bold text-[12px] text-[#0a1f3d]">メールアドレス</span>
                <span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span>
              </label>
              <input name="email" type="email" required placeholder="name@company.co.jp"
                className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" />
            </div>
            <div>
              <label className="block font-bold text-[12px] text-[#0a1f3d] mb-1.5">現在のご状況</label>
              <select name="situation" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition rounded-xl">
                <option value="">選択してください</option>
                <option value="起業準備中（3ヶ月以内に設立予定）">起業準備中（3ヶ月以内に設立予定）</option>
                <option value="創業1年未満">創業1年未満</option>
                <option value="創業1〜3年（リブランディング検討）">創業1〜3年（リブランディング検討）</option>
                <option value="個人事業主・フリーランス">個人事業主・フリーランス</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-[12px] text-[#0a1f3d] mb-1.5">ご希望プラン</label>
              <select name="plan" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition rounded-xl">
                <option value="">まだ決めていない</option>
                <option value="ブランディングパッケージ（¥298,000）">ブランディングパッケージ（¥298,000）</option>
                <option value="ブランディングパッケージ＋ライトサポート">ブランディングパッケージ＋ライトサポート（¥50,000/月）</option>
                <option value="ブランディングパッケージ＋プロサポート">ブランディングパッケージ＋プロサポート（¥100,000/月）</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-[12px] text-[#0a1f3d] mb-1.5">現状の課題・ご相談内容</label>
              <textarea name="challenge" rows={4} placeholder="例：来月法人設立予定で、ロゴ・名刺・HPをまとめてお願いしたいと思っています..."
                className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 py-3 text-[14px] outline-none transition placeholder:text-[#94a3b8] resize-none rounded-xl" />
            </div>
            <button type="submit" className="group w-full h-14 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] hover:from-[#f0d87a] hover:to-[#fbbf24] text-[#0a1f3d] font-black text-[16px] rounded-full shadow-[0_6px_0_#92760e,0_8px_24px_rgba(201,162,39,0.4)] hover:shadow-[0_3px_0_#92760e] hover:translate-y-[3px] transition-all flex items-center justify-center gap-3 mt-2">
              無料相談を申し込む
              <Ico d={I.arrow} size={18} />
            </button>
            <p className="text-[11px] text-[#94a3b8] text-center">送信後、2営業日以内にご連絡します</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function BrandStartPage() {
  useEffect(() => {
    trackEvent("page_view_lp_brand_start", { page: "/lp/brand-start" });
  }, []);
  useScrollTracking("lp_brand_start");
  return (
    <>
      <FV />
      <SeatBar />
      <Problem />
      <Solution />
      <WhyUs />
      <Plans />
      <Flow />
      <FAQ />
      <CTA />
    </>
  );
}
