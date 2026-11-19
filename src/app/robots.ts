import type { MetadataRoute } from "next";
import { abs, siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /design-system is an internal style reference; /_next holds build files, not pages.
      disallow: ["/design-system", "/_next/"],
    },
    sitemap: abs("/sitemap.xml"),
    host: siteUrl,
  };
}
