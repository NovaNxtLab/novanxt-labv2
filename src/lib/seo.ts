// Technical SEO in one place: canonical site URL, per-page metadata builder, keyword sets and
// schema.org (JSON-LD) builders. Pages call `pageMetadata()` so every page gets the same complete set
// of tags (canonical, Open Graph, Twitter, keywords). Marketing team guide: https://claude.ai/artifact/U2DQDLH2yrnzs3JgqCf9fE
import type { Metadata } from "next";
import { brand, contact, courses, reach, seo, type Course } from "@/lib/brand";

/** Production origin, no trailing slash. Override per environment with NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.novanxtlab.com").replace(/\/+$/, "");
export const abs = (path = "/") => `${siteUrl}${path === "/" ? "" : path}`;

/** Bump when content changes meaningfully — feeds sitemap <lastmod>. (Fixed date: no Date() at build.) */
export const contentUpdated = "2026-11-19";

export const orgId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

// ---------- keywords ----------

/** Search phrases per course, written the way people in Mumbai actually search. Edit freely. */
export const courseKeywords: Record<string, string[]> = {
  "ai-ml-generative-ai": [
    "AI course in Mumbai",
    "AI ML course in Kandivali",
    "Generative AI course Mumbai",
    "machine learning course in Kandivali West",
    "artificial intelligence classes near Borivali",
    "AI and robotics course Mumbai",
  ],
  "python-with-ai": [
    "Python course in Kandivali",
    "Python classes in Kandivali West",
    "Python training Mumbai",
    "Python with AI course",
    "Python classes near Borivali and Malad",
  ],
  "full-stack-web-development": [
    "full stack development course in Kandivali",
    "web development course in Mumbai",
    "web designing classes in Kandivali West",
    "MERN stack course Mumbai",
    "frontend development course near Borivali",
  ],
  "core-java": [
    "Java course in Kandivali",
    "Core Java classes in Kandivali West",
    "Java training institute Mumbai",
    "Java programming course near Malad",
  ],
  "advanced-excel-with-ai": [
    "Advanced Excel course in Kandivali",
    "Excel classes in Kandivali West",
    "MIS Excel course Mumbai",
    "Excel with AI course",
    "Excel training near Borivali",
  ],
  "tally-gst-payroll": [
    "Tally course in Kandivali",
    "Tally Prime classes in Kandivali West",
    "Tally GST course Mumbai",
    "GST and payroll course",
    "accounting course near Borivali and Malad",
  ],
  "office-automation-with-ai": [
    "basic computer course in Kandivali",
    "computer classes for beginners Kandivali West",
    "MS Office course Mumbai",
    "MS-CIT alternative course Kandivali",
  ],
  "graphic-design-video-editing": [
    "graphic design course in Kandivali",
    "video editing course in Mumbai",
    "Photoshop and Canva classes Kandivali West",
    "video editing classes near Borivali",
  ],
  "kids-coding-and-ai": [
    "coding classes for kids in Kandivali",
    "kids computer course Kandivali West",
    "computer classes for children Mumbai",
    "AI for kids course Mumbai",
  ],
};

export const siteKeywords = [...seo.primaryKeywords, ...seo.courseKeywords];

// ---------- metadata ----------

type PageMeta = {
  title: string; // goes through the root template "%s | NovaNxt Lab" unless absoluteTitle
  description: string;
  path: string; // "/courses/python-with-ai"
  keywords?: readonly string[];
  absoluteTitle?: boolean;
  noindex?: boolean;
  /** Pages with their own opengraph-image file (course pages) pass false. */
  defaultImage?: boolean;
};

/**
 * Complete per-page metadata. Open Graph / Twitter objects are rebuilt in full here because Next replaces
 * (doesn't deep-merge) them per segment. Share images come from the nearest `opengraph-image` file.
 */
export function pageMetadata({ title, description, path, keywords, absoluteTitle, noindex, defaultImage = true }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${brand.name}`;
  const images = defaultImage ? [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${brand.name} — computer courses in Kandivali West, Mumbai` }] : undefined;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ? [...keywords] : siteKeywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: brand.name,
      locale: "en_IN",
      url: path,
      title: fullTitle,
      description,
      ...(images && { images }),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, ...(images && { images: [images[0].url] }) },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}

/** Summary + suffix, trimmed at a word boundary so the whole thing stays within Google's ~160 characters. */
export function fitDescription(summary: string, suffix: string, max = 160) {
  if ((summary + suffix).length <= max) return summary + suffix;
  const room = max - suffix.length - 1;
  const cut = summary.slice(0, room).replace(/[\s,;:—-]+\S*$/, "");
  return `${cut}…${suffix}`;
}

// ---------- JSON-LD ----------

const address = {
  "@type": "PostalAddress",
  streetAddress: "F/29, Profit Center, Mahavir Nagar, Kandivali (West)",
  addressLocality: reach.lab.city,
  addressRegion: "Maharashtra",
  postalCode: "400067",
  addressCountry: "IN",
};

/** The institute itself — emitted once per page from the root layout; other entities point at its @id. */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": orgId,
    name: brand.name,
    alternateName: ["NovaNxt", "Nova Nxt Lab", "NovaNxtLab"],
    description: seo.description,
    slogan: brand.tagline,
    url: abs("/"),
    logo: { "@type": "ImageObject", url: abs("/icons/icon-512.png"), width: 512, height: 512 },
    image: [abs("/campus/classroom-1.jpg"), abs("/campus/classroom-3.jpg")],
    telephone: contact.phone,
    email: contact.email,
    address,
    hasMap: contact.mapsHref,
    areaServed: [reach.lab.area, ...reach.nearby, reach.lab.city].map((name) => ({ "@type": "Place", name })),
    priceRange: "₹₹",
    sameAs: Object.values(contact.socials),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      email: contact.email,
      contactType: "admissions",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Computer courses",
      itemListElement: courses.map((c) => ({ "@type": "Offer", itemOffered: { "@id": `${abs(`/courses/${c.slug}`)}#course` } })),
    },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: abs("/"),
    name: brand.name,
    inLanguage: "en-IN",
    publisher: { "@id": orgId },
  };
}

export function courseLd(c: Course, level: string, outcomes: string[]) {
  const url = abs(`/courses/${c.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    url,
    name: c.title,
    description: c.summary,
    educationalLevel: level,
    teaches: outcomes,
    inLanguage: "en-IN",
    keywords: (courseKeywords[c.slug] ?? []).join(", "),
    provider: { "@type": "EducationalOrganization", "@id": orgId, name: brand.name, sameAs: abs("/") },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: { "@type": "Place", name: `${brand.name}, ${reach.lab.area}`, address },
      ...(c.duration && !c.duration.includes("levels") ? { courseWorkload: c.duration } : {}),
    },
  };
}

/** ItemList of course URLs — makes /courses eligible for Google's course carousel. */
export function courseListLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Computer courses at ${brand.name}`,
    itemListElement: courses.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/courses/${c.slug}`), name: c.title })),
  };
}

/** Breadcrumb trail; the last crumb (current page) has no href, which Google allows. */
export function breadcrumbLd(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      ...(b.href && { item: abs(b.href) }),
    })),
  };
}

/** Render JSON-LD safely (escapes "<" so content can't close the script tag). */
export const ldHtml = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
