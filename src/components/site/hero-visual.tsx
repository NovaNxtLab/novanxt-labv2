"use client";

// Hero visual: "things you'll build" as a stacked deck of sticker app windows.
//  · Desktop: hover the deck and it springs apart into a spread-out collage.
//  · Any device: tap/click to shuffle — the top card moves to the back.
// Positions are plain CSS classes (stack depth + lg:group-hover spread), so the server HTML
// already shows the stack and nothing jumps on hydration. Decorative → aria-hidden.
import { useState, type ReactNode } from "react";
import { IconBrandPython, IconChartBar, IconMessageChatbot, IconPointer, IconTrophy } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function Window({ title, icon, bar, children }: { title: string; icon: ReactNode; bar: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col border-2 border-ink-900 bg-white">
      <div className={cn("flex items-center gap-2 border-b-2 border-ink-900 px-3 py-2", bar)}>
        <span className="flex gap-1.5">
          <span className="size-2.5 border-2 border-ink-900 bg-white" />
          <span className="size-2.5 border-2 border-ink-900 bg-white" />
          <span className="size-2.5 border-2 border-ink-900 bg-white" />
        </span>
        <span className="ml-1 flex min-w-0 items-center gap-1.5 truncate font-mono text-xs font-bold text-ink-900">
          {icon}
          {title}
        </span>
      </div>
      <div className="min-h-0 flex-1 p-3 sm:p-4">{children}</div>
    </div>
  );
}

const bars = [
  { h: "h-[35%]", c: "bg-aqua-300" },
  { h: "h-[55%]", c: "bg-aqua-300" },
  { h: "h-[45%]", c: "bg-brand-300" },
  { h: "h-[70%]", c: "bg-brand-300" },
  { h: "h-[60%]", c: "bg-spark-300" },
  { h: "h-[90%]", c: "bg-spark-400" },
];

const cards: { id: string; spread: string; body: ReactNode }[] = [
  {
    id: "code",
    spread: "lg:group-hover:left-0 lg:group-hover:top-0 lg:group-hover:w-[62%] lg:group-hover:rotate-[-1deg]",
    body: (
      <Window title="study_buddy.py" icon={<IconBrandPython className="size-3.5" />} bar="bg-spark-300">
        <pre className="overflow-hidden font-mono text-[11px] leading-relaxed text-ink-800 sm:text-[13px]">
          <span className="text-brand-600">from</span> ai <span className="text-brand-600">import</span> Assistant{"\n"}
          bot = Assistant(<span className="text-spark-700">&quot;study-buddy&quot;</span>){"\n"}
          plan = bot.ask(<span className="text-spark-700">&quot;Plan my exam week&quot;</span>){"\n"}
          <span className="text-mist-500"># → 7-day plan ready ✓</span>
          <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-pulse bg-ink-900" />
        </pre>
      </Window>
    ),
  },
  {
    id: "chart",
    spread: "lg:group-hover:left-[65%] lg:group-hover:top-2 lg:group-hover:w-[35%] lg:group-hover:rotate-[2deg]",
    body: (
      <Window title="sales.xlsx" icon={<IconChartBar className="size-3.5" />} bar="bg-aqua-200">
        <div className="flex h-20 items-end gap-1.5 border-b-2 border-l-2 border-ink-900 px-1.5">
          {bars.map((b, i) => (
            <span key={i} className={cn("flex-1 border-2 border-b-0 border-ink-900", b.h, b.c)} />
          ))}
        </div>
        <p className="mt-2 text-xs font-extrabold text-ink-900">Sales ↑ 38% 🚀</p>
      </Window>
    ),
  },
  {
    id: "chat",
    spread: "lg:group-hover:left-0 lg:group-hover:top-[12.75rem] lg:group-hover:w-[48%] lg:group-hover:rotate-[1deg]",
    body: (
      <Window title="my-chatbot" icon={<IconMessageChatbot className="size-3.5" />} bar="bg-brand-200">
        <div className="space-y-2 text-xs font-semibold leading-snug">
          <p className="ml-auto w-fit max-w-[85%] border-2 border-ink-900 bg-spark-200 px-2 py-1.5 text-ink-900">Explain loops simply?</p>
          <p className="w-fit max-w-[90%] border-2 border-ink-900 bg-cream px-2 py-1.5 text-ink-900">A loop repeats steps — like doing 10 push-ups 💪</p>
        </div>
      </Window>
    ),
  },
  {
    id: "progress",
    spread: "lg:group-hover:left-[51%] lg:group-hover:top-[13rem] lg:group-hover:w-[49%] lg:group-hover:rotate-[-1.5deg]",
    body: (
      <div className="flex h-full flex-col justify-center border-2 border-ink-900 bg-spark-100 p-4 text-ink-900">
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-spark-800">
          <IconTrophy className="size-4" />
          Your progress
        </p>
        <p className="mt-2 font-display text-lg font-extrabold leading-tight">Python + AI · Module 5 of 8</p>
        <div className="mt-3 flex gap-1">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className={cn("h-3 flex-1 border-2 border-ink-900", i < 5 ? "bg-spark-400" : "bg-white")} />
          ))}
        </div>
        <p className="mt-2 text-xs font-bold text-ink-700">Next up: build your own API ⚡</p>
      </div>
    ),
  },
];

// Stack position by depth (0 = top card). Phones: full-width pile. Desktop: a centred pile.
const depthClass = [
  "z-40 top-0 rotate-[-2deg] lg:top-[3rem]",
  "z-30 top-3 rotate-[3deg] lg:top-[3.75rem]",
  "z-20 top-6 rotate-[-4deg] lg:top-[4.5rem]",
  "z-10 top-9 rotate-[5deg] lg:top-[5.25rem]",
];

export function HeroVisual() {
  const [order, setOrder] = useState(cards.map((c) => c.id));
  const shuffle = () => setOrder((o) => [...o.slice(1), o[0]]);

  return (
    <div aria-hidden className="group relative mx-auto w-full max-w-xl select-none lg:max-w-none">
      <div onClick={shuffle} className="relative h-[15rem] cursor-pointer lg:h-[25rem]">
        {cards.map((c) => (
          <div
            key={c.id}
            className={cn(
              "absolute left-[3%] h-44 w-[94%] shadow-hard transition-[left,top,width,rotate,translate] duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] lg:left-[12%] lg:w-[76%]",
              depthClass[order.indexOf(c.id)],
              c.spread,
            )}
          >
            {c.body}
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-ink-600 lg:transition-opacity lg:group-hover:opacity-0">
        <IconPointer className="size-4" />
        <span className="lg:hidden">Tap the cards to shuffle</span>
        <span className="hidden lg:inline">Hover to spread them out</span>
      </p>
    </div>
  );
}
