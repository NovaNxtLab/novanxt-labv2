// Shared 1200×630 social-share card (Open Graph / WhatsApp / LinkedIn / X) in the site's sticker style.
// Rendered at build time by next/og. Headline font is Bricolage Grotesque fetched from Google Fonts;
// if that fetch fails the card still renders with the built-in font.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { contact } from "@/lib/brand";

export const ogSize = { width: 1200, height: 630 };

async function font(weight: number) {
  "use cache";
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@${weight}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export async function ogCard({ eyebrow, title, sub, chips = [] }: { eyebrow: string; title: string; sub: string; chips?: string[] }) {
  const [logo, bold] = await Promise.all([
    readFile(path.join(process.cwd(), "public/icons/icon-192.png")),
    font(800),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const ink = "#121735";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#fffaf2", color: ink, fontFamily: bold ? "Bricolage" : undefined }}>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", padding: "56px 64px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={76} height={76} alt="" />
            <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
              Nova<span style={{ color: "#f28a1e" }}>Nxt</span>&nbsp;Lab
            </div>
            <div style={{ display: "flex", marginLeft: "auto", border: `3px solid ${ink}`, background: "#7cc8f5", padding: "8px 18px", fontSize: 24, fontWeight: 800, boxShadow: `5px 5px 0 ${ink}` }}>
              {eyebrow.toUpperCase()}
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 48, fontSize: title.length > 34 ? 68 : 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1060 }}>
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 30, color: "#3a4160", maxWidth: 1000, lineHeight: 1.3 }}>{sub}</div>
          {chips.length > 0 && (
            <div style={{ display: "flex", gap: 14, marginTop: "auto" }}>
              {chips.map((c) => (
                <div key={c} style={{ display: "flex", border: `3px solid ${ink}`, background: "#ffffff", padding: "8px 16px", fontSize: 24, fontWeight: 800 }}>
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `4px solid ${ink}`, background: "#ff9a42", padding: "20px 64px", fontSize: 28, fontWeight: 800 }}>
          <span>Kandivali West, Mumbai · Free demo class</span>
          <span>{contact.phone}</span>
        </div>
      </div>
    ),
    { ...ogSize, ...(bold && { fonts: [{ name: "Bricolage", data: bold, weight: 800 as const, style: "normal" as const }] }) },
  );
}
