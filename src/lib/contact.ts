// 会社LP 問い合わせ送信（GAS ウェブアプリへPOST）
// 旧 formsubmit.co を置換。GAS側で ①メール通知 ②スプレッドシート記録 ③Slack通知 を実行する。
// GASバックエンド: ~/Desktop/gdesign-partners/gas/contact-form.gs
export const GAS_CONTACT_URL =
  "https://script.google.com/macros/s/AKfycbwRyHXytCnlizL1dxe4jNRtcYU_qQpwxlDbCm-H2VAEcYSfSRrtgtU6col1ISFFX3bp/exec";

// 本番ドメインのときだけ production。staging / localhost / IP などは staging 扱い（件名に【LPテスト】が付く）。
function detectEnv(): "production" | "staging" {
  if (typeof window === "undefined") return "production";
  const h = window.location.hostname;
  return h === "gdesign-partners.co.jp" || h === "www.gdesign-partners.co.jp"
    ? "production"
    : "staging";
}

// フォーム送信 → GASへ fire-and-forget でPOST → thanks ページへ遷移。
// ブラウザ→GASのCORS回避のため text/plain でJSON送信する（レスポンスは読まない）。
// lp: どのLPからの問い合わせか識別する文字列（例: "brand-start"）。
export async function submitContactForm(
  form: HTMLFormElement,
  lp: string,
): Promise<void> {
  const fd = new FormData(form);
  const data: Record<string, string> = { lp, env: detectEnv() };
  fd.forEach((value, key) => {
    if (key.startsWith("_")) return; // formsubmit用メタ項目（_subject等）は除外
    data[key] = typeof value === "string" ? value : "";
  });

  try {
    await fetch(GAS_CONTACT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });
  } catch {
    // 送信に失敗してもメール/シート/Slackがバックストップ。遷移は続行する。
  }

  // thanks ページへ遷移（hidden の _next からパスのみ抽出。無ければトップ）
  const next = form.querySelector<HTMLInputElement>('input[name="_next"]')?.value;
  let dest = "/";
  if (next) {
    try {
      dest = new URL(next).pathname;
    } catch {
      dest = next;
    }
  }
  window.location.href = dest;
}
