import { SiteNavbar } from "@/components/site/site-navbar";
import { Hero } from "@/components/site/hero";

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <section id="hero">
          <Hero />
        </section>
      </main>
    </>
  );
}
