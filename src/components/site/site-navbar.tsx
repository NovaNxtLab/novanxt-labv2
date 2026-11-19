"use client";

// Plain sticky header, same on every page. No scroll-morphing: logo · links · phone · one main action.
// Desktop "Courses" opens on hover/focus with pure CSS; the phone menu is a simple toggle.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconChevronDown, IconMenu2, IconPhone, IconX } from "@tabler/icons-react";
import { CourseIcon, courseHref } from "@/components/site/course-meta";
import { btn, container } from "@/components/site/ui";
import { brand, contact, courses } from "@/lib/brand";
import { cn } from "@/lib/utils";

const links = [
  { name: "How it works", href: "/#how" },
  { name: "About", href: "/#about" },
  { name: "Visit the lab", href: "/locations/kandivali-west" },
  { name: "Contact", href: "/contact" },
];
const demoHref = contact.whatsappHref("Hi NovaNxt Lab, I'd like to book a free demo class.");

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={`${brand.name} home`}>
      <Image src={brand.logos.mark} alt="" width={36} height={36} priority className="h-8 w-auto" />
      <Image src={brand.logos.wordmarkLinear} alt={brand.name} width={407} height={68} priority className="h-5 w-auto sm:h-[22px]" />
    </Link>
  );
}

function DemoButton({ className }: { className?: string }) {
  return (
    <a
      href={demoHref}
      target="_blank"
      rel="noopener noreferrer"
      className={btn({ size: "md" }, className)}
    >
      Book free demo
    </a>
  );
}

function CoursesMenu() {
  return (
    <div className="group relative">
      <Link
        href="/courses"
        className="flex h-[4.5rem] items-center gap-1 px-3 text-sm font-extrabold text-ink-900 decoration-spark-400 decoration-[3px] underline-offset-8 hover:underline"
        aria-haspopup="true"
      >
        Courses
        <IconChevronDown className="size-4 text-mist-500 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden />
      </Link>
      <div className="invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 border-2 border-ink-900 bg-white p-2 opacity-0 shadow-hard-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="grid grid-cols-2">
          {courses.map((c) => (
            <li key={c.slug}>
              <Link
                href={courseHref(c.slug)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-ink-900 hover:bg-spark-200"
              >
                <CourseIcon slug={c.slug} className="size-5 shrink-0" />
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/courses" className="mt-1 block border-t-2 border-ink-900 px-3 pb-1 pt-3 text-sm font-extrabold text-ink-900 hover:underline">
          Compare all {courses.length} courses →
        </Link>
      </div>
    </div>
  );
}

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // While the phone menu is open: lock page scroll behind it, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    // Solid cream to match the page, with a thin 1px rule underneath.
    <header className="sticky top-0 z-50 border-b border-ink-900 bg-cream">
      <div className={cn(container, "flex h-[4.5rem] items-center justify-between gap-4")}>
        <Logo />

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <CoursesMenu />
          {links.map((l) => (
            <a key={l.name} href={l.href} className="px-3 py-2 text-sm font-extrabold text-ink-900 decoration-spark-400 decoration-[3px] underline-offset-8 hover:underline">
              {l.name}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={contact.phoneHref} className="flex items-center gap-1.5 text-sm font-extrabold text-ink-900 hover:underline">
            <IconPhone className="size-4" aria-hidden />
            {contact.phone}
          </a>
          <DemoButton />
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid size-11 place-items-center border-2 border-ink-900 bg-white text-ink-900 lg:hidden"
        >
          {open ? <IconX className="size-6" /> : <IconMenu2 className="size-6" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[4.5rem] flex flex-col bg-cream lg:hidden">
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <p className="font-display text-2xl font-extrabold text-ink-900">Courses</p>
            <ul className="mt-3 divide-y-2 divide-ink-900 border-2 border-ink-900 bg-white">
              {courses.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={courseHref(c.slug)}
                    onClick={close}
                    className="flex min-h-12 items-center gap-3 px-3 text-[15px] font-bold text-ink-900 active:bg-spark-200"
                  >
                    <CourseIcon slug={c.slug} className="size-5 shrink-0" />
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-5 grid grid-cols-1 gap-2">
              {links.map((l) => (
                <li key={l.name}>
                  <a href={l.href} onClick={close} className="flex min-h-12 items-center border-2 border-ink-900 bg-white px-3 text-[15px] font-extrabold text-ink-900">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid grid-cols-[auto_1fr] gap-3 border-t-2 border-ink-900 bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <a href={contact.phoneHref} aria-label={`Call ${contact.phone}`} className="grid size-12 place-items-center border-2 border-ink-900 bg-white text-ink-900">
              <IconPhone className="size-5" />
            </a>
            <DemoButton className="min-h-12 text-base" />
          </div>
        </div>
      )}
    </header>
  );
}
