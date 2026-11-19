import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { brand, seo } from "@/lib/brand";
import { ldHtml, organizationLd, siteKeywords, siteUrl, websiteLd } from "@/lib/seo";
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
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s | ${brand.name}` },
  description: seo.description,
  keywords: siteKeywords,
  applicationName: brand.name,
  authors: [{ name: brand.name, url: siteUrl }],
  creator: brand.name,
  publisher: brand.name,
  category: "education",
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: brand.name,
    locale: "en_IN",
    title: seo.title,
    description: seo.description,
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  // Icons: favicon.ico, icon.png and apple-icon.png in src/app are picked up automatically;
  // manifest.ts covers Android / installable icons. Windows tiles below.
  other: {
    "msapplication-TileColor": "#fffaf2",
    "msapplication-TileImage": "/icons/mstile-150.png",
  },
  // Search engine ownership checks — paste the codes into env vars (see docs/seo-guide.md).
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }),
  },
};

export const viewport: Viewport = {
  themeColor: "#fffaf2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${bricolage.variable} ${jakarta.variable} ${jetbrains.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip font-sans text-ink-900">
        {/* Site-wide structured data: the institute + the website. Page-level schema references these @ids. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={ldHtml([organizationLd(), websiteLd()])} />
        {/* Whole site boxed at 7xl, centred; outlined on wide screens to match the sticker style */}
        <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col bg-cream xl:border-x-2 xl:border-ink-900">
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
