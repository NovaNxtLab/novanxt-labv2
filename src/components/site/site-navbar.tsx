"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { IconBrain, IconMoodKid, IconPhone } from "@tabler/icons-react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar } from "@/components/ui/resizable-navbar";
import { brand, contact, courses, type CourseCategory } from "@/lib/brand";
import { cn } from "@/lib/utils";

const courseColumns: CourseCategory[][] = [["AI & Data", "Programming"], ["Office & Accounts"], ["Creative", "Kids"]];
const courseHref = (slug: string) => `/courses/${slug}`;
const demoHref = contact.whatsappHref("Hi NovaNxt Lab, I'd like to book a free demo class.");

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={`${brand.name} home`}>
      <Image src={brand.logos.mark} alt="" width={36} height={36} priority className="h-9 w-auto" />
      <Image
        src={brand.logos.wordmarkLinear}
        alt={brand.name}
        width={407}
        height={68}
        priority
        className="h-[22px] w-auto sm:h-6"
      />
    </Link>
  );
}

function DemoButton({ className }: { className?: string }) {
  return (
    <a
      href={demoHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "rounded-cut bg-spark-300 px-5 py-2.5 text-center font-display text-sm font-semibold text-ink-900 shadow-glow-spark transition hover:-translate-y-0.5 hover:bg-spark-400",
        className,
      )}
    >
      Book free demo
    </a>
  );
}

/**
 * True once the page has scrolled past the #hero section (minus the navbar's own height).
 * The hero's end is re-measured whenever it resizes (fonts, viewport, content).
 */
function useCompactAfterHero(fallback = 100) {
  const { scrollY } = useScroll();
  const heroEnd = useRef(fallback);
  const [compact, setCompact] = useState(false);
  const update = useCallback(() => setCompact(scrollY.get() > heroEnd.current), [scrollY]);

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const ro = new ResizeObserver(() => {
      heroEnd.current = Math.max(fallback, hero.offsetTop + hero.offsetHeight - 96);
      update();
    });
    ro.observe(hero); // fires once immediately
    return () => ro.disconnect();
  }, [fallback, update]);

  return compact;
}

/** True once the page has scrolled at all (a few px), so content starts passing under the navbar. */
function useScrolledAtAll(threshold = 8) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > threshold));
  return scrolled;
}

/**
 * Full-width frosted band behind the expanded navbar while scrolling *through* the hero,
 * so hero content passing underneath doesn't collide with the nav. Hidden at the very top
 * (clean hero) and after the hero (the compact pill has its own background).
 */
function NavBackdrop() {
  const scrolled = useScrolledAtAll();
  const compact = useCompactAfterHero();
  const show = scrolled && !compact;
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[35] h-[5.5rem] bg-mist-50/75 backdrop-blur-md transition-opacity duration-300 [mask-image:linear-gradient(to_bottom,black_72%,transparent)] lg:h-24",
        show ? "opacity-100" : "opacity-0",
      )}
    />
  );
}

// Matches the hero container: max-w-7xl (1280px) with lg:px-8 (32px) gutters.
const EXPANDED = { maxWidth: 1280, paddingLeft: 32, paddingRight: 32, y: 0 };
const COMPACT = { maxWidth: 920, paddingLeft: 20, paddingRight: 8, y: 4 };

function DesktopNav() {
  const [active, setActive] = useState<string | null>(null);
  const scrolled = useCompactAfterHero();

  return (
    <div className="fixed inset-x-0 top-4 z-50 hidden justify-center lg:flex">
      <motion.div
        initial={false}
        animate={scrolled ? COMPACT : EXPANDED}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className={cn(
          "flex w-full items-center justify-between gap-6 rounded-full border py-2 transition-[background-color,box-shadow,border-color] duration-300",
          scrolled ? "border-mist-200 bg-mist-50/85 shadow-lift backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <Logo />

        <Menu setActive={setActive} className="gap-1">
          <MenuItem setActive={setActive} active={active} item="Courses">
            <div className="grid grid-cols-3 gap-8 p-2 text-sm">
              {courseColumns.map((cats) => (
                <div key={cats.join()} className="flex flex-col gap-4">
                  {cats.map((cat) => (
                    <div key={cat}>
                      <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-brand-500">{cat}</p>
                      <ul className="flex flex-col gap-2">
                        {courses
                          .filter((c) => c.category === cat)
                          .map((c) => (
                            <li key={c.slug}>
                              <HoveredLink href={courseHref(c.slug)} className="font-medium">
                                {c.title}
                              </HoveredLink>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <a href="/courses" className="mt-4 block border-t border-mist-100 px-2 pt-3 text-sm font-semibold text-brand-600 hover:text-brand-800">
              View all {courses.length} courses →
            </a>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Programs">
            <div className="grid grid-cols-2 gap-4">
              <ProductItem
                title="AI + ML + GenAI"
                href={courseHref("ai-ml-course-in-kandivali")}
                description="12-week flagship. Build real AI systems, agents & robotics."
                visual={
                  <span className="grid size-16 place-items-center rounded-xl bg-ink-gradient text-brand-700">
                    <IconBrain className="size-8" />
                  </span>
                }
              />
              <ProductItem
                title="Kids Coding + AI"
                href={courseHref("kids-computer-course-in-kandivali")}
                description="Ages 5–10. Six levels from Digital Hero to Creator Studio."
                visual={
                  <span className="grid size-16 place-items-center rounded-xl bg-brand-gradient text-spark-800">
                    <IconMoodKid className="size-8" />
                  </span>
                }
              />
            </div>
          </MenuItem>

          {[
            { name: "About", href: "#about" },
            { name: "Contact", href: "#contact" },
          ].map((l) => (
            <a
              key={l.name}
              href={l.href}
              onMouseEnter={() => setActive(null)}
              className="rounded-full px-3 py-2 text-sm font-medium text-mist-700 transition-colors hover:text-ink-800"
            >
              {l.name}
            </a>
          ))}
        </Menu>

        <div className="flex items-center gap-2">
          <a href={contact.phoneHref} className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-ink-800 hover:text-brand-600">
            <IconPhone className="size-4" />
            <span className={cn(scrolled && "sr-only")}>{contact.phone}</span>
          </a>
          <DemoButton />
        </div>
      </motion.div>
    </div>
  );
}

const mobileCategories: CourseCategory[] = ["AI & Data", "Programming", "Office & Accounts", "Creative", "Kids"];

function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const compact = useCompactAfterHero();

  // While the menu is open: lock page scroll behind it, close on Escape.
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
    <Navbar className="fixed top-3 lg:hidden" visible={compact}>
      <MobileNav>
        <MobileNavHeader className="px-0 sm:px-2">
          <Logo />
          <MobileNavToggle isOpen={open} onClick={() => setOpen(!open)} />
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={open}
          onClose={close}
          className="max-h-[calc(100svh-6rem)] gap-0 overflow-hidden bg-mist-50 p-0"
        >
          {/* scrollable link area */}
          <nav aria-label="Mobile" className="w-full flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-5">
            <div className="mb-4 flex gap-2">
              {["About", "Contact"].map((n) => (
                <a
                  key={n}
                  href={`#${n.toLowerCase()}`}
                  onClick={close}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-full border border-mist-200 bg-white text-sm font-semibold text-ink-800"
                >
                  {n}
                </a>
              ))}
            </div>
            {mobileCategories.map((cat) => (
              <div key={cat} className="border-t border-mist-200 py-2">
                <p className="pt-2 font-mono text-[11px] uppercase tracking-widest text-brand-500">{cat}</p>
                <ul>
                  {courses
                    .filter((c) => c.category === cat)
                    .map((c) => (
                      <li key={c.slug}>
                        <a
                          href={courseHref(c.slug)}
                          onClick={close}
                          className="flex min-h-11 items-center justify-between gap-3 text-[15px] font-medium text-ink-800 active:text-brand-700"
                        >
                          {c.title}
                          <span aria-hidden className="text-mist-400">→</span>
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* always-visible actions */}
          <div className="grid w-full grid-cols-[auto_1fr] gap-2 border-t border-mist-200 bg-white px-4 py-3">
            <a
              href={contact.phoneHref}
              aria-label={`Call ${contact.phone}`}
              className="grid size-12 place-items-center rounded-cut border border-mist-200 text-brand-600"
            >
              <IconPhone className="size-5" />
            </a>
            <DemoButton className="flex min-h-12 items-center justify-center text-base" />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

export function SiteNavbar() {
  return (
    <header>
      <NavBackdrop />
      <DesktopNav />
      <MobileNavbar />
    </header>
  );
}
