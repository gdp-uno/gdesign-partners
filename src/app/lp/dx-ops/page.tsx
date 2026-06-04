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
  plus:   "M12 5v14M5 12h14", minus: "M5 12h14",
  cpu:    "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
  users:  "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  zap:    "M13 2 4 14h7l-1 8 9-12h-7z",
  bolt:   "M13 2 4 14h7l-1 8 9-12h-7z",
  code:   "M16 18l6-6-6-6M8 6l-6 6 6 6",
  rocket: "M9 11l-4 4m0 0l-3 3m3-3l3 3m5-14l4-4m0 0l3 3m-3-3l-3 3M3 3l18 18",
  trend:  "M23 6l-9.5 9.5-5-5L1 18",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  target: "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
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
    <section className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-br from-[#060d1c] via-[#0a1f3d] to-[#060d1c]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-gradient-to-bl from-[#6366f1]/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#fbbf24]/10 to-transparent blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 mb-6 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <Ico d={I.rocket} size={14} className="text-[#6366f1]" />
            <span className="font-bold text-[12px] sm:text-[13px] text-white">急成長スタートアップのCOO・オペレーション担当者へ</span>
          </div>
          <h1 className="font-black text-white leading-[1.3] tracking-[-0.01em] text-[28px] sm:text-[38px] lg:text-[46px] mb-5">
            エンジニアリソースを<br />
            <span className="text-[#fbbf24]">プロダクト開発</span>に<br />
            集中させませんか。
          </h1>
          <p className="text-[15px] sm:text-[16px] text-white/80 leading-[1.9] mb-8">
            Claude Code活用で、バックオフィス自動化を<br className="hidden sm:block" />
            <strong className="text-[#fbbf24]">従来の1/3の工数・期間</strong>で実現します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#cta" onClick={() => trackEvent("click_fv_cta", { page: "dx_ops" })}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] h-14 px-8 font-black text-[15px] rounded-full shadow-[0_6px_0_#92760e] hover:shadow-[0_3px_0_#92760e] hover:translate-y-[3px] transition-all">
              30分・無料相談を申し込む <Ico d={I.arrow} size={16} />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-[13px] text-white/70">
            {["Claude Code × 自動化設計", "エンジニア不要で運用できる設計", "SaaS・スタートアップ支援実績"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <span className="w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center shrink-0"><Ico d={I.check} size={11} className="text-white" /></span>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="hidden lg:flex absolute -top-6 -right-3 z-20 w-32 h-32 rounded-full bg-gradient-to-br from-[#6366f1] to-[#0a1f3d] text-white flex-col items-center justify-center shadow-xl rotate-[8deg] ring-4 ring-white/10">
            <span className="font-black text-[13px] leading-none text-center">工数</span>
            <span className="font-black text-[28px] leading-none text-[#fbbf24] text-center">1/3</span>
            <span className="font-black text-[11px] leading-none text-center">を実現</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/15 shadow-2xl p-7 sm:p-9">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#6366f1] font-bold mb-3">BACKOFFICE AUTOMATION</div>
            <div className="font-black text-white text-[20px] mb-5">Claude Code × バックオフィス自動化</div>
            <div className="space-y-4 mb-6">
              {[
                { before: "エンジニアへの依頼", arrow: "→", after: "Claude Codeが自動生成", color: "#fbbf24" },
                { before: "2〜3ヶ月の開発期間", arrow: "→", after: "2〜4週間で自動化完成", color: "#22c55e" },
                { before: "月数十万の人件費", arrow: "→", after: "月額サブスクで継続改善", color: "#6366f1" },
              ].map((item) => (
                <div key={item.before} className="flex items-center gap-2 text-[13px]">
                  <span className="text-white/50 line-through">{item.before}</span>
                  <span className="text-white/40 shrink-0">{item.arrow}</span>
                  <span className="font-bold" style={{ color: item.color }}>{item.after}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "スポット（人気）", price: "¥450,000〜", note: "★ 最多ご依頼", featured: true },
                { label: "サブスク（人気）", price: "¥120,000/月", note: "★ 最多契約", featured: true },
                { label: "スポット ライト", price: "¥200,000〜", note: "課題特化" },
                { label: "サブスク ライト", price: "¥50,000/月", note: "継続改善" },
              ].map((p) => (
                <div key={p.label} className={`rounded-xl p-3 ${p.featured ? "bg-[#fbbf24]/15 border border-[#fbbf24]/30" : "bg-white/5 border border-white/10"}`}>
                  <div className={`font-mono text-[9px] tracking-widest mb-1 ${p.featured ? "text-[#fbbf24]" : "text-white/40"}`}>{p.note}</div>
                  <div className="font-black text-white text-[14px]">{p.price}</div>
                  <div className="text-[11px] text-white/50 mt-0.5">{p.label}</div>
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
    <section className="bg-[#060d1c] border-t border-white/5">
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
  { icon: I.users,  text: "エンジニアがバックオフィス業務（データ集計・レポート生成・社内ツール作成）に時間を取られ、プロダクト開発のスピードが落ちている" },
  { icon: I.doc,    text: "採用・経費・請求・契約管理などのバックオフィス業務が属人化・手作業のまま。メンバー増加のたびに作業量が線形的に増えている" },
  { icon: I.chart,  text: "SaaSツールを複数導入したが、ツール間のデータ連携ができておらず手動でのコピペ作業が発生している" },
  { icon: I.clock,  text: "COOやオペレーション担当者が採用・財務・オペレーション・カスタマーサポートを兼務しており、戦略的な仕事に集中できていない" },
  { icon: I.zap,    text: "「自動化したい」と思いつつ、開発リソースをバックオフィスに割けない。かといって高額な外注は避けたい" },
];

function Problem() {
  return (
    <section id="problem" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="お悩み" en="PROBLEM" color="#dc2626" />
        <SectionTitle>成長フェーズの<Highlight color="#fecaca">オペレーションボトルネック</Highlight>、<br />心当たりはありますか？</SectionTitle>
        <p className="text-center text-[14px] sm:text-[15px] text-[#475569] mt-5 leading-[2] max-w-2xl mx-auto">
          急成長期のスタートアップが直面する「人が増えるほど業務が増える」問題を解消します。
        </p>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {PROBLEMS.map((p, i) => (
            <div key={i} className={`relative bg-[#f8fafc] border-2 border-[#e2e8f0] hover:border-[#15447b] hover:bg-white transition-all rounded-2xl p-6 group ${i === 4 ? "md:col-span-2 lg:col-span-3 lg:max-w-xl lg:mx-auto" : ""}`}>
              <div className="absolute -top-3 -left-3 w-9 h-9 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] text-white rounded-full flex items-center justify-center font-mono font-black text-[14px] shadow-md">{String(i + 1).padStart(2, "0")}</div>
              <div className="flex items-start gap-4 pl-3">
                <div className="w-12 h-12 bg-[#f0f0ff] border border-[#c7d2fe] rounded-xl flex items-center justify-center text-[#6366f1] shrink-0"><Ico d={p.icon} size={22} /></div>
                <p className="text-[14px] leading-[1.85] text-[#0a1f3d] font-medium pt-1.5">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gradient-to-br from-[#15447b] to-[#0a1f3d] rounded-2xl p-7 sm:p-10">
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#fbbf24] mb-3 font-bold">STARTUP REALITY</div>
          <p className="text-white font-bold text-[18px] sm:text-[20px] leading-[1.6] mb-4">急成長期のスタートアップは「バックオフィスの自動化スピード」がそのまま競争力になります。</p>
          <ul className="space-y-3 text-[13px] text-white/80 leading-[1.85]">
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0 mt-1">▸</span><span>Series A〜Bのスタートアップで最も多い「詰まりポイント」はバックオフィスの属人化と自動化の遅れ。エンジニアがプロダクト以外に時間を使うたびに、競合との差が開く</span></li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0 mt-1">▸</span><span>Claude Codeを活用した自動化設計により、従来エンジニアに依頼していたバックオフィスツールの開発を<strong className="text-white">1/3の工数・期間</strong>で実現できる</span></li>
            <li className="flex items-start gap-2"><span className="text-[#fbbf24] shrink-0 mt-1">▸</span><span>「人が増えてもオペレーションコストが増えない設計」を先手で作れた組織が、次のフェーズに最速で移行できる</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const steps = [
    { n: "01", title: "オペレーションボトルネックの特定", desc: "現在のバックオフィス業務フロー・使用ツール・エンジニアへの依頼状況をヒアリング。「自動化した場合の工数削減インパクトが最大な業務」から優先順位を設定します。", period: "WEEK 1", icon: I.target },
    { n: "02", title: "Claude Code活用での自動化設計・構築", desc: "Claude Codeを活用して、従来の開発工数の1/3でバックオフィス自動化を実装。Notion・Slack・Google Workspace・各種SaaS APIとの連携自動化、レポート自動生成、データパイプライン構築などを担当します。", period: "WEEK 1〜3", icon: I.cpu },
    { n: "03", title: "エンジニア不要で運用できる状態に", desc: "構築後は非エンジニアのオペレーション担当者が自分で管理・改善できる設計を前提にします。月額プランで継続的な改善・機能追加・新規自動化にも対応します。", period: "WEEK 3〜", icon: I.shield },
  ];
  return (
    <section id="solution" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f0f0ff] to-[#f0f6fc]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="解決策" en="SOLUTION" color="#15447b" />
        <SectionTitle>エンジニアを解放する<br /><Highlight>バックオフィス自動化の3ステップ</Highlight></SectionTitle>
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
                    <div><div className="font-mono text-[10px] tracking-[0.2em] text-[#dc2626] font-bold">{s.period}</div><Ico d={s.icon} size={20} className="text-[#6366f1]" /></div>
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
    { n: "①", title: "Claude Code活用で1/3の工数を実現", desc: "Claude Codeを用いた自動化設計・実装により、従来のエンジニア依頼と比べて工数・期間を大幅に圧縮。その分のリソースをプロダクト開発に集中させられます。" },
    { n: "②", title: "スタートアップの成長フェーズを理解した設計", desc: "Series A〜Bで急成長するスタートアップのオペレーションボトルネックを熟知。「今必要なもの」と「3ヶ月後に必要になるもの」を見越した設計ができます。" },
    { n: "③", title: "非エンジニアが運用できる設計を前提に", desc: "「作ったが誰も触れない」を起こしません。COO・オペレーション担当者が自分で管理・改善できる設計・ドキュメント整備を標準で行います。" },
    { n: "④", title: "月額プランで継続的に自動化範囲を拡大", desc: "月額プランで継続的な改善・新機能追加・新規自動化に対応。急成長に合わせてオペレーション自動化の範囲を段階的に広げていけます。" },
  ];
  return (
    <section id="why" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="選ばれる理由" en="WHY US" color="#15447b" />
        <SectionTitle>「エンジニアを動かす」より<br /><Highlight>「自動化してしまう」</Highlight>方が速い</SectionTitle>
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          <div className="bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-[#e2e8f0] rounded-full flex items-center justify-center"><Ico d={I.x} size={18} className="text-[#64748b]" /></div><h3 className="font-bold text-[#475569] text-[17px]">よくある「エンジニア依存」の問題</h3></div>
            <ul className="space-y-3">
              {["バックオフィス依頼がエンジニアのボトルネックになる", "優先度が低いとされ、プロダクト開発に押されて後回し", "エンジニアが退職するとバックオフィスツールが誰も触れなくなる", "外注すると高額・納期が長く、スタートアップのスピードに合わない"].map((p) => (
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
    { code: "SPOT 01", name: "スポット（ライト）", price: "200,000", unit: "〜", period: "0.5ヶ月 / 15時間", items: ["業務ボトルネック特定・優先順位設計", "特定業務1〜2本の自動化実装", "Notion・Slack・GS等の連携設定", "非エンジニア向け運用ドキュメント作成"] },
    { code: "SPOT 02", name: "スポット（スタンダード）", price: "450,000", unit: "〜", period: "0.5〜1ヶ月 / 35時間", items: ["オペレーション全体設計・優先順位設計", "主要業務3〜5本の自動化実装", "Claude Code活用ツール開発", "SaaS連携・データパイプライン構築"], featured: true },
    { code: "SPOT 03", name: "スポット（フル）", price: "900,000", unit: "〜", period: "1.5〜2ヶ月 / 75時間", items: ["バックオフィス全体の自動化設計", "全主要業務の自動化一括実装", "データ基盤・レポート自動化", "自動化ロードマップ策定"] },
  ];
  const subs = [
    { code: "SUB 01", name: "ライト", price: "50,000", hours: "5時間/月" },
    { code: "SUB 02", name: "スタンダード", price: "120,000", hours: "10時間/月", featured: true },
    { code: "SUB 03", name: "プロ", price: "300,000", hours: "30時間/月" },
    { code: "SUB 04", name: "エンタープライズ", price: "500,000", hours: "50時間/月" },
  ];
  return (
    <section id="plans" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f0f0ff] to-[#f0f6fc]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <Kicker jp="料金プラン" en="PLANS" color="#15447b" />
        <SectionTitle>自動化の規模・スピードに合わせた<br /><Highlight>バックオフィス自動化プラン</Highlight></SectionTitle>
        <div className="mt-14">
          <div className="flex items-center justify-center gap-3 mb-8"><span className="w-10 h-px bg-[#15447b]/30" /><span className="font-bold text-[15px] text-[#15447b]">スポット支援プラン（自動化・単発）</span><span className="w-10 h-px bg-[#15447b]/30" /></div>
          <div className="grid lg:grid-cols-3 gap-5">
            {spots.map((s) => (
              <div key={s.code} className={`relative rounded-3xl p-7 transition-all ${s.featured ? "bg-gradient-to-b from-[#15447b] to-[#0a1f3d] border-2 border-[#fbbf24] shadow-2xl" : "bg-white border-2 border-[#e2e8f0] hover:border-[#15447b] shadow-sm"}`}>
                {s.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#dc2626] text-white px-4 py-1 rounded-full font-black text-[11px] tracking-wider shadow-lg whitespace-nowrap">★ 最多ご依頼プラン</div>}
                <div className={`font-mono text-[10px] tracking-[0.3em] font-bold mb-3 ${s.featured ? "text-[#fbbf24]" : "text-[#6366f1]"}`}>{s.code}</div>
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
                <a href="#cta" onClick={() => trackEvent("click_plan", { plan: s.name, page: "dx_ops" })}
                  className={`block text-center w-full h-11 leading-[2.75rem] font-bold text-[13px] rounded-full transition-all ${s.featured ? "bg-gradient-to-b from-[#fbbf24] to-[#c9a227] text-[#0a1f3d] shadow-[0_4px_0_#92760e]" : "bg-[#0a1f3d] text-white hover:bg-[#15447b]"}`}>
                  {s.featured ? "このプランで相談する →" : "詳細を相談する"}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-7"><span className="w-10 h-px bg-[#15447b]/30" /><span className="font-bold text-[15px] text-[#15447b]">月額サブスクプラン（継続自動化・改善）</span><span className="w-10 h-px bg-[#15447b]/30" /></div>
          <p className="text-center text-[13px] text-[#475569] mb-8">急成長に合わせて自動化の範囲を段階的に拡大。月額固定コストでエンジニアリソースをプロダクトに集中させ続けられます。</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {subs.map((s) => (
              <div key={s.code} className={`relative rounded-2xl p-5 text-center ${s.featured ? "bg-gradient-to-b from-[#15447b] to-[#0a1f3d] border-2 border-[#fbbf24] shadow-xl" : "bg-white border-2 border-[#e2e8f0] hover:border-[#15447b] shadow-sm"}`}>
                {s.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fbbf24] text-[#0a1f3d] px-3 py-0.5 rounded-full font-black text-[10px] shadow whitespace-nowrap">⭐ 最多契約</div>}
                <div className={`font-mono text-[9px] tracking-[0.3em] font-bold mb-2 ${s.featured ? "text-[#fbbf24]" : "text-[#6366f1]"}`}>{s.code}</div>
                <div className={`font-black text-[14px] mb-1 ${s.featured ? "text-white" : "text-[#0a1f3d]"}`}>{s.name}</div>
                <div className={`text-[11px] mb-3 ${s.featured ? "text-white/60" : "text-[#64748b]"}`}>{s.hours}</div>
                <div className={`font-black tabular-nums text-[22px] mb-3 ${s.featured ? "text-white" : "text-[#0a1f3d]"}`}>¥{s.price}<span className={`text-[12px] font-normal ${s.featured ? "text-white/60" : "text-[#64748b]"}`}>/月</span></div>
                <a href="#cta" onClick={() => trackEvent("click_plan", { plan: s.name, page: "dx_ops" })}
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
    { n: "01", title: "無料相談フォームにご記入", desc: "現在のバックオフィス業務の状況・使用ツール・エンジニアへの依頼頻度・最も解消したいボトルネックをお聞かせください。", time: "DAY 0" },
    { n: "02", title: "無料相談（60分）・ボトルネックの特定", desc: "現在のオペレーションフロー・ツール環境・エンジニアリソースの状況をヒアリング。「自動化のインパクトが最大な業務」と「着手すべき優先順位」を整理します。費用感の概算もその場で提示します。", time: "WEEK 1" },
    { n: "03", title: "簡易レポート・自動化ロードマップ提案", desc: "ヒアリングをもとに、現状の課題整理・自動化ロードマップ・スポットかサブスクかの推奨プランと費用感を提案。ご納得いただいたらプラン確定・着手します。", time: "WEEK 1" },
    { n: "04", title: "Claude Code活用での自動化実装 → 継続サポート", desc: "Claude Codeを活用して最短2〜4週間で自動化を実装。非エンジニアが運用できるドキュメントを整備した後、月額プランで継続的に自動化範囲を拡大します。", time: "WEEK 2〜4" },
  ];
  return (
    <section id="flow" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8">
        <Kicker jp="ご相談の流れ" en="FLOW" color="#15447b" />
        <SectionTitle>相談から<Highlight>最短2〜4週間で自動化完成</Highlight></SectionTitle>
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
  { q: "Claude Codeとは何ですか？自社で使えますか？", a: "Claude CodeはAnthropicが開発したAIコーディングツールで、業務自動化・ツール開発・データ処理などを高速で実装できます。私たちはClaude Codeを活用した開発・自動化を専門としており、お客様がClaude Codeを直接使う必要はありません。私たちが実装を担当します。" },
  { q: "自社のエンジニアに依頼するより、本当に速いですか？", a: "バックオフィス自動化においては、多くのケースで従来の1/3〜1/2の期間で実装できています。エンジニアがプロダクト開発を優先する組織では、バックオフィス依頼が後回しになりがちですが、私たちはバックオフィス自動化に特化しているため、最速で対応できます。" },
  { q: "どんな業務を自動化できますか？", a: "Notion・Slack・Google Workspace・各種SaaS（Stripe・HubSpot等）のAPI連携、データパイプライン・自動レポート生成、請求・経費・採用管理の自動化、カスタマーサポートの自動応答設計など幅広く対応可能です。まず無料相談でお聞かせください。" },
  { q: "Series Aに入ったばかりで、まだ規模が小さいです。相談できますか？", a: "むしろ成長フェーズの初期こそ自動化設計のタイミングです。Series A前後で「オペレーションの基盤を作る」ことが、Series Bに向けた最も重要な投資の一つです。規模の小さい今こそ、スケールに耐えられる設計を先に作りましょう。" },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f0f0ff] to-[#f0f6fc]">
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
  function handleSubmit() { trackEvent("generate_lead", { event_category: "lp_dx_ops", event_label: "contact_form_submit" }); }
  return (
    <section id="cta" className="relative py-16 sm:py-24 bg-gradient-to-br from-[#060d1c] via-[#0a1f3d] to-[#060d1c] overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(99,102,241,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(251,191,36,0.3), transparent 40%)" }} />
      <div className="relative max-w-[1080px] mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-4 py-1.5 rounded-full mb-5 font-black text-[12px] tracking-wider shadow-lg"><Ico d={I.fire} size={14} />今月残り {seats}社限定！</div>
          <h2 className="font-black text-white text-[22px] sm:text-[40px] leading-[1.3]">まずは<span className="text-[#fbbf24]">30分の無料相談</span>から、<br />はじめませんか？</h2>
          <p className="mt-4 text-[14px] text-white/75 leading-[1.95]">バックオフィスのボトルネックをヒアリングし、自動化ロードマップと費用感をその場でご提示します。</p>
        </div>
        <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-2xl">
          <form action="https://formsubmit.co/info@gdesign-partners.co.jp" method="POST" onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="_subject" value="【LP-F・スタートアップDX】無料相談お申込み" />
            <input type="hidden" name="_next" value="https://gdesign-partners.co.jp/lp/dx-ops/thanks" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">お名前</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="name" type="text" required placeholder="中村 翔太" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
              <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">会社名</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="company" type="text" required placeholder="株式会社〇〇 / 〇〇 Inc." className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
            </div>
            <div><label className="flex items-center gap-1.5 mb-1.5"><span className="font-bold text-[12px] text-[#0a1f3d]">メールアドレス</span><span className="text-[10px] text-white bg-[#dc2626] px-1.5 py-0.5 rounded font-bold">必須</span></label><input name="email" type="email" required placeholder="name@company.co.jp" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition placeholder:text-[#94a3b8] rounded-xl" /></div>
            <div><label className="block font-bold text-[12px] text-[#0a1f3d] mb-1.5">最も解消したいボトルネック（近いものを選択）</label><select name="main_issue" className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 h-12 text-[14px] outline-none transition rounded-xl"><option value="">選択してください</option><option value="エンジニアがバックオフィス業務に時間を取られている">エンジニアがバックオフィス業務に時間を取られている</option><option value="SaaS間のデータ連携が手動になっている">SaaS間のデータ連携・コピペ作業が多い</option><option value="採用・経費・請求などの管理業務が属人化している">採用・経費・請求管理が属人化・手動になっている</option><option value="レポート作成・データ集計に時間がかかっている">レポート作成・データ集計に毎週時間がかかっている</option><option value="オペレーション全体を整理・自動化したい">オペレーション全体を整理・自動化したい</option></select></div>
            <div><label className="block font-bold text-[12px] text-[#0a1f3d] mb-1.5">現在の状況・相談したいこと</label><textarea name="challenge" rows={4} placeholder="例：Series Aを終えてメンバーが増えたが、経費精算・請求業務・採用管理がすべて手動のまま。エンジニアに頼みたいが、プロダクト開発で手一杯..." className="w-full bg-white border-2 border-[#e2e8f0] focus:border-[#15447b] text-[#0a1f3d] px-4 py-3 text-[14px] outline-none transition placeholder:text-[#94a3b8] resize-none rounded-xl" /></div>
            <button type="submit" className="w-full h-14 bg-gradient-to-b from-[#fbbf24] to-[#c9a227] hover:from-[#f0d87a] hover:to-[#fbbf24] text-[#0a1f3d] font-black text-[16px] rounded-full shadow-[0_6px_0_#92760e,0_8px_24px_rgba(201,162,39,0.4)] hover:shadow-[0_3px_0_#92760e] hover:translate-y-[3px] transition-all flex items-center justify-center gap-3 mt-2">無料相談を申し込む<Ico d={I.arrow} size={18} /></button>
            <p className="text-[11px] text-[#94a3b8] text-center">送信後、2営業日以内にご連絡します</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function DxOpsPage() {
  useEffect(() => { trackEvent("page_view_lp_dx_ops", { page: "/lp/dx-ops" }); }, []);
  useScrollTracking("lp_dx_ops");
  return <><FV /><SeatBar /><Problem /><Solution /><WhyUs /><Plans /><Flow /><FAQ /><CTA /></>;
}
