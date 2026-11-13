import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site/site-navbar";
import { Courses } from "@/components/site/courses";

export const metadata: Metadata = {
  title: "Computer Courses in Kandivali West — AI, Python, Excel, Tally & more",
  description:
    "Explore every NovaNxt Lab course: AI & ML, Python, Web Development, Core Java, Advanced Excel, Tally + GST, Office Automation, Graphic Design and Kids Coding — hands-on at our Kandivali West lab.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1 bg-gradient-to-b from-white via-aqua-50/40 to-mist-50 pt-10 md:pt-14">
        <Courses variant="all" />
      </main>
    </>
  );
}
