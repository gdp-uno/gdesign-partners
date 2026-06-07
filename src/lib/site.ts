// サイト全体で共有するSEO/計測用の定数。
// 本番ドメインは env で上書き可能（未設定時は本番URLにフォールバック）。
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdesign-partners.co.jp";

// 公開対象のLP（sitemap掲載・クロール許可）。
// indie-label / productphoto は WIP のため除外。
export const PUBLIC_LP_SLUGS = [
  "brand-vision",
  "brand-value",
  "brand-start",
  "dx",
  "dx-ops",
  "dx-reboot",
  "dx-field",
  "basic",
  "elearning",
] as const;

// クロール禁止のパス（WIP LP）。robots / sitemap 双方で参照。
export const DISALLOWED_PATHS = ["/lp/indie-label", "/lp/productphoto"];

// 組織情報（JSON-LD Organization 用）。CLAUDE.md の組織情報と一致させる。
export const ORGANIZATION = {
  name: "株式会社Growth Design Partners",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-color.png`,
  email: "info@gdesign-partners.co.jp",
  telephone: "+81-50-8896-5904",
  address: {
    postalCode: "530-0057",
    addressRegion: "大阪府",
    addressLocality: "大阪市北区",
    streetAddress: "曽根崎2-16-19 メッセージ梅田ビル1階 ONthe UMEDA内",
    addressCountry: "JP",
  },
};
