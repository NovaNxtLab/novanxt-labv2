"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { courses, type CourseCategory } from "@/lib/brand";

/* ---------- Magnetic CTA (Motion) ---------- */
export function MagneticButton({ children, variant = "brand" }: { children: ReactNode; variant?: "brand" | "ghost" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15 });
  const sy = useSpring(y, { stiffness: 250, damping: 15 });
  return (
    <motion.button
      type="button"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.95 }}
      className={
        variant === "brand"
          ? "bg-brand-500 px-7 py-3.5 font-display font-semibold text-white shadow-glow-brand transition-colors hover:bg-brand-600"
          : "border border-current px-7 py-3.5 font-display font-semibold"
      }
    >
      {children}
    </motion.button>
  );
}

/* ---------- 3D tilt course card (Motion) ---------- */
export function TiltCard({ title, tag, body, accent }: { title: string; tag: string; body: string; accent: "brand" | "spark" | "ink" }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useTransform(my, [0, 1], [10, -10]);
  const rotY = useTransform(mx, [0, 1], [-10, 10]);
  const glow = useTransform(
    [mx, my],
    ([gx, gy]: number[]) => `radial-gradient(240px circle at ${gx * 100}% ${gy * 100}%, rgb(124 58 237 / 0.12), transparent 70%)`,
  );
  const bar = { brand: "bg-brand-500", spark: "bg-spark-500", ink: "bg-ink-500" }[accent];
  return (
    <motion.article
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className="group relative overflow-hidden border border-line bg-surface p-6 shadow-soft"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div className={`mb-5 h-1.5 w-12 ${bar}`} />
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{tag}</p>
      <h4 className="mt-2 font-display text-xl font-bold">{title}</h4>
      <p className="mt-3 text-sm text-muted">{body}</p>
      <p className="mt-6 font-display text-sm font-semibold text-brand-600">View course →</p>
    </motion.article>
  );
}

/* ---------- Category filter with layout animation (Motion) ---------- */
const cats: ("All" | CourseCategory)[] = ["All", "AI & Data", "Programming", "Office & Accounts", "Creative", "Kids"];

export function CourseFilterDemo() {
  const [active, setActive] = useState<(typeof cats)[number]>("All");
  const list = courses.filter((c) => active === "All" || c.category === active);
  return (
    <LayoutGroup>
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className="relative px-4 py-2 text-sm font-medium"
          >
            {active === c && (
              <motion.span layoutId="pill" className="absolute inset-0 bg-ink-800" transition={{ type: "spring", bounce: 0.25 }} />
            )}
            <span className={`relative ${active === c ? "text-white" : "text-muted"}`}>{c}</span>
          </button>
        ))}
      </div>
      <motion.ul layout className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((c) => (
            <motion.li
              layout
              key={c.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              className="border border-line bg-surface p-4"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{c.category}</p>
              <p className="mt-1 font-display font-semibold">{c.title}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}

/* ---------- FAQ accordion (Motion) ---------- */
export function AccordionDemo({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border border-line bg-surface">
      {items.map((it, i) => (
        <div key={it.q}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold"
            aria-expanded={open === i}
          >
            {it.q}
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-2xl leading-none text-brand-500">
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-sm text-muted">{it.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ---------- Count-up stats (GSAP ScrollTrigger) ---------- */
export function CounterDemo({ stats }: { stats: { value: number; suffix: string; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nums = el.querySelectorAll<HTMLElement>("[data-count]");
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      nums.forEach((n) => {
        const target = Number(n.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            n.textContent = Math.round(obj.v).toString();
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className="grid grid-cols-2 gap-px overflow-hidden bg-line md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-ink-950 p-6">
          <p className="font-display text-4xl font-extrabold text-white md:text-5xl">
            <span data-count={s.value}>{s.value}</span>
            <span className="text-brand-500">{s.suffix}</span>
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-mist-300">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- Tool marquee (CSS loop) ---------- */
export function MarqueeDemo({ items }: { items: string[] }) {
  return (
    <div className="group relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="border border-line bg-surface px-5 py-2 font-mono text-sm whitespace-nowrap">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Learn → Build → Get Hired path draw (GSAP scrub) ---------- */
export function JourneyDemo() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const path = el.querySelector<SVGPathElement>("path[data-draw]")!;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 40%", scrub: 0.6 } });
      tl.to(path, { strokeDashoffset: 0, ease: "none" }).from(
        "[data-step]",
        { scale: 0.4, autoAlpha: 0, stagger: 0.3, ease: "back.out(2)" },
        0,
      );
    }, el);
    return () => ctx.revert();
  }, []);
  const steps = [
    { t: "Learn", d: "Concepts with AI-assisted, 90% practical labs", c: "bg-spark-500" },
    { t: "Build", d: "Real projects & capstones for your portfolio", c: "bg-ink-500" },
    { t: "Get Hired", d: "Interview prep, resume & placement support", c: "bg-brand-500" },
  ];
  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 1000 120" className="absolute inset-x-0 top-6 hidden h-24 w-full md:block" preserveAspectRatio="none" aria-hidden>
        <path
          data-draw
          d="M80 60 C 280 -10, 380 130, 500 60 S 760 -10, 920 60"
          fill="none"
          stroke="url(#jg)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="jg" x1="0" x2="1">
            <stop offset="0" stopColor="#a3e635" />
            <stop offset="0.5" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
      </svg>
      <ol className="relative grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.t} data-step className="flex flex-col items-center text-center">
            <span className={`grid size-16 place-items-center font-display text-xl font-extrabold text-white ring-8 ring-ink-950 ${s.c}`}>
              0{i + 1}
            </span>
            <p className="mt-4 font-display text-2xl font-bold text-white">{s.t}</p>
            <p className="mt-2 max-w-60 text-sm text-mist-300">{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Typing terminal (GSAP) ---------- */
export function TerminalDemo() {
  const ref = useRef<HTMLPreElement>(null);
  const lines = [
    "$ novanxt enroll --track ai-ml",
    "✓ Python + Data Handling",
    "✓ Machine Learning · Computer Vision",
    "✓ Agentic AI + Automation",
    "→ Capstone: AI Personal Assistant",
    "status: job-ready 🚀",
  ];
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rows = el.querySelectorAll<HTMLElement>("[data-line]");
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2, scrollTrigger: { trigger: el, start: "top 85%" } });
      rows.forEach((r) => {
        const full = r.dataset.line!;
        const o = { n: 0 };
        tl.set(r, { textContent: "" }, 0).to(o, {
          n: full.length,
          duration: full.length * 0.035,
          ease: "none",
          onUpdate: () => {
            r.textContent = full.slice(0, Math.round(o.n));
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div className="overflow-hidden border border-white/10 bg-ink-950 shadow-lift">
      <div className="flex gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="size-3 bg-danger" />
        <span className="size-3 bg-warning" />
        <span className="size-3 bg-success" />
      </div>
      <pre ref={ref} className="min-h-52 p-5 font-mono text-sm leading-7 text-mist-200">
        {lines.map((l, i) => (
          <div key={i} data-line={l} className={i === 0 ? "text-spark-300" : i === lines.length - 1 ? "text-brand-400" : ""}>
            {l}
          </div>
        ))}
      </pre>
    </div>
  );
}
