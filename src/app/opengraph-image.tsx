import { ogCard, ogSize } from "@/lib/og/card";

export const alt = "NovaNxt Lab — hands-on computer courses in Kandivali West, Mumbai";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "Computer courses",
    title: "Learn tech by building real things.",
    sub: "AI, Python, Web Development, Excel, Tally, Design & Kids Coding — 90% hands-on, AI in every course.",
    chips: ["AI + ML", "Python", "Full Stack", "Excel", "Tally", "Kids"],
  });
}
