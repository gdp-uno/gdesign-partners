/**
 * GDP 会社LP 問い合わせフォーム受信
 * フォーム送信 → ①メール通知(info@グループ宛) ②スプレッドシート記録 ③Slack通知
 *
 * デプロイ手順:
 *   1) このコードを script.google.com の新規プロジェクトに貼る（uno@ アカウントで）
 *   2) 下の CONFIG を埋める（SHEET_ID / SLACK_WEBHOOK_URL）
 *   3) uno@ Gmail 設定で「他のメールアドレスを追加」→ info@ を send-as 登録・確認
 *   4) デプロイ > 新しいデプロイ > 種類=ウェブアプリ
 *        実行するユーザー: 自分(uno@) / アクセスできるユーザー: 全員
 *   5) 発行されたウェブアプリURLをソラに渡す → 各LPフォームの送信先に設定
 *
 * 注意(原則7):
 *   - from: info@ は send-as 設定済が前提。未設定だと sendEmail が失敗する。
 *   - info@グループの投稿許可設定によっては配信されない場合あり → テスト送信で要確認。
 */

const CONFIG = {
  TO: 'info@gdesign-partners.co.jp',          // 本番の通知先（Googleグループ）
  STAGING_TO: 'uno@gdesign-partners.co.jp',   // テスト(staging)時の通知先（グループを汚さない）
  FROM_ALIAS: 'info@gdesign-partners.co.jp',  // 差出人（uno@に send-as 設定済の前提）
  FROM_NAME: 'GDP LP問い合わせ',
  SHEET_ID: '1Y9EPnyTL_A0e6xjQx8iOyT-YaRW0LlJURUKEa8msjVo',  // GDP_LP問い合わせ_受信ログ（共有ドライブ>10_案件管理>97_LP問い合わせ）
  SHEET_NAME: 'submissions',
  SLACK_WEBHOOK_URL: PropertiesService.getScriptProperties().getProperty('SLACK_WEBHOOK_URL') || '', // Script Properties に設定（リポジトリに秘密を置かない）
};

/** フォームからのPOSTを受ける入口 */
function doPost(e) {
  try {
    const data = parseBody_(e);
    const isStaging = String(data.env || '').toLowerCase() === 'staging';

    appendToSheet_(data, isStaging);   // ② スプレッドシート記録
    sendMail_(data, isStaging);        // ① メール通知
    notifySlack_(data, isStaging);     // ③ Slack通知

    return jsonOut_({ ok: true });
  } catch (err) {
    // 失敗してもスプレッドシートには残るよう、可能な範囲で記録を試みる
    try { logError_(e, err); } catch (_) {}
    return jsonOut_({ ok: false, error: String(err) });
  }
}

/** 動作確認用（エディタから実行してメール/シート/Slackをテスト） */
function testRun() {
  const sample = {
    parameter: {
      lp: 'brand-start', env: 'staging',
      name: '田中 誠', company: '株式会社テスト',
      email: 'test@example.com', situation: '法人設立予定',
      plan: 'ブランドスタートプラン', challenge: 'ロゴ・名刺・HPをまとめて依頼したい',
    },
  };
  return doPost(sample);
}

function parseBody_(e) {
  // CORS回避のためフロントは text/plain でJSON文字列を送る想定
  if (e && e.postData && e.postData.contents) {
    try { return JSON.parse(e.postData.contents); } catch (_) {}
  }
  return (e && e.parameter) ? e.parameter : {};
}

function lpLabel_(data) {
  return data.lp || data._lp || '(LP不明)';
}

function challengeText_(data) {
  return data.challenge || data.issue || data.message || '';
}

// 既知項目以外（LP固有のselect等：main_issue / service / items / previous_tool 等）を拾う。
// 空値・メタ項目・標準項目は除外し [キー, 値] の配列で返す。
const KNOWN_KEYS_ = [
  'lp', '_lp', 'env', 'name', 'company', 'email',
  'situation', 'plan', 'challenge', 'issue', 'message',
  '_subject', '_next', '_captcha',
];
function extraPairs_(data) {
  const out = [];
  Object.keys(data).forEach(function (k) {
    if (KNOWN_KEYS_.indexOf(k) !== -1) return;
    const v = data[k];
    if (v === '' || v === null || v === undefined) return;
    out.push([k, String(v)]);
  });
  return out;
}

function appendToSheet_(data, isStaging) {
  if (!CONFIG.SHEET_ID) return;
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let sh = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(CONFIG.SHEET_NAME);
    sh.appendRow(['受信日時', '環境', 'LP', 'お名前', '会社名', 'メール', '状況', 'プラン', '課題', 'raw']);
  }
  sh.appendRow([
    Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm'),
    isStaging ? 'staging' : 'production',
    lpLabel_(data),
    data.name || '',
    data.company || '',
    data.email || '',
    data.situation || '',
    data.plan || '',
    challengeText_(data),
    JSON.stringify(data),
  ]);
}

function sendMail_(data, isStaging) {
  const prefix = isStaging ? '【LPテスト】' : '';
  const subject = prefix + '【LP問い合わせ】' + lpLabel_(data) + ' / ' + (data.name || '名前未入力');
  const body = [
    isStaging ? '※ステージング(テスト)環境からの送信です。\n' : '',
    '会社LPに問い合わせがありました。',
    '',
    'LP: ' + lpLabel_(data),
    'お名前: ' + (data.name || ''),
    '会社名: ' + (data.company || ''),
    'メール: ' + (data.email || ''),
    '状況: ' + (data.situation || ''),
    'プラン: ' + (data.plan || ''),
    '課題: ' + challengeText_(data),
  ];
  extraPairs_(data).forEach(function (p) { body.push(p[0] + ': ' + p[1]); });
  body.push('', '受信日時: ' + Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm'));
  const bodyText = body.join('\n');

  const to = isStaging ? (CONFIG.STAGING_TO || CONFIG.TO) : CONFIG.TO;
  GmailApp.sendEmail(to, subject, bodyText, {
    from: CONFIG.FROM_ALIAS,
    name: CONFIG.FROM_NAME,
    replyTo: data.email || CONFIG.FROM_ALIAS,
  });
}

function notifySlack_(data, isStaging) {
  if (!CONFIG.SLACK_WEBHOOK_URL) return;
  const envTag = isStaging ? ' :test_tube: *[テスト]*' : '';
  let text =
    ':email: *LP問い合わせ*' + envTag + '\n' +
    '*LP:* ' + lpLabel_(data) + '\n' +
    '*お名前:* ' + (data.name || '') + '\n' +
    '*会社名:* ' + (data.company || '') + '\n' +
    '*メール:* ' + (data.email || '') + '\n' +
    '*状況:* ' + (data.situation || '') + '\n' +
    '*プラン:* ' + (data.plan || '') + '\n' +
    '*課題:* ' + challengeText_(data);
  extraPairs_(data).forEach(function (p) { text += '\n*' + p[0] + ':* ' + p[1]; });

  UrlFetchApp.fetch(CONFIG.SLACK_WEBHOOK_URL, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ text: text }),
    muteHttpExceptions: true,
  });
}

function logError_(e, err) {
  if (!CONFIG.SHEET_ID) return;
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let sh = ss.getSheetByName('errors');
  if (!sh) {
    sh = ss.insertSheet('errors');
    sh.appendRow(['日時', 'エラー', 'raw']);
  }
  const raw = (e && e.postData && e.postData.contents) ? e.postData.contents : JSON.stringify(e && e.parameter);
  sh.appendRow([Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm'), String(err), raw]);
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
