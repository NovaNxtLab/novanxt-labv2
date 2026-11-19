import type { MetadataRoute } from "next";
import { courses, reach } from "@/lib/brand";
import { abs, contentUpdated } from "@/lib/seo";

// Every indexable page. Add new pages here. Images help them show in Google Images.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = contentUpdated;
  const lab = ["/campus/classroom-1.jpg", "/campus/classroom-2.jpg", "/campus/classroom-3.jpg", "/campus/classroom-4.jpg"].map(abs);
  return [
    { url: abs("/"), lastModified, changeFrequency: "weekly", priority: 1, images: lab.slice(0, 2) },
    { url: abs("/courses"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...courses.map((c) => ({
      url: abs(`/courses/${c.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [abs(`/courses/${c.slug}/opengraph-image`)],
    })),
    { url: abs(`/locations/${reach.lab.slug}`), lastModified, changeFrequency: "monthly", priority: 0.8, images: lab },
    { url: abs("/contact"), lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];
}
