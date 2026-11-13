// Aceternity UI — Text Generate Effect (https://ui.aceternity.com/components/text-generate-effect)
// Local changes: same blur-in word stagger, but driven by CSS (`animate-word` in globals.css)
// instead of JS, so the text paints straight from server HTML (no blank gap before hydration
// on slow mobile). Styling fully via className.
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  stagger = 0.06,
  delay = 0,
  as: Tag = "p",
}: {
  words: string;
  className?: string;
  filter?: boolean;
  stagger?: number;
  delay?: number;
  as?: "p" | "div" | "span";
}) => {
  return (
    <Tag className={cn(className)}>
      {words.split(" ").map((word, idx) => (
        <span
          key={word + idx}
          className={filter ? "animate-word" : "animate-word-plain"}
          style={{ animationDelay: `${delay + idx * stagger}s` }}
        >
          {word}{" "}
        </span>
      ))}
    </Tag>
  );
};
