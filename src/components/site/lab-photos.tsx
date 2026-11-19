// Real photos of the Kandivali West lab, shown as framed "polaroid" stickers.
// Used on the homepage lab section (collage) and the location page (gallery).
import Image from "next/image";
import { cn } from "@/lib/utils";

export const labPhotos = [
  { src: "/campus/classroom-3.jpg", alt: "A NovaNxt Lab trainer guiding two students at a computer", caption: "1-on-1 help from your trainer" },
  { src: "/campus/classroom-2.jpg", alt: "Kids excited about the game they built in class", caption: "Kids showing off their first game" },
  { src: "/campus/classroom-4.jpg", alt: "A student working on his own computer in the lab", caption: "Your own computer, every class" },
  { src: "/campus/classroom-1.jpg", alt: "The NovaNxt Lab computer lab in Kandivali West", caption: "The lab in Kandivali West" },
];

function Polaroid({
  photo,
  className,
  ratio,
  sizes,
}: {
  photo: (typeof labPhotos)[number];
  className?: string;
  ratio: string;
  sizes: string;
}) {
  return (
    <figure className={cn("border-2 border-ink-900 bg-white p-2 shadow-hard", className)}>
      <div className={cn("relative bg-mist-100", ratio)}>
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
      </div>
      <figcaption className="px-1 pt-2 text-center font-display text-sm font-bold leading-snug text-ink-900">{photo.caption}</figcaption>
    </figure>
  );
}

/** Homepage: a tilted 4-photo collage. */
export function LabCollage() {
  const [a, b, c, d] = labPhotos;
  return (
    <div className="grid grid-cols-2 items-start gap-5 px-1 sm:gap-6">
      <Polaroid photo={a} ratio="aspect-[3/4]" className="-rotate-2" sizes="(min-width: 1024px) 280px, 45vw" />
      <div className="grid gap-5 sm:gap-6">
        <Polaroid photo={b} ratio="aspect-square" className="rotate-2" sizes="(min-width: 1024px) 280px, 45vw" />
        <Polaroid photo={c} ratio="aspect-square" className="-rotate-1" sizes="(min-width: 1024px) 280px, 45vw" />
      </div>
      <Polaroid photo={d} ratio="aspect-[16/9]" className="col-span-2 rotate-1" sizes="(min-width: 1024px) 580px, 90vw" />
    </div>
  );
}

/** Location page: a straight 4-up gallery. */
export function LabGallery() {
  return (
    <ul className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
      {labPhotos.map((p, i) => (
        <li key={p.src}>
          <Polaroid photo={p} ratio="aspect-[3/4]" className={i % 2 ? "rotate-1" : "-rotate-1"} sizes="(min-width: 1024px) 300px, 45vw" />
        </li>
      ))}
    </ul>
  );
}
