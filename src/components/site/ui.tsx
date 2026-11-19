// NovaNxt Lab design kit — "Sticker" style (2026-11-19).
// Warm paper background, navy 2px outlines, hard offset shadows, bold logo-colour blocks,
// chunky Bricolage Grotesque headings. Square corners everywhere, light theme only,
// motion limited to the hover "press" effect (and one marquee on the homepage).
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { IconArrowRight, IconChevronRight, IconClock, IconChartBar } from "@tabler/icons-react";
import { CourseIcon, courseHref } from "@/components/site/course-meta";
import type { Course } from "@/lib/brand";
import { courseDetails } from "@/lib/course-details";
import { cn } from "@/lib/utils";

/* ---------- layout ---------- */

export const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

const tones = {
  paper: "bg-cream",
  white: "bg-white",
  orange: "bg-spark-200",
  sky: "bg-aqua-100",
  indigo: "bg-brand-100",
} as const;
export type Tone = keyof typeof tones;

export function Section({
  tone = "paper",
  className,
  inner,
  children,
  ...rest
}: { tone?: Tone; inner?: string } & ComponentProps<"section">) {
  return (
    <section className={cn(tones[tone], "scroll-mt-20 border-b-2 border-ink-900", className)} {...rest}>
      <div className={cn(container, "py-16 md:py-24", inner)}>{children}</div>
    </section>
  );
}

/* ---------- type ---------- */

const tagTone = {
  orange: "bg-spark-300",
  sky: "bg-aqua-300",
  indigo: "bg-brand-300",
  white: "bg-white",
} as const;
export type TagTone = keyof typeof tagTone;

/** Small sticker label: outlined, tinted, optional tilt. */
export function Tag({ children, tone = "orange", tilt, className }: { children: ReactNode; tone?: TagTone; tilt?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border-2 border-ink-900 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-ink-900 shadow-hard-sm",
        tagTone[tone],
        tilt && "-rotate-2",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Highlighter-marker word inside a heading. */
export function Mark({ children, tone = "orange" }: { children: ReactNode; tone?: TagTone }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span aria-hidden className={cn("absolute inset-x-[-0.12em] bottom-[0.06em] top-[0.42em] -z-0", tagTone[tone])} />
      <span className="relative">{children}</span>
    </span>
  );
}

export const h1Class = "font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-ink-900 text-balance sm:text-6xl lg:text-7xl";
export const h2Class = "font-display text-[2.1rem] font-extrabold leading-[1.05] tracking-tight text-ink-900 text-balance sm:text-5xl";

export function SectionHeader({
  tag,
  title,
  intro,
  id,
  center,
  tone,
  action,
  className,
}: {
  tag?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  center?: boolean;
  tone?: TagTone;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6", center ? "items-center text-center" : action && "md:flex-row md:items-end md:justify-between", className)}>
      <div className={cn("max-w-3xl", center && "mx-auto")}>
        {tag && <Tag tone={tone}>{tag}</Tag>}
        <h2 id={id} className={cn(h2Class, tag && "mt-5")}>
          {title}
        </h2>
        {intro && <div className="mt-4 text-base leading-relaxed text-ink-700 md:text-lg">{intro}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ---------- buttons ---------- */

const variants = {
  primary: "bg-spark-400 text-ink-900 hover:bg-spark-300",
  secondary: "bg-white text-ink-900 hover:bg-aqua-100",
  dark: "bg-ink-900 text-white hover:bg-ink-800 shadow-[5px_5px_0_0_var(--color-spark-400)]",
} as const;
const sizes = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-14 px-7 text-base",
} as const;

export type ButtonStyle = { variant?: keyof typeof variants; size?: keyof typeof sizes; block?: boolean };

export function btn({ variant = "primary", size = "lg", block }: ButtonStyle = {}, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 border-2 border-ink-900 font-extrabold shadow-hard press focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-500",
    variants[variant],
    sizes[size],
    block && "w-full",
    className,
  );
}

/** Text link with arrow (no box). */
export const textLink = "inline-flex min-h-11 items-center gap-1.5 font-extrabold text-ink-900 underline decoration-spark-400 decoration-[3px] underline-offset-4 hover:decoration-ink-900";

/** External links (WhatsApp, maps, tel) open safely; internal ones use next/link. */
export function ButtonLink({ href, children, className, ...style }: { href: string; children: ReactNode; className?: string } & ButtonStyle) {
  const cls = btn(style, className);
  if (href.startsWith("/")) return <Link href={href} className={cls}>{children}</Link>;
  const external = href.startsWith("http");
  return (
    <a href={href} className={cls} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
      {children}
    </a>
  );
}

/* ---------- page header (inner pages) ---------- */

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm font-semibold text-ink-600">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1">
            {i > 0 && <IconChevronRight className="size-3.5" aria-hidden />}
            {it.href ? (
              <Link href={it.href} className="py-2 hover:text-ink-900 hover:underline">{it.label}</Link>
            ) : (
              <span aria-current="page" className="py-2 text-ink-900">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  crumbs,
  tag,
  title,
  intro,
  children,
  aside,
  tone = "sky",
}: {
  crumbs: { label: string; href?: string }[];
  tag?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  tone?: Tone;
}) {
  return (
    <header className={cn(tones[tone], "border-b-2 border-ink-900")}>
      <div className={cn(container, "pb-14 pt-6 md:pb-20 md:pt-8")}>
        <Breadcrumb items={crumbs} />
        <div className={cn("mt-8 grid gap-10 md:mt-10", aside && "lg:grid-cols-[1fr_24rem] lg:items-end lg:gap-16")}>
          <div className="min-w-0">
            {tag}
            <h1 className={cn("font-display text-[2.4rem] font-extrabold leading-[1.04] tracking-tight text-ink-900 text-balance sm:text-6xl", tag && "mt-5")}>
              {title}
            </h1>
            {intro && <div className="mt-5 max-w-2xl text-base leading-relaxed text-ink-700 md:text-lg">{intro}</div>}
            {children}
          </div>
          {aside}
        </div>
      </div>
    </header>
  );
}

/* ---------- course card (used on every page that lists courses) ---------- */

export const accentBlock = { spark: "bg-spark-300", brand: "bg-brand-200", ink: "bg-aqua-200" } as const;

export function CourseCard({ course: c, headingLevel = "h3" }: { course: Course; headingLevel?: "h2" | "h3" }) {
  const d = courseDetails[c.slug];
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col border-2 border-ink-900 bg-white shadow-hard press">
      <div className={cn("relative flex items-center justify-between border-b-2 border-ink-900 px-5 py-4", accentBlock[c.accent])}>
        <span className="grid size-14 place-items-center border-2 border-ink-900 bg-white">
          <CourseIcon slug={c.slug} className="size-7 text-ink-900" />
        </span>
        {d?.badge && (
          <span className="rotate-2 border-2 border-ink-900 bg-white px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-ink-900">
            {d.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-extrabold uppercase tracking-wider text-ink-500">{c.category}</p>
        <H className="mt-1 font-display text-2xl font-extrabold leading-tight text-ink-900">
          <Link href={courseHref(c.slug)} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-4 focus-visible:after:outline-brand-500">
            {c.title}
          </Link>
        </H>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-700">{c.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-5 text-xs font-bold text-ink-900">
          <li className="flex items-center gap-1.5 border border-ink-900 bg-cream px-2.5 py-1.5">
            <IconClock className="size-3.5" aria-hidden />
            {c.duration ?? "Flexible"}
          </li>
          {d && (
            <li className="flex items-center gap-1.5 border border-ink-900 bg-cream px-2.5 py-1.5">
              <IconChartBar className="size-3.5" aria-hidden />
              {d.level}
            </li>
          )}
        </ul>
      </div>
      <p className="flex items-center justify-between border-t-2 border-ink-900 px-5 py-3.5 text-sm font-extrabold text-ink-900 group-hover:bg-spark-100">
        View course
        <IconArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
      </p>
    </article>
  );
}

export function CourseGrid({ items, headingLevel }: { items: Course[]; headingLevel?: "h2" | "h3" }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((c) => (
        <li key={c.slug}>
          <CourseCard course={c} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
