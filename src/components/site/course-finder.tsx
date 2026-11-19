"use client";

// Course list with an "I am a…" picker: tap who you are, see only the courses that fit.
// Server-renders with "Everyone" selected, so every course is in the HTML for SEO / no-JS.
import { useState } from "react";
import { CourseGrid } from "@/components/site/ui";
import { courses } from "@/lib/brand";
import { cn } from "@/lib/utils";

export const audiences = [
  { id: "all", label: "Everyone", note: "", slugs: courses.map((c) => c.slug) },
  {
    id: "student",
    label: "Student",
    note: "After 10th, 12th or graduation — start a tech skill from zero.",
    slugs: ["python-with-ai", "ai-ml-generative-ai", "full-stack-web-development", "core-java", "office-automation-with-ai"],
  },
  {
    id: "working",
    label: "Working professional",
    note: "Work faster with Excel, automation and AI tools.",
    slugs: ["advanced-excel-with-ai", "python-with-ai", "office-automation-with-ai", "ai-ml-generative-ai"],
  },
  {
    id: "business",
    label: "Accountant / business owner",
    note: "Run your books, GST and payroll yourself.",
    slugs: ["tally-gst-payroll", "advanced-excel-with-ai", "office-automation-with-ai"],
  },
  {
    id: "creator",
    label: "Creator",
    note: "Design posts, edit reels and build a brand.",
    slugs: ["graphic-design-video-editing", "full-stack-web-development"],
  },
  {
    id: "kids",
    label: "Parent of a child (5–10)",
    note: "Screen time that builds logic and creativity.",
    slugs: ["kids-coding-and-ai"],
  },
] as const;

export function CourseFinder({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const [active, setActive] = useState<string>("all");
  const group = audiences.find((g) => g.id === active) ?? audiences[0];
  const list = group.slugs.map((s) => courses.find((c) => c.slug === s)!).filter(Boolean);

  return (
    <div>
      <div className="border-2 border-ink-900 bg-white p-4 shadow-hard sm:p-6">
        <p id="finder-label" className="font-display text-xl font-extrabold text-ink-900">
          I am a…
        </p>
        <div
          role="group"
          aria-labelledby="finder-label"
          className="-mx-4 mt-4 flex gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {audiences.map((g) => {
            const on = g.id === active;
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(g.id)}
                className={cn(
                  "min-h-11 shrink-0 border-2 border-ink-900 px-4 text-sm font-extrabold transition-colors",
                  on ? "bg-ink-900 text-white" : "bg-cream text-ink-900 hover:bg-spark-200",
                )}
              >
                {g.label}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-ink-700" aria-live="polite">
          {group.note ? (
            <>
              <span className="font-semibold text-ink-800">{group.note}</span> {list.length}{" "}
              {list.length === 1 ? "course fits" : "courses fit"} you.
            </>
          ) : (
            <>Showing all {list.length} courses. Pick who you are to narrow it down.</>
          )}
        </p>
      </div>

      <div className="mt-10">
        <CourseGrid items={list} headingLevel={headingLevel} />
      </div>
    </div>
  );
}
