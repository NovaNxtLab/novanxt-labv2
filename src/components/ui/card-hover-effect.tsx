"use client";
// Aceternity UI — Card Hover Effect (https://ui.aceternity.com/components/card-hover-effect)
// Local changes: generic items + renderItem (cards aren't forced to be <a>), light-only logo-tint highlight,
// per-instance layoutId (useId) so multiple grids don't share one highlight, highlight also follows keyboard
// focus, grid items animate in/out on filter (AnimatePresence popLayout), no `let`, no dark styles.
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";

export function HoverEffect<T>({
  items,
  getKey,
  renderItem,
  className,
  itemClassName,
  highlightClassName,
}: {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  className?: string;
  itemClassName?: string;
  highlightClassName?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const id = useId();

  return (
    <div className={cn("grid grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-3", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((item) => {
          const key = getKey(item);
          return (
            <motion.div
              key={key}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className={cn("group relative block h-full w-full p-2", itemClassName)}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(key)}
              onBlur={() => setHovered(null)}
            >
              <AnimatePresence>
                {hovered === key && (
                  <motion.span
                    aria-hidden
                    className={cn("absolute inset-0 block h-full w-full bg-aqua-100", highlightClassName)}
                    layoutId={`hover-bg-${id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                    exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                  />
                )}
              </AnimatePresence>
              <div className="relative z-10 h-full">{renderItem(item)}</div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
