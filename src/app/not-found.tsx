import Link from "next/link";
import { SiteNavbar } from "@/components/site/site-navbar";
import { CourseGrid, Section, Tag, btn } from "@/components/site/ui";
import { courses } from "@/lib/brand";

// Shown for any unknown URL (Next sends a 404 status and a noindex tag automatically).
export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <Section tone="orange">
          <Tag tone="white">Error 404</Tag>
          <h1 className="mt-5 font-display text-5xl font-extrabold tracking-tight text-ink-900 sm:text-6xl">This page took a coffee break.</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-700">
            The link may be old or mistyped. Our courses are all still here, so pick one below or head back home.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className={btn({})}>Back to home</Link>
            <Link href="/courses" className={btn({ variant: "secondary" })}>See all courses</Link>
            <Link href="/contact" className={btn({ variant: "secondary" })}>Contact us</Link>
          </div>
        </Section>
        <Section aria-label="Popular courses">
          <CourseGrid items={courses.slice(0, 3)} headingLevel="h2" />
        </Section>
      </main>
    </>
  );
}
