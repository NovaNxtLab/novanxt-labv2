import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { brand, contact, courses, seo } from "@/lib/brand";
import { DsHero } from "@/components/ds/hero";
import { Reveal } from "@/components/ds/reveal";
import {
  AccordionDemo,
  CounterDemo,
  CourseFilterDemo,
  JourneyDemo,
  MagneticButton,
  MarqueeDemo,
  TerminalDemo,
  TiltCard,
} from "@/components/ds/demos";

export const metadata: Metadata = {
  title: "Design System",
  description: "NovaNxt Lab brand, design tokens, motion rules and frontend blueprint.",
  robots: { index: false },
};

/* ---------------------------------- data ---------------------------------- */

const scales = [
  { name: "ink", role: "Brand indigo · surfaces, ink, Midnight theme", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: "brand", role: "Orange · primary CTA, highlights (≤10% of a screen)", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "spark", role: "Electric sky · tech/AI accents, links, focus rings", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "mist", role: "Cool neutrals · backgrounds, borders, body text", steps: [50, 100, 200, 300, 400, 500, 600, 700] },
] as const;

const swatchCls: Record<string, string> = {
  "ink-50": "bg-ink-50", "ink-100": "bg-ink-100", "ink-200": "bg-ink-200", "ink-300": "bg-ink-300", "ink-400": "bg-ink-400", "ink-500": "bg-ink-500", "ink-600": "bg-ink-600", "ink-700": "bg-ink-700", "ink-800": "bg-ink-800", "ink-900": "bg-ink-900", "ink-950": "bg-ink-950",
  "brand-50": "bg-brand-50", "brand-100": "bg-brand-100", "brand-200": "bg-brand-200", "brand-300": "bg-brand-300", "brand-400": "bg-brand-400", "brand-500": "bg-brand-500", "brand-600": "bg-brand-600", "brand-700": "bg-brand-700", "brand-800": "bg-brand-800", "brand-900": "bg-brand-900",
  "spark-50": "bg-spark-50", "spark-100": "bg-spark-100", "spark-200": "bg-spark-200", "spark-300": "bg-spark-300", "spark-400": "bg-spark-400", "spark-500": "bg-spark-500", "spark-600": "bg-spark-600", "spark-700": "bg-spark-700", "spark-800": "bg-spark-800", "spark-900": "bg-spark-900",
  "mist-50": "bg-mist-50", "mist-100": "bg-mist-100", "mist-200": "bg-mist-200", "mist-300": "bg-mist-300", "mist-400": "bg-mist-400", "mist-500": "bg-mist-500", "mist-600": "bg-mist-600", "mist-700": "bg-mist-700",
};

const typeScale = [
  { token: "display-xl", spec: "Sora 800 · clamp(3rem, 8vw, 6rem) · -0.03em · lh 0.95", cls: "font-display text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95]", sample: "Get Hired." },
  { token: "display-lg", spec: "Sora 700 · 3rem / 3.75rem · -0.02em", cls: "font-display text-4xl md:text-5xl font-bold tracking-tight", sample: "Build real AI systems" },
  { token: "h2", spec: "Sora 700 · 2.25rem · -0.02em", cls: "font-display text-3xl md:text-4xl font-bold tracking-tight", sample: "Career tracks for 2027" },
  { token: "h3", spec: "Sora 600 · 1.5rem", cls: "font-display text-2xl font-semibold", sample: "Advanced Excel + AI" },
  { token: "body-lg", spec: "Plus Jakarta 400 · 1.125rem · lh 1.7", cls: "text-lg leading-relaxed", sample: "90% practical labs, real projects and placement support in Kandivali West." },
  { token: "body", spec: "Plus Jakarta 400 · 1rem · lh 1.6", cls: "text-base", sample: "Learn accounting, GST, billing and business management with Tally Prime." },
  { token: "eyebrow", spec: "JetBrains Mono 500 · 0.75rem · UPPER · 0.25em", cls: "font-mono text-xs uppercase tracking-[0.25em] text-brand-600", sample: "// 12-week program" },
  { token: "code", spec: "JetBrains Mono 400 · 0.875rem", cls: "font-mono text-sm text-spark-700", sample: "model.fit(X_train, y_train)" },
];

const motionTokens = [
  { t: "instant", v: "120ms", use: "Hover colour, focus ring" },
  { t: "fast", v: "240ms", use: "Buttons, chips, toggles" },
  { t: "base", v: "450ms", use: "Cards, accordions, menus" },
  { t: "slow", v: "900ms", use: "Section reveals, hero text" },
  { t: "cinematic", v: "1.2–2s", use: "Hero timeline, counters, scrubs" },
];

const easings = [
  { t: "ease-out-expo", v: "cubic-bezier(.16,1,.3,1)", use: "Default for anything entering" },
  { t: "ease-in-out-quart", v: "cubic-bezier(.76,0,.24,1)", use: "Page/route transitions, pinned scenes" },
  { t: "ease-spring", v: "cubic-bezier(.34,1.56,.64,1)", use: "Playful pops — chips, badges, Kids page" },
];

const toolPolicy = [
  { tool: "GSAP + ScrollTrigger + SplitText", when: "Anything scroll-linked, timeline-based or text-splitting: hero intro, pinned journey, path draws, counters, parallax." },
  { tool: "Motion (motion/react)", when: "Component state & interaction: hover/tap, magnetic & tilt, layout/filter changes, AnimatePresence (menus, accordions, modals)." },
  { tool: "CSS keyframes", when: "Infinite ambient loops that need no JS: marquee, gradient shift, floating blobs." },
];

const pages = [
  { route: "/", name: "Home (landing)", phase: "P1", note: "Conversion page — see section plan below" },
  { route: "/courses", name: "All Courses", phase: "P1", note: "Filterable catalog by track; comparison of duration/mode" },
  { route: "/courses/[slug]", name: "Course detail ×9", phase: "P1", note: "SSG per course; hero, outcomes, syllabus, projects, tools, FAQ, enquiry form" },
  { route: "/kids", name: "Kids Coding + AI", phase: "P1", note: "Playful sub-brand (age 5–10), parent-focused copy; alias of kids course" },
  { route: "/about", name: "About & Campus", phase: "P1", note: "Vision, trainers, classroom gallery, why NovaNxt" },
  { route: "/contact", name: "Contact & Visit", phase: "P1", note: "Map, WhatsApp, call, enquiry form, directions from Kandivali station" },
  { route: "/free-demo", name: "Book a Free Demo", phase: "P1", note: "Single-goal lead page for ads & WhatsApp campaigns" },
  { route: "/privacy · /terms", name: "Legal", phase: "P1", note: "Required for lead forms & ads" },
  { route: "/success-stories", name: "Student Success", phase: "P2", note: "Testimonials, placements, project showcase (needs content)" },
  { route: "/blog/[slug]", name: "Blog / Guides", phase: "P2", note: "Local-SEO content: 'Best Python course in Kandivali' etc." },
  { route: "/workshops", name: "Events & Workshops", phase: "P2", note: "Weekend AI bootcamps, free seminars" },
];

const landing = [
  { n: "01", s: "Sticky nav", d: "Logo, Courses mega-menu, About, Contact, 'Book free demo' + WhatsApp CTA", a: "Motion — glass blur on scroll, hide on scroll-down / show on scroll-up, mega-menu AnimatePresence", lib: "Motion" },
  { n: "02", s: "Hero", d: "'Learn. Build. Get Hired.' + sub-copy, 2 CTAs, animated terminal / course chips, local trust line", a: "GSAP timeline — SplitText char rise, chips pop, pointer parallax; magnetic CTAs", lib: "GSAP" },
  { n: "03", s: "Tools marquee", d: "Python, TensorFlow, OpenCV, Excel, Tally Prime, React, Canva…", a: "CSS infinite marquee, pause on hover, edge mask", lib: "CSS" },
  { n: "04", s: "Stats band", d: "Students trained, courses, % practical, batch size", a: "GSAP ScrollTrigger count-up once in view", lib: "GSAP" },
  { n: "05", s: "Career tracks", d: "Course catalog with track tabs → cards", a: "Motion layout + shared pill; 3D tilt + spotlight on cards", lib: "Motion" },
  { n: "06", s: "Why NovaNxt (bento)", d: "90% practical · AI in every course · Real projects · Small batches · Certificate · Placement help", a: "GSAP staggered reveal; mini-loops inside tiles", lib: "GSAP" },
  { n: "07", s: "Learn → Build → Get Hired", d: "The signature 3-step journey", a: "GSAP pinned section, SVG path draw scrubbed to scroll, steps pop", lib: "GSAP" },
  { n: "08", s: "Flagship: AI + ML 12-week", d: "Module timeline + 3 capstones (Assistant, Business Automation, Robotics)", a: "GSAP horizontal scroll of modules (desktop), vertical stack on mobile", lib: "GSAP" },
  { n: "09", s: "Kids Adventure", d: "Levels 1–6 as a game map, parent CTA", a: "Motion spring pops + CSS float; playful ease-spring", lib: "Motion" },
  { n: "10", s: "Campus", d: "Classroom photos (img1–4) in Kandivali West", a: "GSAP parallax image stack / clip-path reveal", lib: "GSAP" },
  { n: "11", s: "Testimonials", d: "Student & parent reviews, Google rating", a: "Motion drag carousel with snap", lib: "Motion" },
  { n: "12", s: "FAQ", d: "Fees, batches, timings, certificates, placements, demo class", a: "Motion accordion (height auto)", lib: "Motion" },
  { n: "13", s: "Final CTA", d: "'Your skills. Your future. Starts here.' Book demo + WhatsApp", a: "CSS animated gradient + Motion magnetic button", lib: "CSS" },
  { n: "14", s: "Footer", d: "Address, map link, phone, email, socials, all course links (SEO)", a: "Static — no motion", lib: "—" },
];

const discovered = [
  { k: "Logos", v: "Horizontal wordmark w/ tagline + 'N' monogram (PNG, transparent). Need SVG versions.", ok: true },
  { k: "Taglines", v: "Learn. Build. Get Hired. · Your skills. Your future. Starts here.", ok: true },
  { k: "Contact", v: `${contact.phone} · ${contact.email} · WhatsApp · Instagram · Facebook`, ok: true },
  { k: "Address", v: contact.address, ok: true },
  { k: "Courses", v: `${courses.length} programs, syllabi for most; only AI & ML has a duration (12 weeks)`, ok: true },
  { k: "Campus photos", v: "4 classroom images on the old site", ok: true },
  { k: "Fees / batches / timings", v: "Not published — needed for course pages & FAQ", ok: false },
  { k: "Stats & testimonials", v: "None published — needed for trust sections", ok: false },
  { k: "Trainer profiles", v: "None published", ok: false },
  { k: "Working hours", v: "Not published — needed for Google Business + footer", ok: false },
];

const faqs = [
  { q: "Do I need prior coding experience?", a: "No. Every track starts from fundamentals and uses AI tools to speed up learning." },
  { q: "Is there a free demo class?", a: "Yes — book online or on WhatsApp and visit our Kandivali West lab." },
  { q: "Will I get a certificate?", a: "Yes, on completion of the course and its project work." },
];

/* -------------------------------- primitives ------------------------------- */

function Section({ id, eyebrow, title, intro, children, dark }: { id: string; eyebrow: string; title: string; intro?: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} className={`scroll-mt-8 py-20 md:py-28 ${dark ? "theme-midnight" : ""}`}>
      <Reveal className="mx-auto max-w-6xl px-4 sm:px-6">
        <p data-reveal className="font-mono text-xs uppercase tracking-[0.25em] text-brand-500">{eyebrow}</p>
        <h2 data-reveal className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
        {intro && <p data-reveal className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>}
        <div data-reveal className="mt-12">{children}</div>
      </Reveal>
    </section>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <h3 className="mb-4 mt-12 font-mono text-xs uppercase tracking-[0.2em] text-muted first:mt-0">{children}</h3>;
}

/* ---------------------------------- page ---------------------------------- */

export default function DesignSystemPage() {
  return (
    <main className="flex-1">
      <DsHero />

      {/* DISCOVERY */}
      <Section id="discovery" eyebrow="00 · Discovery" title="What we already have" intro="Audit of novanxtlab.com — brand assets, contact data and content we can reuse, plus the gaps the institute needs to fill before launch.">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="grid gap-4 lg:col-span-1">
            <div className="grid place-items-center border border-line bg-white p-6">
              <Image src={brand.logos.wordmark} alt="NovaNxt Lab wordmark" width={300} height={86} className="h-auto w-full max-w-[300px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid place-items-center border border-line bg-white p-6">
                <Image src={brand.logos.mark} alt="NovaNxt Lab monogram" width={96} height={96} />
              </div>
              <div className="grid place-items-center bg-ink-950 p-6">
                <div className="bg-white p-2">
                  <Image src={brand.logos.mark} alt="" width={64} height={64} />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted">On Midnight surfaces the monogram always sits on a white tile — the indigo stroke disappears on dark navy.</p>
          </div>

          <div className="border border-line bg-surface p-6 lg:col-span-2">
            <ul className="divide-y divide-line">
              {discovered.map((d) => (
                <li key={d.k} className="flex gap-4 py-3 text-sm">
                  <span className={`mt-1 size-2.5 shrink-0 ${d.ok ? "bg-success" : "bg-warning"}`} />
                  <span className="w-40 shrink-0 font-semibold">{d.k}</span>
                  <span className="text-muted">{d.v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              <a href={contact.phoneHref} className="bg-ink-800 px-4 py-2 text-white">Call {contact.phone}</a>
              <a href={contact.whatsappHref()} target="_blank" rel="noopener noreferrer" className="bg-whatsapp px-4 py-2 font-semibold text-ink-950">WhatsApp</a>
              <a href={contact.emailHref} className="border border-line px-4 py-2">{contact.email}</a>
              <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer" className="border border-line px-4 py-2">Open map</a>
            </div>
          </div>
        </div>

        <Label>Legacy vs. new direction</Label>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-line bg-surface p-6">
            <p className="font-semibold">Old site</p>
            <p className="mt-2 text-sm text-muted">Poppins, flat navy #0A1F44 + orange #FF7A00, AOS fade-ins, single long page with anchor links; course pages on mixed URL styles (.html and folders).</p>
          </div>
          <div className="border border-brand-500/40 bg-brand-50 p-6">
            <p className="font-semibold">New direction — “Tech Lab, warm”</p>
            <p className="mt-2 text-sm text-mist-600">Keep the brand triad but push it: deep midnight hero scenes with electric sky glows, orange as a precise action colour, geometric display type, code/terminal motifs that speak to tech learners, and purposeful scroll storytelling.</p>
          </div>
        </div>
      </Section>

      {/* COLOR */}
      <Section id="color" eyebrow="01 · Colour" title="Nova · Flare · Pulse" intro="Three brand hues lifted straight from the N monogram, plus cool neutrals. Ratio guide: 60% neutral / Midnight, 30% nova + pulse, 10% flare.">
        <div className="grid gap-8">
          {scales.map((s) => (
            <div key={s.name}>
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <p className="font-display text-lg font-semibold capitalize">{s.name}</p>
                <p className="text-right text-sm text-muted">{s.role}</p>
              </div>
              <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-11">
                {s.steps.map((st) => (
                  <div key={st}>
                    <div className={`h-14 border border-black/5 ${swatchCls[`${s.name}-${st}`]}`} />
                    <p className="mt-1 font-mono text-[10px] text-muted">{st}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Label>Signature gradients</Label>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-ink-gradient flex h-36 items-end p-5 font-mono text-sm text-white">bg-ink-gradient</div>
          <div className="bg-brand-gradient flex h-36 items-end p-5 font-mono text-sm text-white">bg-brand-gradient</div>
          <div className="flex h-36 items-end bg-ink-950 p-5">
            <span className="text-gradient animate-gradient font-display text-3xl font-extrabold">text-gradient</span>
          </div>
        </div>

        <Label>Themes</Label>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-line bg-mist-50 p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-mist-500">Paper (default)</p>
            <p className="mt-3 font-display text-2xl font-bold text-ink-900">Content, catalog, course pages</p>
            <p className="mt-2 text-sm text-mist-500">bg mist-50 · surface white · ink ink-900 · line mist-200</p>
          </div>
          <div className="theme-midnight border border-line p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-spark-300">Midnight (.theme-midnight)</p>
            <p className="mt-3 font-display text-2xl font-bold">Hero, AI scenes, CTA, footer</p>
            <p className="mt-2 text-sm text-muted">bg ink-950 · surface white/4% · ink #F2F4FB · line white/10%</p>
          </div>
        </div>
      </Section>

      {/* TYPE */}
      <Section id="type" eyebrow="02 · Typography" title="Geometric, confident, a little bit code" intro="Sora echoes the heavy geometric wordmark; Plus Jakarta Sans keeps long-form copy friendly; JetBrains Mono adds the developer flavour tech learners recognise.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { f: "Sora", r: "Display & headings", c: "font-display", w: "600 · 700 · 800" },
            { f: "Plus Jakarta Sans", r: "Body & UI", c: "font-sans", w: "400 · 500 · 600" },
            { f: "JetBrains Mono", r: "Eyebrows, tags, code", c: "font-mono", w: "400 · 500" },
          ].map((f) => (
            <div key={f.f} className="border border-line bg-surface p-6">
              <p className={`${f.c} text-6xl font-bold`}>Aa</p>
              <p className="mt-4 font-semibold">{f.f}</p>
              <p className="text-sm text-muted">{f.r} · {f.w}</p>
            </div>
          ))}
        </div>
        <Label>Scale</Label>
        <div className="divide-y divide-line border border-line bg-surface">
          {typeScale.map((t) => (
            <div key={t.token} className="grid gap-2 p-5 md:grid-cols-[180px_1fr] md:items-baseline">
              <div>
                <p className="font-mono text-xs text-brand-600">{t.token}</p>
                <p className="mt-1 text-[11px] text-muted">{t.spec}</p>
              </div>
              <p className={`${t.cls} min-w-0 break-words`}>{t.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* COMPONENTS */}
      <Section id="components" eyebrow="03 · Components" title="Core building blocks" intro="Radius: button “cut” corners (top-left + bottom-right sharp, others 16px) · chip 999px · card 20px · panel 32px. Shadows: soft, lift, and coloured glows reserved for primary actions.">
        <Label>Buttons — square corners</Label>
        <div className="flex flex-wrap items-center gap-4">
          <MagneticButton>Book free demo</MagneticButton>
          <button type="button" className="bg-ink-800 px-7 py-3.5 font-display font-semibold text-white transition hover:bg-ink-700">Explore courses</button>
          <button type="button" className="border border-ink-800 px-7 py-3.5 font-display font-semibold text-ink-800 transition hover:bg-ink-800 hover:text-white">Download syllabus</button>
          <a href={contact.whatsappHref()} target="_blank" rel="noopener noreferrer" className="bg-whatsapp px-7 py-3.5 font-display font-semibold text-ink-950">Chat on WhatsApp</a>
          <button type="button" className="font-display font-semibold text-spark-600 underline-offset-4 hover:underline">Text link →</button>
        </div>

        <Label>Badges & tags</Label>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="bg-brand-100 px-3 py-1 text-brand-800">🔥 New batch</span>
          <span className="bg-spark-100 px-3 py-1 text-spark-800">AI-powered</span>
          <span className="bg-ink-100 px-3 py-1 text-ink-700">12 weeks</span>
          <span className="bg-mist-100 px-3 py-1 text-mist-600">Beginner</span>
          <span className="border border-line px-3 py-1 font-mono font-normal">Python</span>
        </div>

        <Label>Form field</Label>
        <div className="grid max-w-xl gap-3 sm:grid-cols-2">
          <input placeholder="Your name" className="border border-line bg-surface px-4 py-3 outline-none transition focus:border-spark-500 focus:ring-4 focus:ring-spark-500/15" />
          <select className="border border-line bg-surface px-4 py-3 outline-none focus:border-spark-500 focus:ring-4 focus:ring-spark-500/15" defaultValue="">
            <option value="" disabled>Interested course</option>
            {courses.map((c) => <option key={c.slug}>{c.title}</option>)}
          </select>
        </div>

        <Label>Course cards — hover to tilt</Label>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((c) => (
            <TiltCard key={c.slug} title={c.title} tag={`${c.category}${c.duration ? ` · ${c.duration}` : ""}`} body={c.summary} accent={c.accent} />
          ))}
        </div>

        <Label>Track filter — layout animation</Label>
        <CourseFilterDemo />

        <Label>FAQ accordion</Label>
        <div className="max-w-2xl"><AccordionDemo items={faqs} /></div>
      </Section>

      {/* MOTION */}
      <Section id="motion" dark eyebrow="04 · Motion" title="Motion with a purpose" intro="Every animation must guide attention toward a course or a CTA. Enter fast, settle softly, never block reading. All motion respects prefers-reduced-motion.">
        <div className="grid gap-4 md:grid-cols-3">
          {toolPolicy.map((t) => (
            <div key={t.tool} className="border border-line bg-surface p-6">
              <p className="font-display font-semibold text-spark-300">{t.tool}</p>
              <p className="mt-2 text-sm text-muted">{t.when}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="border border-line bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Durations</p>
            <ul className="mt-3 space-y-2 text-sm">
              {motionTokens.map((m) => (
                <li key={m.t} className="flex justify-between gap-4"><span className="font-mono text-brand-400">{m.t} · {m.v}</span><span className="text-right text-muted">{m.use}</span></li>
              ))}
            </ul>
          </div>
          <div className="border border-line bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Easings</p>
            <ul className="mt-3 space-y-3 text-sm">
              {easings.map((e) => (
                <li key={e.t}><span className="font-mono text-brand-400">{e.t}</span> <span className="font-mono text-xs text-muted">{e.v}</span><br /><span className="text-muted">{e.use}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <Label>Live — terminal typing (GSAP)</Label>
        <div className="max-w-xl"><TerminalDemo /></div>

        <Label>Live — stats count-up (GSAP ScrollTrigger) · placeholder numbers</Label>
        <CounterDemo stats={[{ value: 9, suffix: "+", label: "Career courses" }, { value: 90, suffix: "%", label: "Practical" }, { value: 12, suffix: "wk", label: "AI & ML program" }, { value: 100, suffix: "%", label: "AI in every track" }]} />

        <Label>Live — tools marquee (CSS)</Label>
        <MarqueeDemo items={["Python", "TensorFlow", "OpenCV", "ChatGPT", "Excel", "Power Query", "Tally Prime", "GST Portal", "HTML/CSS", "JavaScript", "React", "Java", "Canva", "Premiere Pro"]} />

        <Label>Live — Learn → Build → Get Hired (GSAP scrub, scroll slowly)</Label>
        <div className="py-8"><JourneyDemo /></div>
      </Section>

      {/* PAGES */}
      <Section id="pages" eyebrow="05 · Information architecture" title="Sitemap" intro="Phase 1 ships the conversion core (8 templates, 17 URLs). Phase 2 adds proof and SEO content once the institute supplies testimonials and stories.">
        <div className="overflow-x-auto border border-line bg-surface">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-line font-mono text-xs uppercase tracking-widest text-muted">
              <tr><th className="p-4">Route</th><th className="p-4">Page</th><th className="p-4">Phase</th><th className="p-4">Purpose</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {pages.map((p) => (
                <tr key={p.route}>
                  <td className="p-4 font-mono text-spark-700">{p.route}</td>
                  <td className="p-4 font-semibold">{p.name}</td>
                  <td className="p-4"><span className={`px-2 py-0.5 text-xs font-semibold ${p.phase === "P1" ? "bg-brand-100 text-brand-800" : "bg-mist-100 text-mist-600"}`}>{p.phase}</span></td>
                  <td className="p-4 text-muted">{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* LANDING */}
      <Section id="landing" eyebrow="06 · Landing page" title="14 sections, one story" intro="Hook → proof → choose a track → see the journey → trust → act. Primary CTA (Book free demo) appears in nav, hero, after tracks, and at the end; WhatsApp floats on every page.">
        <ol className="grid gap-3">
          {landing.map((l) => (
            <li key={l.n} className="grid gap-3 border border-line bg-surface p-5 md:grid-cols-[56px_1fr_1.2fr_90px] md:items-center">
              <span className="font-display text-2xl font-extrabold text-mist-300">{l.n}</span>
              <div>
                <p className="font-display font-semibold">{l.s}</p>
                <p className="text-sm text-muted">{l.d}</p>
              </div>
              <p className="text-sm">{l.a}</p>
              <span className={`justify-self-start px-3 py-1 text-center font-mono text-xs md:justify-self-end ${l.lib === "GSAP" ? "bg-spark-100 text-spark-800" : l.lib === "Motion" ? "bg-ink-100 text-ink-700" : l.lib === "CSS" ? "bg-brand-100 text-brand-800" : "bg-mist-100 text-mist-500"}`}>{l.lib}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* SEO */}
      <Section id="seo" eyebrow="07 · SEO" title="Keep the local rankings" intro="The old site ranks for hyper-local intent. New URLs are descriptive and every legacy URL gets a permanent redirect.">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Label>Primary keywords</Label>
            <div className="flex flex-wrap gap-2">
              {seo.primaryKeywords.map((k) => <span key={k} className="bg-ink-800 px-3 py-1.5 text-sm text-white">{k}</span>)}
            </div>
            <Label>Course keywords</Label>
            <div className="flex flex-wrap gap-2">
              {seo.courseKeywords.map((k) => <span key={k} className="border border-line bg-surface px-3 py-1.5 text-sm">{k}</span>)}
            </div>
          </div>
          <div>
            <Label>301 redirects (next.config redirects)</Label>
            <ul className="space-y-2 border border-line bg-surface p-4 font-mono text-xs">
              {courses.map((c) => (
                <li key={c.slug} className="break-all"><span className="text-mist-400">{c.legacyPaths.join(", ")}</span> <span className="text-brand-600">→</span> /courses/{c.slug}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">Plus: JSON-LD <code className="font-mono">EducationalOrganization</code> + <code className="font-mono">Course</code> schema, sitemap.ts, robots.ts, per-page OG images.</p>
          </div>
        </div>
      </Section>

      {/* ARCHITECTURE */}
      <Section id="architecture" dark eyebrow="08 · Frontend architecture" title="How it’s built" intro="Next.js 16 App Router with Cache Components. Pages are static Server Components; animation lives in small client islands.">
        <div className="grid gap-6 md:grid-cols-2">
          <pre className="overflow-x-auto border border-line bg-surface p-5 font-mono text-xs leading-6 text-mist-200">{`src/
  app/
    (site)/            # marketing shell: Nav + Footer + WhatsApp FAB
      page.tsx         # landing
      courses/
        page.tsx
        [slug]/page.tsx   # generateStaticParams from lib/brand
      about/  contact/  free-demo/  kids/
    design-system/     # this page
    sitemap.ts  robots.ts
  components/
    ui/        # Button, Badge, Card, Input — tokens only
    motion/    # Reveal, SplitHeading, Counter, Marquee,
               # Magnetic, Tilt, PinnedJourney
    sections/  # Hero, Tracks, Bento, Journey, FAQ, CTA…
  lib/
    brand.ts   # contact, courses, SEO (single source)
    gsap.ts    # plugin registration + reduced-motion`}</pre>
          <ul className="space-y-4 text-sm">
            {[
              ["Server-first", "Sections render on the server; only interactive pieces are 'use client'. Keeps JS small on budget phones."],
              ["Content as data", "Courses, contact & SEO live in lib/brand.ts → can move to a CMS later without touching UI."],
              ["Lead capture", "Enquiry form → Server Action → email/Sheet + WhatsApp deep-link fallback. Every course page pre-fills the course."],
              ["Performance budget", "LCP < 2.5s on 4G, hero text is real HTML (animated after paint), images via next/image, fonts self-hosted by next/font."],
              ["Accessibility", "WCAG AA contrast (brand-500 only on large text / buttons with white bold), focus rings in pulse, reduced-motion fallbacks."],
            ].map(([t, d]) => (
              <li key={t} className="border border-line bg-surface p-4">
                <p className="font-display font-semibold text-brand-400">{t}</p>
                <p className="mt-1 text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <footer className="theme-midnight border-t border-line py-10 text-center text-sm text-muted">
        <p>{brand.name} · {contact.address}</p>
        <p className="mt-1 font-mono text-xs">© 2026 {brand.name} — {brand.tagline}</p>
      </footer>
    </main>
  );
}
