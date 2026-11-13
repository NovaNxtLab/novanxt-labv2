"use client";
// Aceternity UI — Navbar Menu (https://ui.aceternity.com/components/navbar-menu)
// Local changes: typed props, light-only, Menu is unstyled (parent pill styles it),
// ProductItem takes a visual node instead of a remote image, keyboard focus opens items.
// Fixes: the dropdown wrapper now starts flush under the trigger (top-full) and uses padding as an invisible hover
// bridge — previously a gap (top: 100% + 0.6rem, plus the navbar pill padding) sat outside the <nav>, so moving the
// pointer down fired mouseleave and closed the menu before it could be reached. Click/tap opens (touch laptops,
// iPad landscape); Escape, an outside click/tap and focus leaving the menu close it, links use next/link (client-side navigation).
import React from "react";
import Link from "next/link";
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
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} onFocus={() => setActive(item)} className="relative">
      <motion.button
        type="button"
        transition={{ duration: 0.3 }}
        onClick={() => setActive(item)}
        aria-expanded={active === item}
        aria-haspopup="true"
        className="flex cursor-pointer items-center gap-1 px-3 py-2 text-sm font-medium text-mist-700 transition-colors hover:text-ink-800"
      >
        {item}
        <svg viewBox="0 0 12 12" className={cn("size-3 transition-transform", active === item && "rotate-180")} aria-hidden>
          <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.button>
      {active !== null && (
        <motion.div initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={transition}>
          {active === item && (
            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-7">
              <motion.div
                transition={transition}
                layoutId="active"
                className="overflow-hidden border border-mist-200 bg-white shadow-lift"
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
  const ref = React.useRef<HTMLElement>(null);
  // Escape and clicks/taps outside close the open panel (hover-opened menus have no focus inside the nav).
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setActive(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [setActive]);
  return (
    <nav
      ref={ref}
      onMouseLeave={() => setActive(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null);
      }}
      className={cn("relative flex items-center", className)}
    >
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
    <Link href={href} className="group flex gap-3 p-2 transition-colors hover:bg-mist-50">
      <div className="shrink-0">{visual}</div>
      <div>
        <h4 className="mb-1 font-display text-base font-bold text-ink-900 group-hover:text-brand-600">{title}</h4>
        <p className="max-w-[13rem] text-sm text-mist-500">{description}</p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, className, ...rest }: React.ComponentProps<typeof Link>) => {
  return (
    <Link {...rest} className={cn("text-mist-600 transition-colors hover:text-ink-900", className)}>
      {children}
    </Link>
  );
};
