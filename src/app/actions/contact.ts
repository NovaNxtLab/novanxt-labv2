"use server";

import { sendLead, validateContact, type FieldErrors } from "@/lib/leads";
import { courses } from "@/lib/brand";

export type ContactState =
  | { status: "idle" }
  | { status: "error"; errors: FieldErrors; values: Record<string, string>; formError?: string }
  | { status: "ok"; name: string };

const field = (fd: FormData, k: string, max = 300) => String(fd.get(k) ?? "").slice(0, max);

/** Contact form: name + mobile required, email/course/message optional. Saved to the leads Google Sheet. */
export async function sendEnquiry(_prev: ContactState, fd: FormData): Promise<ContactState> {
  const input = {
    name: field(fd, "name"),
    email: field(fd, "email"),
    phone: field(fd, "phone"),
    course: field(fd, "course"),
    message: field(fd, "message", 1600),
    page: field(fd, "page"),
    utm: field(fd, "utm"),
  };

  if (field(fd, "website")) return { status: "ok", name: "" }; // honeypot

  const { errors, clean } = validateContact(input);
  if (Object.keys(errors).length) return { status: "error", errors, values: input };

  const course = courses.find((c) => c.slug === input.course)?.title ?? (input.course === "unsure" ? "Not sure yet" : "");

  const res = await sendLead({
    type: "Contact enquiry",
    name: clean.name,
    phone: clean.phone,
    email: clean.email,
    course,
    message: input.message.trim(),
    page: input.page,
    utm: input.utm,
  });

  if (!res.saved) {
    return {
      status: "error",
      errors: {},
      values: input,
      formError: "Sorry, your message didn't go through. Please try again, or call / WhatsApp us directly.",
    };
  }
  return { status: "ok", name: clean.name.split(" ")[0] };
}
