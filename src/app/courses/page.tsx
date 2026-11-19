import { SiteNavbar } from "@/components/site/site-navbar";
import { CourseFinder } from "@/components/site/course-finder";
import { includes } from "@/components/site/course-meta";
import { CtaBand } from "@/components/site/home-sections";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { Tag, PageHeader, Section } from "@/components/site/ui";
import { courses, reach, seo } from "@/lib/brand";
import { courseKeywords, courseListLd, ldHtml, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "All Courses — AI, Python, Web, Excel & Tally",
  description:
    "Compare all 9 NovaNxt Lab courses: AI & ML, Python, Web Development, Java, Excel, Tally, Office, Design and Kids Coding. Hands-on classes in Kandivali West.",
  path: "/courses",
  keywords: [...seo.primaryKeywords, ...Object.values(courseKeywords).map((k) => k[0])],
});

export default function CoursesPage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <script type="application/ld+json" dangerouslySetInnerHTML={ldHtml(courseListLd())} />
        <PageHeader
          crumbs={[{ label: "Home", href: "/" }, { label: "Courses" }]}
          tag={<Tag tone="white">{courses.length} courses</Tag>}
          title="All courses"
          intro={`Hands-on courses with AI built in, taught at our ${reach.lab.area} lab. Pick who you are to see the courses that fit you best.`}
        >
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm font-bold text-ink-900 sm:flex sm:flex-wrap">
            {includes.map(({ icon: I, label }) => (
              <li key={label} className="flex items-center gap-2 border-2 border-ink-900 bg-white px-3 py-2">
                <I className="size-5 shrink-0 text-spark-700" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </PageHeader>

        <Section aria-label="Course list">
          <CourseFinder headingLevel="h2" />
        </Section>

        <CtaBand />
      </main>
      <MobileActionBar
        whatsappText="Hi NovaNxt Lab, I'm not sure which course suits me. Can you help me choose?"
        label="Help me choose"
      />
    </>
  );
}
