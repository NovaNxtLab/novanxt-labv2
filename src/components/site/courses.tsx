"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { IconArrowRight, IconChartBar, IconClock } from "@tabler/icons-react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { FeatureCell, FeatureGrid } from "@/components/ui/feature-grid";
import { AnalyticsVisual, CodeVisual, PathVisual } from "@/components/site/course-visuals";
import { CourseIcon, badgeStyle, courseHref, includes, tile } from "@/components/site/course-meta";
import { contact, courses, type Course, type CourseCategory } from "@/lib/brand";
import { courseDetails } from "@/lib/course-details";
import { cn } from "@/lib/utils";

type Filter = "All" | CourseCategory;
const filters: Filter[] = ["All", "AI & Data", "Programming", "Office & Accounts", "Creative", "Kids"];

/**
 * `featured` = homepage teaser (3 picks in a packed grid, "View all" → /courses).
 * `all` = the /courses catalogue (filter chips + every course; heading is the page h1).
 * Every course links to its own page at /courses/[slug].
 */
export function Courses({ variant = "all", featured = [] }: { variant?: "featured" | "all"; featured?: string[] }) {
  const isFeatured = variant === "featured";
  const Heading = isFeatured ? "h2" : "h1";
  const [filter, setFilter] = useState<Filter>("All");

  const list = isFeatured
    ? featured.map((slug) => courses.find((c) => c.slug === slug)).filter((c): c is Course => !!c)
    : filter === "All"
      ? courses
      : courses.filter((c) => c.category === filter);
  const count = (f: Filter) => (f === "All" ? courses.length : courses.filter((c) => c.category === f).length);

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      {/* ---------- Heading ---------- */}
      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end lg:gap-16">
        <div>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-brand-500">
            <span className="h-px w-10 bg-spark-300" />
            Skill tracks
          </p>
          <Heading className="mt-4 font-display text-[clamp(2rem,8.5vw,2.4rem)] font-extrabold leading-[1.08] tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-[3.3rem]">
            Pick a course.{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-serif text-[1.15em] font-normal italic tracking-normal text-brand-600">Build</span>
              <span aria-hidden className="absolute inset-x-0 bottom-[0.12em] h-[0.28em] bg-aqua-200" />
            </span>{" "}
            real projects.
          </Heading>
        </div>
        <div className="text-base leading-relaxed text-mist-600 md:text-lg">
          <p>
            {courses.length} practical programs, from your first computer class to AI engineering. Every course is taught
            hands-on at our Kandivali West lab.
          </p>
          <a
            href={contact.whatsappHref("Hi NovaNxt Lab, I'm not sure which course suits me. Can you help me choose?")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block py-2.5 font-semibold text-brand-600 hover:text-brand-800"
          >
            Not sure which one? Get free{" "}
            <span className="whitespace-nowrap">
              counselling
              <IconArrowRight className="ml-1.5 inline size-4 align-[-2px]" />
            </span>
          </a>
        </div>
      </div>

      {isFeatured ? (
        <FeaturedGrid items={list} />
      ) : (
        <>
          {/* ---------- Category filter ---------- */}
          <div
            role="group"
            aria-label="Filter courses by category"
            className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {filters.map((f) => {
              const on = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "flex min-h-11 shrink-0 items-center gap-2 border px-4 text-sm font-semibold transition",
                    on
                      ? "border-brand-300 bg-brand-100 text-ink-900"
                      : "border-mist-200 bg-white text-mist-600 hover:border-mist-300 hover:text-ink-800",
                  )}
                >
                  {f}
                  <span className={cn("px-1.5 font-mono text-xs", on ? "bg-white text-brand-700" : "bg-mist-100 text-mist-500")}>
                    {count(f)}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {list.length} {list.length === 1 ? "course" : "courses"}
            {filter !== "All" && ` in ${filter}`}
          </p>

          {/* ---------- Catalogue grid (Aceternity Card Hover Effect) ---------- */}
          <HoverEffect
            items={list}
            getKey={(c) => c.slug}
            className="-mx-2 py-6"
            highlightClassName="bg-aqua-100"
            renderItem={(c) => <CourseCard course={c} />}
          />
          <IncludesList className="mt-4 border border-dashed border-spark-300 bg-spark-50 p-4 sm:p-5 lg:grid-cols-4" />
        </>
      )}
    </div>
  );
}

function IncludesList({ className }: { className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-3", className)}>
      {includes.map(({ icon: I, label }) => (
        <li key={label} className="flex items-center gap-2.5 text-sm font-semibold text-ink-800">
          <span className="grid size-9 shrink-0 place-items-center bg-white text-spark-700 shadow-soft">
            <I className="size-5" />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}

/** Stretched link: the whole card/cell is the tap target. */
function DetailsLink({ course: c, className }: { course: Course; className?: string }) {
  return (
    <Link
      href={courseHref(c.slug)}
      className={cn(
        "flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors after:absolute after:inset-0 after:content-[''] hover:text-brand-800 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-400",
        className,
      )}
    >
      View course details
      <span className="sr-only">: {c.title}</span>
      <IconArrowRight
        className="size-4 transition-transform group-hover:translate-x-1 group-hover/feature:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}

/** `compact` drops the level (narrow cells) so meta + link stay on one line. */
function MetaRow({ course: c, className, compact = false }: { course: Course; className?: string; compact?: boolean }) {
  const d = courseDetails[c.slug];
  return (
    <dl className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-mist-600", className)}>
      <div className="flex items-center gap-1.5">
        <dt className="sr-only">Duration</dt>
        <IconClock className="size-4 text-mist-400" aria-hidden />
        <dd>{c.duration ?? "Flexible batches"}</dd>
      </div>
      {d && !compact && (
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Level</dt>
          <IconChartBar className="size-4 text-mist-400" aria-hidden />
          <dd>{d.level}</dd>
        </div>
      )}
    </dl>
  );
}

/* ---------- Homepage: packed grid (Aceternity Feature Section), square corners ---------- */

const visuals: Record<string, (c: Course) => ReactNode> = {
  "ai-ml-generative-ai": (c) => <PathVisual course={c} />,
  "python-with-ai": () => <CodeVisual />,
  "advanced-excel-with-ai": () => <AnalyticsVisual />,
};

// lg = 6-column grid, two rows sized to fit one desktop screen:
// row 1: flagship (4) + Python (2) · row 2: analytics (4) + more courses (2). Stacks below lg.
const cellSpan = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-4"];

function FeaturedGrid({ items }: { items: Course[] }) {
  const others = courses.filter((c) => !items.includes(c));

  return (
    <FeatureGrid className="mt-8 md:mt-10">
      {items.map((c, i) => {
        const d = courseDetails[c.slug];
        const big = i === 0;
        return (
          <FeatureCell
            key={c.slug}
            className={cellSpan[i]}
            accent={big ? "group-hover/feature:bg-spark-300" : "group-hover/feature:bg-brand-400"}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <span className={cn("grid size-8 place-items-center shorter:size-7", tile[c.accent])}>
                  <CourseIcon slug={c.slug} className="size-[18px]" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-brand-500">{c.category}</span>
              </span>
              {d?.badge && <span className={cn("px-2 py-0.5 text-[11px] font-semibold", badgeStyle[d.badge])}>{d.badge}</span>}
            </div>
            <h3
              className={cn(
                "mt-3 font-display font-bold leading-snug tracking-tight text-ink-900 transition duration-200 group-hover/feature:translate-x-1.5 shorter:mt-1",
                big ? "text-2xl short:text-xl shorter:text-lg" : "text-xl short:text-lg shorter:text-base",
              )}
            >
              {c.title}
            </h3>

            {visuals[c.slug]?.(c)}

            <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 pt-3 lg:pt-4 short:pt-3 shorter:pt-2">
              <MetaRow course={c} compact={!big} />
              <DetailsLink course={c} className="lg:min-h-0" />
            </div>
          </FeatureCell>
        );
      })}

      {/* → full catalogue */}
      <FeatureCell className="bg-brand-50 lg:col-span-2" wash="from-brand-100">
        <p className="font-mono text-[11px] uppercase tracking-widest text-brand-600">+{others.length} more courses</p>
        <ul className="mb-4 mt-3 divide-y short:mb-3 short:mt-2 shorter:mb-2.5 divide-brand-100 border-y border-brand-100">
          {others.map((c) => (
            <li key={c.slug}>
              <Link
                href={courseHref(c.slug)}
                className="group flex min-h-10 items-center justify-between gap-3 py-1.5 text-sm short:min-h-9 short:py-1 shorter:min-h-7 shorter:py-0.5 shorter:text-[13px] font-medium text-ink-800 hover:text-brand-700"
              >
                <span className="flex items-center gap-2">
                  <CourseIcon slug={c.slug} className="size-4 shrink-0 text-brand-500" />
                  {c.title}
                </span>
                <IconArrowRight className="size-3.5 shrink-0 text-mist-400 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/courses"
          className="group mt-auto inline-flex min-h-12 items-center justify-center gap-2 bg-spark-300 px-6 py-3 font-display short:min-h-11 short:py-2 shorter:min-h-10 shorter:py-1.5 shorter:text-[15px] font-semibold text-ink-900 shadow-glow-spark transition hover:-translate-y-0.5 hover:bg-spark-400"
        >
          View all {courses.length} courses
          <IconArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </FeatureCell>
    </FeatureGrid>
  );
}

/* ---------- /courses catalogue card ---------- */

function CourseCard({ course: c }: { course: Course }) {
  const d = courseDetails[c.slug];

  return (
    <article className="relative flex h-full flex-col border border-mist-200 bg-white p-5 shadow-soft transition-colors group-hover:border-aqua-200 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className={cn("grid size-12 place-items-center", tile[c.accent])}>
          <CourseIcon slug={c.slug} className="size-6" />
        </span>
        {d?.badge && <span className={cn("px-3 py-1 text-xs font-semibold", badgeStyle[d.badge])}>{d.badge}</span>}
      </div>

      <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-brand-500">{c.category}</p>
      <h2 className="mt-1.5 font-display text-xl font-bold leading-snug text-ink-900">{c.title}</h2>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mist-600">{c.summary}</p>

      {d && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools">
          {d.tools.slice(0, 4).map((t) => (
            <li key={t} className="border border-mist-200 bg-mist-50 px-2 py-1 text-[11px] font-medium text-mist-600">
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-5">
        <MetaRow course={c} className="border-t border-mist-100 pt-4" />
        <DetailsLink course={c} className="mt-4" />
      </div>
    </article>
  );
}
