// /courses/[slug] — full course details. Server component: everything is in the static HTML (SEO + no-JS).
import Link from "next/link";
import type { ReactNode } from "react";
import {
  IconArrowRight,
  IconBrandWhatsapp,
  IconCertificate,
  IconChartBar,
  IconChevronRight,
  IconCircleCheckFilled,
  IconClock,
  IconDeviceLaptop,
  IconListNumbers,
  IconMapPin,
  IconPhone,
  IconRocket,
} from "@tabler/icons-react";
import { CourseIcon, badgeStyle, courseHref, demoText, enrollText, includes, tile } from "@/components/site/course-meta";
import { brand, contact, courses, type Course } from "@/lib/brand";
import { courseDetails } from "@/lib/course-details";
import { cn } from "@/lib/utils";

export function CourseDetail({ course: c }: { course: Course }) {
  const d = courseDetails[c.slug];

  const isKids = c.category === "Kids";

  const facts = [
    { k: "Duration", v: c.duration ?? "Flexible batches", icon: IconClock },
    { k: "Level", v: d.level, icon: IconChartBar },
    { k: isKids ? "Levels" : "Modules", v: String(c.modules.length), icon: IconListNumbers },
    { k: "Mode", v: "Classroom lab", icon: IconDeviceLaptop },
  ];

  const related = [
    ...courses.filter((o) => o.slug !== c.slug && o.category === c.category),
    ...courses.filter((o) => o.slug !== c.slug && o.category !== c.category),
  ].slice(0, 3);

  return (
    <>
      <CourseJsonLd course={c} />

      {/* ---------- Header ---------- */}
      <header className="border-b border-mist-200 bg-gradient-to-b from-white via-aqua-50/50 to-spark-50/60">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 md:pb-16 md:pt-32 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-mist-500">
            <Link href="/" className="py-2 hover:text-ink-800">Home</Link>
            <IconChevronRight className="size-3.5" aria-hidden />
            <Link href="/courses" className="py-2 hover:text-ink-800">Courses</Link>
            <IconChevronRight className="size-3.5" aria-hidden />
            <span aria-current="page" className="py-2 text-ink-800">{c.title}</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className={cn("grid size-11 place-items-center", tile[c.accent])}>
                  <CourseIcon slug={c.slug} className="size-6" />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-500">{c.category}</span>
                {d.badge && <span className={cn("px-2.5 py-1 text-xs font-semibold", badgeStyle[d.badge])}>{d.badge}</span>}
              </div>
              <h1 className="mt-5 font-display text-[clamp(2.1rem,9vw,2.6rem)] font-extrabold leading-[1.06] tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl">
                {c.title}
              </h1>
              <p className="mt-4 font-display text-lg font-semibold text-aqua-700 md:text-xl">{c.tagline}</p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-mist-600 md:text-lg">{c.summary}</p>

              <div className="mt-8 hidden flex-wrap gap-3 sm:flex">
                <EnrollButton course={c} />
                <a
                  href={contact.whatsappHref(demoText(c))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-mist-300 bg-white px-6 font-display font-semibold text-ink-800 transition hover:border-ink-800"
                >
                  Book a free demo class
                </a>
              </div>
            </div>

            {/* key facts — packed, square */}
            <dl className="grid grid-cols-2 gap-px border border-mist-200 bg-mist-200">
              {facts.map(({ k, v, icon: I }) => (
                <div key={k} className="bg-white p-4">
                  <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-mist-500">
                    <I className="size-3.5" aria-hidden />
                    {k}
                  </dt>
                  <dd className="mt-1.5 font-display text-base font-bold text-ink-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      {/* ---------- Body ---------- */}
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1fr_22rem] lg:gap-16 lg:px-8">
        <div className="min-w-0 space-y-14">
          <Section eyebrow="01" title="Who this course is for">
            <ul className="grid gap-px border border-aqua-100 bg-aqua-100 sm:grid-cols-3">
              {d.idealFor.map((t) => (
                <li key={t} className="bg-aqua-50 p-4 text-sm font-semibold text-aqua-900">{t}</li>
              ))}
            </ul>
          </Section>

          <Section eyebrow="02" title="What you'll be able to do">
            <ul className="grid gap-4 sm:grid-cols-2">
              {d.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-base leading-relaxed text-ink-700">
                  <IconCircleCheckFilled className="mt-1 size-5 shrink-0 text-aqua-400" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </Section>

          <Section
            eyebrow="03"
            title={isKids ? "Levels" : "Syllabus"}
            aside={`${c.modules.length} ${isKids ? "levels" : "modules"}${c.duration && !isKids ? ` · ${c.duration}` : ""}`}
          >
            <ol className="grid gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2">
              {c.modules.map((m, i) => (
                <li key={m} className="flex items-center gap-4 bg-white px-4 py-4">
                  <span className="grid size-9 shrink-0 place-items-center bg-brand-50 font-mono text-sm font-semibold text-brand-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium text-ink-800">{m.replace(/^L\d · /, "")}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section eyebrow="04" title="Projects you'll build">
            <ul className="grid gap-px border border-spark-100 bg-spark-100 sm:grid-cols-3">
              {d.projects.map((p) => (
                <li key={p} className="flex flex-col gap-3 bg-spark-50 p-4">
                  <IconRocket className="size-5 text-spark-600" aria-hidden />
                  <span className="text-sm font-semibold text-ink-800">{p}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section eyebrow="05" title="Tools you'll use">
            <ul className="flex flex-wrap gap-2">
              {d.tools.map((t) => (
                <li key={t} className="border border-mist-200 bg-white px-3 py-2 font-mono text-sm text-ink-700">{t}</li>
              ))}
            </ul>
          </Section>

          <Section eyebrow="06" title={isKids ? "What your child gains" : "Career roles you can target"}>
            <ul className="flex flex-wrap gap-2">
              {d.careers.map((t) => (
                <li key={t} className="border border-brand-100 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-800">{t}</li>
              ))}
            </ul>
          </Section>

          <Section eyebrow="07" title="Certification">
            <p className="flex items-start gap-3 border border-mist-200 bg-white p-4 text-ink-700">
              <IconCertificate className="mt-0.5 size-5 shrink-0 text-brand-500" aria-hidden />
              {d.certificate} on successful completion of the course and projects.
            </p>
          </Section>
        </div>

        {/* ---------- Sticky enrol panel (desktop) ---------- */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 border border-mist-200 bg-white shadow-lift">
            <div className="border-b border-mist-200 bg-ink-gradient p-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-brand-800">Next batch</p>
              <p className="mt-1 font-display text-xl font-bold text-ink-900">Ask on WhatsApp</p>
              <p className="mt-1 text-sm text-ink-700">Fees, timings &amp; weekday / weekend options.</p>
            </div>
            <ul className="space-y-3 p-5">
              {includes.map(({ icon: I, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-ink-800">
                  <I className="size-4 shrink-0 text-spark-600" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-mist-200 p-5">
              <EnrollButton course={c} className="w-full" />
              <a
                href={contact.phoneHref}
                className="flex min-h-12 w-full items-center justify-center gap-2 border border-mist-300 font-display font-semibold text-ink-800 transition hover:border-ink-800"
              >
                <IconPhone className="size-5" />
                {contact.phone}
              </a>
            </div>
            <p className="flex items-start gap-2 border-t border-mist-200 p-5 text-xs leading-relaxed text-mist-600">
              <IconMapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              {contact.address}
            </p>
          </div>
        </aside>
      </div>

      {/* ---------- Related ---------- */}
      <section aria-labelledby="related" className="border-t border-mist-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="related" className="font-display text-2xl font-bold text-ink-900 md:text-3xl">Explore other courses</h2>
            <Link href="/courses" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-800">
              All {courses.length} courses <IconArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-px border border-mist-200 bg-mist-200 md:grid-cols-3">
            {related.map((r) => {

              return (
                <li key={r.slug} className="bg-white">
                  <Link href={courseHref(r.slug)} className="group flex h-full flex-col p-5 transition hover:bg-aqua-50 sm:p-6">
                    <span className="flex items-center gap-2.5">
                      <span className={cn("grid size-9 place-items-center", tile[r.accent])}>
                        <CourseIcon slug={r.slug} className="size-5" />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-brand-500">{r.category}</span>
                    </span>
                    <span className="mt-4 font-display text-lg font-bold text-ink-900">{r.title}</span>
                    <span className="mt-1.5 line-clamp-2 text-sm text-mist-600">{r.summary}</span>
                    <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                      View course <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------- Mobile/tablet: pinned enrol bar ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] gap-2 border-t border-mist-200 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <a
          href={contact.phoneHref}
          aria-label={`Call ${contact.phone}`}
          className="grid size-12 place-items-center border border-mist-200 text-brand-600"
        >
          <IconPhone className="size-5" />
        </a>
        <EnrollButton course={c} />
      </div>
      {/* keeps the last content clear of the pinned bar */}
      <div aria-hidden className="h-20 lg:hidden" />
    </>
  );
}

function EnrollButton({ course: c, className }: { course: Course; className?: string }) {
  return (
    <a
      href={contact.whatsappHref(enrollText(c))}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 bg-spark-300 px-6 font-display font-semibold text-ink-900 shadow-glow-spark transition hover:-translate-y-0.5 hover:bg-spark-400",
        className,
      )}
    >
      <IconBrandWhatsapp className="size-5" />
      Enroll on WhatsApp
    </a>
  );
}

function Section({ eyebrow, title, aside, children }: { eyebrow: string; title: string; aside?: string; children: ReactNode }) {
  return (
    <section>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-mist-200 pb-3">
        <h2 className="flex items-baseline gap-3 font-display text-xl font-bold text-ink-900 md:text-2xl">
          <span className="font-mono text-sm font-semibold text-spark-600">{eyebrow}</span>
          {title}
        </h2>
        {aside && <span className="font-mono text-xs text-mist-500">{aside}</span>}
      </div>
      {children}
    </section>
  );
}

/** schema.org Course — helps the page show as a course in search results. */
function CourseJsonLd({ course: c }: { course: Course }) {
  const d = courseDetails[c.slug];
  const json = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.title,
    description: c.summary,
    educationalLevel: d.level,
    teaches: d.outcomes,
    provider: {
      "@type": "EducationalOrganization",
      name: brand.name,
      telephone: contact.phone,
      address: { "@type": "PostalAddress", streetAddress: contact.address, addressLocality: "Mumbai", addressCountry: "IN" },
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: contact.address,
      ...(c.duration && !c.duration.includes("levels") ? { courseWorkload: c.duration } : {}),
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
    />
  );
}
