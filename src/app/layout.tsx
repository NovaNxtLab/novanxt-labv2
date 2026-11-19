import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { brand, seo } from "@/lib/brand";
import { SiteFooter } from "@/components/site/site-footer";
import "./globals.css";

// Headings: Bricolage Grotesque — chunky, characterful, popular with student-facing brands.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.novanxtlab.com"),
  title: { default: seo.title, template: `%s | ${brand.name}` },
  description: seo.description,
  keywords: [...seo.primaryKeywords, ...seo.courseKeywords],
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: seo.description,
    images: [brand.logos.mark],
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jakarta.variable} ${jetbrains.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip font-sans text-ink-900">
        {/* Whole site boxed at 7xl, centred; outlined on wide screens to match the sticker style */}
        <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col bg-cream xl:border-x-2 xl:border-ink-900">
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
