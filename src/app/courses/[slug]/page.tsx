import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNavbar } from "@/components/site/site-navbar";
import { CourseDetail } from "@/components/site/course-detail";
import { courses, reach } from "@/lib/brand";

// Every course is prerendered at build time (Cache Components requires at least one param here).
export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

// Course pages are SEO landing pages, so `params` is read at the top (not behind <Suspense>): the prerendered HTML
// then contains the full course for crawlers and no-JS visitors, and unknown slugs return a real 404 instead of a
// streamed soft-404. The trade-off is a blocking (not instant) client navigation, which is cheap here because every
// course page is a static file. See next/dist/docs/.../route-segment-config/instant.md#disabling-instant
export const instant = false;

const find = (slug: string) => courses.find((c) => c.slug === slug);

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const course = find((await params).slug);
  if (!course) return {};
  return {
    title: `${course.title} Course in Mumbai — Kandivali West`,
    description: `${course.summary} Hands-on classroom batches at our Kandivali West lab, easy to reach from ${reach.nearby.slice(0, 3).join(", ")} and across Mumbai. Book a free demo.`,
    alternates: { canonical: `/courses/${course.slug}` },
  };
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const course = find((await params).slug);
  if (!course) notFound();

  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <CourseDetail course={course} />
      </main>
    </>
  );
}
