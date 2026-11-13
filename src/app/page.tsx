import { SiteNavbar } from "@/components/site/site-navbar";
import { Hero } from "@/components/site/hero";
import { Courses } from "@/components/site/courses";

// Homepage teaser: flagship + the two most-asked-for tracks. Full catalogue lives at /courses.
const featuredCourses = [
  "ai-ml-course-in-kandivali",
  "python-with-ai-course-in-kandivali",
  "advanced-excel-with-ai-course-in-kandivali",
];

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <section id="hero">
          <Hero />
        </section>
        <section id="courses" aria-label="Courses" className="scroll-mt-20">
          <Courses variant="featured" featured={featuredCourses} />
        </section>
      </main>
    </>
  );
}
