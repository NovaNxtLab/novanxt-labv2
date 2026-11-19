"use client";

// "Fanned hand" carousel loop (inspired by Vibrant's carousel-loop motion studies):
// lab polaroids fan out like a hand of cards; every few seconds the front card tucks to the back
// and the rest shuffle forward on a spring. Pauses on hover/focus, dots pick a photo,
// and with prefers-reduced-motion it never auto-plays.
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { labPhotos } from "@/components/site/lab-photos";
import { cn } from "@/lib/utils";

// Slot 0 = front. Cards pivot from the bottom so they fan like a hand.
const slots = [
  { x: "0%", y: "0%", rotate: 0, scale: 1, zIndex: 40 },
  { x: "-30%", y: "5%", rotate: -11, scale: 0.9, zIndex: 30 },
  { x: "30%", y: "5%", rotate: 11, scale: 0.9, zIndex: 20 },
  { x: "0%", y: "-7%", rotate: 3, scale: 0.82, zIndex: 10 },
];
const INTERVAL = 3200;

export function LabCarousel() {
  const n = labPhotos.length;
  const [front, setFront] = useState(0); // index of the photo in slot 0
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setFront((f) => (f + 1) % n), INTERVAL);
    return () => clearInterval(t);
  }, [paused, reduce, n]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* fan */}
      <div className="relative mx-auto aspect-[5/4] w-full max-w-lg">
        {labPhotos.map((p, i) => {
          const slot = slots[(i - front + n) % n];
          const isFront = slot === slots[0];
          return (
            <motion.figure
              key={p.src}
              initial={false}
              animate={slot}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              style={{ transformOrigin: "50% 100%" }}
              className="absolute left-1/2 top-[4%] w-[52%] -translate-x-1/2 border-2 border-ink-900 bg-white p-2 shadow-hard"
              aria-hidden={!isFront}
            >
              <div className="relative aspect-[3/4] bg-mist-100">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 280px, 50vw" className="object-cover" />
              </div>
              <figcaption className="truncate px-1 pt-2 text-center font-display text-sm font-bold text-ink-900">{p.caption}</figcaption>
            </motion.figure>
          );
        })}
      </div>

      {/* controls */}
      <div className="mt-8 flex items-center justify-center gap-2" role="group" aria-label="Choose a lab photo">
        {labPhotos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setFront(i)}
            aria-label={p.caption}
            aria-pressed={i === front}
            className="grid size-11 place-items-center"
          >
            <span
              className={cn(
                "block h-3 border-2 border-ink-900 transition-all",
                i === front ? "w-8 bg-spark-400" : "w-3 bg-white hover:bg-spark-200",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
