import type { Metadata } from "next";
import { ContactSection } from "@/components/site/contact-section";
import { Faq } from "@/components/site/home-sections";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { SiteNavbar } from "@/components/site/site-navbar";
import { PageHeader, Section, SectionHeader, Tag } from "@/components/site/ui";
import { brand, contact } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact NovaNxt Lab — Computer Classes in Kandivali West, Mumbai",
  description: `Call, WhatsApp or send a message to ${brand.name}. Ask about course fees, batch timings or book a free demo class at our Kandivali West lab, Mumbai.`,
  alternates: { canonical: "/contact" },
};

const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <PageHeader
          crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          tag={<Tag tone="white">We reply fast</Tag>}
          title="Contact us"
          intro="Fees, batch timings, which course suits you — ask us anything. Send a message and we'll call you back, or reach us directly."
          tone="orange"
        />
        <ContactSection header={false} tone="paper" />
        <Section tone="indigo" aria-labelledby="map-title">
          <SectionHeader id="map-title" tag="Find us" tone="white" title="Where the lab is" intro={contact.address} />
          <div className="mt-8 border-2 border-ink-900 bg-white shadow-hard-lg">
            <iframe
              title={`Map: ${brand.name}`}
              src={mapEmbed}
              className="block h-80 w-full md:h-[26rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Section>
        <Faq />
      </main>
      <MobileActionBar whatsappText="Hi NovaNxt Lab, I have a question about your courses." label="WhatsApp us" />
    </>
  );
}
