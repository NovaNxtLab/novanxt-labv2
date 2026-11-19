"use client";

// Phone/tablet bottom bar: Call · Brochure · main WhatsApp action. Always reachable with a thumb.
// Used on every public page; the footer reserves bottom padding on small screens so nothing hides behind it.
// On a page with a #hero (homepage) it slides in only once the hero — which has its own CTAs — scrolls away.
import { useEffect, useState } from "react";
import { IconBrandWhatsapp, IconFileText, IconPhone } from "@tabler/icons-react";
import { BrochureButton } from "@/components/site/brochure-dialog";
import { btn } from "@/components/site/ui";
import { contact, type Course } from "@/lib/brand";
import { cn } from "@/lib/utils";

function useHeroOutOfView() {
  const [out, setOut] = useState(true);
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setOut(!e.isIntersecting), { rootMargin: "0px 0px -40% 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return out;
}

export function MobileActionBar({ course, whatsappText, label }: { course?: Course; whatsappText: string; label: string }) {
  const show = useHeroOutOfView();
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_auto_1fr] gap-2 border-t-2 border-ink-900 bg-cream px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 lg:hidden",
        !show && "pointer-events-none translate-y-full",
      )}
    >
      <a
        href={contact.phoneHref}
        aria-label={`Call ${contact.phone}`}
        className="grid size-12 place-items-center border-2 border-ink-900 bg-white text-ink-900"
      >
        <IconPhone className="size-5" />
      </a>
      <BrochureButton course={course} className="grid size-12 place-items-center border-2 border-ink-900 bg-white text-ink-900">
        <IconFileText className="size-5" aria-hidden />
        <span className="sr-only">Get the brochure by email</span>
      </BrochureButton>
      <a
        href={contact.whatsappHref(whatsappText)}
        target="_blank"
        rel="noopener noreferrer"
        className={btn({ size: "md" }, "min-h-12 whitespace-nowrap px-3 text-[15px] shadow-hard-sm min-[360px]:text-base")}
      >
        <IconBrandWhatsapp className="size-5" aria-hidden />
        {label}
      </a>
    </div>
  );
}
