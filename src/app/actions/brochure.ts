"use server";

import { brochureEmail, loadBrochures, sendLead, validateBrochure, type FieldErrors } from "@/lib/leads";
import { courses } from "@/lib/brand";

export type BrochureState =
  | { status: "idle" }
  | { status: "error"; errors: FieldErrors; values: Record<string, string>; formError?: string }
  | { status: "ok"; name: string; email: string; title: string; emailed: boolean };

const field = (fd: FormData, k: string) => String(fd.get(k) ?? "").slice(0, 300);

/**
 * Brochure gate: full name + email + mobile are required. The lead goes to the Google Sheet and the
 * brochure PDFs are emailed to the visitor by the Apps Script — there is no direct download.
 */
export async function requestBrochure(_prev: BrochureState, fd: FormData): Promise<BrochureState> {
  const input = {
    name: field(fd, "name"),
    email: field(fd, "email"),
    phone: field(fd, "phone"),
    brochure: field(fd, "brochure"),
    page: field(fd, "page"),
    utm: field(fd, "utm"),
  };

  // Honeypot: real visitors never see or fill this field. Pretend success, do nothing.
  if (field(fd, "website")) return { status: "ok", name: "", email: "", title: "", emailed: true };

  const { errors, clean } = validateBrochure(input);
  if (Object.keys(errors).length) return { status: "error", errors, values: input };

  const course = courses.find((c) => c.slug === input.brochure);
  const title = course ? course.title : "All courses";
  const firstName = clean.name.split(" ")[0];

  const { attachments, files, missing } = await loadBrochures(input.brochure);
  const mail = { ...brochureEmail(firstName, title, files, missing), attachments };

  const res = await sendLead(
    {
      type: "Brochure request",
      name: clean.name,
      phone: clean.phone,
      email: clean.email,
      course: title + (missing.length ? ` (missing PDF: ${missing.map((m) => m.id).join(", ")})` : ""),
      message: "",
      page: input.page,
      utm: input.utm,
    },
    mail,
  );

  if (!res.saved) {
    return {
      status: "error",
      errors: {},
      values: input,
      formError: "Sorry, something went wrong on our side. Please try again, or message us on WhatsApp and we'll send the brochure right away.",
    };
  }
  return { status: "ok", name: firstName, email: clean.email, title, emailed: Boolean(res.emailed) };
}
