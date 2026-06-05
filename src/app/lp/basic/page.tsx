"use client";

import { useState, useEffect } from "react";
import { submitContactForm } from "@/lib/contact";
import { useScrollTracking } from "@/lib/useScrollTracking";
import { getAvailableSeats } from "@/lib/seats";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}
function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.gtag) window.gtag("event", name, params);
}

// ── Shared UI primitives ──────────────────────────────────────────────
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
  user:   "M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 21c0-4 4-7 9-7s9 3 9 7",
  doc:    "M7 3h7l5 5v13H7zM14 3v5h5M9 13h8M9 17h8M9 9h3",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5",
  chart:  "M3 3v18h18M7 14l4-4 3 3 6-7",
  brain:  "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM9 9h.01M15 9h.01M9 14c1.5 1.5 4.5 1.5 6 0",
  star:   "M12 2l2.6 6.5L22 9.5l-5.5 4.7L18 22l-6-3.5L6 22l1.5-7.8L2 9.5l7.4-1z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z",
  mail:   "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM3 7l9 6 9-6",
  bolt:   "M13 2 4 14h7l-1 8 9-12h-7z",
  fire:   "M12 2c0 4-5 6-5 11a5 5 0 0 0 10 0c0-2-1-3-2-4 0 2-1 3-2 3 0-4 1-6-1-10z",
  pen:    "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  image:  "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  card:   "M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zM2 10h20",
  plus:   "M12 5v14M5 12h14",
  minus:  "M5 12h14",
  target: "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
};

function Kicker({ jp, en, color = "#15447b" }: { jp: string; en: string; color?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 mb-6">
      <div className="font-plex-mono text-[11px] tracking-[0.4em] font-bold" style={{ color }}>{en}</div>
      <div className="flex items-center gap-2">
        <span className="w-6 h-px" style={{ background: color }} />
        <span className="font-display font-bold text-[12px] tracking-[0.3em]" style={{ color }}>{jp}</span>
        <span className="w-6 h-px" style={{ background: color }} />
      </div>
    </div>
  );
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display font-black text-[#0a1f3d] text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.35] tracking-[-0.01em] text-center max-w-4xl mx-auto">
      {children}
    </h2>
  );
}
function Highlight({ children, color = "#fbbf24" }: { children: React.ReactNode; color?: string }) {
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

// ── Package Card (hero right side) ───────────────────────────────────
const PACKAGE_ITEMS = [
  { label: "ブランドステートメント策定", icon: I.pen },
  { label: "MVV（ミッション・ビジョン・バリュー）策定", icon: I.target },
  { label: "ロゴデザイン（3案・バリエーション含む）", icon: I.image },
  { label: "名刺デザイン（3案・表面/裏面）", icon: I.card },
  { label: "HP制作（4-5P・撮影込み）", icon: I.layers },
  { label: "会社紹介資料（A4換算6-8P）", icon: I.doc },
];

function PackageCard() {
  return (
    <div className="relative bg-white border border-[#15447b]/10 p-6 sm:p-8 rounded-2xl shadow-[0_20px_50px_-15px_rgba(21,68,123,0.35)]">
      <div className="mb-5 pr-20 sm:pr-24">
        <span className="inline-block font-plex-mono text-[10px] text-[#15447b] bg-[#e0f2fe] px-2 py-0.5 rounded mb-1.5">ALL IN ONE</span>
        <div className="font-display font-bold text-[#0a1f3d] text-[15px] sm:text-[16px]">ブランディングパッケージ　含まれるもの</div>
      </div>
      <div className="space-y-2">
        {PACKAGE_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 px-3 py-2.5 bg-[#f0f6fc] rounded-xl border border-[#ddeaf8] group hover:border-[#15447b]/30 transition-colors">
            <span className="w-5 h-5 bg-[#15447b] rounded-full flex items-center justify-center shrink-0">
              <Ico d={I.check} size={12} className="text-white" />
            </span>
            <span className="text-[13px] font-medium text-[#0a1f3d]">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t-2 border-dashed border-[#c9a227] flex items-end justify-between">
        <div>
          <div className="font-plex-mono text-[9px] text-[#64748b] mb-0.5">一括制作費</div>
          <div className="font-plex font-black text-[#0a1f3d] text-[30px] tabular-nums leading-none">
            ¥298,000<span className="text-[12px] font-bold text-[#94a3b8] ml-1">税別</span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-plex-mono text-[9px] text-[#64748b] mb-0.5">納期目安</div>
          <div className="font-plex font-black text-[#15447b] text-[22px] tabular-nums leading-none">約4週間</div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-[#e2e8f0]">
        <div className="flex items-center gap-2.5 bg-gradient-to-r from-[#fef9c3] to-[#fff7e6] border border-[#fbbf24] rounded-xl px-4 py-2.5">
          <div className="w-6 h-6 bg-[#fbbf24] rounded-full flex items-center justify-center shrink-0">
            <Ico d={I.bolt} size={13} className="text-[#0a1f3d]" />
          </div>
          <div className="text-[13px] text-[#0a1f3d] leading-snug">
            <span className="font-black">特典：</span>
            <span>生成AI活用カリキュラム</span>
            <span className="font-black text-[#dc2626] text-[15px]">　無料視聴</span>
            <span className="text-[#475569]"> つき</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FV ───────────────────────────────────────────────────────────────
function FV() {
  const seats = getAvailableSeats();
  return (
    <section className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-br from-[#e0f2fe] via-[#f0f6fc] to-[#dbeafe]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#bae6fd]/60 to-transparent blur-3xl" />
        <div className="absolute top-40 right-10 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-[#fde68a]/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[260px] h-[260px] rounded-full bg-gradient-to-br from-[#c7d2fe]/50 to-transparent blur-3xl" />
      </div>
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #15447b 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left copy */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 mb-6 bg-white border-2 border-[#15447b] px-4 py-1.5 rounded-full shadow-sm">
            <Ico d={I.bolt} size={14} className="text-[#fbbf24] fill-[#fbbf24]" />
            <span className="font-display font-bold text-[12px] sm:text-[13px] text-[#15447b]">創業期・リブランディングのためのブランド一括制作</span>
          </div>

          <h1 className="font-display font-black text-[#0a1f3d] leading-[1.25] tracking-[-0.01em] text-[28px] sm:text-[44px] lg:text-[54px]">
            ブランドの土台を、<br />
            <Highlight color="#fbbf24">4週間でつくる</Highlight>。
          </h1>
          <p className="mt-4 text-[15px] sm:text-[17px] text-[#475569] font-medium leading-[1.7]">
            売上拡大と業務効率化の両立を実現する<br className="hidden sm:block" />
            実務伴走型パートナー
          </p>

          <ul className="mt-7 space-y-3">
            {[
              "ロゴ・名刺・HP・営業資料を1社・4週間でまとめて完成",
              "MVV・ブランドステートメントから「高くても選ばれる」強みを構築",
              "複数業者への見積もり・調整疲れをすべて一気に解消",
            ].map((t, i) => (
              <li key={i} className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#0a1f3d] font-medium">
                <span className="shrink-0 w-6 h-6 bg-gradient-to-b from-[#22c55e] to-[#15803d] rounded-full flex items-center justify-center shadow-sm">
                  <Ico d={I.check} size={14} className="text-white" />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              onClick={() => trackEvent("click_cta_fv", { position: "fv" })}
              className="group inline-flex items-center gap-3 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] hover:from-[#f0d87a] hover:to-[#fbbf24] text-[#0a1f3d] h-14 px-7 font-black text-[15px] rounded-full shadow-[0_6px_0_#92760e,0_8px_24px_rgba(201,162,39,0.4)] hover:shadow-[0_3px_0_#92760e,0_4px_12px_rgba(201,162,39,0.4)] hover:translate-y-[3px] transition-all"
            >
              30秒で無料相談を申し込む
              <Ico d={I.arrow} size={16} />
            </a>
            <a href="#plans" className="inline-flex items-center gap-2 text-[#15447b] font-bold text-[14px] underline underline-offset-4 decoration-2 decoration-[#15447b]/30 hover:decoration-[#15447b] transition">
              料金プランを見る
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#475569]">
            <div className="flex items-center gap-1.5">
              <Ico d={I.star} size={14} className="text-[#fbbf24] fill-[#fbbf24]" />
              <span>一気通貫で<span className="font-bold text-[#0a1f3d]">4週間納品</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ico d={I.shield} size={14} className="text-[#15447b]" />
              <span>NDA締結対応</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ico d={I.fire} size={14} className="text-[#dc2626]" />
              <span>今月残り<span className="font-bold text-[#dc2626]">{seats}社</span>枠</span>
            </div>
          </div>
        </div>

        {/* Right: package card */}
        <div className="lg:col-span-6 relative">
          <div className="hidden lg:flex absolute -top-6 -right-3 sm:-right-5 z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white flex-col items-center justify-center shadow-xl rotate-[8deg] ring-4 ring-white">
            <span className="font-display font-black text-[16px] sm:text-[18px] leading-none text-center">最短</span>
            <span className="font-display font-black text-[18px] sm:text-[20px] leading-none text-[#fbbf24]">4週間</span>
            <span className="font-bold text-[10px] sm:text-[11px] mt-0.5">で納品!</span>
          </div>
          <PackageCard />
          <p className="mt-3 text-center text-[11px] text-[#64748b]">※ 表示価格はすべて税抜</p>
        </div>
      </div>
    </section>
  );
}

// ── Seat Bar ─────────────────────────────────────────────────────────
function SeatBar() {
  const seats = getAvailableSeats();
  const used = 5 - seats;
  return (
    <section className="bg-[#0a1f3d] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{ background: "linear-gradient(135deg, transparent 30%, rgba(21,68,123,0.8) 100%)" }}
      />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 py-7 grid sm:grid-cols-[auto_1fr_auto] items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e] shadow-[0_0_12px_#22c55e]" />
            </span>
            <span className="font-plex-mono text-[10px] tracking-[0.3em] text-[#22c55e] font-bold">LIVE・受付中</span>
          </div>
          <div className="font-display font-bold text-white text-[18px] sm:text-[20px] leading-tight">
            毎月<span className="text-[#fbbf24] tabular-nums"> 5社 </span>限定
            <span className="text-white/70 text-[14px] font-medium ml-1">/ {used}社受付済</span>
          </div>
        </div>
        <div>
          <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#fbbf24] to-[#c9a227] rounded-full" style={{ width: `${Math.round(used / 5 * 100)}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_16px_#fbbf24] ring-2 ring-[#fbbf24]" />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="absolute top-0 bottom-0 w-px bg-[#0a1f3d]/40" style={{ left: `${i * 20}%` }} />
            ))}
          </div>
        </div>
        <div className="text-right border-l border-white/15 pl-6">
          <div className="font-plex-mono text-[10px] tracking-[0.25em] text-[#fbbf24] mb-0.5">今月残り</div>
          <div className="font-plex font-black text-[#fbbf24] text-[44px] sm:text-[56px] tabular-nums leading-none drop-shadow-[0_0_24px_rgba(251,191,36,0.4)]">
            {seats}<span className="text-lg font-bold text-white/80 ml-1">社</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Problem ───────────────────────────────────────────────────────────
const PROBLEMS = [
  { icon: I.layers, text: "相見積もりと値下げの繰り返しで、技術力の本当の価値が伝わっていない" },
  { icon: I.brain,  text: "「なぜ弊社を選ぶべきか」を論理的に説明できず、商談で差別化できない" },
  { icon: I.chart,  text: "起業準備で複数業者への問い合わせ・調整に時間を奪われ、本業に集中できない" },
  { icon: I.doc,    text: "デザイン・Web・コピーを別々の業者に発注し、方向性がバラバラで統一感がない" },
  { icon: I.image,  text: "名刺・HP・提案資料に一貫性がなく、大手企業との商談で信頼感を与えられない" },
  { icon: I.pen,    text: "想いはあるのにMVVやブランドストーリーに落とし込めず、ターゲットに刺さらない" },
  { icon: I.target, text: "専門人材が不在で何が適正か分からず、ブランド整備が後回しになっている" },
];

function Problem() {
  return (
    <section id="problem" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="お悩み" en="PROBLEM" color="#dc2626" />
        <SectionTitle>
          よくあるお悩み、<Highlight color="#fecaca">ありませんか？</Highlight>
        </SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          創業期・成長期の中小企業によく耳にする7つの「詰まり」。<br className="hidden sm:block" />
          一つでも当てはまるなら、ブランドを整えるタイミングです。
        </p>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {PROBLEMS.map((p, i) => (
            <div key={i} className={`relative bg-[#f8fafc] border-2 border-[#e2e8f0] hover:border-[#15447b] hover:bg-white transition-all rounded-2xl p-6 group ${i === 6 ? "md:col-span-2 lg:col-span-3 xl:col-span-1" : ""}`}>
              <div className="absolute -top-3 -left-3 w-9 h-9 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white rounded-full flex items-center justify-center font-plex font-black text-[14px] tabular-nums shadow-md">
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

        {/* Data panel */}
        <div className="mt-14 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-2xl p-7 sm:p-10 grid sm:grid-cols-2 gap-7">
          <div>
            <div className="font-plex-mono text-[10px] tracking-[0.3em] text-[#fbbf24] mb-4 font-bold">DATA</div>
            <div className="font-display font-bold text-white text-[20px] sm:text-[22px] leading-[1.5] mb-4">
              データで見る現状
            </div>
            <ul className="space-y-3 text-[13px] text-white/80 leading-[1.85]">
              <li className="flex items-start gap-2"><span className="text-[#fbbf24] mt-1 shrink-0">▸</span><span>中小企業の<strong className="text-white">約6割</strong>が「自社の強みを言語化できていない」と回答</span></li>
              <li className="flex items-start gap-2"><span className="text-[#fbbf24] mt-1 shrink-0">▸</span><span>約<strong className="text-white">7割</strong>の企業がブランド整備の専門人材不足を課題として挙げている</span></li>
              <li className="flex items-start gap-2"><span className="text-[#fbbf24] mt-1 shrink-0">▸</span><span>価格競争からの脱却には、独自価値とブランド確立が重要な鍵</span></li>
            </ul>
          </div>
          <div className="flex flex-col justify-center">
            <ul className="space-y-3 text-[13px] text-white/80 leading-[1.85]">
              <li className="flex items-start gap-2"><span className="text-[#fbbf24] mt-1 shrink-0">▸</span><span>創業期は業者分散により、打合せや調整などの<strong className="text-white">「見えないコスト」</strong>が膨張する傾向</span></li>
              <li className="flex items-start gap-2"><span className="text-[#fbbf24] mt-1 shrink-0">▸</span><span>ブランド戦略を整備した企業は、整備前と比べて受注単価が<strong className="text-white">平均1.4倍</strong>向上する傾向がある</span></li>
            </ul>
            <div className="mt-6 pt-5 border-t border-white/15 text-center relative">
              <div className="font-display font-bold text-white text-[16px] sm:text-[18px] leading-[1.6]">
                そのお悩み、<span className="text-[#fbbf24]">Growth Design Partners</span> が解決します。
              </div>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#0a1f3d] rotate-45 hidden sm:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Target ────────────────────────────────────────────────────────────
const PERSONA_TYPES = [
  {
    title: "起業準備中・創業間もない方",
    pain: "複数業者への問い合わせ・調整疲れ",
    message: "3社への問い合わせで疲れたなら、今すぐここで完結させましょう。戦略設計から制作まで、1社・4週間で起業に必要なブランドツール一式が揃います。",
    icon: I.bolt,
  },
  {
    title: "技術力はあるのに安値で受注し続けている方",
    pain: "相見積もり・価格競争から抜け出せない",
    message: "相見積もりで疲弊する前に、あなたの技術力を「選ばれる真価」に変えませんか。市場分析から始まる戦略的ブランディングで、価格競争から脱却する土台を作ります。",
    icon: I.chart,
  },
  {
    title: "想いはあるのに言語化・可視化できていない方",
    pain: "理念・ビジョンをブランドとして整理できない",
    message: "頭の中にある熱い想いを、ターゲットに届くブランドストーリーに翻訳します。理念から始まる戦略設計で、あなただけの独自性を形にしましょう。",
    icon: I.target,
  },
];

function Target() {
  return (
    <section id="target" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f0f6fc] to-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="こんな方へ" en="FOR YOU" color="#15447b" />
        <SectionTitle>
          こんな方が多く<Highlight>ご相談されています</Highlight>
        </SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          創業・成長期のフェーズや状況によって、優先すべき課題は異なります。あなたの状況に近い方をご覧ください。
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-5 sm:gap-6">
          {PERSONA_TYPES.map((p, i) => (
            <div key={i} className="bg-white rounded-3xl border-2 border-[#e2e8f0] hover:border-[#15447b] p-7 transition-all hover:shadow-lg flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-2xl flex items-center justify-center mb-4 shrink-0">
                <Ico d={p.icon} size={22} className="text-[#fbbf24]" />
              </div>
              <h3 className="font-display font-bold text-[#0a1f3d] text-[17px] leading-[1.5] mb-2">{p.title}</h3>
              <p className="text-[12px] text-[#dc2626] font-bold mb-4 flex items-center gap-1.5">
                <Ico d={I.x} size={12} className="shrink-0" />{p.pain}
              </p>
              <div className="bg-[#f0f6fc] rounded-xl p-4 border-l-4 border-[#fbbf24] mt-auto">
                <p className="text-[13px] text-[#0a1f3d] leading-[1.85]">{p.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#cta"
            className="group inline-flex items-center gap-3 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] hover:from-[#f0d87a] hover:to-[#fbbf24] text-[#0a1f3d] h-14 px-8 font-black text-[15px] rounded-full shadow-[0_6px_0_#92760e] hover:shadow-[0_3px_0_#92760e] hover:translate-y-[3px] transition-all"
          >
            いずれかに当てはまる方、まずは無料相談へ
            <Ico d={I.arrow} size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Solution ──────────────────────────────────────────────────────────
function Solution() {
  const steps = [
    {
      n: "01", title: "理念・思想を起点とした全体設計（ブランディング）",
      desc: "事業の根幹となるMVVから市場でのポジショニングまでを設計し、「選ばれる理由」を明確化します。一貫したブランドID設計により、価格競争からの脱却を目指します。",
      icon: I.target, period: "WEEK 1",
    },
    {
      n: "02", title: "売上導線の統合設計（広告・制作＋営業支援）",
      desc: "ブランド思想と一貫した広告・HP・営業ツールを制作し、集客から商談、受注までの導線を最適化します。現場で使える営業スクリプトやCRM連動までカバーします。",
      icon: I.layers, period: "WEEK 2–3",
    },
    {
      n: "03", title: "ブランドの定着・継続運用支援",
      desc: "納品後も「育てる」フェーズを伴走します。SNS・HP更新のフォーマット整備から、営業現場でのブランド活用レクチャー、スタッフへの浸透サポートまでカバーします。",
      icon: I.chart, period: "WEEK 3–4",
    },
  ];

  return (
    <section id="solution" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f0f6fc] to-[#e0f2fe]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="解決策" en="SOLUTION" color="#15447b" />
        <SectionTitle>
          当社独自の<Highlight>3つのアプローチ</Highlight>で解決します
        </SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          理念の言語化から制作・実装まで。ブランディング・営業支援・業務設計を一気通貫でご支援します。
        </p>

        <div className="mt-14 relative grid lg:grid-cols-3 gap-5 lg:gap-8">
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
                <div className="absolute -top-4 -right-2 font-plex font-black text-[#15447b]/[0.06] text-[140px] leading-none tabular-nums select-none">{s.n}</div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white rounded-2xl shadow-lg">
                      <span className="font-plex-mono text-[8px] tracking-widest opacity-70 leading-none">STEP</span>
                      <span className="font-plex font-black text-[18px] tabular-nums leading-none mt-0.5">{s.n}</span>
                    </div>
                    <div>
                      <div className="font-plex-mono text-[10px] tracking-[0.2em] text-[#dc2626] font-bold">{s.period}</div>
                      <Ico d={s.icon} size={20} className="text-[#fbbf24]" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-[#0a1f3d] text-[17px] sm:text-[18px] leading-[1.5] mb-3">{s.title}</h3>
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

// ── Why Us ────────────────────────────────────────────────────────────
function WhyUs() {
  const problems = [
    "ブランド思想と実装が分断され、施策全体の整合性が取れない",
    "「導入して終わり」になっており、現場への定着や内製化まで支援されない",
    "それぞれの施策が部分最適になり、本来得られるはずの成果が断片化する",
    "複数社への発注により、中間マージンやコミュニケーションコストが増大する",
  ];
  const strengths = [
    { n: "①", title: "一気通貫対応", desc: "複数社発注の無駄を省き、コスト削減と施策の一貫性を両立" },
    { n: "②", title: "スタートアップ特化の専門性", desc: "創業・成長フェーズの経営課題を深く理解した支援設計で、実際の現場で使えるブランドを構築" },
    { n: "③", title: "実務伴走型支援", desc: "導入から教育・マニュアル化まで伴走し、確実な内製化を支援" },
    { n: "④", title: "戦略から制作まで一貫した品質", desc: "ヒアリング〜ブランド設計〜デザイン納品まで担当が変わらず、コンセプトのブレがない" },
  ];

  return (
    <section id="why" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="選ばれる理由" en="WHY US" color="#15447b" />
        <SectionTitle>
          一般的な分業発注との<Highlight>違い</Highlight>
        </SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          Growth Design Partnersの強みは、ブランディングから実装・定着まで一気通貫で担うことです。
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {/* Left: problems */}
          <div className="bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#e2e8f0] rounded-full flex items-center justify-center">
                <Ico d={I.x} size={18} className="text-[#64748b]" />
              </div>
              <h3 className="font-display font-bold text-[#475569] text-[17px]">一般的な分業発注の課題</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-[13.5px] text-[#475569] leading-[1.85]">
                  <span className="shrink-0 w-1 h-1 mt-2.5 rounded-full bg-[#94a3b8]" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: strengths */}
          <div className="bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-2xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#fbbf24] rounded-full flex items-center justify-center">
                <Ico d={I.check} size={18} className="text-[#0a1f3d]" />
              </div>
              <h3 className="font-display font-bold text-white text-[17px]">Growth Design Partnersの強み</h3>
            </div>
            <ul className="space-y-4">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 font-plex font-black text-[#fbbf24] text-[14px] leading-none mt-0.5 w-5">{s.n}</span>
                  <div>
                    <span className="font-display font-bold text-white text-[14px]">{s.title}</span>
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

// ── Plans ─────────────────────────────────────────────────────────────
function Plans() {
  const seats = getAvailableSeats();
  const monthlyPlans = [
    {
      code: "LIGHT", name: "ライトサポート", price: "50,000",
      items: ["月次戦略面談（60分）", "メール相談 無制限", "HP軽微更新（月1回）", "営業ツール添削（月3件）"],
    },
    {
      code: "PRO", name: "プロサポート", price: "100,000",
      items: ["月次戦略面談（月2回）", "メール相談 無制限", "HP更新（月2回）", "SNS投稿制作（月3枚）", "新規営業リスト作成（月50件）"],
      featured: true,
    },
  ];

  return (
    <section id="plans" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#e0f2fe] to-[#f0f6fc]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#15447b] to-[#0a1f3d] text-white px-5 py-2 rounded-full shadow-xl border-2 border-white">
            <Ico d={I.fire} size={14} />
            <span className="font-display font-black text-[12px] tracking-wider">毎月5社限定・今月残り {seats}社</span>
          </div>
        </div>
        <Kicker jp="料金プラン" en="PLANS" color="#15447b" />
        <SectionTitle>
          4週間・一括納品の<br className="hidden sm:block" /><Highlight>ブランディングパッケージ</Highlight>
        </SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          必要なブランドツールをすべてパッケージ化。継続的なサポートが必要な場合は月額プランをオプションで追加できます。
        </p>

        {/* Main package */}
        <div className="mt-14">
          <div className="relative bg-gradient-to-br from-[#fef9c3] to-white border-2 border-[#fbbf24] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(201,162,39,0.35)] max-w-3xl mx-auto">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#dc2626] text-white px-5 py-1 rounded-full font-display font-black text-[12px] tracking-wider shadow-lg">★ メインパッケージ</div>
            <div className="grid sm:grid-cols-2 gap-8 items-center">
              <div>
                <div className="font-plex-mono text-[10px] tracking-[0.3em] text-[#c9a227] font-bold mb-2">BRANDING PACKAGE</div>
                <h3 className="font-display font-black text-[#0a1f3d] text-[24px] sm:text-[28px] mb-3 whitespace-nowrap">ブランディングパッケージ</h3>
                <p className="text-[13px] text-[#475569] leading-[1.85] mb-5">
                  創業・リブランディング向けの一括制作プラン。ブランドステートメント・MVV・ロゴ・名刺・HP（4-5P）・営業資料を一括制作します。
                </p>
                <div className="pb-5 mb-5 border-b border-[#e2e8f0]">
                  <span className="text-[13px] text-[#64748b] mr-1">¥</span>
                  <span className="font-plex font-black text-[#0a1f3d] text-[48px] tabular-nums">298,000</span>
                  <span className="text-[13px] text-[#64748b] ml-2">（税別）</span>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-[#475569]">
                  <Ico d={I.chart} size={16} className="text-[#15447b]" />
                  <span>期間：約<strong className="text-[#0a1f3d]">4週間</strong></span>
                </div>
              </div>
              <div>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "ブランドステートメント策定",
                    "MVV（ミッション・ビジョン・バリュー）策定",
                    "ロゴデザイン（3案・バリエーション含む）",
                    "名刺デザイン（3案・表面/裏面）",
                    "HP制作（4-5P・撮影込み）",
                    "会社紹介資料（A4換算6-8P）",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-[#0a1f3d]">
                      <span className="shrink-0 w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center">
                        <Ico d={I.check} size={12} className="text-white" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  onClick={() => trackEvent("click_plan", { plan: "ブランディングパッケージ" })}
                  className="block text-center w-full h-13 py-3.5 font-black text-[14px] rounded-full bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] shadow-[0_4px_0_#92760e] hover:shadow-[0_2px_0_#92760e] hover:translate-y-[2px] transition-all"
                >
                  このプランで相談する →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly support */}
        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-7">
            <span className="w-10 h-px bg-[#15447b]/30" />
            <span className="font-display font-bold text-[15px] text-[#15447b]">月額固定サポートプラン（オプション）</span>
            <span className="w-10 h-px bg-[#15447b]/30" />
          </div>
          <p className="text-center text-[13px] text-[#475569] mb-8">ブランディングパッケージ完成後も継続してブランドを育てたい方へ。単体でのご利用も可能です。</p>
          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {monthlyPlans.map((s) => (
              <div
                key={s.code}
                className={`relative rounded-3xl p-7 transition-all ${
                  s.featured
                    ? "bg-gradient-to-b from-[#15447b] to-[#0a1f3d] text-white border-2 border-[#fbbf24] shadow-2xl"
                    : "bg-white border-2 border-[#e2e8f0] hover:border-[#15447b] shadow-sm"
                }`}
              >
                {s.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#fbbf24] text-[#0a1f3d] px-4 py-1 rounded-full font-display font-black text-[11px] tracking-wider shadow-lg">⭐ 最も人気</div>
                )}
                <div className={`font-plex-mono text-[10px] tracking-[0.3em] font-bold mb-3 ${s.featured ? "text-[#fbbf24]" : "text-[#dc2626]"}`}>{s.code}</div>
                <h3 className={`font-display font-black mb-4 text-[18px] ${s.featured ? "text-white" : "text-[#0a1f3d]"}`}>{s.name}</h3>
                <div className={`pb-4 mb-5 border-b flex items-end gap-0.5 ${s.featured ? "border-white/15" : "border-[#e2e8f0]"}`}>
                  <span className={`text-[12px] mb-1 ${s.featured ? "text-white/60" : "text-[#64748b]"}`}>¥</span>
                  <span className={`font-plex font-black tabular-nums text-[36px] ${s.featured ? "text-white" : "text-[#0a1f3d]"}`}>{s.price}</span>
                  <span className={`text-[12px] mb-1 ${s.featured ? "text-white/60" : "text-[#64748b]"}`}>/月</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {s.items.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 text-[13px] ${s.featured ? "text-white/90" : "text-[#0a1f3d]"}`}>
                      <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${s.featured ? "bg-[#fbbf24]" : "bg-[#22c55e]"}`}>
                        <Ico d={I.check} size={12} className={s.featured ? "text-[#0a1f3d]" : "text-white"} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  onClick={() => trackEvent("click_plan", { plan: s.name })}
                  className={`block text-center w-full h-11 leading-[2.75rem] font-bold text-[13px] rounded-full transition-all ${
                    s.featured
                      ? "bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] shadow-[0_4px_0_#92760e]"
                      : "bg-[#0a1f3d] text-white hover:bg-[#15447b]"
                  }`}
                >
                  {s.featured ? "このプランで申し込む →" : "詳細を相談する"}
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-gradient-to-br from-[#fef9c3] to-[#fff7e6] border-2 border-[#fbbf24] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#fbbf24] rounded-full flex items-center justify-center shrink-0">
                <Ico d={I.bolt} size={18} className="text-[#0a1f3d]" />
              </div>
              <div className="font-display font-black text-[#0a1f3d] text-[18px] sm:text-[20px]">全プラン共通特典</div>
            </div>
            <div className="bg-white rounded-xl border border-[#fbbf24]/50 px-6 py-5 text-center">
              <div className="font-display font-black text-[#15447b] text-[16px] sm:text-[18px] mb-2">
                生成AI活用カリキュラムを<span className="text-[#dc2626]">無料視聴</span>
              </div>
              <p className="text-[13px] text-[#475569] leading-[1.85]">
                ChatGPT・Claude などの業務活用ノウハウを体系的に学べるオンライン講座を<br className="hidden sm:block" />
                ご契約者様限定で無料でご覧いただけます。
              </p>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-[11px] text-[#64748b]">※ 表示価格はすべて税抜。月額プランは最低3ヶ月契約（以降1ヶ月単位で更新）</p>
      </div>
    </section>
  );
}

// ── Flow ──────────────────────────────────────────────────────────────
function Flow() {
  const flows = [
    { n: "01", title: "事前ヒアリングフォームにご記入", desc: "事業内容・現状の課題・ご希望をお聞かせください。フォーム記入後、2営業日以内にご連絡いたします。", time: "DAY 0" },
    { n: "02", title: "打合せ・ヒアリングの実施（60〜90分）", desc: "オンライン・オフラインをお選びいただけます。事業のビジョンや強みを深掘りし、ブランドの方向性を決めます。", time: "WEEK 1" },
    { n: "03", title: "最適なプラン構成のご提案", desc: "お客様の状況に合わせたサービス内容と料金をご提案します。押し売りは一切ありません。", time: "WEEK 1–2" },
    { n: "04", title: "プロジェクト開始・納品", desc: "ご合意後、速やかに実務を開始。約4週間でブランドツール一式を納品します。", time: "WEEK 2–6" },
  ];

  return (
    <section id="flow" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8">
        <Kicker jp="ご相談の流れ" en="FLOW" color="#15447b" />
        <SectionTitle>
          お問い合わせから<Highlight>4〜6週間</Highlight>で、<br className="hidden lg:block" />ブランドが動き始めます
        </SectionTitle>

        <div className="mt-12 relative">
          <div className="absolute left-7 sm:left-10 top-3 bottom-3 w-[3px] bg-gradient-to-b from-[#fbbf24] via-[#15447b] to-[#15447b]/20 rounded-full" />
          <ol className="space-y-4">
            {flows.map((f, i) => (
              <li key={i} className="relative pl-20 sm:pl-28">
                <div className="absolute left-0 top-0 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-full flex flex-col items-center justify-center text-white shadow-lg ring-4 ring-white">
                  <span className="font-plex-mono text-[8px] tracking-widest opacity-70 leading-none">STEP</span>
                  <span className="font-plex font-black text-[18px] sm:text-[24px] tabular-nums leading-none mt-0.5">{f.n}</span>
                </div>
                <div className="bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl p-5 sm:p-6 hover:border-[#15447b] hover:bg-white transition-all">
                  <div className="flex flex-wrap items-start gap-x-3 gap-y-1 mb-2">
                    <h3 className="font-display font-bold text-[#0a1f3d] text-[14px] sm:text-[18px] leading-[1.5] w-full sm:w-auto">{f.title}</h3>
                    <span className="font-plex-mono text-[10px] tracking-wider text-[#dc2626] font-bold bg-[#fef2f2] px-2 py-0.5 rounded">{f.time}</span>
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

// ── FAQ ───────────────────────────────────────────────────────────────
const FAQS = [
  { q: "創業前・設立直後でも依頼できますか？", a: "はい、むしろ創業前・設立直後のご依頼を歓迎しています。事業が動き出す前にブランドの土台を整えることで、営業活動をスムーズにスタートできます。" },
  { q: "ロゴのデザインイメージはどう決まりますか？", a: "ヒアリング時に事業の世界観・ターゲット・競合分析をもとに方向性を設定します。2〜3パターンを提案し、フィードバックを反映して仕上げます。完全オリジナルの制作です。" },
  { q: "4週間で本当にすべて完成しますか？", a: "ヒアリング〜最終納品まで約4週間を標準としています。お客様のフィードバックのスピードによって前後することがありますが、スケジュールは事前に共有し進行します。" },
  { q: "全国どこからでも相談できますか？", a: "はい。大阪拠点ですが全国対応しています。打合せはオンライン（Zoom等）で実施可能です。ご希望の場合は関西圏への訪問対応もいたします。" },
  { q: "月額サポートはブランディングパッケージと一緒に申し込む必要がありますか？", a: "いいえ、ブランディングパッケージ単体でのご利用も可能です。納品後に必要性を感じた段階で月額プランへのお申込みもできます。同時申込の場合は割引特典があります。" },
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
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full text-left flex items-start justify-between gap-4 p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="shrink-0 w-9 h-9 bg-[#dc2626] text-white rounded-full flex items-center justify-center font-display font-black text-[14px]">Q</span>
                    <span className="font-display font-bold text-[#0a1f3d] text-[15px] sm:text-[16px] leading-[1.6] pt-1">{f.q}</span>
                  </div>
                  <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-[#15447b] text-white rotate-180" : "bg-[#f0f6fc] text-[#15447b]"}`}>
                    <Ico d={isOpen ? I.minus : I.plus} size={16} />
                  </div>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6">
                      <div className="flex items-start gap-4">
                        <span className="shrink-0 w-9 h-9 bg-[#15447b] text-white rounded-full flex items-center justify-center font-display font-black text-[14px] ml-[52px] sm:ml-[60px] -translate-x-full">A</span>
                        <p className="text-[13.5px] text-[#475569] leading-[1.95]">{f.a}</p>
                      </div>
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

// ── CTA / Contact ─────────────────────────────────────────────────────
function CTA() {
  const seats = getAvailableSeats();
  const [submitting, setSubmitting] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    trackEvent("generate_lead", { event_category: "lp_basic", event_label: "contact_form_submit" });
    setSubmitting(true);
    await submitContactForm(e.currentTarget, "basic");
  }
  return (
    <section id="cta" className="relative py-16 sm:py-24 bg-gradient-to-br from-[#15447b] via-[#0a1f3d] to-[#060d1c] overflow-hidden">
      <div
        className="absolute inset-0 opacity-15"
        style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(251,191,36,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(21,68,123,0.5), transparent 40%)" }}
      />
      <div className="relative max-w-[1080px] mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-4 py-1.5 rounded-full mb-5 font-display font-black text-[12px] tracking-wider shadow-lg">
            <Ico d={I.fire} size={14} />今月残り {seats}社限定！
          </div>
          <h2 className="font-display font-black text-white text-[22px] sm:text-[40px] leading-[1.3]">
            まずは<span className="text-[#fbbf24]">30分の無料相談</span>から、<br />はじめませんか？
          </h2>
          <p className="mt-4 text-[14px] text-white/75 leading-[1.95]">
            2営業日以内にご返信いたします。営業や売り込みは一切ありません。
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-2xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input type="hidden" name="_subject" value="【ブランディングLP】無料相談お申込み" />
            <input type="hidden" name="_next" value="https://gdesign-partners.co.jp/lp/basic/thanks" />
            <input type="hidden" name="_captcha" value="false" />

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-1.5 mb-1.5">
                  <span className="font-display font-bold text-[12px] text-[#0a1f3d]">お名前</span>
                  <span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span>
                </label>
                <input name="name" type="text" required placeholder="山田 太郎"
                  className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" />
              </div>
              <div>
                <label className="flex items-center gap-1.5 mb-1.5">
                  <span className="font-display font-bold text-[12px] text-[#0a1f3d]">会社名</span>
                  <span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span>
                </label>
                <input name="company" type="text" required placeholder="株式会社〇〇"
                  className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-1.5 mb-1.5">
                <span className="font-display font-bold text-[12px] text-[#0a1f3d]">メールアドレス</span>
                <span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span>
              </label>
              <input name="email" type="email" required placeholder="name@company.co.jp"
                className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" />
            </div>

            <div>
              <label className="block font-display font-bold text-[12px] text-[#0a1f3d] mb-1.5">ご希望プラン</label>
              <select name="plan"
                className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition rounded-xl">
                <option value="">まだ決めていない</option>
                <option value="ブランディングパッケージ（¥298,000）">ブランディングパッケージ（¥298,000）</option>
                <option value="ブランディングパッケージ＋ライトサポート（¥50,000/月）">ブランディングパッケージ＋ライトサポート（¥50,000/月）</option>
                <option value="ブランディングパッケージ＋プロサポート（¥100,000/月）">ブランディングパッケージ＋プロサポート（¥100,000/月）</option>
                <option value="月額サポートのみ">月額サポートのみ</option>
              </select>
            </div>

            <div>
              <label className="block font-display font-bold text-[12px] text-[#0a1f3d] mb-1.5">現状の課題・ご相談内容</label>
              <textarea name="challenge" rows={4}
                placeholder="例：来月創業予定で、ブランドの方向性から整えたいと考えています..."
                className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 py-3 text-[14px] outline-none transition placeholder:text-[#94a3b8] resize-none rounded-xl" />
            </div>

            <button type="submit" disabled={submitting}
              className="group w-full h-14 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] hover:from-[#f0d87a] hover:to-[#fbbf24] text-[#0a1f3d] font-black text-[16px] rounded-full shadow-[0_6px_0_#92760e,0_8px_24px_rgba(201,162,39,0.4)] hover:shadow-[0_3px_0_#92760e,0_4px_12px_rgba(201,162,39,0.4)] hover:translate-y-[3px] transition-all flex items-center justify-center gap-3 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? "送信中…" : <>無料相談を申し込む<Ico d={I.arrow} size={18} /></>}
            </button>
            <p className="text-[11px] text-[#94a3b8] text-center">送信後、2営業日以内にご連絡します</p>
          </form>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────
export default function BasicLpPage() {
  useEffect(() => {
    trackEvent("page_view_lp_basic", { page: "/lp/basic" });
  }, []);
  useScrollTracking("lp_basic");

  return (
    <>
      <FV />
      <SeatBar />
      <Problem />
      <Target />
      <Solution />
      <WhyUs />
      <Plans />
      <Flow />
      <FAQ />
      <CTA />
    </>
  );
}
