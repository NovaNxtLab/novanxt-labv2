import { SiteNavbar } from "@/components/site/site-navbar";
import { Hero } from "@/components/site/hero";
import { ContactSection } from "@/components/site/contact-section";
import { CoursesSection, Faq, Highlights, HowItWorks, LabSection } from "@/components/site/home-sections";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { Testimonials } from "@/components/site/testimonials";

// Story: what we are → find your course → why us → reviews → how to start → the lab → doubts → get in touch.
export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <Hero />
        <CoursesSection />
        <Highlights />
        <Testimonials />
        <HowItWorks />
        <LabSection />
        <Faq />
        <ContactSection />
      </main>
      <MobileActionBar whatsappText="Hi NovaNxt Lab, I'd like to book a free demo class." label="Book free demo" />
    </>
  );
}
