// Contact block: ways to reach us (call, WhatsApp, email, visit) + the enquiry form.
// Used on the homepage (#contact) and the /contact page.
import { IconBrandWhatsapp, IconClock, IconMail, IconMapPin, IconPhone, type Icon } from "@tabler/icons-react";
import { ContactForm } from "@/components/site/contact-form";
import { Mark, Section, SectionHeader } from "@/components/site/ui";
import { contact } from "@/lib/brand";
import { cn } from "@/lib/utils";

const ways: { label: string; value: string; href?: string; icon: Icon; bg: string; external?: boolean }[] = [
  { label: "Call us", value: contact.phone, href: contact.phoneHref, icon: IconPhone, bg: "bg-spark-300" },
  { label: "WhatsApp", value: "Chat with a counsellor", href: contact.whatsappHref(), icon: IconBrandWhatsapp, bg: "bg-aqua-200", external: true },
  { label: "Email", value: contact.email, href: contact.emailHref, icon: IconMail, bg: "bg-brand-200" },
  { label: "Visit the lab", value: contact.address, href: contact.mapsHref, icon: IconMapPin, bg: "bg-white", external: true },
  { label: "Timings", value: contact.hours ?? "Weekday & weekend batches — call to book a slot", icon: IconClock, bg: "bg-white" },
];

/** `header={false}` when the page already has its own h1 (the /contact page). */
export function ContactSection({ id = "contact", tone = "sky", header = true }: { id?: string; tone?: "sky" | "paper"; header?: boolean }) {
  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`} inner="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      <div>
        {header ? (
          <SectionHeader
            id={`${id}-title`}
            tag="Contact"
            tone="white"
            title={<>Let&apos;s <Mark>talk</Mark>.</>}
            intro="Questions about fees, batches or which course fits you? Send a message, call, or drop by the lab."
          />
        ) : (
          <h2 id={`${id}-title`} className="font-display text-3xl font-extrabold text-ink-900">Reach us any way you like</h2>
        )}

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {ways.map(({ label, value, href, icon: I, bg, external }) => {
            const body = (
              <>
                <span className={cn("grid size-11 shrink-0 place-items-center border-2 border-ink-900 text-ink-900", bg)}>
                  <I className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-extrabold uppercase tracking-wider text-ink-500">{label}</span>
                  <span className="mt-0.5 block break-words font-bold text-ink-900">{value}</span>
                </span>
              </>
            );
            const cls = "flex h-full items-start gap-3 border-2 border-ink-900 bg-white p-4 shadow-hard-sm";
            return (
              <li key={label} className={label === "Visit the lab" ? "sm:col-span-2 lg:col-span-1" : ""}>
                {href ? (
                  <a href={href} className={cn(cls, "press")} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <ContactForm />
    </Section>
  );
}
