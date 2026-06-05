"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/contact";

// GDPサイト トップの問い合わせフォーム（GAS送信）。lp識別子 = "home"。
export default function HomeContactForm() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    await submitContactForm(e.currentTarget, "home");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 sm:p-8 text-left text-gray-800"
    >
      <input type="hidden" name="_subject" value="【GDPサイト】お問い合わせ" />
      <input type="hidden" name="_next" value="https://gdesign-partners.co.jp/thanks" />

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-sm font-medium text-[#15447b] mb-1">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="山田 太郎"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#15447b] focus:ring-1 focus:ring-[#15447b]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#15447b] mb-1">
            会社名
          </label>
          <input
            type="text"
            name="company"
            placeholder="株式会社〇〇"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#15447b] focus:ring-1 focus:ring-[#15447b]"
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-[#15447b] mb-1">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="example@company.co.jp"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#15447b] focus:ring-1 focus:ring-[#15447b]"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-[#15447b] mb-1">
          ご相談内容 <span className="text-red-500">*</span>
        </label>
        <select
          name="service"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#15447b] focus:ring-1 focus:ring-[#15447b] bg-white"
        >
          <option value="">選択してください</option>
          <option value="DX・業務設計">DX・業務設計</option>
          <option value="定額ブランドパッケージ">定額ブランドパッケージ</option>
          <option value="eラーニング">eラーニング</option>
          <option value="撮影代行">撮影代行</option>
          <option value="その他">その他・まずは相談したい</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#15447b] mb-1">
          メッセージ
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="現在の課題や気になっていることをご自由にお書きください"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#15447b] focus:ring-1 focus:ring-[#15447b] resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#c9a227] hover:bg-[#d4b444] text-white font-bold py-3 rounded-lg text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
