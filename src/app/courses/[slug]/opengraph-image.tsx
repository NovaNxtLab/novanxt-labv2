import { courses } from "@/lib/brand";
import { courseDetails } from "@/lib/course-details";
import { ogCard, ogSize } from "@/lib/og/card";

export const alt = "NovaNxt Lab course — Kandivali West, Mumbai";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = courses.find((x) => x.slug === slug) ?? courses[0];
  const d = courseDetails[c.slug];
  return ogCard({
    eyebrow: c.category,
    title: `${c.title} Course`,
    sub: c.summary,
    chips: [c.duration, d?.level, "Free demo class"].filter((x): x is string => Boolean(x)),
  });
}
