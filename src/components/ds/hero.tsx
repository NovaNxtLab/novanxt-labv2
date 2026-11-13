"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { brand } from "@/lib/brand";

const chips = [
  { label: "Python", cls: "left-[6%] top-[22%]", tone: "spark" },
  { label: "AI & ML", cls: "right-[8%] top-[18%]", tone: "brand" },
  { label: "Excel + AI", cls: "left-[10%] bottom-[18%]", tone: "brand" },
  { label: "Full Stack", cls: "right-[12%] bottom-[22%]", tone: "spark" },
  { label: "Tally GST", cls: "left-[42%] top-[8%]", tone: "ink" },
] as const;

const toneCls = {
  spark: "border-spark-400/40 text-spark-200",
  brand: "border-brand-400/40 text-brand-200",
  ink: "border-white/20 text-white/80",
};

export function DsHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const split = SplitText.create("[data-split]", { type: "chars,words", mask: "chars" });
      const tl = gsap.timeline();
      tl.from("[data-logo]", { scale: 0.6, autoAlpha: 0, rotate: -12, duration: 1.1 })
        .from(split.chars, { yPercent: 110, stagger: 0.025, duration: 1 }, "-=0.6")
        .from("[data-sub]", { y: 20, autoAlpha: 0, stagger: 0.1 }, "-=0.6")
        .from("[data-chip]", { scale: 0, autoAlpha: 0, stagger: 0.08, ease: "back.out(2)" }, "-=0.5");

      // Gentle parallax on chips following the pointer
      const move = (e: PointerEvent) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        gsap.to("[data-chip]", { x: x * 30, y: y * 30, duration: 1.2, ease: "power3.out", stagger: 0.02 });
      };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <header ref={root} className="theme-midnight relative overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-ink-500/40 blur-[120px]" />
      <div className="absolute -bottom-40 right-0 h-[360px] w-[520px] rounded-full bg-brand-500/20 blur-[120px]" />

      {chips.map((c) => (
        <span
          key={c.label}
          data-chip
          className={`absolute hidden rounded-chip border bg-white/5 px-4 py-1.5 font-mono text-xs backdrop-blur md:block ${c.cls} ${toneCls[c.tone]}`}
        >
          {c.label}
        </span>
      ))}

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-28 pt-24 text-center sm:px-6 md:pt-32">
        <div data-logo className="mb-8 rounded-[1.75rem] bg-white p-3 shadow-glow-spark">
          <Image src={brand.logos.mark} alt="NovaNxt Lab monogram" width={72} height={72} priority />
        </div>
        <p data-sub className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-spark-300">
          Design System · v1.0 · Nov 2026
        </p>
        <h1
          data-split
          className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
        >
          Learn. Build. <span className="text-brand-500">Get Hired.</span>
        </h1>
        <p data-sub className="mt-8 max-w-2xl text-lg text-muted">
          The visual language, motion rules and frontend blueprint for the new{" "}
          <strong className="text-white">{brand.name}</strong> website — built to turn tech-curious visitors into
          enrolled learners.
        </p>
        <nav data-sub className="mt-10 flex flex-wrap justify-center gap-2 font-mono text-xs">
          {["discovery", "color", "type", "components", "motion", "pages", "landing", "seo", "architecture"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-chip border border-line px-3 py-1.5 text-muted transition hover:border-brand-500 hover:text-white"
            >
              #{id}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
