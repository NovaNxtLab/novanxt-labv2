// Homepage hero (sticker style): bold promise, two actions, a collage of things students build,
// then a marquee of course names. Server component; the only motion is the CSS marquee
// (stopped by prefers-reduced-motion in globals.css).
import { IconBrandWhatsapp, IconCircleCheckFilled, IconFileText, IconMapPin, IconSparkles } from "@tabler/icons-react";
import { BrochureButton } from "@/components/site/brochure-dialog";
import { HeroVisual } from "@/components/site/hero-visual";
import { Mark, Tag, btn, container, h1Class } from "@/components/site/ui";
import { contact, courses, reach } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <>
      <section id="hero" aria-labelledby="hero-title" className="overflow-hidden border-b-2 border-ink-900 bg-cream">
        <div className={cn(container, "grid items-center gap-14 py-12 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-24")}>
          <div>
            <Tag tone="sky">
              <IconMapPin className="size-3.5" aria-hidden />
              Computer courses · {reach.lab.area}, {reach.lab.city}
            </Tag>
            <h1 id="hero-title" className={cn(h1Class, "mt-6")}>
              Learn tech by <Mark>building</Mark> real things.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">
              AI, Python, Excel, Tally, web development, design and kids&apos; coding — taught hands-on at our lab, with AI
              tools in every course.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={contact.whatsappHref("Hi NovaNxt Lab, I'd like to book a free demo class.")}
                target="_blank"
                rel="noopener noreferrer"
                className={btn()}
              >
                <IconBrandWhatsapp className="size-5" aria-hidden />
                Book a free demo class
              </a>
              <BrochureButton className={btn({ variant: "secondary" })}>
                <IconFileText className="size-5" aria-hidden />
                Get fees &amp; syllabus
              </BrochureButton>
            </div>

            <ul className="mt-8 flex flex-col gap-2 text-sm font-bold text-ink-800 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {["Free demo before you join", "AI in every course", "90% hands-on"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <IconCircleCheckFilled className="size-5 text-success" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* what you'll build — sticker app windows */}
          <div>
            <Tag tone="sky" tilt className="mb-5 ml-1 px-3.5 py-2 text-sm">
              <IconSparkles className="size-4" aria-hidden />
              Stuff you&apos;ll build here
            </Tag>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* course marquee */}
      <div className="overflow-hidden border-b-2 border-ink-900 bg-spark-400 py-3.5" aria-label="Courses we teach">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0">
              {courses.map((c) => (
                <li key={c.slug} className="flex items-center whitespace-nowrap px-5 font-display text-lg font-extrabold text-ink-900">
                  {c.title}
                  <span aria-hidden className="pl-10 text-ink-900">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
