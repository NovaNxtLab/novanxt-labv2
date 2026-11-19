import type { MetadataRoute } from "next";
import { courses, reach } from "@/lib/brand";

const base = "https://www.novanxtlab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/courses`, changeFrequency: "weekly", priority: 0.9 },
    ...courses.map((c) => ({ url: `${base}/courses/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${base}/locations/${reach.lab.slug}`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.7 },
  ];
}
