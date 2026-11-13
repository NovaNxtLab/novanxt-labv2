"use client";

import { IconArrowRight, IconBrandWhatsapp, IconCircleCheckFilled, IconClock } from "@tabler/icons-react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CardStack } from "@/components/ui/card-stack";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { brand, contact, courses } from "@/lib/brand";

const careers = ["Python Developer", "AI Engineer", "Data Analyst", "Web Developer", "Tally Accountant", "Video Editor"];
const proof = ["90% practical", "AI in every course", "Real projects", "Free demo class"];

// Tools named on the institute's course pages
const tools = [
  "Python", "TensorFlow", "OpenCV", "Generative AI", "Excel", "Pivot Tables", "Macros", "Tally Prime",
  "GST Portal", "TRACES", "HTML", "CSS", "JavaScript", "Java", "Tkinter", "Canva",
];

const featured = [
  "ai-ml-course-in-kandivali",
  "python-with-ai-course-in-kandivali",
  "full-stack-web-development-course-in-kandivali",
  "advanced-excel-with-ai-course-in-kandivali",
  "tally-gst-course-in-kandivali",
]
  .map((slug) => courses.find((c) => c.slug === slug)!)
  .filter(Boolean);

// Entrance animation is pure CSS (`animate-rise` in globals.css) so content paints from the
// server HTML without waiting for JS hydration — important for LCP on slow mobile networks.
const delay = (s: number) => ({ animationDelay: `${s}s` });

const stackCards = featured.map((c, i) => ({
  id: c.slug,
  content: (
    <a href={`/courses/${c.slug}`} className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-aqua-50 px-3 py-1 text-xs font-semibold text-aqua-800">{c.category}</span>
        <span className="font-mono text-xs text-mist-500">0{i + 1} / 0{featured.length}</span>
      </div>
      <p className="mt-5 font-display text-2xl font-bold leading-tight text-ink-900">{c.title}</p>
      <p className="mt-2 line-clamp-2 text-sm text-mist-600">{c.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {c.modules.slice(0, 3).map((m) => (
          <li key={m} className="rounded-md border border-mist-200 bg-mist-50 px-2 py-1 text-[11px] font-medium text-mist-600">
            {m}
          </li>
        ))}
        {c.modules.length > 3 && (
          <li className="px-1 py-1 text-[11px] font-medium text-mist-500">+{c.modules.length - 3} more</li>
        )}
      </ul>
      <div className="mt-auto flex items-center justify-between border-t border-mist-100 pt-4 text-sm">
        <span className="flex items-center gap-1.5 text-mist-500">
          <IconClock className="size-4" />
          {c.duration ?? "Flexible batches"}
        </span>
        <span className="font-semibold text-brand-600">View syllabus →</span>
      </div>
    </a>
  ),
}));

export function Hero() {
  return (
    <BackgroundBeamsWithCollision className="h-auto min-h-[100svh] flex-col items-stretch from-white via-aqua-50/60 to-spark-50 md:h-auto">
      <div className="relative z-20 mx-auto grid w-full max-w-7xl items-center gap-14 px-4 pb-10 pt-24 sm:px-6 md:pt-28 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10 lg:px-8 lg:pt-28">
        {/* ---------- Copy ---------- */}
        <div className="flex flex-col items-start text-left">
          <p style={delay(0.05)} className="animate-rise flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-brand-500">
            <span className="h-px w-10 bg-spark-300" />
            {brand.tagline}
          </p>

          {/* LCP element: no entrance fade so it paints immediately */}
          <h1 className="mt-4 font-display text-[clamp(2.2rem,10.5vw,2.6rem)] font-extrabold leading-[1.04] tracking-tight text-ink-900 sm:text-6xl lg:text-[3.6rem] xl:text-[4.1rem]">
            <span className="block text-balance">Don&apos;t just learn tech.</span>
            <span className="mt-1 flex flex-wrap items-baseline gap-x-[0.25em]">
              <span>Get</span>
              <PointerHighlight
                containerClassName="inline-block"
                rectangleClassName="border-0 border-b-[10px] border-spark-200 rounded-none"
                pointerClassName="size-6 text-aqua-400 md:size-7"
              >
                <span className="relative z-10 font-serif text-[1.18em] font-normal italic tracking-normal text-brand-600">hired</span>
              </PointerHighlight>
              <span>for it.</span>
            </span>
          </h1>

          <div
            style={delay(0.2)}
            className="animate-rise mt-6 flex flex-col items-start font-display text-xl font-semibold text-ink-700 sm:mt-7 sm:flex-row sm:items-center md:text-2xl"
          >
            <span>Start your career as a</span>
            {/* own line on phones; fixed height so nothing below jumps while words swap */}
            <span className="relative inline-block min-h-[1.5em] sm:min-w-[11ch] sm:pl-2">
              <FlipWords words={careers} className="px-0 font-bold text-aqua-700" />
            </span>
          </div>

          <TextGenerateEffect
            delay={0.5}
            className="mt-4 max-w-xl text-base leading-relaxed text-mist-600 md:text-lg"
            words="Practical, AI-powered computer courses — 90% hands-on, built around real projects, taught at our Kandivali West lab."
          />

          <div style={delay(0.3)} className="animate-rise mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center">
            <a
              href={contact.whatsappHref("Hi NovaNxt Lab, I'd like to book a free demo class.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-cut bg-spark-300 px-8 py-4 font-display font-semibold text-ink-900 shadow-glow-spark transition hover:-translate-y-0.5 hover:bg-spark-400"
            >
              Book a free demo class
              <IconArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={contact.whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-cut border border-mist-200 bg-white px-8 py-4 font-display font-semibold text-ink-800 shadow-soft transition hover:-translate-y-0.5 hover:border-whatsapp"
            >
              <IconBrandWhatsapp className="size-5 text-whatsapp" />
              Chat on WhatsApp
            </a>
          </div>

          <ul style={delay(0.4)} className="animate-rise mt-7 grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-medium text-mist-600 sm:flex sm:flex-wrap">
            {proof.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <IconCircleCheckFilled className="size-4 text-aqua-400" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Course stack ---------- */}
        <div style={delay(0.35)} className="animate-rise relative mx-auto w-full max-w-[26rem] pt-10 lg:mr-0 lg:pt-12">
          <div aria-hidden className="absolute right-0 top-0 hidden size-72 rotate-6 rounded-tr-[3rem] rounded-bl-[3rem] bg-aqua-200 lg:block xl:-right-6" />
          <div aria-hidden className="absolute right-3 top-6 hidden size-72 rotate-6 rounded-tr-[3rem] rounded-bl-[3rem] border-2 border-dashed border-spark-300 lg:block xl:-right-2" />
          <p className="relative mb-12 font-mono text-xs uppercase tracking-[0.25em] text-mist-500 lg:mb-14 lg:pr-6 lg:text-right lg:text-ink-700">
            Popular tracks
          </p>
          <CardStack
            items={stackCards}
            className="h-[18.5rem] w-full md:h-[19rem] md:w-full lg:h-[23rem] xl:h-[20rem]"
            cardClassName="rounded-none rounded-tr-[2rem] rounded-bl-[2rem] border-mist-200 bg-white p-5 shadow-lift sm:p-6"
          />
        </div>
      </div>

      {/* ---------- Tools strip ---------- */}
      <div style={delay(0.5)} className="animate-rise relative z-20 mx-auto mt-6 w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8">
        <p className="mb-1 text-center font-mono text-xs uppercase tracking-[0.25em] text-mist-500">Tools you&apos;ll master</p>
        <InfiniteMovingCards
          items={tools}
          getKey={(t) => t}
          speed="normal"
          className="mx-auto"
          itemClassName="w-auto md:w-auto rounded-full bg-none bg-white/70 border-b border-mist-200 px-5 py-2.5"
          renderItem={(t) => <span className="font-mono text-sm text-ink-700">{t}</span>}
        />
      </div>
    </BackgroundBeamsWithCollision>
  );
}
