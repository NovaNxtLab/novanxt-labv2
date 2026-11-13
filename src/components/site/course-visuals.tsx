"use client";
// Visuals for the homepage course grid. The path and code panels are decorative (aria-hidden). The analytics panel
// is interactive: it sits above the cell's stretched "View course details" link (relative z-10) so hovering or
// tapping the charts shows per-month / per-category insights instead of navigating.
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart";
import type { Course } from "@/lib/brand";
import { cn } from "@/lib/utils";

/* ---------- AI + ML: the learning path ---------- */

export function PathVisual({ course: c }: { course: Course }) {
  return (
    <div aria-hidden className="mt-4 border border-brand-100 bg-ink-gradient p-3 sm:p-4 short:mt-3 short:p-2.5 shorter:mt-2 shorter:p-2">
      <p className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-brand-800 short:hidden">
        {c.duration ? `${c.duration} learning path` : "Learning path"}
      </p>
      <ol className="grid grid-cols-1 gap-px bg-brand-100 sm:grid-cols-2">
        {c.modules.map((m, i) => (
          <li key={m} className="flex items-center gap-3 bg-white/90 px-3 py-1.5 text-[13px] font-medium text-ink-800 short:py-1 shorter:py-[3px] shorter:text-xs">
            <span className="font-mono text-[11px] font-semibold text-brand-500">{String(i + 1).padStart(2, "0")}</span>
            {m}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Python + AI: an LLM call with LangChain ---------- */

// token colours: k = keyword, s = string, f = function/class, p = plain
const tok = { k: "text-brand-600", s: "text-spark-700", f: "text-aqua-700", p: "text-ink-700" } as const;
type Tok = [keyof typeof tok, string];

const code: Tok[][] = [
  [["k", "from "], ["p", "langchain_anthropic "], ["k", "import "], ["f", "ChatAnthropic"]],
  [["k", "from "], ["p", "langchain_core.prompts "], ["k", "import "], ["p", "("]],
  [["f", "    ChatPromptTemplate"], ["p", ")"]],
  [["p", "llm = "], ["f", "ChatAnthropic"], ["p", "(model="], ["s", '"claude-haiku-5-5"'], ["p", ")"]],
  [["p", "prompt = "], ["f", "ChatPromptTemplate"], ["p", ".from_template("]],
  [["s", '    "Explain {topic} in 2 lines"'], ["p", ")"]],
  [["p", "chain = prompt | llm"]],
  [["f", "print"], ["p", "(chain.invoke({"], ["s", '"topic"'], ["p", ": "], ["s", '"APIs"'], ["p", "}).content)"]],
];

export function CodeVisual() {
  return (
    <div aria-hidden className="mt-4 border border-aqua-100 bg-aqua-50 short:mt-3 shorter:mt-2">
      <div className="flex items-center justify-between border-b border-aqua-100 px-3 py-1.5 shorter:hidden">
        <div className="flex gap-1.5">
          <span className="size-2 bg-spark-300" />
          <span className="size-2 bg-aqua-300" />
          <span className="size-2 bg-brand-200" />
        </div>
        <span className="font-mono text-[11px] text-mist-500">llm_chain.py</span>
      </div>
      <pre className="overflow-hidden px-3 py-2.5 font-mono text-[11px] leading-[1.6] short:py-2 short:leading-[1.45] shorter:py-1.5 shorter:text-[10.5px] shorter:leading-[1.4]">
        {code.map((line, i) => (
          <span key={i} className="block overflow-hidden text-ellipsis whitespace-pre">
            {line.map(([t, text], j) => (
              <span key={j} className={tok[t]}>
                {text}
              </span>
            ))}
          </span>
        ))}
      </pre>
      <p className="border-t border-aqua-100 bg-white/70 px-3 py-2 font-mono text-[11px] text-ink-700 short:hidden">
        <span className="text-aqua-700">›</span> An API lets two programs talk in a fixed format.
      </p>
    </div>
  );
}

/* ---------- Advanced Excel / data analytics: Recharts via shadcn chart (mock data) ---------- */

// ₹ thousands per month, by channel
const sales = [
  { month: "Jan", online: 186, store: 80 },
  { month: "Feb", online: 205, store: 120 },
  { month: "Mar", online: 237, store: 110 },
  { month: "Apr", online: 173, store: 150 },
  { month: "May", online: 209, store: 130 },
  { month: "Jun", online: 264, store: 140 },
].map((m, i, all) => {
  const total = m.online + m.store;
  const prev = i ? all[i - 1].online + all[i - 1].store : null;
  return { ...m, total, mom: prev ? (total - prev) / prev : null };
});

const salesConfig = {
  online: { label: "Online", color: "var(--color-aqua-400)" },
  store: { label: "Store", color: "var(--color-spark-300)" },
} satisfies ChartConfig;

const lakh = (k: number) => `₹${(k / 100).toFixed(2)}L`;
const pct = (n: number) => `${Math.round(n * 100)}%`;
const h1Total = sales.reduce((n, s) => n + s.total, 0);
const best = sales.reduce((a, b) => (b.total > a.total ? b : a));
const last = sales[sales.length - 1];

type Month = (typeof sales)[number];

function monthInsight(m: Month) {
  const onlineShare = m.online / m.total;
  if (m === best) return "Best month of H1 — online drove the jump.";
  if (m.mom !== null && m.mom < 0) return `Revenue dipped ${pct(-m.mom)} — store sales held up better.`;
  if (onlineShare >= 0.68) return `Online-heavy month: ${pct(onlineShare)} of sales.`;
  return "Steady month with a balanced channel mix.";
}

function SalesTooltip({ active, payload }: { active?: boolean; payload?: { payload: Month }[] }) {
  const m = payload?.[0]?.payload;
  if (!active || !m) return null;
  return (
    <div className="w-52 border border-mist-200 bg-white p-3 text-xs shadow-lift">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-sm font-bold text-ink-900">{m.month}</span>
        <span className="font-mono text-ink-900">{lakh(m.total)}</span>
      </div>
      <dl className="mt-2 space-y-1">
        {(["online", "store"] as const).map((k) => (
          <div key={k} className="flex items-center justify-between gap-2">
            <dt className="flex items-center gap-1.5 text-mist-600">
              <span className="size-2" style={{ background: salesConfig[k].color }} />
              {salesConfig[k].label}
            </dt>
            <dd className="font-mono text-ink-800">
              {lakh(m[k])} <span className="text-mist-500">· {pct(m[k] / m.total)}</span>
            </dd>
          </div>
        ))}
        {m.mom !== null && (
          <div className="flex items-center justify-between gap-2">
            <dt className="text-mist-600">vs last month</dt>
            <dd className={cn("font-mono font-semibold", m.mom >= 0 ? "text-success" : "text-danger")}>
              {m.mom >= 0 ? "▲" : "▼"} {pct(Math.abs(m.mom))}
            </dd>
          </div>
        )}
      </dl>
      <p className="mt-2 border-t border-mist-100 pt-2 leading-snug text-ink-700">{monthInsight(m)}</p>
    </div>
  );
}

const mix = [
  { segment: "electronics", label: "Electronics", value: 42, color: "var(--color-brand-300)", note: "Largest category — 4 in 10 sales." },
  { segment: "fashion", label: "Fashion", value: 33, color: "var(--color-aqua-300)", note: "Peaks around festival months." },
  { segment: "grocery", label: "Grocery", value: 25, color: "var(--color-spark-200)", note: "Small share, but repeat buyers." },
];
const mixConfig: ChartConfig = Object.fromEntries(mix.map((m) => [m.segment, { label: m.label, color: m.color }]));

function MixTooltip({ active, payload }: { active?: boolean; payload?: { payload: (typeof mix)[number] }[] }) {
  const m = payload?.[0]?.payload;
  if (!active || !m) return null;
  return (
    <div className="w-44 border border-mist-200 bg-white p-2.5 text-xs shadow-lift">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-semibold text-ink-900">
          <span className="size-2" style={{ background: m.color }} />
          {m.label}
        </span>
        <span className="font-mono text-ink-900">{m.value}%</span>
      </div>
      <p className="mt-1.5 leading-snug text-mist-600">{m.note}</p>
    </div>
  );
}

export function AnalyticsVisual({ className }: { className?: string }) {
  return (
    <figure className={cn("relative z-10 mt-4 border border-spark-100 bg-white short:mt-3 shorter:mt-2", className)}>
      <figcaption className="flex items-center justify-between border-b border-spark-100 bg-spark-50 px-3 py-1.5 font-mono text-[11px] text-spark-800">
        <span>Sales MIS · H1 · <span className="[@media(hover:none)]:hidden">hover</span><span className="hidden [@media(hover:none)]:inline">tap</span> the bars</span>
        <span className="text-mist-500">sample data</span>
      </figcaption>

      <div className="grid sm:grid-cols-[1fr_13rem] sm:divide-x sm:divide-spark-100">
        {/* monthly bars */}
        <div className="px-2 pt-2">
          <ChartContainer config={salesConfig} className="aspect-auto h-36 w-full short:h-28 shorter:h-[4.5rem]" initialDimension={{ width: 360, height: 144 }}>
            <BarChart accessibilityLayer data={sales} margin={{ left: 4, right: 4, top: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={6} />
              <ChartTooltip content={<SalesTooltip />} />
              <Bar dataKey="online" fill="var(--color-online)" />
              <Bar dataKey="store" fill="var(--color-store)" />
            </BarChart>
          </ChartContainer>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 px-2 pb-2 text-[11px] text-mist-600 shorter:pb-1">
            <span className="flex items-center gap-1.5"><span className="size-2 bg-aqua-400" />Online</span>
            <span className="flex items-center gap-1.5"><span className="size-2 bg-spark-300" />Store</span>
          </p>
        </div>

        {/* KPIs + category mix */}
        <div className="flex flex-col border-t border-spark-100 sm:border-t-0">
          <dl className="grid grid-cols-2 divide-x divide-spark-100 border-b border-spark-100">
            <div className="px-3 py-2">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-mist-500">H1 revenue</dt>
              <dd className="font-display text-base font-bold text-ink-900">{lakh(h1Total)}</dd>
            </div>
            <div className="px-3 py-2">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-mist-500">{last.month} vs prev</dt>
              <dd className={cn("font-display text-base font-bold", (last.mom ?? 0) >= 0 ? "text-success" : "text-danger")}>
                {(last.mom ?? 0) >= 0 ? "▲" : "▼"} {pct(Math.abs(last.mom ?? 0))}
              </dd>
            </div>
          </dl>
          <div className="flex flex-1 items-center gap-2 px-3 py-2 short:py-1">
            <ChartContainer config={mixConfig} className="aspect-square h-[4.5rem] shrink-0" initialDimension={{ width: 72, height: 72 }}>
              <PieChart>
                <ChartTooltip content={<MixTooltip />} allowEscapeViewBox={{ x: true, y: true }} position={{ x: -184, y: -8 }} />
                <Pie data={mix} dataKey="value" nameKey="segment" innerRadius={20} outerRadius={34} strokeWidth={2}>
                  {mix.map((m) => (
                    <Cell key={m.segment} fill={m.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <ul className="grid flex-1 gap-0.5 text-[11px] text-ink-700">
              {mix.map((m) => (
                <li key={m.segment} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2" style={{ background: m.color }} />
                    {m.label}
                  </span>
                  <span className="font-mono">{m.value}%</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="border-t border-spark-100 bg-spark-50/60 px-3 py-2 text-[11px] leading-snug text-ink-700 short:hidden">
            <span className="font-semibold">Insight:</span> {best.month} was the best month at {lakh(best.total)}.
          </p>
        </div>
      </div>
    </figure>
  );
}
