// The lab's own page. This is the URL the Google Business Profile should link to, so it carries the
// "… in Kandivali West" local intent that the (location-neutral) course URLs no longer do.
import type { Metadata } from "next";
import {
  IconBrandWhatsapp,
  IconClock,
  IconDeviceLaptop,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import { SiteNavbar } from "@/components/site/site-navbar";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { CtaBand } from "@/components/site/home-sections";
import { LabGallery } from "@/components/site/lab-photos";
import { CourseGrid, Tag, PageHeader, Section, SectionHeader, btn } from "@/components/site/ui";
import { brand, contact, courses, reach } from "@/lib/brand";

const { area, city } = reach.lab;

export const metadata: Metadata = {
  title: `Computer Classes in ${area}, ${city} — AI, Python, Excel & Tally`,
  description: `Visit the NovaNxt Lab classroom in ${area}, ${city}: hands-on AI, Python, web development, Excel, Tally, design and kids coding courses. Easy to reach from ${reach.nearby.join(", ")}.`,
  alternates: { canonical: `/locations/${reach.lab.slug}` },
};

const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(`${contact.address}`)}&output=embed`;

export default function KandivaliWestPage() {
  const details = [
    { k: "Address", v: contact.address, icon: IconMapPin, href: contact.mapsHref },
    { k: "Phone / WhatsApp", v: contact.phone, icon: IconPhone, href: contact.phoneHref },
    { k: "Email", v: contact.email, icon: IconMail, href: contact.emailHref },
    { k: "Timings", v: contact.hours ?? "Call or WhatsApp for batch timings", icon: IconClock },
    { k: "Learn online", v: reach.online.live ? "Live online batches across Maharashtra" : reach.online.label, icon: IconDeviceLaptop },
  ];

  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <LocalBusinessJsonLd />

        <PageHeader
          crumbs={[{ label: "Home", href: "/" }, { label: area }]}
          tag={<Tag tone="white">Our lab · {city}</Tag>}
          title={`Computer classes in ${area}, ${city}`}
          intro={`Learn by building at our ${area} lab — hands-on batches in AI, Python, web development, Excel, Tally, design and kids coding. Students join us from ${reach.nearby.join(", ")} and across Mumbai.`}
        >
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={contact.whatsappHref(`Hi NovaNxt Lab, I'd like to visit the ${area} lab for a free demo class.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={btn()}
            >
              <IconBrandWhatsapp className="size-5" aria-hidden />
              Book a free demo visit
            </a>
            <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer" className={btn({ variant: "secondary" })}>
              <IconMapPin className="size-5" aria-hidden />
              Get directions
            </a>
          </div>
        </PageHeader>

        {/* ---------- Inside the lab ---------- */}
        <Section aria-labelledby="inside">
          <SectionHeader
            id="inside"
            tag="Inside the lab"
            tone="orange"
            title="Real computers. Real trainers. Real fun."
            intro="Every student gets their own computer, and a trainer is always beside you. Here's what a normal day looks like."
          />
          <div className="mt-12">
            <LabGallery />
          </div>
        </Section>

        {/* ---------- Visit details + map ---------- */}
        <Section tone="indigo" aria-labelledby="visit">
          <SectionHeader id="visit" tag="Visit us" title="How to find the lab" />
          <div className="mt-10 grid border-2 border-ink-900 bg-white shadow-hard-lg lg:grid-cols-[24rem_1fr]">
            <dl className="divide-y-2 divide-ink-900 border-b-2 border-ink-900 lg:border-b-0 lg:border-r-2">
              {details.map(({ k, v, icon: I, href }) => (
                <div key={k} className="flex gap-4 p-5">
                  <span className="grid size-10 shrink-0 place-items-center border-2 border-ink-900 bg-spark-300 text-ink-900">
                    <I className="size-5" aria-hidden />
                  </span>
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-500">{k}</dt>
                    <dd className="mt-1 font-bold text-ink-900">
                      {href ? (
                        <a href={href} className="hover:underline" {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}>
                          {v}
                        </a>
                      ) : (
                        v
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="min-h-80 bg-mist-100">
              <iframe
                title={`Map: ${brand.name}, ${area}`}
                src={mapEmbed}
                className="size-full min-h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <h3 className="mt-14 font-display text-2xl font-extrabold text-ink-900">Nearby areas our students come from</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {reach.nearby.map((n) => (
              <li key={n} className="border-2 border-ink-900 bg-aqua-200 px-3 py-2 text-sm font-extrabold text-ink-900 shadow-hard-sm">{n}</li>
            ))}
          </ul>
        </Section>

        {/* ---------- Courses at this lab ---------- */}
        <Section tone="sky" aria-labelledby="courses-here">
          <SectionHeader id="courses-here" tag="Courses" title={`Courses at the ${area} lab`} />
          <div className="mt-10">
            <CourseGrid items={courses} />
          </div>
        </Section>

        <CtaBand title="Come and see the lab for yourself" />
      </main>
      <MobileActionBar
        whatsappText={`Hi NovaNxt Lab, I'd like to visit the ${area} lab for a free demo class.`}
        label="Book a visit"
      />
    </>
  );
}

/** schema.org local business data — the main signal (with the Google Business Profile) for "near me" searches. */
function LocalBusinessJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `https://www.novanxtlab.com/locations/${reach.lab.slug}#lab`,
    name: brand.name,
    url: `https://www.novanxtlab.com/locations/${reach.lab.slug}`,
    telephone: contact.phone,
    email: contact.email,
    image: `https://www.novanxtlab.com${brand.logos.mark}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "F/29, Profit Center, Mahavir Nagar",
      addressLocality: `${area}, ${city}`,
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    areaServed: [area, ...reach.nearby, city].map((name) => ({ "@type": "Place", name })),
    sameAs: Object.values(contact.socials),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }} />
  );
}
