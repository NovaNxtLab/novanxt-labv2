// /courses/[slug] — full course details. Server component: everything is in the static HTML (SEO + no-JS).
import type { ReactNode } from "react";
import {
  IconBrandWhatsapp,
  IconCertificate,
  IconChartBar,
  IconCircleCheckFilled,
  IconClock,
  IconDeviceLaptop,
  IconFileText,
  IconListNumbers,
  IconMapPin,
  IconPhone,
  IconRocket,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { BrochureButton } from "@/components/site/brochure-dialog";
import { CourseIcon, demoText, enrollText, includes } from "@/components/site/course-meta";
import { CtaBand } from "@/components/site/home-sections";
import { courseLd, ldHtml } from "@/lib/seo";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { CourseGrid, Tag, PageHeader, Section, SectionHeader, btn } from "@/components/site/ui";
import { contact, courses, reach, type Course } from "@/lib/brand";
import { courseDetails } from "@/lib/course-details";
import { cn } from "@/lib/utils";

const iconTile = { spark: "bg-spark-300", brand: "bg-brand-200", ink: "bg-aqua-200" } as const;

export function CourseDetail({ course: c }: { course: Course }) {
  const d = courseDetails[c.slug];
  const isKids = c.category === "Kids";

  const facts = [
    { k: "Duration", v: c.duration ?? "Flexible batches", icon: IconClock },
    { k: "Level", v: d.level, icon: IconChartBar },
    { k: isKids ? "Levels" : "Modules", v: String(c.modules.length), icon: IconListNumbers },
    { k: "Mode", v: reach.online.live ? "Classroom + online" : "Classroom", icon: IconDeviceLaptop },
  ];

  const related = [
    ...courses.filter((o) => o.slug !== c.slug && o.category === c.category),
    ...courses.filter((o) => o.slug !== c.slug && o.category !== c.category),
  ].slice(0, 3);

  return (
    <>
      <CourseJsonLd course={c} />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Courses", href: "/courses" }, { label: c.title }]}
        tag={
          <div className="flex flex-wrap items-center gap-3">
            <span className={cn("grid size-12 place-items-center border-2 border-ink-900 text-ink-900", iconTile[c.accent])}>
              <CourseIcon slug={c.slug} className="size-6" />
            </span>
            <Tag tone="white">{c.category}</Tag>
            {d.badge && <Tag tone="orange" tilt>{d.badge}</Tag>}
          </div>
        }
        title={c.title}
        intro={
          <>
            <p className="font-bold text-ink-800">{c.tagline}</p>
            <p className="mt-2">{c.summary}</p>
          </>
        }
        aside={
          <dl className="grid grid-cols-2 border-2 border-ink-900 bg-white shadow-hard-lg">
            {facts.map(({ k, v, icon: I }, i) => (
              <div key={k} className={cn("p-5", i % 2 === 0 && "border-r-2 border-ink-900", i < 2 && "border-b-2 border-ink-900")}>
                <dt className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-ink-500">
                  <I className="size-4" aria-hidden />
                  {k}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-extrabold leading-tight text-ink-900">{v}</dd>
              </div>
            ))}
          </dl>
        }
      >
        <p className="mt-6 flex items-start gap-2 text-sm text-ink-700">
          <IconMapPin className="mt-0.5 size-4 shrink-0 text-spark-700" aria-hidden />
          <span>
            Classroom batches at our{" "}
            <Link href={`/locations/${reach.lab.slug}`} className="font-extrabold text-ink-900 underline decoration-spark-400 decoration-[3px] underline-offset-4 hover:decoration-ink-900">
              {reach.lab.area} lab
            </Link>{" "}
            — near {reach.nearby.slice(0, 3).join(", ")}
          </span>
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a href={contact.whatsappHref(demoText(c))} target="_blank" rel="noopener noreferrer" className={btn()}>
            <IconBrandWhatsapp className="size-5" aria-hidden />
            Book a free demo class
          </a>
          <BrochureButton course={c} className={btn({ variant: "secondary" })}>
            <IconFileText className="size-5" aria-hidden />
            Get fees &amp; syllabus
          </BrochureButton>
        </div>
      </PageHeader>

      {/* ---------- Body ---------- */}
      <Section inner="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
        <div className="min-w-0 space-y-14">
          <Block title="Who this course is for" icon={IconUser}>
            <ul className="grid gap-3 sm:grid-cols-3">
              {d.idealFor.map((t) => (
                <li key={t} className="border-2 border-ink-900 bg-aqua-100 p-4 text-sm font-extrabold text-ink-900">{t}</li>
              ))}
            </ul>
          </Block>

          <Block title="What you'll be able to do" icon={IconCircleCheckFilled}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {d.outcomes.map((o) => (
                <li key={o} className="flex gap-3 leading-relaxed text-ink-800">
                  <IconCircleCheckFilled className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </Block>

          <Block
            title={isKids ? "The levels" : "Syllabus"}
            icon={IconListNumbers}
            aside={`${c.modules.length} ${isKids ? "levels" : "modules"}${c.duration && !isKids ? ` · ${c.duration}` : ""}`}
          >
            <ol className="grid border-l-2 border-t-2 border-ink-900 bg-white shadow-hard sm:grid-cols-2">
              {c.modules.map((m, i) => (
                <li key={m} className="flex items-center gap-4 border-b-2 border-r-2 border-ink-900 px-4 py-4">
                  <span className="grid size-9 shrink-0 place-items-center border-2 border-ink-900 bg-brand-200 font-display font-extrabold text-ink-900">{i + 1}</span>
                  <span className="font-bold text-ink-900">{m.replace(/^L\d · /, "")}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block title="Projects you'll build" icon={IconRocket}>
            <ul className="grid gap-3 sm:grid-cols-3">
              {d.projects.map((p) => (
                <li key={p} className="flex flex-col gap-3 border-2 border-ink-900 bg-spark-200 p-4 shadow-hard-sm">
                  <IconRocket className="size-6 text-ink-900" aria-hidden />
                  <span className="font-display text-base font-bold leading-snug text-ink-900">{p}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Tools you'll use" icon={IconDeviceLaptop}>
            <ul className="flex flex-wrap gap-2">
              {d.tools.map((t) => (
                <li key={t} className="border-2 border-ink-900 bg-white px-3 py-2 text-sm font-bold text-ink-900">{t}</li>
              ))}
            </ul>
          </Block>

          <Block title={isKids ? "What your child gains" : "Roles this prepares you for"} icon={IconChartBar}>
            <ul className="flex flex-wrap gap-2">
              {d.careers.map((t) => (
                <li key={t} className="border-2 border-ink-900 bg-brand-100 px-3 py-2 text-sm font-bold text-ink-900">{t}</li>
              ))}
            </ul>
          </Block>

          <Block title="Certificate" icon={IconCertificate}>
            <p className="flex items-start gap-3 border-2 border-ink-900 bg-white p-5 font-semibold text-ink-900 shadow-hard-sm">
              <IconCertificate className="mt-0.5 size-6 shrink-0 text-spark-700" aria-hidden />
              {d.certificate} on successful completion of the course and projects.
            </p>
          </Block>
        </div>

        {/* ---------- Sticky enrol panel (desktop) ---------- */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 border-2 border-ink-900 bg-white shadow-hard-lg">
            <div className="border-b-2 border-ink-900 bg-spark-300 p-6">
              <p className="font-display text-2xl font-extrabold text-ink-900">Join the next batch</p>
              <p className="mt-1 text-sm text-ink-800">Ask us for fees, timings and weekday / weekend options.</p>
            </div>
            <ul className="space-y-3 p-6">
              {includes.map(({ icon: I, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm font-semibold text-ink-800">
                  <I className="size-5 shrink-0 text-spark-700" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t-2 border-ink-900 p-6">
              <a href={contact.whatsappHref(enrollText(c))} target="_blank" rel="noopener noreferrer" className={btn({ block: true })}>
                <IconBrandWhatsapp className="size-5" aria-hidden />
                Enquire on WhatsApp
              </a>
              <BrochureButton course={c} className={btn({ variant: "secondary", block: true })}>
                <IconFileText className="size-5" aria-hidden />
                Get the brochure
              </BrochureButton>
              <a href={contact.phoneHref} className="flex min-h-11 w-full items-center justify-center gap-2 font-extrabold text-ink-900 hover:underline">
                <IconPhone className="size-5" aria-hidden />
                {contact.phone}
              </a>
            </div>
          </div>
        </aside>
      </Section>

      {/* ---------- Related ---------- */}
      <Section tone="sky" aria-labelledby="related">
        <SectionHeader id="related" tag="Keep exploring" title="Other courses you might like" />
        <div className="mt-10">
          <CourseGrid items={related} />
        </div>
      </Section>

      <CtaBand
        title={`Want to see what ${c.title} is like?`}
        text="Book a free demo class at our lab, or get the brochure with fees and the full syllabus."
      />

      <MobileActionBar course={c} whatsappText={enrollText(c)} label="Enquire on WhatsApp" />
    </>
  );
}

function Block({ title, icon: I, aside, children }: { title: string; icon: typeof IconUser; aside?: string; children: ReactNode }) {
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <h2 className="flex items-center gap-3 font-display text-3xl font-extrabold tracking-tight text-ink-900">
          <span className="grid size-10 shrink-0 place-items-center border-2 border-ink-900 bg-spark-300 text-ink-900">
            <I className="size-5" aria-hidden />
          </span>
          {title}
        </h2>
        {aside && <span className="text-sm font-bold text-ink-600">{aside}</span>}
      </div>
      {children}
    </section>
  );
}

/** schema.org Course — helps the page show as a course in search results. */
function CourseJsonLd({ course: c }: { course: Course }) {
  const d = courseDetails[c.slug];
  return <script type="application/ld+json" dangerouslySetInnerHTML={ldHtml(courseLd(c, d.level, d.outcomes))} />;
}
