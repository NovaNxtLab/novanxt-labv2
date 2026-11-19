// Homepage sections + the shared closing CTA band, in the sticker style.
// Server components (static HTML) except the course finder and brochure button. Skills-first: no salary/placement claims.
import {
  IconArrowRight,
  IconBrain,
  IconBrandWhatsapp,
  IconChevronDown,
  IconDeviceLaptop,
  IconFileText,
  IconMapPin,
  IconPhone,
  IconPresentation,
  IconRocket,
  type Icon,
} from "@tabler/icons-react";
import { BrochureButton } from "@/components/site/brochure-dialog";
import { CourseFinder } from "@/components/site/course-finder";
import { LabCarousel } from "@/components/site/lab-carousel";
import { ButtonLink, Mark, Section, SectionHeader, Tag, btn, container, textLink } from "@/components/site/ui";
import { brand, contact, courses, reach } from "@/lib/brand";
import { cn } from "@/lib/utils";

/* ---------- 1. Why us — four colour blocks ---------- */

const highlights: { title: string; text: string; icon: Icon; bg: string }[] = [
  { title: "90% hands-on", text: "You spend class time on a computer — not copying notes off a board.", icon: IconDeviceLaptop, bg: "bg-spark-300" },
  { title: "AI in every course", text: "Learn the AI tools that make the work faster, from Python to Tally.", icon: IconBrain, bg: "bg-aqua-200" },
  { title: "Build real projects", text: "Finish with apps, dashboards and designs you made yourself.", icon: IconRocket, bg: "bg-brand-200" },
  { title: "Try before you join", text: "A free demo class at the lab, so you know exactly what you're signing up for.", icon: IconPresentation, bg: "bg-white" },
];

export function Highlights() {
  return (
    <Section aria-labelledby="why-title">
      <SectionHeader id="why-title" tag="Why NovaNxt Lab" title={<>Less lecture. More <Mark tone="sky">doing</Mark>.</>} />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map(({ title, text, icon: I, bg }, i) => (
          <li key={title} className={cn("flex flex-col border-2 border-ink-900 p-6 shadow-hard", bg, i % 2 ? "lg:mt-8" : "")}>
            <span className="grid size-14 place-items-center border-2 border-ink-900 bg-white">
              <I className="size-7 text-ink-900" aria-hidden />
            </span>
            <h3 className="mt-8 font-display text-2xl font-extrabold leading-tight text-ink-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-800">{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- 2. Courses ---------- */

export function CoursesSection() {
  return (
    <Section id="courses" tone="sky" aria-labelledby="courses-title">
      <SectionHeader
        id="courses-title"
        tag="Our courses"
        tone="white"
        title={<>Pick your <Mark>skill</Mark>.</>}
        intro={`${courses.length} hands-on courses — from a child's first computer class to building AI systems.`}
        action={
          <ButtonLink href="/courses" variant="secondary" size="md">
            Compare all courses
            <IconArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        }
      />
      <div className="mt-12">
        <CourseFinder />
      </div>
    </Section>
  );
}

/* ---------- 3. How it works ---------- */

const steps = [
  { title: "Say hi on WhatsApp", text: "Tell us what you want to learn. We'll suggest a course and a demo slot." },
  { title: "Try a free class", text: "Visit the lab, meet your trainer and sit in on a real session." },
  { title: "Learn by building", text: "Join a weekday or weekend batch and make something every week." },
  { title: "Show your work", text: "Leave with a certificate and a portfolio of projects you built." },
];
const stepBg = ["bg-spark-300", "bg-aqua-200", "bg-brand-200", "bg-white"];

export function HowItWorks() {
  return (
    <Section id="how" aria-labelledby="how-title">
      <SectionHeader id="how-title" tag="How it works" tone="indigo" title="Start in 4 easy steps" center />
      <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="relative border-2 border-ink-900 bg-white p-6 shadow-hard">
            <span className={cn("absolute -top-6 left-6 grid size-12 place-items-center border-2 border-ink-900 font-display text-2xl font-extrabold text-ink-900", stepBg[i])}>
              {i + 1}
            </span>
            <h3 className="mt-6 font-display text-xl font-extrabold text-ink-900">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12 text-center">
        <a href={contact.whatsappHref("Hi NovaNxt Lab, I'd like to book a free demo class.")} target="_blank" rel="noopener noreferrer" className={btn()}>
          <IconBrandWhatsapp className="size-5" aria-hidden />
          Start with step 1
        </a>
      </div>
    </Section>
  );
}

/* ---------- 4. The lab ---------- */

export function LabSection() {
  return (
    <Section id="about" tone="indigo" aria-labelledby="about-title" inner="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div>
        <SectionHeader
          id="about-title"
          tag="Visit the lab"
          tone="white"
          title={<>Come see our lab in <Mark tone="sky">{reach.lab.area}</Mark></>}
          intro={
            <p>
              {brand.name} is a hands-on computer institute in {reach.lab.area}, {reach.lab.city}. Every course — from a
              child&apos;s first typing lesson to building AI agents — is taught at a computer, with a trainer beside you.
            </p>
          }
        />
        <ul className="mt-8 space-y-3">
          <li className="flex items-start gap-3 border-2 border-ink-900 bg-white p-4">
            <IconMapPin className="mt-0.5 size-5 shrink-0 text-spark-600" aria-hidden />
            <span>
              <span className="font-bold text-ink-900">{contact.address}</span>
              <span className="block text-sm text-ink-700">Students join from {reach.nearby.join(", ")}.</span>
            </span>
          </li>
          <li className="flex items-center gap-3 border-2 border-ink-900 bg-white p-4">
            <IconPhone className="size-5 shrink-0 text-spark-600" aria-hidden />
            <a href={contact.phoneHref} className="font-bold text-ink-900 hover:underline">{contact.phone}</a>
          </li>
        </ul>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <ButtonLink href={`/locations/${reach.lab.slug}`} variant="secondary">
            Plan your visit
            <IconArrowRight className="size-5" aria-hidden />
          </ButtonLink>
          <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer" className={textLink}>
            Get directions
          </a>
        </div>
      </div>

      <LabCarousel />
    </Section>
  );
}

/* ---------- 5. FAQ ---------- */

// TODO(institute): review answers; add real questions from WhatsApp enquiries (see marketing doc).
export const faqs: { q: string; a: string }[] = [
  {
    q: "Do I need any computer or coding experience to join?",
    a: "No. Most courses start from the basics — Office Automation, Python, Excel, Tally, Web Development and Kids Coding are all beginner-friendly. The AI + ML course is easier if you know some Python, and our counsellor will suggest the right starting point.",
  },
  {
    q: "Can I attend a class before I enrol?",
    a: "Yes. Every course has a free demo class at our Kandivali West lab. Message us on WhatsApp to book a slot.",
  },
  {
    q: "What are the fees and batch timings?",
    a: "Fees depend on the course and batch type. We run weekday and weekend batches — get the brochure by email, or message us on WhatsApp and we'll share the current fees, timings and payment options.",
  },
  {
    q: "Where are classes held? Do you teach online?",
    a: `Classes are held at our lab: ${contact.address}. It's easy to reach from ${reach.nearby.slice(0, 4).join(", ")}. Live online batches are coming soon — message us to be told when they open.`,
  },
  {
    q: "Will I get a certificate?",
    a: "Yes. You receive a NovaNxt Lab course-completion certificate after finishing the course and its projects. Kids earn a certificate for each level they complete.",
  },
  {
    q: "Is AI really part of every course?",
    a: "Yes. Alongside the core skill, each course teaches the AI tools that make that work faster — AI coding assistants for programmers, AI in Excel for analysts, AI creative tools for designers, and kid-safe AI for young learners.",
  },
];

export function Faq() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <Section aria-labelledby="faq-title" inner="grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-16">
      <div>
        <SectionHeader id="faq-title" tag="FAQ" tone="sky" title="Got questions?" />
        <p className="mt-5 text-ink-700">Didn&apos;t find your answer? We reply fast on WhatsApp.</p>
        <a
          href={contact.whatsappHref("Hi NovaNxt Lab, I have a question about your courses.")}
          target="_blank"
          rel="noopener noreferrer"
          className={btn({ variant: "secondary", size: "md" }, "mt-5")}
        >
          <IconBrandWhatsapp className="size-5 text-whatsapp" aria-hidden />
          Ask on WhatsApp
        </a>
      </div>
      <div className="space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="group border-2 border-ink-900 bg-white shadow-hard-sm">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg font-bold text-ink-900 marker:hidden group-open:border-b-2 group-open:border-ink-900 group-open:bg-spark-200 [&::-webkit-details-marker]:hidden">
              {f.q}
              <span className="grid size-8 shrink-0 place-items-center border-2 border-ink-900 bg-white">
                <IconChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden />
              </span>
            </summary>
            <p className="px-5 py-4 leading-relaxed text-ink-700">{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }} />
    </Section>
  );
}

/* ---------- Closing CTA (every page, above the footer) ---------- */

export function CtaBand({
  title = "Not sure where to start?",
  text = "Come for a free demo class, or get the brochure with fees and the full syllabus.",
  className,
}: {
  title?: string;
  text?: string;
  className?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className={cn("bg-cream py-16 md:py-24", className)}>
      <div className={container}>
        <div className="relative grid gap-8 border-2 border-ink-900 bg-spark-300 p-7 shadow-hard-lg sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14">
          <Tag tone="white" tilt className="absolute -top-4 left-6">Free demo class</Tag>
          <div>
            <h2 id="cta-title" className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 text-balance sm:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-800 md:text-lg">{text}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
            <a href={contact.whatsappHref("Hi NovaNxt Lab, I'd like to book a free demo class.")} target="_blank" rel="noopener noreferrer" className={btn({ variant: "dark" })}>
              <IconBrandWhatsapp className="size-5" aria-hidden />
              Book a free demo
            </a>
            <BrochureButton className={btn({ variant: "secondary" })}>
              <IconFileText className="size-5" aria-hidden />
              Get the brochure
            </BrochureButton>
          </div>
        </div>
      </div>
    </section>
  );
}
