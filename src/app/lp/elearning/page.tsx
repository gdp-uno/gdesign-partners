"use client";

import { useState, useEffect } from "react";
import { submitContactForm } from "@/lib/contact";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}
function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.gtag) window.gtag("event", name, params);
}

// ── Shared UI ─────────────────────────────────────────────────────────
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
  bolt:   "M13 2 4 14h7l-1 8 9-12h-7z",
  fire:   "M12 2c0 4-5 6-5 11a5 5 0 0 0 10 0c0-2-1-3-2-4 0 2-1 3-2 3 0-4 1-6-1-10z",
  star:   "M12 2l2.6 6.5L22 9.5l-5.5 4.7L18 22l-6-3.5L6 22l1.5-7.8L2 9.5l7.4-1z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z",
  play:   "M5 3l14 9-14 9V3z",
  users:  "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  book:   "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  chart:  "M3 3v18h18M7 14l4-4 3 3 6-7",
  clock:  "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM12 7v5l3 2",
  mail:   "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM3 7l9 6 9-6",
  plus:   "M12 5v14M5 12h14",
  minus:  "M5 12h14",
  target: "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5",
  cog:    "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41",
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

// ── FV ────────────────────────────────────────────────────────────────
function FV() {
  return (
    <section className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-br from-[#0a1f3d] via-[#15447b] to-[#1e5fa8]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#fbbf24]/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#22c55e]/15 to-transparent blur-3xl" />
      </div>
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(251,191,36,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left copy */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 mb-6 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <Ico d={I.bolt} size={14} className="text-[#fbbf24] fill-[#fbbf24]" />
            <span className="font-display font-bold text-[12px] sm:text-[13px] text-white/90">生成AI × 企業研修 × ライセンス販売</span>
          </div>

          <h1 className="font-display font-black text-white leading-[1.25] tracking-[-0.01em] text-[32px] sm:text-[44px] lg:text-[46px]">
            チーム全員が、<br />
            <Highlight color="#fbbf24">AIを使いこなせる</Highlight><br />
            会社へ。
          </h1>

          <p className="mt-5 text-[15px] sm:text-[17px] text-white/70 font-medium leading-[1.7]">
            月額5,000円/人から。600社・4,000名が選んだ<br className="hidden sm:block" />
            実務直結型・生成AI eラーニング
          </p>

          <ul className="mt-7 space-y-3">
            {[
              "400コンテンツ以上。初心者から上級者まで体系的に学べる",
              "業務別（営業・マーケ・バックオフィス）カリキュラムで即戦力化",
              "AI倫理・セキュリティリテラシーも完備。安心して全社展開できる",
            ].map((t, i) => (
              <li key={i} className="flex items-center gap-3 text-[14px] sm:text-[15px] text-white/85 font-medium">
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
              className="inline-flex items-center gap-3 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] hover:from-[#f0d87a] hover:to-[#fbbf24] text-[#0a1f3d] h-14 px-7 font-black text-[15px] rounded-full shadow-[0_6px_0_#92760e,0_8px_24px_rgba(201,162,39,0.4)] hover:shadow-[0_3px_0_#92760e,0_4px_12px_rgba(201,162,39,0.4)] hover:translate-y-[3px] transition-all"
            >
              無料で資料請求・お申込み
              <Ico d={I.arrow} size={16} />
            </a>
            <a href="#pricing" className="inline-flex items-center gap-2 text-white/70 font-bold text-[14px] underline underline-offset-4 decoration-2 decoration-white/30 hover:decoration-white transition">
              料金を確認する
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white/60">
            <div className="flex items-center gap-1.5">
              <Ico d={I.star} size={14} className="text-[#fbbf24] fill-[#fbbf24]" />
              <span>導入実績<span className="font-bold text-white">600社以上</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ico d={I.users} size={14} className="text-[#22c55e]" />
              <span>指導実績<span className="font-bold text-white">4,000名以上</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ico d={I.book} size={14} className="text-[#fbbf24]" />
              <span><span className="font-bold text-white">400</span>コンテンツ以上</span>
            </div>
          </div>
        </div>

        {/* Right: price card */}
        <div className="lg:col-span-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-[#fbbf24] text-[#0a1f3d] px-4 py-1 rounded-full font-display font-black text-[12px] mb-3">
                <Ico d={I.bolt} size={12} className="fill-[#0a1f3d]" />ライセンス料金
              </div>
              <div className="font-plex-mono text-[11px] tracking-[0.2em] text-white/50 mb-2">PER LICENSE / MONTH</div>
            </div>
            <div className="space-y-2.5">
              {[
                { range: "1〜9ライセンス",    price: "5,000",  off: null,   base: true },
                { range: "10〜29ライセンス",   price: "4,500",  off: "10%OFF" },
                { range: "30〜49ライセンス",   price: "4,000",  off: "20%OFF" },
                { range: "50〜99ライセンス",   price: "3,500",  off: "30%OFF" },
                { range: "100ライセンス以上",  price: "3,000",  off: "40%OFF", best: true },
              ].map((row) => (
                <div
                  key={row.range}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl ${
                    row.best
                      ? "bg-[#fbbf24]/20 border-2 border-[#fbbf24] ring-2 ring-[#fbbf24]/20"
                      : row.base
                      ? "bg-white/10 border border-white/15"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {row.best && <span className="font-plex-mono text-[9px] tracking-widest text-[#fbbf24] font-bold">BEST</span>}
                    <span className={`text-[13px] font-medium ${row.best ? "text-white" : "text-white/75"}`}>{row.range}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {row.off && (
                      <span className={`text-[11px] font-black px-1.5 py-0.5 rounded ${row.best ? "bg-[#fbbf24] text-[#0a1f3d]" : "bg-white/15 text-[#22c55e]"}`}>{row.off}</span>
                    )}
                    <span className={`font-plex font-black tabular-nums ${row.best ? "text-[#fbbf24] text-[22px]" : "text-white text-[20px]"}`}>
                      ¥{row.price}
                      <span className="text-[11px] font-medium text-white/50 ml-0.5">/月</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-[11px] text-white/40 mt-4">※ 表示価格はすべて税抜・1ライセンスあたり月額</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { num: "600社", label: "以上の導入実績" },
    { num: "4,000名", label: "以上の指導実績" },
    { num: "400+", label: "のコンテンツ数" },
    { num: "60%", label: "業務効率向上" },
  ];
  return (
    <section className="bg-[#0a1f3d] py-6">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-plex font-black text-[#fbbf24] text-[28px] sm:text-[36px] tabular-nums leading-none">{s.num}</div>
            <div className="font-display text-[11px] sm:text-[12px] text-white/60 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Problem ───────────────────────────────────────────────────────────
const PROBLEMS = [
  { icon: I.users,  text: "ChatGPTが話題になったが、使いこなせているのは一部の社員だけ。AI格差が広がっている" },
  { icon: I.chart,  text: "外部研修会社に頼むと1回50万円以上。予算が合わず継続できない" },
  { icon: I.layers, text: "社員に自力で勉強させたが、成果がバラバラで組織として底上げできていない" },
  { icon: I.shield, text: "ChatGPTに業務情報を入力していいのか判断できず、情報漏えいリスクが怖い" },
  { icon: I.clock,  text: "研修を組んでも現場で使われない「机上の空論」になってしまう" },
  { icon: I.target, text: "何から学ばせればいいか優先順位が分からず、AI導入が後回しになっている" },
];

function Problem() {
  return (
    <section id="problem" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="お悩み" en="PROBLEM" color="#dc2626" />
        <SectionTitle>
          こんなお悩み、<Highlight color="#fecaca">ありませんか？</Highlight>
        </SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          AI活用を進めたくても「コスト・定着・リスク」の壁に直面する企業は少なくありません。
        </p>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {PROBLEMS.map((p, i) => (
            <div key={i} className="relative bg-[#f8fafc] border-2 border-[#e2e8f0] hover:border-[#15447b] hover:bg-white transition-all rounded-2xl p-6 group">
              <div className="absolute -top-3 -left-3 w-9 h-9 bg-gradient-to-br from-[#dc2626] to-[#b91c1c] text-white rounded-full flex items-center justify-center font-plex font-black text-[14px] tabular-nums shadow-md">
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
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white px-8 py-7 rounded-2xl shadow-xl text-center relative">
            <div className="font-display font-bold text-[18px] sm:text-[22px] leading-[1.6]">
              そのお悩み、<span className="text-[#fbbf24]">月5,000円/人</span>で解決できます。
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#0a1f3d] rotate-45" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Target ────────────────────────────────────────────────────────────
const PERSONAS = [
  {
    title: "AI研修を低コストで継続したい人事・研修担当",
    pain: "外部研修は高すぎて継続できない",
    message: "1回50万円の外部研修より、月5,000円/人のライセンスで継続的に学ばせる方が定着します。管理画面で進捗も把握できるので、人事担当者の管理コストも最小限です。",
    icon: I.users,
  },
  {
    title: "全社のAI活用を標準化したいスタートアップ経営者・COO",
    pain: "AIスキルのバラつきで生産性格差が拡大",
    message: "使える人と使えない人の生産性格差を放置していいですか。業務別カリキュラムで、各部門が必要なスキルを最短で習得。セキュリティ教育も含まれるので安心して全社展開できます。",
    icon: I.chart,
  },
  {
    title: "DX推進を命じられた中小企業オーナー・IT担当",
    pain: "予算も人材もない中でAI研修をしたい",
    message: "「DXしろ」と言われても予算も専門人材もない。月5,000円から始められ、社員が自分のペースで学べるので、研修担当者が不要。まず試せるライトプランから始めましょう。",
    icon: I.cog,
  },
];

function Target() {
  return (
    <section id="target" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f0f6fc] to-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="こんな方へ" en="FOR YOU" color="#15447b" />
        <SectionTitle>
          こんな方が多く<Highlight>ご検討されています</Highlight>
        </SectionTitle>
        <div className="mt-12 grid md:grid-cols-3 gap-5 sm:gap-6">
          {PERSONAS.map((p, i) => (
            <div key={i} className="bg-white rounded-3xl border-2 border-[#e2e8f0] hover:border-[#15447b] p-7 transition-all hover:shadow-lg flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-2xl flex items-center justify-center mb-4 shrink-0">
                <Ico d={p.icon} size={22} className="text-[#fbbf24]" />
              </div>
              <h3 className="font-display font-bold text-[#0a1f3d] text-[17px] leading-[1.5] mb-2">{p.title}</h3>
              <p className="text-[12px] text-[#dc2626] font-bold mb-4 flex items-center gap-1.5">
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
                {p.pain}
              </p>
              <div className="bg-[#f0f6fc] rounded-xl p-4 border-l-4 border-[#fbbf24] mt-auto">
                <p className="text-[13px] text-[#0a1f3d] leading-[1.85]">{p.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────
function Features() {
  const features = [
    {
      n: "01", icon: I.play,
      title: "動画形式で隙間時間に学習",
      desc: "1本5〜15分のショート動画形式。通勤中・昼休み・業務の合間にスマホで完結。研修のために時間をブロックする必要がありません。",
      tag: "継続率UP",
    },
    {
      n: "02", icon: I.layers,
      title: "400コンテンツ以上の体系カリキュラム",
      desc: "ChatGPT基礎から業務活用、プロンプト設計、セキュリティ対策、上級者向け自動化まで。役職・業務・習熟度に合わせて学べます。",
      tag: "初心者〜上級者",
    },
    {
      n: "03", icon: I.target,
      title: "業務別・部門別カリキュラム",
      desc: "営業・マーケティング・カスタマーサポート・バックオフィスなど業務別に最適化。「自分には関係ない」と感じさせない実務直結の内容です。",
      tag: "即戦力化",
    },
    {
      n: "04", icon: I.shield,
      title: "AI倫理・セキュリティも対応",
      desc: "情報漏えいリスク・著作権・ハルシネーション対策など、企業が安心してAIを使うために必要なリテラシーを体系的にカバーします。",
      tag: "リスク管理",
    },
  ];

  return (
    <section id="features" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f0f6fc] to-[#e0f2fe]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="特徴" en="FEATURES" color="#15447b" />
        <SectionTitle>
          なぜ<Highlight>600社</Highlight>が選んだのか
        </SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          「安いだけ」「コンテンツが多いだけ」ではありません。実務で使える設計が選ばれる理由です。
        </p>
        <div className="mt-14 grid lg:grid-cols-2 gap-5 lg:gap-8">
          {features.map((f, i) => (
            <div key={i} className="relative bg-white rounded-3xl p-7 lg:p-9 shadow-xl border border-[#15447b]/10 overflow-hidden">
              <div className="absolute -top-4 -right-2 font-plex font-black text-[#15447b]/[0.06] text-[140px] leading-none tabular-nums select-none">{f.n}</div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                    <Ico d={f.icon} size={24} className="text-[#fbbf24]" />
                  </div>
                  <span className="inline-flex items-center bg-[#e0f2fe] text-[#15447b] font-plex-mono font-bold text-[10px] tracking-wider px-2.5 py-1 rounded-full">{f.tag}</span>
                </div>
                <h3 className="font-display font-bold text-[#0a1f3d] text-[19px] sm:text-[20px] leading-[1.45] mb-3">{f.title}</h3>
                <p className="text-[13.5px] text-[#475569] leading-[1.95]">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Results ───────────────────────────────────────────────────────────
function Results() {
  const results = [
    { before: "10時間", after: "3時間", label: "資料作成にかかる時間", unit: "67%削減" },
    { before: "—", after: "15時間", label: "月間残業時間の削減量", unit: "削減" },
    { before: "—", after: "2倍", label: "新規アイデア創出量", unit: "向上" },
  ];
  return (
    <section id="results" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="導入効果" en="RESULTS" color="#15447b" />
        <SectionTitle>
          導入企業の<Highlight>平均的な変化</Highlight>
        </SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          学んだその日から業務で使える。eラーニング導入後の平均的な変化です。
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {results.map((r, i) => (
            <div key={i} className="relative bg-gradient-to-b from-[#f0f6fc] to-white border-2 border-[#e2e8f0] rounded-3xl p-7 text-center hover:border-[#15447b] transition-all">
              <div className="font-plex-mono text-[10px] tracking-[0.2em] text-[#64748b] mb-4">{r.label}</div>
              {r.before !== "—" && (
                <div className="mb-3">
                  <div className="inline-flex items-center gap-2 text-[#94a3b8] line-through text-[14px]">
                    <span>従来：</span>
                    <span className="font-plex font-black text-[24px]">{r.before}</span>
                  </div>
                  <div className="text-[20px] text-[#94a3b8] my-1">↓</div>
                </div>
              )}
              <div className="font-plex font-black text-[#0a1f3d] text-[48px] sm:text-[56px] tabular-nums leading-none">
                {r.after}
              </div>
              <div className="mt-3 inline-flex items-center gap-1 bg-[#dcfce7] text-[#15803d] font-black text-[13px] px-3 py-1 rounded-full">
                <Ico d={I.chart} size={12} />
                {r.unit}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] text-[#94a3b8]">※ 導入企業の平均的な効果。個別の結果は状況により異なります。</p>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────
function Pricing() {
  const tiers = [
    { range: "1〜9", unit: "5,000", off: null,   monthly: null },
    { range: "10〜29", unit: "4,500", off: "10%", monthly: "45,000〜" },
    { range: "30〜49", unit: "4,000", off: "20%", monthly: "120,000〜", featured: true },
    { range: "50〜99", unit: "3,500", off: "30%", monthly: "175,000〜" },
    { range: "100+",   unit: "3,000", off: "40%", monthly: "300,000〜" },
  ];

  return (
    <section id="pricing" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#e0f2fe] to-[#f0f6fc]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="料金プラン" en="PRICING" color="#15447b" />
        <SectionTitle>
          チームの規模に合わせた<Highlight>ボリューム割引</Highlight>
        </SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          ライセンス数が増えるほどお得になります。まずは少人数から試して、効果を確認してから拡大できます。
        </p>

        <div className="mt-14 max-w-3xl mx-auto space-y-3">
          {tiers.map((t) => (
            <div
              key={t.range}
              className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl px-6 py-5 transition-all ${
                t.featured
                  ? "bg-gradient-to-r from-[#15447b] to-[#0a1f3d] border-2 border-[#fbbf24] shadow-xl"
                  : "bg-white border-2 border-[#e2e8f0] hover:border-[#15447b] shadow-sm"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#fbbf24] text-[#0a1f3d] px-4 py-1 rounded-full font-display font-black text-[11px] tracking-wider shadow-lg">⭐ 人気プラン</div>
              )}
              <div className="flex items-center gap-4">
                <div className={`font-plex-mono text-[11px] tracking-wider font-bold px-3 py-1 rounded-full ${t.featured ? "bg-white/15 text-[#fbbf24]" : "bg-[#f0f6fc] text-[#15447b]"}`}>
                  {t.range}ライセンス
                </div>
                {t.off && (
                  <span className={`font-black text-[12px] px-2 py-0.5 rounded ${t.featured ? "bg-[#fbbf24] text-[#0a1f3d]" : "bg-[#dcfce7] text-[#15803d]"}`}>{t.off}OFF</span>
                )}
              </div>
              <div className="flex items-end gap-3">
                <div className="text-right">
                  <div className={`text-[11px] mb-0.5 ${t.featured ? "text-white/50" : "text-[#64748b]"}`}>1人あたり月額</div>
                  <div className={`font-plex font-black text-[28px] tabular-nums leading-none ${t.featured ? "text-[#fbbf24]" : "text-[#0a1f3d]"}`}>
                    ¥{t.unit}
                    <span className={`text-[12px] font-medium ml-1 ${t.featured ? "text-white/50" : "text-[#64748b]"}`}>/月</span>
                  </div>
                </div>
                {t.monthly && (
                  <div className={`text-right border-l pl-3 ${t.featured ? "border-white/15" : "border-[#e2e8f0]"}`}>
                    <div className={`text-[11px] mb-0.5 ${t.featured ? "text-white/50" : "text-[#64748b]"}`}>月額合計（目安）</div>
                    <div className={`font-plex font-black text-[18px] tabular-nums leading-none ${t.featured ? "text-white" : "text-[#475569]"}`}>
                      ¥{t.monthly}<span className={`text-[11px] font-medium ml-0.5 ${t.featured ? "text-white/50" : "text-[#64748b]"}`}>〜</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white border-2 border-[#fbbf24]/40 rounded-2xl p-5 sm:p-6 max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#fef9c3] border border-[#fbbf24] rounded-xl flex items-center justify-center text-[#c9a227] shrink-0">
              <Ico d={I.bolt} size={18} />
            </div>
            <div>
              <div className="font-display font-bold text-[#0a1f3d] text-[15px] mb-1">申込・視聴開始について</div>
              <p className="text-[13px] text-[#475569] leading-[1.85]">
                当月20日までのお申込みで、翌月1日から視聴可能。月額制・自動更新（解約届がない場合）。<br />
                最低契約期間の定めなし。いつでも解約できます。
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] text-[#94a3b8]">※ 表示価格はすべて税抜。</p>
      </div>
    </section>
  );
}

// ── Flow ──────────────────────────────────────────────────────────────
function Flow() {
  const steps = [
    { n: "01", title: "お申込み・ヒアリング", desc: "フォームよりお申込みください。2営業日以内にご連絡し、ライセンス数・ご利用部門などを簡単にヒアリングします。", time: "DAY 0–2" },
    { n: "02", title: "ライセンス発行", desc: "ヒアリング後、ライセンスキーをご担当者様にお送りします。社員への配布方法もサポートします。", time: "DAY 3–5" },
    { n: "03", title: "視聴開始・全社展開", desc: "各社員がアカウントを作成してすぐに視聴開始できます。管理画面で進捗をリアルタイムに把握できます。", time: "MONTH 1" },
    { n: "04", title: "効果測定・継続改善", desc: "月次で視聴率・習熟度レポートを提供。活用が進んでいない部門へのフォローも行います。", time: "MONTH 2+" },
  ];

  return (
    <section id="flow" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8">
        <Kicker jp="導入の流れ" en="FLOW" color="#15447b" />
        <SectionTitle>
          申込から<Highlight>最短5日</Highlight>で視聴開始
        </SectionTitle>
        <div className="mt-12 relative">
          <div className="absolute left-7 sm:left-10 top-3 bottom-3 w-[3px] bg-gradient-to-b from-[#fbbf24] via-[#15447b] to-[#15447b]/20 rounded-full" />
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li key={i} className="relative pl-20 sm:pl-28">
                <div className="absolute left-0 top-0 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-full flex flex-col items-center justify-center text-white shadow-lg ring-4 ring-white">
                  <span className="font-plex-mono text-[8px] tracking-widest opacity-70 leading-none">STEP</span>
                  <span className="font-plex font-black text-[18px] sm:text-[24px] tabular-nums leading-none mt-0.5">{s.n}</span>
                </div>
                <div className="bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl p-5 sm:p-6 hover:border-[#15447b] hover:bg-white transition-all">
                  <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                    <h3 className="font-display font-bold text-[#0a1f3d] text-[16px] sm:text-[18px] leading-[1.5]">{s.title}</h3>
                    <span className="font-plex-mono text-[10px] tracking-wider text-[#dc2626] font-bold bg-[#fef2f2] px-2 py-0.5 rounded">{s.time}</span>
                  </div>
                  <p className="text-[13.5px] text-[#475569] leading-[1.95]">{s.desc}</p>
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
  { q: "最低何ライセンスから申し込めますか？", a: "1ライセンスから申し込み可能です。まず1名で試して、効果を確認してから全社展開という形でも問題ありません。" },
  { q: "いつから視聴できますか？", a: "当月20日までのお申込みで翌月1日から視聴可能です。ライセンス発行後はすぐにアクセスできます。" },
  { q: "途中解約はできますか？", a: "はい、最低契約期間の定めはなく、いつでも解約できます。解約手続きは翌月1日付の解約として処理されます。" },
  { q: "スマートフォンでも視聴できますか？", a: "はい。PC・スマートフォン・タブレットに対応しています。通勤時間や隙間時間にも学習できます。" },
  { q: "管理者が進捗を確認できますか？", a: "はい。管理画面から各社員の視聴状況・習熟度をリアルタイムで確認できます。未視聴者へのリマインドも可能です。" },
  { q: "コンテンツはどれくらいの頻度で更新されますか？", a: "生成AIの進化に合わせて定期的にコンテンツを更新・追加しています。追加費用なく最新コンテンツをご利用いただけます。" },
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
                      <div className="flex items-start gap-4 pl-[52px] sm:pl-[60px]">
                        <span className="shrink-0 w-9 h-9 bg-[#15447b] text-white rounded-full flex items-center justify-center font-display font-black text-[14px] -ml-[52px] sm:-ml-[60px]">A</span>
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

// ── CTA ───────────────────────────────────────────────────────────────
function CTA() {
  const [submitting, setSubmitting] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    trackEvent("generate_lead", { event_category: "lp_elearning", event_label: "contact_form_submit" });
    setSubmitting(true);
    await submitContactForm(e.currentTarget, "elearning");
  }
  return (
    <section id="cta" className="relative py-16 sm:py-24 bg-gradient-to-br from-[#0a1f3d] via-[#15447b] to-[#1e5fa8] overflow-hidden">
      <div
        className="absolute inset-0 opacity-15"
        style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(251,191,36,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(34,197,94,0.3), transparent 40%)" }}
      />
      <div className="relative max-w-[1080px] mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display font-black text-white text-[28px] sm:text-[40px] leading-[1.3]">
            まずは<span className="text-[#fbbf24]">無料相談・資料請求</span>から
          </h2>
          <p className="mt-4 text-[14px] text-white/70 leading-[1.95] max-w-xl mx-auto">
            ライセンス数・ご利用部門・導入スケジュールなど、お気軽にご相談ください。<br className="hidden sm:block" />
            2営業日以内にご連絡いたします。
          </p>
        </div>
        <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-2xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input type="hidden" name="_subject" value="【eラーニングLP】資料請求・お申込み" />
            <input type="hidden" name="_next" value="https://gdesign-partners.co.jp/lp/elearning/thanks" />
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

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-1.5 mb-1.5">
                  <span className="font-display font-bold text-[12px] text-[#0a1f3d]">メールアドレス</span>
                  <span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span>
                </label>
                <input name="email" type="email" required placeholder="name@company.co.jp"
                  className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" />
              </div>
              <div>
                <label className="block font-display font-bold text-[12px] text-[#0a1f3d] mb-1.5">希望ライセンス数（目安）</label>
                <select name="licenses"
                  className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition rounded-xl">
                  <option value="">まだ決めていない</option>
                  <option value="1〜9名">1〜9名</option>
                  <option value="10〜29名">10〜29名</option>
                  <option value="30〜49名">30〜49名</option>
                  <option value="50〜99名">50〜99名</option>
                  <option value="100名以上">100名以上</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-display font-bold text-[12px] text-[#0a1f3d] mb-1.5">ご質問・ご要望</label>
              <textarea name="message" rows={4}
                placeholder="例：まず10名で試したい、セキュリティ研修を重点的にやりたい、など"
                className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 py-3 text-[14px] outline-none transition placeholder:text-[#94a3b8] resize-none rounded-xl" />
            </div>

            <button type="submit" disabled={submitting}
              className="w-full h-14 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] hover:from-[#f0d87a] hover:to-[#fbbf24] text-[#0a1f3d] font-black text-[16px] rounded-full shadow-[0_6px_0_#92760e,0_8px_24px_rgba(201,162,39,0.4)] hover:shadow-[0_3px_0_#92760e,0_4px_12px_rgba(201,162,39,0.4)] hover:translate-y-[3px] transition-all flex items-center justify-center gap-3 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? "送信中…" : <>無料で資料請求・お申込み<Ico d={I.arrow} size={18} /></>}
            </button>
            <p className="text-[11px] text-[#94a3b8] text-center">送信後、2営業日以内にご連絡します</p>
          </form>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────
export default function ElearningLpPage() {
  useEffect(() => {
    trackEvent("page_view_lp_elearning", { page: "/lp/elearning" });
  }, []);

  return (
    <>
      <FV />
      <StatsBar />
      <Problem />
      <Target />
      <Features />
      <Results />
      <Pricing />
      <Flow />
      <FAQ />
      <CTA />
    </>
  );
}
