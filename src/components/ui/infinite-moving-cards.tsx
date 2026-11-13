"use client";
// Aceternity UI — Infinite Moving Cards (https://ui.aceternity.com/components/infinite-moving-cards)
// Local changes: generic render-prop items (used for courses), list duplicated in JSX instead of
// DOM cloning (React-safe), speed/direction via inline CSS vars, light-only.
import { cn } from "@/lib/utils";
import React from "react";

const speeds = { fast: "20s", normal: "40s", slow: "80s" } as const;

export function InfiniteMovingCards<T>({
  items,
  renderItem,
  getKey,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  itemClassName,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
  direction?: "left" | "right";
  speed?: keyof typeof speeds;
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div
      style={
        {
          "--animation-duration": speeds[speed],
          "--animation-direction": direction === "left" ? "forwards" : "reverse",
        } as React.CSSProperties
      }
      className={cn(
        "relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className,
      )}
    >
      <ul className={cn("flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 animate-scroll", pauseOnHover && "hover:[animation-play-state:paused]")}>
        {[0, 1].map((copy) =>
          items.map((item) => (
            <li
              key={`${copy}-${getKey(item)}`}
              aria-hidden={copy === 1 || undefined}
              className={cn(
                "relative w-[300px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] px-6 py-5 md:w-[360px]",
                itemClassName,
              )}
            >
              {renderItem(item)}
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
