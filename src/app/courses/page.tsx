import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site/site-navbar";
import { CourseFinder } from "@/components/site/course-finder";
import { includes } from "@/components/site/course-meta";
import { CtaBand } from "@/components/site/home-sections";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { Tag, PageHeader, Section } from "@/components/site/ui";
import { courses, reach } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Computer Courses in Mumbai — AI, Python, Excel, Tally & more",
  description:
    "Explore every NovaNxt Lab course: AI & ML, Python, Web Development, Core Java, Advanced Excel, Tally + GST, Office Automation, Graphic Design and Kids Coding — hands-on, project-based classes at our Kandivali West lab, Mumbai.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
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
