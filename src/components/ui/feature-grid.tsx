"use client";
// Aceternity UI — Feature Sections (https://ui.aceternity.com/blocks/feature-sections, demo 3 layout + demo 2 hover)
// Local changes: extracted the inline FeatureCard into <FeatureGrid>/<FeatureCell>. Cells sit edge-to-edge
// with hairline dividers (1px gap over the line colour) instead of per-breakpoint border-r/border-b juggling, so
// the grid stays packed at every width. Square corners throughout. Demo 2's hover (soft wash + left accent bar
// that grows) is kept, using logo tints. Cells are motion elements with an optional `layoutId` so one can morph
// into the Expandable Card. Light-only; the cobe globe and image skeletons are dropped.
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

export function FeatureGrid({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div className={cn("grid grid-cols-1 gap-px border border-mist-200 bg-mist-200 lg:grid-cols-6", className)}>
      {children}
    </div>
  );
}

export function FeatureCell({
  className,
  children,
  layoutId,
  accent = "group-hover/feature:bg-brand-400",
  wash = "from-aqua-50",
}: {
  className?: string;
  children?: ReactNode;
  layoutId?: string;
  /** full class for the left bar colour on hover, e.g. "group-hover/feature:bg-spark-300" */
  accent?: string;
  /** gradient start of the hover wash */
  wash?: string;
}) {
  return (
    <motion.div layoutId={layoutId} className={cn("group/feature relative flex flex-col bg-white p-5 sm:p-6 lg:py-5 short:py-4 shorter:py-2.5", className)}>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100",
          wash,
        )}
      />
      <div
        aria-hidden
        className={cn(
          "absolute left-0 top-8 h-6 w-1 bg-mist-200 transition-all duration-200 group-hover/feature:h-10",
          accent,
        )}
      />
      <div className="relative flex flex-1 flex-col">{children}</div>
    </motion.div>
  );
}
