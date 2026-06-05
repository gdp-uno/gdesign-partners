import Link from "next/link";
import HomeContactForm from "@/app/_components/HomeContactForm";

const services = [
  {
    id: "dx",
    icon: "⚙️",
    title: "DX・業務設計",
    description:
      "業務フローの可視化から自動化・デジタル化まで。生成AIやノーコードツールを活用し、現場で動く仕組みを設計します。",
    points: ["業務フロー分析・可視化", "ノーコード/生成AI活用", "社内DX推進サポート"],
  },
  {
    id: "brand",
    icon: "✦",
    title: "定額ブランドパッケージ",
    description:
      "¥298,000 / 4週間。ロゴからHP・営業資料まで、ブランドに必要なものをまるごと揃えます。",
    points: ["ブランドステートメント・MVV策定", "ロゴ・名刺デザイン", "HP・営業資料制作", "特典：生成AI活用カリキュラム"],
    highlight: true,
  },
  {
    id: "elearning",
    icon: "🎓",
    title: "eラーニング",
    description:
      "社内研修・スキルアップを動画コンテンツで効率化。企画から収録・配信環境の構築まで対応します。",
    points: ["研修動画の企画・制作", "配信プラットフォーム構築", "コンテンツ定期更新"],
  },
  {
    id: "photo",
    icon: "📷",
    title: "撮影代行",
    description:
      "会社紹介・採用・SNS用など目的に合わせたプロ品質の写真・動画を撮影。編集・納品まで一貫対応。",
    points: ["コーポレート・採用撮影", "商品・サービス撮影", "SNS用ショート動画"],
  },
];

const reasons = [
  {
    num: "01",
    title: "ブランドから業務まで一気通貫",
    body: "「見た目だけ整える」「システムだけ入れる」ではなく、ブランディングと業務設計を同時に進めることで、一貫性のある成長を実現します。",
  },
  {
    num: "02",
    title: "生成AIを実務に落とし込む",
    body: "最新の生成AI・ノーコードツールを現場で実際に使えるレベルまで落とし込み、ツール導入後も定着するよう伴走します。",
  },
  {
    num: "03",
    title: "スタートアップ目線のスピード感",
    body: "大手代理店のような長い提案フェーズは不要。最短4週間でブランドの基盤を構築し、すぐに動き始めることができます。",
  },
  {
    num: "04",
    title: "フルリモート対応・全国OK",
    body: "大阪拠点ですが、オンラインミーティング・クラウドツールを活用し全国対応可能。場所を選ばずお気軽にご相談ください。",
  },
];

const flow = [
  { step: "01", title: "お問い合わせ", body: "フォームまたはメールにてお気軽にご連絡ください。" },
  { step: "02", title: "ヒアリング・ご提案", body: "オンラインにて現状の課題と目標をヒアリングし、最適なプランをご提案します。" },
  { step: "03", title: "ご契約・キックオフ", body: "プラン・費用・スケジュールにご合意後、正式契約。すぐに制作・設計を開始します。" },
  { step: "04", title: "制作・実装", body: "定期的にレポートをお送りしながら進行。修正もスムーズに対応します。" },
  { step: "05", title: "納品・サポート", body: "検収後、納品。継続サポートやアップデートにも柔軟に対応いたします。" },
];

const faqs = [
  {
    q: "予算が限られていますが相談できますか？",
    a: "はい、もちろんです。まずは無料相談でご予算と目標をお聞きし、優先度に合わせたご提案をします。定額パッケージは分割払いのご相談も可能です。",
  },
  {
    q: "大阪以外でも対応していただけますか？",
    a: "全国対応可能です。オンラインMTGとクラウドツールで、どこにいても同品質のサービスを提供します。",
  },
  {
    q: "DXやブランディングの知識がなくても大丈夫ですか？",
    a: "専門知識は不要です。現状の業務やお悩みをお聞きし、わかりやすくご説明しながら一緒に進めていきます。",
  },
  {
    q: "定額パッケージに含まれないものはありますか？",
    a: "ドメイン取得費・サーバー費・外部フォント・素材費などの実費は別途ご負担いただきます。事前にご説明した上で進めますのでご安心ください。",
  },
  {
    q: "既存のサイトやロゴがある場合のリニューアルも対応できますか？",
    a: "はい、対応可能です。現状の資産を活かしながら改善する形でご提案します。",
  },
];

export default function Home() {
  return (
    <>
      {/* FV */}
      <section className="relative bg-[#15447b] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #4a85c4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c9a227 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-36 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <p className="inline-block text-xs font-bold tracking-widest uppercase bg-[#c9a227] text-white px-3 py-1 rounded mb-6">
              Growth Design Partners
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              中小企業・スタートアップの<br />
              <span className="text-[#f0d87a]">成長をデザインする</span>
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
              ブランディングからDX・業務設計まで、
              「見た目」と「仕組み」を一気通貫で整え、
              成長し続けるビジネスの基盤をつくります。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="#contact" className="btn-cta text-center">
                無料相談をする
              </Link>
              <Link
                href="#services"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded font-bold hover:bg-white hover:text-[#15447b] transition-colors text-center"
              >
                サービスを見る
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0 hidden md:flex flex-col gap-4 w-56">
            {["ブランディング", "DX推進", "業務設計", "コンテンツ制作"].map((tag) => (
              <div key={tag} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-sm font-medium border border-white/20">
                ✓ {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-[#f0f6fc] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-bold text-[#15447b] tracking-widest uppercase mb-3">PROBLEM</p>
          <h2 className="section-title mb-10">こんなお悩みはありませんか？</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {[
              "ロゴや名刺はあるが、ブランドとして統一感がない",
              "業務がアナログのままで非効率だとわかっているが手が回らない",
              "ホームページはあるが集客に繋がっていない",
              "AIやDXを取り入れたいが何から始めればよいかわからない",
              "外注すると高くなりすぎて継続できない",
              "専門家に頼みたいが相談窓口が分散していて面倒",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm border border-[#ddeaf8]">
                <span className="text-[#c9a227] text-xl mt-0.5 flex-shrink-0">！</span>
                <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-[#15447b] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-bold text-[#f0d87a] tracking-widest uppercase mb-3">SOLUTION</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Growth Design Partnersが<br />まるごと解決します
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            ブランドの見た目を整えるだけでも、システムを入れるだけでもありません。
            「成長するための仕組み」を設計し、現場に定着させるまで伴走します。
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              { icon: "✦", label: "ブランド統一", desc: "ロゴからHPまで一気通貫で制作" },
              { icon: "⚙️", label: "業務自動化", desc: "AI・ノーコードで現場を効率化" },
              { icon: "🚀", label: "スピード実装", desc: "最短4週間で基盤を構築" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-bold text-lg mb-1">{item.label}</p>
                <p className="text-blue-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-[#15447b] tracking-widest uppercase mb-3">WHY US</p>
            <h2 className="section-title">選ばれる4つの理由</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {reasons.map((r) => (
              <div key={r.num} className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#15447b] text-white flex items-center justify-center font-bold text-sm">
                  {r.num}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#15447b] mb-2">{r.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-[#f0f6fc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-[#15447b] tracking-widest uppercase mb-3">SERVICES</p>
            <h2 className="section-title">サービス一覧</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <div
                key={s.id}
                className={`rounded-xl p-6 ${
                  s.highlight
                    ? "bg-[#15447b] text-white border-2 border-[#c9a227]"
                    : "bg-white border border-[#ddeaf8]"
                } shadow-sm`}
              >
                {s.highlight && (
                  <span className="inline-block text-xs font-bold bg-[#c9a227] text-white px-2 py-0.5 rounded mb-3">
                    人気No.1
                  </span>
                )}
                <div className="text-3xl mb-2">{s.icon}</div>
                <h3 className={`font-bold text-xl mb-2 ${s.highlight ? "text-white" : "text-[#15447b]"}`}>
                  {s.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${s.highlight ? "text-blue-100" : "text-gray-600"}`}>
                  {s.description}
                </p>
                <ul className="space-y-1">
                  {s.points.map((p) => (
                    <li key={p} className={`text-sm flex items-start gap-2 ${s.highlight ? "text-blue-100" : "text-gray-700"}`}>
                      <span className={s.highlight ? "text-[#f0d87a]" : "text-[#c9a227]"}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section id="flow" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-[#15447b] tracking-widest uppercase mb-3">FLOW</p>
            <h2 className="section-title">ご利用の流れ</h2>
          </div>
          <div className="space-y-0">
            {flow.map((f, i) => (
              <div key={f.step} className="flex gap-6 relative">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#15447b] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 z-10">
                    {f.step}
                  </div>
                  {i < flow.length - 1 && (
                    <div className="w-0.5 h-full bg-[#ddeaf8] my-1 min-h-[2.5rem]" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-bold text-[#15447b] mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-[#f0f6fc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-[#15447b] tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="section-title">よくある質問</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="bg-white rounded-xl border border-[#ddeaf8] group"
              >
                <summary className="flex items-start gap-3 px-6 py-4 cursor-pointer font-medium text-[#15447b] list-none select-none">
                  <span className="text-[#c9a227] font-bold flex-shrink-0">Q.</span>
                  {faq.q}
                  <span className="ml-auto text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-[#f0f6fc] pt-4 flex gap-3">
                  <span className="text-[#15447b] font-bold flex-shrink-0">A.</span>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="py-24 bg-[#15447b] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-bold text-[#f0d87a] tracking-widest uppercase mb-3">CONTACT</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
            まずは無料相談から
          </h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            「何から手をつけるべきかわからない」という段階からご相談いただけます。<br className="hidden sm:block" />
            お気軽にお問い合わせください。
          </p>

          <HomeContactForm />

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center text-sm text-blue-200">
            <a href="tel:080-3777-5996" className="hover:text-white transition-colors">
              📞 080-3777-5996
            </a>
            <a href="mailto:info@gdesign-partners.co.jp" className="hover:text-white transition-colors">
              ✉ info@gdesign-partners.co.jp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
