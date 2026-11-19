// Reviews marquee: two rows of sticker review cards scrolling in opposite directions,
// pausing on hover. Pure CSS animation (server component); stops for prefers-reduced-motion.
// Data comes from src/lib/reviews.ts — the section hides itself when there are no reviews.
import { IconBrandGoogleFilled, IconQuote, IconStarFilled } from "@tabler/icons-react";
import { Mark, Section, SectionHeader, btn } from "@/components/site/ui";
import { contact } from "@/lib/brand";
import { getReviews, googleReviewsUrl, type Review } from "@/lib/reviews";
import { cn } from "@/lib/utils";

const cardBg = ["bg-white", "bg-spark-100", "bg-aqua-100", "bg-brand-100"];
const avatarBg = ["bg-spark-300", "bg-aqua-300", "bg-brand-300", "bg-spark-200"];

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStarFilled key={i} className={cn("size-4", i < n ? "text-spark-500" : "text-mist-300")} aria-hidden />
      ))}
    </span>
  );
}

function ReviewCard({ r, i }: { r: Review; i: number }) {
  return (
    <figure className={cn("flex w-[18rem] shrink-0 flex-col border-2 border-ink-900 p-5 shadow-hard sm:w-[22rem]", cardBg[i % cardBg.length])}>
      <div className="flex items-center justify-between gap-3">
        {r.rating ? (
          <Stars n={r.rating} />
        ) : (
          <IconQuote className="size-7 text-ink-900" aria-hidden />
        )}
        <span className="flex items-center gap-1 border-2 border-ink-900 bg-white px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-ink-900">
          <IconBrandGoogleFilled className="size-3.5" aria-hidden />
          Google review
        </span>
      </div>
      <blockquote className="mt-4 line-clamp-5 flex-1 whitespace-pre-line text-[15px] leading-relaxed text-ink-800">{r.text}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t-2 border-ink-900 pt-4">
        <span className={cn("grid size-10 shrink-0 place-items-center border-2 border-ink-900 font-display text-lg font-extrabold text-ink-900", avatarBg[i % avatarBg.length])}>
          {r.author.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-extrabold text-ink-900">{r.author}</span>
          <span className="block truncate text-xs font-semibold text-ink-600">
            {[r.course, r.when].filter(Boolean).join(" · ") || "Student at NovaNxt Lab"}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** One endless row: the list is repeated until it's wide enough, then doubled for a seamless loop. */
function Row({ items, reverse, offset }: { items: Review[]; reverse?: boolean; offset: number }) {
  const fill: Review[] = [];
  while (fill.length < 8) fill.push(...items);
  return (
    <div className="flex overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className="flex w-max animate-marquee gap-6 pr-6 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${fill.length * 6}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex gap-6">
            {fill.map((r, i) => (
              <ReviewCard key={`${copy}-${i}`} r={r} i={i + offset} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const list = getReviews();
  if (!list.length) return null;

  const rated = list.filter((r) => r.rating);
  const avg = rated.length ? (rated.reduce((s, r) => s + (r.rating ?? 0), 0) / rated.length).toFixed(1) : null;
  // alternate reviews between the rows so long and short ones mix
  const rowA = list.filter((_, i) => i % 2 === 0);
  const rowB = list.length > 1 ? list.filter((_, i) => i % 2 === 1) : list;

  return (
    <Section tone="orange" aria-labelledby="reviews-title" inner="px-0 sm:px-0 lg:px-0">
      <div className="px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="reviews-title"
          tag={avg ? `★ ${avg} on Google` : "Google reviews"}
          tone="white"
          title={<>Students <Mark tone="white">love</Mark> learning here</>}
          intro="Real reviews from students and parents on Google — straight from the people who learn at our lab."
          action={
            <a
              href={googleReviewsUrl ?? contact.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={btn({ variant: "secondary", size: "md" })}
            >
              <IconBrandGoogleFilled className="size-4" aria-hidden />
              See us on Google
            </a>
          }
        />
      </div>

      <div className="group mt-10 space-y-3">
        <Row items={rowA} offset={0} />
        <Row items={rowB} reverse offset={1} />
      </div>
    </Section>
  );
}
