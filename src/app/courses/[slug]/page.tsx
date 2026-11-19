import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNavbar } from "@/components/site/site-navbar";
import { CourseDetail } from "@/components/site/course-detail";
import { courses, seo } from "@/lib/brand";
import { courseKeywords, fitDescription, pageMetadata } from "@/lib/seo";

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
  return pageMetadata({
    title: `${course.title} Course in Kandivali West`,
    description: fitDescription(course.summary, " Classes in Kandivali West, Mumbai. Free demo."),
    path: `/courses/${course.slug}`,
    keywords: [...(courseKeywords[course.slug] ?? []), ...seo.primaryKeywords.slice(0, 3)],
    defaultImage: false, // uses ./opengraph-image.tsx
  });
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
