import type { MetadataRoute } from "next";
import { SITE_URL, DISALLOWED_PATHS } from "@/lib/site";

const STAGING_MODE = process.env.STAGING_MODE === "true";

export default function robots(): MetadataRoute.Robots {
  // staging はクロール全面禁止（インデックス汚染防止）。
  if (STAGING_MODE) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  // 本番は公開。WIP LP のみ除外し、sitemap を提示。
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: DISALLOWED_PATHS,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
