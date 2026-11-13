"use client";
// Aceternity UI — Navbar Menu (https://ui.aceternity.com/components/navbar-menu)
// Local changes: typed props, light-only, Menu is unstyled (parent pill styles it),
// ProductItem takes a visual node instead of a remote image, keyboard focus opens items.
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} onFocus={() => setActive(item)} className="relative">
      <motion.button
        type="button"
        transition={{ duration: 0.3 }}
        aria-expanded={active === item}
        className="flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-mist-700 transition-colors hover:text-ink-800"
      >
        {item}
        <svg viewBox="0 0 12 12" className={cn("size-3 transition-transform", active === item && "rotate-180")} aria-hidden>
          <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.button>
      {active !== null && (
        <motion.div initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={transition}>
          {active === item && (
            <div className="absolute left-1/2 top-[calc(100%_+_0.6rem)] -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="overflow-hidden rounded-2xl border border-mist-200 bg-white shadow-lift"
              >
                <motion.div layout className="h-full w-max p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav onMouseLeave={() => setActive(null)} className={cn("relative flex items-center", className)}>
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  visual,
}: {
  title: string;
  description: string;
  href: string;
  visual: React.ReactNode;
}) => {
  return (
    <a href={href} className="group flex gap-3 rounded-xl p-2 transition-colors hover:bg-mist-50">
      <div className="shrink-0">{visual}</div>
      <div>
        <h4 className="mb-1 font-display text-base font-bold text-ink-900 group-hover:text-brand-600">{title}</h4>
        <p className="max-w-[13rem] text-sm text-mist-500">{description}</p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, className, ...rest }: React.ComponentPropsWithoutRef<"a">) => {
  return (
    <a {...rest} className={cn("text-mist-600 transition-colors hover:text-ink-900", className)}>
      {children}
    </a>
  );
};
