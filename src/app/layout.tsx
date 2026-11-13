import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { brand, seo } from "@/lib/brand";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
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
  icons: { icon: brand.logos.favicon, apple: brand.logos.favicon },
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
      className={`${sora.variable} ${jakarta.variable} ${jetbrains.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip font-sans">{children}</body>
    </html>
  );
}
