import type { MetadataRoute } from "next";
import { brand, seo } from "@/lib/brand";

// Web app manifest: Android home-screen / "Install app" icons, splash colours and name.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.name} — Computer Courses in Kandivali West, Mumbai`,
    short_name: brand.name,
    description: seo.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fffaf2",
    theme_color: "#fffaf2",
    lang: "en-IN",
    categories: ["education"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
