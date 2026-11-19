import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // /design-system is an internal style reference, not a page for search.
    rules: { userAgent: "*", allow: "/", disallow: "/design-system" },
    sitemap: "https://www.novanxtlab.com/sitemap.xml",
  };
}
