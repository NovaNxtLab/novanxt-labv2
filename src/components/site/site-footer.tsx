import Image from "next/image";
import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import { container } from "@/components/site/ui";
import { brand, contact, courses, reach } from "@/lib/brand";
import { cn } from "@/lib/utils";

const heading = "font-display text-lg font-extrabold text-ink-900";
const link = "flex min-h-10 items-center text-sm font-medium text-ink-700 hover:text-ink-900 hover:underline";

export function SiteFooter() {
  return (
    // pb-20 below lg = room for the fixed MobileActionBar
    <footer className="border-t-2 border-ink-900 bg-white pb-20 lg:pb-0">
      <div className={cn(container, "grid gap-10 py-14 md:grid-cols-2 md:py-16 lg:grid-cols-[1.4fr_1.3fr_0.8fr_1.2fr] lg:gap-12")}>
        <div>
          <Link href="/" className="inline-flex items-center gap-2" aria-label={`${brand.name} home`}>
            <Image src={brand.logos.mark} alt="" width={36} height={36} className="h-9 w-auto" />
            <Image src={brand.logos.wordmarkLinear} alt={brand.name} width={407} height={68} className="h-6 w-auto" />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-700">
            Hands-on computer courses with AI built in — at our {reach.lab.area} lab, for learners across {reach.lab.city}.
          </p>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-wider text-ink-600">Follow us</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {[
              { href: contact.socials.instagram, label: "NovaNxt Lab on Instagram", icon: IconBrandInstagram, bg: "hover:bg-spark-200" },
              { href: contact.socials.youtube, label: "NovaNxt Lab on YouTube", icon: IconBrandYoutube, bg: "hover:bg-spark-200" },
              { href: contact.socials.facebook, label: "NovaNxt Lab on Facebook", icon: IconBrandFacebook, bg: "hover:bg-aqua-200" },
              { href: contact.socials.linkedin, label: "NovaNxt Lab on LinkedIn", icon: IconBrandLinkedin, bg: "hover:bg-aqua-200" },
              { href: contact.whatsappHref(), label: "Chat with NovaNxt Lab on WhatsApp", icon: IconBrandWhatsapp, bg: "hover:bg-brand-200" },
            ].map(({ href, label, icon: I, bg }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className={cn("grid size-11 place-items-center border-2 border-ink-900 bg-white text-ink-900 shadow-hard-sm press", bg)}
              >
                <I className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Courses">
          <p className={heading}>Courses</p>
          <ul className="mt-3 grid sm:grid-cols-2 sm:gap-x-6 md:grid-cols-1">
            {courses.map((c) => (
              <li key={c.slug}>
                <Link href={`/courses/${c.slug}`} className={link}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Institute">
          <p className={heading}>Institute</p>
          <ul className="mt-3">
            <li><Link href="/courses" className={link}>All courses</Link></li>
            <li><Link href="/#how" className={link}>How it works</Link></li>
            <li><Link href="/#about" className={link}>About us</Link></li>
            <li><Link href={`/locations/${reach.lab.slug}`} className={link}>Visit the lab</Link></li>
            <li><Link href="/contact" className={link}>Contact us</Link></li>
          </ul>
        </nav>

        <div>
          <p className={heading}>Visit or call</p>
          <ul className="mt-3 space-y-2 text-sm text-mist-600">
            <li>
              <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 py-1.5 hover:text-ink-900">
                <IconMapPin className="mt-0.5 size-4 shrink-0 text-spark-600" aria-hidden />
                {contact.address}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="flex min-h-10 items-center gap-2.5 font-semibold text-ink-900 hover:text-brand-700">
                <IconPhone className="size-4 shrink-0 text-spark-600" aria-hidden />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="flex min-h-10 items-center gap-2.5 hover:text-ink-900">
                <IconMail className="size-4 shrink-0 text-spark-600" aria-hidden />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-ink-900 bg-spark-300">
        <div className={cn(container, "flex flex-col gap-1 py-5 text-xs font-bold text-ink-900 sm:flex-row sm:justify-between")}>
          <p>© {brand.name}. All rights reserved.</p>
          <p>{reach.lab.area}, {reach.lab.city}, Maharashtra</p>
        </div>
      </div>
    </footer>
  );
}
