// Shared course presentation bits (icons, tints, badges, enrol message) used by the homepage grid,
// the /courses catalogue and the /courses/[slug] detail pages. Server- and client-safe.
import {
  IconBrain,
  IconBrandPython,
  IconBriefcase,
  IconCertificate,
  IconCode,
  IconCoffee,
  IconDeviceLaptop,
  IconMoodKid,
  IconPalette,
  IconReceiptTax,
  IconRocket,
  IconSchool,
  IconTable,
  type Icon,
} from "@tabler/icons-react";
import { createElement } from "react";
import type { Course } from "@/lib/brand";
import type { CourseDetails } from "@/lib/course-details";

const icons: Record<string, Icon> = {
  "ai-ml-generative-ai": IconBrain,
  "python-with-ai": IconBrandPython,
  "full-stack-web-development": IconCode,
  "core-java": IconCoffee,
  "advanced-excel-with-ai": IconTable,
  "tally-gst-payroll": IconReceiptTax,
  "office-automation-with-ai": IconBriefcase,
  "graphic-design-video-editing": IconPalette,
  "kids-coding-and-ai": IconMoodKid,
};
export const courseIcon = (slug: string): Icon => icons[slug] ?? IconSchool;

export const courseHref = (slug: string) => `/courses/${slug}`;

// Logo tints only (100–200 fills, dark text on top)
export const tile: Record<Course["accent"], string> = {
  spark: "bg-spark-100 text-spark-800",
  brand: "bg-brand-100 text-brand-700",
  ink: "bg-aqua-100 text-aqua-800",
};

export const badgeStyle: Record<NonNullable<CourseDetails["badge"]>, string> = {
  Flagship: "bg-spark-200 text-spark-900",
  "Most popular": "bg-aqua-200 text-aqua-900",
  "Job-ready": "bg-brand-100 text-brand-800",
  "For kids": "bg-spark-100 text-spark-800",
};

export const enrollText = (c: Course) =>
  `Hi NovaNxt Lab, I'm interested in the ${c.title} course. Please share the fees, batch timings and a free demo slot.`;

export const demoText = (c: Course) => `Hi NovaNxt Lab, I'd like to book a free demo class for ${c.title}.`;

export const includes = [
  { icon: IconRocket, label: "Free demo class" },
  { icon: IconDeviceLaptop, label: "90% hands-on lab sessions" },
  { icon: IconBrain, label: "AI tools in every course" },
  { icon: IconCertificate, label: "Course-completion certificate" },
];

/** The course's icon. Rendered via createElement so the lookup isn't treated as a component created during render. */
export function CourseIcon({ slug, className }: { slug: string; className?: string }) {
  return createElement(courseIcon(slug), { className, "aria-hidden": true });
}
