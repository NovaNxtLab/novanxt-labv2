// Server-only lead handling for the brochure form and the contact form.
// Every lead goes to the Google Apps Script web app, which (1) appends a row to the leads Google Sheet and
// (2) for brochure requests, emails the PDFs to the visitor from the institute's Gmail.
// There is no direct download anywhere on the site. Setup: docs/leads-google-sheet.md.
import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { brand, contact } from "@/lib/brand";
import { brochureFiles, type BrochureFile } from "@/lib/brochures";

/** Form choice: "general" (all-courses catalogue) or a course slug. */
export const isBrochureKey = (k: string) => Object.hasOwn(brochureFiles, k);

// ---------- validation ----------

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Indian mobile: 10 digits starting 6–9, optional +91 / 0 prefix, spaces and dashes ignored. */
export function normalisePhone(raw: string) {
  const digits = raw.replace(/[\s-]/g, "").replace(/^(\+91|0091|91(?=\d{10}$)|0)/, "");
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export type FieldErrors = Partial<Record<"name" | "email" | "phone" | "brochure" | "message", string>>;

type Base = { name: string; email: string; phone: string };

function checkBase(f: Base, emailRequired: boolean) {
  const errors: FieldErrors = {};
  const name = f.name.trim().replace(/\s+/g, " ");
  const email = f.email.trim().toLowerCase();
  const phone = normalisePhone(f.phone);
  if (name.length < 3 || !/\s/.test(name)) errors.name = "Please enter your full name (first and last).";
  if (!f.phone.trim()) errors.phone = "Please enter your mobile number.";
  else if (!phone) errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!email) {
    if (emailRequired) errors.email = "Please enter your email — we send the brochure there.";
  } else if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
  return { errors, clean: { name, email, phone: phone ?? "" } };
}

export function validateBrochure(f: Base & { brochure: string }) {
  const { errors, clean } = checkBase(f, true);
  if (!isBrochureKey(f.brochure)) errors.brochure = "Please choose a course.";
  return { errors, clean };
}

export function validateContact(f: Base & { message: string }) {
  const { errors, clean } = checkBase(f, false);
  if (f.message.length > 1500) errors.message = "Please keep your message under 1500 characters.";
  return { errors, clean };
}

// ---------- brochure attachments ----------

/** PDFs live outside /public, so the only way to get one is by email after filling the form. */
const brochurePath = (id: string) => path.join(process.cwd(), "private", "brochures", `${id}.pdf`);

export type Attachment = { name: string; data: string }; // base64

export async function loadBrochures(key: string): Promise<{ attachments: Attachment[]; files: BrochureFile[]; missing: BrochureFile[] }> {
  const attachments: Attachment[] = [];
  const files: BrochureFile[] = [];
  const missing: BrochureFile[] = [];
  for (const b of brochureFiles[key] ?? []) {
    try {
      const buf = await readFile(brochurePath(b.id));
      attachments.push({ name: `${brand.name.replace(/\s+/g, "-")}-${b.id}.pdf`, data: buf.toString("base64") });
      files.push(b);
    } catch {
      missing.push(b);
    }
  }
  return { attachments, files, missing };
}

// ---------- email copy (sent by the Apps Script with MailApp) ----------

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export function brochureEmail(firstName: string, title: string, files: BrochureFile[], missing: BrochureFile[]) {
  const demo = contact.whatsappHref(`Hi NovaNxt Lab, I got the ${title} brochure. I'd like to book a free demo class.`);
  const list = files.map((f) => `<li>${esc(f.label)} — ${f.kind}</li>`).join("");
  const html = `
<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#121735;max-width:560px">
  <p>Hi ${esc(firstName)},</p>
  <p>Thanks for your interest in <b>${esc(title)}</b> at ${brand.name}! ${
    files.length ? "Your brochure is attached:" : "Our team will send your brochure to you shortly."
  }</p>
  ${files.length ? `<ul>${list}</ul>` : ""}
  ${missing.length && files.length ? `<p>We'll send the remaining files (${missing.map((m) => esc(m.label)).join(", ")}) separately.</p>` : ""}
  <p><b>The best next step:</b> come for a <b>free demo class</b> at our ${esc(contact.address.split(",").slice(-2).join(",").trim())} lab —
  meet your trainer, see the lab and ask about fees and batch timings.</p>
  <p><a href="${demo}" style="display:inline-block;background:#ff9a42;color:#121735;font-weight:bold;padding:12px 20px;text-decoration:none;border:2px solid #121735">Book a free demo on WhatsApp</a></p>
  <p>Questions? Call <a href="${contact.phoneHref}">${contact.phone}</a> or just reply to this email.</p>
  <p>— Team ${brand.name}<br>${esc(contact.address)}</p>
</div>`;
  return { subject: `Your ${title} brochure — ${brand.name}`, html };
}

// ---------- send to the Google Sheet web app ----------

export type LeadRow = {
  type: "Brochure request" | "Contact enquiry";
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
  page: string;
  utm: string;
};

type Mail = { subject: string; html: string; attachments: Attachment[] };

export type SendResult = { saved: boolean; emailed: boolean | null };

/**
 * Posts the lead (and, for brochures, the email + PDFs) to the Apps Script.
 * Returns whether the row was saved and whether the email went out (null = no email requested).
 */
export async function sendLead(row: LeadRow, mail?: Mail): Promise<SendResult> {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) {
    console.warn("[leads] LEADS_WEBHOOK_URL not set — lead not saved and no email sent:", row);
    // Local dev without the sheet configured: let the forms be tested end to end. Production fails loudly.
    if (process.env.NODE_ENV !== "production") return { saved: true, emailed: mail ? false : null };
    return { saved: false, emailed: mail ? false : null };
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.LEADS_WEBHOOK_SECRET ?? "",
        timestamp: new Date().toISOString(),
        ...row,
        notifyTo: process.env.LEADS_NOTIFY_EMAIL ?? contact.email,
        replyTo: contact.email,
        mail: mail ? { to: row.email, ...mail } : null,
      }),
      signal: AbortSignal.timeout(30_000), // MailApp with attachments can take a few seconds
    });
    const out = (await res.json().catch(() => null)) as { ok?: boolean; emailed?: boolean } | null;
    if (!res.ok || !out?.ok) throw new Error(`Apps Script replied ${res.status} ${JSON.stringify(out)}`);
    return { saved: true, emailed: mail ? Boolean(out.emailed) : null };
  } catch (err) {
    console.error("[leads] failed to send lead:", err, row);
    return { saved: false, emailed: mail ? false : null };
  }
}
