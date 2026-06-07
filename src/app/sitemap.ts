import type { MetadataRoute } from "next";
import { SITE_URL, PUBLIC_LP_SLUGS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...PUBLIC_LP_SLUGS.map((slug) => ({
      url: `${SITE_URL}/lp/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
