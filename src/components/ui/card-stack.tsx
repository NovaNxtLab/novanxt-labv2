"use client";
// Aceternity UI — Card Stack (https://ui.aceternity.com/components/card-stack)
// Local changes: interval scoped per instance (was module-level), generic content-only cards,
// configurable size/interval via className + props, light-only.
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type StackCard = { id: string; content: React.ReactNode };

export const CardStack = ({
  items,
  offset = 12,
  scaleFactor = 0.06,
  intervalMs = 4500,
  className,
  cardClassName,
}: {
  items: StackCard[];
  offset?: number;
  scaleFactor?: number;
  intervalMs?: number;
  className?: string;
  cardClassName?: string;
}) => {
  const [cards, setCards] = useState(items);

  useEffect(() => {
    const id = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        next.unshift(next.pop()!);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <div className={cn("relative h-60 w-60 md:h-60 md:w-96", className)}>
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={cn(
            "absolute inset-x-0 h-full border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1]",
            cardClassName,
          )}
          style={{ transformOrigin: "top center" }}
          animate={{
            top: index * -offset,
            scale: 1 - index * scaleFactor,
            zIndex: cards.length - index,
            opacity: index > 3 ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          aria-hidden={index !== 0 || undefined}
        >
          {card.content}
        </motion.div>
      ))}
    </div>
  );
};
